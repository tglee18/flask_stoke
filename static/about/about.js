$(function(){
    $("#bar #product").click(function(){
        $("#product1").css("display","block");
        $("#us1").css("display","none");
        $("#announce1").css("display","none");

    });
    $("#bar #us").click(function(){
        $("#product1").css("display","none");
         $("#us1").css("display","block");
        $("#announce1").css("display","none");
    });
    $("#bar #announce").click(function(){
        $("#product1").css("display","none");
         $("#us1").css("display","none");
        $("#announce1").css("display","block");
    });
})