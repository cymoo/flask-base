import os
import logging

BASE_PATH = os.path.abspath(os.path.dirname(__file__))


class Config:
    CSRF_ENABLED = True
    SECRET_KEY = os.environ.get('SECRET_KEY') or 'foo said i you do not know'

    # logging
    LOG_ENABLED = True
    LOG_LEVEL = logging.WARNING
    LOG_FILE = os.path.join(BASE_PATH, 'logs', 'app.log')
    LOG_FORMAT = '[{asctime}] {levelname}: {message} [in {pathname}:{lineno}]'

    # upload
    UPLOAD_FOLDER = os.path.join(BASE_PATH, 'uploads')
    MAX_CONTENT_LENGTH = 4 * 1024 * 1024


class DevelopmentConfig(Config):
    ENV = 'development'
    DEBUG = True

    # jinja2 config
    EXPLAIN_TEMPLATE_LOADING = False

    # MONGO_URI = 'mongodb://127.0.0.1:27017/foo'
    # SQLALCHEMY_TRACK_MODIFICATIONS = True
    # SQLALCHEMY_DATABASE_URI = 'mysql://root:xxxxxx@localhost/foo'

    # CORS
    ACCESS_CONTROL_ALLOW_ORIGIN = '*'
    ACCESS_CONTROL_ALLOW_METHODS = '*'
    ACCESS_CONTROL_ALLOW_HEADERS = '*'


class ProductionConfig(Config):
    ENV = 'production'
    DEBUG = False


config = {
    'development': DevelopmentConfig(),
    'production': ProductionConfig(),
    'default': DevelopmentConfig()
}
