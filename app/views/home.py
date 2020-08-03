from flask import (
    Blueprint,
    render_template,
    current_app as app
)

home = Blueprint('home', __name__)


@home.route('/')
def index():
    app.logger.warning('hello logger')
    return render_template('index.html', title='hello flask')
