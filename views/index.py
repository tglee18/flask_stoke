import requests
import json
from flask import render_template, request, Blueprint
from config import db, is_login
from bs4 import BeautifulSoup

indexSet = Blueprint('index', __name__)


@indexSet.route('/')
# @is_login
def index():
    return render_template("index1.html")


@indexSet.route('/detail')
# @is_login
def get_detail():
    return render_template("detail.html")


# 公司简介
@indexSet.route('/company')
# @is_login
def toCompany():
    return render_template("company.html")


# 公司主页
@indexSet.route('/comp_index')
# @is_login
def comp_index():
    return render_template("comp_index.html")

# 公司资金流向
@indexSet.route('/zijinliuxiang')
# @is_login
def goToMoneyFlow():
    return render_template("zijinliuxiang.html")


# 公司财务分析
@indexSet.route('/analysis')
# @is_login
def moneyAnalysis():
    return render_template("analysis.html")


# 公司股东
@indexSet.route('/staff')
# @is_login
def stockHolder():
    return render_template("staff.html")
