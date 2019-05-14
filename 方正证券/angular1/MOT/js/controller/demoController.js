/**
 * @Author WangZe (wangze@linkstec.com)
 * @Date 2018/11/20 11:05
 * @Function
 **/
crmApp.controller("demoController",["$scope","$rootScope","$state","$http","$location","$timeout","getDataFactory","ngToast",
    function ($scope,$rootScope,$state,$http,$location,$timeout,getDataFactory,ngToast){

    /***********************变量区域***********************/

    $scope.selectList = [];//下拉模拟数据
    for(var i=0;i<400;i++){
        $scope.selectList[i] = {key:i,value:'选项'+i}
    }

    $scope.filterParams = {//筛选条件
        input : '',
        select : '',
        dateStart : '',
        dataEnd : '',
    };

    $scope.dataList = [];//数据
    $scope.dataCheckedList = [];//选中数据
    //表头
    $scope.columnsConfig = [
        { title: '信息识别状态', sortFlag:true, key: 'p1', width: 120, tipFlag:true},
        { title: '客户号', sortFlag:true, key: 'p2', width: 110, tipFlag:true},
        { title: '客户名称', sortFlag:true, key: 'p3', width: 90, tipFlag:true},
        { title: '场景', sortFlag:true, key: 'p4', width: 90, tipFlag:true},
        { title: '优先级', sortFlag:true, key: 'p5', width: 80, tipFlag:true},
        { title: '事件名称', sortFlag:true, key: 'p6', width: 120, tipFlag:true},
        { title: '触发日期', sortFlag:true, key: 'p7', width: 100, tipFlag:true},
        { title: '处理截止日期', sortFlag:true, key: 'p8', width: 120, tipFlag:true},
        { title: '状态', sortFlag:true, key: 'p9', width: 80, tipFlag:true},
        { title: '处理人营业部', sortFlag:false, key: 'p10', width: 120, tipFlag:true},
        { title: '处理人', sortFlag:true, key: 'p11', width: 90, tipFlag:true},
    ];

    /***********************函数区域***********************/

    // 初始化表格相关参数
    $scope.initPageParams = function() {
        $scope.selectPageSize = "10";//当前一页显示条数 （供展示、修改用）
        $scope.currentPageNum = 1;//当前页页码 （仅供计算入参用，不展示）
        $scope.responseTotalSize = "";//返回数据的条数

        $scope.isOrderBy = "";//排序字段
        $scope.sortDirection = 'DESC';//排序方向
    };

    // http请求获取列表数据
    $scope.getDataAction = function () {
        $scope.$emit('isLoading',true);
        $timeout(function () {
            $scope.dataList = [
                {p1:'已识别',p2:'1234567891',p3:'张三',p4:'新客培育',p5:'需处理',p6:'下单后未成交',p7:'2018-11-20',p8:'2018-12-25',p9:'未处理',p10:'长沙黄兴路',p11:'李密'},
                {p1:'已识别',p2:'1234567891',p3:'张三',p4:'新客培育',p5:'需处理',p6:'下单后未成交',p7:'2018-11-20',p8:'2018-12-25',p9:'未处理',p10:'长沙黄兴路',p11:'李密'},
                {p1:'已识别',p2:'1234567891',p3:'张三',p4:'新客培育',p5:'需处理',p6:'下单后未成交',p7:'2018-11-20',p8:'2018-12-25',p9:'未处理',p10:'长沙黄兴路',p11:'李密'},
                {p1:'已识别',p2:'1234567891',p3:'张三',p4:'新客培育',p5:'需处理',p6:'下单后未成交',p7:'2018-11-20',p8:'2018-12-25',p9:'未处理',p10:'长沙黄兴路',p11:'李密'},
                {p1:'已识别',p2:'1234567891',p3:'张三',p4:'新客培育',p5:'需处理',p6:'下单后未成交',p7:'2018-11-20',p8:'2018-12-25',p9:'未处理',p10:'长沙黄兴路',p11:'李密'},
                {p1:'已识别',p2:'1234567891',p3:'张三',p4:'新客培育',p5:'需处理',p6:'下单后未成交',p7:'2018-11-20',p8:'2018-12-25',p9:'未处理',p10:'长沙黄兴路',p11:'李密'},
                {p1:'已识别',p2:'1234567891',p3:'张三',p4:'新客培育',p5:'需处理',p6:'下单后未成交',p7:'2018-11-20',p8:'2018-12-25',p9:'未处理',p10:'长沙黄兴路',p11:'李密'},
                {p1:'已识别',p2:'1234567891',p3:'张三',p4:'新客培育',p5:'需处理',p6:'下单后未成交',p7:'2018-11-20',p8:'2018-12-25',p9:'未处理',p10:'长沙黄兴路',p11:'李密'},
                {p1:'已识别',p2:'1234567891',p3:'张三',p4:'新客培育',p5:'需处理',p6:'下单后未成交',p7:'2018-11-20',p8:'2018-12-25',p9:'未处理',p10:'长沙黄兴路',p11:'李密'},
                {p1:'已识别',p2:'1234567891',p3:'张三',p4:'新客培育',p5:'需处理',p6:'下单后未成交',p7:'2018-11-20',p8:'2018-12-25',p9:'未处理',p10:'长沙黄兴路',p11:'李密'},
                {p1:'已识别',p2:'1234567891',p3:'张三',p4:'新客培育',p5:'需处理',p6:'下单后未成交',p7:'2018-11-20',p8:'2018-12-25',p9:'未处理',p10:'长沙黄兴路',p11:'李密'},
                {p1:'已识别',p2:'1234567891',p3:'张三',p4:'新客培育',p5:'需处理',p6:'下单后未成交',p7:'2018-11-20',p8:'2018-12-25',p9:'未处理',p10:'长沙黄兴路',p11:'李密'}
            ];//数据
            $scope.responseTotalSize = 101;//返回数据的条数
            $scope.$emit('isLoading',false);
        },2000);
    };


    /***********************初始化区域*********************/

    $scope.init = function () {
        $scope.initPageParams();//初始化表格、分页相关参数
        $scope.getDataAction();//获取数据
    };
    $scope.init();

    /***********************监控区域**********************/



}]);