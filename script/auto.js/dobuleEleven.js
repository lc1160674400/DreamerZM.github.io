/**
 * Author :Zmer
 * 双十一自动盖楼脚本
 */

 // 首选项
 var config = {
     maxPicFindTimes : 5
 }

 // 首先获取屏幕宽度和高度
 var screenWidth = device.width
 var screenHeight = device.height



 // Start App
 function launchMainApp(appName){
    launchApp(appName)
    toast('正在启动 : ' + appName)
    sleep(2000)
    toast('启动成功')
 }

 // 获取截图权限
function getPermission(){
    setScreenMetrics(screenWidth, screenHeight);
    //请求截图
   if(!requestScreenCapture()){
        toast("请求截图失败,即将退出程序");
        return false
    }
    return true
}

// 以图找图
function findPic(chidld,options){
    captureScreen("/storage/emulated/0/ascript/screen" + ".jpg")
    var img = images.read('/storage/emulated/0/ascript/screen.jpg')
    var templ = images.read(chidld)
    var times = 1
    function repeatFindPic(img, templ,options){
        var p = findImage(img, templ,options);
        if(p){
            return p
        } else {
            return ''
        }
    }
    for (times;times < config.maxPicFindTimes; times++ ){
        toast('正在查找图片第'+times+ '次')
        sleep(1000)
        if(repeatFindPic(img,templ,options)){
            toast('已找到图片')
            return repeatFindPic(img,templ,options)
        }
        toast('查找图片失败，尝试下一次查找')
        sleep(1000)
    }
    toast('查找图片失败，无法继续，请重新启动脚本或者联系作者')
    sleep(2000)
    if(arguments[2]){
        exit()
    } else{
        return false
    }
    
    

}

// 浏览店铺
function browseShop(shopImg){
    
    sleep(4000)
    var goShop = findPic(shopImg,{
        threshold:0.9
    },false)
    if(goShop){
        click(goShop.x,goShop.y+20)
        sleep(5000)
        toast('计时开始')
        sleep(20000)
        toast('店铺浏览成功了！可以返回了')
        back()
        return true
    } else {
        return false
    }
    
}

// --------------------------------------------------------------------------------------------------------
function init(){
    //启用按键监听
    events.observeKey();
    //监听菜单键按下
    events.onKeyDown("volume_down", function(event){
        toast("菜单键被按下了");
        exit();
    });
    // 启动脚本
    toast('---脚本启动---')
    sleep(2000)
    toast('可以在脚本过程中任意时刻按手机音量下键退出脚本')
    sleep(2000)
    // 获取权限
    toast('开始获取权限')
    sleep(2000)
    if(getPermission()){
        sleep(2000)
        toast('获取权限成功')
    } else{
        toast('进入这里')
        sleep(2000)
        toast('获取权限失败，请允许相关权限')
        exit()
    }
    // 打开淘宝
    sleep(2000)
    launchMainApp('手机淘宝')
    sleep(5000)
    // 截图查找盖楼入口
    
    var picResult = findPic("/storage/emulated/0/ascript/target2.jpg",{
        threshold:0.4
    })
    // 已经找到入口
    sleep(4000)
    click(picResult.x,picResult.y+20)
    toast('正在进入盖楼会场')
    sleep(13000)
    var catMoney = findPic("/storage/emulated/0/ascript/catMoney.jpg",{
        threshold:0.9
    })
    sleep(1000)
    click(catMoney.x,catMoney.y+20)
    sleep(1000)
    
    // 浏览店铺
    var shopImg = '/storage/emulated/0/ascript/goShop.jpg'
    for (var shopTimes = 0;shopTimes<20;shopTimes++){
        if(!browseShop(shopImg)){
            break
        }
    }
    toast('所有店铺浏览成功')
    sleep(2000)
    
    // 浏览会场
    var squardImg = '/storage/emulated/0/ascript/squard.jpg'
    for (var shopTimes = 0;shopTimes<3;shopTimes++){
        if(!browseShop(squardImg)){
            break
        }
    }
    toast('所有会场浏览成功')
    sleep(2000)
    toast('程序退出')
    exit()
}





init()






// toast('开始计时')




// exit()
// click(slipCat.x,slipCat.y)
// exit()
// console.log(picResult)
