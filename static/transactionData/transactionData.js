// $(function () {
//     RequestUtils.initBind();
// });
//
// var RequestUtils = {
//     initBind: function () {
//         $("#getTransactionData7").on("click", function () {
//             RequestUtils.get_transactionData7();
//         });
//         $("#getHistoryTransactionData").on("click", function () {
//             RequestUtils.get_HistoryTransactionData();
//         });
//     },
//     get_transactionData7: function () {
//         $.ajax({
//             url: "/transactionData/get_transactionData7",
//             type: "GET",
//             data: {text: $("#stoke_code").val()},
//             dataType: "json",
//             success: function (data) {
//                 console.log(data)
//             }
//         });
//     },
//     get_HistoryTransactionData: function () {
//         $.ajax({
//             url: "/transactionData/get_HistoryTransactionData",
//             type: "GET",
//             data: {text: $("#stoke_code").val()},
//             dataType: "json",
//             success: function (data) {
//                 console.log(data)
//             }
//         });
//     }
// };

$(function() {
    function getUrlParam(name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i"); //构造一个含有目标参数的正则表达式对象
        var r = window.location.search.substr(1).match(reg);  //匹配目标参数
        if (r != null) return decodeURI(r[2]);
        return null; //返回参数值
    };

    var companyID = getUrlParam('compID');
    $('#compIndex').attr('href', '/comp_index?compID=' + companyID);
    $('#lsjysj').attr('href', '/comp_index?compID=' + companyID);
    $('#lszjlx').attr('href', '/comp_index?compID=' + companyID);
    $('#zjlx').attr('href', '/zijinliuxiang?compID=' + companyID);
    $('#compAnalysis').attr('href', '/analysis?compID=' + companyID);
    $('#compStockHolder').attr('href', '/staff?compID=' + companyID);
    $('#compInfo').attr('href', '/company?compID=' + companyID);


    $.ajax({
        url: "/transactionData/get_HistoryTransactionData",
        type: "GET",
        data: {
            text: companyID
        },
        dataType: "json",
        success: function (data) {
            let info_arr = [];
            for (let i in data.datas) {
                info_arr.push(data.datas[i]);
            }
            let trstr = "";
            $.each(info_arr, function (index, element) {
                if(parseFloat(info_arr[index]['percent'])>0){
                    trstr = `<tr><td>${info_arr[index]['date']}</td><td>${info_arr[index]['open']}</td><td>${info_arr[index]['high']}</td><td>${info_arr[index]['low']}</td><td class="cRed">${info_arr[index]['close']}</td><td class="cRed">${info_arr[index]['updown']}</td><td class="cRed">${info_arr[index]['percent']}</td><td>${info_arr[index]['volume']}</td><td>${info_arr[index]['turnover']}</td><td>${info_arr[index]['amplitude']}</td><td>${info_arr[index]['turnover_rate']}</td></tr>`
                }
                else{
                    trstr = `<tr><td>${info_arr[index]['date']}</td><td>${info_arr[index]['open']}</td><td>${info_arr[index]['high']}</td><td>${info_arr[index]['low']}</td><td class="cGreen">${info_arr[index]['close']}</td><td class="cGreen">${info_arr[index]['updown']}</td><td class="cGreen">${info_arr[index]['percent']}</td><td>${info_arr[index]['volume']}</td><td>${info_arr[index]['turnover']}</td><td>${info_arr[index]['amplitude']}</td><td>${info_arr[index]['turnover_rate']}</td></tr>`
                }
                $("#transactionData").append(trstr);
            })
        }
    });
})