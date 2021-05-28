# Flask app boilerplate

## What it contains

* an app-factory function: app.creator:create_app

* a gunicorn configuration file: gunicorn.py

* a simple cli script: manager.py

* a reasonable file structure

## How to use

* Initialize virtual environment and install dependencies:

```bash
virtualenv --python=python3 venv

source venv/bin/activate

pip install -r requirements.txt
```

* Start development server:

```bash
flask run
```

* Start production server:

```bash
gunicorn -c gunicorn.py wsgi:app
```

* Create database tables (if some SQL database has been configured):

```bash
flask create_tables
```

* Drop database tables:

```bash
flask drop_tables
```

* Database migration operations:

```bash
flask db [init | migrate | upgrade]
```

## Licence

MIT



