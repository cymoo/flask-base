"""
Application factory
~~~~~~~~~~~~~~~~~~~
"""

import json
from flask import Flask, send_from_directory, render_template
from .utils.helper import static


def create_app(config, static_folder='static', template_folder='templates'):
    app = Flask(__name__, static_folder=static_folder, template_folder=template_folder)
    app.config.from_object(config)

    register_extensions(app)
    register_logger_handler(app)
    register_blueprints(app)
    register_template_config(app)
    register_template_env(app)
    register_template_filters(app)
    register_before_handlers(app)
    register_teardown_handlers(app)
    register_error_handler(app)
    return app


def register_extensions(app):
    pass


def register_logger_handler(app):
    if not app.config['LOG_ENABLED']:
        return
    import logging
    handler = logging.FileHandler(filename=app.config['LOG_FILE'])
    handler.setLevel(app.config['LOG_LEVEL'])
    formatter = logging.Formatter(app.config['LOG_FORMAT'], style='{')
    handler.setFormatter(formatter)
    app.logger.addHandler(handler)


def register_blueprints(app):
    from .views import main
    app.register_blueprint(main)


def register_template_config(app):
    # If this is set to True the first newline after a block is removed
    # (block, not variable tag!).
    app.jinja_env.trim_blocks = False
    # If this is set to True leading spaces and tabs are stripped from
    # the start of a line to a block. Defaults to False.
    app.jinja_env.lstrip_blocks = False
    app.jinja_env.variable_start_string = '{{'
    app.jinja_env.variable_end_string = '}}'


def register_template_env(app):
    app.jinja_env.globals['static'] = static


def register_template_filters(app):
    app.jinja_env.filters['repr'] = repr


def register_before_handlers(app):
    pass


def register_teardown_handlers(app):
    pass


def register_error_handler(app):

    @app.errorhandler(403)
    def forbidden_page(error):
        return json.dumps({'err': '403 forbidden page'}), 403

    @app.errorhandler(404)
    def page_not_found(error):
        return json.dumps({'err': '404 page not found'}), 404

    @app.errorhandler(500)
    def internal_server_error(error):
        return json.dumps({'err': '500 server error'}), 500
