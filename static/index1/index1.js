$(function () {
    RequestUtils.initBind();
    RequestUtils.refreshSZ();
});

var RequestUtils = {
    //{#绑定界面的按钮事件#}
    initBind: function () {
        $("#b1").click(function () {
            RequestUtils.get_info();
        });
    },
    get_info: function () {
        $.ajax({
            url: "/baseinfo/get_baseinfo",
            type: "GET",
            data: {
                type: $(".dropdown-content option:selected").val(),
                text: $("#stoke_code").val()
            },
            dataType: "json",
            success: function (data) {
                console.log(data);
                let json_string = JSON.stringify(data.datas);
                window.localStorage.setItem('comp_key', json_string);
                location.href = '/detail';
            }
        });
    },
    refreshSZ: function () {
        setTimeout(RequestUtils.refreshSZ, 3 * 1000);
        $.ajax({
            url: "/fininfo/get_tsz",
            type: "GET",
            data: {},
            dataType: "json",
            success: function (ret) {
                $("#num1").html(ret["shangzheng"]);
                $("#num2").html(ret["shenzheng"]);
                if (Number(ret["shangUpDown"]) > 0) {
                    $("#num1").css('color', 'red');
                } else {
                    $("#num1").css('color', 'limegreen');
                }
                if (Number(ret["shenUpDown"]) > 0) {
                    $("#num2").css('color', 'red');
                } else {
                    $("#num2").css('color', 'limegreen');
                }
            }
        })
    }
};