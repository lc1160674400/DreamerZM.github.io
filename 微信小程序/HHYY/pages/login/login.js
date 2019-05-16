// pages/login/login.js


const app = getApp()
var api = require('../../utils/api.js');
var toast = require('../../utils/api.js').toast;
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
      wx.login({
        success(res) {
          if (res.code) {
            //拿到临时凭证
            console.log(res.code)
            // 先根据临时凭证获取唯一openid
            api.get(api.url.get_openid,{js_code:res.code})
            .then((res)=>{
              //根据临时凭证获取用户唯一openid
              app.globalData.openid = res.data.openid
              app.globalData.session_key = res.data.session_key
              //获取到openid之后调用登录接口
              return api.post(api.url.post_login,{
                openid: app.globalData.openid,
                nickName: e.detail.userInfo.nickName,
                avatarUrl: e.detail.userInfo.avatarUrl,
                gender: e.detail.userInfo.gender == 1 ? 'boy' : 'girl',
                role: 'ROLE_USER'
              })
            })
            .then((res)=>{
              //登录接口时如果未注册直接调用注册接口
              if(res.data.code == 500 && res.data.message=='用户不存在'){
                return api.post(api.url.post_register,{
                  openid: app.globalData.openid,
                  nickName: e.detail.userInfo.nickName,
                  avatarUrl: e.detail.userInfo.avatarUrl,
                  gender: e.detail.userInfo.gender == 1 ? 'boy' : 'girl',
                  role: 'ROLE_USER'
                })
              }
              //如果已经注册直接登录跳转到首页
              else{
                app.globalData.userInfo = e.detail.userInfo
                app.globalData.isLogin = true
                wx.setStorage({
                  key: 'userInfo',
                  data: e.detail.userInfo,
                  success: () => {
                    wx.navigateBack({
                      url: '/pages/index/home/home',
                    })
                  }
                })
              }
            })
            .then((res)=>{
              console.log('注册成功')
              wx.navigateBack({
                url: '/pages/index/home/home',
              })
            })
            
          } else {
            //调微信官方接口没有拿到临时凭证
            toast('error','登录失败！' + res.errMsg)
          }
        }
      })
      // var wechatId = e.detail.iv
      // var nickName = e.detail.userInfo.nickName
      // var avatarUrl = e.detail.userInfo.avatarUrl,gender=e.detail.userInfo.gender==1?'boy':'girl'
      // let role='ROLE_USER'
      // wx.request({
      //   url: api.auth_register,
      //   data: {
      //     wechatId: wechatId,
      //     nickName: 'dsadsa',
      //     avatarUrl:avatarUrl,
      //     gender:gender,
      //     role:role
      //   },
      //   method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      //   header: {"Content-Type":"application/x-www-form-urlencoded"}, // 设置请求的 header
      //   success: function (res) {
      //     console.log(JSON.stringify(res));
      //   },
      //   fail: function (res) {
      //     console.log(JSON.stringify(res));
      //   },
      //   complete: function () {
      //     // complete
      //   }
      // })
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