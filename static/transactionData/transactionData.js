$(function () {
        RequestUtils.initBind();
    });

    var RequestUtils = {
        //{#绑定界面的按钮事件#}
        initBind: function () {
            $("#getTransactionData").on("click", function () {
                // console.log($("#cmpny_select option:selected").val())
                RequestUtils.get_transactionData();
            });
        },
        get_transactionData: function () {
            $.ajax({
                url: "/transactionData/get_transactionData",
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