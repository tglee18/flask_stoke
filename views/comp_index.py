import requests
import json
from flask import render_template, request, Blueprint
from config import db, is_login
from bs4 import BeautifulSoup

comp_index = Blueprint('comp_index', __name__)


@comp_index.route('/')
# @is_login
def index():
    return render_template("comp_index.html")
