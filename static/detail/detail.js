$(function() {
    let li = "";
    data_string =window.localStorage.getItem('comp_key');
   // console.log(data_string);
    list=JSON.parse(data_string);
    $.each(list, function (index, array) {
        li += "<li><span class='span_mark' style='display:none'>"+list[index].Code+"</span><div id='svg'><svg t=\"1577433689719\" class=\"icon\" viewBox=\"0 0 1259 1024\" version=\"1.1\" xmlns=\"http://www.w3.org/2000/svg\" p-id=\"1350\" width=\"200\" height=\"200\"><path d=\"M1257.355322 979.478261c0-24.051974-19.446277-44.009995-44.009995-44.009995h-44.009995V438.564718c0-80.855572-65.503248-146.358821-146.35882-146.358821H701.089455v643.262369h-29.169415V146.358821c0-80.855572-65.503248-146.358821-146.358821-146.358821h-291.694153C153.011494 0 87.508246 65.503248 87.508246 146.358821v789.621189H44.009995c-24.051974 0-44.009995 19.446277-44.009995 44.009995 0 24.051974 19.446277 44.009995 44.009995 44.009995h1199.016492c24.051974-0.511744 14.328836-19.958021 14.328835-44.521739zM496.903548 760.451774H263.036482v-87.508246h233.867066v87.508246z m0-233.867066H263.036482V438.564718h233.867066v88.01999z m0-234.378811H263.036482V204.697651h233.867066v87.508246zM965.149425 818.790605h-87.508246v-146.358821h87.508246V818.790605z m0-233.867067h-87.508246V438.564718h87.508246v146.35882z\" fill=\"#ccc\" p-id=\"1351\"></path></svg></div><div id='name'>" + list[index].gsmc + "<p>"+list[index].ywmc+"</p></div><div id='content'><p id='zjl'>法人代表：" +list[index].zjl+ "</p><p id='fxfy'>注册资本："+list[index].fxfy+"</p><p id= 'wsfxrq'>成立日期："+list[index].wsfxrq+"</p><p id='bgdz'>地址："+list[index].bgdz+"</p></div></li>";

    });
    $("#com_general").append(li);
    $("li").click(function (){
        var span_mark=$(this).children(".span_mark").text().replace(/[^0-9]/g, "");
        location.href = 'company?compID='+span_mark;
    })
});