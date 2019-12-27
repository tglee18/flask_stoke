import json

import requests
from flask import render_template, request, Blueprint

from config import is_login

moneyFlow = Blueprint('moneyFlow', __name__)


@moneyFlow.route('/')
@is_login
def index():
    return render_template("moneyFlow.html")


@moneyFlow.route('/get_moneyFlow', endpoint="get_moneyFlow")
def get_data():
    stokeCode = request.args.get("stokeCode")
    url = "http://quotes.money.163.com/service/zjlx_chart.html?symbol={}".format(stokeCode)
    headers = {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/72.0.3626.96 Safari/537.36'
    }
    req = requests.get(url, headers)
    json_response = req.content.decode()  # 获取r的文本 就是一个json字符串
    dict_json = json.loads(json_response)  # 将json字符串转换成dic字典对象
    return json.dumps(dict_json)


@moneyFlow.route('/get_zc', endpoint="get_zc")
def get_data():
    stokeCode = request.args.get("stokeCode")
    url = "http://quotes.money.163.com/service/zjlx_table.html?symbol={}&type=zc".format(stokeCode)
    headers = {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/72.0.3626.96 Safari/537.36'
    }
    req = requests.get(url, headers)
    json_response = req.content.decode()  # 获取r的文本 就是一个json字符串
    return json_response


@moneyFlow.route('/get_jc', endpoint="get_jc")
def get_data():
    stokeCode = request.args.get("stokeCode")
    url = "http://quotes.money.163.com/service/zjlx_table.html?symbol={}&type=jc".format(stokeCode)
    headers = {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/72.0.3626.96 Safari/537.36'
    }
    req = requests.get(url, headers)
    json_response = req.content.decode()  # 获取r的文本 就是一个json字符串
    return json_response
