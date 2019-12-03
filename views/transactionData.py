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


@transactionData.route('/get_transactionData')
def get_data():
    q_type = request.args.get("type")
    q_text = request.args.get("text")

    if q_type == "code":
        data = db.session.execute("select * "
                                  "from baseinfo "
                                  "where Code like '%{}'".format(q_text))
    elif q_type == "key":
        data = db.session.execute("select * "
                                  "from baseinfo "
                                  "where CONCAT(gsmc,cym,sshy,sszjhhy,bgdz,qy) like '%{}%'".format(q_text))
    data_list = list(data)
    view_data = {}

    def convert_to_dic(item):
        data_item = {
            "code": item.Code
        }
        view_data['code'] = data_item['code']

    [convert_to_dic(i) for i in data_list]
    code = view_data['code']
    code = code[2:]
    url = "http://quotes.money.163.com/trade/lsjysj_{}.html#01b07".format(code)
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
            "id": i,                            #简单的序号
            "date": td[0].get_text(),           #日期
            "open": td[1].get_text(),           #开盘价
            "high": td[2].get_text(),           #最高价
            "low": td[3].get_text(),            #最低价
            "close": td[4].get_text(),          #收盘价
            "updown": td[5].get_text(),         #涨跌额
            "percent": td[6].get_text(),        #涨跌幅
            "volume": td[7].get_text(),         #成交量
            "turnover": td[8].get_text(),       #成交金额
            "amplitude": td[9].get_text(),      #振幅
            "turnover_rate": td[10].get_text()  #换手率
        }
        view.append(data_item2)
    return json.dumps(view)

