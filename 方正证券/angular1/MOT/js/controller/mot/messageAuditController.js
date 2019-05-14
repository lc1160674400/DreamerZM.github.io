/**
 * 
 * @authors weizf (weizf@linkstec.com)
 * @date    2018-11-21 10:54:00
 * @function 请描述
 */

crmApp.controller("messageAuditController",["$scope","$rootScope","$state","$http","$location","$timeout","getDataFactory","ngToast","getDirectoryData","w5cValidator",
    function ($scope,$rootScope,$state,$http,$location,$timeout,getDataFactory,ngToast,getDirectoryData,w5cValidator){

    /***********************变量区域***********************/

        $scope.showPanel = false;// 是否显示筛选条件
        $scope.filterParams = {//筛选条件
            custNo : null,    //客户编号
            auditStatus : null,   //审核状态
            eventId : null,   //事件编号
            branchNo : null,  //营业部门编号
            auditMemberName :null,    //处理人
            eventTrgTimeTo : null,    //结束时间
            eventTrgTimeFrom :null,  //开始时间
            motScene:null,//MOT场景
        };
        $scope.motSceneList = [];//选择场景
        $scope.eventList = [];//事件列表
        $scope.branchList=[];//营业部列表
        $scope.msgAuditDataList = [];//数据
        $scope.msgAuditStatusDirList = [];//审核状态数据字典
        $scope.strategyDirList=[];//发送渠道数据字典
        $scope.eventTrgTimeFromFormat=null;//开始时间格式转换
        $scope.eventTrgTimeToFormat=null;//结束时间格式转换
        $scope.msgIdList=[];//选择的数据列表
        $scope.auditRemark=[];//备注消息
        //表头
        $scope.msgAuditColumnsConfig = [
            { title: '事件名称', sortFlag:false, key: 'eventName',fixed:'left', width: 120, tipFlag:true},
            { title: '客户号', sortFlag:false, key: 'custNo',fixed:'left', width: 130, tipFlag:true},
            { title: '客户名称', sortFlag:false, key: 'custName',fixed:'left', width: 130, tipFlag:true},
            { title: '触发时间', sortFlag:false, key: 'eventTrgTime', width: 160, tipFlag:true},
            { title: '发送渠道', sortFlag:false, key: 'sendChannel', width: 80, render:function(data){
                var flag=0;
                for(var  i= 0;i<$scope.strategyDirList.length;i++){
                    if($scope.strategyDirList[i].key==data.sendChannel){
                        flag=1;
                        return $scope.strategyDirList[i].value;
                    }
                }
                if(flag==0){return '-';}
                }},
            { title: '发送内容', sortFlag:false, key: 'sendContent', width: 240, tipFlag:true},
            { title: '手机号', sortFlag:false, key: 'mobileTel', width: 120, tipFlag:true},
            { title: '处理人', sortFlag:false, key: 'auditMemberName', width: 120, tipFlag:true},
            { title: '处理人营业部', sortFlag:false, key: 'branchName', width: 180, tipFlag:true},
            { title: '审核状态', sortFlag:false, key: 'auditStatus', width: 90,render:function(data){
                if(data.auditStatus==1){
                    return $scope.msgAuditStatusDirList[0].value;
                    }
                else if(data.auditStatus==2){
                    return "<span style='color:#31BC6B'>"+$scope.msgAuditStatusDirList[1].value+"</span>";
                }
                else if(data.auditStatus==3){
                    if(data.auditRemark == null || data.auditRemark == undefined || data.auditRemark == ''){
                        return "<span style='color:#ED4B4A'>"+$scope.msgAuditStatusDirList[2].value+"</span>";
                    }else{
                        return "<span style='color:#ED4B4A' title='"+data.auditRemark+"'>"+$scope.msgAuditStatusDirList[2].value+"</span>";
                    }
                }
                else{return '-';}

                }
            },
        ];

    /***********************函数区域***********************/

        // 初始化相关参数
        $scope.initPageParams = function() {
            $scope.selectPageSize = "20";//当前一页显示条数 （供展示、修改用）
            $scope.currentPageNum = 1;//当前页页码 （仅供计算入参用，不展示）
            $scope.responseTotalSize = "";//返回数据的条数
            $scope.isOrderBy = "";//排序字段
            $scope.sortDirection = 'DESC';//排序方向

        };

        // http请求获取列表数据
        $scope.getMsgAuditDataAction = function () {
           
            getDataFactory.fetchData({
                method: "POST",
                url: myCommon.getWebApp(),
                params: {
                    "p": {
                        "busiNo":"msgaudit.MA010101RBo",
                        custNo:myCommon.isEmpty($scope.filterParams.custNo)?null:$scope.filterParams.custNo,   //客户姓名
                        auditStatus: myCommon.isEmpty($scope.filterParams.auditStatus)?null:$scope.filterParams.auditStatus,   //审核状态
                        motScene:myCommon.isEmpty($scope.filterParams.motScene)?null:$scope.filterParams.motScene,  //场景id
                        eventId:myCommon.isEmpty($scope.filterParams.eventId)?null:$scope.filterParams.eventId,      //事件ID
                        eventTrgTimeFrom:myCommon.isEmpty($scope.eventTrgTimeFromFormat)?null:$scope.eventTrgTimeFromFormat.toString().replace(/\//g,''), //开始时间
                        eventTrgTimeTo:myCommon.isEmpty($scope.eventTrgTimeToFormat)?null:$scope.eventTrgTimeToFormat.toString().replace(/\//g,''), //结束时间
                        auditMemberName:myCommon.isEmpty($scope.filterParams.auditMemberName)?null:$scope.filterParams.auditMemberName, //处理人
                        branchNo:myCommon.isEmpty($scope.filterParams.branchNo)?null:$scope.filterParams.branchNo, //营业部id
                        "start":($scope.currentPageNum - 1) * parseInt($scope.selectPageSize),//查询页,
                        "limit":$scope.selectPageSize
                    }
                }
            }).then(function (response) {
                $scope.msgAuditDataList=response.resultData.data;
                $scope.responseTotalSize=response.resultData.totalCount;
            },function (error) {
                // console.log(error);
            });
        };


        //页面初始化
        $scope.init = function () {
            $scope.initPageParams();//初始化表格、分页相关参数            
            getStrategyDirList();
            getAuditStatusDirList();
            getBranchDataAction();
            getEventDataAction();
            getSceneList();
            $scope.getMsgAuditDataAction();//获取数据

        };

        // 获取审核状态的数据字典
        function getAuditStatusDirList(){
            getDataFactory.fetchData({
                method: "POST",
                url: myCommon.getWebApp(),
                params:{
                  p:{
                    "busiNo": "msgaudit.MA010104RBo",
                    "type":"MSG_AUDIT_STATUS"
                  }
                }
              }).then(function(response) {  
                $scope.msgAuditStatusDirList = response.resultData.data;
              },function(data){  
              //error函数  
              })  
        }

        // 获取发送渠道的数据字典
        function getStrategyDirList(){
            getDataFactory.fetchData({
                method: "POST",
                url: myCommon.getWebApp(),
                params:{
                  p:{
                    "busiNo": "msgaudit.MA010104RBo",
                    "type":"CRM_STRATEGY"
                  }
                }
              }).then(function(response) {  
                $scope.strategyDirList = response.resultData.data;
              },function(data){  
              //error函数  
              })  
        }
       
        //获取营业部数据
        function getBranchDataAction() {
            getDataFactory.fetchData({
                method: "POST",
                url: myCommon.getWebApp(),
                params: {
                    "p": {
                        "busiNo":"msgaudit.MA010105RBo",
                    }
                }
            }).then(function (response) {
                $scope.branchList=response.resultData.data;
            },function (error) {
            });
        };

        //获取事件
        function getEventDataAction () {
            getDataFactory.fetchData({
                method: "POST",
                url: myCommon.getWebApp(),
                params: {
                    "p": {
                        "busiNo":"msgaudit.MA010103RBo",
                        "motScene":$scope.filterParams.motScene,
                    }
                }
            }).then(function (response) {
                $scope.eventList=response.resultData.data;
            },function (error) {
            });
        };
        
        //获取场景数据
        function getSceneList(){
            getDataFactory.fetchData({
                method: "POST",
                url: myCommon.getWebApp(),
                params: {
                    "p": {
                        "busiNo":"msgaudit.MA010104RBo",
                        "type":"MOT_SCENE"
                    }
                }
            }).then(function (response) {
                $scope.motSceneList=response.resultData.data;
            },function (error) {
            });
        }
      
        //审核通过
        $scope.auditPass=function(){
            addMotEventCountly('审核通过_按钮');//埋点
        if($scope.msgIdList.length!=0){
            dialog({
            title: '提示',
            content: '确认提交吗？',
            fixed:true,
            zIndex:1500,
            okValue: '确定',
            ok: function () {
                addMotEventCountly('审核通过_确认_按钮');//埋点
            var msgIds=getMsgIds();
            getDataFactory.fetchData({
                method: "POST",
                url: myCommon.getWebApp(),
                params:{
                  p:{
                    "busiNo": "msgaudit.MA010102UBo",
                    "msgIds":msgIds,
                    "auditRemark":"",
                    "auditStatus":2
                  }
                }
              }).then(function(response) {  
                ngToast.success("消息发送成功");
                $scope.getMsgAuditDataAction();
              },function(data){  
                ngToast.danger("消息发送失败");  
              }) 
            },
            cancelValue: '取消',
            cancel: function () {
                addMotEventCountly('审核通过_取消_按钮');//埋点
            }
            }).show().showModal();
        }else{
            ngToast.warning("请选择要审核的短信");
        }

        }

        //审核不通过
        $scope.auditDeny=function(){
            addMotEventCountly('审核不通过_按钮');//埋点
            if($scope.msgIdList.length!=0){
            var msgIds=getMsgIds();
            angular.element('#messageAuditDenyModal').modal({backdrop: 'static', keyboard: false}).on('shown.bs.modal', function () {      
            });
            $scope.$broadcast('messageAuditDeny',msgIds);
            }else{
                ngToast.warning("请选择要审核的短信");
            }
        }

        //导出excel
        $scope.exportExcel=function(){
            addMotEventCountly('导出EXCEL_按钮');//埋点
            var outputJson = outPutSetting("审核记录导出",$scope.msgAuditColumnsConfig,{
                "custNo":myCommon.isEmpty($scope.filterParams.custNo)?null:$scope.filterParams.custNo,   //客户姓名
                "auditStatus": myCommon.isEmpty($scope.filterParams.auditStatus)?null:$scope.filterParams.auditStatus,   //审核状态
                "motScene":myCommon.isEmpty($scope.filterParams.motScene)?null:$scope.filterParams.motScene,  //场景id
                "eventId":myCommon.isEmpty($scope.filterParams.eventId)?null:$scope.filterParams.eventId,      //事件ID
                "eventTrgTimeFrom":myCommon.isEmpty($scope.eventTrgTimeFromFormat)?null:$scope.eventTrgTimeFromFormat, //开始时间
                "eventTrgTimeTo":myCommon.isEmpty($scope.eventTrgTimeToFormat)?null:$scope.eventTrgTimeToFormat, //结束时间
                "auditMemberName":myCommon.isEmpty($scope.filterParams.auditMemberName)?null:$scope.filterParams.auditMemberName, //处理人
                "branchNo":myCommon.isEmpty($scope.filterParams.branchNo)?null:$scope.filterParams.branchNo, //营业部id
            },"msgaudit.MA010101RBo",{
                "auditStatus":{"irDDType":"MSG_AUDIT_STATUS","irType":4},
                "sendChannel":{"irDDType":"CRM_STRATEGY","irType":4},
            });
            window.parent.L.submit("../export",true,{p:JSON.stringify(outputJson)},true,true);
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
                "exportP":{"maxRecode":60000,"exportType":1},
                "excelColRenderer":excelColRenderer
            };
            return returnJson;
        } 

        //提取ID集合
        function getMsgIds(){
            var checkedIds=[];
            for (var i=0;i<$scope.msgIdList.length;i++){
                checkedIds[i]=$scope.msgIdList[i].msgId;
            }
            return checkedIds;

        }

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

        // 保存
        $scope.submitFilter = function(){
            addMotEventCountly('保存筛选_按钮');//埋点
            //console.log($scope.filterParams);
            //更改日期形式
            $scope.eventTrgTimeToFormat = $scope.filterParams.eventTrgTimeTo?$scope.filterParams.eventTrgTimeTo.replace(/\-/g, ""):null;
            $scope.eventTrgTimeFromFormat = $scope.filterParams.eventTrgTimeFrom?$scope.filterParams.eventTrgTimeFrom.replace(/\-/g, ""):null;
            $scope.initPageParams();//初始化分页
            $scope.getMsgAuditDataAction();//获取数据
            $scope.showPanel = false;// 是否显示筛选条件
        };
        
        // 重置
        $scope.resetFilter = function(){
            addMotEventCountly('重置筛选_按钮');//埋点
            $scope.filterParams = {
                eventId : null,   //事件编号
                branchNo : null,  //营业部门编号
                auditMemberName :null,    //处理人
                eventTrgTimeTo : "",    //结束时间
                eventTrgTimeFrom :"",  //开始时间
                motScene:null,//MOT场景
            };
        };

    /***********************初始化区域*********************/

        function checkWidth(){
            var tableWidth = 40;
            for(var i=0;i<$scope.msgAuditColumnsConfig.length;i++){
                tableWidth += Number($scope.msgAuditColumnsConfig[i].width);
            }
            if(tableWidth < $scope.windowWidth-60){
                $scope.msgAuditColumnsConfig[0].fixed = false;
                $scope.msgAuditColumnsConfig[1].fixed = false;
                $scope.msgAuditColumnsConfig[2].fixed = false;
            }else{
                $scope.msgAuditColumnsConfig[0].fixed = 'left';
                $scope.msgAuditColumnsConfig[1].fixed = 'left';
                $scope.msgAuditColumnsConfig[2].fixed = 'left';
            }
        }

        checkWidth();
        $scope.init();


    /***********************监控区域**********************/

        //监听审核状态选择
        $scope.$watch("filterParams.auditStatus",function (nV,oV) {
            if(nV != oV) {
                addMotEventCountly('选择审核状态_选择框');//埋点
                $scope.initPageParams();
                $scope.getMsgAuditDataAction();
            }
        });

        // 监听输入框内容
        $scope.$watch("filterParams.custNo",function (nV,oV) {
            if(nV != oV) {
                addMotEventCountly('搜索客户_输入框');//埋点
                $scope.initPageParams();
                $scope.getMsgAuditDataAction();
            }
        });
        
        //监听选择场景，更改事件
        $scope.$watch("filterParams.motScene",function (nv,ov) {
            getEventDataAction();
        });

        //监听审核不通过是否成功
        $scope.$on('messageAuditDenied',function(e,data){
            if(data.isOk==1){
                $scope.getMsgAuditDataAction();
            }
        });

        // 监听窗口大小变化
        $scope.$on('windowResize',function (e,d) {
            if(d){
                checkWidth();
            }
        });


        // 埋点方法
        function addMotEventCountly(name) {
            countlyClickEvent("340092",'MOT短信审核_'+name,"CRM_服务营销_MOT短信审核");//mot埋点
            // console.log("340088",'默认事件列表_'+name,"CRM_MOT平台_场景化展业");//mot埋点
        }
}]);