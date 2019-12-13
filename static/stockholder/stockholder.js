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
                    console.log(data)
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
                data: {type: $("#cmpny_select option:selected").val(),
                        text: $("#stoke_code").val()},
                dataType: "json",
                success: function (data) {
                    console.log(data)
                }
            });
        }
    };