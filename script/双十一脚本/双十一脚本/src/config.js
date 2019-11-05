"ui";
/**
 * 默认配置
 */
var config = storages.create("dobule_eleven_config");
// 默认执行配置
var default_conf = {
  picRepeatTimes:5,
  defaultTime:2000,
  likely:5,
  shop:1,
  huichang:1
};
var isError = false
if (!config.contains("picRepeatTimes")) {
  // 储存默认配置到本地
  Object.keys(default_conf).forEach(function(key) {
    config.put(key, default_conf[key]);
  });
}
ui.layout(
    <vertical padding="16">
         <text text="设置图片重复查找次数" textColor="black" textSize="16sp" marginTop="16"/>
         <input id="picTimes" inputType="number" hint="默认失败后重复查找数：5" text="{{config.get('picRepeatTimes')}}"/>
         <text text="设置每一次点击之后时间间隔" textColor="black" textSize="16sp" marginTop="16"/>
         <input id="defaultTime" inputType="number" hint="时间过短可能导致查找图片失败" text="{{config.get('defaultTime')}}"/>
         <text text="设置图片相似度" textColor="black" textSize="16sp" marginTop="16"/>
         <input id="likely" inputType="number" hint="如果找不到图片可以尝试降低相似度" text="{{config.get('likely')}}"/>
         <text text="功能选择：进店,请输入进店次数" textColor="black" textSize="16sp" marginTop="16"/>
         <input id="shop" inputType="number" hint="1表示 开启，0表示关闭" text="{{config.get('shop')}}"/>
         <text text="功能选择：浏览会场，请输入浏览次数" textColor="black" textSize="16sp" marginTop="16"/>
         <input id="huichang" inputType="number" hint="1表示 开启，0表示关闭" text="{{config.get('huichang')}}"/>
         <text text="功能选择：签到(暂不能用)" textColor="black" textSize="16sp" marginTop="16"/>
         <input id="qiandao" inputType="number" hint="1表示 开启，0表示关闭" text="{{config.get('qiandao')}}"/>
         <button w="*" id="clear" text="清除本地储存" gravity="center" layout_gravity="center" />
         {/* <button id="default" text="使用默认配置（推荐）" w="auto" style="Widget.AppCompat.Button.Colored"/> */}
         <button id="change" text="启动脚本" w="*" style="Widget.AppCompat.Button.Colored"/>
    </vertical>
);


ui.change.click(()=>{
  var pic_times = ui.picTimes.text()
  var default_time = ui.defaultTime.text()
  var likely = ui.likely.text()
  var shop = ui.shop.text()
  var huichang = ui.huichang.text()


  const PIC_TIME_RANGE = [1,10]
  const DEFAULT_TIME_RANGE = [1000,10000]
  const LIKELY = [1,10]
  var config = storages.create("dobule_eleven_config");
  if(pic_times < PIC_TIME_RANGE[0] || pic_times > PIC_TIME_RANGE[1]){
    ui.picTimes.setError("图片查找次数输入有误");
    isError = true
    return
  }
  if(default_time < DEFAULT_TIME_RANGE[0] || default_time > DEFAULT_TIME_RANGE[1]){
    ui.defaultTime.setError("时间间隔输入有误");
    isError = true
    return
  }
  if(likely <LIKELY[0] || likely > LIKELY[1]){
    ui.likely.setError('输入相似度大于1小于10')
    isError = true
    return
  }
  config.put('picRepeatTimes', pic_times);
  config.put('defaultTime', default_time);
  config.put('likely',  likely);
  config.put('shop',  shop);
  config.put('huichang',  huichang);
  // var START = require('./init.js')
  engines.myEngine().forceStop();
  engines.execScriptFile("./main.js");
  // START.begin = true
})

// 清除本地储存 
ui.clear.on("click", () => {
  confirm("确定要清除本地储存吗？")
    .then(ok => {
      if (ok) {
        storages.remove("dobule_eleven_config");
        toast("清除成功");
      }
    });
});