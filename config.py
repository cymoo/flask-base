import os
import logging

BASE_PATH = os.path.abspath(os.path.dirname(__file__))


class Config:
    CSRF_ENABLED = True
    SECRET_KEY = os.environ.get('SECRET_KEY') or 'foo said i you do not know'

    UPLOAD_FOLDER = os.path.join(BASE_PATH, 'uploads')
    MAX_CONTENT_LENGTH = 4 * 1024 * 1024


class DevelopmentConfig(Config):
    ENV = 'development'
    DEBUG = True

    # Mongodb
    # MONGO_URI = 'mongodb://127.0.0.1:27017/foo'

    # MySQL
    SQLALCHEMY_TRACK_MODIFICATIONS = True
    SQLALCHEMY_DATABASE_URI = f'sqlite:///{os.path.join(BASE_PATH, "app.db")}'

    # CORS
    ACCESS_CONTROL_ALLOW_ORIGIN = '*'
    ACCESS_CONTROL_ALLOW_METHODS = '*'
    ACCESS_CONTROL_ALLOW_HEADERS = '*'


class ProductionConfig(Config):
    ENV = 'production'
    DEBUG = False

    # logging
    LOG_FILE = '/path/to/log-file'
    LOG_LEVEL = logging.WARNING
    LOG_FORMAT = '[{asctime}] {levelname}: {message} [in {pathname}:{lineno}]'

    # CORS
    ACCESS_CONTROL_ALLOW_ORIGIN = '*'
    ACCESS_CONTROL_ALLOW_METHODS = '*'
    ACCESS_CONTROL_ALLOW_HEADERS = '*'

    # MySQL
    # SQLALCHEMY_TRACK_MODIFICATIONS = True
    # SQLALCHEMY_DATABASE_URI = 'mysql://root:xxxxxx@localhost/foo'


config = {
    'development': DevelopmentConfig,
    'production': ProductionConfig,
    'default': DevelopmentConfig
}
