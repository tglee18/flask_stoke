from config import app
from views.moneyFlow import moneyFlow
from views.login import login
from views.baseinfo import analysis
from views.fininfo import fininfo
from views.historyTrade import historyTrade
from views.register import register
from views.transactionData import transactionData
from views.historyFundFlow import historyFundFlow
from views.stockholder import stockholder
from views.deal import deal

# 将蓝图注册到app
app.register_blueprint(analysis, url_prefix="/baseinfo")  # 公司基本信息
app.register_blueprint(login, url_prefix="/login")  # 登录验证
app.register_blueprint(fininfo, url_prefix="/fininfo")  # 实时金融信息
app.register_blueprint(historyTrade, url_prefix="/historyTrade")  # 历史交易记录
app.register_blueprint(register, url_prefix="/register")  # 注册
app.register_blueprint(transactionData, url_prefix="/transactionData")  # 交易信息
app.register_blueprint(historyFundFlow, url_prefix="/historyFundFlow")  # 历史资金流向
app.register_blueprint(moneyFlow, url_prefix="/moneyFlow")  # 详细资金流向
app.register_blueprint(stockholder, url_prefix="/stockholder")  #内部持股
app.register_blueprint(deal, url_prefix="/deal")    #买卖表（买一，卖一）


if __name__ == '__main__':
    app.run()
