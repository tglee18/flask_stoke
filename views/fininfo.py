import requests
import json
from flask import render_template, request, Blueprint
from config import db, is_login

fininfo = Blueprint('fininfo', __name__)


@fininfo.route('/')
@is_login
def index():
    return render_template("fininfo.html")


@fininfo.route('/get_fininfo', methods=["GET"])
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
    judge = code[1]
    if (judge == 'H'):
        code_new = '0' + code[2:]
    else:
        code_new = '1' + code[2:]
    url = "http://api.money.126.net/data/feed/0000001,0601128,1002142,0601818,0601166,{},money.api?callback=_ntes_quote_callback62576441".format(
        code_new)
    headers = {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/72.0.3626.96 Safari/537.36'
    }
    response = requests.get(url, headers)
    response.encoding = 'utf-8'
    html = response.text
    html = html[28:]
    html = html.strip().strip('();')
    dict_json = json.loads(html)
    name = dict_json['{}'.format(code_new)]['name']
    price = dict_json['{}'.format(code_new)]['price']
    arrow = dict_json['{}'.format(code_new)]['arrow']
    updown = dict_json['{}'.format(code_new)]['updown']
    percent = dict_json['{}'.format(code_new)]['percent']
    open = dict_json['{}'.format(code_new)]['open']
    yestclose = dict_json['{}'.format(code_new)]['yestclose']
    high = dict_json['{}'.format(code_new)]['high']
    low = dict_json['{}'.format(code_new)]['low']
    volume = dict_json['{}'.format(code_new)]['volume']
    turnover = dict_json['{}'.format(code_new)]['turnover']
    view_data = {
        "company": name,  # 公司
        "price": price,  # 价格
        "arrow": arrow,  # 变化
        "updown": updown,  # 变化量
        "percent": percent,  # 变化百分比
        "open": open,  # 今开
        "yestclose": yestclose,  # 昨收
        "high": high,  # 最高
        "low": low,  # 最低
        "volume": volume,  # 成交量
        "turnover": turnover  # 成交额
    }
    return json.dumps(view_data)
