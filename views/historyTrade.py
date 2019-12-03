import json
from flask import render_template, request, Blueprint
from config import db, is_login

historyTrade = Blueprint('historyTrade', __name__)


@historyTrade.route('/')
@is_login
def index():
    return render_template("historyTrade.html")


@historyTrade.route('/download_historyTrade', methods=["GET"])
def get_history():
    begin_year = request.args.get("begin_year")
    begin_month = request.args.get("begin_month")
    begin_day = request.args.get("begin_day")
    end_year = request.args.get("end_year")
    end_month = request.args.get("end_month")
    end_day = request.args.get("end_day")
    q_text = request.args.get("text")

    begin = str(begin_year) + str(begin_month) + str(begin_day)
    end = str(end_year) + str(end_month) + str(end_day)

    data = db.session.execute("select * from baseinfo where Code like '%{}'".format(q_text))
    data_list = list(data)

    if data_list:
        code = data_list[0].Code
        judge = code[1]
        if judge == 'H':
            code_new = '0' + code[2:]
        else:
            code_new = '1' + code[2:]

        url = "http://quotes.money.163.com/service/chddata.html?code={}&start={}&end={" \
              "}&fields=TCLOSE;HIGH;LOW;TOPEN;LCLOSE;CHG;PCHG;TURNOVER;VOTURNOVER;VATURNOVER;TCAP;MCAP".format(code_new, begin, end)
        data_pkg = {"status": "success",
                    "datas": url}
    else:
        data_pkg = {"status": "failed"}
    return json.dumps(data_pkg)

