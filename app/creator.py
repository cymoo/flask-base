"""
App factory
"""

from flask import Flask, send_from_directory


def create_app(config, static_folder='static', template_folder='templates'):
    app = Flask(__name__, static_folder=static_folder, template_folder=template_folder)
    app.config.from_object(config['default'])

    register_extensions(app)
    register_blueprints(app)
    register_template_env(app)
    register_template_filters(app)
    register_before_handlers(app)
    register_teardown_handlers(app)
    register_error_handler(app)
    return app


def register_extensions(app):
    pass


def register_blueprints(app):
    from .views import main
    app.register_blueprint(main)


def register_template_env(app):
    # app.jinja_env.globals['moment'] = None
    pass


def register_template_filters(app):
    # app.jinja_env.filters['truncate'] = None
    pass


def register_before_handlers(app):

    # @app.before_request
    # def foo():
    #     pass
    pass


def register_teardown_handlers(app):

    # @app.teardown_request
    # def foo():
    #     pass
    pass


def register_error_handler(app):

    @app.errorhandler(403)
    def forbidden_page(error):
        return send_from_directory(app.config['STATIC_PAGE_FOLDER'], '403.html'), 403

    @app.errorhandler(404)
    def page_not_found(error):
        return send_from_directory(app.config['STATIC_PAGE_FOLDER'], '404.html'), 404

    @app.errorhandler(500)
    def internal_server_error(error):
        return send_from_directory(app.config['STATIC_PAGE_FOLDER'], '500.html'), 500
