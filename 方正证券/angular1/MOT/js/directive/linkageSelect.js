crmApp
  .directive('linkageSelect', ['$parse','$timeout','$compile',function ($parse,$timeout,$compile) {
    return {
      restrict: 'A',
      require: '?ngModel',
      scope:{
        ngModel:"=",  //bind
        treeId:"@",   //树的id
        treeData:"=", //树的数据
        treeType:"=", //树的类型，只要配置了treeData，默认下拉是ztree，其它选项：transfer
        nodeConfig:"@", //节点的配置
        includeParent:"@", //是否包含父级
        ngDisabled:"=", // disabled 标识
        lazyload:"@",  //是否需要懒加载（数据比较多的时候）
        selectLazyData:"=", // 搜索后的数据
        selectDataList:"=",// 原数据
        selectKeyValue:"@",//字段和显示字段名
        selectedCallBack:"=",
        callBackParam:"@"
      },
      priority: 10,
      link:function(scope, element, attrs,ngModel){

        /***********************变量区域***********************/

          scope.element = element;//存储当前dom对象
          scope.treeNewData  = [];//将层级节点转换成一维数组形式
          scope.includeParentFg = (scope.includeParent=="true")?true:false;
          scope.treeModel = [];//用于树的格式化的数据

          scope.searchFlag = attrs['liveSearch'];
          scope.dataSize = attrs['size'];

          scope.isClicked = false;
        
          scope.digestNum = 0;
          scope.renderNum = 0;

          scope.isMultiple = attrs.multiple;

          // 懒加载传入的 key 和 value
          scope.keyName = !scope.selectKeyValue?"key":scope.selectKeyValue.split(',')[0];
          scope.valueName = !scope.selectKeyValue?"value":scope.selectKeyValue.split(',')[1];
          scope.lazyLoadOldModel = "";

          scope.wrapHeight = -1;

          // treeType 默认值 处理为ztree
          scope.keyValueLst = [];
          if(attrs.treeData){
            scope.treeType = scope.treeType?scope.treeType:"ztree";
            if(scope.treeType==="transfer"){
              scope.keyValueLst = scope.nodeConfig.split(',')
              scope.transferConfig = {
                targetData : [],//目标列表
                keyValue:''+scope.keyValueLst[1]+','+scope.keyValueLst[2]+'',
                isTree : true,//是否是树形结构
                treeChildrenKey : ''+scope.keyValueLst[0]+'',//是否是树形结构
                onlyChoose : true
              };
            }
          }

          // 穿梭框下拉

        /*************************函数区域************************/



        /***********************初始化区域**********************/


          // 初始化select 并在 树 形式的 逻辑下追加清空搜索树的键入值。
          element.selectpicker().on('hide.bs.select',function(){
            $timeout(function(){
              if(scope.treeType==="ztree"){
                scope.searchTreeKey ="";
              }

              // 懒加载模式下 下拉收起后 需要清空已搜索结果
              if(eval(scope.lazyload)){
                scope.selectLazyData = [];
                // scope.element.selectpicker('refresh');
                angular.element(element[0]).prev('.dropdown-menu').find('.no-results').remove();
              }
            },0)

          });

          // 初始化select 并在 在数据量较大的时候
          // element.selectpicker().on('show.bs.select',function(){
                  
          //     if(scope.treeType==="transfer"&&scope.wrapHeight==-1){

          //       var staticHeight = angular.element(scope.element[0]).prev('div.dropdown-menu')[0].style.maxHeight;

          //       scope.wrapHeight = staticHeight?Number(staticHeight.replace('px','')):160;

          //       // scope.wrapHeight = Number(angular.element(scope.element[0]).prev('div.dropdown-menu')[0].style.maxHeight.replace('px',''))-50;

          //       initTran()
          //     }
              

          // });

          // 懒加载情况下的 数据样式在刷新后的赋值。
          element.selectpicker().on('refreshed.bs.select',function(){
                 
              if(eval(scope.lazyload)){
                // element.prev('.dropdown-menu').find('.selected').addClass('active');
                initLazySelectedHtml();

                // 懒加载模式下的数据初始化
                if(eval(scope.lazyload)){

                  angular.element(element[0]).prev('.dropdown-menu').find('.bs-searchbox').off('input propertychange').on('input propertychange',function(e){
                    e.stopPropagation();
                    var inputVal = angular.element(e.target).val();
                    var filterList = [];
                    if(!myCommon.isEmpty(inputVal)){
                      for(var i = 0;i<scope.selectDataList.length;i++){
                        if(scope.selectDataList[i][scope.valueName].indexOf(inputVal)>-1&&filterList.length<500){
                          filterList.push(scope.selectDataList[i]);
                        }
                      }
                      
                    }

                    $timeout(function(){
                      scope.selectLazyData = filterList;
                      
                      $timeout(function(){
                        angular.element(element[0]).prev('.dropdown-menu').find('.no-results').remove();
                        if(!myCommon.isEmpty(inputVal)){
                          if(filterList.length==0){
                            angular.element(element[0]).prev('.dropdown-menu').find('ul').append('<li class="no-results">没有您搜索的" '+inputVal+'"</li>')
                          }
                        }
                      },100)


                    },0)

                  })

                }

              }

          });

          // 点击树 冒泡 阻止 dropdown menu的时间
          scope.clickTree = function(e){
            e.stopPropagation();
          }

          if(scope.treeType==="ztree"){

            var nodeConfig = scope.nodeConfig.split(',')
            scope.pId = nodeConfig[0];
            scope.Id = nodeConfig[1];
            scope.name = nodeConfig[2];

            initTree();  


            function initTree(){
              scope.setting2 = {
                view: {
                    showIcon:false,
                },
                
                edit: {
                    enable: true,
                },
                check: {
                  enable: true, 
                },
                data: {
                    simpleData: {
                        enable:true,
                        idKey: scope.Id,
                        pIdKey: scope.pId,
                        rootPId: ""
                    },
                    key:{
                    name:scope.name
                  },
                },
                callback: {
                    onCheck:onCheck
                }
                
              }

              if(!attrs.multiple){
                scope.setting2.check.chkStyle = "radio";
                scope.setting2.check.radioType = "all";
              }
              scope.searchTreeKey = ""
              var _html = "";

              scope.wrapHeight = 28*scope.dataSize;

              if(scope.searchFlag){
                _html+= '<div class="bs-searchbox" ng-if="searchFlag"><input type="hidden" class="zTree-search"/><input type="text" class="form-control " autocomplete="off" role="textbox" aria-label="Search" placeholder="请输入" ng-model="$parent.searchTreeKey"></div>'
                scope.wrapHeight = scope.wrapHeight-46;
              }

              _html+= '<div class="tree-drop-menu" style="height:'+scope.wrapHeight+'px"><linkage-tree z-nodes="treeData" node-setting="setting2" tree-id="'+scope.treeId+'" ng-click="clickTree($event)" ng-model="treeModel" search-tree-key="searchTreeKey"></linkage-tree></div>';
              var treeNode = angular.element(scope.element[0]).prev('div.dropdown-menu').html($compile(_html)(scope));
            }
              
              
            

            // 下拉选择
            function onCheck(){
              var treeObj=$.fn.zTree.getZTreeObj(scope.treeId);
              nodes=treeObj.getCheckedNodes(true);

              var checkedList  =  [];
              for(var i = 0;i<nodes.length;i++){

                // 判断是否需要包含父级 如果是单选则必然是需要包含父级的
                if(scope.includeParentFg||!attrs.multiple){
                  if(!nodes[i].getCheckStatus().half){
                    checkedList.push(nodes[i][scope.Id]);
                  }
                }else{
                  if(nodes[i].check_Child_State==-1){
                    checkedList.push(nodes[i][scope.Id]);
                  }
                }
                
              }

              // scope.treeNewData = nodes;
              if(!attrs.multiple){
                scope.ngModel = checkedList[0];
              }else{
                scope.ngModel = checkedList;
              }
            }

            function formatGs(opDataParam){
              for(var i= 0;i<opDataParam.length;i++){
                if(opDataParam[i].children&&opDataParam[i].children.length!==0){

                  var childrenData = opDataParam[i].children;
                  delete opDataParam[i].children;
                  scope.treeNewData.push(opDataParam[i]);
                  formatGs(childrenData);
                }else{
                  scope.treeNewData.push(opDataParam[i]);
                }
              }
            }

            function initSelectedHtml(){
              var showText = [];
              for(var i = 0;i<scope.treeNewData.length;i++){
                for(var j = 0;j<scope.treeModel.length;j++){
                  if(scope.treeModel[j]==scope.treeNewData[i][scope.Id]){
                    showText.push(scope.treeNewData[i][scope.name])
                  }
                }
              }

              angular.element(scope.element[0]).parents('.bootstrap-select').find('.filter-option').text(showText.length==0?"请选择":showText.join(','))
            }

          }else if(scope.treeType==="transfer"){ //穿梭框下拉
            // alert("123")

            initTran();

            //初始化下拉创所框 
            function initTran(){

              scope.wrapHeight = 28*scope.dataSize;

              var _html = "";
              if(scope.searchFlag){
                _html+= '<div class="bs-searchbox" ng-if="searchFlag"><input type="hidden" class="zTree-search"/><input type="text" class="form-control " autocomplete="off" role="textbox" aria-label="Search" placeholder="请输入" ng-model="$parent.searchTreeKey"></div>'
                scope.wrapHeight = scope.wrapHeight-46;
              }

              _html+= '<div class="tree-drop-menu" ng-click="clickTree($event)"><linkage-transfer  source-data="treeData" style="width: 300px;height: '+scope.wrapHeight+'px;" target-data="transferConfig.targetData" key-value="transferConfig.keyValue" is-tree="transferConfig.isTree" tree-children-key="transferConfig.treeChildrenKey" only-choose="transferConfig.onlyChoose" search-param="searchTreeKey"></linkage-transfer>';
              var treeNode = angular.element(scope.element[0]).prev('div.dropdown-menu').html($compile(_html)(scope));

            }


            function formatGs(opDataParam){
              for(var i= 0;i<opDataParam.length;i++){
                if(opDataParam[i][scope.transferConfig.treeChildrenKey]&&opDataParam[i][scope.transferConfig.treeChildrenKey].length!==0){

                  var childrenData = opDataParam[i][scope.transferConfig.treeChildrenKey];
                  delete opDataParam[i][scope.transferConfig.treeChildrenKey];
                  scope.treeNewData.push(opDataParam[i]);
                  formatGs(childrenData);
                }else{
                  scope.treeNewData.push(opDataParam[i]);
                }
              }
            }

            function initSelectedHtml(){
              var showText = [];
              for(var i = 0;i<scope.treeNewData.length;i++){
                // for(var j = 0;j<scope.treeModel.length;j++){
                  if(scope.ngModel==scope.treeNewData[i][scope.keyValueLst[1]]){
                    showText.push(scope.treeNewData[i][scope.keyValueLst[2]])
                  }
                // }
              }

              angular.element(scope.element[0]).parents('.bootstrap-select').find('.filter-option').text(showText.length==0?"请选择":showText.join(','))
            }

      
            

          }

          // 懒加载模式下的数据初始化默认

          function initLazySelectedHtml(){

            var showText = [];
            if(!myCommon.isEmpty(scope.ngModel)){
              for(var i = 0;i<scope.selectDataList.length;i++){
                if(!scope.isMultiple){
                  if(scope.selectDataList[i][scope.keyName]==scope.ngModel){
                    showText.push(scope.selectDataList[i][scope.valueName])
                  }
                }else{
                  for(var j = 0;j<scope.ngModel.length;j++){
                    if(scope.selectDataList[i][scope.keyName]===scope.ngModel[j]){
                      showText.push(scope.selectDataList[i][scope.valueName])
                    }
                  }
                }
                
              }
            }
            
            // console.log(showText)
            angular.element(scope.element[0]).parents('.bootstrap-select').find('.filter-option').text(showText.length==0?"请选择":showText.join(','))
          }

        /***********************监控区域**********************/


          if(scope.treeType==="ztree"){

            scope.$watch('ngModel',function(nv,ov){

              // if(!nv) return;
              
              if(!attrs.multiple){
                scope.treeModel[0] = nv;
              }else{
                scope.treeModel = nv;
              }
              
              initSelectedHtml();

            })

            scope.$watch('treeData',function(nv,ov){
              if(!nv&&nv==ov) return;

              scope.treeNewData = [];

              formatGs(angular.copy(scope.treeData));
              // 处理

              if(scope.ngModel){
                initSelectedHtml();
              }
            })
          }else if(scope.treeType==="transfer"){  

            // 监听下拉
            scope.$watch('transferConfig.targetData',function(nv,ov){

              if(nv&&nv.length>0&&nv!==ov){
                scope.ngModel = nv[0][scope.keyValueLst[1]];

                scope.selectedCallBack(scope.callBackParam,nv[0])

              }

              angular.element(scope.element[0]).prev('.dropdown-menu').parents('.bootstrap-select').removeClass('open');
              

            })

            scope.$watch('ngModel',function(nv,ov){

              // console.log(nv)
              if(nv!==ov){
                initSelectedHtml();
              }

            })

            scope.$watch('treeData',function(nv,ov){
              if(!nv&&nv==ov) return;

              scope.treeNewData = [];

              formatGs(angular.copy(scope.treeData));
              // 处理

              if(scope.ngModel){
                initSelectedHtml();
              }
            })

          }
          else{

            scope.$watch("ngModel", function (newVal, oldVal) {
              if(newVal==oldVal) return;
              scope.$evalAsync(function () {
                element.val(newVal);
                element.selectpicker('refresh');

                // 懒加载且是多选的情况下
                if(eval(scope.lazyload)&&scope.isMultiple){
                  var newModel = newVal;
                  for(var i = 0;i<oldVal.length;i++){
                    var isExits = false;
                    for(var j = 0;j<scope.selectLazyData.length;j++){
                      if(scope.selectLazyData[j][scope.keyName]==oldVal[i]){
                        isExits = true;
                      }
                    }

                    if(!isExits){
                      newModel.splice(0,0,oldVal[i]);
                    }
                  }

                  scope.ngModel = newModel;
                  initLazySelectedHtml();
                  
                }

              });
            });

            ngModel.$render = function () {
              scope.renderNum++;
              // console.log(scope.renderNum);
              scope.$evalAsync(function () {
                  scope.digestNum++;
              });
            }
          }

          scope.$watch('digestNum',function (nV,oV) {
            if(nV === scope.renderNum){
              element.val(ngModel.$modelValue);
              element.selectpicker('refresh');

            }
          });

          scope.$watch('ngDisabled',function(nv,ov){
            // if(nv!=ov){
              $timeout(function(){
                scope.element.selectpicker('refresh');
                if(scope.treeType==="ztree"){
                  initSelectedHtml();
                  initTree();
                }else if(scope.treeType==="transfer"){
                  initSelectedHtml();
                  initTran();
                }
              },100)
            // }
          })

          
      }


        
    };
  }]);
