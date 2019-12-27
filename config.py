from functools import wraps

from flask import session, render_template
from flask import Flask
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)

# url的格式为：数据库的协议：//用户名：密码@ip地址：端口号（默认可以不写）/数据库名
app.config["SQLALCHEMY_DATABASE_URI"] = "mysql://root:@localhost:3306/stoke"
# 动态追踪数据库的修改. 性能不好. 且未来版本中会移除. 目前只是为了解决控制台的提示才写的
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
# 创建数据库的操作对象
db = SQLAlchemy(app)

app.config['SECRET_KEY'] = 'test'  # 加密的密钥
# app.config['SESSION_USE_SIGNER'] = True  # 是否对发送到浏览器上session的cookie值进行加密
# app.config['SESSION_TYPE'] = 'redis'  # session类型为redis
# app.config['SESSION_KEY_PREFIX'] = 'session:'  # 保存到session中的值的前缀
app.config['PERMANENT_SESSION_LIFETIME'] = 1200  # 失效时间 秒


# app.config['SESSION_REDIS'] = redis.Redis(host='127.0.0.1', port='6379', db=4)  # redis数据库连接


def is_login(func):
    @wraps(func)
    def wrapper(*args, **kwargs):
        if session.get("username"):
            ret = func(*args, **kwargs)  # func = home
            return ret
        else:
            return render_template('login.html')

    return wrapper
