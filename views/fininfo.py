import requests
import json
from flask import render_template, request, Blueprint
from config import db, is_login
from bs4 import BeautifulSoup

fininfo = Blueprint('fininfo', __name__)


@fininfo.route('/')
@is_login
def index():
    return render_template("fininfo.html")


@fininfo.route('/get_fininfo', methods=["GET"])
def get_data():
    q_text = request.args.get("text")
    data = db.session.execute("select * from baseinfo where Code like '%{}'".format(q_text))
    data_list = list(data)

    if data_list:
        code = data_list[0].Code
        judge = code[1]
        if judge == 'H':
            code_new = '0' + code[2:]
            code_new2 = 'sh' + code[2:]
        else:
            code_new = '1' + code[2:]
            code_new2 = 'sz' + code[2:]
        url = "http://api.money.126.net/data/feed/0000001,0601128,1002142,0601818,0601166,{},money.api?" \
              "callback=_ntes_quote_callback62576441".format(code_new)
        url2 = "http://quotes.money.163.com/{}.html".format(code_new)
        url3 = "http://sqt.gtimg.cn/q={}&offset=40".format(code_new2)
        url4 = "http://sqt.gtimg.cn/q={}&offset=45".format(code_new2)
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

        req = requests.get(url2, headers).text
        html2 = BeautifulSoup(req, "html5lib")
        info = html2.find('tr', class_="stock_bref")
        highest = info.find('span', class_="cRed").get_text()
        lowest = info.find('span', class_="cGreen").get_text()

        req2 = requests.get(url3, headers).text
        html3 = BeautifulSoup(req2, "html5lib").find('body').get_text()
        syl = html3[11:].strip().strip('"";')

        req3 = requests.get(url4, headers).text
        html4 = BeautifulSoup(req3, "html5lib").find('body').get_text()
        ltsz = html4[11:].strip().strip('"";')

        base_data = {
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
            "turnover": turnover,  # 成交额
            "highest": highest,  #52周最高
            "lowest": lowest,  #52周最低
            "syl": syl,  #市盈率
            "ltsz": ltsz  #流通市值
        }
        data_pkg = {"status": "success",
                     "datas": base_data}
    else:
        data_pkg = {"status": "failed"}
    return json.dumps(data_pkg)
