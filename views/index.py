import requests
import json
from flask import render_template, request, Blueprint
from config import db, is_login
from bs4 import BeautifulSoup

indexSet = Blueprint('index', __name__)


@indexSet.route('/')
#@is_login
def index():
    return render_template("index1.html")

@indexSet.route('/detail')
#@is_login
def get_detail():
    return render_template("detail.html")
