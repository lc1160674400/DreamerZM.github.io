/**
 * 
 * @authors joyXie (xiec@linkstec.com)
 * @date    2017-11-10 10:04:45
 * @function  table组件
 * 功能点：1、固定头和固定列
 *        2、标记列表头的显示和顺序
 */

var tableNum = 0;
crmApp.directive("linkageTable",['$timeout','ngToast',"$sce","$compile",function($timeout,ngToast,$sce,$compile){
    return {
        scope: {
            data : "=",  //列表的数据
            columns : "=", //列表的列项
            setTableHeight:"=",//设置的表格的高度
            sortField:"=",//排序的字段
            sortDirection:"=",// 排序类型
            pagerCurrentNum:"=",//当前页码
            pagerGoNum:"=",//跳转到
            responseTotalSize:"=",//共多少条数据
            thHeight:"=",//
            fetchDataFunction:"=",//回调函数
            hasCheckbox:"=",//第一列是否显示 checkbox
            inputType:"@",//0 表示 checkbox 1 表示单选
            pageCkFlag:"=",//全选
            checkedList:"=", //选中的数据列表
            checkedListKey:"=",
            // currentPageNum:"="
            settingFlag:"=", //判断是否有最后一列的设置表头
            filterFlag:"=", //判断是否有最后一列的筛选标识
            operateMenuListFun:"=",//操作项的回调逻辑
            trClickFunction:"=",//整行点击回调
            trClickClass:"=",
        },
        restrict: 'EA',
        template: '<div class="table-wrap" style="overflow-x:hidden">'+
                        '<!--筛选条件-->'+
                        '<div class="filter-condition-list" ng-if="filterConditionFlag">'+
                            '<ul class="filter-condition-ul">'+
                                '<li class="filter-condition-item" ng-repeat="colData in showColumns track by $index" ng-if="colData.showFilterValue&&colData.showFilterValue!=\'\'">'+
                                    '<span class="filter-name">{{colData.title}}:{{colData.showFilterValue}}</span>'+
                                    '<i class="lk-icon lk-icon-close-o" ng-click="clearSelectCon($index)"></i>'+
                                '</li>'+
                            '</ul>'+
                        '</div>'+
                        '<div class="table-container" ng-mouseleave="outTableBody()" id="tableContainer{{tableId}}">'+
                        
                        '<!--头部 ng-if="hiddenFixedTableLong"-->'+
                        '<div class="tableDiv table-header"  >'+

                            '<table class="table table-hover ">'+
                                '<thead>'+
                                    '<tr style="z-index:10">'+
                                        '<th ng-if="hasCheckbox&&showColumns.length!=0" style="max-width:40px;min-width:40px;width:40px;"   rowspan="{{showColumns.length!=repeatTdColumns.length?2:1}}"><input  type="checkbox" name="" ></th>'+
                                        '<th ng-repeat="thData in showColumns track by $index" key="{{thData.key}}" rowspan="{{thData.rowspan?thData.rowspan:1}}" colspan="{{thData.colspan?thData.colspan:1}}" ng-style={"min-width":thData.width+"px","max-width":thData.width+"px"}  title="{{thData.title}}"><span class="th-cell" >'+
                                            
                                            '<span ng-if="!thData.thRender">{{thData.title}}</span>'+
                                            '<span ng-if="thData.thRender" bind-html-scope="parentScope" bind-html-compile="thData.thRender(tdData,$index)"></span>'+
                                            
                                            '<div class="sort-area"  ng-mouseover="sortOver($event,$index,(thData.sortKey?thData.sortKey:thData.key))" ng-mouseleave="sortOut($event)">'+
                                                '<span class="sort-area-label" ng-show="thData.sortFlag&&sortField!=(thData.sortKey?thData.sortKey:thData.key)">'+
                                                    '<i class="lk-icon lk-icon-arrowD"></i>'+
                                                '</span>'+
                                                '<span ng-if="thData.sortFlag&&sortField&&sortDirection==\'DESC\'&&sortField==(thData.sortKey?thData.sortKey:thData.key)" class="sort-img-icon sort-img-desc-icon sort-img-desc-icon-active" style="margin-top:3px;"></span>'+
                                                '<span ng-if="thData.sortFlag&&sortField&&sortDirection==\'ASC\'&&sortField==(thData.sortKey?thData.sortKey:thData.key)" class="sort-img-icon sort-img-asc-icon sort-img-asc-icon-active" style="margin-top:3px;"></span>'+
                                            '</div>'+
                                                                                        
                                            // '<span ng-if="thData.sortFlag" class="trangleDown" ng-class="{trangleOn:sortField==(thData.sortKey?thData.sortKey:thData.key)&&sortDirection==\'DESC\'}"></span>'+
                                        '</span></th>'+

                                        '<th ng-if="settingFlag&&filterFlag" style="max-width:40px;min-width:40px;width:40px;padding: 0px 0px;text-align:center" ng-click="" rowspan="{{showColumns.length!=repeatTdColumns.length?2:1}}">'+
                                            '<div style="cursor: pointer;height:50%;position: absolute;top:0px;left:0px;width:100%;" title="设置表头" ><span style="position: absolute;top: 50%;margin-top: -9px;width: 100%;left: 0px;height:16px;" ng-if="settingFlag"><i class="lk-icon lk-icon-set-o text-blue" ng-click="showSettingMenu($event)"></i></span></div>'+
                                            '<div style="cursor: pointer;height:50%;position: absolute;bottom:0px;left:0px;width:100%;" title="筛选条件"><span style="position: absolute;bottom: 50%;margin-bottom: -6px;width: 100%;left: 0px;height:16px;" ng-if="filterFlag"><i class="lk-icon lk-icon-batch-o text-blue" ng-click="showFilterList($event)"></i></span></div>'+
                                        '</th>'+
                                        '<th ng-if="settingFlag&&!filterFlag" style="max-width:40px;min-width:40px;width:40px;padding: 8px 0px;text-align:center" ng-click="" rowspan="{{showColumns.length!=repeatTdColumns.length?2:1}}">'+
                                            '<span ><i class="lk-icon lk-icon-set-o text-blue" ng-click="showSettingMenu($event)"></i></span>'+
                                        '</th>'+
                                        '<th ng-if="filterFlag&&!settingFlag" style="max-width:40px;min-width:40px;width:40px;padding: 8px 0px;text-align:center" ng-click="" rowspan="{{showColumns.length!=repeatTdColumns.length?2:1}}">'+
                                            '<span ><i class="lk-icon lk-icon-batch-o text-blue" ng-click="showFilterList($event)"></i></span>'+
                                        '</th>'+
                                    '</tr>'+
                                    '<tr ng-if="showColumns.length!=repeatTdColumns.length">'+
                                        '<th ng-repeat="thData in repeatTdColumns track by $index" key="{{thData.key}}" ng-style={"min-width":thData.width+"px","max-width":thData.width+"px"} ng-if="thData.isChild" ng-click="sortListByField((thData.sortKey?thData.sortKey:thData.key),$event,thData.sortFlag)" title="{{thData.title}}">'+
                                        '{{thData.title}}'+
                                            '<div class="sort-area"  ng-mouseover="sortOver($event,$index,(thData.sortKey?thData.sortKey:thData.key))" ng-mouseleave="sortOut($event)">'+
                                                '<span class="sort-area-label" ng-show="thData.sortFlag&&sortField!=(thData.sortKey?thData.sortKey:thData.key)">'+
                                                    '<i class="lk-icon lk-icon-arrowD"></i>'+
                                                '</span>'+
                                                '<span ng-if="thData.sortFlag&&sortField&&sortDirection==\'DESC\'&&sortField==(thData.sortKey?thData.sortKey:thData.key)" class="sort-img-icon sort-img-desc-icon sort-img-desc-icon-active" style="margin-top:3px;"></span>'+
                                                '<span ng-if="thData.sortFlag&&sortField&&sortDirection==\'ASC\'&&sortField==(thData.sortKey?thData.sortKey:thData.key)" class="sort-img-icon sort-img-asc-icon sort-img-asc-icon-active" style="margin-top:3px;"></span>'+
                                            '</div>'+
                                        '</th>'+
                                    '</tr>'+
                                '</thead>'+
                            '</table>'+
                        '</div>'+

                        '<!--排序的下拉-->'+
                        '<div class="table-sort-list" ng-mouseover="sortListOver()" ng-mouseleave="sortListOut()" ng-style={"left":sortLeft+"px"} ng-show="sortLeft!=-1">'+
                            '<ul class="table-sort-ul">'+
                                '<li class="table-sort-item" ng-click="selectSort(\'DESC\')">'+
                                    '<i class="sort-img-icon sort-img-desc-icon" ng-class={"sort-img-desc-icon-active":fieldSt==sortField&&sortDirection=="DESC"}></i>'+
                                    '<span class="sort-item-name" ng-class={"sort-item-name-active":fieldSt==sortField&&sortDirection=="DESC"}>降序</span>'+
                                '</li>'+
                                '<li class="table-sort-item" ng-click="selectSort(\'ASC\')">'+
                                    '<i class="sort-img-icon sort-img-asc-icon" ng-class={"sort-img-asc-icon-active":fieldSt==sortField&&sortDirection=="ASC"}></i>'+
                                    '<span class="sort-item-name" ng-class={"sort-item-name-active":fieldSt==sortField&&sortDirection=="ASC"}>升序</span>'+
                                '</li>'+
                            '</ul>'+
                        '</div>'+


                        '<!--左侧悬浮-->'+
                        
                        '<div class="tableDiv table-columns-left"  ng-style={"width":colHeaderLeftWidth+"px"} ng-class={"box-right-shadow":scrollLeftNum} ng-hide="hiddenFixedTable&&!hasCheckbox">'+
                            '<div class="tableDiv table-header-columns-left" ng-style={"width":colHeaderLeftWidth+"px"} ng-class={"box-right-shadow":scrollLeftNum} > '+
                                '<table class="table table-hover ">'+
                                    '<thead>'+
                                        '<tr ng-style={"height":thHeight}>'+
                                             '<th ng-if="hasCheckbox&&showColumns.length!=0" style="max-width:40px;min-width:40px;width:40px;" rowspan="{{showColumns.length!=repeatTdColumns.length?2:1}}"><span id="all" style="position:absolute;left:-4px;top:30px;"></span><input  type="checkbox" name="" ng-change="allCheck()" class="parentCheckBox" ng-model="$parent.parentCheck" ng-show="inputType==\'0\'"></th>'+

                                            '<th  key="{{thData.key}}" ng-style={"min-width":thData.width+"px","max-width":thData.width+"px"} ng-repeat="thData in showColumns track by $index" ng-if="thData.fixed==\'left\'" ng-click="sortListByField((thData.sortKey?thData.sortKey:thData.key),$event,thData.sortFlag)">'+
                                                '{{thData.title}}'+
                                                '<div class="sort-area"  ng-mouseover="sortOver($event,$index,(thData.sortKey?thData.sortKey:thData.key))" ng-mouseleave="sortOut($event)">'+
                                                    '<span class="sort-area-label" ng-show="thData.sortFlag&&sortField!=(thData.sortKey?thData.sortKey:thData.key)">'+
                                                        '<i class="lk-icon lk-icon-arrowD"></i>'+
                                                    '</span>'+
                                                    '<span ng-if="thData.sortFlag&&sortField&&sortDirection==\'DESC\'&&sortField==(thData.sortKey?thData.sortKey:thData.key)" class="sort-img-icon sort-img-desc-icon sort-img-desc-icon-active" style="margin-top:3px;"></span>'+
                                                    '<span ng-if="thData.sortFlag&&sortField&&sortDirection==\'ASC\'&&sortField==(thData.sortKey?thData.sortKey:thData.key)" class="sort-img-icon sort-img-asc-icon sort-img-asc-icon-active" style="margin-top:3px;"></span>'+
                                                '</div>'+
                                            '</th>'+
                                        '</tr>'+
                                    '</thead>'+
                                '</table>'+
                            '</div>'+
                            '<div class="tableDiv table-body-columns-left" style="margin-top:{{(filterFlag&&filterShow)?(tdHeight+2):0}}px" ng-style={"height":setTableHeightCur?(setTableHeightCur-scrollBarHeight-((filterFlag&&filterShow)?tdHeight:0)+"px"):"auto"} ng-if="data.length!=0">'+
                                '<table class="table table-hover " style="border-top:none">'+
                                    '<tbody>'+
                                    '<tr  ng-repeat="tdData in data track by $index" ng-mouseout="hoverOut($index)" ng-mouseover="bindHover($index)" ng-class={"tr-hover":curHoverColNum==$index,"tr-click":curClickColNum==$index} ng-click="clickTrFunction($event,$index,tdData)">'+
                                        '<td ng-click="stopPro($event)"ng-if="hasCheckbox&&showColumns.length!=0" style="max-width:40px;min-width:40px;width:40px;"><input ng-model="childCheck[$index]" type="checkbox" name="" class="child-checkbox" ng-change="singleCheck($index)" ng-disabled="pageCkFlag"></td>'+
                                        
                                        '<td ng-repeat="tdName in showColumns | filter:{fixed:\'left\'}" ng-style={"min-width":tdName.width+"px","max-width":tdName.width+"px"} ng-class={"td-no-space":!tdName.tdPadding&&tdName.tdPadding!=undefined}>'+
                                            // '{{tdName.tdPadding}}'+
                                            '<!--需要title-->'+
                                            '<span ng-if="!tdName.dirList&&!tdName.render&&tdName.tipFlag" title="{{tdData[tdName.key]}}">{{(tdData[tdName.key]||tdData[tdName.key]==0)?tdData[tdName.key]:\'-\'}}</span>'+
                                            
                                            '<!--不需要title  -->'+
                                            '<span class="td-span" ng-if="!tdName.dirList&&tdName.render&&!tdName.tipFlag"  bind-html-scope="parentScope" bind-html-compile="tdName.render(tdData,$parent.$parent.$index,$index)">'+
                                            '</span>'+

                                            '<!--数据字典  -->'+
                                            '<span ng-if="tdName.dirList&&!tdName.tipFlag">'+
                                                '{{tdData[tdName.key] | dictionaryFilter : tdName.dirList : tdName.dirKeyValue}}'+
                                            '</span>'+

                                            '<span ng-if="!tdName.dirList&&!tdName.render&&!tdName.tipFlag">'+
                                                '{{(tdData[tdName.key]||tdData[tdName.key]==0)?tdData[tdName.key]:\'-\'}}'+
                                            '</span>'+

                                        '</td>'+
                                    '</tr>'+
                                    '</tbody>'+
                                '</table>'+
                            '</div>'+
                        '</div>'+

                        '<!--右侧悬浮 ng-class={"box-left-shadow":isToRightNum!==0}-->'+
                        '<div class="tableDiv table-columns-right" ng-style={"width":colHeaderRightWidth+"px","border":(colHeaderRightWidth==0?"0px":"")}  ng-hide="hiddenFixedTable" >'+
                            '<div class="tableDiv table-header-columns-right" ng-style={"width":colHeaderRightWidth+"px"} ng-class={"box-left-shadow":isToRightNum!==0} > '+
                                '<table class="table table-hover ">'+
                                    '<thead>'+
                                        '<tr>'+
                                            '<th  key="{{thData.key}}" ng-style={"min-width":thData.width+"px","max-width":thData.width+"px"} ng-repeat="thData in showColumns track by $index" ng-if="thData.fixed==\'right\'"><span class="th-cell" >{{thData.title}}</span></th>'+
                                            '<th ng-if="settingFlag||filterFlag" style="max-width:40px;min-width:40px;width:40px;padding: 8px 0px;text-align:center" rowspan="{{showColumns.length!=repeatTdColumns.length?2:1}}" ng-style={"height":thHeight+"px"} >'+
                                                '<span ng-if="settingFlag"><i class="lk-icon-set-o lk-icon text-blue" ng-click="showSettingMenu($event)"></i></span>'+
                                                '<span ng-if="filterFlag"><i class="lk-icon lk-icon-batch-o text-blue" ng-click="showFilterList($event)"></i></span>'+
                                            '</th>'+
                                        '</tr>'+
                                    '</thead>'+
                                '</table>'+
                            '</div>'+
                            '<div class="tableDiv table-body-columns-right" style="overflow-x:hidden!important" ng-style={"height":setTableHeightCur?(setTableHeightCur-(hiddenFixedTableLong?0:thHeight)-scrollBarHeight+"px"):"auto"} ng-if="data.length!=0" scroll-config="{horizrailenabled:false}">'+
                                '<table class="table table-hover " style="border-top:none" >'+
                                    '<tbody>'+
                                    '<tr ng-if="data.length!=0" ng-repeat="tdData in data track by $index" ng-mouseout="hoverOut($index)" ng-mouseover="bindHover($index)" ng-class={"tr-hover":curHoverColNum==$index,"tr-click":curClickColNum==$index} ng-click="clickTrFunction($event,$index,tdData)">'+
                                        '<td ng-repeat="tdName in showColumns | filter:{fixed:\'right\'}" ng-style={"min-width":tdName.width+"px","max-width":tdName.width+"px"} ng-class={"td-no-space":!tdName.tdPadding&&tdName.tdPadding!=undefined}>'+
                                           
                                        '<!--需要title-->'+
                                        '<span ng-if="!tdName.dirList&&!tdName.render&&tdName.tipFlag" title="{{tdData[tdName.key]}}">{{(tdData[tdName.key]||tdData[tdName.key]==0)?tdData[tdName.key]:\'-\'}}</span>'+
                                        
                                        '<!--不需要title  -->'+
                                        '<span class="td-span" ng-if="!tdName.dirList&&tdName.render&&!tdName.tipFlag"  bind-html-scope="parentScope" bind-html-compile="tdName.render(tdData,$parent.$parent.$index,$index)">'+
                                        '</span>'+

                                        '<!--数据字典  -->'+
                                        '<span ng-if="tdName.dirList&&!tdName.tipFlag">'+
                                            '{{tdData[tdName.key] | dictionaryFilter : tdName.dirList : tdName.dirKeyValue}}'+
                                        '</span>'+

                                        '<span ng-if="!tdName.dirList&&!tdName.render&&!tdName.tipFlag">'+
                                            '{{(tdData[tdName.key]||tdData[tdName.key]==0)?tdData[tdName.key]:\'-\'}}'+
                                        '</span>'+

                                        '</td>'+
                                        '<td ng-if="settingFlag||filterFlag" style="max-width:40px;min-width:40px;padding:0px;width:40px;text-align:center">'+
                                            '<span></span>'+
                                        '</td>'+
                                    '</tr>'+
                                    '</tbody>'+
                                '</table>'+
                            '</div>'+
                        '</div>'+

                        
                        '<!--筛选条件区域-->'+
                        // '{{scrollLeftNum}}'+
                        '<div class="tableDiv table-filter"  ng-if="filterShow" style="margin-left: -{{scrollLeftNum}}px;">'+
                            '<table class="table table-hover ">'+
                                '<thead>'+
                                    '<tr style="z-index:10">'+
                                        '<td ng-if="hasCheckbox&&showColumns.length!=0" style="max-width:40px;min-width:40px;width:40px;"   rowspan="{{showColumns.length!=repeatTdColumns.length?2:1}}"></td>'+
                                        '<td class ="is-form-td" ng-repeat="thData in showColumns track by $index" key="{{thData.key}}" ng-style={"min-width":thData.width+"px","max-width":thData.width+"px"}  title="{{thData.title}}">'+

                                            '<!--单个组件-->'+
                                                '<div ng-if="!thData.filterRange">'+
                                                '<!--输入数字-->'+
                                                    '<div class="form-wrap" ng-if="thData.filterType==\'number\'" style="width:100%;">'+
                                                        '<input style="width:100%;" type="number" class="form-control" linkage-input placeholder="{{thData.title}}" ng-model="thData.filterValue" ng-keydown="searchDataByFilter($event,$index)">'+
                                                    '</div>'+
                                                '<!--输入文字-->'+
                                                    '<div class="form-wrap" ng-if="thData.filterType==\'text\'" style="width:100%;">'+
                                                        '<input style="width:100%;" type="text" class="form-control" linkage-input placeholder="{{thData.title}}" ng-model="thData.filterValue" ng-keydown="searchDataByFilter($event,$index)">'+
                                                    '</div>'+

                                                '<!--选择日期-->'+
                                                    '<div class="form-wrap" ng-if="thData.filterType==\'date\'" style="width:100%;">'+
                                                        
                                                        '<input style="width:100%;" type="text" class="form-control" datetimepicker change-fun="filterDateChange($index)" placeholder="{{thData.title}}" ng-model="thData.filterValue" ng-keydown="searchDataByFilter($event,$index)" >'+
                                                    '</div>'+

                                                '<!--下拉-->'+
                                                    '<div class="form-wrap" ng-if="thData.filterType==\'dir\'" style="width:100%;">'+
                                                        '<select type="text" class="form-control" linkage-select ng-model="thData.filterValue" ng-change="selectedComChange($index)" data-container="#tableContainer{{tableId}}">'+
                                                            '<option value="">请选择</option>'+  
                                                            '<option ng-repeat="key in thData.filterDirList track by $index" value="{{key[thData.filterKeyValueArray[0]]}}" >{{key[thData.filterKeyValueArray[1]]}}</option>'+
                                                          '</select>'+
                                                        // '<input style="width:100%;" type="text" class="form-control" datetimepicker placeholder="{{thData.title}}" ng-model="thData.filterValue" ng-keydown="searchDataByFilter($event)">'+
                                                    '</div>'+

                                                '</div>'+

                                            '<!--区间组件-->'+
                                                '<div ng-if="thData.filterRange">'+
                                                

                                                '<!--输入区间数字 或者文字-->'+
                                                    '<div class="form-wrap" ng-if="thData.filterType==\'text\'||thData.filterType==\'number\'" style="width:100%">'+
                                                        // 
                                                        '<div class="dropdown range-dropdown" >'+
                                                            '<input style="width:100%;background: #fff;" type="text" class="form-control" linkage-input placeholder="{{thData.title}}范围" ng-model="thData.filterValue" readonly data-toggle="dropdown" aria-haspopup="true" aria-expanded="true">'+
                                                            '<div class="dropdown-menu " aria-labelledby="dropdownMenu1" style="width:250px;" ng-click="stopPro($event)"> '+
                                                                '<div class="range-div">'+
                                                                    '<div class="form-wrap" >'+
                                                                        '<input style="width:100px;" type="text" class="form-control" placeholder="{{thData.title}}" ng-model="thData.filterRangeStart">'+
                                                                    '</div>'+
                                                                    '<span class="range-label">~</span>'+
                                                                    '<div class="form-wrap" >'+
                                                                        '<input style="width:100px;" type="text" class="form-control" placeholder="{{thData.title}}" ng-model="thData.filterRangeEnd">'+
                                                                    '</div>'+
                                                                '</div>'+
                                                                '<div class="btn-list">'+
                                                                    '<span class="btn btn-blue" ng-click="inputFilterValue($index,$event)">确定</span>'+
                                                                    '<span class="btn btn-blue btn-outline" ng-click="cancelFilterValue($event)">取消</span>'+
                                                                '</div>'+
                                                            '</div>'+
                                                            
                                                        '</div>'+
                                                    '</div>'+
                                                    
                                                '<!--选择区间日期-->'+

                                                    '<div class="form-wrap"  style="width:100%;" ng-if="thData.filterType==\'date\'">'+ 
                                                        '<input style="width:100%;background: #fff;" type="text" class="form-control" datetimepicker date-range="~" change-fun="filterDateChange($index)" placeholder="{{thData.title}}范围" ng-model="thData.filterValue" readonly>'+
                                                    '</div>'+
                                                '</div>'+

                                        '</td>'+
                                        '<td ng-if="settingFlag||filterFlag" style="max-width:40px;min-width:40px;width:40px;padding: 8px 0px;text-align:center" >'+

                                        '</td>'+
                                    '</tr>'+
                                '</thead>'+
                            '</table>'+
                        '</div>'+


                        '<!--主体内容 linkage-scroll-->'+
                        '<div class="tableDiv table-body"  ng-style={"height":setTableHeightCur?(setTableHeightCur-((filterFlag&&filterShow)?(tdHeight+1):0)+"px"):"auto"}  >'+  
                            '<div class="table-con-true" ng-if="data.length!=0"></div>'+
                            '<div style="position:absoulte;" class="table-parent">'+
                            '<table class="table table-hover " ng-if="data.length!=0" >'+
                                '<tbody>'+
                                '<tr ng-if="data.length!=0" ng-repeat="tdData in data track by $index" ng-mouseout="hoverOut($index)" ng-mouseover="bindHover($index)" ng-class={"tr-hover":curHoverColNum==$index,"tr-click":curClickColNum==$index} ng-click="clickTrFunction($event,$index,tdData)">'+
                                    
                                    '<td ng-if="hasCheckbox&&showColumns.length!=0" style="max-width:40px;min-width:40px;width:40px;"><input  type="checkbox" name="" ></td>'+
                                    '<td  ng-repeat="tdName in repeatTdColumns track by $index" ng-style={"min-width":tdName.width+"px","max-width":tdName.width+"px"}  ng-class={"is-form-td":tdName.isForm,"td-no-space":!tdName.tdPadding&&tdName.tdPadding!=undefined}>'+
                                        '<!--需要title-->'+
                                        '<span class="td-span" ng-if="!tdName.dirList&&!tdName.render&&tdName.tipFlag" title="{{tdData[tdName.key]}}">{{(tdData[tdName.key]||tdData[tdName.key]==0)?tdData[tdName.key]:\'-\'}}</span>'+
                                        
                                        '<!--不需要title  -->'+
                                        '<span class="td-span" ng-if="!tdName.dirList&&tdName.render&&!tdName.tipFlag"  bind-html-scope="parentScope" bind-html-compile="tdName.render(tdData,$parent.$parent.$index,$index)">'+
                                        '</span>'+

                                        '<!--数据字典  -->'+
                                        '<span ng-if="tdName.dirList&&!tdName.tipFlag">'+
                                        // '{{tdName.dirList}}'+
                                            '{{tdData[tdName.key] | dictionaryFilter : tdName.dirList : tdName.dirKeyValue}}'+
                                        '</span>'+

                                        '<span class="td-span" ng-if="!tdName.dirList&&!tdName.render&&!tdName.tipFlag">'+
                                            '{{(tdData[tdName.key]||tdData[tdName.key]==0)?tdData[tdName.key]:\'-\'}}'+
                                        '</span>'+

                                    '</td>'+

                                    '<td ng-if="settingFlag||filterFlag" style="max-width:40px;min-width:40px;width:40px;padding:0px;text-align:center">'+
                                        '<span ></span>'+
                                    '</td>'+
                                    // 以下 td 是用于 操作悬浮列 
                                    '<td style="min-width:0px;width:0px;max-width:0px;padding: 0px;" ng-if="operateMenuListFun" ng-show="data[$index].operateMenuList.length>0">'+

                                        '<div class="operate-span" style="width:0px;" ng-class="{\'operate-span-open\':operateSpanOpen}" ng-style={"left":editeListLeft,"height":tdHeight} >'+
                                            
                                            
                                            '<span class="text-blue">'+
                                                // '<i class="lk-icon text-blue lk-icon-edit" style="cursor: pointer;" ></i>'+
                                                '<span ng-repeat="menu in data[$index].operateMenuList track by $index" ng-click="menuClick($event,menu.operateFun)" ng-if="$index==0">{{menu.menuName}}</span>'+
                                                '<i class="lk-icon text-blue lk-icon-arrowD" style="cursor: pointer;font-size: 12px;margin-left: 5px;" ng-if="data[$index].operateMenuList.length>1" ng-click="operateMenu($event,$index)"></i>'+
                                            '</span>'+
                                        '</div>'+
                                    '</td>'+

                                '</tr>'+
                                '</tbody>'+
                                '<tfoot ng-if="footerColumns">'+
                                    '<tr >'+
                                        '<td ng-click="closeTfoot()" class="first"></td>'+
                                        '<td colspan="3" class="second">'+
                                            '<ul>'+
                                                '<li class="li_active" ng-click="chooseTotal(0)" ng-class={"li_active":totalNumIndex==0}>总计</li>'+
                                                '<li ng-click="chooseTotal(1)" ng-class={"li_active":totalNumIndex==1}>平均</li>'+
                                                '<li ng-click="chooseTotal(2)" ng-class={"li_active":totalNumIndex==2}>最大</li>'+
                                                '<li ng-click="chooseTotal(3)" ng-class={"li_active":totalNumIndex==3}>最小</li>'+
                                            '</ul>'+
                                        '</td>'+
                                        '<td ng-repeat="tfData in curFtData track by $index">'+
                                            '{{tfData[footerColumns[$index]]}}'+
                                        '</td>'+
                                    '</tr>'+
                                '</tfoot>'+
                            '</table>'+
                            //table行选中样式
                            '<div class="tr-click-label" ng-style={"top":trClickOffset.top+"px"} ng-if="curClickColNum!=-1">'+
                                '<div class="tr-click-label-con">'+
                                    '<i class="lk-icon lk-icon-arrowL" style="color:#fff"></i>'+
                                '</div>'+
                            '</div>'+ 
                            '</div>'+
                            '<no-data img-width="150" ng-style={"width":swtTotalWidth+"px"} ng-show="data.length==0" style="margin-top:60px;margin-bottom:20px;min-width:100%"></no-data>'+
                        '</div>'+

                        // 设置列表头部的显影和顺序
                        '<div class="lk-dropdown " style="position:absolute;right:0px;top:42px;width:190px;z-index:12;max-height:350px" ng-if="showSeting" id="settingDropMenuId">'+
                           
                            '<div class="lk-dropdown-con">'+
                                '<ul class="lk-dropdown-menu" style="max-height:125px">'+
                                    '<li class="lk-dropdown-item" style="width: 100%;" ng-repeat="col in editeHeaderColumns track by $index">'+
                                        '<span class="checkbox-label-item" style="width: 100%;margin-right: 0;">'+

                                            // ''+
                                            '<label  class="checkbox-lable ellipsis" style="width: 100%;" title="{{col.title}}"><input type="checkbox" class=""  ng-model="col.showHFg" >&nbsp;{{col.title}}</label>'+
                                        '</span>'+
                                    '</li>'+
                                '</ul>'+
                                '<div class="btn-dropdown btn-list">'+
                                    '<span class="btn btn-red" ng-click="submitSettingShowColums()">确定</span>'+
                                '</div>'+
                            '</div>'+
                        '</div>'+

                        // 每行的编辑功能  
                       '<div class="lk-dropdown lk-select-dropdown animeted fade-in-big-height" style="position:absolute;z-index:11" ng-style={"top":operateTdOffset.top+"px","right":operateTdOffset.right} ng-if="operateMenuShow" ng-mouseover="mouseOverOperate()" ng-mouseleave="mouseLeaveOperate()">'+
                            '<div class="lk-dropdown-con">'+   
                                '<span class="dropdown-menu-triangle"></span>'+  
                                '<ul class="lk-dropdown-menu">'+
                                    '<li class="lk-dropdown-item" ng-repeat="menu in operateMenuList track by $index" ng-click="menuClick($event,menu.operateFun)" ng-if="$index>0">{{menu.menuName}}</li>'+
                                '</ul>'+
                            '</div>'+
                        '</div>'+
                        
                    '</div>'+
                    // '<crm-item-pagination response-total-size="totalpage" get-data-function="action" current-page-num="currentPageNum" current-page-size="2" is-simple="false"></crm-item-pagination>'+
                '</div>',
        replace: true,
        link: function(scope, element, attributes, controller) {
            scope.element = element;

            scope.tableId = tableNum++;

            scope.parentScope = scope.$parent;

            scope.isFirst = true; //判断是不是 第一次进来
            
            scope.colHeaderRightWidth = 0;// 右侧悬浮头部宽度
            
            scope.colHeaderLeftWidth  = 0;// 左侧悬浮宽度
            
            scope.scrollLeftNum = 0;// body区域滚动left值
            
            scope.scrollTopNum = 0;// body区域滚动top值
            
            scope.isToRightNum = -1;// 滚动条到达右侧的数值
            
            scope.curHoverColNum = -1;// 鼠标滑过table

            // console.log("scope.setTableHeight:"+scope.setTableHeight);
            scope.setTableHeightCur = (scope.setTableHeight&&scope.setTableHeight<100)?100:scope.setTableHeight;

            scope.curClickColNum = -1;// 鼠标点击table

            // scope.scrollBarWidth = 0;//获取滚动条的宽度  为0  表示 没有滚动条
            scope.scrollBarWidth = getScrollbarWidth();//获取滚动条的宽度  为0  表示 没有滚动条

            // scope.scrollBarHeight = 0;//获取滚动条的高度  为0  表示 没有滚动条
            scope.scrollBarHeight = getScrollbarWidth();//获取滚动条的高度  为0  表示 没有滚动条

            scope.hiddenFixedTable = false; //判断是否 出现悬浮的列

            scope.hiddenFixedTableLong = true; //判断是否 出现悬浮的列

            scope.thHeight = scope.thHeight?scope.thHeight:28;//获取th的高度
            scope.tdHeight = scope.thHeight?scope.thHeight:28;//获取td的高度

            scope.showColumns = [];//编辑表头的显示字段
            scope.showSeting = false;//是否显示 编辑表头
            scope.editeHeaderColumns = [];//编辑表头的操作的数据
            scope.editeHeaderColumnsOld = [];//用于保存编辑前的数据

            scope.repeatTdColumns = [];//用于去循环 td 数据的（最早的时候因为没有合并列和合并行的问题，所以直接使用额了传进来的Columns）

            scope.operateSpanOpen = false;//是否已经打开下拉

            // scope.filterConditionList = [];//表头处显示筛选条件

            scope.filterConditionFlag = false;//是否现在有筛选条件 默认没有筛选条件

            // 操作列的 下拉 出现的 位置

            scope.operateTdOffset = {
                top:0,
                right:20
            }

            // 点击的行的背景icon 所处的位置

            scope.trClickOffset = {
                top:0,
                right:0
            }


            scope.operateMenuShow = false;
            scope.operateSpanOpen = false;
            scope.operateMenuList = [];


            // 操作列识别的字段名
            scope.tableControlName = "tableControl";


            scope.totalNumIndex = 0;
            scope.curFtData = scope.footerData?footerData[0]:[];


            scope.parentCheck = false;

            scope.childCheck = [];

            scope.hasScroll = false;//纵向是否出现滚动条

            scope.editeListLeft = 0;

            scope.pageCkFlagNum = (attributes.pageCkFlag?true:false);//是否需要跨页全选

            scope.pageCkFlag = false;//是否跨页全选了

            scope.inputType = scope.inputType?"1":"0";

            scope.filterShow = false;

            scope.swtTotalWidth = 0;//头部总宽度

            scope.sortLeft = -1;//排序下拉的定位的left

            scope.sortTimer ;//悬浮排序的下拉

            scope.sortIndex = "";//排序是第几个

            // scope.tableWidth = 0;


            // 监听data数据的变化
            scope.$watch('data',function(newValue,oldValue){
                // if(newValue!=oldValue){
                
                // $(element[0]).find(".parentCheckBox").prop("checked",false);

                if(!newValue)return ;

                $timeout(function(){
                    // getScrollWidth();
                    initScrollTop();
                    if(scope.isFirst){
                        bindScroll();
                        scope.isFirst = false;
                    }

                    scope.childCheck = [];

                    // scope.thHeight = angular.element(element[0]).find('.table-header').height();
                    // scope.tdHeight = angular.element(element[0]).find('.table-body td').height();

                    if(scope.showColumns.length!=scope.repeatTdColumns.length){
                        scope.thHeight = scope.thHeight*2;
                    }

                    var totalBodyHeight = newValue.length*scope.tdHeight+scope.thHeight;
                    
                    
                    // 判断该table纵向是否会出现 滚动条

                    // if(angular.element(element[0]).find('.table-body').height()>totalBodyHeight){
                    //     scope.hiddenFixedTableLong = false;
                    // }


                    // 根据数据去初始化 checkbox的状态
                    if(scope.hasCheckbox){
                        for(var i = 0;i<scope.data.length;i++){
                            if(scope.data[i].selectFlag||scope.pageCkFlag){
                                scope.childCheck.push(true);
                                // scope.checkedList.push(scope.data[i]);
                            }else{
                                scope.childCheck.push(false);
                            }
                        }
                    }

                    
                    // 获取编辑列
                    var staticData = angular.copy(scope.data);
                    if(scope.operateMenuListFun){
                        for(var i = 0;i<scope.data.length;i++){
                            staticData[i].operateMenuList = scope.operateMenuListFun(i);
                        }
                        scope.data = staticData;
                    }

                    scope.hasScroll = scope.data.length*scope.tdHeight>scope.setTableHeightCur;

                },100)

            },true)

            // 监听到外部的表头发生改变的时候 
            scope.$watch('columns',function(newValue,oldValue){
                var swtTotalWidth = 0;
                if(newValue&&newValue.length>0){

                    // for(var i = 0;i<scope.columns.length;i++){
                    //     swtTotalWidth+=scope.columns[i].width
                    // }

                    // if(swtTotalWidth>angular.element(element[0]).find('.table-container').width()){
                    //     scope.hiddenFixedTable = false;
                    // }else{
                    //     scope.hiddenFixedTable = true;
                    // }

                    var columnsStatic = new Array(newValue.length);
                    for(var i = 0;i<newValue.length;i++){
                        columnsStatic[i] = newValue[i];
                        columnsStatic[i].showHFg = true;
                        if(columnsStatic[i].filterKeyValue!=undefined){
                            var keyValue = columnsStatic[i].filterKeyValue.split(',');
                            columnsStatic[i].filterKeyValueArray = keyValue;
                        }
                    }
                    angular.copy(columnsStatic,scope.editeHeaderColumns);
                    angular.copy(columnsStatic,scope.editeHeaderColumnsOld);
                    scope.showColumns = newValue;

                    
                    initColHeader();
                }
            },true)


            // 监听到设置表头 
            scope.$watch('showColumns',function(newValue,oldValue){

                var swtTotalWidth = 0;
                var repeatTdColumnsStatic = [];
                $timeout(function(){
                    scope.editeListLeft = angular.element(element[0]).find('.table-parent').width()-100;
                },200)

                scope.filterConditionFlag = false;

                if(newValue&&newValue.length>0){
                    for(var i = 0;i<scope.showColumns.length;i++){
                        swtTotalWidth+=scope.showColumns[i].width;

                        if(scope.showColumns[i].colspanList&&scope.showColumns[i].colspanList.length>0){
                            for(var j = 0;j<scope.showColumns[i].colspanList.length;j++){

                                scope.showColumns[i].colspanList[j].isChild = true;//判断是都是 合并行 出现的子的 表头项
                                if(scope.showColumns[i].fixed){
                                    repeatTdColumnsStatic.fixed = scope.showColumns[i].fixed;
                                }
                                repeatTdColumnsStatic.push(scope.showColumns[i].colspanList[j]);
                                
                            }
                        }else{

                            repeatTdColumnsStatic.push(scope.showColumns[i]);

                        }

                        if(!myCommon.isEmpty(scope.showColumns[i].showFilterValue)){
                            scope.filterConditionFlag = true;
                        }

                    }

                     // 初始化 td 显示字段显示对应的 变量
                     scope.repeatTdColumns = repeatTdColumnsStatic;

                    if(swtTotalWidth>angular.element(element[0]).find('.table-container').width()){
                        scope.hiddenFixedTable = false;
                    }else{
                        scope.hiddenFixedTable = true;
                    }

                    scope.swtTotalWidth = swtTotalWidth;

                    // scope.showColumns = newValue;
                }
            },true)

            // 

            scope.$watch('spaceheight',function(newValue,oldValue){
                if(newValue){
                    // 计算table的高度
                    // scope.tableHeight = document.body.clientHeight - scope.spaceheight;
                }
            })

            // 
            scope.$watch('childCheck',function(nv,ov){
                scope.checkedList = [];
                for(var i = 0;i<nv.length;i++){
                    if(nv[i]){
                        scope.checkedList.push(scope.data[i]);
                    }
                }
                if(scope.data){
                    if(scope.checkedList.length==scope.data.length){
                        scope.parentCheck = true;
                    }else{
                        scope.parentCheck = false;
                    }
                    if(scope.data.length === 0){
                        scope.parentCheck = false;
                    }
                }

                
            },true)


             scope.$watch('checkedList',function(nv,ov){
                // console.log(nv);
            },true)

             scope.$watch('setTableHeight',function(nv,ov){
                if(nv&&nv!=ov){
                    scope.setTableHeightCur  = nv>100?nv:100;
                }
             })
            // scope.$watch('pageCkFlag',function(nv,ov){
                // if(nv==undefined) return;
                // scope.parentCheck = true;



            // })

            
            // 绑定滚动条滚动
            
            // 初始化固定纵向的头的宽度
            function initColHeader(){
                scope.colHeaderRightWidth = 0;
                scope.colHeaderLeftWidth = 0;
                scope.showColumns = scope.showColumns?scope.showColumns:[];
                for(var i = 0;i < scope.columns.length;i++){
                    if(scope.showColumns[i].fixed=="left"){
                        scope.colHeaderLeftWidth += scope.showColumns[i].width;
                    }else  if(scope.showColumns[i].fixed=="right"){
                        scope.colHeaderRightWidth += scope.showColumns[i].width;
                    }
                }

                // 判断如果存在右边悬浮的时候table的时候 需要追加一个 滚动条的宽度
                if(scope.colHeaderRightWidth!=0||scope.settingFlag){
                    scope.colHeaderRightWidth+=scope.scrollBarHeight;
                }
                

                if(scope.settingFlag){
                    scope.colHeaderRightWidth+=40;//判断是否 设置 的flag是打开的
                }

                if(scope.hasCheckbox){
                    scope.colHeaderLeftWidth+=40;
                }
            }

           
            angular.element(window).on('resize',function(){
                var swtTotalWidth = 0;

                if(scope.showColumns&&scope.showColumns.length>0){
                    for(var i = 0;i<scope.showColumns.length;i++){
                        swtTotalWidth+=scope.showColumns[i].width
                    }

                    if(swtTotalWidth>angular.element(element[0]).find('.table-container').width()){
                        scope.hiddenFixedTable = false;
                    }else{
                        scope.hiddenFixedTable = true;
                    }
                }

                scope.editeListLeft = angular.element(element[0]).find('.table-parent').width()+scope.scrollLeftNum-100
            //     // console.log(scope.editeListLeft);

                scope.$apply();

            })

            // scope.resize = function(){
            //     // scope.aa = scope.scrollBarWidth;
            //     // angular.element(scope.spaceDiv).siblings();
            //     var spaceList = scope.
            //     for(){

            //     }
            // }

            // 绑定滚动条滚动
            function bindScroll(){



                // 绑定中间主区域的滚动事件
                angular.element(element[0]).find('.table-body').on('scroll',function(){

                    // console.log("2131")

                    scope.scrollLeftNum = angular.element(element[0]).find('.table-body').scrollLeft();

                    scope.editeListLeft = angular.element(element[0]).find('.table-parent').width()+scope.scrollLeftNum-100;
                    // console.log(scope.editeListLeft)
                    scope.isToRightNum = angular.element(element[0]).find('.table-body .table').width()-angular.element(element[0]).find('.table-body').width()-scope.scrollLeftNum;
                    scope.scrollTopNum = angular.element(element[0]).find('.table-body').scrollTop();

                    // console.log("scrollLeftNum:",scope.scrollLeftNum)

                    angular.element(element[0]).find('.table-header').scrollLeft(scope.scrollLeftNum);
                    // console.log(scope.filterFlag)
                    if(scope.filterFlag&&scope.filterShow){
                        // angular.element(element[0]).find('.table-filter').scrollLeft(scope.scrollLeftNum)
                    }

                    angular.element(element[0]).find('.table-body-columns-left').scrollTop(scope.scrollTopNum)
                    angular.element(element[0]).find('.table-body-columns-right').scrollTop(scope.scrollTopNum)

                    scope.$apply()
                });


                // 绑定右侧悬浮区域的滚动效果
                angular.element(element[0]).find('.tableDiv .table-body-columns-right').on('scroll',function(){

                    scope.scrollTopNum = angular.element(element[0]).find('.table-body-columns-right').scrollTop();

                    // console.log(scope.scrollTopNum);
                    // scope.isMyScroll = false;

                    angular.element(element[0]).find('.table-body-columns-left').scrollTop(scope.scrollTopNum)
                    angular.element(element[0]).find('.table-body').scrollTop(scope.scrollTopNum)

                    scope.$apply()
                })
            }

            var timer,timer1;
            scope.hoverOut = function(index){

                timer = $timeout(function(){
                    scope.curHoverColNum=-1;
                    // scope.operateMenuShow = false;
                    // scope.operateSpanOpen = false;
                },100)
            }

            // 显示滑动tr的效果
            scope.bindHover = function(index){
                
                $timeout.cancel(timer);
                $timeout.cancel(timer1);
                if(scope.curHoverColNum===index) return;
                // console.log("--:",index);
                scope.curHoverColNum=index;
                scope.operateMenuShow = false;
                scope.operateSpanOpen = false;
            }


            // 绑定是否鼠标离开了 table的数据 div
            scope.outTableBody = function(){
                // console.log("outTableBody");
               
                hideOperateMenu();
            }

            // 获取滚动条的宽度和高度
            // function getScrollWidth(){

            //     scope.scrollBarWidth = $(element[0]).find('.table-body').width() - $(element[0]).find('.table-con-true').width();
            //     scope.scrollBarHeight = $(element[0]).find('.table-body').height() - $(element[0]).find('.table-con-true').height();
            // }

            // 排序下拉的时间
            scope.fieldSt = "";
            scope.sortOver = function(e,index,key){
                scope.sortIndex = index;
                scope.fieldSt = key;

                var sortLeftSt;
                if(angular.element(e.target).hasClass('sort-area')){
                    sortLeftSt= angular.element(e.target).offset().left;
                }else{
                    sortLeftSt = angular.element(e.target).parent().offset().left;
                }

                scope.sortLeft = sortLeftSt-75;
                
                // console.log(scope.sortLeft)
            }

            // 排序下拉的时间
            scope.sortOut= function(e){

                if(scope.sortTimer){
                    $timeout.cancel(scope.sortTimer)
                }
                
                scope.sortTimer =  $timeout(function(){
                    scope.sortLeft=-1;
                },100)
            }

            // 滑到 排序下拉
            scope.sortListOver = function(){
                $timeout.cancel(scope.sortTimer)
            }

            // 滑出 排序下拉
            scope.sortListOut = function(){
                scope.sortLeft=-1;

            }

            // 排序
            scope.selectSort = function(sortType){
                // scope.
                
                scope.sortDirection = sortType;
                scope.sortField = scope.fieldSt;
                scope.sortListByField();
                scope.sortLeft = -1;
            }


            // 收起操作下拉
            function hideOperateMenu(){
                scope.curHoverColNum=-1;
                scope.operateMenuShow = false;
                scope.operateSpanOpen = false;

            }

            scope.mouseOverOperate = function(){
                // console.log("mouseOverOperate")
                $timeout.cancel(timer);
            }

            scope.mouseLeaveOperate = function(){

                timer1 = $timeout(function(){
                    hideOperateMenu();
                },100)
                // 延时 判定是否 鼠标移到下拉 menu上了
                // if(timer!=undefined){
                //     $timeOut.cancel(timer);
                // }
                // timer = $timeout(function(){
                // console.log("mouseLeaveOperate")

                //     hideOperateMenu();
                // },100)
            }

            /**
            * 按照字段排序
            * **/
            scope.sortListByField = function (param) {

                // var clickTarget ;
                // if(angular.element(e.target).parents('th').length>0){
                //     clickTarget = angular.element(e.target).parents('th').find('.trangleUp');
                // }else{
                //     clickTarget = angular.element(e.target).find('.trangleUp');
                // }

                // if(clickTarget.hasClass('trangleOn')){
                //     scope.sortDirection = 'DESC';
                // }else {
                //     scope.sortDirection = 'ASC';
                // }
                
                scope.pagerCurrentNum = 1;
                scope.pagerGoNum = scope.pagerCurrentNum;//去到某一页输入框页码 （供输入框展示、修改用）

                $timeout(function(){
                   scope.fetchDataFunction(); 
                },100)
                
            };


            // function 有多个参数 将其格式成angular 识别的样子
            scope.formatParam = function(thisData,paramList,index){
                var returnParam =[]
                for(var i = 0;i<paramList.length;i++){

                    // 判断当前传过来的这个是 单值还是 array
                    if(typeof(paramList[i].paramKey)=="object"&&scope.isEmpty(paramList[i].isNormal)){
                        returnParam.push([]);
                        for(var j=0;j<paramList[i].paramKey.length;j++ ){
                            
                            var staticParam = {};
                            if(scope.isEmpty(paramList[i].isNormal)){
                                // staticParam[paramList[i].paramKey[j].paramKey] = thisData[paramList[i].paramKey[j].paramKey];
                                // returnParam[i].push({});
                                staticParam[paramList[i].paramKey[j].paramKey] = thisData[paramList[i].paramKey[j].paramKey];
                            }else{
                                // returnParam[i].push(paramList[i].paramKey);
                                
                            }

                            returnParam[i].push(staticParam);
                        }


                    }else{
                        if(paramList[i].paramKey=="$index"){
                            returnParam.push(index);
                        }else{
                            if(scope.isEmpty(paramList[i].isNormal)){
                                returnParam.push(thisData[paramList[i].paramKey]);
                            }else{
                                returnParam.push(paramList[i].paramKey);
                            }
                        }
                    }
                }
                return returnParam;
            }

            scope.formatCondition = function(thisData,conditionParam,index){

                var conditionParamText = conditionParam;


                if(scope.isEmpty(conditionParamText)){
                    return true;
                }
                
                for(key in thisData){
                    if(conditionParamText.indexOf(key)>-1){
                        var reg = new RegExp(key , "g")
                        conditionParamText = conditionParamText.replace(reg,thisData[key])
                    }
                }

                // console.log(conditionParamText);
                return eval(conditionParamText);
            }


            scope.isEmpty = function(value){
                return myCommon.isEmpty(value)
            }


            //  计算总计和平均最大最小
            function chooseTotal(number){
                scope.totalNumIndex = number;
                scope.curFtData = scope.footerData[number];
            }


            // 监听全选
            scope.allCheck=function(){


                if(scope.parentCheck){
                    for(var i=0;i<scope.childCheck.length;i++){
                        scope.childCheck[i] = true;
                    }    

                    if(scope.pageCkFlagNum){
                         var _html = '<div>'+
                                    '<span style="font-size:12px;color:#333333">已选中本页</span>'+
                                    '<span style="font-size:12px;color:#F15A22;padding:0px 5px"> {{data.length}}条 </span>'+
                                    '<span style="font-size:12px;color:#333333">记录，</span>'+
                                    '<span style="font-size:12px;color:#F15A22;cursor: pointer;padding:0px 5px" ng-click="pageCkClick()">点此全选</span>'+
                                    '<span style="font-size:12px;color:#333333">所有</span>'+
                                    '<span style="font-size:12px;color:#F15A22;padding:0px 5px"> {{responseTotalSize}}条 </span>'+
                                    '<span style="font-size:12px;color:#333333"> 记录</span>'+
                                '</div>';
                        scope.pageCkboxDialog = dialog({
                            skin: 'page-ck-dialog',
                            content: $compile(_html)(scope),
                            quickClose: true// 点击空白处快速关闭
                        }).show(angular.element(scope.element[0]).find('#all')[0]);
                    }

                   
                }else{
                    if(scope.pageCkFlagNum){
                        scope.pageCkFlag = false;
                    }
                    
                    for(var i=0;i<scope.childCheck.length;i++){
                        scope.childCheck[i] = false;
                    }
                }
            };

            /**
             * 单个按钮
             * */
            scope.singleCheck=function(index){

                if(scope.inputType=="1"){
                    for(var i=0;i<scope.childCheck.length;i++){
                        if(scope.childCheck[i]&&i!=index){
                            scope.childCheck[i] = false;
                        }
                    }

                }else{

                    var checkNum = 0;
                    var checkInputNum = scope.data.length;
                    for(var i=0;i<checkInputNum;i++){
                        if(scope.childCheck[i]){
                            checkNum++;
                        }
                    }
                    if(checkNum === checkInputNum){
                        scope.parentCheck = true;
                    }else{
                        scope.parentCheck = false;
                    }
                }

            };

            // 点击显示编辑表头的下拉
            scope.showSettingMenu = function(event){

                scope.showSeting = !scope.showSeting;

                angular.copy(scope.editeHeaderColumnsOld,scope.editeHeaderColumns);

            }

            // 显示筛选条件
            scope.showFilterList = function(e){
                scope.filterShow = !scope.filterShow;

                if(scope.filterShow){
                    $timeout(function(){
                        angular.element(element[0]).find('.table-filter').scrollLeft(scope.scrollLeftNum)
                    },50)
                }
            }

            // 编辑表头显示字段
            scope.submitSettingShowColums = function(){

                var showColumnsStatic = [];
                for(var i = 0;i<scope.editeHeaderColumns.length;i++){
                    if(scope.editeHeaderColumns[i].showHFg){
                        showColumnsStatic.push(scope.editeHeaderColumns[i]);
                    }
                }

                if(showColumnsStatic.length==0){
                    ngToast.danger('最少需要有一个头部')
                    return;
                }

                angular.copy(scope.editeHeaderColumns,scope.editeHeaderColumnsOld);

                scope.showColumns = showColumnsStatic;

                scope.showSeting = false;
                

            }

            // 点击当行显示 操作下拉
            scope.operateMenu = function(event,index){

                event.stopPropagation()


                scope.operateMenuShow = true;
                scope.operateSpanOpen = true;

                var eStatic = event ;

                var bodyScrollTop = angular.element(eStatic.target).parents('.table-body').scrollTop(); 

                scope.operateTdOffset.top = scope.thHeight*scope.curHoverColNum-angular.element(element[0]).find('.table-body').scrollTop()+scope.thHeight+scope.tdHeight/2+5;

            
                scope.operateMenuList = scope.operateMenuListFun(index);


            }

            // 点击区间里面的 区间值
            scope.inputFilterValue = function(index,e){

                scope.showColumns[index].filterValue = (scope.showColumns[index].filterRangeStart?scope.showColumns[index].filterRangeStart:0)+
                                                        "~"+(scope.showColumns[index].filterRangeEnd?scope.showColumns[index].filterRangeEnd:0);
                angular.element(e.target).parents('.range-dropdown').removeClass('open');
                scope.filterDateChange(index);
            }

            // 退出编辑 筛选区间值
            scope.cancelFilterValue = function(e){

                angular.element(e.target).parents('.range-dropdown').removeClass('open');

            }

            // 下拉 select组件
            scope.selectedComChange = function(index){

                $timeout(function(){
                   var v = myCommon.getParamValue(scope.showColumns[index].filterDirList,scope.showColumns[index].filterKeyValueArray[0],scope.showColumns[index].filterValue,scope.showColumns[index].filterKeyValueArray[1]);
                   scope.showColumns[index].showFilterValue = (v==-10000?"":v)
                   scope.fetchDataFunction(); 

                },100)

            }

            // 时间组件筛选条件是时间键入值
            scope.filterDateChange = function(index){

                $timeout(function(){
                   scope.showColumns[index].showFilterValue = scope.showColumns[index].filterValue;
                   scope.fetchDataFunction(); 

                },100)
            }

            // 清除已选择 条件
            scope.clearSelectCon = function(index){

                scope.showColumns[index].showFilterValue ="";
                scope.showColumns[index].filterValue ="";

                scope.showColumns[index].filterRangeEnd="";
                scope.showColumns[index].filterRangeStart="";

                scope.fetchDataFunction(); 

            }

            // 建入值 回车
            scope.searchDataByFilter = function(e,index){

                // 判定是否是 enter键
                if(e.keyCode==13){
                    $timeout(function(){
                       scope.showColumns[index].showFilterValue = scope.showColumns[index].filterValue;
                       scope.fetchDataFunction(); 
                    },100)
                }
            }


            // 操作按钮的点击
            scope.menuClick = function(e,fun){
                // console.log(fun)

                e.stopPropagation()
                fun(scope.data[scope.curHoverColNum],scope.curHoverColNum);

                // scope.curHoverColNum=-1;
                // scope.operateMenuShow = false;
                // scope.operateSpanOpen = false;

            }
            function getScrollbarWidth() {
                var oP = document.createElement('p'), styles = {
                    width: '100px',
                    height: '100px',
                    overflowY: 'scroll',
                }, i, scrollbarWidth;

                for (i in styles){
                    oP.style[i] = styles[i];
                }
                document.body.appendChild(oP);
                scrollbarWidth = oP.offsetWidth - oP.clientWidth;


                

                if(isIE()||isIE11()){
                    oP.removeNode(true);
            　　}else{
             　　　 oP.remove();
                }


                return scrollbarWidth;
            }

            scope.clickTrFunction = function(event,index,data){
                
                if(scope.trClickFunction){

                    var bodyScrollTop = angular.element(event.target).parents('.table-body').scrollTop(); 

                    // if(angular.element(event.target).hasClass("operate-span")){
                        scope.trClickOffset.top = angular.element(event.target).parents('tr').position().top+scope.tdHeight/2-9;
                    // }else{
                        // scope.operateTdOffset.top = angular.element(event.target).parents('.operate-span').position().top+scope.thHeight+scope.tdHeight/2+10;
                    // }
                    scope.curClickColNum = index;
                    scope.trClickFunction(data);
                }
            }

            // 阻止冒泡
            scope.stopPro = function(e){
                e.stopPropagation();
            }


            // 点击跨页全选
            scope.pageCkClick = function(){
                scope.pageCkFlag = true;
            }

            // 初始化悬浮列的滚动条
            function initScrollTop(){

                scope.scrollLeftNum = angular.element(element[0]).find('.table-body').scrollLeft();
                scope.editeListLeft = angular.element(element[0]).find('.table-parent').width()+scope.scrollLeftNum-100;
                // console.log(scope.editeListLeft)
                scope.isToRightNum = angular.element(element[0]).find('.table-body .table').width()-angular.element(element[0]).find('.table-body').width()-scope.scrollLeftNum+scope.scrollBarWidth;
                scope.scrollTopNum = angular.element(element[0]).find('.table-body').scrollTop();

                // console.log("scrollLeftNum:",scope.scrollLeftNum)
                angular.element(element[0]).find('.table-header').scrollLeft(scope.scrollLeftNum)
                angular.element(element[0]).find('.table-body-columns-left').scrollTop(scope.scrollTopNum)
                angular.element(element[0]).find('.table-body-columns-right').scrollTop(scope.scrollTopNum)

            }

            function isIE(){
            　　if(!!window.ActiveXObject || "ActiveXObject" in window){
            　　　　return true;
            　　}else{
            　　　　return false;
            　　}
            } 

            function isIE11(){
            　　if((/Trident\/7\./).test(navigator.userAgent)){
            　　　　return true;
            　　}else{
            　　　　return false;
            　　}
            }

        }
    }
}]).directive('bindHtmlCompile', ['$compile', function ($compile) {
  return {
    restrict: 'A',
    link: function (scope, element, attrs) {

        // var value = scope.$eval(attrs.bindHtmlCompile);
        // element.html(value && value.toString());
        // var compileScope = scope;
        // if (attrs.bindHtmlScope) {
        //   compileScope = scope.$eval(attrs.bindHtmlScope);
        // }
        // $compile(element.contents())(compileScope);  
        scope.$watch(function () {
            return scope.$eval(attrs.bindHtmlCompile);
        }, function (value) {
            // Incase value is a TrustedValueHolderType, sometimes it
            // needs to be explicitly called into a string in order to
            // get the HTML string.
            element.html(value && value.toString());
            // If scope is provided use it, otherwise use parent scope
            var compileScope = scope;
            if (attrs.bindHtmlScope) {
              compileScope = scope.$eval(attrs.bindHtmlScope);
            }
            $compile(element.contents())(compileScope);
          });
      

    }
  };
}]);



