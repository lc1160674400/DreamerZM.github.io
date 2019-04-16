// pages/login/login.js


const app = getApp()
var api = require('../../utils/api.js');
// 获取全局app变量



Page({

  /**
   * 页面的初始数据
   */
  data: {
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse) {
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
  getUserInfo: function (e) {
    if (e.detail.errMsg && e.detail.errMsg == 'getUserInfo:fail auth deny'){
      wx.showModal({
        title: '授权失败',
        content: '请您重新点击按钮，并在弹框中点击同意按钮便于为您提供更好的服务',
      })
    }else{
      // app.globalData.userInfo = e.detail.userInfo
      // this.setData({
      //   userInfo: e.detail.userInfo,
      //   hasUserInfo: true
      // })
      console.log(e)
      var wechatId = e.detail.iv
      var nickName = e.detail.userInfo.nickName
      var avatarUrl = e.detail.userInfo.avatarUrl,gender=e.detail.userInfo.gender==1?'boye':'gile'
      let role='ROLE_USER'
      wx.request({
        url: api.auth_register,
        data: {
          wechatId: wechatId,
          nickName: nickName,
          avatarUrl:avatarUrl,
          gender:gender,
          role:role
        },
        method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
        //header: {"Content-Type":"application/x-www-form-urlencoded"}, // 设置请求的 header
        success: function (res) {
          console.log(JSON.stringify(res));
        },
        fail: function (res) {
          console.log(JSON.stringify(res));
        },
        complete: function () {
          // complete
        }
      })
      console.log(api)
    }
   
    
    // this.setData({
    //   userInfo: e.detail.userInfo,
    //   hasUserInfo: true
    // })
    // avatarUrl
    // city    "Yongzhou"
    // country    "China"
    // gender    1
    // language    "zh_CN"
    // nickName    "🇯 🇪 🇸 🇸 🇴 🇳"
    // province    "Hunan"
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