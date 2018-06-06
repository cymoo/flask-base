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


def truncated_string(s, length=255, end='...'):
    if not isinstance(s, str):
        s = s.decode('utf-8')
    if len(s) <= length:
        return s
    result = s[:length - len(end)].rsplit(' ', 1)[0]
    if len(result) < length:
        result += ''
    return result + end


# a very simple method to remove html tags
def strip_tags(html, limit=100, end='...'):
    if not isinstance(html, str):
        html = html.decode('utf-8')
    string = ''
    for m in HTML_TAG.finditer(html):
        tmp = m.group(1)
        s = WHITE_CHAR.sub('', tmp)
        ss = s.strip()
        string += ss
        if len(string) >= limit:
            return string[:limit] + end
    return string
