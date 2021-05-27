from app import create_app
from config import config

flask_app = create_app(config['production'])
app = flask_app.wsgi_app
