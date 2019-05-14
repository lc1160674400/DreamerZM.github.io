/**
 * @Author WangZe (wangze@linkstec.com)
 * @Date 2018/7/23 17:58
 * @Function
 **/
crmApp.directive("linkageTooltip",['$compile','$timeout',function($compile,$timeout){
    return {
        scope : {
            tooltipOption : '=',
        },
        restrict: 'A',
        link: function(scope, element, attrs,ngModel) {
            /***********************参数区域*******************************************/

                // scope.tooltipOption = scope.tooltipOption?scope.tooltipOption:{};

            /***********************函数区域******************************************/



            /***********************初始化区域****************************************/

            function init(){
                $timeout(function(){
                    element.tooltip({
                        animation : scope.tooltipOption.animation?scope.tooltipOption.animation:true,
                        container : scope.tooltipOption.container?scope.tooltipOption.container:false,
                        delay : scope.tooltipOption.delay?scope.tooltipOption.delay:0,
                        html : scope.tooltipOption.html?scope.tooltipOption.html:false,
                        placement : scope.tooltipOption.placement?scope.tooltipOption.placement:'top',
                        selector : scope.tooltipOption.selector?scope.tooltipOption.selector:false,
                        title : scope.tooltipOption.title?scope.tooltipOption.title:"",
                        trigger : scope.tooltipOption.trigger?scope.tooltipOption.trigger:"hover focus",
                        viewport : scope.tooltipOption.viewport?scope.tooltipOption.viewport:{ selector: 'body', padding: 0 },
                        template : scope.tooltipOption.template?scope.tooltipOption.template:'<div class="tooltip default-yellow-tooltip-box" role="tooltip">' +
                            '<div class="tooltip-arrow tooltip-background-arrow"></div>' +
                            '<div class="tooltip-arrow tooltip-content-arrow"></div>' +
                            '<div class="tooltip-inner default-yellow-tooltip-inner">--</div>' +
                            '</div>',
                    });
                    if(scope.tooltipOption.afterRender && typeof scope.tooltipOption.afterRender == 'function'){
                        scope.tooltipOption.afterRender();
                    }
                },200);

            }
            init();




            /***********************监控区域*******************************************/

            scope.$watchGroup(['tooltipOption.animation','tooltipOption.container','tooltipOption.delay',
                    'tooltipOption.html','tooltipOption.placement','tooltipOption.selector',
                    'tooltipOption.title','tooltipOption.trigger','tooltipOption.viewport',
                    'tooltipOption.template','tooltipOption.afterRender'],
                function(nV,oV){
                    if(nV != oV){
                        element.tooltip('destroy');
                        init();
                    }
                });

            // scope.tooltipOption


        }
    }

}]);