function Attract(){
}
Attract.prototype = {
    constructor: Attract,
}
Attract.attract1 = function(){
    if(Pictrue){
        sleep(1000)
        var entry = new Pictrue({"targetPic":'./img/attract.jpg','threshold':0.9,'repeatTime':1,'direct':true})
        entry.findPic()
        if(entry.location){
            toast(entry.location)
            click(entry.location.x,entry.location.y)
        } else{
            console.log('发起进攻失败')
            exit()
        }
        sleep(1000)
    }else{
        console.log('必须先引入截图包Pictrue')
    }
}
module.exports = Attract