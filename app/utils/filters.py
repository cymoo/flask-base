"""
Filters for Jinja2
~~~~~~~~~~~~~~~~~~

"""

import arrow
import re

HTML_TAG = re.compile(r'<.+?>(.*?)(?=<.+?>)', re.DOTALL)
WHITE_CHAR = re.compile(r'[\t\r\n\f\v]')


def get_year(dt):
    return arrow.get(dt).year


def get_month(dt):
    return arrow.get(dt).month


def get_day(dt):
    return arrow.get(dt).day


def formatted_time(dt, fmt='YYYY-MM-DD'):
    return arrow.get(dt).format(fmt)


# jinja2自带的truncate过滤器不适用于中文
def truncated_string(s, length=255, end='...'):
    if not isinstance(s, str):
        s = s.decode('utf-8')
    if len(s) <= length:
        return s
    result = s[:length - len(end)].rsplit(' ', 1)[0]
    if len(result) < length:
        result += ''
    return result + end
