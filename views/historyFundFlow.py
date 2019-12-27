import json
import requests
from flask import render_template, request, Blueprint
from config import db, is_login
from bs4 import BeautifulSoup

historyFundFlow = Blueprint('historyFundFlow', __name__)


@historyFundFlow.route('/')
@is_login
def index():
    return render_template("historyFundFlow.html")


@historyFundFlow.route('/get_FundFlow7')
def get_data():
    q_text = request.args.get("text")
    data = db.session.execute("select * from baseinfo where Code like '%{}'".format(q_text))
    data_list = list(data)
    if data_list:
        code = data_list[0].Code
        code = code[2:]
        url = "http://quotes.money.163.com/trade/lszjlx_{}.html#01b08".format(code)
        headers = {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/72.0.3626.96 Safari/537.36'
        }
        req = requests.get(url, headers).text
        html = BeautifulSoup(req, "html5lib")
        info = html.find('div', class_="inner_box").find('table', class_="table_bg001 border_box")
        tr = info.find_all('tr')
        view_data = []
        for i in range(7):
            td = tr[i + 1].find_all('td')
            data_item = {
                "date": td[0].get_text(),  # 日期
                "close": td[1].get_text(),  # 收盘价
                "percent": td[2].get_text(),  # 涨跌幅
                "turnover_rate": td[3].get_text(),  # 换手率
                "inflow": td[4].get_text(),  # 资金流入
                "outflow": td[5].get_text(),  # 资金流出
                "net_inflow": td[6].get_text(),  # 净流入
                "main_inflow": td[7].get_text(),  # 主力流入
                "main_outflow": td[8].get_text(),  # 主力流出
                "main_net_inflow": td[9].get_text()  # 主力净流入
            }
            view_data.append(data_item)
        data_pkg = {"status": "success", "datas": view_data}
    else:
        data_pkg = {"status": "failed"}

    return json.dumps(data_pkg)


@historyFundFlow.route('/get_HistoryFundFlow')
def get_data2():
    q_text = request.args.get("text")
    data = db.session.execute("select * from baseinfo where Code like '%{}'".format(q_text))
    data_list = list(data)
    if data_list:
        code = data_list[0].Code
        code = code[2:]
        view_data = []
        k = 0
        while 1:
            url = "http://quotes.money.163.com/trade/lszjlx_{},{}.html#01b08".format(code, k)
            headers = {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/72.0.3626.96 Safari/537.36'
            }
            req = requests.get(url, headers).text
            html = BeautifulSoup(req, "html5lib")
            info = html.find('div', class_="inner_box").find('table', class_="table_bg001 border_box")
            tr = info.find_all('tr')
            if len(tr) == 1:
                break
            else:
                for i in tr[1:]:
                    td = i.find_all('td')
                    data_item = {
                        "date": td[0].get_text(),  # 日期
                        "close": td[1].get_text(),  # 收盘价
                        "percent": td[2].get_text(),  # 涨跌幅
                        "turnover_rate": td[3].get_text(),  # 换手率
                        "inflow": td[4].get_text(),  # 资金流入
                        "outflow": td[5].get_text(),  # 资金流出
                        "net_inflow": td[6].get_text(),  # 净流入
                        "main_inflow": td[7].get_text(),  # 主力流入
                        "main_outflow": td[8].get_text(),  # 主力流出
                        "main_net_inflow": td[9].get_text()  # 主力净流入
                    }
                    view_data.append(data_item)
                k += 1
        data_pkg = {"status": "success", "datas": view_data}
        return json.dumps(data_pkg)
    else:
        data_pkg = {"status": "failed"}
        return json.dumps(data_pkg)
