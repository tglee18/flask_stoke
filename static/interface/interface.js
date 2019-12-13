$(function () {
        RequestUtils.initBind();
    });

    var RequestUtils = {
        //{#绑定界面的按钮事件#}
        initBind: function () {
            $("#getBaseinfo").on("click", function () {
                // console.log($("#cmpny_select option:selected").val())
                RequestUtils.get_info();
            });
        },
        get_info: function () {

            $.ajax({
                url: "/get_baseinfo",
                type: "GET",
                data: {type: $("#cmpny_select option:selected").val(),
                        text: $("#stoke_code").val()},
                dataType: "json",
                success: function (json) {
                    //console.log(json);

                     json_string=JSON.stringify(json);
                     //console.log(json_string);
                     window.localStorage.setItem('data',json_string);
                     //data1= window.localStorage.getItem('data');
                     //console.log(data1);
                    location.href = 'detail';
                    //设置localStorage


                }
            });
        }
    };