
class Config:
    CSRF_ENABLED = True
    SECRET_KEY = 'keep-calm-and-carry-on'


class DevelopmentConfig(Config):
    EXPLAIN_TEMPLATE_LOADING = False
    DEBUG = True
    DATABASE_URI = None


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
