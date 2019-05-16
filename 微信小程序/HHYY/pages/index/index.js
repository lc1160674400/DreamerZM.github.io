//index.js
//获取应用实例
const app = getApp()
var uploadImage = require('../../utils/uploadFile.js');//地址换成你自己存放文件的位置
var util = require('../../utils/util.js');
var toast = require('../../utils/util.js').toast;
var goto = require('../../utils/util.js').goto;
Page({
  data: {
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    uploadedImg:'',
    pageObj :[
      {
        text:'回族身份验证',
        target: "/pages/user/certification/certification"
      },
      {
        text:'登陆记录查询',
        target: "/pages/logs/logs"
      },
      {
        text:'设置'
      },
      {
        text:'意见反馈'
      }
    ]
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  goTarget:function(e){
    let target = e.currentTarget.dataset.target
    if(!target || target === 'undefined'){
      toast('tip','该功能正在开发中')
    }
    else{
      goto(target)
    }
  },
  onLoad: function () {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse){
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
  
  

})
