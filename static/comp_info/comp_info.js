$(function(){
     let data_string =window.localStorage.getItem('comp_fininfo');
   // console.log(data_string);
     let list=JSON.parse(data_string);
    console.log(list);
    for (let i in list) {
        info_arr.push(list[i]);
    }
    $("#comp_name").text(list["company"]);
    let tr1=$("#tr1 td");
     let tr2=$("#tr2 td");
     for(let i=0;i<tr1.length;i++){
         $(tr1[i]).text(info_arr[2*i+1]);
     }
     for(let i=0;i<tr2.length;i++){
         $(tr1[i]).text(info_arr[2*i+2]);
     }
})