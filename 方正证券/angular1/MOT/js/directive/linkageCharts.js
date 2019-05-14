/**
 * @Author WangZe (wangze@linkstec.com)
 * @Date 2018/4/3 13:36
 * @Function 图表组件
 **/
crmApp.directive("linkageCharts",['$compile','$timeout',function($compile,$timeout){
    return {
        scope : {
            chartConfig : "="
        },
        restrict: 'EA',
        template : '<div></div>',
        replace : true,
        link: function(scope, element, attrs,ngModel) {
            /***********************参数区域*******************************************/
            var Ce6e6e6 = '#e6e6e6';//分割线、指示线颜色
            var Ccccccc = '#cccccc';//轴颜色
            var C666666 = '#666666';//图例颜色
            var C555555 = '#555555';//坐标颜色
            var C333333 = '#333333';//标题颜色


            /***********************函数区域******************************************/
            //基础柱状图
            var basicBarOption= function (){
                var configUnitName = "";//单位名称
                var seriesList = [];//系列list
                var legendList = [];//系列图例
                var xAxisList = [];//x轴配置
                var yAxisList = [];//x轴配置
                //单位设置      判断有无单位
                if(typeof scope.chartConfig.unitName === 'undefined'){
                    configUnitName = ""
                }else{
                    configUnitName = scope.chartConfig.unitName
                }
                //系列、图例配置      判断单条/堆叠/多条
                if(typeof scope.chartConfig.legendList === 'undefined'){
                    legendList = [];
                    seriesList[0] = {
                        type:'bar',
                        barWidth: '60%',
                        data:scope.chartConfig.dataList
                    }
                }else if(scope.chartConfig.isStack){
                    for(var i=0;i<scope.chartConfig.dataList.length;i++){
                        seriesList[i] = {
                            name: scope.chartConfig.legendList[i],
                            type: 'bar',
                            barWidth: '60%',
                            stack: 'linkageChartsBarTotal',
                            label: {
                                normal: {
                                    show: true,
                                    position: 'inside'
                                }
                            },
                            data: scope.chartConfig.dataList[i]
                        };
                        legendList[i] = {
                            name : scope.chartConfig.legendList[i],
                            icon : "circle",
                            textStyle : {
                                fontSize : 12,
                                color :C666666
                            }
                        };
                    }
                }else{
                    var labelPosition = {};
                    if(scope.chartConfig.isHorizontal){
                        labelPosition = {
                            show : false
                        }
                    }else{
                        labelPosition = {
                            show: true,
                            position: 'top'
                        }
                    }
                    for(var i=0;i<scope.chartConfig.dataList.length;i++){
                        seriesList[i] = {
                            name: scope.chartConfig.legendList[i],
                            type: 'bar',
                            label: {
                                normal:labelPosition
                            },
                            data: scope.chartConfig.dataList[i]
                        };
                        legendList[i] = {
                            name : scope.chartConfig.legendList[i],
                            icon : "circle",
                            textStyle : {
                                fontSize : 12,
                                color :C666666
                            }
                        }
                    }
                }
                //X轴Y轴配置       判断是纵向/横向展示
                if(scope.chartConfig.isHorizontal){
                    xAxisList = [
                        {
                            type : 'value',
                            axisLine : {//y轴配置
                                lineStyle : {
                                    color : Ccccccc
                                }
                            },
                            axisLabel : {//y轴坐标配置
                                color : C555555,
                                formatter: function (val) {
                                    return val + configUnitName;
                                }
                            },
                            axisTick : {//y轴坐标刻度配置
                                length : 3
                            },
                            splitLine : {//y轴分割线配置
                                lineStyle : {
                                    type : 'dotted',
                                    color : Ce6e6e6
                                }
                            }
                        }
                    ];
                    yAxisList = [
                        {
                            type : 'category',
                            data : scope.chartConfig.labelList,
                            axisLine : {//x轴配置
                                lineStyle : {
                                    color : Ccccccc
                                }
                            },
                            axisLabel : {//x轴坐标配置
                                color : C555555
                            },
                            axisTick: {//x轴坐标刻度配置
                                length : 3,
                                alignWithLabel: true
                            }
                        }
                    ];
                }else{
                    xAxisList = [
                        {
                            type : 'category',
                            data : scope.chartConfig.labelList,
                            axisLine : {//x轴配置
                                lineStyle : {
                                    color : Ccccccc
                                }
                            },
                            axisLabel : {//x轴坐标配置
                                rotate : -45,
                                color : C555555
                            },
                            axisTick: {//x轴坐标刻度配置
                                length : 3,
                                alignWithLabel: true
                            }
                        }
                    ];
                    yAxisList = [
                        {
                            type : 'value',
                            axisLine : {//y轴配置
                                lineStyle : {
                                    color : Ccccccc
                                }
                            },
                            axisLabel : {//y轴坐标配置
                                color : C555555,
                                formatter: function (val) {
                                    return val + configUnitName;
                                }
                            },
                            axisTick : {//y轴坐标刻度配置
                                length : 3
                            },
                            splitLine : {//y轴分割线配置
                                lineStyle : {
                                    type : 'dotted',
                                    color : Ce6e6e6
                                }
                            }
                        }
                    ];
                }

                return {
                    title: {
                        text:scope.chartConfig.chartTitle,
                        textStyle : {
                            color : C333333,
                            fontSize : 12,

                        },
                        left : 15,
                        top : 15,
                    },
                    legend: {
                        data: legendList,
                        top:15,
                        left:"50%"
                    },
                    dataZoom : scope.chartConfig.dataZoom?scope.chartConfig.dataZoom:null,
                    color: scope.chartConfig.colorList,
                    tooltip : {
                        trigger: 'axis',
                        axisPointer : {  // 坐标轴指示器，坐标轴触发有效
                            type : 'line', // 默认为直线，可选为：'line' | 'shadow'
                            lineStyle : {
                                type : 'dotted',
                                color : Ce6e6e6
                            }
                        },
                        confine:true,
                        formatter : function (params) {
                            var result = params[0].name;
                            params.forEach(function(item) {
                                result += '<br/>';
                                result += '<span style="display:inline-block;margin-right:5px;border-radius:10px;width:9px;height:9px;background-color:' + item.color + '"></span>';
                                result += legendList.length>0 ? item.seriesName + "：" : "";
                                result += isNaN(item.value) ? 0 : item.value;
                                result += configUnitName
                            });
                            return result;
                        }
                    },
                    grid: {
                        left: '15',
                        right: '20',
                        bottom: '50',
                        top: '70',
                        containLabel: true
                    },
                    xAxis : xAxisList,
                    yAxis : yAxisList,
                    series : seriesList
                };
            };

            // 基础单折线图/面积图
            var basicLineOption= function () {
                var legendList = [];
                var seriesList = [];
                var areaOpacity = 0.6;
                var configUnitName = "";//单位名称
                var boundaryGapStyle = true;
                //单位设置      判断有无单位
                if(typeof scope.chartConfig.unitName === 'undefined'){
                    configUnitName = ""
                }else{
                    configUnitName = scope.chartConfig.unitName
                }
                //面积设置      判断有无单位
                if(scope.chartConfig.isArea){
                    areaOpacity = 0.6;
                    boundaryGapStyle = false;
                }else{
                    areaOpacity = 0;
                    boundaryGapStyle = true;
                }
                //系列、图例配置      判断单条/多条
                if(typeof scope.chartConfig.legendList === 'undefined'){
                    legendList = [];
                    seriesList[0] = {
                        type:'line',
                        // stack: 'linkageChartsLineTotal',
                        smooth:scope.chartConfig.lineSmooth,
                        itemStyle: {normal: {areaStyle: {type: 'default',opacity:areaOpacity}}},
                        data:scope.chartConfig.dataList
                    };
                }else{
                    legendList = scope.chartConfig.legendList;
                    for(var j=0;j<scope.chartConfig.dataList.length;j++){
                        seriesList[j] = {
                            type:'line',
                            stack: 'linkageChartsLineTotal',
                            name : scope.chartConfig.legendList[j],
                            smooth:scope.chartConfig.lineSmooth,
                            itemStyle: {
                                normal: {
                                    areaStyle: {
                                        type: 'default',
                                        opacity:areaOpacity
                                    }
                                }
                            },
                            data:scope.chartConfig.dataList[j]
                        };
                        legendList[j] = {
                            name : scope.chartConfig.legendList[j],
                            icon : "circle",
                            textStyle : {
                                fontSize : 12,
                                color :C666666
                            }
                        };
                    }
                }

                return {
                    title: {
                        text:scope.chartConfig.chartTitle,
                        textStyle : {
                            color : C333333,
                            fontSize : 12,

                        },
                        left : 15,
                        top : 15,
                    },
                    dataZoom : scope.chartConfig.dataZoom?scope.chartConfig.dataZoom:null,
                    color: scope.chartConfig.colorList,
                    tooltip : {
                        confine:true,
                        trigger: 'axis',
                        axisPointer : {  // 坐标轴指示器，坐标轴触发有效
                            type : 'line', // 默认为直线，可选为：'line' | 'shadow'
                            lineStyle : {
                                type : 'dotted',
                                color : Ce6e6e6
                            }
                        },
                        formatter : function (params) {
                            var result = params[0].name;
                            params.forEach(function(item) {
                                result += '<br/>';
                                result += '<span style="display:inline-block;margin-right:5px;border-radius:10px;width:9px;height:9px;background-color:' + item.color + '"></span>';
                                result += legendList.length>0 ? item.seriesName + "：" : "";
                                result += isNaN(item.value) ? 0 : item.value;
                                result += configUnitName
                            });
                            return result;
                        }
                    },
                    legend: {
                        data: legendList,
                        top:15,
                        left:"50%"
                    },
                    grid: {
                        left: '15',
                        right: '20',
                        bottom: '50',
                        top: '70',
                        containLabel: true
                    },
                    xAxis : [
                        {
                            type : 'category',
                            data : scope.chartConfig.labelList,
                            boundaryGap : boundaryGapStyle,
                            axisLine : {//x轴配置
                                lineStyle : {
                                    color : Ccccccc
                                }
                            },
                            axisLabel : {//x轴坐标配置
                                rotate : -45,
                                color : C555555
                            },
                            axisTick: {//x轴坐标刻度配置
                                length : 3,
                                alignWithLabel: true
                            }
                        }
                    ],
                    yAxis : [
                        {
                            type : 'value',
                            nameTextStyle : {
                                color : C666666
                            },
                            axisLine : {//y轴配置
                                lineStyle : {
                                    color : Ccccccc
                                }
                            },
                            axisLabel : {//y轴坐标配置
                                color : C555555,
                                formatter: function (val) {
                                    return val + configUnitName;
                                }
                            },
                            axisTick : {//y轴坐标刻度配置
                                length : 3
                            },
                            splitLine : {//y轴分割线配置
                                lineStyle : {
                                    type : 'dotted',
                                    color : Ce6e6e6
                                }
                            }
                        }
                    ],
                    series : seriesList
                };
            };
            // 组单折线图
            var doubleAxisLineOption= function () {
                var seriesList = [];
                var legendList = [];
                var yAxisList = [];
                for(var i=0;i<scope.chartConfig.dataList.length;i++){
                    seriesList[i] = {
                        name: scope.chartConfig.legendList[i],
                        type: 'line',
                        yAxisIndex:i,
                        showSymbol:false,
                        smooth:scope.chartConfig.lineSmooth,
                        data: scope.chartConfig.dataList[i]
                    };
                    legendList[i] = {
                        name : scope.chartConfig.legendList[i],
                        icon : "roundRect",
                        textStyle : {
                            fontSize : 12,
                            color :C666666
                        }
                    };
                    yAxisList[i] = {
                        type : 'value',
                        axisLine : {//y轴配置
                            lineStyle : {
                                color : Ccccccc
                            }
                        },
                        axisLabel : {//y轴坐标配置
                            color : C555555,
                            formatter:'{value}'+(scope.chartConfig.unitName?scope.chartConfig.unitName.split(',')[i]:"")
                        },
                        axisTick : {//y轴坐标刻度配置
                            length : 3
                        },
                        splitLine : {//y轴分割线配置
                            lineStyle : {
                                type : 'dotted',
                                color : Ce6e6e6
                            }
                        }
                    };
                }
                return {
                    title: {
                        text:scope.chartConfig.chartTitle,
                        textStyle : {
                            color : C333333,
                            fontSize : 12,

                        },
                        left : 15,
                        top : 15,
                    },
                    dataZoom : scope.chartConfig.dataZoom?scope.chartConfig.dataZoom:null,
                    color: scope.chartConfig.colorList,
                    tooltip : {
                        confine:true,
                        trigger: 'axis',
                        axisPointer : {  // 坐标轴指示器，坐标轴触发有效
                            type : 'line', // 默认为直线，可选为：'line' | 'shadow'
                            lineStyle : {
                                type : 'dotted',
                                color : Ce6e6e6
                            }
                        },
                        formatter:function(a) 
                        {   
                            var toolTipHtml = a[0].axisValue;
                            // var legendLength = $scope.legend.length;

                            for(var i = 0;i<a.length;i++){

                                if(scope.chartConfig.unitName){
                                    toolTipHtml+="<br>"+a[i].marker+a[i].data+scope.chartConfig.unitName.split(',')[[a[i].seriesIndex]];
                                }else{
                                    toolTipHtml+="<br>"+a[i].marker+a[i].data;
                                }
                                

                            }

                            return toolTipHtml;
                        },

                    },
                    legend: {
                        data: legendList,
                        top:15,
                        left:"50%"
                    },
                    grid: {
                        left: '15',
                        right: '20',
                        bottom: '50',
                        top: '70',
                        containLabel: true
                    },
                    xAxis : [
                        {
                            type : 'category',
                            data : scope.chartConfig.labelList,
                            axisLine : {//x轴配置
                                lineStyle : {
                                    color : Ccccccc
                                }
                            },
                            axisLabel : {//x轴坐标配置
                                rotate : -45,
                                color : C555555
                            },
                            axisTick: {//x轴坐标刻度配置
                                length : 3,
                                alignWithLabel: true
                            }
                        }
                    ],
                    yAxis : yAxisList,
                    series :seriesList
                };
            };

            //基础饼图
            var basicPieOption= function () {
                var dataList = [];
                var legendList = [];
                var isRoseType = false;
                var labelConfig = {};
                var pieRadius = scope.chartConfig.pieRadius;
                for(var i=0;i<scope.chartConfig.dataList.length;i++){
                    dataList[i] = {
                        name : scope.chartConfig.labelList[i],
                        value : scope.chartConfig.dataList[i]
                    };
                    legendList[i] = {
                        name : scope.chartConfig.labelList[i],
                        icon : "circle",
                        textStyle : {
                            fontSize : 12,
                            color :C666666
                        }
                    };
                }

                if(scope.chartConfig.isRoseType){
                    isRoseType = 'radius';
                    labelConfig = {
                        formatter: '{blackTxt|{d}%}',
                        rich: {
                            blackTxt: {
                                color: C333333,
                                lineHeight: 14,
                                align: 'left'
                            },
                            blueTxt:{
                                color: '#488FE3',
                                lineHeight: 14,
                                align: 'left'
                            }
                        }
                    };
                }else{
                    isRoseType = false;
                    labelConfig = {
                        formatter: '{blackTxt|{b}}\n{blueTxt|{d}%}  ',
                        rich: {
                            blackTxt: {
                                color: C333333,
                                lineHeight: 14,
                                align: 'left'
                            },
                            blueTxt:{
                                color: '#488FE3',
                                lineHeight: 14,
                                align: 'left'
                            }
                        }
                    };
                }
                return {
                    title : {
                        text:scope.chartConfig.chartTitle,
                        textStyle : {
                            color : C333333,
                            fontSize : 12,

                        },
                        left : 15,
                        top : 15,
                    },
                    tooltip: {
                        trigger: 'item',
                        formatter: "{b}<br/>{c} ({d}%)"
                    },
                    legend: {
                        data: legendList,
                        top:80,
                        left:10,
                        orient:"vertical"
                    },
                    color:scope.chartConfig.colorList,
                    series: [
                        {
                            type:'pie',
                            roseType : isRoseType,
                            center:['60%','55%'],
                            radius: pieRadius,
                            label: {
                                show : true,
                                normal : labelConfig
                            },
                            labelLine:{
                                normal:{
                                    length:5,
                                    length2:8,
                                    lineStyle : {
                                        color : Ccccccc
                                    }
                                }

                            },
                            data:dataList
                        }
                    ]
                };
            };

            //雷达图
            var basicRadarOption= function () {
                var dataList = [];
                var legendList = [];
                var indicatorList = [];
                var areaOpacity = 0.6;
                if(scope.chartConfig.isArea){
                    areaOpacity = 0.6;
                }else{
                    areaOpacity = 0;
                }
                if(typeof scope.chartConfig.legendList === 'undefined'){
                    legendList = [];
                    dataList[0] = {
                        name : scope.chartConfig.chartTitle,
                        value : scope.chartConfig.dataList
                    };
                    for(var i=0;i<scope.chartConfig.dataList.length;i++){
                        indicatorList[i] = {
                            name : scope.chartConfig.labelList[i],
                            max : scope.chartConfig.maxValue[i]
                        };
                    }
                }else{
                    legendList = scope.chartConfig.legendList;
                    for(var j=0;j<scope.chartConfig.dataList.length;j++){
                        dataList[j] = {
                            name : scope.chartConfig.legendList[j],
                            value : scope.chartConfig.dataList[j]
                        };

                    }
                    for(var k=0;k<scope.chartConfig.labelList.length;k++){
                        indicatorList[k] = {
                            name : scope.chartConfig.labelList[k],
                            max : scope.chartConfig.maxValue[k]
                        };
                    }
                }

                return {
                    title : {
                        text:scope.chartConfig.chartTitle,
                        textStyle : {
                            color : C333333,
                            fontSize : 12,

                        },
                        left : 15,
                        top : 15,
                    },
                    tooltip: {
                        // trigger: 'item',
                        // formatter: "{b}<br/>{c} ({d}%)"
                    },
                    grid: {
                        left: '15',
                        right: '20',
                        bottom: '50',
                        top: '70',
                        containLabel: true
                    },
                    legend: {
                        data: legendList,
                        top:15,
                        left:"50%"
                    },
                    color:scope.chartConfig.colorList,
                    radar: {
                        radius : '60%',
                        center : ['50%','60%'],
                        indicator: indicatorList
                    },
                    series: [{
                        type: 'radar',
                        symbolSize:0,
                        itemStyle: {normal: {areaStyle: {type: 'default',opacity:areaOpacity}}},
                        data : dataList
                    }]
                };
            };

            //中国地图
            var basicMapOption= function () {
                var seriesList = [];
                var legendList = [];
                if(typeof scope.chartConfig.legendList === 'undefined'){
                    legendList = [];
                    seriesList[0] = {
                        type: 'map',
                        mapType: 'china',
                        name: scope.chartConfig.chartTitle,
                        showLegendSymbol: false,
                        data: scope.chartConfig.dataList
                    }
                }else{
                    legendList = scope.chartConfig.legendList;
                    for(var i=0;i<scope.chartConfig.legendList.length;i++){
                        seriesList[i] = {
                            type: 'map',
                            mapType: 'china',
                            name: scope.chartConfig.legendList[i],
                            showLegendSymbol: false,
                            data: scope.chartConfig.dataList[i]
                        }
                    }
                }
                return {
                    title : {
                        text:scope.chartConfig.chartTitle,
                        textStyle : {
                            color : C333333,
                            fontSize : 12,

                        },
                        left : 15,
                        top : 15,
                    },
                    tooltip: {
                        trigger: 'item'
                    },
                    legend: {
                        data: legendList,
                        top:80,
                        left : 15,
                        orient:"vertical"
                    },
                    visualMap: {
                        min: scope.chartConfig.rangeValue[0],
                        max: scope.chartConfig.rangeValue[1],
                        color:scope.chartConfig.colorList,
                        left: '15',
                        bottom: '20',
                        itemWidth :'10',
                        itemHeight : '60',
                        text: ['高','低'],           // 文本，默认为数值文本
                        calculable: true
                    },
                    series : seriesList
                }
            };

            //仪表盘
            var basicGaugeOption= function () {
                var colorList = [];
                if(typeof scope.chartConfig.colorList === 'undefined'){
                    colorList = [[0.2, '#91c7ae'], [0.8, '#63869e'], [1, '#c23531']]
                }else{
                    for(var i=0;i<scope.chartConfig.colorList.length;i++){
                        colorList[i] = [(i+1)/scope.chartConfig.colorList.length,scope.chartConfig.colorList[i]];
                    }
                }
                return {
                    title : {
                        text:scope.chartConfig.chartTitle,
                        textStyle : {
                            color : C333333,
                            fontSize : 12,

                        },
                        left : 15,
                        top : 15,
                    },
                    // tooltip: {
                    //     trigger: 'item',
                    //     formatter: "{b}<br/>{c} ({d}%)"
                    // },
                    series: [
                        {
                            name: '业务指标',
                            type: 'gauge',
                            radius:'90%',
                            center: ["50%", "75%"],
                            startAngle: 180,
                            endAngle: 0,
                            min: scope.chartConfig.rangeValue[0],
                            max: scope.chartConfig.rangeValue[1],
                            axisLine:{
                                lineStyle:{
                                    width : 20,
                                    color : colorList
                                }
                            },
                            splitLine:{
                                length :20
                            },
                            axisLabel :{
                                color : C333333
                            },
                            pointer :{
                                length :'65%',
                                width:5
                            },
                            detail: {
                                formatter:'{value}'+scope.chartConfig.unitName,
                                color :C666666,
                                offsetCenter :[0,20],
                                fontSize:14
                            },
                            data: scope.chartConfig.dataList
                        }
                    ]
                };
            };


            /***********************初始化区域****************************************/
            function switchChart() {
                var myChart = echarts.init(element[0]);
                switch (scope.chartConfig.chartType){
                    //柱状图
                    case 'basicBar' :
                        myChart.setOption(basicBarOption());
                        break;

                    //折线图
                    case 'basicLine' :
                        myChart.setOption(basicLineOption());
                        break;
                    case 'doubleAxisLine' :
                        myChart.setOption(doubleAxisLineOption());
                        break;

                    //饼状图、环形图
                    case 'basicPie' :
                        myChart.setOption(basicPieOption());
                        break;

                    //雷达图
                    case 'basicRadar' :
                        myChart.setOption(basicRadarOption());
                        break;

                    //中国地图
                    case 'basicMap' :
                        myChart.setOption(basicMapOption());
                        break;

                    //仪表盘
                    case 'basicGauge' :
                        myChart.setOption(basicGaugeOption());
                        break;

                    default :
                        myChart.setOption(scope.chartConfig,true);
                        break;

                }
            }
            switchChart();

            /***********************监控区域*******************************************/
            scope.$watch('chartConfig',function (nV,oV) {
                if(nV!=oV){
                    scope.chartConfig = nV;
                    switchChart();
                }
            },true);

        }
    }

}]);