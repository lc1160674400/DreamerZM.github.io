/**
 * 
 * @authors weizf (weizf@linkstec.com)
 * @date    2018-11-21 15:33:46
 * @function 请描述
 */

crmApp.controller('messageAuditDenyController',['$scope','$timeout','getDataFactory','getDirectoryData','w5cValidator','ngToast',function($scope,$timeout,getDataFactory,getDirectoryData,w5cValidator,ngToast){


	/***********************变量区域***********************/
    $scope.auditRemark="";	//备注   	
    var msgIds=[];
	/***********************函数区域***********************/
	
		//关闭页面
		$scope.dismissRole=function(){
            addMotEventCountly('审核不通过_取消_按钮');//埋点
			angular.element("#messageAuditDenyModal").modal("hide");
		}
        //审核不通过
        $scope.auditDenyFunc=function(){
            addMotEventCountly('审核不通过_提交_按钮');//埋点
                getDataFactory.fetchData({
                    method: "POST",
                    url: myCommon.getWebApp(),
                    params:{
                      p:{
                        "busiNo": "msgaudit.MA010102UBo",
                        "msgIds":msgIds,
                        "auditRemark":$scope.auditRemark,
                        "auditStatus":3
                      }
                    }
                  }).then(function(response) {  
                    ngToast.success("提交成功");
                    $scope.dismissRole();
                    $scope.$emit('messageAuditDenied',{isOk:1});
                  },function(data){  
                    ngToast.danger("提交失败");  
                    $scope.dismissRole();
                    $scope.$emit('messageAuditDenied',{isOk:0});
                  })  
            }
        
        //初始化
        function initMsgListParam(){
            $scope.auditRemark="";             
        }
        

	/***********************初始化区域*********************/

		initMsgListParam();

	/***********************监控区域**********************/

		$scope.$on('messageAuditDeny',function(e,data){

            initMsgListParam();
		    msgIds = data;
		})

        // 埋点方法
        function addMotEventCountly(name) {
            countlyClickEvent("340092",'MOT短信审核_'+name,"CRM_服务营销_MOT短信审核");//mot埋点
            // console.log("340088",'默认事件列表_'+name,"CRM_MOT平台_场景化展业");//mot埋点
        }
}]);
