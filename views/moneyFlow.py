import json

import requests
from flask import render_template, request, Blueprint

moneyFlow = Blueprint('moneyFlow', __name__)


@moneyFlow.route('/')
def index():
    return render_template("moneyFlow.html")


@moneyFlow.route('/get_moneyFlow', endpoint="get_moneyFlow")
def get_data():
    stokeCode = request.args.get("code")
    url = "http://quotes.money.163.com/service/zjlx_chart.html?symbol={}".format(stokeCode)
    headers = {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/72.0.3626.96 Safari/537.36'
    }
    req = requests.get(url, headers)
    json_response = req.content.decode()  # 获取r的文本 就是一个json字符串
    dict_json = json.loads(json_response)  # 将json字符串转换成dic字典对象
    return json.dumps(dict_json)
