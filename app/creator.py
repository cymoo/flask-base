"""
Application factory
~~~~~~~~~~~~~~~~~~~
"""

from flask import Flask, send_from_directory, Response

from .utils import static


def create_app(config) -> Flask:
    app = Flask(__name__)
    app.config.from_object(config)

    register_logger_handler(app)
    register_db(app)
    register_blueprints(app)
    register_template_env(app)
    register_template_filters(app)
    register_file_uploads(app)
    register_after_handlers(app)
    return app


def register_logger_handler(app: Flask) -> None:
    if 'LOG_FILE' not in app.config:
        return
    import logging
    handler = logging.FileHandler(filename=app.config['LOG_FILE'])
    handler.setLevel(app.config['LOG_LEVEL'])
    formatter = logging.Formatter(app.config['LOG_FORMAT'], style='{')
    handler.setFormatter(formatter)
    app.logger.addHandler(handler)


def register_db(app: Flask) -> None:
    from .models import db
    db.init_app(app)
    db.app = app


def register_blueprints(app: Flask) -> None:
    from .views import home
    app.register_blueprint(home, url_prefix='/home')


def register_template_env(app: Flask) -> None:
    app.jinja_env.globals['static'] = static


def register_template_filters(app: Flask) -> None:
    app.jinja_env.filters['repr'] = repr


def register_file_uploads(app: Flask) -> None:
    @app.route('/uploads/<path:filename>')
    def uploaded_file(filename):
        return send_from_directory(app.config['UPLOAD_FOLDER'], filename)


def register_after_handlers(app: Flask) -> None:
    @app.after_request
    def set_cors_headers(res: Response) -> Response:
        config = app.config
        headers = res.headers
        headers['Access-Control-Allow-Origin'] = config['ACCESS_CONTROL_ALLOW_ORIGIN']
        headers['Access-Control-Allow-Methods'] = config['ACCESS_CONTROL_ALLOW_METHODS']
        headers['Access-Control-Allow-Headers'] = config['ACCESS_CONTROL_ALLOW_HEADERS']
        return res
