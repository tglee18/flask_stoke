import requests
import json
from flask import render_template, request, Blueprint
from config import db, is_login
from bs4 import BeautifulSoup

deal = Blueprint('deal', __name__)


@deal.route('/')
@is_login
def index():
    return render_template("deal.html")


@deal.route('/get_dealinfo', methods=["GET"])
def get_deal():
    q_text = request.args.get("text")

    data = db.session.execute("select * "
                              "from baseinfo "
                              "where Code like '%{}'".format(q_text))

    data_list = list(data)
    if data_list:  # 查询结果存在
        code = data_list[0].Code
        judge = code[1]
        if judge == 'H':
            code = '0' + code[2:]
        else:
            code = '1' + code[2:]
        headers = {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/72.0.3626.96 Safari/537.36'
        }
        url1 = "http://api.money.126.net/data/feed/0000001,0601857,0601600,0601398,0600028,0600019,0601318,0600030,0601939,0601088,0600900,1002024,0600111,0600031,1000002,0601128,1002142,0600036,0600919,{},money.api?callback=_ntes_quote_callback54340146".format(
            code)
        url2 = "http://quotes.money.163.com/{}.html".format(code)
        response = requests.get(url1, headers)
        response.encoding = 'utf-8'
        html = response.text
        html = html[28:]
        html = html.strip().strip('();')
        dict_json = json.loads(html)

        ask1 = dict_json['{}'.format(code)]['ask1']
        ask2 = dict_json['{}'.format(code)]['ask2']
        ask3 = dict_json['{}'.format(code)]['ask3']
        ask4 = dict_json['{}'.format(code)]['ask4']
        ask5 = dict_json['{}'.format(code)]['ask5']
        askvol1 = round(dict_json['{}'.format(code)]['askvol1'] / 100)
        askvol2 = round(dict_json['{}'.format(code)]['askvol2'] / 100)
        askvol3 = round(dict_json['{}'.format(code)]['askvol3'] / 100)
        askvol4 = round(dict_json['{}'.format(code)]['askvol4'] / 100)
        askvol5 = round(dict_json['{}'.format(code)]['askvol5'] / 100)
        bid1 = dict_json['{}'.format(code)]['bid1']
        bid2 = dict_json['{}'.format(code)]['bid2']
        bid3 = dict_json['{}'.format(code)]['bid3']
        bid4 = dict_json['{}'.format(code)]['bid4']
        bid5 = dict_json['{}'.format(code)]['bid5']
        bidvol1 = round(dict_json['{}'.format(code)]['bidvol1'] / 100)
        bidvol2 = round(dict_json['{}'.format(code)]['bidvol2'] / 100)
        bidvol3 = round(dict_json['{}'.format(code)]['bidvol3'] / 100)
        bidvol4 = round(dict_json['{}'.format(code)]['bidvol4'] / 100)
        bidvol5 = round(dict_json['{}'.format(code)]['bidvol5'] / 100)
        price = dict_json['{}'.format(code)]['price']

        askvol = askvol1 + askvol2 + askvol3 + askvol4 + askvol5
        bidvol = bidvol1 + bidvol2 + bidvol3 + bidvol4 + bidvol5

        weicha = bidvol - askvol
        weibi = str(round((weicha / (askvol + bidvol)) * 100, 2)) + "%"

        req = requests.get(url2, headers).text
        html2 = BeautifulSoup(req, "html5lib")
        info = html2.find('div', class_="compare_cont border_box").find('div', class_="title_02 wbwc_title").find_all(
            'span')
        outside = info[0].find('em').get_text()
        inside = info[1].find('em').get_text()

        view_data = {
            "weibi": weibi,  # 委比
            "weicha": weicha,  # 委差
            "ask1": ask1,  # 卖一价格
            "ask2": ask2,  # 卖二价格
            "ask3": ask3,  # 卖三价格
            "ask4": ask4,  # 卖四价格
            "ask5": ask5,  # 卖五价格
            "askvol1": askvol1,  # 卖一数量
            "askvol2": askvol2,  # 卖二数量
            "askvol3": askvol3,  # 卖三数量
            "askvol4": askvol4,  # 卖四数量
            "askvol5": askvol5,  # 卖五数量
            "price": price,  # 当前价
            "bid1": bid1,  # 买一价格
            "bid2": bid2,  # 买二价格
            "bid3": bid3,  # 买三价格
            "bid4": bid4,  # 买四价格
            "bid5": bid5,  # 买五价格
            "bidvol1": bidvol1,  # 买一数量
            "bidvol2": bidvol2,  # 买二数量
            "bidvol3": bidvol3,  # 买三数量
            "bidvol4": bidvol4,  # 买四数量
            "bidvol5": bidvol5,  # 买五数量
            "outside": outside,  # 外盘
            "inside": inside  # 内盘
        }
        data_pkg = {"datas": view_data,
                    "status": "success"}
        return json.dumps(data_pkg)
