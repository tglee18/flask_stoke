$(function () {
        RequestUtils.initBind();
    });

    var RequestUtils = {
        //{#绑定界面的按钮事件#}
        initBind: function () {
            $("#getFininfo").on("click", function () {
                // console.log($("#cmpny_select option:selected").val())
                RequestUtils.get_fininfo();
            });
        },
        get_fininfo: function () {
            $.ajax({
                url: "/fininfo/get_fininfo",
                type: "GET",
                data: {type: $("#cmpny_select option:selected").val(),
                        text: $("#stoke_code").val()},
                dataType: "json",
                success: function (data) {
                    console.log(data)
                }
            });
        }
    };