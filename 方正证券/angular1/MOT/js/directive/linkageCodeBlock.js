/**
 * @Author WangZe (wangze@linkstec.com)
 * @Date 2018/2/27 15:26
 * @Function 代码块
 **/
crmApp.directive("linkageCodeBlock",['ngToast','$timeout',function(ngToast,$timeout){
    return {
        restrict: 'EA',
        scope:{
            className:"@"
        },
        template: '<div class="standard-code-box">' +
                        '<div class="standard-code-btn">'+
                                '<span class="standard-code-btn-box no-select" ng-click="toggleCodeAction($event)">' +
                                    '<i class="standard-code-btn-icon on"></i>' +
                                    '<span class="standard-code-btn-text off">隐藏代码</span>' +
                                    '<span class="standard-code-btn-text on">显示代码</span>' +
                                '</span>'+
                        '</div>' +
                        '<pre style="display: none;"><div style="text-align: right;display:inline-block;padding-right: 10px;line-height: 30px;height:30px;cursor: pointer;background-color: #f4f4fa;width:100%;color:#1890FF;" class="blue-text copy-btn" data-clipboard-text="{{copyText}}"><span ng-show="!isComplte">复制</span><i class="lk-icon lk-icon-tick-o" style="color:#1890FF;" ng-show="isComplte" ng-mouseleave="changeStatus()"></i></div><code ng-transclude class="{{className}}"></code></pre>' +
                    '</div>',
        replace: true,
        transclude: true,
        link: function(scope, element, attributes, controller) {
            scope.className = scope.className?scope.className:"";
            scope.toggleCodeAction = function (e) {
                e.preventDefault();
                var _that = angular.element(e.target).parents('.standard-code-btn');
                var _icon = _that.find('.standard-code-btn-icon');
                if(_icon.hasClass('on')){
                    _icon.removeClass('on').addClass('off');
                    _that.css({'border-bottom':'1px solid #80C2FF'});

                    _that.next('pre').stop(true,true).slideDown(300,function () {
                        _that.css({'border-bottom':'1px solid #80C2FF'});
                    });
                    _that.find('.standard-code-btn-text.off').show();
                    _that.find('.standard-code-btn-text.on').hide();
                }else{
                    _icon.removeClass('off').addClass('on');
                    _that.next('pre').stop(true,true).slideUp(300,function () {
                        _that.css({'border-bottom':'none'});
                    });
                    _that.find('.standard-code-btn-text.off').hide();
                    _that.find('.standard-code-btn-text.on').show();
                }
            };

            scope.copyText = $(element).find('code span').html().replace(/&lt;/g, "<").replace(/&gt;/g, ">");
            scope.isComplte = false;


            var btns = document.querySelectorAll('.copy-btn');
            var clipboard = new ClipboardJS(btns);

            clipboard.on('success', function(e) {
                // console.log("123123");
                $timeout(function(){
                    if(!scope.isComplte){
                        scope.isComplte = true;
                        ngToast.success('复制成功');
                    }
                },0)
                
                
            });

            clipboard.on('error', function(e) {
                console.log(e);
            });

            scope.changeStatus = function(){
                scope.isComplte=false;
            }

            scope.$watch('className',function(nv,ov){
                angular.element(element[0]).find('pre code').each(function(i, block) {
                    hljs.highlightBlock(block);
                });
            })
            
        }
    }
}]);



