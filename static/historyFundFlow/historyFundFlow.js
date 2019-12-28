// $(function () {
//     RequestUtils.initBind();
// });
//
// var RequestUtils = {
//     //{#绑定界面的按钮事件#}
//     initBind: function () {
//         $("#getFundFlow7").on("click", function () {
//             RequestUtils.get_fundFlow7();
//         });
//         $("#getHistoryFundFlow").on("click", function () {
//             RequestUtils.get_HistoryFundFlow();
//         });
//     },
//     get_fundFlow7: function () {
//         $.ajax({
//             url: "/historyFundFlow/get_FundFlow7",
//             type: "GET",
//             data: {text: $("#stoke_code").val()},
//             dataType: "json",
//             success: function (data) {
//                 console.log(data)
//             }
//         });
//     },
//     get_HistoryFundFlow: function () {
//         $.ajax({
//             url: "/historyFundFlow/get_HistoryFundFlow",
//             type: "GET",
//             data: {text: $("#stoke_code").val()},
//             dataType: "json",
//             success: function (data) {
//                 console.log(data)
//             }
//         });
//     }
// };


$(function () {
    $("#fond_flow").mouseover(function () {
        $("#fond_flow :not(:first-child)").css("display", "block");
    });
    $("#fond_flow").mouseout(function () {
        $("#fond_flow :not(:first-child)").css("display", "none");
    });


    function getUrlParam(name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i"); //构造一个含有目标参数的正则表达式对象
        var r = window.location.search.substr(1).match(reg);  //匹配目标参数
        if (r != null) return decodeURI(r[2]);
        return null; //返回参数值
    };

    var companyID = getUrlParam('compID');
    var currentPage = getUrlParam('curP');
    $('#compIndex').attr('href', '/comp_index?compID=' + companyID);
    $('#lsjysj').attr('href', '/transactionData?compID=' + companyID);
    $('#lszjlx').attr('href', '/historyFundFlow?compID=' + companyID + '&curP=1');
    $('#zjlx').attr('href', '/zijinliuxiang?compID=' + companyID);
    $('#zjlx1').attr('href', '/zijinliuxiang?compID=' + companyID);
    $('#compAnalysis').attr('href', '/analysis?compID=' + companyID);
    $('#compStockHolder').attr('href', '/staff?compID=' + companyID);
    $('#compInfo').attr('href', '/company?compID=' + companyID);

    $.ajax({
        url: "/historyFundFlow/get_pageNum",
        type: "GET",
        data: {
            text: companyID
        },
        dataType: "text",
        success: function (data) {
            let trstring = "";
            if (data === "None") {
                trstring = `<td colspan="10">还没有历史交易记录</td>`;
                $("#historyFundFlow").append(trstring);
            } else {
                freshTable();
                if (Number(data) < 8) {
                    for (let i = 1; i <= Number(data); i++) {
                        trstring += `<a class="clickable">${i}</a>`;
                    }
                } else if (Number(data) >= 8) {
                    for (let i = 1; i <= Number(data); i++) {
                        if (i === 1) {
                            if (Number(currentPage) === 1) {
                                trstring += `<span class="current">${i}</span>`;
                            } else {
                                trstring += `<a class="clickable">${i}</a><span>...</span>`;
                            }
                        } else if (i === Number(data)) {
                            if (Number(currentPage) === i) {
                                trstring += `<span class="current">${i}</span>`;
                            } else {
                                trstring += `<span>...</span><a>${i}</a>`;
                            }
                        } else if ((i - 2) <= Number(currentPage) && (i + 2) >= Number(currentPage)) {
                            if (i === Number(currentPage)) {
                                trstring += `<span class="current">${i}</span>`;
                            } else {
                                trstring += `<a class="clickable">${i}</a>`;
                            }
                        }
                    }
                }
                $(".mod_pages").append(trstring);
            }
        }
    });

    $(".mod_pages").on("click", ".clickable", function () {
        console.log("aa");
        let pages = $(this).html();
        window.location.href = "/historyFundFlow?compID=" + companyID + "&curP=" + pages;
    });

    function freshTable() {
        $.ajax({
            url: "/historyFundFlow/get_HistoryFundFlow",
            type: "GET",
            data: {
                text: companyID,
                curP: currentPage
            },
            dataType: "json",
            success: function (data) {
                let info_arr = [];
                for (let i in data.datas) {
                    info_arr.push(data.datas[i]);
                }
                let trstr = "";
                $.each(info_arr, function (index, element) {
                    if (parseFloat(info_arr[index]['percent']) > 0) {
                        trstr = `<tr><td>${info_arr[index]['date']}</td><td class="cRed">${info_arr[index]['close']}</td><td class="cRed">${info_arr[index]['percent']}</td><td>${info_arr[index]['turnover_rate']}</td><td>${info_arr[index]['inflow']}</td><td>${info_arr[index]['outflow']}</td><td class="cRed">${info_arr[index]['net_inflow']}</td><td>${info_arr[index]['main_inflow']}</td><td>${info_arr[index]['main_outflow']}</td><td class="cRed">${info_arr[index]['main_net_inflow']}</td></tr>`
                    } else {
                        trstr = `<tr><td>${info_arr[index]['date']}</td><td class="cGreen">${info_arr[index]['close']}</td><td class="cGreen">${info_arr[index]['percent']}</td><td>${info_arr[index]['turnover_rate']}</td><td>${info_arr[index]['inflow']}</td><td>${info_arr[index]['outflow']}</td><td class="cGreen">${info_arr[index]['net_inflow']}</td><td>${info_arr[index]['main_inflow']}</td><td>${info_arr[index]['main_outflow']}</td><td class="cGreen">${info_arr[index]['main_net_inflow']}</td></tr>`
                    }
                    $("#historyFundFlow").append(trstr);
                })
            }
        });
    }

})