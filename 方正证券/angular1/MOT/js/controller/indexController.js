/**
 * @Author WangZe (wangze@linkstec.com)
 * @Date 2018/2/26 10:21
 * @Function 首页控制器
 **/
crmApp.controller('indexController',['$scope','$state','$location',function($scope,$state,$location){

    /*************************参数区域**********************************************/
    $scope.isLoading = false;

    /*************************函数区域*********************************************/

    $scope.load = function(){
        calWindowSize();
    };

    function calWindowSize(){
        if(self!= top){
            $scope.windowHeight = angular.element(window.frameElement).height();
            $scope.windowWidth = angular.element(window.frameElement).width();
        }else{
            $scope.windowHeight = angular.element(window).height();
            $scope.windowWidth = angular.element(window).width();
        }

    }

    /*************************初始化区域********************************************/

    calWindowSize();

    window.onresize = function () {
        calWindowSize();
        $scope.$broadcast('windowResize',true);
    };

    /*************************监听区域*********************************************/
     

     $scope.$on("miniData1",function(e,m){
		$scope.$broadcast("miniData",m)
     });
    

    $scope.$on('isLoading', function(event,flag) {
         $scope.isLoading = flag;
     });





}]);



