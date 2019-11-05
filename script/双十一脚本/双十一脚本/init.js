/**
 * 双十一自动浏览会场脚本
 * author：Zmer
 * updated: 2019-10-26
 */

auto();


// 检查脚本是否重复运行
engines.all().slice(1).forEach(script => {
 if (script.getSource().getName().indexOf(engines.myEngine().getSource())) {
   toast("脚本正在运行中");
   engines.myEngine().forceStop();
 }
});

var START = {
  begin : false
}

Object.defineProperty(START, 'begin', {   
  set: function(newVal){ 
    if(newVal == true){
      start()
    } 
  }  
})
// if (!config.contains("picRepeatTimes")) {
//  toast("首次进入将进入配置页面");
engines.execScriptFile("./src/config.js");
//  engines.myEngine().forceStop();
// }else{
//   toast('已经找到本地配置,将使用本地配置运行')
// }   



