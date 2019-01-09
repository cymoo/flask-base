from flask import (
    Blueprint,
    render_template,
    url_for,
    current_app as app
)

main = Blueprint('main', __name__)


@main.route('/')
def index():
    app.logger.warning('hello logger')
    return render_template('index.html', title = '首页')
