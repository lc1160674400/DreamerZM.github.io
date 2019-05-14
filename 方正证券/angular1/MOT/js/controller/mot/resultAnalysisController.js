/**
 * @Author WangZe (wangze@linkstec.com)
 * @Date 2018/11/20 11:05
 * @Function
 **/
crmApp.controller("resultAnalysisController",["$scope","$rootScope","$state","$http","$location","$timeout","getDataFactory","ngToast",
    function ($scope,$rootScope,$state,$http,$location,$timeout,getDataFactory,ngToast){

    /***********************变量区域***********************/

    $scope.percentWidth = ['100%','100%','50%','33.3%','25%','20%'];

    $scope.dateTypeList = [{key:'1',value:'按日'},{key:'2',value:'按周'},{key:'3',value:'按月'}];
    $scope.currentDateType = '1';

    $scope.searchParams = {// 筛选条件
        fxwd : '1',
        fxmc : '',
        dateStart : "",
        dateEnd : "",
        dateRange: ""
    };
    $scope.dateStartCopy = '';
    $scope.dateEnd = '';
    $scope.dateRange = '';

    $scope.tabData = [];//上方tab数据
    $scope.currentTab = null;

    $scope.colorList = ['#488FE3','#FD9647','#FFE158','#FE6B6B','#54DDAC']; // 颜色列表
    $scope.legendList = [];// 图表图例
    $scope.chartDateList = [];// 图表x轴
    $scope.chartAllDataList = [];// 图表series

    $scope.chartConfig = {}; // 图表配置

    $scope.showPanel = false;// 是否显示筛选条件
    $scope.legendCheckedList = [];// 选中数据
    $scope.legendAllList = [];// 所有

    $scope.dataList = [];// 数据
    $scope.columnsConfig = [];// 表头

    /***********************函数区域***********************/

    // 替换百分号
    $scope.replacePercent = function(str){
        if(typeof(str)=="number"){
            str = str.toString();
        }
        return str.replace(/%/g, "");
    };

    // 切换日期
    $scope.changeDate = function () {
        addMotEventCountly('切换日期_选择框');//埋点
        $scope.getZbData();
    };

    // 获取指标数据
    $scope.getZbData = function(){
        // release
        var rangeArray = $scope.searchParams.dateRange.split('~');
        getDataFactory.fetchData({
            method: "POST",
            url: myCommon.getWebApp(),
            noCheck: true,
            params: {
                "p": {
                    "busiNo":"effectanalysis.EA010101RBo",
                    "dataType" : $scope.currentDateType,//日期类型
                    "dateBegin" : $.trim(angular.copy(rangeArray[0])).replace(/-/g,''),//日期类型
                    "dateEnd" : $.trim(angular.copy(rangeArray[1])).replace(/-/g,''),//日期类型
                }
            }
        }).then(function (response) {
            if(response.resultData.returnStatus==="S200"){ //接口返回成功
                $scope.searchParams.dateStart = $.trim(angular.copy(rangeArray[0]));
                $scope.searchParams.dateEnd = $.trim(angular.copy(rangeArray[1]));
                $scope.tabData = response.resultData.data.cjzb;//上方tab数据
                if(!$scope.currentTab){
                    $scope.currentTab = $scope.tabData[0].indexKey;
                    $timeout(function () {
                        for(var q=0;q<$scope.tabData.length;q++){
                            angular.element('.rate-title .rate-tooltips-icon').eq(q).tooltip({
                                html: true,
                                trigger: 'hover',
                                delay :{ "show": 200, "hide": 100 },
                                placement: 'bottom',
                                title: $scope.tabData[q].indexDesc,
                                template: '<div class="tooltip" style="opacity: 0.7;filter: alpha(opacity=70);" role="tooltip">' +
                                '<div class="tooltip-arrow"></div>' +
                                '<div class="tooltip-inner" style="padding: 6px 10px;text-align: left;line-height: 1.5;word-break: break-all;">--</div>' +
                                '</div>'
                            });
                        }
                    },300);
                }
                $scope.getDataAction();//获取数据
            }else{
                // ngToast.dismiss();
                if(!myCommon.isEmpty(response.resultData.errorDesc)){
                    ngToast.create({
                        className: 'warning',
                        timeout:3000,
                        content: response.resultData.errorDesc
                    });
                }else if(!myCommon.isEmpty(data.resultData.returnDesc)){
                    ngToast.create({
                        className: 'warning',
                        timeout:3000,
                        content: response.resultData.returnDesc
                    });
                }
                $scope.searchParams.dateRange = $scope.searchParams.dateStart + ' ~ ' + $scope.searchParams.dateEnd;
            }

        },function (error) {
            // console.log(error);
        });
        // debug
        // $scope.tabData = [
        //     {indexKey:'1',indexName:'新课培育率',indexValue:'45%',indexDesc:'描述描述描述描述描述描述描述描述描述描述描述描述'},
        //     {indexKey:'2',indexName:'客户激活率',indexValue:'35%',indexDesc:'描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述'},
        //     {indexKey:'3',indexName:'客户挽留率',indexValue:'35%',indexDesc:'描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述'},
        //     {indexKey:'4',indexName:'现金港开发率',indexValue:'35%',indexDesc:'描述描述描述描述描述描述描述描述描述描述描述描述'},
        //     {indexKey:'5',indexName:'服产转化率',indexValue:'35%',indexDesc:'描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述'},
        // ];//上方tab数据
        // if(!$scope.currentTab){
        //     $scope.currentTab = $scope.tabData[0].indexKey;
        //     $timeout(function () {
        //         for(var q=0;q<$scope.tabData.length;q++){
        //             angular.element('.rate-title .rate-tooltips-icon').eq(q).tooltip({
        //                 html: true,
        //                 trigger: 'hover',
        //                 delay :{ "show": 200, "hide": 100 },
        //                 placement: 'bottom',
        //                 title: $scope.tabData[q].indexDesc,
        //                 template: '<div class="tooltip" style="opacity: 0.7;filter: alpha(opacity=70);" role="tooltip">' +
        //                 '<div class="tooltip-arrow"></div>' +
        //                 '<div class="tooltip-inner" style="padding: 6px 10px;text-align: left;line-height: 1.5;word-break: break-all;">--</div>' +
        //                 '</div>'
        //             });
        //         }
        //     },300);
        // }
        // $scope.getDataAction();//获取数据
    };

    // 切换日期类型
    $scope.changeDateType = function(item){
        if(item.key == $scope.currentDateType){
            return;
        }
        addMotEventCountly('切换日期类型_按钮');//埋点
        $scope.currentDateType = item.key;
        if(item.key == '1'){
            $scope.initDate();
        }else if(item.key == '2'){
            $scope.initDate();
        }
        $scope.getZbData();
    };


    // 图表配置
    $scope.chartFormatter = function(){
        var dataList = [];
        var dateList = $scope.chartDateList;
        for(var i=0;i<$scope.legendList.length;i++){
            for(var j=0;j<$scope.chartAllDataList.length;j++){
                if($scope.legendList[i].name == $scope.chartAllDataList[j].name){
                    dataList.push($scope.chartAllDataList[j]);
                }
            }
        }
        $scope.chartConfig = {
            color:$scope.colorList,
            grid:{
                left:60,
                right:60,
                bottom:40
            },
            tooltip:{
                trigger: 'axis',
                formatter: function(params){
                    var returnString = '';
                    returnString += params[0].name + '<br/>';
                    for(var i=0;i<params.length;i++){
                        var value = params[i].value;
                        if(params[i].seriesType=="line"){
                            value = value + '%';
                        }
                        returnString += '<i style="display:inline-block;margin-right:8px;width:10px;height:10px;border-radius:100%;background-color:'+params[i].color+'"></i>' +
                            params[i].seriesName + '：' + value + '<br/>';
                    }
                    return returnString
                }
            },
            xAxis: [
                {
                    type: 'category',
                    data: dateList,
                    axisTick:{
                        alignWithLabel:true
                    },
                    axisLine:{
                        lineStyle:{
                            color:'#BFBFBF'
                        }
                    },
                    axisLabel:{
                        color:'#000000'
                    },
                    axisPointer: {
                        type: 'line'
                    }
                }
            ],
            yAxis: [
                {
                    type: 'value',
                    name: '数量',
                    axisLine:{
                        lineStyle:{
                            color:'#BFBFBF'
                        }
                    },
                    axisLabel:{
                        color:'#000000'
                    },
                    splitLine:{
                        show:true,
                        lineStyle:{
                            type:'dashed',
                            color:'#E9E9E9'
                        }
                    },
                },
                {
                    type: 'value',
                    name: '',
                    axisLine:{
                        lineStyle:{
                            color:'#BFBFBF'
                        }
                    },
                    splitLine:{
                        show:true,
                        lineStyle:{
                            type:'dashed',
                            color:'#E9E9E9'
                        }
                    },
                    max: 100,
                    axisLabel: {
                        color:'#000000',
                        formatter: '{value} %'
                    }
                }
            ],
            series: dataList
        };
    };

    // http请求获取列表数据
    $scope.getDataAction = function () {
        $scope.dataList = [];
        var rangeArray = $scope.searchParams.dateRange.split('~');
        // release
        getDataFactory.fetchData({
            method: "POST",
            url: myCommon.getWebApp(),
            params: {
                "p": {
                    "busiNo":"effectanalysis.EA010102RBo",
                    "indexParentId" : $scope.currentTab,//场景指标
                    "dataType" : $scope.currentDateType,//日期类型
                    "dateBegin" : $.trim(angular.copy(rangeArray[0])).replace(/-/g,''),//日期类型
                    "dateEnd" : $.trim(angular.copy(rangeArray[1])).replace(/-/g,''),//日期类型
                }
            }
        }).then(function (response) {
            var responseData = response.resultData.data;
            formatterDataAfter(responseData);
        },function (error) {
            // console.log(error);
        });
        // debug
        // $scope.$emit('isLoading',true);
        // $timeout(function () {
        //     var responseData = {
        //         cjzb:{key:1,value:'新课培育率'},
        //         xfzb:[
        //             {key:'1',value:'培育期转为成熟期的客户数'},
        //             {key:'2',value:'培育期总客户数1'},
        //             {key:'3',value:'培育期总客户数2'},
        //             {key:'4',value:'培育期总客户数3'},
        //             {key:'5',value:'培育期总客户数4'},
        //             {key:'6',value:'事件数量占比'}
        //         ],
        //         data:{
        //             1:[
        //                 {DATASTR:'20181102',VALUESTR:'102'},
        //                 {DATASTR:'20181103',VALUESTR:'103'},
        //                 {DATASTR:'20181104',VALUESTR:'104'},
        //                 {DATASTR:'20181105',VALUESTR:'105'},
        //                 {DATASTR:'20181106',VALUESTR:'106'},
        //                 {DATASTR:'20181107',VALUESTR:'107'},
        //                 {DATASTR:'20181108',VALUESTR:'108'},
        //             ],
        //             2:[
        //                 {DATASTR:'20181102',VALUESTR:'202'},
        //                 {DATASTR:'20181103',VALUESTR:'203'},
        //                 {DATASTR:'20181104',VALUESTR:'204'},
        //                 {DATASTR:'20181105',VALUESTR:'205'},
        //                 {DATASTR:'20181106',VALUESTR:'206'},
        //                 {DATASTR:'20181107',VALUESTR:'207'},
        //                 {DATASTR:'20181108',VALUESTR:'208'},
        //             ],
        //             3:[
        //                 {DATASTR:'20181102',VALUESTR:'202'},
        //                 {DATASTR:'20181103',VALUESTR:'203'},
        //                 {DATASTR:'20181104',VALUESTR:'204'},
        //                 {DATASTR:'20181105',VALUESTR:'205'},
        //                 {DATASTR:'20181106',VALUESTR:'206'},
        //                 {DATASTR:'20181107',VALUESTR:'207'},
        //                 {DATASTR:'20181108',VALUESTR:'208'},
        //             ],
        //             4:[
        //                 {DATASTR:'20181102',VALUESTR:'202'},
        //                 {DATASTR:'20181103',VALUESTR:'203'},
        //                 {DATASTR:'20181104',VALUESTR:'204'},
        //                 {DATASTR:'20181105',VALUESTR:'205'},
        //                 {DATASTR:'20181106',VALUESTR:'206'},
        //                 {DATASTR:'20181107',VALUESTR:'207'},
        //                 {DATASTR:'20181108',VALUESTR:'208'},
        //             ],
        //             5:[
        //                 {DATASTR:'20181102',VALUESTR:'202'},
        //                 {DATASTR:'20181103',VALUESTR:'203'},
        //                 {DATASTR:'20181104',VALUESTR:'204'},
        //                 {DATASTR:'20181105',VALUESTR:'205'},
        //                 {DATASTR:'20181106',VALUESTR:'206'},
        //                 {DATASTR:'20181107',VALUESTR:'207'},
        //                 {DATASTR:'20181108',VALUESTR:'208'},
        //             ],
        //             6:[
        //                 {DATASTR:'20181102',VALUESTR:'22%'},
        //                 {DATASTR:'20181103',VALUESTR:'23%'},
        //                 {DATASTR:'20181104',VALUESTR:'24%'},
        //                 {DATASTR:'20181105',VALUESTR:'25%'},
        //                 {DATASTR:'20181106',VALUESTR:'26%'},
        //                 {DATASTR:'20181107',VALUESTR:'27%'},
        //                 {DATASTR:'20181108',VALUESTR:'28%'},
        //             ]
        //         }
        //     };
        //     formatterDataAfter(responseData);
        //     $scope.$emit('isLoading',false);
        // },2000);
    };
    // 获取数据后格式化数据
    function formatterDataAfter(responseData){
        $scope.legendAllList = responseData.xfzb;
        $scope.legendList = [];
        for(var m=0;m<$scope.legendAllList.length;m++){
            if(m<5){
                $scope.legendAllList[m].isChecked = true;
            }else{
                $scope.legendAllList[m].isChecked = false;
            }
        }
        $scope.legendCheckedList = angular.copy($scope.legendAllList.slice(0,5));
        for(var n=0;n<$scope.legendCheckedList.length;n++){
            $scope.legendList[n] = {
                name:$scope.legendCheckedList[n].value
            }
        }

        var xfzbList = responseData.xfzb;
        var dataObj = responseData.data;

        //表头
        $scope.columnsConfig = [];
        $scope.chartAllDataList = [];// 图表数据
        var dataTemplateObj = {
            DATASTR : "",
        };
        for(var i=0;i<xfzbList.length;i++){
            $scope.columnsConfig[i] = { title: xfzbList[i].value, key: xfzbList[i].key, width: 120, tipFlag:true};
            dataTemplateObj[xfzbList[i].key] = '';
            // 图表部分处理
            var chartList = [];
            $scope.chartAllDataList[i] = {
                name:xfzbList[i].value,
                type:'',
                data:[]
            };
            if(dataObj[xfzbList[i].key][0].VALUESTR.toString().indexOf('%') != -1){
                $scope.chartAllDataList[i].type = 'line';
                $scope.chartAllDataList[i].yAxisIndex = 1;
            }else{
                $scope.chartAllDataList[i].type = 'bar';
                $scope.chartAllDataList[i].barWidth = '10%';
            }
            for(var jj=0;jj<dataObj[xfzbList[i].key].length;jj++){
                chartList[jj] = Number(dataObj[xfzbList[i].key][jj].VALUESTR.toString().replace(/%/g,''));
            }
            $scope.chartAllDataList[i].data = chartList;

        }
        $scope.columnsConfig.unshift({ title: '日期', key: 'DATASTR', width: 120, tipFlag:true});

        // 表数据
        $scope.dataList = [];
        var isFirstFormat = true;
        for(var k in dataObj){
            var dataTemplate = angular.copy(dataTemplateObj);
            var list = dataObj[k];

            for(var j=0;j<list.length;j++){
                if(isFirstFormat){
                    dataTemplate.DATASTR = list[j].DATASTR;
                    dataTemplate[k] = list[j].VALUESTR;
                    $scope.dataList.push(angular.copy(dataTemplate));
                }else{
                    $scope.dataList[j][k] = list[j].VALUESTR;
                }
            }
            isFirstFormat = false;
        }
        // console.log($scope.dataList);

        // 格式化图表
        $scope.chartDateList = [];
        for(var ii = 0;ii<$scope.dataList.length;ii++){
            $scope.chartDateList[ii] = $scope.dataList[ii].DATASTR;
        }
        $scope.chartFormatter();
    }
    // 检查当前类型
    $scope.checkType = function(item){
        for(var i = 0;i<$scope.chartAllDataList.length;i++){
            if(item.name == $scope.chartAllDataList[i].name){
                return $scope.chartAllDataList[i].type;
            }
        }
    };

    // 切换tab
    $scope.changeTab = function(item){
        if(item.indexKey == $scope.currentTab){
            return;
        }
        $scope.currentTab = item.indexKey;
        $scope.getDataAction();
    };




    // 点击除筛选框外区域，隐藏筛选框
    $scope.otherAreaClosePanel = function(e){
        var _con = angular.element('.panel-close-ignore');   // 设置目标区域
        if(!_con.is(e.target) && _con.has(e.target).length === 0){
            $scope.showPanel = false;// 是否显示筛选条件
        }
    };
    // 关闭筛选框
    $scope.closePanel = function(){
        angular.element('.filter-panel-container').css({'overflow':'hidden'});
        $scope.showPanel=false;
    };
    // 打开筛选框
    $scope.openPanel = function(){
        $timeout(function () {
            $scope.topHeight = angular.element('.filter-panel-wrap .filter-top-box').height();
            angular.element('.filter-panel-container').css({'overflow':'unset'});
        },100);
        $scope.showPanel=true;
    };
    // 勾选改变
    $scope.changeChecked = function(item){
        var isCheckedFlag = false;
        for(var i=0;i<$scope.legendCheckedList.length;i++){
            if($scope.legendCheckedList[i].key == item.key){
                $scope.legendCheckedList.splice(i,1);
                isCheckedFlag = true;
            }
        }
        if(!isCheckedFlag){
            if($scope.legendCheckedList.length >= 5){
                ngToast.warning('最多选中显示5个');
                item.isChecked = false;
                return;
            }
            $scope.legendCheckedList.push(item);
        }
    };
    // 移除选中项
    $scope.removeChecked = function(item,index){
        for(var i = 0;i<$scope.legendAllList.length;i++){
            if(item.key == $scope.legendAllList[i].key){
                $scope.legendAllList[i].isChecked = false;
            }
        }
        $scope.legendCheckedList.splice(index,1);
    };

    // 保存
    $scope.submitFilter = function(){
        addMotEventCountly('保存展示项_按钮');//埋点
        // $scope.getDataAction();//获取数据
        $scope.legendList = [];
        for(var i=0;i<$scope.legendCheckedList.length;i++){
            $scope.legendList[i] = {
                name:$scope.legendCheckedList[i].value
            }
        }
        $scope.chartFormatter();
        $scope.showPanel = false;// 是否显示筛选条件
    };
    // 重置
    $scope.resetFilter = function(){
        addMotEventCountly('重置展示项_按钮');//埋点
        for(var m=0;m<$scope.legendAllList.length;m++){
            if(m<5){
                $scope.legendAllList[m].isChecked = true;
            }else{
                $scope.legendAllList[m].isChecked = false;
            }
        }
        $scope.legendCheckedList = angular.copy($scope.legendAllList.slice(0,5));
        // $scope.showPanel = false;// 是否显示筛选条件
    };
    // 清空
    $scope.clearChecked = function(){
        addMotEventCountly('清空展示项_按钮');//埋点
        for(var m=0;m<$scope.legendAllList.length;m++){
            $scope.legendAllList[m].isChecked = false;
        }
        $scope.legendCheckedList = [];
    };

    //导出excel
    $scope.exportExcel=function(){
        addMotEventCountly('导出EXCEL_按钮');//埋点
        var outputJson = outPutSetting("效果分析导出",$scope.columnsConfig,{
            "indexParentId" : $scope.currentTab,//场景指标
            "dataType" : $scope.currentDateType,//日期类型
            "dateBegin" : $scope.searchParams.dateStart.replace(/-/g,''),//日期类型
            "dateEnd" : $scope.searchParams.dateEnd.replace(/-/g,''),//日期类型
        },"effectanalysis.EA010103RBo",{});
        window.parent.L.submit("../export",true,{p:JSON.stringify(outputJson)},true,true);
    };
    function outPutSetting(outPutName,tableConfig,searchParam,busiNo,excelColRenderer) {
        var excelHeader = [];
        for(var i=0;i<tableConfig.length;i++){
            if(tableConfig[i].key!='operate'){
                excelHeader.push(tableConfig[i].title+'`'+tableConfig[i].width);
                excelHeader.push(tableConfig[i].key);
            }
        }
        var returnJson = {
            "busiNo":busiNo,//查询业务BO
            "excelHeader":excelHeader,//导出EXCEL表头列
            "resultField":"data",//业务Bo返回数据的字段
            "sheetName":outPutName,
            "param":searchParam,
            "exportP":{"maxRecode":60000,"exportType":1},
            "excelColRenderer":excelColRenderer
        };
        return returnJson;
    }

    /***********************初始化区域*********************/

    $scope.initDate = function(){
        var nowDate = $rootScope.currentStaffInfo.currDate;
        var nowDateStr = nowDate.substring(0,4) + '-' + nowDate.substring(4,6) + '-' + nowDate.substring(6,8);
        var nowDateNum = new Date(nowDateStr).getTime();
        var startDateObj = new Date(nowDateNum-6*24*3600*1000);
        var startYear = startDateObj.getFullYear();
        var startMonth = startDateObj.getMonth()+1>9?startDateObj.getMonth()+1:'0'+(startDateObj.getMonth()+1);
        var startDate = startDateObj.getDate()>9?startDateObj.getDate():'0'+startDateObj.getDate();
        $scope.searchParams.dateStart = startYear+''+startMonth+''+startDate;
        $scope.searchParams.dateEnd = nowDate;
        $scope.searchParams.dateRange = startYear+''+startMonth+''+startDate + ' ~ ' + nowDate;
    };

    $scope.init = function () {
        $scope.initDate();
        $scope.getZbData();// 获取指标
    };
    $scope.init();

    /***********************监控区域**********************/

    $scope.$on('windowResize',function (e,d) {
        if(d){
            echarts.getInstanceByDom(document.getElementsByClassName('chart-box')[0]).resize();
        }
    });

        // 埋点方法
        function addMotEventCountly(name) {
            countlyClickEvent("340093",'MOT效果分析_'+name,"CRM_服务营销_MOT效果分析");//mot埋点
            // console.log("340088",'默认事件列表_'+name,"CRM_MOT平台_场景化展业");//mot埋点
        }
}]);