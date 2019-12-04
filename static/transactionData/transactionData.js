$(function () {
        RequestUtils.initBind();
    });

    var RequestUtils = {
        initBind: function () {
            $("#getTransactionData7").on("click", function () {
                RequestUtils.get_transactionData7();
            });
            $("#getHistoryTransactionData").on("click", function () {
                RequestUtils.get_HistoryTransactionData();
            });
        },
        get_transactionData7: function () {
            $.ajax({
                url: "/transactionData/get_transactionData7",
                type: "GET",
                data: {type: $("#cmpny_select option:selected").val(),
                        text: $("#stoke_code").val()},
                dataType: "json",
                success: function (data) {
                    console.log(data)
                }
            });
        },
        get_HistoryTransactionData: function () {
            $.ajax({
                url: "/transactionData/get_HistoryTransactionData",
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