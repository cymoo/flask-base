from flask import Blueprint, render_template, request, redirect


account = Blueprint('account', __name__)


@account.route('/login', methods=['GET', 'POST'])
def login():
    if request.method == 'GET':
        return render_template('account/login.html')
    else:
        # process login logic
        return redirect('some url')


@account.route('/register', methods=['GET', 'POST'])
def register():
    if request.method == 'GET':
        return render_template('account/register.html')
    else:
        # process register logic
        return redirect('some url')


@account.route('/forget', methods=['GET', 'POST'])
def forget():
    if request.method == 'GET':
        return render_template('account/forget.html')
    else:
        # do something
        return redirect('some url')
