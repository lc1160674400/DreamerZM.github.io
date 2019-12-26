function Pictrue(option) {
  this.basePic =  ''  //底图
  this.targetPic = '' //需要查找的图片
  this.location = ''  //目标图片的坐标
  this.threshold = 0.5  //默认查找图片精度  1为最大值
  this.repeatTime =  storages.create("dobule_eleven_config").get('picRepeatTimes')    //设置默认查找图片次数
  this.init(option);  //构造函数的入口
}
Pictrue.prototype = {
  // 构造器
  constructor:Pictrue,//constructor指向自身这个类
  // 初始化方法
  init: function(option){
    
    // 请求截图权限
    if (! requestScreenCapture(option.direct?option.direct:false)) {
      toast("请求截图失败，请允许截图权限");
      exit();
    }
    if(option.targetPic){
      this.targetPic = option.targetPic
      this.repeatTime = option.repeatTime?option.repeatTime : this.repeatTime
      this.threshold = option.threshold?option.threshold : this.threshold
      this.basePic = './screenShot/screenShot.jpg'
    }else{
      toast('error 100: constructor Pictrue Fail,no targetPic')
    }
  },
  // 生成随机数方法
  randomName : function () {
    var now = new Date()
    var year = now.getFullYear();
    var month = now.getMonth() + 1;
    var day = now.getDate();
    var hour = now.getHours();
    var minutes = now.getMinutes();
    var seconds = now.getSeconds();
    String(month).length < 2 ? (month = Number("0" + month)) : month;
    String(day).length < 2 ? (day = Number("0" + day)) : day;
    String(hour).length < 2 ? (hour = Number("0" + hour)) : hour;
    String(minutes).length < 2 ? (minutes = Number("0" + minutes)) : minutes;
    String(seconds).length < 2 ? (seconds = Number("0" + seconds)) : seconds;
    var yyyyMMddHHmmss = ''+year+month+day+hour+minutes+seconds;
    return yyyyMMddHHmmss + '_' + Math.random().toString(36).substr(2, 9);
  },
  // 以图找图方法
  findPic:function(){
    toast('开始以图找图')

    // 设置最大循环次数
    for(var times = 0;times<this.repeatTime;times++){
      toast('正在查找图片,第 ' + (times+1) + '次,'+'相似度为：'+this.threshold)
      // 如果已经找到则跳出
      if(this.location){
        toast('已经找到图片,坐标是: ' + this.location)
        break;
      }
      // 截取屏幕图片
      captureScreen(this.basePic)
      sleep(500)
      // 找图
      console.log(this.basePic)
      var temp = findImage(captureScreen(),images.read(this.targetPic),{
        threshold:this.threshold
      })   
      this.location = temp?temp:''
    }
    if(this.location === ''){
      toast('查找图片失败')
    }
  }
}

module.exports = Pictrue;