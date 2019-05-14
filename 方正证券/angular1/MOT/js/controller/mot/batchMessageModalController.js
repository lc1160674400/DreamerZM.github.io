/**
 * @Author WangZe (wangze@linkstec.com)
 * @Date 2018/11/27 14:05
 * @Function
 **/
crmApp.controller("batchMessageModalController",["$scope","$rootScope","$state","$http","$location","$timeout","getDataFactory","ngToast","$stateParams",
    function ($scope,$rootScope,$state,$http,$location,$timeout,getDataFactory,ngToast,$stateParams){

        /***********************变量区域***********************/

        $scope.todayDate = $rootScope.currentStaffInfo.currDate;

        $scope.chooseEventId = '';//默认选中的事件
        $scope.eventList = [];//事件列表

        $scope.custList = [];//客户列表
        $scope.custCheckList = [];//选择的客户
        $scope.defaultCustNoList = [];//默认选中的客户号集合

        // 发短信部分
        $scope.messageContentList = [];//短信模版列表

        /***********************函数区域***********************/

        // 关闭弹框
        $scope.closeDealModal = function(){
            addMotEventCountly('关闭_按钮');//埋点
            window.top.postMessage({'flag':false,'refresh':'no'},window.location.protocol+"//"+window.location.host);
        };

        // 切换选择事件
        $scope.changeEvent = function (isFirst) {
            if($scope.chooseEventId == ''){
                $scope.custList = [];
                $scope.custCheckList = [];//选择的客户
                $scope.messageContentList = [];
                return;
            }
            getDataFactory.fetchData({
                method: "POST",
                url: myCommon.getWebApp(),
                checkType : 2,
                params: {
                    "p": {
                        "busiNo": "workplatform.WP010117RBo",
                        "eventId": $scope.chooseEventId,
                        "memberId": $rootScope.currentStaffInfo.memberId
                    }
                }
            }).then(function (response) {

                $scope.custList = response.resultData.data;
                $scope.custCheckList = [];//选择的客户

                if(isFirst && $stateParams.custNoList && $stateParams.custNoList!=''){//跳转过来的
                    $scope.defaultCustNoList = $stateParams.custNoList.split(',');//默认选中的客户号集合
                    for(var i=0;i<$scope.custList.length;i++){
                        $scope.custCheckList[i] = false;
                        for(var q=0;q<$scope.defaultCustNoList.length;q++){
                            if($scope.custList[i].custNo == $scope.defaultCustNoList[q]){
                                $scope.custCheckList[i] = true;
                                break;
                            }
                        }
                    }
                }else{
                    for(var i=0;i<$scope.custList.length;i++){
                        $scope.custCheckList[i] = true;
                    }
                }

                $scope.formatterContent();

            },function (error) {
                // console.log(error);
            });

        };
        
        // 选择客户
        $scope.changeCustCheck = function (item,index) {
            
        };
        
        // 格式化content
        $scope.formatterContent = function(){
            $scope.messageContentList = [];
            for(var i=0;i<$scope.eventList.length;i++){
                if($scope.eventList[i].eventId == $scope.chooseEventId){
                    var msgModal = $scope.eventList[i].msgModl?$scope.eventList[i].msgModl:{};
                    $scope.messageContentList = msgModal['1']?angular.copy(msgModal['1']) : [];//短信模版列表
                    break;
                }
            }

            $scope.messageContentList.push({
                name:'-1',
                content:''
            });
        };
        // 切换模版
        $scope.changeTemplateCheck = function(item,index){
            var checkedFlag = angular.copy(item.isChecked);
            for(var i=0;i<$scope.messageContentList.length;i++){
                $scope.messageContentList[i].isChecked = false;
            }
            $scope.messageContentList[index].isChecked = checkedFlag;
            if(!$scope.messageContentList[$scope.messageContentList.length-1].isChecked){
                $scope.messageContentList[$scope.messageContentList.length-1].content = '';
            }
        };
        // 短信发送
        $scope.sendMessage = function(){
            console.log($scope.custCheckList);
            addMotEventCountly('发送短信_按钮');//埋点
            var contents = '';
            var flag = '1';
            var msgName = '';
            for(var i=0;i<$scope.messageContentList.length;i++){
                if($scope.messageContentList[i].isChecked){
                    contents = $scope.messageContentList[i].content;
                    msgName = $scope.messageContentList[i].name;
                    if($scope.messageContentList[i].name == '-1'){
                        flag = '2';
                    }
                }
            }
            if($scope.chooseEventId == ''){
                ngToast.create({
                    className: 'warning',
                    timeout:2000,
                    content: '请先选择事件'
                });
                return;
            }
            if($scope.custList.length == 0){
                ngToast.create({
                    className: 'warning',
                    timeout:2000,
                    content: '该事件暂无可发送短信的客户'
                });
                return;
            }
            if(myCommon.trim(contents).length == 0){
                ngToast.create({
                    className: 'warning',
                    timeout:2000,
                    content: '请填写模版内容'
                });
                return;
            }

            // 客户信息、模板
            var chosenCustList = [];
            for(var i=0;i<$scope.custCheckList.length;i++){
                if($scope.custCheckList[i]){
                    var chosenObj = {};
                    for(var j in $scope.custList[i]){
                        if(j == 'eventFlowId' || j== 'eventFlowIds' || j == 'custNo' || j == 'custName' || j == 'eventId' || j == 'eventName' || j== 'handleStatus') {
                            chosenObj[j] = angular.copy($scope.custList[i][j]);
                        }
                    }
                    // if(msgName == '-1'){
                    //     chosenObj.infoContents = angular.copy(contents);
                    // }else{
                    //     var msgModal = $scope.custList[i].msgModl?$scope.custList[i].msgModl:{};
                    //     var contentsList = msgModal['1']?msgModal['1']:[];
                    //     for(var k=0;k<contentsList.length;k++){
                    //         if(contentsList[k].name == msgName){
                    //             chosenObj.infoContents = angular.copy(contentsList[k].content);
                    //         }
                    //     }
                    // }
                    chosenCustList.push(angular.copy(chosenObj));
                }
            }

            if(chosenCustList.length == 0){
                ngToast.create({
                    className: 'warning',
                    timeout:2000,
                    content: '请选择客户后发送'
                });
                return;
            }

            var paramsObj = {
                "busiNo":"workplatform.WP010118CBo",
                "eventTrgTime" : $scope.todayDate,
                "msgSendInfo" : chosenCustList,
                "infoContents" : contents,
                "flag" : flag,
            };

            getDataFactory.fetchData({
                method: "POST",
                url: myCommon.getWebApp(),
                checkType : 2,
                params: {
                    "p": JSON.stringify(paramsObj)
                }
            }).then(function (response) {
                ngToast.create({
                    className: 'success',
                    timeout:2000,
                    content: response.resultData.returnDesc
                });
                resetAll();
                window.top.postMessage({'flag':'motBoard'},window.location.protocol+"//"+window.location.host);
            },function (error) {
                // console.log(error);
            });
        };

        // 获取事件列表
        function getMsgEventList() {
            getDataFactory.fetchData({
                method: "POST",
                url: myCommon.getWebApp(),
                checkType : 2,
                params: {
                    "p": {
                        "busiNo": "workplatform.WP010116RBo",
                        "memberId": $rootScope.currentStaffInfo.memberId
                    }
                }
            }).then(function (response) {

                $scope.eventList = response.resultData.data;

                if($stateParams.eventId && $stateParams.eventId!=''){
                    $scope.chooseEventId = $stateParams.eventId;
                    $scope.changeEvent(true);

                }

            },function (error) {
                // console.log(error);
            });
        }

        function resetAll(){
            getDataFactory.fetchData({
                method: "POST",
                url: myCommon.getWebApp(),
                checkType : 2,
                params: {
                    "p": {
                        "busiNo": "workplatform.WP010116RBo",
                        "memberId": $rootScope.currentStaffInfo.memberId
                    }
                }
            }).then(function (response) {

                $scope.eventList = response.resultData.data;
                var flag = false;
                for(var i=0;i<$scope.eventList.length;i++){
                    if($scope.eventList[i].eventId = $scope.chooseEventId){
                        $scope.changeEvent();
                        flag = true;
                        break;
                    }
                }
                if(!flag){
                    $scope.chooseEventId = '';
                    $scope.custList = [];//客户列表
                    $scope.custCheckList = [];//选择的客户
                    $scope.messageContentList = [];//短信模版列表
                }
            },function (error) {
                // console.log(error);
            });
        }

        /***********************初始化区域*********************/

        $scope.init = function(){

            getMsgEventList();// 获取事件列表
            $scope.todayDate = $rootScope.currentStaffInfo.currDate;

        };
        $scope.init();

        /***********************监控区域**********************/

        // 埋点方法
        function addMotEventCountly(name) {
            countlyClickEvent("340088",'批量短信_'+name,"CRM_MOT平台_场景化展业");//mot埋点
            // console.log("340088",'操作页面_'+name,"CRM_MOT平台_场景化展业");//mot埋点
        }

    }]);
