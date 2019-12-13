import json
from functools import wraps

from flask import render_template, request, Blueprint, session

from config import db, is_login

analysis = Blueprint('webaccess', __name__)


@analysis.route('/')
@is_login
def index():
    return render_template("baseinfo.html")


@analysis.route('/get_baseinfo', methods=["POST", "GET"], endpoint="get_baseinfo")
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
    if data_list:  # 如果查询结果存在
        view_data = []

        def convert_to_dic(item):
            data_item = {"agdm": item.agdm,
                         "gsmc": item.gsmc,
                         "ywmc": item.ywmc,
                         "cym": item.cym,
                         "agjc": item.agjc,
                         "bgdm": item.bgdm,
                         "bgjc": item.bgjc,
                         "hgdm": item.hgdm,
                         "hgjc": item.hgjc,
                         "zqlb": item.zqlb,
                         "sshy": item.sshy,
                         "ssjys": item.ssjys,
                         "sszjhhy": item.sszjhhy,
                         "zjl": item.zjl,
                         "frdb": item.frdb,
                         "dm": item.dm,
                         "dsz": item.dsz,
                         "zqswdb": item.zqswdb,
                         "dlds": item.dlds,
                         "lxdh": item.lxdh,
                         "dzxx": item.dzxx,
                         "cz": item.cz,
                         "gswz": item.gswz,
                         "bgdz": item.bgdz,
                         "zcdz": item.zcdz,
                         "qy": item.qy,
                         "yzbm": item.yzbm,
                         "zczb": item.zczb,
                         "gsdj": item.gsdj,
                         "gyrs": item.gyrs,
                         "glryrs": item.glryrs,
                         "lssws": item.lssws,
                         "kjssws": item.kjssws,
                         "gsjj": item.gsjj,
                         "jyfw": item.jyfw,
                         "clrq": item.clrq,
                         "ssrq": item.ssrq,
                         "fxsyl": item.fxsyl,
                         "wsfxrq": item.wsfxrq,
                         "fxfs": item.fxfs,
                         "mgmz": item.mgmz,
                         "fxl": item.fxl,
                         "mgfxj": item.mgfxj,
                         "fxfy": item.fxfy,
                         "fxzsz": item.fxzsz,
                         "mjzjje": item.mjzjje,
                         "srkpj": item.srkpj,
                         "srspj": item.srspj,
                         "srhsl": item.srhsl,
                         "srzgj": item.srzgj,
                         "wxpszql": item.wxpszql,
                         "djzql": item.djzql,
                         "Code": item.Code,
                         "CodeType": item.CodeType}
            view_data.append(data_item)

        [convert_to_dic(i) for i in data_list]

        data_pkg = {"status": "success",
                    "datas": view_data}
    else:
        data_pkg = {"status": "failed"}
    return json.dumps(data_pkg)
