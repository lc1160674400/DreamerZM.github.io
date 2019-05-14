/**
 * 
 * @authors joyXie (xiec@linkstec.com)
 * @date    2018-05-13 12:06:04
 * @function  圆形进度条
 */

crmApp
  .directive('linkageCircleProgress', ['$parse','$timeout','$compile',function ($parse,$timeout,$compile) {
     return{  
        // require:'?ngModel',  
        scope:{
        	"value":"=",
        	"progressId":"@",
        	"progressConfig":"=",
        },
        restrict:'A',
        template: '<div class="circle-progress" style="width:{{width}}px;height:{{height}}px"><canvas id="c0_{{progressId}}" class="circle-bg" width="{{width*2}}" height="{{height*2}}"></canvas><div class="num-text" style="line-height:{{height}}px"></div></div>',
        link:function(scope,element,attrs,ngModel){  
             
    		scope.width = scope.progressConfig.width?scope.progressConfig.width:100;
        	scope.height = scope.progressConfig.height?scope.progressConfig.height:100;
        	scope.startColor = scope.progressConfig.startColor?scope.progressConfig.startColor:"#1890FF";
        	scope.endColor = scope.progressConfig.endColor?scope.progressConfig.endColor:"#1890FF";
        	scope.bgColor = scope.progressConfig.bgColor?scope.progressConfig.bgColor:"#E1E6EF";
        	scope.lineWidth = scope.progressConfig.lineWidth?scope.progressConfig.lineWidth:20;
        	scope.startAngle = scope.progressConfig.startAngle?scope.progressConfig.startAngle:0.9;
        	scope.endAngle = scope.progressConfig.endAngle?scope.progressConfig.endAngle:0.89;

        	scope.totalValue = scope.value&&scope.value.totalValue?scope.value.totalValue:100;
        	scope.setValue = scope.value&&scope.value.setValue?scope.value.setValue:0

            /***********************变量区域***********************/ 


			/***********************函数区域***********************/

				var rAF = window.requestAnimationFrame ||
				    window.webkitRequestAnimationFrame ||
				    window.mozRequestAnimationFrame ||
				    window.oRequestAnimationFrame ||
				    window.msRequestAnimationFrame ||
				    function(callback) {
				        window.setTimeout(callback, 1000 / 60);
				    };

				function initGauge() {

				    // 绘制背景
				    
				   
				    scope.isBig = false;
				    scope.isLoadNum = 0;

				    scope.x = Math.PI * scope.startAngle;
				    scope.canvas1 = document.getElementById("c0_"+scope.progressId);
				    scope.ctx = scope.canvas1.getContext('2d');

				    scope.draw = function() {

				    	scope.ctx.clearRect(0, 0, scope.width*2, scope.height*2);

				    	scope.ctx.beginPath();   
				    	scope.ctx.lineWidth = scope.lineWidth*2;
					    scope.ctx.lineCap = 'round';
					    scope.ctx.strokeStyle = scope.bgColor;
					    
					    $("#c0_"+scope.progressId).css({'width':scope.width+"px",'height':scope.height+"px"});

					    scope.ctx.arc(scope.width , scope.width , scope.width - scope.lineWidth*2, Math.PI * scope.startAngle, scope.endAngle * Math.PI, false);
					    scope.ctx.closePath(); 
					    scope.ctx.stroke();
					    // scope.ctx.closePath();  

					    scope.grd = scope.ctx.createLinearGradient(0, 0, scope.width, 0);

					    scope.grd.addColorStop(0, scope.startColor);
					    scope.grd.addColorStop(1, scope.endColor);

				        
				        scope.ctx.beginPath();
				        scope.ctx.strokeStyle = scope.grd; //'#ff4444';

				        if (scope.isLoadNum <= scope.setValue) {

				            angular.element(element[0]).find('.num-text').text(scope.isLoadNum+"%");

				            scope.isLoadNum++;

				            if (!scope.isBig) {
				                if (scope.x < Math.PI * 2) {
				                    scope.x += (2 - scope.startAngle + scope.endAngle) * Math.PI / 100;
				                } else {
				                    scope.isBig = true;
				                }
				            } else {
				                scope.x = scope.x + (2 - scope.startAngle + scope.endAngle) * Math.PI / 100 - Math.PI * 2;
				            }
				        }
				        scope.ctx.arc(scope.width, scope.height, scope.width - scope.lineWidth*2, Math.PI * scope.startAngle, scope.x, false); // 画圆
				        scope.ctx.stroke();
				        scope.ctx.closePath();


				        rAF(function() {
				            scope.draw();
				        });
				    }
				    rAF(function() {
				        scope.draw();
				    });
				}
        
			/***********************初始化区域**********************/
					
					

			/***********************监控区域**********************/

			// 监控数数据
			scope.$watch('value',function(nv,ov){
				if(!myCommon.isEmpty(nv)){	
					scope.setValue = nv.setValue
					initGauge();
					
				}
			},true)




  
        }  
    }  

}])