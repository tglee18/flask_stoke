import json

from flask import render_template, request, Blueprint, session, redirect, url_for

from models.model import User

login = Blueprint('login', __name__)


@login.route('/', methods=['POST', 'GET'])
def logins():
    if request.method == 'GET':
        if session.get("username"):
            return render_template('index1.html')  # 这里是跳转到搜索页
        else:
            return render_template('log.html')
    else:
        user_id = request.form.get('id')
        pwd = request.form.get('pwd')
        user = User.query.filter(User.username == user_id, User.pwd == pwd).first()
        if user:
            session['username'] = user_id
            session.permanent = True
            datas = {"statuss": "success", "user_id": session['username']}
            return json.dumps(datas)
        else:
            datas = {"statuss": "failed"}
            return json.dumps(datas)
