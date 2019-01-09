import os
import logging

BASE_PATH = os.path.abspath(os.path.dirname(__file__))


class Config:
    CSRF_ENABLED = True
    SECRET_KEY = os.environ.get('SECRET_KEY') or 'foo said i you do not know'
    UPLOAD_FOLDER = os.path.join(BASE_PATH, 'uploads')
    LOG_ENABLED = True
    LOG_LEVEL = logging.WARNING
    LOG_FILE = os.path.join(BASE_PATH, 'logs', 'app.log')
    LOG_FORMAT = '[{asctime}] {levelname}: {message} [in {pathname}:{lineno}]'

class DevelopmentConfig(Config):
    EXPLAIN_TEMPLATE_LOADING = False
    DEBUG = True
    PROFILE_PATH = None
    # DATABASE_URI = 'mongodb://127.0.0.1:27017/foo'
    # SQLALCHEMY_TRACK_MODIFICATIONS = True
    # SQLALCHEMY_DATABASE_URI = 'mysql://root:xxxxxx@localhost/foo'


class TestingConfig(Config):
    DEBUG = True
    TESTING = True


class ProductionConfig(Config):
    DEBUG = False


config = {
    'development': DevelopmentConfig,
    'testing': TestingConfig,
    'production': ProductionConfig,
    'default': DevelopmentConfig
}
