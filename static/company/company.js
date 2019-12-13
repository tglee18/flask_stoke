$(function() {
    info_string = window.localStorage.getItem("company_info");

    company_info = JSON.parse(info_string);
    console.log(company_info);
    info_arr = [];
    for (let i in company_info) {
        info_arr.push(company_info[i]);

    }
    console.log(info_arr);
         $("td").not("#tag").each(function (index, element) {
        if (index < 3) {
            $(element).text(info_arr[index + 1]);
        }
        if (index === 3) {
            $(element).text(info_arr[0]);
        }
        if( 3<index<13 ){
            $(element).text(info_arr[index]);
        }
       if(index>=13) {
           $(element).text(info_arr[index + 6]);
       }
    });

});
