/**
 * @Author WangZe (wangze@linkstec.com)
 * @Date 2018/2/27 11:03
 * @Function 二级菜单点击事件以及锚点
 **/
crmApp.directive("linkageMenuAnchor",[function(){
    return {
        scope: {
            submenuList : "=",
            currentSubmenuItemName : "="
        },
        restrict: 'EA',
        template: '<ul class="standard-submenu">' +
                        // '{{currentSubmenuItemName}}'+
                        '<li class="standard-submenu-item"' +
                        'ng-repeat="submenuItem in submenuList"' +
                        'ng-class="{\'active\':currentSubmenuItemName == submenuItem.name}"' +
                        'ng-click="submenuClickActon(submenuItem.name)"' +
                        'ng-bind="submenuItem.value">--</li>' +
                    '</ul>',
        replace: true,
        link: function(scope, element, attributes, controller) {
            var windowHeight = window.innerHeight;
            var isClickAction = false;
            angular.element('.standard-submenu').css({'height':windowHeight});
            /**
             * 二级菜单点击事件
             * **/
            scope.submenuClickActon = function (name) {
                isClickAction = true;
                scope.currentSubmenuItemName = name;
                // console.log(angular.element('[data-container="'+ name+'"]').offset().top);

                angular.element("html,body").animate({"scrollTop":angular.element('[data-container="'+ name+'"]').offset().top-120});
            };
            /**
             * 锚点定位（根据内容滚动定位菜单）
             * **/
            scope.toThisNode = function () {

                var curIndex,nextIndex,preIndex,curcon,nextcon,precon;
                //获取当前内容区域
                curcon = angular.element('[data-container="'+ scope.currentSubmenuItemName+'"]');
                for(var i=0;i<scope.submenuList.length;i++){
                    if(scope.currentSubmenuItemName === scope.submenuList[i].name){
                        curIndex = i;
                        nextIndex = i+1;
                        preIndex = i-1;
                    }
                }
                if(curIndex < scope.submenuList.length - 1){//获取下一个内容区域
                    nextcon = angular.element('[data-container="'+ scope.submenuList[nextIndex].name +'"]');
                }
                if(curcon.offset().top - angular.element('body').scrollTop() > 120){
                    if(curIndex > 0){
                        scope.currentSubmenuItemName = scope.submenuList[preIndex].name;
                    }
                }else if(curIndex < scope.submenuList.length - 1){
                    if(nextcon.offset().top - angular.element('body').scrollTop() <= 120){
                        scope.currentSubmenuItemName = scope.submenuList[nextIndex].name;
                    }
                }
                scope.$apply();
            };
            /**
             * 滚动固定二级菜单以及滚动锚点
             * **/
            window.onscroll = function() {
                // if(angular.element('body').scrollTop()>85){
                //     angular.element('.standard-submenu').addClass('fixed-menu');
                // }else{
                //     angular.element('.standard-submenu').removeClass('fixed-menu');
                // }
                scope.toThisNode();
            };

        }
    }
}]);