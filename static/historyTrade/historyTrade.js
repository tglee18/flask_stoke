$(function () {
    RequestUtils.initBind();
});

var RequestUtils = {
    //{#绑定界面的按钮事件#}
    initBind: function () {
        $("#getHistory").on("click", function () {
            // console.log($("#cmpny_select option:selected").val())
            RequestUtils.get_history();
        });
    },
    get_history: function () {
        var new_window = window.open();
        $.ajax({
            url: "/historyTrade/download_historyTrade",
            type: "GET",
            data: {
                begin_year: $("#begin_year").val(),
                begin_month: $("#begin_month").val(),
                begin_day: $("#begin_day").val(),
                end_year: $("#end_year").val(),
                end_month: $("#end_month").val(),
                end_day: $("#end_day").val(),
                text: $("#stoke_code").val()
            },
            dataType: "json",
            success: function (data) {
                console.log(data.datas)
                new_window.location = data.datas;
            }
        });
    }
};