import {default as config} from '../../config.js'
const utils = require('../../utils/util.js')

//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    lan: app.globalData.lan,
    isAnimate:true
  },
  onLoad: function () {
    const that = this
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
      wx.setStorageSync('userInfo', app.globalData.userInfo)
      wx.setStorageSync('hasUserInfo', true)
      wx.reLaunch({
        url: '/pages/index/index',
      })
    } else if (this.data.canIUse){
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
        wx.setStorageSync('userInfo', app.globalData.userInfo)
        wx.setStorageSync('hasUserInfo', true)
        wx.reLaunch({
          url: '/pages/index/index',
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
          wx.setStorageSync('userInfo', app.globalData.userInfo)
          wx.setStorageSync('hasUserInfo', true)
          wx.reLaunch({
            url: '/pages/index/index',
          })
        }
      })
    }
  },
  getUserInfo: function(e) {
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
    wx.setStorageSync('userInfo', app.globalData.userInfo)
    wx.setStorageSync('hasUserInfo', true)
    wx.reLaunch({
      url: '/pages/index/index',
    })
  }
})
