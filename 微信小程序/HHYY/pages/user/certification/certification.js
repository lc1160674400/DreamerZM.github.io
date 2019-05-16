// pages/user/certification/certification.js
var util = require('../../..//utils/util.js')
var toast = util.toast
var uploadImage = require('../../../utils/uploadFile.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    current:1,
    steps:[
      {
        title:'标题1',
        desc:'上传身份证照片'
      }, {
        title: '标题2',
        desc: '填写身份信息'
      }]
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
        var tempObj = {}
        tempObj[type] = tempFilePaths
        that.setData(tempObj)
        console.log(that.data[type])
        var nowTime = util.formatTime(new Date());

        //支持多图上传
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
              toast('tip','上传成功')
              console.log("======上传成功图片地址为：", result);
              //做你具体的业务逻辑操作

              wx.hideLoading();
            }, function (result) {
              console.log("======上传失败======", result);
              //做你具体的业务逻辑操作

              wx.hideLoading()
            }
          )
        }
      }
    })
  },

  submit:function(){
    if(this.data.current == 0){
      this.setData({
        current:1
      })
    }else if(this.data.current == 1){
      //如果已经是第二步的话，直接提交表单
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