import requests
import json
from flask import render_template, request, Blueprint
from config import db, is_login
from bs4 import BeautifulSoup

stockholder = Blueprint('stockholder', __name__)


@stockholder.route('/')
# @is_login
def index():
    return render_template("stockholder.html")


@stockholder.route('/a')
def get_a():
    q_text = request.args.get("text")
    data = db.session.execute("select * "
                              "from baseinfo "
                              "where Code like '%{}'".format(q_text))

    data_list = list(data)
    if data_list:
        code = data_list[0].Code
        code = code[2:]
        url = "http://quotes.money.163.com/f10/nbcg_{}.html#01d04".format(code)
        headers = {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/72.0.3626.96 Safari/537.36'
        }
        req = requests.get(url, headers).text
        html = BeautifulSoup(req, "html5lib")
        info = html.find_all('div', class_="inner_box")
        view = []
        tr = info[0].find('tbody').find_all('tr')
        for i in tr[1:]:
            td = i.find_all('td')
            data_item2 = {
                "name": td[0].get_text(),  # 姓名
                "position": td[1].get_text(),  # 职位
                "cgsl": td[2].get_text(),  # 持股数量
                "zhbdrq": td[3].get_text()  # 最后变动日期
            }
            view.append(data_item2)
            data_pkg = {"status": "success", "datas": view}
    else:
        data_pkg = {"status": "failed"}
    return json.dumps(data_pkg)


@stockholder.route('/b')
def get_b():
    q_text = request.args.get("text")
    data = db.session.execute("select * "
                              "from baseinfo "
                              "where Code like '%{}'".format(q_text))

    data_list = list(data)
    if data_list:
        code = data_list[0].Code
        code = code[2:]
        url = "http://quotes.money.163.com/f10/nbcg_{}.html#01d04".format(code)
        headers = {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/72.0.3626.96 Safari/537.36'
        }
        req = requests.get(url, headers).text
        html = BeautifulSoup(req, "html5lib")
        info = html.find_all('div', class_="inner_box")
        view = []
        tr = info[1].find('tbody').find_all('tr')
        for i in tr[1:]:
            td = i.find_all('td')
            data_item2 = {
                "name": td[0].get_text(),  # 姓名
                "position": td[1].get_text(),  # 职位
                "bdrq": td[2].get_text(),  # 变动日期
                "bdyy": td[3].get_text(),  # 变动原因
                "bdsl": td[4].get_text(),  # 变动数量
                "cjjj": td[5].get_text(),  # 成交均价
                "bdhcgs": td[6].get_text()  # 变动后持股数
            }
            view.append(data_item2)
            data_pkg = {"status": "success", "datas": view}
    else:
        data_pkg = {"status": "failed"}
    return json.dumps(data_pkg)


@stockholder.route('/c')
def get_c():
    q_text = request.args.get("text")
    data = db.session.execute("select * "
                              "from baseinfo "
                              "where Code like '%{}'".format(q_text))
    data_list = list(data)
    if data_list:
        code = data_list[0].Code
        code = code[2:]
        url = "http://quotes.money.163.com/f10/nbcg_{}.html#01d04".format(code)
        headers = {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/72.0.3626.96 Safari/537.36'
        }
        req = requests.get(url, headers).text
        html = BeautifulSoup(req, "html5lib")
        info = html.find_all('div', class_="inner_box")
        view = []
        tr = info[2].find('tbody').find_all('tr')
        for i in tr[1:]:
            td = i.find_all('td')
            data_item2 = {
                "name": td[0].get_text(),  # 姓名
                "bdrq": td[1].get_text(),  # 变动日期
                "bdyy": td[2].get_text(),  # 变动原因
                "bdsl": td[3].get_text(),  # 变动数量
                "cjjj": td[4].get_text(),  # 成交均价
                "bdhcgs": td[5].get_text(),  # 变动后持股数
                "glgx": td[6].get_text()  # 关联关系
            }
            view.append(data_item2)
            data_pkg = {"status": "success", "datas": view}
    else:
        data_pkg = {"status": "failed"}
    return json.dumps(data_pkg)
