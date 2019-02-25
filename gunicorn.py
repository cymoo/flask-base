"""
Most used settings for gunicorn.
For details see: http://docs.gunicorn.org/en/latest/settings.html#settings
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
"""
import multiprocessing
import os

# Server Socket
# ~~~~~~~~~~~~~

bind = '127.0.0.1:' + (os.environ.get('PORT') or '5000')

# The maximum number of pending connections.
# This refers to the number of clients that can be waiting to be served.
# Exceeding this number results in the client getting an error when
# attempting to connect. It should only affect servers under significant load.
# Generally set in the 64-2048
backlog = 2048

# Worker Processes
# ~~~~~~~~~~~~~~~~

# generally in the 2-4 x $(NUM_CORES) range.
# You’ll want to vary this a bit to find the best for
# your particular application’s work load.
workers = multiprocessing.cpu_count() * 2 + 1

# The default class (sync) should handle most “normal” types of workloads
worker_class = 'gevent'

# The maximum number of simultaneous clients.
# This setting only affects the Eventlet and Gevent worker types.
worker_connections = 1000

# The maximum number of requests a worker will process before restarting.
# Any value greater than zero will limit the number of requests
# a work will process before automatically restarting.
# This is a simple method to help limit the damage of memory leaks.
# If this is set to zero (the default) then the automatic worker
# restarts are disabled.
max_requests = 0

# The jitter causes the restart per worker to be randomized by
# randint(0, max_requests_jitter). This is intended to stagger worker
# restarts to avoid all workers restarting at the same time.
max_requests_jitter = 0

# Workers silent for more than this many seconds are killed and restarted.
# Only set this noticeably higher if you’re sure of the repercussions
# for sync workers. For the non sync workers it just means that the worker
# process is still communicating and is not tied to the length of time
# required to handle a single request.
timeout = 30

# After receiving a restart signal, workers have this much time to finish serving
# requests. Workers still alive after the timeout (starting from the receipt of the restart signal) are force killed.
graceful_timeout = 30

# The number of seconds to wait for requests on a Keep-Alive connection.
# Generally set in the 1-5 seconds range for servers with direct connection
# to the client (e.g. when you don’t have separate load balancer).
# When Gunicorn is deployed behind a load balancer, it often makes sense to
# set this to a higher value.
# sync worker does not support persistent connections and will ignore this option.
keepalive = 3

# Security
# ~~~~~~~~~~~~

# The maximum size of HTTP request line in bytes.
limit_request_line = 4096

# limit_request_fields
limit_request_fields = 100

# Limit the allowed size of an HTTP request header field.
limit_request_field_size = 8190

# Debugging
# ~~~~~~~~~~~~~~

# Restart workers when code changes.
# Only used for development. The reloader is incompatible with application preloading.
# The default behavior is to attempt inotify with a fallback to file system polling.
# Generally, inotify should be preferred if available because it consumes less system resources.
# In order to use the inotify reloader, you must have the inotify package installed.
# FIXME: error happens when using inotify?
reload = True

# Extends reload option to also watch and reload on additional files
# (e.g., templates, configurations, specifications, etc.).
reload_extra_files = []

# Daemonize the Gunicorn process.
# Detaches the server from the controlling terminal and enters the background.
daemon = False

# pidfile = '/path/to/.../pidfile'

# A directory to use for the worker heartbeat temporary file.
# If not set, the default temporary directory will be used.
# worker_tmp_dir = '/path/to/.../dir'

# Directory to store temporary request data as they are read.
# tmp_upload_dir = '/path/to/.../dir'

# Front-end’s IPs from which allowed to handle set secure headers. (comma separate).
# Set to * to disable checking of Front-end IPs (useful for setups where you don’t
# know in advance the IP address of Front-end, but you still trust the environment).
# By default, the value of the FORWARDED_ALLOW_IPS environment variable. If it is not
# defined, the default is "127.0.0.1".
forwarded_allow_ips = '127.0.0.1'

# Logging
# ~~~~~~~~~~~~~~

# The access log file to write to
# '-' means log to stdout.
# accesslog = '/path/to/.../file'

# The Error log file to write to.
# Using '-' for FILE makes gunicorn log to stderr. Log to stderr by default..
# errorlog = '/Users/cymoo/Desktop/error.log'

# Valid level names are: debug, info, warning, error, critical
loglevel = 'error'


# Process Naming
# ~~~~~~~~~~~~~

# A base to use with setproctitle for process naming.
# This affects things like ps and top. If you’re going to be running more
# than one instance of Gunicorn you’ll probably want to set a name to
# tell them apart. This requires that you install the setproctitle module.
proc_name = 'flask'

# Server Mechanics
# ~~~~~~~~~~~~~~~~

# A comma-separated list of directories to add to the Python path.
# pythonpath = os.path.abspath(os.path.dirname(__file__))

# Server Mechanics
# ~~~~~~~~~~~~~~~

# Front-end’s IPs from which allowed accept proxy requests (comma separate).
# Set to * to disable checking of Front-end IPs (useful for setups where you
# don’t know in advance the IP address of Front-end, but you still trust the environment)
proxy_allow_ips = '127.0.0.1'

# SSL
# ~~~~~~~~~~~~~

# keyfile = '/path/to/.../file'
# certfile = '/path/to/.../file'
# ca_certs = '/path/to/.../file'
