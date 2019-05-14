/**
 * Created by razer on 2018/12/12.
 */
crmApp
    .filter("searchFilter",function(){
        return function(list,key,filterValue){
            var newList = [];
            if(myCommon.isEmpty(list)||list.length==0){
                return;
            }
            for(var i=0;i<list.length;i++){
                if(list[i][key].indexOf(filterValue) != -1){
                    newList.push(list[i]);
                }
            }

            return newList;
        }
    });