$(document).ready(function () {
    $.ajax({
        url: "/moneyFlow/get_zc",
        type: "GET",
        data: {stokeCode: "000001"},
        dataType: "text",
        success: function (data) {
            $('#table1').html(data);
        }
    });
    $.ajax({
        url: "/moneyFlow/get_jc",
        type: "GET",
        data: {stokeCode: "000001"},
        dataType: "html",
        success: function (data) {
            $('#table2').html(data);
        }
    });
})