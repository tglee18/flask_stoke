from flask import render_template, request, Blueprint
from config import db

history = Blueprint('history', __name__)


@history.route('/')
def index():
    return render_template("history.html")


@history.route('/get_history', methods=["GET"])
def get_history():
    begin_year = request.args.get("begin_year")
    begin_month = request.args.get("begin_month")
    begin_day = request.args.get("begin_day")
    end_year = request.args.get("end_year")
    end_month = request.args.get("end_month")
    end_day = request.args.get("end_day")
    q_type = request.args.get("type")
    q_text = request.args.get("text")

    begin = str(begin_year) + str(begin_month) + str(begin_day)
    end = str(end_year) + str(end_month) + str(end_day)

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
    if judge == 'H':
        code_new = '0' + code[2:]
    else:
        code_new = '1' + code[2:]

    url = "http://quotes.money.163.com/service/chddata.html?code={}&start={}&end={" \
          "}&fields=TCLOSE;HIGH;LOW;TOPEN;LCLOSE;CHG;PCHG;TURNOVER;VOTURNOVER;VATURNOVER;TCAP;MCAP".format(code_new, begin, end)

    return url
