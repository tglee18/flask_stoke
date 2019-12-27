$(function () {
    let data_string1 = window.localStorage.getItem('comp_fininfo');
    let data_string2 = window.localStorage.getItem('comp_deal');
    // console.log(data_string);
    let list_info = JSON.parse(data_string1);
    let list_deal = JSON.parse(data_string2);
    let info_arr = [];
    let deal_arr = [];
    console.log(list_info);
    for (let i in list_info["datas"]) {
        info_arr.push(list_info["datas"][i]);
    }
    for (let i in list_deal["datas"]) {
        deal_arr.push(list_deal["datas"][i]);
    }
    $("#comp_name").text(list_info["company"]);
    let tr1 = $("#tr1 td span");
    let tr2 = $("#tr2 td span");
    let wei = $("#wei span");
    for (let i = 0; i < tr1.length; i++) {
        $(tr1[i]).text(info_arr[2 * i + 1]);
    }
    for (let i = 0; i < tr2.length; i++) {
        $(tr2[i]).text(info_arr[2 * i + 2]);
        console.log(info_arr[2 * i + 2]);
    }
    $(wei[1]).text(deal_arr[0]);                 //委比，委差
    $(wei[3]).text(deal_arr[1]);

})