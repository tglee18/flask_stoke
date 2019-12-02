from config import app
from views.login import login
from views.baseinfo import analysis
from views.fininfo import fininfo
from views.historyTrade import historyTrade
from views.register import register
from views.transactionData import transactionData
from views.historyFundFlow import historyFundFlow

# 将蓝图注册到app
app.register_blueprint(analysis, url_prefix="/baseinfo")
app.register_blueprint(login, url_prefix="/login")
app.register_blueprint(fininfo, url_prefix="/fininfo")
app.register_blueprint(historyTrade, url_prefix="/historyTrade")
app.register_blueprint(register, url_prefix="/register")
app.register_blueprint(transactionData, url_prefix="/transactionData")
app.register_blueprint(historyFundFlow, url_prefix="/historyFundFlow")

if __name__ == '__main__':
    app.run()
