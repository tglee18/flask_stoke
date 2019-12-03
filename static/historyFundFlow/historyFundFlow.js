$(function () {
        RequestUtils.initBind();
    });

    var RequestUtils = {
        //{#绑定界面的按钮事件#}
        initBind: function () {
            $("#getFundFlow").on("click", function () {
                RequestUtils.get_fundFlow();
            });
        },
        get_fundFlow: function () {
            $.ajax({
                url: "/historyFundFlow/get_historyFundFlow",
                type: "GET",
                data: {text: $("#stoke_code").val()},
                dataType: "json",
                success: function (data) {
                    console.log(data)
                }
            });
        }
    };