from flask import Blueprint, render_template, request, redirect


account = Blueprint('account', __name__)


@account.route('/login', methods=['GET', 'POST'])
def login():
    if request.method == 'GET':
        return render_template('account/login.html', title = '登录')
    else:
        # process login logic
        return redirect('some url')


@account.route('/register', methods=['GET', 'POST'])
def register():
    if request.method == 'GET':
        return render_template('account/register.html', title = '注册')
    else:
        # process register logic
        return redirect('some url')


@account.route('/forget', methods=['GET', 'POST'])
def forget():
    if request.method == 'GET':
        return render_template('account/forget.html', title = '忘记密码')
    else:
        # do something
        return redirect('some url')
