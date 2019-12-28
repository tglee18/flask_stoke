$(document).ready(function () {
    function getUrlParam(name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i"); //构造一个含有目标参数的正则表达式对象
        var r = window.location.search.substr(1).match(reg);  //匹配目标参数
        if (r != null) return decodeURI(r[2]);
        return null; //返回参数值
    };
     $("#fond_flow").mouseover(function () {
        $("#fond_flow :not(:first-child)").css("display", "block");
    });
    $("#fond_flow").mouseout(function () {
        $("#fond_flow :not(:first-child)").css("display", "none");
    });

    var companyID = getUrlParam('compID');
    $('#compIndex').attr('href','/comp_index?compID='+companyID);
    $('#lsjysj').attr('href','/transactionData?compID='+companyID);
    $('#lszjlx').attr('href','/historyFundFlow?compID='+companyID);
    $('#zjlx').attr('href','/zijinliuxiang?compID='+companyID);
    $('#zjlx1').attr('href','/zijinliuxiang?compID='+companyID);
    $('#compAnalysis').attr('href','/analysis?compID='+companyID);
    $('#compStockHolder').attr('href','/staff?compID='+companyID);
    $('#compInfo').attr('href','/company?compID='+companyID);

    $.ajax({
        url: "/moneyFlow/get_moneyFlow",
        type: "GET",
        data: {stokeCode: companyID},
        dataType: "json",
        success: function (datas) {
            if(parseFloat(datas['jlr_shishi'])>0){
                var str = "<div class='name'>实时资金净流入:</div><div class='cRed' id='value'>"+datas['jlr_shishi']+"万元</div)";
            }
            else{
                var str = "<div class='name'>实时资金净流入:</div><div class='cGreen' id='value'>"+datas['jlr_shishi']+"万元</div)";
            }
            $('#part1').html(str);
            var myChart1 = echarts.init(document.getElementById('part2'));
            var arr1 = new Array(3);
            var arr2 = new Array(3);
            var i;
            for(i=0; i<3; i++){
                if(datas['jlr_json'][i]['value']>0){
                    arr1[i] = datas['jlr_json'][i]['value'];
                    arr2[i] = "";
                }
                else{
                    arr1[i] = "";
                    arr2[i] = datas['jlr_json'][i]['value'];
                }
            }
            option = {
                tooltip : {
                    trigger: 'axis',
                    axisPointer : {            // 坐标轴指示器，坐标轴触发有效
                        type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                    }
                },
                legend: {
                    data:['净流入', '净流出']
                },
                itemStyle: {
                  normal:{
                     color:'red',
                  }
                },
                grid: {
                    left: '3%',
                    right: '4%',
                    bottom: '3%',
                    containLabel: true
                },
                xAxis : [
                    {
                        type : 'value'
                    }
                ],
                yAxis : [
                    {
                        type : 'category',
                        axisTick : {show: false},
                        data : ['小单','中单', '大单']
                    }
                ],
                series : [
                    {
                        name:'净流入',
                        type:'bar',
                        label: {
                            normal: {
                                show: true,
                                position: 'inside',
                            }
                        },
                        itemStyle: {
                            normal: {
                                color: 'red',
                            }
                        },
                        data:[arr1[2], arr1[1], arr1[0]]
                    },
                    {
                        name:'净流出',
                        type:'bar',
                        stack: '总量',
                        label: {
                            normal: {
                                show: true,
                                position: 'left',
                            }
                        },
                        itemStyle: {
                            normal: {
                                color: 'green',
                            }
                        },
                        data:[arr2[2], arr2[1], arr2[0]]
                    }

                ]
            };
            myChart1.setOption(option,true);
            var str2;
            if(parseFloat(datas['dd_buy'])>0){
                str2 = "<span class='name'>大单主买量：</span><span class='cRed' id='value'>："+datas['dd_buy']+"手</span>"
            }else{
                str2 = "<span class='name'>大单主买量：</span><span class='cGreen' id='value'>"+datas['dd_buy']+"手</span>"
            }
            if(parseFloat(datas['dd_sell'])>0){
                str2 += "<span class='name'>大单主卖量：</span><span class='cRed' id='value'>"+datas['dd_sell']+"手</span>"
            }
            else{
                str2 += "<span class='name'>大单主卖量：</span><span class='cGreen' id='value'>"+datas['dd_sell']+"手</span>"
            }
            str2 += "<span>大单成交占比："+datas['percent']+"</span>";
            $('#part3').html(str2);


            if(parseFloat(datas['jlr_5day_total'])>0){
                var str3 = "<div class='name'>五日资金净流入：</div><div class='cRed' id='value'>"+datas['jlr_5day_total']+"万元</div>"
            }
            else{
                var str3 = "<div class='name'>五日资金净流入：</div><div class='cGreen' id='value'>"+datas['jlr_5day_total']+"万元</div>"
            }
            $('#part4').html(str3);
            var myChart2 = echarts.init(document.getElementById('part5'));
            var arr3 = new Array(5);
            var arr4 = new Array(5);
            var j;
            for(j=0;j<5;j++){
                if(datas['jlr_5day_json'][j]['value']>0){
                    arr3[j] = datas['jlr_5day_json'][j]['value'];
                    arr4[j] = "";
                }
                else{
                    arr3[j] = "";
                    arr4[j] = datas['jlr_5day_json'][j]['value'];
                }
            }
            option2 = {
                tooltip : {
                    trigger: 'axis',
                    axisPointer : {            // 坐标轴指示器，坐标轴触发有效
                        type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                    }
                },
                legend: {
                    data:['净流入', '净流出']
                },
                grid: {
                    left: '3%',
                    right: '4%',
                    bottom: '3%',
                    containLabel: true
                },
                xAxis : [
                    {
                        type : 'value'
                    }
                ],
                yAxis : [
                    {
                        type : 'category',
                        axisTick : {show: false},
                        data : [
                            datas['jlr_5day_json'][4]['key'],
                            datas['jlr_5day_json'][3]['key'],
                            datas['jlr_5day_json'][2]['key'],
                            datas['jlr_5day_json'][1]['key'],
                            datas['jlr_5day_json'][0]['key']
                        ]
                    }
                ],
                series : [
                    {
                        name:'净流入',
                        type:'bar',
                        label: {
                            normal: {
                                show: true,
                                position: 'inside'
                            }
                        },
                        itemStyle: {
                            normal: {
                                color: 'red',
                            }
                        },
                        data:[arr3[4],arr3[3],arr3[2], arr3[1], arr3[0]]
                    },
                    {
                        name:'净流出',
                        type:'bar',
                        stack: '总量',
                        label: {
                            normal: {
                                show: true,
                                position: 'left'
                            }
                        },
                        itemStyle: {
                            normal: {
                                color: 'green',
                            }
                        },
                        data:[arr4[4],arr4[3],arr4[2], arr4[1], arr4[0]]
                    }

                ]
            };
            myChart2.setOption(option2,true);


            if(parseFloat(datas['hs_jlr_total'])>0){
                var str4 = "<div class='name'>两市资金净流入：</div><div class='cRed' id='value'>"+datas['hs_jlr_total']+"万元</div>"
            }
            else{
                var str4 = "<div class='name'>两市资金净流入：</div><div class='cGreen' id='value'>"+datas['hs_jlr_total']+"万元</div>"
            }
            $('#part6').html(str4);
            var myChart3 = echarts.init(document.getElementById('part7'));
            var arr5 = new Array(5);
            var arr6 = new Array(5);
            var arr7 = new Array(5);
            var k;
            var zz = />.*</;
            for(k=0;k<5;k++){
                arr7[k] = datas['zjlx_hy_json'][k]['key'].match(zz)[0].slice(1, -1)
                if(datas['zjlx_hy_json'][k]['value']>0){
                    arr5[k] = datas['zjlx_hy_json'][k]['value'];
                    arr4[k] = "";
                }
                else{
                    arr5[k] = "";
                    arr6[k] = datas['zjlx_hy_json'][k]['value'];
                }
            }
            option3 = {
                tooltip : {
                    trigger: 'axis',
                    axisPointer : {            // 坐标轴指示器，坐标轴触发有效
                        type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                    }
                },
                legend: {
                    data:['净流入', '净流出']
                },
                grid: {
                    left: '3%',
                    right: '4%',
                    bottom: '3%',
                    containLabel: true
                },
                xAxis : [
                    {
                        type : 'value'
                    }
                ],
                yAxis : [
                    {
                        type : 'category',
                        axisTick : {show: false},
                        data : [arr7[4],arr7[3],arr7[2], arr7[1], arr7[0]]
                    }
                ],
                series : [
                    {
                        name:'净流入',
                        type:'bar',
                        label: {
                            normal: {
                                show: true,
                                position: 'inside'
                            }
                        },
                        itemStyle: {
                            normal: {
                                color: 'red',
                            }
                        },
                        data:[arr5[4],arr5[3],arr5[2], arr5[1], arr5[0]]
                    },
                    {
                        name:'净流出',
                        type:'bar',
                        stack: '总量',
                        label: {
                            normal: {
                                show: true,
                                position: 'left'
                            }
                        },
                        itemStyle: {
                            normal: {
                                color: 'green',
                            }
                        },
                        data:[arr6[4],arr6[3],arr6[2], arr6[1], arr6[0]]
                    }

                ]
            };
            myChart3.setOption(option3,true);

        }
    });
    $.ajax({
        url: "/moneyFlow/get_zc",
        type: "GET",
        data: {stokeCode: "000001"},
        dataType: "text",
        success: function (data) {
            $('#table1').html(data);
        }
    });
    $.ajax({
        url: "/moneyFlow/get_jc",
        type: "GET",
        data: {stokeCode: "000001"},
        dataType: "html",
        success: function (data) {
            $('#table2').html(data);
        }
    });
})