import json
import requests
from flask import render_template, request, Blueprint
from config import db
from bs4 import BeautifulSoup

fund_flow = Blueprint('fund_flow', __name__)


@fund_flow.route('/')
def index():
    return render_template("fund_flow.html")


@fund_flow.route('/fund_flow')
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
    url = "http://quotes.money.163.com/trade/lszjlx_{}.html#01b08".format(code)
    headers = {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/72.0.3626.96 Safari/537.36'
    }
    req = requests.get(url, headers).text
    html = BeautifulSoup(req, "html5lib")
    info = html.find('div', class_="inner_box").find('table', class_="table_bg001 border_box")
    tr = info.find_all('tr')
    view = []
    for i in range(7):
        td = tr[i + 1].find_all('td')
        data_item2 = {
            "id": i,                            #简单的序号
            "date": td[0].get_text(),           #日期
            "close": td[1].get_text(),          #收盘价
            "percent": td[2].get_text(),        #涨跌幅
            "turnover_rate": td[3].get_text(),  #换手率
            "inflow": td[4].get_text(),         #资金流入
            "outflow": td[5].get_text(),        #资金流出
            "net_inflow": td[6].get_text(),     #净流入
            "main_inflow": td[7].get_text(),    #主力流入
            "main_outflow": td[8].get_text(),   #主力流出
            "main_net_inflow": td[9].get_text() #主力净流入
        }
        view.append(data_item2)
    return json.dumps(view)
