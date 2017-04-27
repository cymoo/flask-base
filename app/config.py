import os

APP_DIR = os.path.dirname(__file__)


class Config:
    CSRF_ENABLED = True
    SECRET_KEY = os.environ.get('SECRET_KEY') or 'keep-calm-and-carry-on'
    STATIC_PAGE_FOLDER = os.path.join(APP_DIR, 'static/page')


class DevelopmentConfig(Config):
    EXPLAIN_TEMPLATE_LOADING = False
    DEBUG = True
    DATABASE_URI = None
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
