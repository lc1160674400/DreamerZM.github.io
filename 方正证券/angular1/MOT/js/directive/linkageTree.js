
/**
 * 
 * @authors joyXie (xiec@linkstec.com)
 * @date    2018-04-02 14:49:43
 * @function  树结构
 */

crmApp.directive("linkageTree",['$compile','$timeout',function($compile,$timeout){
    return{  
        // require:'?ngModel',  
        scope:{
        	"ngModel":"=",
        	"zNodes":"=",
        	"nodeSetting":"=",
        	"treeId":"@",
        	"showChecked":"=",
        	"searchTreeKey":"=",

        },
        restrict:'E',
        template: '<div><ul style="" class="linkage-tree" id="{{treeId}}"></ul><no-data ng-show="hiddenNodes.length==treeNewData.length" tip-text="tipText" style="margin-bottom:20px"></no-data></div>',
        link:function(scope,element,attrs,ngModel){  
             
            /***********************变量区域***********************/ 

            	scope.name = (scope.nodeSetting&&scope.nodeSetting.data&&scope.nodeSetting.data.key&&scope.nodeSetting.data.key.name)?scope.nodeSetting.data.key.name:"name";
 				scope.Id = scope.nodeSetting.data.simpleData.idKey;
 				scope.treeNewData = [];//格式化的一位数组
 				scope.treeNewDataBk = [];//处理备份使用
 				scope.ckStyle = (scope.nodeSetting&&scope.nodeSetting.check)?scope.nodeSetting.check.chkStyle:""; 

 				scope.shownNodesStatic = [];//临时存储需要显示的所有节点 包括父节点

 				scope.tipText = "暂时没有您要找的节点"

			/***********************函数区域***********************/


			// 初始化树结构
			scope.initTree = function(){
				// if ($("#diyBtn_"+treeNode.id).length>0) return;
				tt = $("#"+scope.treeId);
				scope.tree = $.fn.zTree.init(tt, scope.nodeSetting, scope.treeNewData);

			}

			// 显示隐藏
	        function showAndHide(){
	            var zTreeObj=$.fn.zTree.getZTreeObj(scope.treeId);
	            scope.shownNodesStatic = [];
	            //显示上次搜索后背隐藏的结点

	            if(!zTreeObj){return;}
	            zTreeObj.showNodes(scope.hiddenNodes?scope.hiddenNodes:[]);
	            
	            //查找不符合条件的叶子节点
	            function filterFunc(node){
	                if(scope.showChecked){
	                    if((node[scope.name].indexOf(scope.searchTreeKey?scope.searchTreeKey:"")!=-1)&&node.checked) {
	                    	scope.shownNodesStatic.push(node);
	                    	return false;
	                    }
	                }else{
	                    if(node[scope.name].indexOf(scope.searchTreeKey?scope.searchTreeKey:"")!=-1) {
	                    	scope.shownNodesStatic.push(node);
	                    	return false;
	                	}
	                }
	                
	                return true;        
	            };
	         
	            //获取不符合条件的叶子结点
	            scope.hiddenNodes=zTreeObj.getNodesByFilter(filterFunc);


	            getMeetReqNode();

	            zTreeObj.hideNodes(scope.hiddenNodes);
	        }

	        // 搜索所有
	        function addParentNodes(node){
				if(node!=null){
			    	var parentNode=node.getParentNode();
			        if(parentNode!=null){
				        console.log("parentNode:"+parentNode);
				        
				        var isExited = false;
				        angular.forEach(scope.shownNodesStatic, function (item) {
				        	if(item[scope.Id] == parentNode[scope.Id]){
				        		isExited = true;
				        	}
				        })

				        if(!isExited){
				        	scope.shownNodesStatic.push(parentNode)
				        }
				        
			            addParentNodes(parentNode);
			        }
			    }else{
			    	return;
			    }
			}


	        function getMeetReqNode(){
	        	for(var i=0;i<scope.shownNodesStatic.length;i++){
			    	addParentNodes(scope.shownNodesStatic[i]);
			    }

			    getHideNode();
	        	
	        }

	        function getHideNode(){
	        		
	        	var hideNodes = [];
	        	angular.forEach(scope.hiddenNodes,function(item){
	        		var isHide = true;
	        		for(var i = 0;i<scope.shownNodesStatic.length;i++){
	        			if(scope.shownNodesStatic[i][scope.Id] == item[scope.Id]){
	        				isHide = false;
	        			}
	        		}
	        		if(isHide){
	        			hideNodes.push(item);
	        		}
	        	})
	        	scope.hiddenNodes = hideNodes;
	        	
	        }

	        // 格式化 已经checked
	        function formatCheckedTree(){
	        	var treeObj=$.fn.zTree.getZTreeObj(scope.treeId);
                var nodes1=treeObj.getNodes(true);
                var nodes = treeObj.transformToArray(nodes1);

                // treeObj.checkAllNodes(false);
                setAllFalse(treeObj,nodes);

                for(var c =0;c<scope.ngModel.length;c++){
                  for(var x = 0;x<nodes.length;x++){
                    if(nodes[x][scope.Id]==scope.ngModel[c]&&(scope.ckStyle=='radio'||!nodes[x].children||nodes[x].children.length==0)){
                      treeObj.checkNode(nodes[x], true, true, true)
                    }
                  }
                }
	        }

	        // 取消所有的选中的项
	        function setAllFalse(treeObj,nodes){
                for(var x = 0;x<nodes.length;x++){
                    treeObj.checkNode(nodes[x], false, null, true)
                }
	        }

	        function formatGs(opDataParam){
              for(var i= 0;i<opDataParam.length;i++){
                if(opDataParam[i].children){

                	if(opDataParam[i].children.length!==0){
                		var childrenData = opDataParam[i].children;
		                delete opDataParam[i].children;
		                scope.treeNewData.push(opDataParam[i]);
		                formatGs(childrenData);
                	}else{
                		var childrenData = opDataParam[i].children;
		                delete opDataParam[i].children;
		                scope.treeNewData.push(opDataParam[i]);
                	}
	                  
                }else{

                  scope.treeNewData.push(opDataParam[i]);

                }
              }
            }


        
			/***********************初始化区域**********************/
				// scope.initTree();
			/***********************监控区域**********************/

			// 监控数数据
			scope.$watch('zNodes',function(nv,ov){
				if(!myCommon.isEmpty(nv)){	


					formatGs(angular.copy(nv))

					scope.initTree();

					if(scope.ngModel&&scope.ngModel.length>0){
						formatCheckedTree();
					}
					
				}
			},true)


			// 监控ngModel
			scope.$watch('ngModel',function(nv,ov){
				if(nv!=ov){	
					if(scope.zNodes.length>0){

		                formatCheckedTree();
		            }
					
				}
			},true)

			scope.$watch('showChecked',function(nv,ov){
	            if(nv == undefined) return;
	            
	            showAndHide();
	        })

	        scope.$watch('searchTreeKey',function(nv,ov){

	            if(nv == undefined) return;
	            showAndHide();

	        })


	        scope.$watch('nodeSetting',function(nv,ov){
	            if(nv == undefined) return;

	            scope.name = (scope.nodeSetting&&scope.nodeSetting.data&&scope.nodeSetting.data.key&&scope.nodeSetting.data.key.name)?scope.nodeSetting.data.key.name:"name";
	            // showAndHide();
	        })

  
        }  
    }  

}])