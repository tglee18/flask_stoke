$(function () {
    function getUrlParam(name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i"); //构造一个含有目标参数的正则表达式对象
        var r = window.location.search.substr(1).match(reg);  //匹配目标参数
        if (r != null) return decodeURI(r[2]);
        return null; //返回参数值
    };

    var companyID = getUrlParam('compID');
    $('#compIndex').attr('href','/comp_index?compID='+companyID);
    $('#lsjysj').attr('href','/transactionData?compID='+companyID);
    $('#lszjlx').attr('href','/historyFundFlow?compID='+companyID);
    $('#zjlx').attr('href','/zijinliuxiang?compID='+companyID);
    $('#zjlx1').attr('href','/zijinliuxiang?compID='+companyID);
    $('#compAnalysis').attr('href','/analysis?compID='+companyID);
    $('#compStockHolder').attr('href','/staff?compID='+companyID);
    $('#compInfo').attr('href','/company?compID='+companyID);
    var info_arr = [];
    $.ajax({
        url: "/baseinfo/get_baseinfo",
        type: "GET",
        data: {
            type: "code",
            text: companyID
        },
        dataType: "json",
        success: function (data) {
            let comp_info=data.datas[0];
            let td_arr=$("td").not("#tag");
            console.log(td_arr);
           $(td_arr[0]).text(comp_info["gsmc"]);
            $(td_arr[1]).text(comp_info["ywmc"]);
            $(td_arr[2]).text(comp_info["cym"]);
            $(td_arr[3]).text(comp_info["agdm"]);
            $(td_arr[4]).text(comp_info["bgjc"]);
            $(td_arr[5]).text(comp_info["bgdm"]);
            $(td_arr[6]).text(comp_info["bgjc"]);
            $(td_arr[7]).text(comp_info["hgdm"]);
           $(td_arr[8]).text(comp_info["hgjc"]);
            $(td_arr[9]).text(comp_info["zqlb"]);
            $(td_arr[10]).text(comp_info["sshy"]);
            $(td_arr[11]).text(comp_info["ssjys"]);
            $(td_arr[12]).text(comp_info["sszjhhy"]);
            $(td_arr[13]).text(comp_info["lxdh"]);
            $(td_arr[14]).text(comp_info["dzxx"]);
            $(td_arr[15]).text(comp_info["cz"]);
            $(td_arr[16]).text(comp_info["gswz"]);
            $(td_arr[17]).text(comp_info["bgdz"]);
            $(td_arr[18]).text(comp_info["zcdz"]);
            $(td_arr[19]).text(comp_info["qy"]);
            $(td_arr[20]).text(comp_info["yzbm"]);
            $(td_arr[21]).text(comp_info["zczb"]);
            $(td_arr[22]).text(comp_info["gsdj"]);
            $(td_arr[23]).text(comp_info["gyrs"]);
            $(td_arr[24]).text(comp_info["glryrs"]);
            $(td_arr[25]).text(comp_info["lssws"]);
            $(td_arr[26]).text(comp_info["kjssws"]);
            $(td_arr[27]).text(comp_info["gsjj"]);
            $(td_arr[28]).text(comp_info["jyfw"]);
        }
    });


});
