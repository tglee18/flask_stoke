from config import app
from views.login import login
from views.baseinfo import analysis
from views.fininfo import fininfo
from views.history_trade import history_trade
from views.register import register
from views.transaction_data import transaction_data
from views.fund_flow import fund_flow

# 将蓝图注册到app
app.register_blueprint(analysis, url_prefix="/baseinfo")
app.register_blueprint(login, url_prefix="/login")
app.register_blueprint(fininfo, url_prefix="/fininfo")
app.register_blueprint(history_trade, url_prefix="/history_trade")
app.register_blueprint(register, url_prefix="/register")
app.register_blueprint(transaction_data, url_prefix="/transaction_data")
app.register_blueprint(fund_flow, url_prefix="/fund_flow")

if __name__ == '__main__':
    app.run()
