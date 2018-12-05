import {default as config} from '../../config.js'
const utils = require('../../utils/util.js')

//index.js

Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    isAnimate:true
  },
  //事件处理函数
  titleclick: function() {
    console.log(2)
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    const that = this
    const userInfo = wx.getStorageSync('userInfo')
    const hasUserInfo = wx.getStorageSync('hasUserInfo')
    this.setData({
      userInfo: userInfo,
      hasUserInfo: hasUserInfo
    })
    console.log(userInfo)
    
  },
})
