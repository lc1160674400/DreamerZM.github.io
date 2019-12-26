

function Broker(option){
    this.brokerArr = [0,0,0,0,0,0,0,0,0]
    this.times = option && option.times?option.times : -1;    // 如果是-1表示执行无数次
    this.init(option);
}

Broker.prototype = {
    constructor:Broker,
    init:function(option){
        // 设置屏幕标准分辨率
        setScreenMetrics(1080, 2160)
        var entry = new Pictrue({"targetPic":option.brokerEntry,'threshold':option.likely,'repeatTime':1,'direct':true})
        entry.findPic()
        if(entry.location){
            console.log(entry.location)
            click(entry.location.x,entry.location.y)
            sleep(500)
            Attract.attract1()
        } else{
            console.log('未找到结界突破入口')
            exit()
        }

    }
}


module.exports = Broker;