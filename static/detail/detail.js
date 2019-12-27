$(function() {
    let li = "";
    data_string =window.localStorage.getItem('comp_key');
   // console.log(data_string);
    list=JSON.parse(data_string);
    $.each(list, function (index, array) {
        li += "<li><span class='span_mark' style='display:none'>"+list[index].Code+"</span><div id='name'>" + list[index].gsmc + "<p>"+list[index].ywmc+"</p></div><div id='content'><p id='zjl'>法人代表：" +list[index].zjl+ "</p><p id='fxfy'>注册资本："+list[index].fxfy+"</p><p id= 'wsfxrq'>成立日期："+list[index].wsfxrq+"</p><p id='bgdz'>地址："+list[index].bgdz+"</p></div></li>";

    });
    $("#com_general").append(li);
    $("li").click(function (){
        var span_mark=$(this).children(".span_mark").text().replace(/[^0-9]/g, "");
        location.href = 'company?compID='+span_mark;
    })
});