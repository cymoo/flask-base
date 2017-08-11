import os

BASE_PATH = os.path.abspath(os.path.dirname(__file__))


class Config:
    CSRF_ENABLED = True
    SECRET_KEY = os.environ.get('SECRET_KEY') or 'keep-calm-and-carry-on'
    STATIC_PAGE_FOLDER = os.path.join(BASE_PATH, 'app/static/page')
    UPLOAD_FOLDER = os.path.join(BASE_PATH, 'uploads')


class DevelopmentConfig(Config):
    EXPLAIN_TEMPLATE_LOADING = False
    DEBUG = True
    DATABASE_URI = 'mongodb://127.0.0.1:27017/foo'
    # SQLALCHEMY_TRACK_MODIFICATIONS = True
    # SQLALCHEMY_DATABASE_URI = 'mysql://root:xxxxxx@localhost/foo'
    PROFILE_PATH = None


class TestingConfig(Config):
    DEBUG = True
    TESTING = True
    DATABASE_URI = None


class ProductionConfig(Config):
    DEBUG = False
    DATABASE_URI = None


config = {
    'development': DevelopmentConfig,
    'testing': TestingConfig,
    'production': ProductionConfig,
    'default': DevelopmentConfig
}
