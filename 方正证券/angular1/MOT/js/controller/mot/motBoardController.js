/**
 * @Author WangZe (wangze@linkstec.com)
 * @Date 2018/11/22 16:41
 * @Function
 **/
crmApp.controller("motBoardController",["$scope","$rootScope","$state","$http","$location","$timeout","getDataFactory","ngToast",'getDirectoryData','$stateParams',
    function ($scope,$rootScope,$state,$http,$location,$timeout,getDataFactory,ngToast,getDirectoryData,$stateParams){

        // 处理状态  1：待处理   2：需关注   3：可忽略   4：处理中   5：处理失败   6：已处理   7：已消失   8：已忽略   9：已过期

        /***********************变量区域***********************/

        // 导出功能权限
        $scope.ouputAuthority = false;

        // 人员权限
        $scope.authority = 'isRy';//权限   isRy   isYyb   isZb
        // 营业部
        $scope.branchList = [];
        // 人员
        $scope.memberList = [];

        // 处理弹框 显示状态
        $scope.dealMotIsShow = false;

        // 筛选条件部分 显示状态
        $scope.showPanel = false;// 是否显示筛选条件

        $scope.khbList = $rootScope.getDictionary('CUST_PACKAGE');//客户包
        $scope.khgxList = $rootScope.getDictionary('RLT_TYPE');//客户关系
        $scope.sbztList = [];//识别状态
        $scope.cjmcList = $rootScope.getDictionary('MOT_SCENE');//场景名称
        $scope.sjmcList = [];//事件名称
        $scope.clztList = $rootScope.getDictionary('MOT_EVENT_STATUS');//处理状态
        $scope.yxjList = $rootScope.getDictionary('EVENT_LEVEL_TYPE');//优先级
        // console.log($scope.yxjList);


        // 所有下拉的数据字典
        $scope.selectListObj = {
            '10' : $scope.khbList,
            '11' : $scope.khgxList,
            '12' : $scope.sbztList,
            '20' : $scope.cjmcList,
            '21' : $scope.sjmcList,
            '22' : $scope.clztList,
        };
        $scope.allEvent = [];//缓存全部事件
        // 搜索条件数据源
        $scope.filterSourceListTemplate = [
            {key:'1',value:'客户信息',isShow:true,children:[{key:'10',value:'客户包',name:'custPackage',isChecked:false,type:'select',selectList:$scope.khbList,'keyValue':['key','value']},
                    {key:'11',value:'客户关系',name:'rltType',isChecked:false,type:'select',selectList:$scope.khgxList,'keyValue':['key','value']},
                    {key:'12',value:'识别状态',name:'sbzt',isChecked:false,type:'select',selectList:$scope.sbztList,'keyValue':['key','value']}]},
            {key:'2',value:'事件信息',isShow:true,children:[{key:'20',value:'场景名称',name:'motScene',isChecked:false,type:'select',selectList:$scope.cjmcList,'keyValue':['key','value']},
                    {key:'21',value:'事件名称',name:'eventId',isChecked:false,type:'searchSelect',searchParam:'',selectList:$scope.sjmcList,'keyValue':['eventId','eventName']},
                    {key:'22',value:'处理状态',name:'dealStatus',isChecked:false,type:'select',selectList:$scope.clztList,'keyValue':['key','value']},
                    {key:'23',value:'触发日期',name:'tgDate',isChecked:false,type:'dateRange'},
                    {key:'24',value:'处理截止日期',name:'endDate',isChecked:false,type:'dateRange'},
                    // {key:'25',value:'处理人营业部',name:'clryyb',isChecked:false,type:'searchSelect',selectList:$scope.selectList,'keyValue':['id','value']},
                    {key:'26',value:'处理/结束时间',name:'dealDate',isChecked:false,type:'dateRange'},]},
        ];
        $scope.filterSourceList = angular.copy($scope.filterSourceListTemplate);// 下方待选择的筛选条件
        $scope.filterList = [];// 上方选中的筛选条件
        // 打开筛选条件时需备份，用于关闭
        $scope.filterSourceListCopy = [];// 下方待选择的筛选条件
        $scope.filterListCopy = [];// 上方选中的筛选条件
        $scope.sjmcListCopy = [];// 事件名称缓存

        // 其他搜索条件----非筛选面板内的
        $scope.searchParams = {
            searchNameNum : $stateParams.custNo?$stateParams.custNo:'',//客户姓名客户号
            branchNo : '',//选择营业部
            memberId : '',//选择处理人
        };
        $scope.eventLevelType = {key:'',value:''};

        // 表格相关
        $scope.dataList = [];//数据
        $scope.dataCheckedList = [];//选中数据
        $scope.columnsConfig = [//表头
            { title: '信息识别状态', sortFlag:true, key: 'sbzt', width: 120, fixed:'left', render:function (data,rowI,colI) {
                var _html = "";
                if(data.sbzt == '0'){// 未识别，蓝
                    _html = "<div style='text-decoration: underline;cursor: pointer;color: #4a52f1;' ng-click='toSbzt("+JSON.stringify(data)+")'>";
                }else if(data.sbzt == '1'){// 已识别，绿
                    _html = "<div style='text-decoration: underline;cursor: pointer;color: #089e30;'>";
                }else{
                    _html = "<div style='text-decoration: underline;cursor: pointer;' ng-click='toSbzt("+JSON.stringify(data)+")'>";
                }
                if(data.sbzt == null || data.sbzt == undefined){
                    _html += "--</div>";
                }else{
                    var isFlag = false;
                    for(var i=0;i<$scope.sbztList.length;i++){
                        if($scope.sbztList[i].key == data.sbzt){
                            _html += $scope.sbztList[i].value+"</div>";
                            isFlag = true;
                        }
                    }
                    if(!isFlag){
                        _html += "--</div>";
                    }
                }

                return _html;
            }},
            { title: '客户号', sortFlag:true, key: 'custNo', width: 130, fixed:'left', render:function (data,rowI,colI) {
                var _html = '';
                var trimCustNo = myCommon.trim(data.custNo);
                if(trimCustNo.length >= 15){
                    _html = "<div>--</div>";
                }else{
                    _html = "<div style='text-decoration: underline;cursor: pointer;' title='"+data.custNo+"' ng-click='toSingleCustomer("+JSON.stringify(data)+")'>"+data.custNo+"</div>";
                }
                return _html;
            }},
            { title: '客户名称', sortFlag:true, key: 'custName', width: 130, fixed:'left', render:function (data,rowI,colI) {
                    var _html = "<div class='mot-cust-td'><span class='mot-cust' ng-click='toSingleCustomer("+JSON.stringify(data)+")'>"+data.custName+"</span>";
                    // var methodList = data.strategyType?data.strategyType.split(','):[];
                    // var phoneFlag = false;
                    // for(var i=0;i<methodList.length;i++){
                    //     if(methodList[i] == '2'){
                    //         phoneFlag = true;
                    //     }
                    // }
                    // if($rootScope.currentStaffInfo.memberId == data.handleStfId && phoneFlag){
                    //     _html += "<i class='mot-phone' title='拨打电话' ng-click='callCustomer("+JSON.stringify(data)+")'></i>"
                    // }

                    _html += "</div>";

                    return _html;
                }},
            { title: '场景', sortFlag:true, key: 'scene', width: 100,  dirList:$scope.cjmcList, dirKeyValue:'key,value'},
            { title: '优先级', sortFlag:true, key: 'eventLevelType', width: 90, render:function (data,rowI,colI) {
                    var _html = "",text='--';
                    for(var i=0;i<$scope.yxjList.length;i++){
                        if($scope.yxjList[i].key == data.eventLevelType){
                            text = $scope.yxjList[i].value;
                            break;
                        }
                    }
                    if(data.eventLevelType == '01'){
                        _html = "<div style='color: #ed4b4a;'>" + text +"</div>";
                    }else{
                        _html = "<div>" + text +"</div>";
                    }
                    return _html;
                }},
            { title: '事件名称', sortFlag:true, key: 'eventName', width: 130, render:function (data,rowI,colI) {
                var _html = "<div title='"+data.eventName+"' style='text-decoration: underline;cursor: pointer;' ng-click='showDetailsData("+JSON.stringify(data)+")'>"+data.eventName+"</div>";
                return _html;
            }},
            { title: '触发日期', sortFlag:true, key: 'tgDate', width: 120, tipFlag:true},
            { title: '处理截止日期', sortFlag:true, key: 'dealDeadLine', width: 120, tipFlag:true},
            { title: '状态', sortFlag:true, key: 'handleStatus', width: 90, render:function (data,rowI,colI) {
                var _html = "",text='--';
                for(var i=0;i<$scope.clztList.length;i++){
                    if($scope.clztList[i].key == data.handleStatus){
                        text = $scope.clztList[i].value;
                        break;
                    }
                }
                if(data.handleStatus == '6'){
                    _html = "<div style='color: #f37e00;'>" + text +"</div>";
                }else if(data.handleStatus == '9'){
                    _html = "<div style='color: #4a52f1;'>" + text +"</div>";
                }else{
                    _html = "<div>" + text +"</div>";
                }
                return _html;
            }},
            { title: '处理人营业部', sortFlag:false, key: 'branchName', width: 180, tipFlag:true},
            { title: '处理人', sortFlag:true, key: 'handleStf', width: 100, tipFlag:true},
            { title: '处理/结束时间', sortFlag:true, key: 'eventStautsUpDate', width: 170, tipFlag:true},
        ];

        /***********************函数区域***********************/

        // 识别状态数据字典
        $scope.getSbztData = function(){
            getDataFactory.fetchData({
                method: "POST",
                url: myCommon.getWebApp(),
                checkType : 2,
                params: {
                    p:{
                        "busiNo": "common.QueryDataDictBo",
                        "type":"sbzt"
                    }
                }
            }).then(function (response) {
                $scope.sbztList = response.resultData.data;
                $scope.selectListObj["12"] = response.resultData.data;
            },function (error) {
                // console.log(error);
            });
        };


        $scope.changeFilterSelect = function(item,getFlag,index,isCallBack){
            var submitObj = {
                "busiNo":"workplatform.WP010110RBo"
            };
            if(!getFlag){
                if(item.key == '20'){//针对场景---事件
                    for(var i=0;i<$scope.filterList.length;i++){
                        if($scope.filterList[i].key == '21' && !isCallBack){
                            $scope.filterList[i].model = '';
                            $scope.filterList[i].modelCopy = '';
                        }
                    }
                    var newEventList = [];
                    if(item.model == '' || !item.model){
                        $scope.sjmcList = angular.copy($scope.allEvent);
                        $scope.selectListObj["21"] = angular.copy($scope.allEvent);
                        // submitObj = {
                        //     "busiNo":"workplatform.WP010110RBo"
                        // };
                    }else{
                        for(var ii=0;ii<$scope.allEvent.length;ii++){
                            if($scope.allEvent[ii].eventType == item.model){
                                newEventList.push(angular.copy($scope.allEvent[ii]));
                            }
                        }
                        $scope.sjmcList = angular.copy(newEventList);
                        $scope.selectListObj["21"] = angular.copy(newEventList);
                        // submitObj = {
                        //     "busiNo":"workplatform.WP010110RBo",
                        //     "motScene" : item.model
                        // };
                    }
                }else if(item.key == '21'){//针对事件---场景
                    var sceneIsChecked = false;
                    for(var j=0;j<$scope.filterList.length;j++){
                        if($scope.filterList[j].key == '20'){
                            sceneIsChecked = true;
                        }
                    }
                    var sceneBe = false;
                    for(var nn=0;nn<$scope.selectListObj["21"].length;nn++){// 找到事件对应的场景
                        if($scope.selectListObj["21"][nn].eventId == item.model){
                            for(var mm=0;mm<$scope.cjmcList.length;mm++){
                                if($scope.cjmcList[mm].key == $scope.selectListObj["21"][nn].eventType){
                                    sceneBe = $scope.selectListObj["21"][nn].eventType;
                                    break;
                                }
                            }
                            break;
                        }
                    }
                    if(sceneBe){// 如果存在对应场景
                        if(!sceneIsChecked){// 如果场景没有勾选
                            for(var ii=0;ii<$scope.filterSourceList.length;ii++){
                                for(var jj=0;jj<$scope.filterSourceList[ii].children.length;jj++){
                                    if($scope.filterSourceList[ii].children[jj].key == '20'){
                                        $scope.filterSourceList[ii].children[jj].isChecked = true;
                                        var cloneItem = angular.copy($scope.filterSourceList[ii].children[jj]);
                                        cloneItem.model = sceneBe;
                                        cloneItem.modelCopy = sceneBe;
                                        $scope.filterList.splice(index,0,cloneItem);
                                        $scope.changeFilterSelect(cloneItem,false,null,true);
                                    }
                                }
                            }
                        }else{//如果场景已经勾选
                            for(var ww=0;ww<$scope.filterList.length;ww++){
                                if($scope.filterList[ww].key == '20'){
                                    $scope.filterList[ww].model = sceneBe;
                                    $scope.filterList[ww].modelCopy = sceneBe;
                                    $scope.changeFilterSelect($scope.filterList[ww],false,null,true);
                                }
                            }
                        }


                    }

                }
            }else{
                getDataFactory.fetchData({
                    method: "POST",
                    url: myCommon.getWebApp(),
                    checkType : 2,
                    params: {
                        "p" : submitObj
                    }
                }).then(function (response) {
                    $scope.sjmcList = response.resultData.data;
                    $scope.selectListObj["21"] = response.resultData.data;
                    if(getFlag){
                        $scope.allEvent = response.resultData.data;//缓存全部事件
                    }
                },function (error) {
                    // console.log(error);
                });
            }
        };

        //去到处理历史
        $scope.toMotHistory = function () {
            addMotEventCountly('打开处理历史页面_按钮');//埋点
            window.top.openTab('../crm-ng/index.html#/motHistory','MOT处理历史','40000903','20000905');
        };
        //发起识别状态
        $scope.toSbzt = function(rowData){
            if(rowData.sbzt == '0' || rowData.sbzt == '5'){
                window.top.openTab(rowData.sbztUrl,'发起信息识别','sbzt_'+rowData.custNo,'');
            }else{
                return;
            }
        };
        //单客标签
        $scope.toSingleCustomer = function(rowData){
            addMotEventCountly('客户档案_按钮');//埋点
            window.top.openTab('/ccweb/custFile/openCustFileWin.action?custNo=' + rowData.custNo,'客户档案','khda_'+rowData.custNo,'');
        };
        // 列表操作--打电话
        $scope.callCustomer = function (rowData) {
            addMotEventCountly('电话回访_按钮');//埋点
            getDataFactory.fetchData({
                method: "POST",
                url: myCommon.getWebApp(),
                params: {
                    "p": {
                        "busiNo":"workplatform.WP010108RBo",
                        "custId" : rowData.custNo,//客户编号/客户姓名
                    }
                }
            }).then(function (response) {
                var result = response.resultData.data;
                var prefix = window.location.protocol+"//"+window.location.host;
                if(result){
                    if(result.MOBILE){
                        window.top.openTab(prefix+'/kfweb/myCustomer/initYuyinVisitInsert.action?basic='+result.MOBILE+'&custNo='+rowData.custNo+'&branchCode='+rowData.branchNo,'语音回拨','yy_'+rowData.custNo,'');
                    }else{
                        ngToast.create({
                            content : response.resultData.errorDesc,
                            timeout:4000,
                            className : 'warning'
                        });
                        return false;
                    }
                }else{
                    ngToast.create({
                        content : response.resultData.errorDesc,
                        timeout:2000,
                        className : 'warning'
                    });
                    return false;
                }

            },function (error) {
                // console.log(error);
            });
        };
        // 选择优先级
        $scope.eventLevelTypeFilter = function(item){
            if(item.key == $scope.eventLevelType.key){
                return;
            }
            addMotEventCountly('优先级筛选_按钮');//埋点
            $scope.eventLevelType = item;
            $scope.initPageParams();
            $scope.getDataAction();
        };

        // 初始化表格相关参数
        $scope.initPageParams = function() {
            $scope.selectPageSize = "20";//当前一页显示条数 （供展示、修改用）
            $scope.currentPageNum = 1;//当前页页码 （仅供计算入参用，不展示）
            $scope.responseTotalSize = "";//返回数据的条数

            $scope.isOrderBy = "";//排序字段
            $scope.sortDirection = 'DESC';//排序方向
        };

        // http请求获取列表数据
        $scope.getDataAction = function () {
            $scope.dataList = [];//数据
            $scope.dataCheckedList = [];//选中数据
            var paramsObj = {
                "busiNo":"workplatform.WP010101RBo",
                "limit": $scope.selectPageSize,//分页大小
                "start": ($scope.currentPageNum - 1) * parseInt($scope.selectPageSize),//查询页
                "sortField": $scope.isOrderBy,//排序字段
                "sortDirection": $scope.sortDirection,//排序方向
                "searchStr":$scope.searchParams.searchNameNum,//客户编号/客户姓名
                "branchNo":$scope.searchParams.branchNo,//营业部编号
                "memberId":$scope.searchParams.memberId,//客户经理
                "eventLevelType":$scope.eventLevelType.key,//优先级

                "custPackage":"",//客户包
                "rltType":"",//客户关系类型
                "sbzt":"",//识别状态
                "motScene":"",//场景
                "eventId":"",//事件编号
                "dealStatus":"",//处理状态
                "tgDateFrom":"",//处理日期
                "tgDateTo":"",//处理日期
                "endDate":"",//截止日期
                "endDateTo":"",//截止日期
                "dealDateFrom":"",//处置日期
                "dealDateTo":"",//处置日期
            };
            if($scope.filterList){
                for(var i=0;i<$scope.filterList.length;i++){
                    switch($scope.filterList[i].name){
                        case 'tgDate':
                            paramsObj.tgDateFrom = $scope.filterList[i].model[0].toString().replace(/-/g,'');
                            paramsObj.tgDateTo = $scope.filterList[i].model[1].toString().replace(/-/g,'');
                            break;
                        case 'endDate':
                            paramsObj.endDate = $scope.filterList[i].model[0].toString().replace(/-/g,'');
                            paramsObj.endDateTo = $scope.filterList[i].model[1].toString().replace(/-/g,'');
                            break;
                        case 'dealDate':
                            paramsObj.dealDateFrom = $scope.filterList[i].model[0].toString().replace(/-/g,'');
                            paramsObj.dealDateTo = $scope.filterList[i].model[1].toString().replace(/-/g,'');
                            break;
                        default:
                            paramsObj[$scope.filterList[i].name] = $scope.filterList[i].model;
                            break;
                    }
                }
            }

            getDataFactory.fetchData({
                method: "POST",
                url: myCommon.getWebApp(),
                params: {
                    "p": paramsObj
                }
            }).then(function (response) {
                $scope.dataList = response.resultData.data;
                $scope.responseTotalSize = response.resultData.totalCount;
            },function (error) {
                // console.log(error);
            });
            // $scope.$emit('isLoading',true);
            // $timeout(function () {
            //     $scope.dataList = [
            //         {p1:'已识别',p2:'1234567891',p3:'张三',p4:'新客培育',p5:'需处理',p6:'下单后未成交',p7:'2018-11-20',p8:'2018-12-25',p9:'未处理',p10:'长沙黄兴路',p11:'李密'},
            //         {p1:'已识别',p2:'1234567891',p3:'张三',p4:'新客培育',p5:'需处理',p6:'下单后未成交',p7:'2018-11-20',p8:'2018-12-25',p9:'未处理',p10:'长沙黄兴路',p11:'李密'},
            //         {p1:'已识别',p2:'1234567891',p3:'张三',p4:'新客培育',p5:'需处理',p6:'下单后未成交',p7:'2018-11-20',p8:'2018-12-25',p9:'未处理',p10:'长沙黄兴路',p11:'李密'},
            //         {p1:'已识别',p2:'1234567891',p3:'张三',p4:'新客培育',p5:'需处理',p6:'下单后未成交',p7:'2018-11-20',p8:'2018-12-25',p9:'未处理',p10:'长沙黄兴路',p11:'李密'},
            //         {p1:'已识别',p2:'1234567891',p3:'张三',p4:'新客培育',p5:'需处理',p6:'下单后未成交',p7:'2018-11-20',p8:'2018-12-25',p9:'未处理',p10:'长沙黄兴路',p11:'李密'},
            //         {p1:'已识别',p2:'1234567891',p3:'张三',p4:'新客培育',p5:'需处理',p6:'下单后未成交',p7:'2018-11-20',p8:'2018-12-25',p9:'未处理',p10:'长沙黄兴路',p11:'李密'},
            //         {p1:'已识别',p2:'1234567891',p3:'张三',p4:'新客培育',p5:'需处理',p6:'下单后未成交',p7:'2018-11-20',p8:'2018-12-25',p9:'未处理',p10:'长沙黄兴路',p11:'李密'},
            //         {p1:'已识别',p2:'1234567891',p3:'张三',p4:'新客培育',p5:'需处理',p6:'下单后未成交',p7:'2018-11-20',p8:'2018-12-25',p9:'未处理',p10:'长沙黄兴路',p11:'李密'},
            //         {p1:'已识别',p2:'1234567891',p3:'张三',p4:'新客培育',p5:'需处理',p6:'下单后未成交',p7:'2018-11-20',p8:'2018-12-25',p9:'未处理',p10:'长沙黄兴路',p11:'李密'},
            //         {p1:'已识别',p2:'1234567891',p3:'张三',p4:'新客培育',p5:'需处理',p6:'下单后未成交',p7:'2018-11-20',p8:'2018-12-25',p9:'未处理',p10:'长沙黄兴路',p11:'李密'},
            //         {p1:'已识别',p2:'1234567891',p3:'张三',p4:'新客培育',p5:'需处理',p6:'下单后未成交',p7:'2018-11-20',p8:'2018-12-25',p9:'未处理',p10:'长沙黄兴路',p11:'李密'},
            //         {p1:'已识别',p2:'1234567891',p3:'张三',p4:'新客培育',p5:'需处理',p6:'下单后未成交',p7:'2018-11-20',p8:'2018-12-25',p9:'未处理',p10:'长沙黄兴路',p11:'李密'}
            //     ];//数据
            //     $scope.responseTotalSize = 101;//返回数据的条数
            //     $scope.$emit('isLoading',false);
            // },500);
        };


        // 点击除筛选框外区域，隐藏筛选框
        $scope.otherAreaClosePanel = function(e){
            var _con = angular.element('.panel-close-ignore');   // 设置目标区域
            if(!_con.is(e.target) && _con.has(e.target).length === 0){
                if($scope.showPanel){
                    $scope.filterSourceList = angular.copy($scope.filterSourceListCopy);// 下方待选择的筛选条件
                    $scope.filterList = angular.copy($scope.filterListCopy);// 上方选中的筛选条件
                    angular.element('.filter-panel-container').css({'overflow':'hidden'});
                    $scope.showPanel = false;// 是否显示筛选条件
                }
            }
        };
        // 关闭筛选框
        $scope.closePanel = function(){
            if($scope.showPanel) {
                $scope.selectListObj["21"] = angular.copy($scope.sjmcListCopy);// 事件名称缓存
                $scope.sjmcList = angular.copy($scope.sjmcListCopy);// 事件名称缓存
                $scope.filterSourceList = angular.copy($scope.filterSourceListCopy);// 下方待选择的筛选条件
                $scope.filterList = angular.copy($scope.filterListCopy);// 上方选中的筛选条件
                angular.element('.filter-panel-container').css({'overflow': 'hidden'});
                $scope.showPanel = false;
            }
        };
        // 打开筛选框
        $scope.openPanel = function(){
            $scope.sjmcListCopy = angular.copy($scope.sjmcList);// 事件名称缓存
            $scope.filterSourceListCopy = angular.copy($scope.filterSourceList);// 下方待选择的筛选条件
            $scope.filterListCopy = angular.copy($scope.filterList);// 上方选中的筛选条件
            $timeout(function () {
                $scope.topHeight = angular.element('.filter-panel-wrap .filter-top-box').height();
                angular.element('.filter-panel-container').css({'overflow':'unset'});
            },100);
            $scope.showPanel=true;
        };
        // 滚动到顶部操作
        $scope.sectionToTop = function(){
            angular.element('.filter-bottom-box').animate({scrollTop: '0px'}, 200);
        };
        // 复选框操作 筛选项
        $scope.checkFilterItemAction = function(item){
            var isChecked = false;
            for(var i=0;i<$scope.filterList.length;i++){
                if($scope.filterList[i].key == item.key){
                    isChecked = true;
                    break;
                }
            }
            if(isChecked){
                console.log(i);
                $scope.filterList.splice(i,1);
                // // 判断如果是场景，则将事件列表恢复全部事件
                if(item.key == '20'){
                    for(var m=0;m<$scope.filterList.length;m++){
                        if($scope.filterList[m].key == '21'){
                            $scope.filterList[m].model = '';
                            $scope.filterList[m].modelCopy = '';
                        }
                    }
                    // for(var ii=0;ii<$scope.filterSourceList.length;ii++){
                    //     for(var jj=0;jj<$scope.filterSourceList[ii].children.length;jj++){
                    //         if($scope.filterSourceList[ii].children[jj].key == '21'){
                    //             $scope.filterSourceList[ii].children[jj].isChecked = false;
                    //         }
                    //     }
                    // }
                    $scope.sjmcList = angular.copy($scope.allEvent);
                    $scope.selectListObj["21"] = angular.copy($scope.allEvent);
                }
            }else{
                // // 判断勾选的是否是事件，如果是事件，需要自动勾选场景
                // if(item.key == '21'){
                //     var sceneIsChecked = false;
                //     for(var j=0;j<$scope.filterList.length;j++){
                //         if($scope.filterList[j].key == '20'){
                //             sceneIsChecked = true;
                //         }
                //     }
                //     if(!sceneIsChecked){
                //         for(var ii=0;ii<$scope.filterSourceList.length;ii++){
                //             for(var jj=0;jj<$scope.filterSourceList[ii].children.length;jj++){
                //                 if($scope.filterSourceList[ii].children[jj].key == '20'){
                //                     $scope.checkFilterItemAction($scope.filterSourceList[ii].children[jj]);
                //                 }
                //             }
                //         }
                //         ngToast.create({
                //             className: 'warning',
                //             timeout:2000,
                //             content: '请先勾选场景！'
                //         });
                //         item.isChecked = false;
                //         return;
                //     }
                // }
                // // 判断勾选的是否是场景，如果是场景，需要将事件列表初始化
                // if(item.key == '20'){
                //     $scope.sjmcList = angular.copy($scope.allEvent);
                //     $scope.selectListObj["21"] = angular.copy($scope.allEvent);
                // }
                var cloneItem = angular.copy(item);
                switch(item.type){
                    case 'dateRange':
                        cloneItem.model = ['',''];
                        cloneItem.modelCopy = ['',''];
                        break;
                    case 'multiSelect':
                        cloneItem.model = [];
                        cloneItem.modelCopy = [];
                        break;
                    default:
                        cloneItem.model = '';
                        cloneItem.modelCopy = '';
                }
                $scope.filterList.push(cloneItem);
            }
        };
        // 移除按钮操作 筛选项
        $scope.removeFilterItemAction = function(index,item,needRefresh){
            $scope.filterList.splice(index,1);
            // 判断如果是场景，则将事件列表恢复全部事件
            if(item.key == '20'){
                for(var m=0;m<$scope.filterList.length;m++){
                    if($scope.filterList[m].key == '21'){
                        $scope.filterList[m].model = '';
                        $scope.filterList[m].modelCopy = '';
                    }
                }
                $scope.sjmcList = angular.copy($scope.allEvent);
                $scope.selectListObj["21"] = angular.copy($scope.allEvent);
            }
            if(needRefresh){
                $scope.initPageParams();//初始化分页
                $scope.getDataAction();
            }
            for(var i=0;i<$scope.filterSourceList.length;i++){
                for(var j=0;j<$scope.filterSourceList[i].children.length;j++){
                    if($scope.filterSourceList[i].children[j].key == item.key){
                        $scope.filterSourceList[i].children[j].isChecked = false;
                        return;
                    }
                    // if($scope.filterSourceList[i].children[j].key == '21' && item.key == '20'){
                    //     $scope.filterSourceList[i].children[j].isChecked = false;
                    // }
                }
            }
        };
        // 保存
        $scope.submitFilter = function(){
            addMotEventCountly('保存筛选_按钮');//埋点
            console.log($scope.filterList);
            $scope.initPageParams();//初始化分页
            $scope.getDataAction();//获取数据
            $scope.showPanel = false;// 是否显示筛选条件
        };
        // 重置
        $scope.resetFilter = function(){
            addMotEventCountly('重置筛选_按钮');//埋点
            $scope.filterSourceList = angular.copy($scope.filterSourceListTemplate);// 下方待选择的筛选条件
            $scope.filterList = [];// 上方选中的筛选条件
        };
        // 筛选条件调整----针对输入框、日期选择框、多选下拉
        $scope.confirmFilterChange = function(item){
            switch(item.type){
                case 'dateRange':
                    item.model = angular.copy(item.modelCopy);
                    item.modelCopy = ['',''];
                    break;
                case 'multiSelect':
                    item.model = angular.copy(item.modelCopy);
                    break;
                default:
                    item.model = angular.copy(item.modelCopy);
                    item.modelCopy = '';
            }
            $scope.initPageParams();//初始化分页
            $scope.getDataAction();//获取数据
        };
        // 筛选条件调整----针对下拉框
        $scope.confirmFilterSelect = function(item,key){
            item.model = angular.copy(key);
            if(item.key == '20'){
                $scope.changeFilterSelect(item);
            }
            $scope.initPageParams();//初始化分页
            $scope.getDataAction();//获取数据
        };
        // 筛选条件调整---针对多选下拉
        $scope.multiSelectAction = function(item,key,event){
            event.stopPropagation();
            var modelList = item.model;
            var modelCopyList = item.modelCopy;
            console.log(item.modelCopy);
            for(var i=0;i<modelCopyList.length;i++){
                if(modelCopyList[i] == key){
                    modelCopyList.splice(i,1);
                    return;
                }
            }
            modelCopyList.push(key);
        };
        // 初始化备份
        $scope.initMultiSelect = function(item){
            item.modelCopy = angular.copy(item.model);
        };
        // 判断元素处于数组之中
        $scope.isInArray = function(arr,value){
            for(var i = 0; i < arr.length; i++){
                if(value == arr[i]){
                    return true;
                }
            }
            return false;
        };

        //建议操作
        $scope.suggestAction = function () {
            addMotEventCountly('建议_按钮');//埋点
            $scope.currentItem = $scope.dataCheckedList[0];//处理弹框 处理说明
            var ip;
            var prefix = window.location.protocol+"//"+window.location.host;
            if(prefix=="http://cas.foundersc.com"){//预发布
                ip = 'http://ask.preview-bj.fzzqxf.com/ask'
            }else if(prefix=="http://crm.foundersc.com"){//生产
                ip = "http://crm.foundersc.com/ask";
            }else{//测试
                ip = 'http://28.163.1.26:8090'
            }
            var catalogue = '/founder-askw/ask/index.html';
            // debug
            // ip = 'http://localhost:63342';
            // catalogue = '/FounderIntelligentService/project/index.html';

            var memberId = $rootScope.currentStaffInfo.memberId;
            var orgId = $rootScope.currentStaffInfo.orgId;
            var roleIds = $rootScope.currentStaffInfo.roleIds;
            var memberName = encodeURI($rootScope.currentStaffInfo.memberName);
            var resourceId = '20000905';
            // 针对mot的事件添加两个入参
            var eventName = encodeURI($scope.currentItem.eventName);
            var eventFlowId = $scope.currentItem.eventFlowId;

            window.open(ip+catalogue+'?memberId='+memberId+'&memberName='+memberName+'&orgId='+orgId+'&resourceId=crm_'+resourceId+'&roleId='+roleIds+'&system=1'+'&eventName='+eventName+'&eventFlowId='+eventFlowId, "newwindow","width=800,height=630,left="+(screen.availWidth-800)/2+",top="+ (screen.availHeight-630)/2+",location=no,menubar=no,resizable=yes,scrollbars=yes,status=no,toolbar=no");
        };

        // 处理操作
        $scope.openDealModal = function(){
            addMotEventCountly('操作_按钮');//埋点
            if($scope.dataCheckedList.length == 0 || $scope.dataCheckedList.length > 1){
                ngToast.create({
                    className: 'warning',
                    timeout:2000,
                    content: '请勾选一个进行操作！'
                });
                return;
            }
            if($scope.dataCheckedList[0].handleStatus != '1' && $scope.dataCheckedList[0].handleStatus != '5' && $scope.dataCheckedList[0].handleStatus != '4' && $scope.dataCheckedList[0].handleStatus != '2' && $scope.dataCheckedList[0].handleStatus != '3'){
                ngToast.create({
                    className: 'warning',
                    timeout: 2000,
                    content: '<div>对不起，您已选的事件状态不支持操作！</div><div class="text-red">注：状态为待处理、需关注、可忽略、处理中、处理失败的事件可进行操作！</div>'
                });
                return;
            }
            getDetailsData($scope.dataCheckedList[0]);
        };
        $scope.showDetailsData = function(dataObj){
            addMotEventCountly('事件_按钮');//埋点
            getDetailsData(dataObj);
        };
        // 获取处理详情
        function getDetailsData(dataObj){
            window.top.openTab('../crm-ng/index.html#/motDealModal?eventFlowId='+dataObj.eventFlowId,'为'+dataObj.custName+'服务中...','motDetails_'+dataObj.eventFlowId,'20000905');
        }

        // 忽略操作
        $scope.ignoreAction = function () {
            addMotEventCountly('忽略_按钮');//埋点
            if($scope.dataCheckedList.length == 0 && !$scope.pageCkFlag){//如果没有选择，进行拦截
                return;
            }
            $scope.canIgnoreList = [];
            for(var i=0;i<$scope.dataCheckedList.length;i++){
                if($scope.dataCheckedList[i].handleStatus == '3' && $rootScope.currentStaffInfo.memberId == $scope.dataCheckedList[i].handleStfId){//可忽略
                    $scope.canIgnoreList.push($scope.dataCheckedList[i].eventFlowId);
                }
            }

            var canIgnoreCount = $scope.canIgnoreList.length;
            var totalCount = $scope.dataCheckedList.length;
            if(canIgnoreCount != 0){
                dialog({
                    title: '提示',
                    content: '已选中'+totalCount+'条事件，确定要批<br/>量忽略'+canIgnoreCount+'条事件？',
                    fixed:true,
                    zIndex:1500,
                    button: [{
                        value: '取消'
                    },{
                        value: '确认',
                        autofocus: true,
                        callback: function () {
                            ignoreSubmit($scope.canIgnoreList);
                        }
                    }]
                }).show().showModal();
            }else{
                ngToast.create({
                    content : '对不起，您已选的记录中没有可忽略记录！',
                    timeout : 2000,
                    className : 'warning'
                });
                return;
            }
        };
        // 忽略确认操作
        function ignoreSubmit(idList) {
            getDataFactory.fetchData({
                method: "POST",
                url: myCommon.getWebApp(),
                params: {
                    "p": {
                        "busiNo":"workplatform.WP010102UBo",
                        "idList" : idList,//事件流水ID
                    }
                }
            }).then(function (response) {
                ngToast.create({
                    content : response.resultData.returnDesc,
                    timeout : 2000,
                    className : 'success'
                });
                $scope.getDataAction();
            },function (error) {
                // console.log(error);
            });
        }

        // 导出操作
        $scope.exportExcelAction =  function () {
            addMotEventCountly('导出_按钮');//埋点
            if($scope.responseTotalSize == 0){
                ngToast.warning('当前查询结果无可导出数据');
                return;
            }
            if($scope.responseTotalSize > 2000){
                dialog({
                    title: '提示',
                    content: '当前查询结果数据量过大，最多可导出前2000条数据，确定导出？',
                    fixed:true,
                    zIndex:1500,
                    button: [{
                        value: '取消'
                    },{
                        value: '确认',
                        autofocus: true,
                        callback: function () {
                            ouputSubmit();
                        }
                    }]
                }).show().showModal();
            }else{
                ouputSubmit();
            }

        };
        function ouputSubmit() {
            var paramsObj = {
                // "busiNo":"workplatform.WP010101RBo",
                "limit": 2000,//分页大小
                "start": 0,//查询页
                "sortField": $scope.isOrderBy,//排序字段
                "sortDirection": $scope.sortDirection,//排序方向
                "searchStr":$scope.searchParams.searchNameNum,//客户编号/客户姓名
                "branchNo":$scope.searchParams.branchNo,//营业部编号
                "memberId":$scope.searchParams.memberId,//客户经理
                "eventLevelType":$scope.eventLevelType.key,//优先级

                "custPackage":"",//客户包
                "rltType":"",//客户关系类型
                "sbzt":"",//识别状态
                "motScene":"",//场景
                "eventId":"",//事件编号
                "dealStatus":"",//处理状态
                "tgDateFrom":"",//处理日期
                "tgDateTo":"",//处理日期
                "endDate":"",//截止日期
                "endDateTo":"",//截止日期
                "dealDateFrom":"",//处置日期
                "dealDateTo":"",//处置日期
            };
            if($scope.filterList){
                for(var i=0;i<$scope.filterList.length;i++){
                    switch($scope.filterList[i].name){
                        case 'tgDate':
                            paramsObj.tgDateFrom = $scope.filterList[i].model[0].toString().replace(/-/g,'');
                            paramsObj.tgDateTo = $scope.filterList[i].model[1].toString().replace(/-/g,'');
                            break;
                        case 'endDate':
                            paramsObj.endDate = $scope.filterList[i].model[0].toString().replace(/-/g,'');
                            paramsObj.endDateTo = $scope.filterList[i].model[1].toString().replace(/-/g,'');
                            break;
                        case 'dealDate':
                            paramsObj.dealDateFrom = $scope.filterList[i].model[0].toString().replace(/-/g,'');
                            paramsObj.dealDateTo = $scope.filterList[i].model[1].toString().replace(/-/g,'');
                            break;
                        default:
                            paramsObj[$scope.filterList[i].name] = $scope.filterList[i].model;
                            break;
                    }
                }
            }
            var outputJson = outPutSetting("MOT机会中心导出",$scope.columnsConfig,paramsObj,"workplatform.WP010101RBo",{
                "sbzt":{"irDDType":"sbzt","irType":4},//识别状态
                "scene":{"irDDType":"MOT_SCENE","irType":4},//场景
                "eventLevelType":{"irDDType":"EVENT_LEVEL_TYPE","irType":4},//优先级
                "handleStatus":{"irDDType":"MOT_EVENT_STATUS","irType":4},//处理状态
            });
            window.top.L.submit("../export",true,{p:JSON.stringify(outputJson)},true,true);
        }
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
                "exportP":{"maxRecode":2000,"exportType":1},
                "excelColRenderer":excelColRenderer
            };
            return returnJson;
        }

        // 分组订阅
        $scope.dingyueAction = function () {
            addMotEventCountly('分组订阅_按钮');//埋点
            window.top.openTab(myCommon.getWebHttp()+'/syweb/toListPageFromMenu.action?menuURL='+myCommon.getWebHttp()+'/ccweb/ccmySerCust/initCustomerListNew.action?permissionId=-1&domainName='+myCommon.getWebHttp()+'/ccweb','多客户查询','400030012','20000905');
        };

        // 批量电话
        $scope.batchCallAction = function () {
            var currentCustNo = $scope.dataCheckedList[0].custNo;
            for(var i=0;i<$scope.dataCheckedList.length;i++){
                if($rootScope.currentStaffInfo.memberId != $scope.dataCheckedList[i].handleStfId){
                    ngToast.warning('对不起，您选择的第'+Number(i+1)+'条数据没有处理权限！');
                    return;
                }
                if($scope.dataCheckedList[i].custNo != currentCustNo){
                    ngToast.warning('请选择同一个客户拨打批量电话！');
                    return;
                }
                var strategyTypeList = $scope.dataCheckedList[i].strategyType?$scope.dataCheckedList[i].strategyType.split(','):[];
                if(strategyTypeList.indexOf('2') == -1){
                    ngToast.warning('请选择支持电话处理的事件！');
                    return;
                }
            }
            ngToast.success('拨打电话！');
        };

        // 批量短信
        $scope.batchMessageAction = function () {
            if($scope.dataCheckedList.length > 0){
                var currentEvent = $scope.dataCheckedList[0].eventId;
                var custNoList = [];
                for(var i=0;i<$scope.dataCheckedList.length;i++){
                    if($rootScope.currentStaffInfo.memberId != $scope.dataCheckedList[i].handleStfId){
                        ngToast.warning('对不起，您选择的第'+Number(i+1)+'条数据没有处理权限！');
                        return;
                    }
                    if($scope.dataCheckedList[i].eventId != currentEvent){
                        ngToast.warning('请选择同一个事件发送批量短信！');
                        return;
                    }
                    var strategyTypeList = $scope.dataCheckedList[i].strategyType?$scope.dataCheckedList[i].strategyType.split(','):[];
                    if(strategyTypeList.indexOf('1') == -1){
                        ngToast.warning('请选择支持短信处理的事件！');
                        return;
                    }
                    custNoList.push($scope.dataCheckedList[i].custNo);
                }
                window.top.openTab('../crm-ng/index.html#/batchMessageModal?eventId='+currentEvent+'&custNoList='+custNoList.join(','),'批量短信','batchMessage_'+currentEvent,'20000905',true);

            }else{
                window.top.openTab('../crm-ng/index.html#/batchMessageModal','批量短信','batchMessage','20000905');

            }
        };

        // 获取人员
        $scope.getMemberList = function(){
            getDataFactory.fetchData({
                method: "POST",
                url: myCommon.getWebApp(),
                checkType : 2,
                params: {
                    "p": {
                        "busiNo":"common.QueryLMemBo",
                        "flag" : 1,
                        "orgId" : $scope.searchParams.branchNo,//部门编号
                        "stfType" : ''//人员岗位类别
                    }
                }
            }).then(function (response) {
                $scope.memberList = response.resultData.data;
            },function (error) {
                // console.log(error);
            });
        };
        //获取营业部
        $scope.getBranchList = function(){
            getDataFactory.fetchData({
                method: "POST",
                url: myCommon.getWebApp(),
                checkType : 2,
                params: {
                    "p": {
                        "busiNo":"common.QueryOrgBo",
                        "permission" : '',//是否需要权限控制
                        "branchNo" : $scope.searchParams.branchNo,//部门编号
                        "orgType" : '',//部门类型
                        'noZbFlag' : 1
                    }
                }
            }).then(function (response) {
                $scope.branchList = response.resultData.data;
                if($scope.authority != 'isZb'){
                    $scope.getMemberList();
                }
            },function (error) {
                // console.log(error);
            });
        };

        // 切换营业部
        $scope.changeBranch = function(){
            addMotEventCountly('选择营业部_选择框');//埋点
            $scope.searchParams.memberId = "";
            if($scope.searchParams.branchNo != ''){
                $scope.getMemberList();
            }
            $scope.initPageParams();//初始化表格、分页相关参数
            $scope.getDataAction();
        };
        // 切换人员
        $scope.changeMember = function(){
            addMotEventCountly('选择处理人_选择框');//埋点
            $scope.initPageParams();//初始化表格、分页相关参数
            $scope.getDataAction();
        };

        //获取权限
        $scope.getStaffAuthority = function () {
            getDataFactory.fetchData({
                url : myCommon.getWebApp(),
                method : "POST",
                params : {
                    "p": {
                        "busiNo": 'workplatform.WP010107RBo',//业务功能bo
                        "memberId":$rootScope.currentStaffInfo.memberId
                    }
                },
            }).then(function (response) {
                var result = response.resultData.data;
                if(result.isZb == '1'){
                    $scope.authority = 'isZb';
                }else if(result.isYyb == '1'){
                    $scope.authority = 'isYyb';
                }else{
                    $scope.authority = 'isRy';
                }

                // 权限判断
                if($scope.authority == 'isZb'){//如果是总部就重置掉branchNo
                    $scope.searchParams.branchNo = '';
                    $scope.searchParams.memberId = '';
                }else if($scope.authority == 'isYyb'){//如果是营业部就重置掉登陆人的memberId
                    $scope.searchParams.branchNo = $rootScope.currentStaffInfo.orgId;
                    $scope.searchParams.memberId = '';
                }else{
                    $scope.searchParams.branchNo = $rootScope.currentStaffInfo.orgId;
                    $scope.searchParams.memberId = $rootScope.currentStaffInfo.memberId;
                }
                $scope.initPageParams();//初始化表格、分页相关参数
                $scope.getDataAction();//获取数据
                $scope.getBranchList();
            },function (error) {
                // console.log(error);
            });
        };


        $scope.afterCallMobile = function (eventFlowId) {
            getDataFactory.fetchData({
                method: "POST",
                url: myCommon.getWebApp(),
                params: {
                    "p": {
                        "busiNo":"workplatform.WP010103UBo",
                        "eventFlowId" : eventFlowId,//事件流水ID
                    }
                }
            }).then(function (response) {
                ngToast.create({
                    content : response.resultData.returnDesc,
                    timeout : 2000,
                    className : 'success'
                });
                $scope.getDataAction();
            },function (error) {
                // console.log(error);
            });
        };

        /***********************初始化区域*********************/

        function checkWidth(){
            var tableWidth = 40;
            for(var i=0;i<$scope.columnsConfig.length;i++){
                tableWidth += Number($scope.columnsConfig[i].width);
            }
            if(tableWidth < $scope.windowWidth-60){
                $scope.columnsConfig[0].fixed = false;
                $scope.columnsConfig[1].fixed = false;
                $scope.columnsConfig[2].fixed = false;
            }else{
                $scope.columnsConfig[0].fixed = 'left';
                $scope.columnsConfig[1].fixed = 'left';
                $scope.columnsConfig[2].fixed = 'left';
            }
        }

        $scope.init = function () {
            $scope.ouputAuthority = false;

            var roleIds = $rootScope.currentStaffInfo.roleIds?$rootScope.currentStaffInfo.roleIds:'';
            var roleIdsList = roleIds.split(',');
            // 11:营业部营销分管领导   12:营业部客服分管领导   36880:总部管理员-服务营销   32080:MOT总部管理员  1:营业部总经理  9999：admin
            if(roleIdsList.indexOf('11') != -1 || roleIdsList.indexOf('12') != -1 || roleIdsList.indexOf('36880') != -1 || roleIdsList.indexOf('32080') != -1 || roleIdsList.indexOf('1') != -1 || roleIdsList.indexOf('9999') != -1){
                $scope.ouputAuthority = true;
            }


            $scope.getSbztData();//获取识别状态
            $scope.changeFilterSelect(null,true);//获取事件
            $scope.getStaffAuthority();// 权限获取
            checkWidth();
        };
        $scope.init();

        /***********************监控区域**********************/

        // 监听窗口大小变化
        $scope.$on('windowResize',function (e,d) {
            if(d){
                $scope.topHeight = angular.element('.filter-panel-wrap .filter-top-box').height();
                checkWidth();
            }
        });
        // 监听勾选的筛选条件
        $scope.$watch('filterList.length',function (nV,oV) {
            if(nV != oV){
                $scope.validateForm.reset();
                angular.element('.filter-panel-container').css({'overflow':'hidden'});
                $timeout(function () {
                    $scope.topHeight = angular.element('.filter-panel-wrap .filter-top-box').height();
                    angular.element('.filter-panel-container').css({'overflow':'unset'});
                },100);
            }
        },true);

        //监听搜索条件
        $scope.$watch('searchParams.searchNameNum',function(nV,oV){
            if(nV != oV){
                addMotEventCountly('搜索客户_输入框');//埋点
                $scope.initPageParams();//初始化表格、分页相关参数
                $scope.getDataAction();//获取数据
            }
        });


        // 埋点方法
        function addMotEventCountly(name) {
            countlyClickEvent("340088",'默认事件列表_'+name,"CRM_MOT平台_场景化展业");//mot埋点
            // console.log("340088",'默认事件列表_'+name,"CRM_MOT平台_场景化展业");//mot埋点
        }

    }]);