import random
import string
import time
from functools import partial
from typing import Callable

from flask import (
    url_for,
)


class Timer:
    """Record the time that a task has taken"""
    def __init__(self, func: Callable = time.perf_counter):
        self.elapsed = 0.0
        self._func = func
        self._start = None

    def start(self) -> None:
        if self._start is not None:
            raise RuntimeError('Already started')
        self._start = self._func()

    def stop(self) -> None:
        if self._start is None:
            raise RuntimeError('Not started')
        end = self._func()
        self.elapsed += end - self._start
        self._start = None

    def reset(self) -> None:
        self.elapsed = 0.0

    @property
    def running(self) -> bool:
        return self._start is not None

    def __enter__(self) -> 'Timer':
        self.start()
        return self

    def __exit__(self, *args) -> None:
        self.stop()


def static(filename: str, **kw):
    """ a shortcut to url_for('static', filename='', **kw) """
    return url_for('static', filename=filename, **kw)


def random_string(length: int = 10, str_type: str = 'all') -> str:
    choices = {
        'digit': string.digits,
        'letter': string.ascii_letters,
        'uppercase': string.ascii_uppercase,
        'lowercase': string.ascii_lowercase,
        'upper_digit': string.digits + string.ascii_uppercase,
        'lower_digit': string.digits + string.ascii_lowercase,
        'all': string.digits + string.ascii_letters
    }
    return ''.join(random.choice(choices[str_type]) for _ in range(length))


random_digits = partial(random_string, str_type='digit')
random_letters = partial(random_string, str_type='letter')
random_upper_letters = partial(random_string, str_type='uppercase')
random_lower_letters = partial(random_string, str_type='lowercase')


if __name__ == '__main__':
    import doctest
    doctest.testmod()
