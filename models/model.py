from config import db


class User(db.Model):
    __tablename__ = 'user'#对应mysql数据库表
    username = db.Column(db.String(10), primary_key=True)
    pwd = db.Column(db.String(20), unique=True, index=True)
