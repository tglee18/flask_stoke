import json
import requests
from flask import render_template, request, Blueprint
from config import db, is_login
from bs4 import BeautifulSoup

transactionData = Blueprint('transactionData', __name__)


@transactionData.route('/')
@is_login
def index():
    return render_template("transactionData.html")


@transactionData.route('/get_transactionData7')
def get_data():
    q_text = request.args.get("text")
    data = db.session.execute("select * "
                              "from baseinfo "
                              "where Code like '%{}'".format(q_text))

    data_list = list(data)
    if data_list:
        code = data_list[0].Code
        code = code[2:]
        url = "http://quotes.money.163.com/trade/lsjysj_{}.html?year=2019&season=4".format(code)
        headers = {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/72.0.3626.96 Safari/537.36'
        }
        req = requests.get(url, headers).text
        html = BeautifulSoup(req, "html5lib")
        info = html.find('div', class_="inner_box").find('table', class_="table_bg001 border_box limit_sale")
        tr = info.find_all('tr')
        view = []
        for i in range(7):
            td = tr[i + 1].find_all('td')
            data_item2 = {
                "date": td[0].get_text(),  # 日期
                "open": td[1].get_text(),  # 开盘价
                "high": td[2].get_text(),  # 最高价
                "low": td[3].get_text(),  # 最低价
                "close": td[4].get_text(),  # 收盘价
                "updown": td[5].get_text(),  # 涨跌额
                "percent": td[6].get_text(),  # 涨跌幅
                "volume": td[7].get_text(),  # 成交量
                "turnover": td[8].get_text(),  # 成交金额
                "amplitude": td[9].get_text(),  # 振幅
                "turnover_rate": td[10].get_text()  # 换手率
            }
            view.append(data_item2)
        data_pkg = {"status": "success", "datas": view}
    else:
        data_pkg = {"status": "failed"}

    return json.dumps(data_pkg)


@transactionData.route('/get_HistoryTransactionData')
def get_data2():
    q_text = request.args.get("text")
    data = db.session.execute("select * "
                              "from baseinfo "
                              "where Code like '%{}'".format(q_text))

    data_list = list(data)
    if data_list:
        code = data_list[0].Code
        code = code[2:]
        # while 1:
        url = "http://quotes.money.163.com/trade/lsjysj_{}.html?year=2019&season=4".format(code)
        headers = {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/72.0.3626.96 Safari/537.36'
        }
        req = requests.get(url, headers).text
        html = BeautifulSoup(req, "html5lib")
        info = html.find('div', class_="inner_box").find('table', class_="table_bg001 border_box limit_sale")
        tr = info.find_all('tr')
        view = []
        for i in tr[1:]:
            td = i.find_all('td')
            data_item2 = {
                "date": td[0].get_text(),  # 日期
                "open": td[1].get_text(),  # 开盘价
                "high": td[2].get_text(),  # 最高价
                "low": td[3].get_text(),  # 最低价
                "close": td[4].get_text(),  # 收盘价
                "updown": td[5].get_text(),  # 涨跌额
                "percent": td[6].get_text(),  # 涨跌幅
                "volume": td[7].get_text(),  # 成交量
                "turnover": td[8].get_text(),  # 成交金额
                "amplitude": td[9].get_text(),  # 振幅
                "turnover_rate": td[10].get_text()  # 换手率
            }
            view.append(data_item2)
        data_pkg = {"status": "success", "datas": view}
    else:
        data_pkg = {"status": "failed"}
    return json.dumps(data_pkg)
