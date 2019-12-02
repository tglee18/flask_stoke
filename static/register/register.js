$(function () {

        RequestUtils.initBind();
    });

    var RequestUtils = {
        //{#绑定界面的按钮事件#}
        initBind: function () {

            $("#register").on("click", function () {
                // console.log($("#cmpny_select option:selected").val())
                var password = $("#password").val();
                var password2 = $("#password2").val();
                if(password!=password2){
                    alert("两次密码不同")
                }else{
                    RequestUtils.register();
                }
            });
        },
        register: function () {
            $.ajax({
                url: "/register/register",
                type: "POST",
                data: {
                    username:$("#username").val(),
                    password:$("#password").val()
                },
                dataType: "text",
                success: function (data) {
                    alert(data);
                }
            });
        }
    };