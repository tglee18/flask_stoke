$(function () {
        RequestUtils.initBind();
    });

    var RequestUtils = {
        initBind: function () {
            $("#getTransactionData").on("click", function () {
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