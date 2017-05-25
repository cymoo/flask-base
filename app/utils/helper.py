import os
import re
import random
import arrow
from flask import url_for
from jinja2 import Markup
import string

__all__ = [
    'Moment',
    'unique_filename',
    'class_property'
]

# characters that not belong to 汉字 or digits or alphabet or `-`
# will deemed as illegal 
illegal_char = re.compile(r'[^\u4e00-\u9fa5\w\-]+')


def static(filename):
    return url_for('static', filename=filename)


# helper-class for utilizing moment.js in Jinja2
class Moment(object):
    def __init__(self, timestamp):
        self.timestamp = timestamp

    def render(self, args):
        return Markup("<script>document.write(moment(\"%s\").%s);</script>" %
                      (self.timestamp.strftime("%Y-%m-%dT%H:%M:%S Z"), args))

    def format(self, fmt):
        return self.render("format(\"%s\")" % fmt)

    def calendar(self):
        return self.render("calendar()")

    def fromNow(self):
        return self.render("fromNow()")

    @staticmethod
    def locale(args):
        return Markup("<script>moment.locale(\"%s\");</script>" % args)


def random_string(length=5):
    choices = string.ascii_letters + string.digits
    chars = [random.choice(choices) for _ in range(length)]
    return ''.join(chars)


# a very simple solution to avoid same filename
def unique_filename(filename=None, ext='', prefix='',
                    suffix='', separator='-'):
    if filename:
        fname, _ext = os.path.splitext(filename)
        fname = illegal_char.sub('', fname)
    else:
        fname, _ext = '', ''
    dt_string = arrow.now().format('YYYYMMDDHHmmss')
    _list = [prefix, fname, dt_string, random_string(), suffix]
    basename_no_ext = separator.join([item for item in _list if item])
    ext = ext if ext else _ext
    if ext:
        ext = ext if ext.startswith('.') else '.' + ext

    return basename_no_ext + ext


# implement a simple getter for class method
class ClassProperty:
    def __init__(self, func):
        self.__doc__ = func.__doc__
        self.__name__ = func.__name__
        self._func = func

    def __get__(self, instance, owner):
        return self._func(owner)


# alias for ClassProperty
class_property = ClassProperty
