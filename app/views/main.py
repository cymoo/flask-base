from flask import Blueprint, render_template, url_for

main = Blueprint('main', __name__)


@main.route('/')
def index():
    return render_template('main/index.html', title = '首页')
