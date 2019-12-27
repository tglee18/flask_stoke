$(function() {
    function getUrlParam(name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i"); //构造一个含有目标参数的正则表达式对象
        var r = window.location.search.substr(1).match(reg);  //匹配目标参数
        if (r != null) return decodeURI(r[2]);
        return null; //返回参数值
    };

    var companyID = getUrlParam('compID');
    $('#compIndex').attr('href','/comp_index?compID='+companyID);
    $('#lsjysj').attr('href','/comp_index?compID='+companyID);
    $('#lszjlx').attr('href','/comp_index?compID='+companyID);
    $('#zjlx').attr('href','/zijinliuxiang?compID='+companyID);
    $('#compAnalysis').attr('href','/analysis?compID='+companyID);
    $('#compStockHolder').attr('href','/staff?compID='+companyID);
    $('#compInfo').attr('href','/company?compID='+companyID);

    let info_arr = [];
    $.ajax({
        url: "/stockholder/a",
        type: "GET",
        data: {
            text: companyID
        },
        dataType: "json",
        success: function (data) {
            for (let i in data.datas) {
                info_arr.push(data.datas[i]);
            }
            let trstr="";
            $.each(info_arr,function(index,element){
                trstr=`<tr><td>${info_arr[index]['name']}</td><td>${info_arr[index]['position']}</td><td>${info_arr[index]['cgsl']}</td><td>${info_arr[index]['zhbdrq']}</td></tr>`
                $("#staff_table").append(trstr);
            })
        }
    });



});

