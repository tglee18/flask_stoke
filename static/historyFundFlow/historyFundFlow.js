$(function () {
    RequestUtils.initBind();
});

var RequestUtils = {
    //{#绑定界面的按钮事件#}
    initBind: function () {
        $("#getFundFlow7").on("click", function () {
            RequestUtils.get_fundFlow7();
        });
        $("#getHistoryFundFlow").on("click", function () {
            RequestUtils.get_HistoryFundFlow();
        });
    },
    get_fundFlow7: function () {
        $.ajax({
            url: "/historyFundFlow/get_FundFlow7",
            type: "GET",
            data: {text: $("#stoke_code").val()},
            dataType: "json",
            success: function (data) {
                console.log(data)
            }
        });
    },
    get_HistoryFundFlow: function () {
        $.ajax({
            url: "/historyFundFlow/get_HistoryFundFlow",
            type: "GET",
            data: {text: $("#stoke_code").val()},
            dataType: "json",
            success: function (data) {
                console.log(data)
            }
        });
    }
};