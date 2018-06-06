import gevent.monkey; gevent.monkey.patch_all()
import signal
import os
from flask_script import Manager
from wsgi import flask_app as app

manager = Manager(app)

# used by SQL backend
# from flask_migrate import Migrate, MigrateCommand
# from app.extensions import db

# migrate = Migrate(db.app, db)


# @manager.command
# def create_db():
#     db.create_all()


# manager.add_command('db', MigrateCommand)


@manager.command
def runserver(host='127.0.0.1', port=5000, with_profile=False):
    """Runs a development server."""
    from gevent.pywsgi import WSGIServer
    from werkzeug.serving import run_with_reloader
    from werkzeug.debug import DebuggedApplication
    from werkzeug.contrib.profiler import ProfilerMiddleware

    port = int(port)

    if with_profile:
        f = open(app.config['PROFILE_PATH'], 'w')
        wsgi = ProfilerMiddleware(app, f, restrictions=[30])
    else:
        wsgi = DebuggedApplication(app)

    def handler(signum, frame):
        print('\nbye...')
        os._exit(0)

    signal.signal(signal.SIGINT, handler)

    @run_with_reloader
    def run_server():
        print('Keep Calm and Carry On...Start Server At: 127.0.0.1:%s' % port)

        http_server = WSGIServer((host, port), wsgi)
        http_server.serve_forever()

    run_server()


if __name__ == '__main__':
    manager.run()
