$(function () {
        RequestUtils.initBind();
    });

    var RequestUtils = {
        //{#绑定界面的按钮事件#}
        initBind: function () {
            $("#getTransactionData").on("click", function () {
                // console.log($("#cmpny_select option:selected").val())
                RequestUtils.get_transactiondata();
            });
        },
        get_transactiondata: function () {
            $.ajax({
                url: "/transaction_data/transaction_data",
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