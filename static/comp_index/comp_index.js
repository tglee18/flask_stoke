$(function () {
    function getUrlParam(name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i"); //构造一个含有目标参数的正则表达式对象
        var r = window.location.search.substr(1).match(reg);  //匹配目标参数
        if (r != null) return decodeURI(r[2]);
        return null; //返回参数值
    };

    var companyID = getUrlParam('compID');
    $('#compIndex').attr('href', '/comp_index?compID=' + companyID);
    $('#lsjysj').attr('href', '/transactionData?compID=' + companyID);
    $('#lszjlx').attr('href', '/historyFundFlow?compID=' + companyID + '&curP=1');
    $('#zjlx').attr('href', '/zijinliuxiang?compID=' + companyID);
    $('#zjlx1').attr('href', '/zijinliuxiang?compID=' + companyID);
    $('#compAnalysis').attr('href', '/analysis?compID=' + companyID);
    $('#compStockHolder').attr('href', '/staff?compID=' + companyID);
    $('#compInfo').attr('href', '/company?compID=' + companyID);
    //渲染图像到图表
    $.ajax({
        url: "/transactionData/get_HistoryTransactionData",
        type: "GET",
        data: {
            text: companyID
        },
        dataType: "json",
        success: function (history) {
            var data_temp = [];
            $.each(history.datas, function (i) {
                let oneday = [history.datas[i].date.replace(/[/-]/g, "/"),
                    Number(history.datas[i].open),
                    Number(history.datas[i].close),
                    Number(history.datas[i].low),
                    Number(history.datas[i].high)];
                data_temp[data_temp.length] = oneday;
            });
            var data0 = splitData(data_temp.reverse());
            var dom = document.getElementById("container");
            var myChart = echarts.init(dom);
            var app = {};
            option = null;
            var upColor = '#ec0000';
            var upBorderColor = '#8A0000';
            var downColor = '#00da3c';
            var downBorderColor = '#008F28';

            function splitData(rawData) {
                var categoryData = [];
                var values = []
                for (var i = 0; i < rawData.length; i++) {
                    categoryData.push(rawData[i].splice(0, 1)[0]);
                    values.push(rawData[i])
                }
                return {
                    categoryData: categoryData,
                    values: values
                };
            }

            function calculateMA(dayCount) {
                var result = [];
                for (var i = 0, len = data0.values.length; i < len; i++) {
                    if (i < dayCount) {
                        result.push('-');
                        continue;
                    }
                    var sum = 0;
                    for (var j = 0; j < dayCount; j++) {
                        sum += data0.values[i - j][1];
                    }
                    result.push(sum / dayCount);
                }
                return result;
            }

            app.title = '坐标轴刻度与标签对齐';


            option = {
                title: {
                    text: '',
                    left: 0
                },
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {
                        type: 'cross'
                    }
                },
                legend: {
                    data: ['日K', 'MA5', 'MA10', 'MA20', 'MA30']
                },
                grid: {
                    left: '10%',
                    right: '10%',
                    bottom: '15%'
                },
                xAxis: {
                    type: 'category',
                    data: data0.categoryData,
                    scale: true,
                    boundaryGap: false,
                    axisLine: {onZero: false},
                    splitLine: {show: false},
                    splitNumber: 20,
                    min: 'dataMin',
                    max: 'dataMax'
                },
                yAxis: {
                    scale: true,
                    splitArea: {
                        show: true
                    }
                },
                dataZoom: [
                    {
                        type: 'inside',
                        start: 50,
                        end: 100
                    },
                    {
                        show: true,
                        type: 'slider',
                        y: '90%',
                        start: 50,
                        end: 100
                    }
                ],
                series: [
                    {
                        name: '日K',
                        type: 'candlestick',
                        data: data0.values,
                        itemStyle: {
                            normal: {
                                color: upColor,
                                color0: downColor,
                                borderColor: upBorderColor,
                                borderColor0: downBorderColor
                            }
                        },
                        markPoint: {
                            label: {
                                normal: {
                                    formatter: function (param) {
                                        return param != null ? Math.round(param.value) : '';
                                    }
                                }
                            },
                            data: [
                                {
                                    name: 'XX标点',
                                    coord: ['2013/5/31', 2300],
                                    value: 2300,
                                    itemStyle: {
                                        normal: {color: 'rgb(41,60,85)'}
                                    }
                                },
                                {
                                    name: 'highest value',
                                    type: 'max',
                                    valueDim: 'highest'
                                },
                                {
                                    name: 'lowest value',
                                    type: 'min',
                                    valueDim: 'lowest'
                                },
                                {
                                    name: 'average value on close',
                                    type: 'average',
                                    valueDim: 'close'
                                }
                            ],
                            tooltip: {
                                formatter: function (param) {
                                    return param.name + '<br>' + (param.data.coord || '');
                                }
                            }
                        },
                        markLine: {
                            symbol: ['none', 'none'],
                            data: [
                                [
                                    {
                                        name: 'from lowest to highest',
                                        type: 'min',
                                        valueDim: 'lowest',
                                        symbol: 'circle',
                                        symbolSize: 10,
                                        label: {
                                            normal: {show: false},
                                            emphasis: {show: false}
                                        }
                                    },
                                    {
                                        type: 'max',
                                        valueDim: 'highest',
                                        symbol: 'circle',
                                        symbolSize: 10,
                                        label: {
                                            normal: {show: false},
                                            emphasis: {show: false}
                                        }
                                    }
                                ],
                                {
                                    name: 'min line on close',
                                    type: 'min',
                                    valueDim: 'close'
                                },
                                {
                                    name: 'max line on close',
                                    type: 'max',
                                    valueDim: 'close'
                                }
                            ]
                        }
                    },
                    {
                        name: 'MA5',
                        type: 'line',
                        data: calculateMA(5),
                        smooth: true,
                        lineStyle: {
                            normal: {opacity: 0.5}
                        }
                    },
                    {
                        name: 'MA10',
                        type: 'line',
                        data: calculateMA(10),
                        smooth: true,
                        lineStyle: {
                            normal: {opacity: 0.5}
                        }
                    },
                    {
                        name: 'MA20',
                        type: 'line',
                        data: calculateMA(20),
                        smooth: true,
                        lineStyle: {
                            normal: {opacity: 0.5}
                        }
                    },
                    {
                        name: 'MA30',
                        type: 'line',
                        data: calculateMA(30),
                        smooth: true,
                        lineStyle: {
                            normal: {opacity: 0.5}
                        }
                    },

                ]
            };
            myChart.setOption(option, true);

        }
    });
    //插入数据到表
    topRefresh();
    dealRefresh();

    function topRefresh() {
        setTimeout(topRefresh, 5 * 1000);
        $.ajax({
            url: "/fininfo/get_fininfo",
            type: "GET",
            data: {
                text: companyID
            },
            dataType: "json",
            success: function (data) {
                var str = "<span style='color:white '>" + data['datas']['company'] + "(" + companyID + ")</span>";
                if (data['datas']['updown'] > 0) {
                    var str0 = "<span class='cRed' id='arrow'>" + data['datas']['price'] + data['datas']['arrow'] + "</span>";
                    var str1 = "变化量：<span class='cRed'>" + data['datas']['updown'] + "</span>";
                    var str2 = "变化率：<span class='cRed'>" + data['datas']['percent'] + "</span>";
                    var str3 = "今开：<span class='cRed'>" + data['datas']['open'] + "</span>";
                    var str4 = "昨收：<span class='cRed'>" + data['datas']['yestclose'] + "</span>";
                    var str5 = "最高：<span class='cRed'>" + data['datas']['high'] + "</span>";
                    var str6 = "最低：<span class='cRed'>" + data['datas']['low'] + "</span>";
                } else {
                    var str0 = "<span class='cGreen' id='arrow'>" + data['datas']['price'] + data['datas']['arrow'] + "</span>";
                    var str1 = "变化量：<span class='cGreen'>" + data['datas']['updown'] + "</span>";
                    var str2 = "变化率：<span class='cGreen'>" + data['datas']['percent'] + "</span>";
                    var str3 = "今开：<span class='cGreen'>" + data['datas']['open'] + "</span>";
                    var str4 = "昨收：<span class='cGreen'>" + data['datas']['yestclose'] + "</span>";
                    var str5 = "最高：<span class='cGreen'>" + data['datas']['high'] + "</span>";
                    var str6 = "最低：<span class='cGreen'>" + data['datas']['low'] + "</span>";
                }
                var str7 = "成交量：<span>" + data['datas']['volume'] + "万手</span>";
                var str8 = "成交额：<span>" + data['datas']['turnover'] + "亿</span>";
                var str9 = "52周最高：<span class='cRed'>" + data['datas']['highest'] + "</span>";
                var str10 = "52周最低：<span class='cGreen'>" + data['datas']['lowest'] + "</span>";
                var str11 = "市盈率：<span>" + data['datas']['syl'] + "</span>";
                var str12 = "流通市值：<span>" + data['datas']['ltsz'] + "</span>";
                $('#comp_name').html(str);
                $('#price').html(str0);
                $('#updown').html(str1);
                $('#percent').html(str2);
                $('#open').html(str3);
                $('#yestclose').html(str4);
                $('#high').html(str5);
                $('#low').html(str6);
                $('#volume').html(str7);
                $('#turnover').html(str8);
                $('#highest').html(str9);
                $('#lowest').html(str10);
                $('#syl').html(str11);
                $('#ltsz').html(str12);
            }
        });
    }

    function dealRefresh() {
        setTimeout(dealRefresh, 60 * 1000);
        $.ajax({
            url: "/deal/get_dealinfo",
            type: "GET",
            data: {
                text: companyID
            },
            dataType: "json",
            success: function (data) {
                var str1 = "委比：<span>" + data['datas']['weibi'] + "</span>";
                var str2 = "委差：<span>" + data['datas']['weicha'] + "</span>";
                if (data['datas']['updown'] > 0) {
                    var str3 = "<span class='cRed'>" + data['datas']['ask1'] + "</span>";
                    var str4 = "<span class='cRed'>" + data['datas']['ask2'] + "</span>";
                    var str5 = "<span class='cRed'>" + data['datas']['ask3'] + "</span>";
                    var str6 = "<span class='cRed'>" + data['datas']['ask4'] + "</span>";
                    var str7 = "<span class='cRed'>" + data['datas']['ask5'] + "</span>";
                    var str8 = "<span class='cRed'>" + data['datas']['bid1'] + "</span>";
                    var str9 = "<span class='cRed'>" + data['datas']['bid2'] + "</span>";
                    var str10 = "<span class='cRed'>" + data['datas']['bid3'] + "</span>";
                    var str11 = "<span class='cRed'>" + data['datas']['bid4'] + "</span>";
                    var str12 = "<span class='cRed'>" + data['datas']['bid5'] + "</span>";
                    var str23 = "当前价（元）：<span class='cRed'>" + data['datas']['price'] + "</span>";
                } else {
                    var str3 = "<span class='cGreen'>" + data['datas']['ask1'] + "</span>";
                    var str4 = "<span class='cGreen'>" + data['datas']['ask2'] + "</span>";
                    var str5 = "<span class='cGreen'>" + data['datas']['ask3'] + "</span>";
                    var str6 = "<span class='cGreen'>" + data['datas']['ask4'] + "</span>";
                    var str7 = "<span class='cGreen'>" + data['datas']['ask5'] + "</span>";
                    var str8 = "<span class='cGreen'>" + data['datas']['bid1'] + "</span>";
                    var str9 = "<span class='cGreen'>" + data['datas']['bid2'] + "</span>";
                    var str10 = "<span class='cGreen'>" + data['datas']['bid3'] + "</span>";
                    var str11 = "<span class='cGreen'>" + data['datas']['bid4'] + "</span>";
                    var str12 = "<span class='cGreen'>" + data['datas']['bid5'] + "</span>";
                    var str23 = "当前价（元）：<span class='cGreen'>" + data['datas']['price'] + "</span>";
                }
                var str13 = "<span>" + data['datas']['askvol1'] + "</span>";
                var str14 = "<span>" + data['datas']['askvol2'] + "</span>";
                var str15 = "<span>" + data['datas']['askvol3'] + "</span>";
                var str16 = "<span>" + data['datas']['askvol4'] + "</span>";
                var str17 = "<span>" + data['datas']['askvol5'] + "</span>";
                var str18 = "<span>" + data['datas']['bidvol1'] + "</span>";
                var str19 = "<span>" + data['datas']['bidvol2'] + "</span>";
                var str20 = "<span>" + data['datas']['bidvol3'] + "</span>";
                var str21 = "<span>" + data['datas']['bidvol4'] + "</span>";
                var str22 = "<span>" + data['datas']['bidvol5'] + "</span>";
                var str24 = "外盘：<span class='cRed'>" + data['datas']['outside'] + "</span>";
                var str25 = "内盘：<span class='cGreen'>" + data['datas']['inside'] + "</span>";
                $('#weibi').html(str1);
                $('#weicha').html(str2);
                $('#ask1').html(str3);
                $('#ask2').html(str4);
                $('#ask3').html(str5);
                $('#ask4').html(str6);
                $('#ask5').html(str7);
                $('#bid1').html(str8);
                $('#bid2').html(str9);
                $('#bid3').html(str10);
                $('#bid4').html(str11);
                $('#bid5').html(str12);
                $('#askvol1').html(str13);
                $('#askvol2').html(str14);
                $('#askvol3').html(str15);
                $('#askvol4').html(str16);
                $('#askvol5').html(str17);
                $('#bidvol1').html(str18);
                $('#bidvol2').html(str19);
                $('#bidvol3').html(str20);
                $('#bidvol4').html(str21);
                $('#bidvol5').html(str22);
                $('#price_now').html(str23);
                $('#outside').html(str24);
                $('#inside').html(str25);
            }
        });
    }


});
