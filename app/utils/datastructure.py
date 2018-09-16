from threading import RLock
from collections import abc, namedtuple
from keyword import iskeyword
import time
import math
from bson import ObjectId
from flask import abort

try:
    from pymongo.collection import Collection
except ImportError as e:
    pass

__all__ = (
    'FrozenJson',
    'SimpleCache',
    'Pagination',
    'ListPagination'
)


class FrozenJson:
    """
    只读接口，以属性的方式访问JSON对象，主要用途是少敲几次键盘
    NOTE: 在JSON结构多层嵌套时不要使用
    TODO: 缓存数据
    """

    def __new__(cls, obj):
        if isinstance(obj, abc.Mapping):
            return super().__new__(cls)
        elif isinstance(obj, abc.MutableSequence):
            return [cls(item) for item in obj]
        else:
            return obj

    def __init__(self, mapping):
        # 为了安全，创建原始数据的一个副本（浅）
        self._data = {}
        for key, value in mapping.items():
            if not key.isidentifier():
                raise AttributeError("invalid identifier: '{}'".format(key))
            if iskeyword(key):
                key += '_'
            self._data[key] = value

    def __getattr__(self, name):
        if hasattr(self._data, name):
            return getattr(self._data, name)
        try:
            return FrozenJson(self._data[name])
        except KeyError:
            raise AttributeError("'{}'".format(name))


class SimpleCache:
    """
    a very simple memory cache with expiration to store small amount of data
    NOTE: 在开发环境中用于测试，生产环境中需使用Redis等
    """

    value_time = namedtuple('ValueTimePair', 'value time')

    def __init__(self, max_age=7200):
        self._dict = dict()
        self.max_age = max_age
        self._lock = RLock()

    def get(self, key):
        if self.expired(key):
            self._dict.pop(key)
            return None
        return self._dict[key].value

    def set(self, key, value):
        self._lock.acquire()
        self._dict[key] = self.value_time(value, time.time())
        self._lock.release()

    def expired(self, key):
        now = time.time()
        past = self._dict[key].time
        return (now - past) > self.max_age

    def __contains__(self, key):
        return not self.expired(key) and key in self._dict

    def keys(self):
        for key in self._dict.keys():
            if not self.expired(key):
                yield key

    def values(self):
        for key, value in self._dict.items():
            if not self.expired(key):
                yield value

    def items(self):
        for key, value in self._dict.items():
            if not self.expired(key):
                yield (key, value)

    def __iter__(self):
        return self.keys()

    def __setitem__(self, key, value):
        self.set(key, value)

    def __getitem__(self, key):
        self.get(key)


class Pagination:
    """ Pagination for MongoDB documents """

    def __init__(self, collection, filter, page, per_page, **kw):
        if page < 1:
            abort(404)

        if not isinstance(collection, Collection):
            raise TypeError('`pymongo.collection.Collection` expected, not `{}`'.format(type(collection)))
        self.collection = collection
        self.filter = filter

        self.page = page
        self.per_page = per_page
        self.kw = kw

        self.total = collection.find(filter=filter, **kw).count()

        start_index = (page - 1) * per_page

        self.items = list(collection.find(filter=filter, skip=start_index, limit=per_page, **kw))
        if not self.items and page != 1:
            abort(404)

    @property
    def pages(self):
        """The total number of pages"""
        return int(math.ceil(self.total / float(self.per_page)))

    def prev(self):
        return self.__class__(self.collection, self.filter, self.page - 1, self.per_page, **self.kw)

    @property
    def prev_num(self):
        return self.page - 1

    @property
    def has_prev(self):
        return self.page > 1

    def next(self):
        return self.__class__(self.collection, self.filter, self.page + 1, self.per_page, **self.kw)

    @property
    def has_next(self):
        return self.page < self.pages

    @property
    def next_num(self):
        return self.page + 1

    def iter_pages(self, left_edge=2, left_current=2,
                   right_current=5, right_edge=2):
        """
        An iterator that returns the sequence of page numbers to display
        in a pagination widget.
        For example, for page 50 of 100 this iterator configured with default values
        will return the following pages: 1, 2, None, 48, 49, 50, 51, 52, 53, 54, 55,None,
        99, 100. A None value in the sequence indicates a gap in the sequence of pages.

        :param left_edge: pages on the left side
        :param left_current: pages to the left of the current page
        :param right_current: pages to the right of the current page
        :param right_edge: pages on the right side
        :return: page number
        """

        last = 0
        for num in range(1, self.pages + 1):
            if (
                num <= left_edge or
                num > self.pages - right_edge or
                    (self.page - left_current <= num <= self.page + right_current)
            ):
                if last + 1 != num:
                    yield None
                yield num
                last = num
        if last != self.pages:
            yield None


class ListPagination(Pagination):
    """Allows an array within a document to be paginated.

    Doc_id: object_id.
    Field_name: the name of the array we're paginating.
    Page and per_page work just like in Pagination.
    Total is an argument because it can be computed more efficiently
    elsewhere, but we still use array.length as a fallback.
    """

    def __init__(self, collection, doc_id, field_name, page, per_page,
                 total=None, **kw):
        if page < 1:
            abort(404)

        if not isinstance(collection, Collection):
            raise TypeError('`pymongo.collection.Collection` expected, not `{}`'.format(type(collection)))
        self.collection = collection
        self.page = page
        self.per_page = per_page
        self.doc_id = doc_id if isinstance(doc_id, ObjectId) else ObjectId(doc_id)
        self.field_name = field_name
        self.kw = kw
        start_index = (page - 1) * per_page
        field_attrs = {field_name: {'$slice': [start_index, per_page]}}
        self.items = self.collection.find_one(filter={'_id': doc_id},
                                              projection=field_attrs, **kw).get(field_name)
        # TODO: figure out if there's some builtin operator to get the array length
        self.total = total or len(self.collection.find_one(filter={'_id': doc_id}, **kw).get(field_name))

        if not self.items and page != 1:
            abort(404)

    def prev(self):
        return self.__class__(self.collection, self.doc_id, self.field_name,
                              self.page - 1, self.per_page, self.total, **self.kw)

    def next(self):
        return self.__class__(self.collection, self.doc_id, self.field_name,
                              self.page + 1, self.per_page, self.total, **self.kw)


if __name__ == '__main__':
    pass
