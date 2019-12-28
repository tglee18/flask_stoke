$(document).ready(function () {
    function getUrlParam(name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i"); //构造一个含有目标参数的正则表达式对象
        var r = window.location.search.substr(1).match(reg);  //匹配目标参数
        if (r != null) return decodeURI(r[2]);
        return null; //返回参数值
    };

    var companyID = getUrlParam('compID');
    $('#compIndex').attr('href','/comp_index?compID='+companyID);
    $('#lsjysj').attr('href','/transactionData?compID='+companyID);
    $('#lszjlx').attr('href','/historyFundFlow?compID='+companyID);
    $('#zjlx').attr('href','/zijinliuxiang?compID='+companyID);
    $('#zjlx1').attr('href','/zijinliuxiang?compID='+companyID);
    $('#compAnalysis').attr('href','/analysis?compID='+companyID);
    $('#compStockHolder').attr('href','/staff?compID='+companyID);
    $('#compInfo').attr('href','/company?compID='+companyID);

    function getStringofNum(text) {
            //取出字符串中的数字
            var value = text.replace(/[^0-9]/ig,"");
            return value;
        }
    $.ajax({
        url: "/transactionData/get_transactionData7",
        type: "GET",
        data: {
            text: companyID
        },
        dataType: "json",
        success: function (data) {
            var myChart = echarts.init(document.getElementById('graph'));
            option = {
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {
                        type: 'cross',
                        crossStyle: {
                            color: '#999'
                        }
                    }
                },
                toolbox: {
                    feature: {
                        dataView: {show: true, readOnly: false},
                        magicType: {show: true, type: ['line', 'bar']},
                        restore: {show: true},
                        saveAsImage: {show: true}
                    }
                },
                legend: {
                    data: ['成交量（手）', '成交金额（万元）', '振幅（%）']
                },
                xAxis: [
                    {
                        type: 'category',
                        data: [
                            data['datas'][6]['date'],
                            data['datas'][5]['date'],
                            data['datas'][4]['date'],
                            data['datas'][3]['date'],
                            data['datas'][2]['date'],
                            data['datas'][1]['date'],
                            data['datas'][0]['date']
                        ],
                        axisPointer: {
                            type: 'shadow'
                        }
                    }
                ],
                yAxis: [
                    {
                        type: 'value',
                        name: '成交量/成交金额',
                        min: 0,
                        max: 1500000,
                        interval: 250000,
                    },
                    {
                        type: 'value',
                        name: '振幅',
                        min: 0,
                        max: 12,
                        interval: 2,
                    }
                ],
                series: [
                    {
                        name: '成交量',
                        type: 'bar',
                        data: [
                            parseInt(getStringofNum(data['datas'][6]['volume'])),
                            parseInt(getStringofNum(data['datas'][5]['volume'])),
                            parseInt(getStringofNum(data['datas'][4]['volume'])),
                            parseInt(getStringofNum(data['datas'][3]['volume'])),
                            parseInt(getStringofNum(data['datas'][2]['volume'])),
                            parseInt(getStringofNum(data['datas'][1]['volume'])),
                            parseInt(getStringofNum(data['datas'][0]['volume'])),

                        ]
                    },
                    {
                        name: '成交金额',
                        type: 'bar',
                        data: [
                            parseInt(getStringofNum(data['datas'][6]['turnover'])),
                            parseInt(getStringofNum(data['datas'][5]['turnover'])),
                            parseInt(getStringofNum(data['datas'][4]['turnover'])),
                            parseInt(getStringofNum(data['datas'][3]['turnover'])),
                            parseInt(getStringofNum(data['datas'][2]['turnover'])),
                            parseInt(getStringofNum(data['datas'][1]['turnover'])),
                            parseInt(getStringofNum(data['datas'][0]['turnover'])),


                        ]
                    },
                    {
                        name: '振幅',
                        type: 'line',
                        yAxisIndex: 1,
                        data: [
                            data['datas'][6]['amplitude'],
                            data['datas'][5]['amplitude'],
                            data['datas'][4]['amplitude'],
                            data['datas'][3]['amplitude'],
                            data['datas'][2]['amplitude'],
                            data['datas'][1]['amplitude'],
                            data['datas'][0]['amplitude'],
                        ]
                    }
                ]
            };
            myChart.setOption(option, true);
        }
    });
    $('body').on('click','.cjmx',function(){
        $.ajax({
            url: "/transactionData/get_transactionData7",
            type: "GET",
            data: {
                text:companyID
            },
            dataType: "json",
            success: function (data) {
                var myChart = echarts.init(document.getElementById('graph'));
                option = {
                    tooltip: {
                        trigger: 'axis',
                        axisPointer: {
                            type: 'cross',
                            crossStyle: {
                                color: '#999'
                            }
                        }
                    },
                    toolbox: {
                        feature: {
                            dataView: {show: true, readOnly: false},
                            magicType: {show: true, type: ['line', 'bar']},
                            restore: {show: true},
                            saveAsImage: {show: true}
                        }
                    },
                    legend: {
                        data:['成交量（手）','成交金额（万元）','振幅（%）']
                    },
                    xAxis: [
                        {
                            type: 'category',
                            data: [
                                data['datas'][6]['date'],
                                data['datas'][5]['date'],
                                data['datas'][4]['date'],
                                data['datas'][3]['date'],
                                data['datas'][2]['date'],
                                data['datas'][1]['date'],
                                data['datas'][0]['date']
                            ],
                            axisPointer: {
                                type: 'shadow'
                            }
                        }
                    ],
                    yAxis: [
                        {
                            type: 'value',
                            name: '成交量/成交金额',
                            min: 0,
                            max: 1500000,
                            interval: 250000,
                        },
                        {
                            type: 'value',
                            name: '振幅',
                            min: 0,
                            max: 12,
                            interval: 2,
                        }
                    ],
                    series: [
                        {
                            name:'成交量',
                            type:'bar',
                            data:[
                                parseInt(getStringofNum(data['datas'][6]['volume'])),
                                parseInt(getStringofNum(data['datas'][5]['volume'])),
                                parseInt(getStringofNum(data['datas'][4]['volume'])),
                                parseInt(getStringofNum(data['datas'][3]['volume'])),
                                parseInt(getStringofNum(data['datas'][2]['volume'])),
                                parseInt(getStringofNum(data['datas'][1]['volume'])),
                                parseInt(getStringofNum(data['datas'][0]['volume'])),
                            ]
                        },
                        {
                            name:'成交金额',
                            type:'bar',
                            data:[
                                parseInt(getStringofNum(data['datas'][6]['turnover'])),
                                parseInt(getStringofNum(data['datas'][5]['turnover'])),
                                parseInt(getStringofNum(data['datas'][4]['turnover'])),
                                parseInt(getStringofNum(data['datas'][3]['turnover'])),
                                parseInt(getStringofNum(data['datas'][2]['turnover'])),
                                parseInt(getStringofNum(data['datas'][1]['turnover'])),
                                parseInt(getStringofNum(data['datas'][0]['turnover'])),

                            ]
                        },
                        {
                            name:'振幅',
                            type:'line',
                            yAxisIndex: 1,
                            data:[
                                data['datas'][6]['amplitude'],
                                data['datas'][5]['amplitude'],
                                data['datas'][4]['amplitude'],
                                data['datas'][3]['amplitude'],
                                data['datas'][2]['amplitude'],
                                data['datas'][1]['amplitude'],
                                data['datas'][0]['amplitude'],

                            ]
                        }
                    ]
                };
                myChart.setOption(option,true);
            }
        });
    });


    $('body').on('click','.gpjg',function(){
        $.ajax({
            url: "/transactionData/get_transactionData7",
            type: "GET",
            data: {
                text:companyID
            },
            dataType: "json",
            success: function (data) {
                var myChart = echarts.init(document.getElementById('graph'));
                var i,m;
                m = parseFloat(data['datas'][0]['low']);
                for(i=1;i<7;i++){
                    if(parseFloat(data['datas'][i]['low'])<m){
                        m = parseFloat(data['datas'][i]['low']);
                    }
                }
                option = {

                    tooltip: {
                        trigger: 'axis'
                    },
                    legend: {
                        data:['开盘价','收盘价','最高价','最低价']
                    },
                    grid: {
                        left: '3%',
                        right: '4%',
                        bottom: '3%',
                        containLabel: true
                    },
                    toolbox: {
                        feature: {
                            saveAsImage: {}
                        }
                    },
                    xAxis: {
                        type: 'category',
                        boundaryGap: false,
                        data: [
                            data['datas'][6]['date'],
                            data['datas'][5]['date'],
                            data['datas'][4]['date'],
                            data['datas'][3]['date'],
                            data['datas'][2]['date'],
                            data['datas'][1]['date'],
                            data['datas'][0]['date']
                        ]
                    },
                    yAxis: {
                        type: 'value',
                        min: m-1
                    },
                    series: [
                        {
                            name:'开盘价',
                            type:'line',
                            data:[
                                parseFloat(data['datas'][6]['open']),
                                parseFloat(data['datas'][5]['open']),
                                parseFloat(data['datas'][4]['open']),
                                parseFloat(data['datas'][3]['open']),
                                parseFloat(data['datas'][2]['open']),
                                parseFloat(data['datas'][1]['open']),
                                parseFloat(data['datas'][0]['open'])

                            ]
                        },
                        {
                            name:'收盘价',
                            type:'line',
                            data:[
                                parseFloat(data['datas'][6]['close']),
                                parseFloat(data['datas'][5]['close']),
                                parseFloat(data['datas'][4]['close']),
                                parseFloat(data['datas'][3]['close']),
                                parseFloat(data['datas'][2]['close']),
                                parseFloat(data['datas'][1]['close']),
                                parseFloat(data['datas'][0]['close'])

                            ]
                        },
                        {
                            name:'最高价',
                            type:'line',
                            data:[
                                parseFloat(data['datas'][6]['high']),
                                parseFloat(data['datas'][5]['high']),
                                parseFloat(data['datas'][4]['high']),
                                parseFloat(data['datas'][3]['high']),
                                parseFloat(data['datas'][2]['high']),
                                parseFloat(data['datas'][1]['high']),
                                parseFloat(data['datas'][0]['high'])
                            ]
                        },
                        {
                            name:'最低价',
                            type:'line',
                            data:[
                                parseFloat(data['datas'][6]['low']),
                                parseFloat(data['datas'][5]['low']),
                                parseFloat(data['datas'][4]['low']),
                                parseFloat(data['datas'][3]['low']),
                                parseFloat(data['datas'][2]['low']),
                                parseFloat(data['datas'][1]['low']),
                                parseFloat(data['datas'][0]['low']),
                            ]
                        }
                    ]
                };
                myChart.setOption(option,true);
            }
        });
    });


    $('body').on('click','.zjlx',function(){
        $.ajax({
            url: "/historyFundFlow/get_FundFlow7",
            type: "GET",
            data: {text: companyID},
            dataType: "json",
            success: function (data) {
                var myChart = echarts.init(document.getElementById('graph'));
                option = {
                    tooltip : {
                        trigger: 'axis',
                        axisPointer : {            // 坐标轴指示器，坐标轴触发有效
                            type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                        }
                    },
                    legend: {
                        data:['净流入', '资金流入', '资金流出']
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
                                data['datas'][6]['date'],
                                data['datas'][5]['date'],
                                data['datas'][4]['date'],
                                data['datas'][3]['date'],
                                data['datas'][2]['date'],
                                data['datas'][1]['date'],
                                data['datas'][0]['date']
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
                            data:[
                                parseInt(getStringofNum(data['datas'][6]['inflow']))-parseInt(getStringofNum(data['datas'][6]['outflow'])),
                                parseInt(getStringofNum(data['datas'][5]['inflow']))-parseInt(getStringofNum(data['datas'][5]['outflow'])),
                                parseInt(getStringofNum(data['datas'][4]['inflow']))-parseInt(getStringofNum(data['datas'][4]['outflow'])),
                                parseInt(getStringofNum(data['datas'][3]['inflow']))-parseInt(getStringofNum(data['datas'][3]['outflow'])),
                                parseInt(getStringofNum(data['datas'][2]['inflow']))-parseInt(getStringofNum(data['datas'][2]['outflow'])),
                                parseInt(getStringofNum(data['datas'][1]['inflow']))-parseInt(getStringofNum(data['datas'][1]['outflow'])),
                                parseInt(getStringofNum(data['datas'][0]['inflow']))-parseInt(getStringofNum(data['datas'][0]['outflow']))
                            ]
                        },
                        {
                            name:'资金流入',
                            type:'bar',
                            stack: '总量',
                            label: {
                                normal: {
                                    show: true
                                }
                            },
                            data:[
                                parseInt(getStringofNum(data['datas'][6]['inflow'])),
                                parseInt(getStringofNum(data['datas'][5]['inflow'])),
                                parseInt(getStringofNum(data['datas'][4]['inflow'])),
                                parseInt(getStringofNum(data['datas'][3]['inflow'])),
                                parseInt(getStringofNum(data['datas'][2]['inflow'])),
                                parseInt(getStringofNum(data['datas'][1]['inflow'])),
                                parseInt(getStringofNum(data['datas'][0]['inflow']))
                            ]
                        },
                        {
                            name:'资金流出',
                            type:'bar',
                            stack: '总量',
                            label: {
                                normal: {
                                    show: true,
                                    position: 'left'
                                }
                            },
                            data:[
                                -parseInt(getStringofNum(data['datas'][6]['outflow'])),
                                -parseInt(getStringofNum(data['datas'][5]['outflow'])),
                                -parseInt(getStringofNum(data['datas'][4]['outflow'])),
                                -parseInt(getStringofNum(data['datas'][3]['outflow'])),
                                -parseInt(getStringofNum(data['datas'][2]['outflow'])),
                                -parseInt(getStringofNum(data['datas'][1]['outflow'])),
                                -parseInt(getStringofNum(data['datas'][0]['outflow']))
                            ]
                        }
                    ]
                };
                myChart.setOption(option,true);
            }
        });
    });

    $('body').on('click','.zlzjlx',function(){
        $.ajax({
            url: "/historyFundFlow/get_FundFlow7",
            type: "GET",
            data: {text: companyID},
            dataType: "json",
            success: function (data) {
                var myChart = echarts.init(document.getElementById('graph'));
                option = {
                    tooltip : {
                        trigger: 'axis',
                        axisPointer : {            // 坐标轴指示器，坐标轴触发有效
                            type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                        }
                    },
                    legend: {
                        data:['主力净流入', '主力流入', '主力流出']
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
                                data['datas'][6]['date'],
                                data['datas'][5]['date'],
                                data['datas'][4]['date'],
                                data['datas'][3]['date'],
                                data['datas'][2]['date'],
                                data['datas'][1]['date'],
                                data['datas'][0]['date']
                            ]
                        }
                    ],
                    series : [
                        {
                            name:'主力净流入',
                            type:'bar',
                            label: {
                                normal: {
                                    show: true,
                                    position: 'inside'
                                }
                            },
                            data:[
                                parseInt(getStringofNum(data['datas'][6]['main_inflow']))-parseInt(getStringofNum(data['datas'][6]['main_outflow'])),
                                parseInt(getStringofNum(data['datas'][5]['main_inflow']))-parseInt(getStringofNum(data['datas'][5]['main_outflow'])),
                                parseInt(getStringofNum(data['datas'][4]['main_inflow']))-parseInt(getStringofNum(data['datas'][4]['main_outflow'])),
                                parseInt(getStringofNum(data['datas'][3]['main_inflow']))-parseInt(getStringofNum(data['datas'][3]['main_outflow'])),
                                parseInt(getStringofNum(data['datas'][2]['main_inflow']))-parseInt(getStringofNum(data['datas'][2]['main_outflow'])),
                                parseInt(getStringofNum(data['datas'][1]['main_inflow']))-parseInt(getStringofNum(data['datas'][1]['main_outflow'])),
                                parseInt(getStringofNum(data['datas'][0]['main_inflow']))-parseInt(getStringofNum(data['datas'][0]['main_outflow']))

                            ]
                        },
                        {
                            name:'主力流入',
                            type:'bar',
                            stack: '总量',
                            label: {
                                normal: {
                                    show: true
                                }
                            },
                            data:[
                                parseInt(getStringofNum(data['datas'][6]['main_inflow'])),
                                parseInt(getStringofNum(data['datas'][5]['main_inflow'])),
                                parseInt(getStringofNum(data['datas'][4]['main_inflow'])),
                                parseInt(getStringofNum(data['datas'][3]['main_inflow'])),
                                parseInt(getStringofNum(data['datas'][2]['main_inflow'])),
                                parseInt(getStringofNum(data['datas'][1]['main_inflow'])),
                                parseInt(getStringofNum(data['datas'][0]['main_inflow']))
                            ]
                        },
                        {
                            name:'主力流出',
                            type:'bar',
                            stack: '总量',
                            label: {
                                normal: {
                                    show: true,
                                    position: 'left'
                                }
                            },
                            data:[
                                -parseInt(getStringofNum(data['datas'][6]['main_outflow'])),
                                -parseInt(getStringofNum(data['datas'][5]['main_outflow'])),
                                -parseInt(getStringofNum(data['datas'][4]['main_outflow'])),
                                -parseInt(getStringofNum(data['datas'][3]['main_outflow'])),
                                -parseInt(getStringofNum(data['datas'][2]['main_outflow'])),
                                -parseInt(getStringofNum(data['datas'][1]['main_outflow'])),
                                -parseInt(getStringofNum(data['datas'][0]['main_outflow']))
                            ]
                        }
                    ]
                };
            myChart.setOption(option,true);
            }
        });
    });
    $('body').on('click','.zlzjlx',function(){

    });
});
