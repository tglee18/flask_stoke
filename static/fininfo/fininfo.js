$(function () {
        RequestUtils.initBind();
    });

    var RequestUtils = {
        //{#绑定界面的按钮事件#}
        initBind: function () {
            $("#getFininfo").on("click", function () {
                // console.log($("#cmpny_select option:selected").val())
                RequestUtils.get_fininfo();
            });
        },
        get_fininfo: function () {
            $.ajax({
                url: "/fininfo/get_fininfo",
                type: "GET",
                data: {text: $("#stoke_code").val()},
                dataType: "json",
                success: function (data) {
                    console.log(data);
                    let json_string=JSON.stringify(data);
                     //console.log(json_string);
                     window.localStorage.setItem('comp_fininfo',json_string);
                     //data1= window.localStorage.getItem('data');
                     //console.log(data1);
                    location.href = '/comp_index';

                }
            });
        }
    };