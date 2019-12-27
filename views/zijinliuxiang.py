import json
import requests
from flask import render_template, request, Blueprint
from config import db, is_login
from bs4 import BeautifulSoup
zijinliuxiang = Blueprint('zijinliuxiang', __name__)


@zijinliuxiang.route('/')
def index():
    return render_template("zijinliuxiang.html")