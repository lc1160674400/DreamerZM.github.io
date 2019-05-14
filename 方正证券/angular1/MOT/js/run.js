
crmApp
    .run(["$rootScope","getDataFactory","getDirectoryData",function ($rootScope,getDataFactory,getDirectoryData) {
        /**
         * 登录人信息
         * **/
        if(window.top !== window.self){//内嵌进框架
            var doc = window.parent.document;
            var flash = doc.getElementById("Main");
            if(!myCommon.isEmpty(flash)){
            	$rootScope.currentStaffInfo = flash.getUserInfo();
            }else{
            	$rootScope.currentStaffInfo = window.parent.L.userInfo;
            }
        }else{//顶层的时候
            // debug
            $rootScope.currentStaffInfo = {
                memberId:1,// 11400008 1
                stfId:"admin",
                stfName:"系统管理员",//
                branchNo:9999,
                orgId:9999,//1010 9999
                currDate:"20190424",
                roleIds:"1,601,1708,1711,31780,51880,10060301"
            };
        }


        //数据字典查询 返回数组格式
        ////接口 common.QueryDataDictBo
        $rootScope.getDictionary=function(type) {
            var returnArray = [];
            getDirectoryData.fetchData({
                dirName:type,
                success :function (response) {
                    var list = response.resultData.data;
                    for(var i = 0;i<list.length;i++){
                        returnArray[i] = list[i]
                    }
                }
            });
            return returnArray;
        };
        /**
         * 特殊接口查询 返回数组格式
         * **/
        $rootScope.getQueryBo = function(bo) {
            var returnArray = [];
            getDataFactory.fetchData({
                url : myCommon.getWebApp(),
                method : "POST",
                params : {
                    "p": {
                        "busiNo": bo//业务功能bo
                    }
                },
            }).then(function (response) {
                var list = response.resultData.data;
                for(var i = 0;i<list.length;i++){
                    returnArray[i] = list[i]
                }
            },function (error) {
                // console.log(error);
            });
            return returnArray;
        }
    }]);
