$(function () {
    RequestUtils.initBind();
});

var RequestUtils = {
    //{#绑定界面的按钮事件#}
    initBind: function () {
        $("#a").on("click", function () {
            // console.log($("#cmpny_select option:selected").val())
            RequestUtils.a();
        });
        $("#b").on("click", function () {
            // console.log($("#cmpny_select option:selected").val())
            RequestUtils.b();
        });
        $("#c").on("click", function () {
            // console.log($("#cmpny_select option:selected").val())
            RequestUtils.c();
        });
    },
    a: function () {
        $.ajax({
            url: "/stockholder/a",
            type: "GET",
            data: {text: $("#stoke_code").val()},
            dataType: "json",
            success: function (data) {
                console.log(data);
                let json_string=JSON.stringify(data.datas);
                     //console.log(json_string);
                     window.localStorage.setItem('staff_info',json_string);
                     //console.log(data1);
                     location.href = '/staff';
            }
        });
    },
    b: function () {
        $.ajax({
            url: "/stockholder/b",
            type: "GET",
            data: {text: $("#stoke_code").val()},
            dataType: "json",
            success: function (data) {
                console.log(data)
            }
        });
    },
    c: function () {
        $.ajax({
            url: "/stockholder/c",
            type: "GET",
            data: {
                type: $("#cmpny_select option:selected").val(),
                text: $("#stoke_code").val()
            },
            dataType: "json",
            success: function (data) {
                console.log(data)
            }
        });
    }
};