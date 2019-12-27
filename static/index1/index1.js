$(function () {
        RequestUtils.initBind();
    });

    var RequestUtils = {
        //{#绑定界面的按钮事件#}
        initBind: function () {
            $("#b1").click(function () {
                console.log($(".dropdown-content option:selected").val())
                RequestUtils.get_info();
            });
        },
        get_info: function () {

            $.ajax({
                url: "/baseinfo/get_baseinfo",
                type: "GET",
                data: {type: $(".dropdown-content option:selected").val(),
                        text: $("#stoke_code").val()},
                dataType: "json",
                success: function (data) {
                    console.log(data);
                    let json_string=JSON.stringify(data.datas);
                     //console.log(json_string);
                     window.localStorage.setItem('comp_key',json_string);
                     //data1= window.localStorage.getItem('data');
                     //console.log(data1);
                    location.href = '/detail';
                }
            });
        }
    };