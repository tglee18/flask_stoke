$(function() {
    let info_string = window.localStorage.getItem("staff_info");

    let staff_info = JSON.parse(info_string);
    console.log(staff_info);
    let info_arr = [];
    let trstr="";
    for (let i in staff_info) {
        info_arr.push(staff_info[i]);
    }
    console.log(info_arr);
        $.each(info_arr,function(index,element){
            trstr=`<tr><td>${info_arr[index]['name']}</td><td>${info_arr[index]['position']}</td><td>${info_arr[index]['cgsl']}</td><td>${info_arr[index]['zhbdrq']}</td></tr>`
            $("#staff_table").append(trstr);
        })


});

