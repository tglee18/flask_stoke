$(function () {
    RequestUtils.initBind();
});

var RequestUtils = {
    //{#绑定界面的按钮事件#}
    initBind: function () {
        $("#lg_btn").on("click", function () {
            RequestUtils.loger();
        });
    },
    loger: function () {

        $.ajax({
            url: "/login/",
            type: "POST",
            data: {
                id: $("#user_id").val(),
                pwd: $("#user_pwd").val()
            },
            dataType: "json",
            success: function (data) {
                if (data.statuss == "success") {
                    alert("登录成功，欢迎您");
                    window.location.href = "/";
                }

            },
            error: function (data) {
                alert(data.statuss)
            }
        });
    }
};