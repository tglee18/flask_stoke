$(function () {
        RequestUtils.initBind();
    });

    var RequestUtils = {
        //{#绑定界面的按钮事件#}
        initBind: function () {
            $("#getDealinfo").on("click", function () {
                // console.log($("#cmpny_select option:selected").val())
                RequestUtils.get_dealinfo();
            });
        },
        get_dealinfo: function () {
            $.ajax({
                url: "/deal/get_dealinfo",
                type: "GET",
                data: {text: $("#stoke_code").val()},
                dataType: "json",
                success: function (data) {
                    console.log(data)
                }
            });
        }
    };