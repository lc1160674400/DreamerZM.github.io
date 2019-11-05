// 加载本地配置
var config = storages.create("dobule_eleven_config");

// 缓存变量
var picRepeatTimes = config.get('picRepeatTimes')
var defaultTime = config.get('defaultTime')
var likely = parseFloat('0.'+config.get('likely'))
// var Automator = require("./src/Automator.js");
// var Unlock = require("./src/Unlock.js");
var Pictrue = require("./src/Pictrue.js");
var wait = function(times){
    sleep(defaultTime*times)
}

// launchApp('手机淘宝')
// wait(1)
// var swipper = new Pictrue({"targetPic":'./img/t_swipper.jpg','threshold':likely>0.7?likely:0.7,'repeatTime':picRepeatTimes})
// swipper.findPic()
    
launchApp('手机淘宝')
wait(2)
var entry = new Pictrue({"targetPic":'./img/t_entry.jpg','threshold':likely,'repeatTime':picRepeatTimes})
entry.findPic()
if(entry.location){
    click(entry.location.x,entry.location.y)
} else{
    toast('查找"双十一主入口"失败,请降低图片相似度，退出程序重试,自动退出程序')
    exit()
}
wait(4)
if(config.get('shop') !== 0 || config.get('huichang') !==0){
    //进入猫币页面
    var catMoney = new Pictrue({"targetPic":'./img/t_catMoney.jpg','threshold':likely,'repeatTime':picRepeatTimes})
    catMoney.findPic()
    if(catMoney.location){
        click(catMoney.location.x,catMoney.location.y)
    } else{
        toast('进入"找猫币"失败,请降低图片相似度，退出程序重试,自动退出程序')
        exit()
    }
    click(catMoney.location.x,catMoney.location.y)
    if(config.get('huichang') ){
        //进入逛店铺脚本
        for(var times = 0;times<config.get('huichang');times++){
            wait(2)
            swipe((device.width/2), (device.height/4*3), (device.width/2), (device.height/4*2), 1000)
            wait(1)
            swipe((device.width/2), (device.height/4*3), (device.width/2), (device.height/4*2), 1000)
            wait(1)
            
            var huichang = new Pictrue({"targetPic":'./img/t_huichang.jpg','threshold':likely>0.7?likely:0.7,'repeatTime':picRepeatTimes})
            huichang.findPic()
            if(huichang.location){
                click(huichang.location.x,huichang.location.y)
            } else{
                toast('查找"去浏览"失败,请降低图片相似度，退出程序重试,自动退出程序')
                break;
            }
            click(huichang.location.x,huichang.location.y)
            sleep(25000)
            back()
        }
        toast('所有店铺浏览完成')
        wait(1)
    }
    if(config.get('shop') !== 0){
        //进入逛店铺脚本
        for(var times = 0;times<config.get('shop');times++){
            wait(2)
            var shop = new Pictrue({"targetPic":'./img/t_shop.jpg','threshold':likely>0.7?likely:0.7,'repeatTime':picRepeatTimes})
            shop.findPic()
            if(shop.location){
                click(shop.location.x,shop.location.y)
            } else{
                toast('查找"去进店"失败,请降低图片相似度，退出程序重试,自动退出程序')
                break;
            }
            click(shop.location.x,shop.location.y)
            sleep(28000)
            back()
        }
        toast('所有店铺浏览完成')
        wait(1)
    }
    
}else{
    toast('未选择任何脚本功能,自动退出')
    exit()
}