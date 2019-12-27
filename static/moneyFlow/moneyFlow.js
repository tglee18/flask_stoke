$(function () {
    RequestUtils.initBind();
});

var RequestUtils = {
    //{#绑定界面的按钮事件#}
    initBind: function () {
        $("#getMoneyFlow").on("click", function () {
            // console.log($("#cmpny_select option:selected").val())
            RequestUtils.get_moneyFlow();
        });

        $("#zc").on("click", function () {
            RequestUtils.get_zc();
        });

        $("#jc").on("click", function () {
            RequestUtils.get_jc();
        });
    },

    get_moneyFlow: function () {
        $.ajax({
            url: "/moneyFlow/get_moneyFlow",
            type: "GET",
            data: {stokeCode: $("#stoke_code").val()},
            dataType: "json",
            success: function (data) {
                console.log(data)
            }
        });
    },

    get_zc: function () {
        $.ajax({
            url: "/moneyFlow/get_zc",
            type: "GET",
            data: {stokeCode: $("#stoke_code").val()},
            dataType: "html",
            success: function (data) {
                console.log(data)
            }
        });
    },

    get_jc: function () {
        $.ajax({
            url: "/moneyFlow/get_jc",
            type: "GET",
            data: {stokeCode: $("#stoke_code").val()},
            dataType: "html",
            success: function (data) {
                console.log(data)
            }
        });
    }
};