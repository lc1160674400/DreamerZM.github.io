// pages/user/certification/certification.js
var util = require('../../..//utils/util.js')
var formValid = require('../../..//utils/util.js').formValid
var goto = require('../../..//utils/util.js').goto
var toast = util.toast
var uploadImage = require('../../../utils/uploadFile.js');
var api = require('../../../utils/api.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    token:'',
    current:0,
    tel:{
      isValid: false,
      value: ''
    },
    name:{
      isValid:false,
      value:''
    },
    idcard:{
      isValid:false,
      value:''
    },
    frontimg:{
      isValid:false,
      value:'',
      localurl:''
    },
    backimg: {
      isValid: false,
      value: '',
      localurl:''
    },
    steps:[
      {
        title:'标题1',
        desc:'上传身份证照片'
      }, {
        title: '标题2',
        desc: '填写身份信息'
      }],
    isReady:false
  },
  updateImg: function (e) {
    const type = e.currentTarget.dataset.type
    const that = this
    wx.chooseImage({
      count: 9, // 默认最多一次选择9张图
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        var tempFilePaths = res.tempFilePaths;
        
        var nowTime = util.formatTime(new Date());
        if(tempFilePaths.length>1){
          toast('error','最多支持同时上传一张照片')
          return
        }
        //不支持多图上传
        for (var i = 0; i < res.tempFilePaths.length; i++) {
          //显示消息提示框
          wx.showLoading({
            title: '上传中' + (i + 1) + '/' + res.tempFilePaths.length,
            mask: true
          })

          //上传图片
          //你的域名下的/cbb文件下的/当前年月日文件下的/图片.png
          //图片路径可自行修改
          // console.log(res.tempFilePaths[i], 'images/' + nowTime + '/')
          uploadImage(res.tempFilePaths[i], 'attest/',
            function (result) {
              
              console.log("======上传成功图片地址为：", result);
              //设置微信变量
              var tempObj = {}
              tempObj[type]={}
              tempObj[type].isValid = true
              tempObj[type].value = result
              tempObj[type].localurl = tempFilePaths[0]
              that.setData(tempObj)
              //隐藏loading动画
              wx.hideLoading();
              //弹框提示成功
              toast('tip', '上传成功')
              if(that.data.frontimg.isValid && that.data.backimg.isValid){
                that.setData({
                  isReady:true
                })
              }


            }, function (result) {
              wx.hideLoading()
              toast('error', '上传图片失败')
            }
          )
        }
      }
    })
  },
  docheck:function(e){
    let type = e.target.id ? e.target.id:'default'
    let value = e.detail.value
    let validObj = new formValid(type,value)
    if(!validObj.isValid){
      toast('warn',validObj.errMsg)
      var tempObj = {}
      tempObj[type] = {}
      tempObj[type].isValid = false
      this.setData(tempObj)
    }else{
      var tempObj = {}
      tempObj[type] = {}
      tempObj[type].isValid = true
      tempObj[type].value = value
      this.setData(tempObj)
    }

    //设置按钮的可点击状态
    if(this.data.name.isValid && this.data.idcard.isValid && this.data.tel.isValid){
      this.setData({
        isReady:true
      })
    }else{
      this.setData({
        isReady: false
      })
    }
  },

  submit:function(){
    if(this.data.current == 0){
      this.setData({
        current:1,
        isReady:false
      })
    }else if(this.data.current == 1){
      //如果已经是第二步的话，直接提交表单
      // console.log(this.data.frontimg, this.data.backimg, this.data.name, this.data.idcard,this.data.tel)
      let paramObj = {
        'realName':this.data.name.value,
        'mobile':this.data.tel.value,
        'identityNumber': this.data.idcard.value,
        'identityImagePositive':this.data.frontimg.value,
        'identityImageRebel':this.data.backimg.value
      }
      console.log(paramObj)
      api.post(api.url.post_attest, paramObj, this.data.token).then((res)=>{
        
        if(res.data.code == 200){
          toast('tip','提交成功，请及时联系管理员进行审')
          setTimeout(()=>{wx.navigateBack({
            delta: 1
          })},2000)
          
        }else{
          toast('error', res.data.message)
        }
      })
    }
    
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    this.setData({
      token: wx.getStorageSync('token')
    })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})