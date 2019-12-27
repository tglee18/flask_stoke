import json
import requests
from flask import render_template, request, Blueprint
from config import db, is_login
from bs4 import BeautifulSoup
view = Blueprint('view', __name__)


@view.route('/')
def index():
    return render_template("view.html")