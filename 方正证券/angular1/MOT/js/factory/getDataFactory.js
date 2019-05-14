var loadingNum = 0; //当前调用多少次接口
var loginCountNum = 0;//是否已经报请登录错误。
crmApp.factory('getDataFactory', ["$http","$q","$rootScope","ngToast",function ($http, $q, $rootScope,ngToast){  
    var factory = {};  
    factory.fetchData = function(dataParam) {

        if(!dataParam.hideLoading){
            $rootScope.$broadcast('isLoading', true);
            loadingNum++;
        }
        var defer = $q.defer(); 
        if(myCommon.isEmpty(dataParam.headers)){
            dataParam.headers = {'Content-Type': 'application/json'};
        } 
        $http({  
            url: dataParam.url,  
            method: dataParam.method,  
            headers: dataParam.headers,  
            params: dataParam.params,
        }).success(function (data) {
            
            // 过滤首页的模块
            if(!dataParam.hideLoading){
                loadingNum--;
                if(loadingNum==0){
                    $rootScope.$broadcast('isLoading', false);
                }
            }

            //判断是否调用的lmsp 框架的接口 接口处理不一样
            if(dataParam.lmspFetch){
                if(data.errorDesc&&data.errorDesc.indexOf('登录')>-1){
                    if(loginCountNum==0){
                        loginCountNum++;
                        dialog({
                            title: '提示',
                            content: "请先登录",
                            zIndex: 1201,
                            okValue: '确定',
                            ok: function () {
                                this.title('跳转中…');

                                // 判断是否是包含的iframe
                                if(top!=self){
                                    top.location ="/crm-prodf/logout";
                                }else{
                                    window.location="/crm-prodf/logout";
                                }
                            },
                            fixed:true,
                            cancel: false,
                        }).show().showModal();
                    }

                }else{
                    defer.resolve(data);
                }


            }else{

                if(data.statusCode == 1){  //接口调用成功
                    switch(dataParam.noCheck){
                        case true ://不需要检查  mot效果分析使用
                            defer.resolve(data);
                            break;
                        default :
                            if(data.resultData.returnStatus==="S200"){ //接口返回成功
                                // if(data.resultData.successStatus==="S200"){ //接口返回成功
                                defer.resolve(data);
                            }else{
                                // ngToast.dismiss();
                                if(!myCommon.isEmpty(data.resultData.errorDesc)){
                                    ngToast.create({
                                        className: 'warning',
                                        timeout:3000,
                                        content: data.resultData.errorDesc
                                    });
                                }else if(!myCommon.isEmpty(data.resultData.returnDesc)){
                                    ngToast.create({
                                        className: 'warning',
                                        timeout:3000,
                                        content: data.resultData.returnDesc
                                    });
                                }

                            }
                    }
                }else{
                    // alert("123");
                    // 判断是否是提示请登录
                    if((data.errorMsg&&data.errorMsg.indexOf('登录')>-1)){  //拦截登录标识
                        if(loginCountNum==0){
                            loginCountNum++;
                            dialog({
                                title: '提示',
                                content: "请先登录",
                                zIndex: 1201,
                                okValue: '确定',
                                ok: function () {
                                    this.title('跳转中…');

                                    // 判断是否是包含的iframe
                                    if(top){
                                        top.location ="/crm-prodf/logout";
                                    }else{
                                        window.location="/crm-prodf/logout";
                                    }
                                },
                                fixed:true,
                                cancel: false,
                            }).show().showModal();

                        }else{
                            return;
                        }
                    }else{
                        ngToast.create({
                            className: 'warning',
                            dismissOnTimeout:false,
                            content: data.errorMsg,
                            dismissButton:true
                        });
                    }

                }

            }



        }).  
        error(function (data, status, headers, config) {  
            loadingNum--;

            if(loadingNum==0){
                $rootScope.$broadcast('isLoading', false);
            }
            defer.reject(data);  
        });
        return defer.promise;  
        };  
        return factory;  
}]);  