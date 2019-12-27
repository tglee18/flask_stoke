$(function () {
    function getUrlParam(name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i"); //构造一个含有目标参数的正则表达式对象
        var r = window.location.search.substr(1).match(reg);  //匹配目标参数
        if (r != null) return decodeURI(r[2]);
        return null; //返回参数值
    };

    var companyID = getUrlParam('compID');
    var info_arr = [];
    $.ajax({
        url: "/baseinfo/get_baseinfo",
        type: "GET",
        data: {type: "code",
            text: companyID},
        dataType:"json",
        success: function (data) {
           for (let i in data.datas[0]) {
               info_arr.push(data.datas[0][i]);
           }
           $("td").not("#tag").each(function (index, element) {
                if (index < 3) {
                    $(element).text(info_arr[index + 1]);
                }
                if (index === 3) {
                    $(element).text(info_arr[0]);
                }
                if (3 < index < 13) {
                    $(element).text(info_arr[index]);
                }
                if (index >= 13) {
                    $(element).text(info_arr[index + 6]);
                }
            });
        }
    });


});
