/**
 * @Author WangZe (wangze@linkstec.com)
 * @Date 2018/11/27 14:05
 * @Function
 **/
crmApp.controller("motDealModalController",["$scope","$rootScope","$state","$http","$location","$timeout","getDataFactory","ngToast","$stateParams",
    function ($scope,$rootScope,$state,$http,$location,$timeout,getDataFactory,ngToast,$stateParams){

        /***********************变量区域***********************/
        // $scope.dealTabList = [{key:'phone',value:'打电话'},{key:'message',value:'发短信'},{key:'form',value:'填表单'},{key:'mark',value:'填备注'}];
        $scope.dealTabList = [];
        $scope.todayDate = $rootScope.currentStaffInfo.currDate;
        $scope.hasPower = false;
        $scope.getDataFromBo = {};// 获取到的详情信息
        $scope.showCustNo = '';
        $scope.appendInfoList = [];// 事件相关
        // 打电话部分
        $scope.mobileContentList = [];//话术列表
        $scope.staffMobileList = [];// 员工主叫号码
        $scope.customerMobile = '';// 客户电话
        $scope.mobileCheckFlag = false;// 是否选择客户电话，，，标识
        // 发短信部分
        $scope.messageContentList = [];//短信模版列表
        // 备注部分
        $scope.markContent = '';
        $scope.hasMarkPower = false;

        /***********************函数区域***********************/

        // 切换tab
        $scope.changDealTab = function (item) {
            addMotEventCountly('切换处理方式_按钮');//埋点
            if($scope.currentDealTab= item.key){
                return;
            }
            $scope.currentDealTab = item.key;
        };

        // 关闭弹框
        $scope.closeDealModal = function(){
            addMotEventCountly('关闭_按钮');//埋点
            window.top.postMessage({'flag':false,'refresh':'no'},window.location.protocol+"//"+window.location.host);
        };

        // 格式化appendInfo
        $scope.formatterAppendInfo = function(){
            if($scope.getDataFromBo.appendInformation){
                var list = $scope.getDataFromBo.appendInformation.split(';');
                var afterList = [];
                for(var i=0;i<list.length;i++){
                    afterList[i] = {
                        name : list[i].split('=')[0],
                        value : list[i].split('=')[1]
                    }
                }
                $scope.appendInfoList = angular.copy(afterList);
            }
        };
        // 格式化content
        $scope.formatterContent = function(){
            var content = JSON.parse($scope.getDataFromBo.stratetyTmplt);
            // var content = {
            //         "1" : [
            //             { "id" : "11","content" : "啊啊啊" },
            //             { "id" : "21", "content" : "改改改" }
            //         ],
            //         "2" : [
            //             { "id" : "1", "content" : "啊啊啊啊" },
            //             { "id" : "2","content" : "呃呃呃额" }
            //         ]
            //     };
            $scope.mobileContentList = content['2']?angular.copy(content['2']) : [];//话术列表
            $scope.messageContentList = content['1']?angular.copy(content['1']) : [];//短信模版列表
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
            addMotEventCountly('发送短信_按钮');//埋点
            var contents = '';
            var flag = '1';
            for(var i=0;i<$scope.messageContentList.length;i++){
                if($scope.messageContentList[i].isChecked){
                    contents = $scope.messageContentList[i].content;
                    if($scope.messageContentList[i].name == '-1'){
                        flag = '2';
                    }
                }
            }
            if(myCommon.trim(contents).length == 0){
                ngToast.create({
                    className: 'warning',
                    timeout:2000,
                    content: '请填写模版内容'
                });
                return;
            }
            var paramsObj = {
                "busiNo":"workplatform.WP010112CBo",
                "mobileTel" : $scope.customerMobile,
                "eventTrgTime" : $scope.todayDate,
                "infoContents" : contents,
                "flag" : flag,
            };
            for(var i in $scope.getDataFromBo){
                if(i == 'eventFlowId' || i == 'custNo' || i == 'custName' || i == 'eventId' || i == 'eventName' || i== 'handleStatus'){
                    paramsObj[i] = angular.copy($scope.getDataFromBo[i]);
                }
            }//eventFlowId、custNo、custName、mobileTel、eventId、eventName、eventTrgTime、infoContents

            getDataFactory.fetchData({
                method: "POST",
                url: myCommon.getWebApp(),
                checkType : 2,
                params: {
                    "p": paramsObj
                }
            }).then(function (response) {
                ngToast.create({
                    className: 'success',
                    timeout:2000,
                    content: response.resultData.returnDesc
                });
                $scope.init();
                window.top.postMessage({'flag':'motBoard'},window.location.protocol+"//"+window.location.host);
            },function (error) {
                // console.log(error);
            });
        };

        // 切换主叫电话
        $scope.changeMobileCheck = function(item,index){
            var checkedFlag = angular.copy(item.isChecked);
            for(var i=0;i<$scope.staffMobileList.length;i++){
                $scope.staffMobileList[i].isChecked = false;
            }
            $scope.staffMobileList[index].isChecked = angular.copy(checkedFlag);
        };
        // 拨打电话
        $scope.submitCall = function () {
            addMotEventCountly('拨打电话_按钮');//埋点
            window.top.openTab(window.location.protocol+"//"+window.location.host+'/kfweb/myCustomer/initYuyinVisitInsert.action?basic='+$scope.customerMobile+'&custNo='+$scope.getDataFromBo.custNo+'&branchCode='+$scope.getDataFromBo.branchNo+'&eventFlowId='+$stateParams.eventFlowId,'语音回拨','yy_'+$scope.getDataFromBo.custNo,'');
        };

        // 获取客户电话
        function getCustomerMobile() {
            getDataFactory.fetchData({
                method: "POST",
                url: myCommon.getWebApp(),
                checkType : 2,
                params: {
                    "p": {
                        "busiNo":"workplatform.WP010108RBo",
                        "custId" : $scope.getDataFromBo.custNo
                    }
                }
            }).then(function (response) {
                var result = response.resultData.data;
                $scope.customerMobile = result.MOBILE;
            },function (error) {
                // console.log(error);
            });
        }
        // 获取主叫
        function getStaffMobile(){
            getDataFactory.fetchData({
                method: "POST",
                url: myCommon.getWebApp(),
                checkType : 2,
                params: {
                    "p": {
                        "busiNo":"workplatform.WP010113RBo"
                    }
                }
            }).then(function (response) {
                $scope.staffMobileList = response.resultData.data;
            },function (error) {
                // console.log(error);
            });
        }

        // 保存备注
        $scope.saveMark = function () {
            var content = $scope.markContent;
            var re = /[\u4E00-\u9FA5]/g; //测试中文字符的正则
            if (myCommon.trim(content).length == 0) {
                ngToast.create({
                    className: 'warning',
                    timeout: 2000,
                    content: '备注不能少于4个汉字'
                });
                return;
            }

            if (re.test(content)){//使用正则判断是否存在中文
                if (content.match(re).length < 4) { //返回中文的个数
                    ngToast.create({
                        className: 'warning',
                        timeout: 2000,
                        content: '备注不能少于4个汉字'
                    });
                    return;
                }
            }else {
                ngToast.create({
                    className: 'warning',
                    timeout: 2000,
                    content: '备注不能少于4个汉字'
                });
                return;
            }

            getDataFactory.fetchData({
                method: "POST",
                url: myCommon.getWebApp(),
                checkType : 2,
                params: {
                    "p": {
                        "busiNo":"workplatform.WP010115UBo",
                        "eventFlowId" : $stateParams.eventFlowId,
                        "remarkDo" : content,
                    }
                }
            }).then(function (response) {
                ngToast.create({
                    className: 'success',
                    timeout:2000,
                    content: response.resultData.returnDesc
                });
                $scope.init();
                window.top.postMessage({'flag':'motBoard'},window.location.protocol+"//"+window.location.host);
            },function (error) {
                // console.log(error);
            });

        };


        /***********************初始化区域*********************/

        $scope.init = function(){
            $scope.todayDate = $rootScope.currentStaffInfo.currDate;
            // 打电话部分
            $scope.mobileCheckFlag = false;// 是否选择客户电话，，，标识
            // 备注部分
            $scope.markContent = '';
            $scope.hasMarkPower = false;

            getDataFactory.fetchData({
                method: "POST",
                url: myCommon.getWebApp(),
                checkType : 2,
                params: {
                    "p": {
                        "busiNo":"workplatform.WP010111RBo",
                        "eventFlowId" : $stateParams.eventFlowId
                    }
                }
            }).then(function (response) {
                $scope.getDataFromBo = response.resultData.data[0]?response.resultData.data[0]:{};
                var getCustNoFromBo = $scope.getDataFromBo.custNo?$scope.getDataFromBo.custNo:"--";
                var trimCustNo = myCommon.trim(getCustNoFromBo);
                if(trimCustNo.length >= 15){
                    $scope.showCustNo = '--';
                }else{
                    $scope.showCustNo = trimCustNo;
                }
                // 电话、短信权限
                var hasPower = '0';
                if($rootScope.currentStaffInfo.memberId == $scope.getDataFromBo.handleStfId){
                    hasPower = '1';
                }
                if($scope.getDataFromBo.handleStatus != '1' && $scope.getDataFromBo.handleStatus != '5' && $scope.getDataFromBo.handleStatus != '4' && $scope.getDataFromBo.handleStatus != '2' && $scope.getDataFromBo.handleStatus != '3'){
                    hasPower = '0';
                }
                // 备注权限
                if($scope.getDataFromBo.handleStatus != '5'){
                    $scope.hasMarkPower = false;
                    $scope.markContent = $scope.getDataFromBo.remarkDo?$scope.getDataFromBo.remarkDo:"暂无备注";
                }else{
                    $scope.hasMarkPower = true;
                    $scope.markContent = $scope.getDataFromBo.remarkDo?$scope.getDataFromBo.remarkDo:"";
                }
                $scope.hasPower = hasPower=='1'?true:false;

                getCustomerMobile();// 获取客户号码
                // getStaffMobile();// 获取主叫号码

                // 处理方式
                $scope.dealTabList = [];
                var methodList = $scope.getDataFromBo.dealMethod.split(',');
                for(var i=0;i<methodList.length;i++){
                    if(methodList[i] == '2'){
                        $scope.dealTabList.push({key:'phone',value:'打电话'});
                    }else if(methodList[i] == '1'){
                        $scope.dealTabList.push({key:'message',value:'发短信'});
                    }else if(methodList[i] == '3'){
                        $scope.dealTabList.push({key:'mark',value:'备注'});
                    }else{

                    }
                }
                if($scope.dealTabList.length>0){
                    $scope.currentDealTab = $scope.dealTabList[0].key;
                }
                $scope.formatterAppendInfo();//处理appendInfo
                $scope.formatterContent();//处理内容

            },function (error) {
                // console.log(error);
            });
        };
        $scope.init();

        /***********************监控区域**********************/

        // 埋点方法
        function addMotEventCountly(name) {
            countlyClickEvent("340088",'事件详情_'+name,"CRM_MOT平台_场景化展业");//mot埋点
            // console.log("340088",'操作页面_'+name,"CRM_MOT平台_场景化展业");//mot埋点
        }

    }]);
