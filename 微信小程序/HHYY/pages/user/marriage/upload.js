// pages/user/marriage/upload.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userNameRules: {
      maxLength: {
        value: 6,
        message: '姓名最多6个字',
      },
      minLength: {
        value: 3,
        message: '姓名最少三个字',
      },
    },
    isRequired: {
      required: {
        value: true,
        message: '必填',
      },
    },
    options1: [
      {
        key: '苹果',
        value: 'iphone',
      },
      {
        key: '华为',
        value: 'huawei',
      },
      {
        key: 'oppo音乐手机',
        value: 'oppo',
      },
    ],
    
    textarea_visible: true,
  },
  handlePickerOpen() {
    this.setData({ textarea_visible: true })
  },
  handlePickerCancel() {
    this.setData({ textarea_visible: false })
  },
  wussFormSubmit(e) {
    console.log('提交了:', e.detail);
  },
  wussFormReset(e) {
    console.log('重置了:', e.detail);
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