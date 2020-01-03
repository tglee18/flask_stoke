$(function(){
    $("#bar #product").click(function(){
        $("#product1").css("display","block");
        $("#us1").css("display","none");
        $("#announce1").css("display","none");
        $(".active").toggleClass("active");
        $("#product").toggleClass("active");

    });
    $("#bar #us").click(function(){
        $("#product1").css("display","none");
         $("#us1").css("display","block");
        $("#announce1").css("display","none");
        $(".active").toggleClass("active");
        $("#us").toggleClass("active");

    });
    $("#bar #announce").click(function(){
        $("#product1").css("display","none");
         $("#us1").css("display","none");
        $("#announce1").css("display","block");
        $(".active").toggleClass("active");
        $("#announce").toggleClass("active");
    });
})