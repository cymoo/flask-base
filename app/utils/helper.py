import os
import re
import random
import time
import hashlib
from functools import wraps, partial
import arrow
from contextlib import contextmanager
from flask import url_for, request, abort, current_app as app
from jinja2 import Markup
import string
from numbers import Number

# characters that not belong to 汉字 or digits or alphabet or `-` will be deemed as illegal
ILLEGAL_CHAR = re.compile(r'[^\u4e00-\u9fa5\w\-]+')


# used for simple profile
@contextmanager
def timeit(label='time consumed', precision=6):
    start = time.time()
    try:
        yield
    finally:
        end = time.time()
        fmt = '{}: {:.' + str(precision) + 'f}s'
        print(fmt.format(label, end - start))


# a shortcut to url_for('static', filename='', **kw)
def static(filename, **kw):
    return url_for('static', filename=filename, **kw)


def random_string(length=10, type='all'):
    choices = {
        'digit': string.digits,
        'letter': string.ascii_letters,
        'uppercase': string.ascii_uppercase,
        'lowercase': string.ascii_lowercase,
        'all': string.digits + string.ascii_letters
    }
    return ''.join(random.choice(choices[type]) for _ in range(length))


random_digits = partial(random_string, type='digit')
random_letters = partial(random_string, type='letter')
random_upper_letters = partial(random_string, type='uppercase')
random_lower_letters = partial(random_string, type='lowercase')


# a simple solution to generate unique filename
def unique_filename(filename='', ext='', prefix='', suffix='', separator='-'):
    if filename:
        basename, ext = os.path.splitext(filename)
        basename = ILLEGAL_CHAR.sub('', basename)
    else:
        basename = ''
    unique_name = separator.join(filter(lambda x: x != '', [
        prefix,
        basename,
        arrow.now().format('YYYYMMDDHHmmss'),
        random_string(),
        suffix
    ]))

    if ext and not ext.startswith('.'):
        ext = '.' + ext
    return unique_name + ext


# a very simple solution to generate hashed password
def gen_hash_password(password, salt=''):
    if salt == '':
        salt = app.config['SECRET_KEY']
    m = hashlib.sha1()
    m.update(password.encode('utf-8'))
    m.update(salt.encode('utf-8'))
    return m.hexdigest()


def verify_password(password, hash_password, salt=''):
    if salt == '':
        salt = app.config['SECRET_KEY']
    return gen_hash_password(password, salt) == hash_password


# a helper-class for utilizing moment.js in Jinja2
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


if __name__ == '__main__':
    pass
