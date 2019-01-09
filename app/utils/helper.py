import os
import re
import random
import time
import hashlib
from functools import wraps, partial
import arrow
from contextlib import contextmanager
from flask import url_for, request, abort, current_app as app
import string
from numbers import Number


@contextmanager
def timeit(label='time consumed', precision=6):
    """ used for simple profile """
    start = time.time()
    try:
        yield
    finally:
        end = time.time()
        fmt = '{}: {:.' + str(precision) + 'f}s'
        print(fmt.format(label, end - start))


def static(filename, **kw):
    """ a shortcut to url_for('static', filename='', **kw) """
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


def gen_hash_password(password, salt=''):
    """ a very simple solution to generate hashed password """
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


if __name__ == '__main__':
    pass
