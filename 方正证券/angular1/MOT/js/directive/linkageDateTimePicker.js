
crmApp.directive("datetimepicker",['$timeout','$parse','$compile',function($timeout,$parse,$compile){
    return{  
        require:'?ngModel',  
        restrict:'AE',
        priority: 10,
        scope:{
            ngModel:'=',
            format:'@',//选择器的格式
            minDate:'=',//当天显示是否高亮，默认显示
            maxDate:'=',//是否显示上下午，默认不显示
            dateType:'@',//时间选择器 类型  month / time 
            changeFun:"&",
            dateRange:"@" //区间显示分隔符
        },
        link:function(scope,element,attr,ngModel){  

            scope.element = element;
            scope.dateRangeAttr = attr.dateRange;
            $timeout(function(){    

                var timeObject = {};

                timeObject['elem'] = scope.element[0];

                // 区间标识
                if(scope.dateRangeAttr!=undefined){
                    if(scope.dateRange==""){
                        timeObject['range'] = "~";
                    }else{
                        timeObject['range'] = scope.dateRange;
                    }
                }

                
                // 时间类型 
                if(scope.dateType){
                    timeObject['type'] = scope.dateType;
                }

                // 格式化
                if(scope.format){
                    timeObject['format'] = scope.format;
                }else{
                    if(scope.dateType=="dateTime"){
                        timeObject['format'] = "yyyy/MM/dd HH:mm:ss";
                    }else if(scope.dateType=="month"){
                        timeObject['format'] = "yyyy/MM";
                    }else if(scope.dateType=="time"){
                        timeObject['format'] = "HH:mm:ss";
                    }else if(!scope.dateType){
                        timeObject['format'] = "yyyy/MM/dd";
                    }
                    
                }

                // 设置时间最小值
                if(scope.minDate){
                    timeObject['min'] = scope.minDate;
                }

                // 设置时间最大值
                if(scope.maxDate){
                    timeObject['max'] = scope.maxDate;
                }


                timeObject['done'] = function(value, date, endDate){
                    $timeout(function(){
                        scope.element.change();
                        if(scope.changeFun){
                            scope.changeFun();//掉回调
                        }
                    },50)
                }

                scope.dateObj = laydate.render(timeObject);

                element.css({'padding-right':30});//按钮占位区域


                scope.$watch('minDate',function(nv,ov,scope){
                    if(nv==ov||nv==undefined) return;
                
                    scope.dateObj.config.min =  getDateParam(0,nv);
                })

                scope.$watch('maxDate',function(nv,ov,scope){
                    if(nv==ov||nv==undefined) return;

                    scope.dateObj.config.max =  getDateParam(1,nv);
                })

                
            },0)  


            scope.modelIsNull = true;//输入的内容是否是空标识  true 是空   false 非空
            scope.isFocus = false;//是否是对焦状态  true 焦点状态    false 非焦点状态
            scope.cancelShow = false;//按钮是否显示  true 显示     false 不显示
           
            var html = $compile('<i class="lk-icon lk-icon-cancel form-control-icon" style="font-size: 14px;margin-top: -7px;" ng-show="cancelShow" ng-click="clearModel()"></i><i class="lk-icon lk-icon-calendar-o form-control-icon" ng-show="!cancelShow"></i>')(scope);
            angular.element(element[0]).after(html);


            //清空操作
            scope.clearModel = function () {
                $timeout(function(){
                    angular.element(element[0]).focus();
                },100)
                scope.ngModel='';
                
            };


            // 获取时间

            function getDateParam(flag,date){

                

                if(myCommon.isEmpty(date)){

                    if(flag==0){

                        return {
                            year:1900, 
                            month:0,//关键 
                            date: 1, 
                            hours: 0, 
                            minutes: 0, 
                            seconds : 0
                        }

                    }else{

                        return {
                            year:2099, 
                            month:11,//关键 
                            date: 31, 
                            hours: 23, 
                            minutes: 59, 
                            seconds : 59
                        }
                    }

                }else{

                    var date = new Date(date);
                    var year = date.getFullYear();
                    var mon = date.getMonth();
                    var day = date.getDate();

                    var hours = date.getHours();
                    var min = date.getMinutes();
                    var sec = date.getSeconds();

                    return {
                        year:year, 
                        month:mon,//关键 
                        date: day, 
                        hours: hours, 
                        minutes: min, 
                        seconds : sec
                    }
                }

                

            }

            //获取焦点
            angular.element(element[0]).on('focus',function () {
                $timeout(function () {
                    scope.isFocus = true;//是否是对焦状态  true 焦点状态    false 非焦点状态
                    if(scope.modelIsNull){
                        scope.cancelShow = false;
                    }else{
                        scope.cancelShow = true;
                    }
                },100);
            });
            //失去焦点
            angular.element(element[0]).on('blur',function () {
                $timeout(function () {
                    scope.isFocus = false;//是否是对焦状态  true 焦点状态    false 非焦点状态
                    scope.cancelShow = false;
                },150);
            });


            // 监听viewValue
             scope.$watch(function(){
                    return ngModel.$viewValue;
                }, 
                function(newValue, oldValue){
                    // do something
                    // console.log("gg:"+newValue);
                    if(newValue != null && typeof newValue != 'undefined'){
                        if(newValue.toString().length === 0){
                            scope.modelIsNull = true;//判断是否显示参数
                        }else{
                            scope.modelIsNull = false;//判断是否显示参数
                        }
                    }
                    if(scope.isFocus && !scope.modelIsNull){
                        scope.cancelShow = true;
                    }else{
                        scope.cancelShow = false;
                    }
                }
            );

        }  
    } 
}])
