import sqlalchemy
from flask import render_template, request, Blueprint
from config import db

register = Blueprint('register', __name__)


@register.route('/')
def index():
    return render_template("register.html")


@register.route('/register', methods=["POST"])
def register_():
    username = request.form.get('username')
    password = request.form.get('password')
    try:
        data = db.session.execute("insert into user(username, pwd) values('{}','{}')".format(username, password))
        db.session.commit()
    except sqlalchemy.exc.IntegrityError:
        return "该用户已存在"
    else:
        return "注册成功"
