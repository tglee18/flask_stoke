$(function () {
        RequestUtils.initBind();
    });

    var RequestUtils = {
        //{#绑定界面的按钮事件#}
        initBind: function () {
            $("#getFundFlow").on("click", function () {
                // console.log($("#cmpny_select option:selected").val())
                RequestUtils.get_fundflow();
            });
        },
        get_fundflow: function () {
            $.ajax({
                url: "/fund_flow/fund_flow",
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