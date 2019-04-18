// pages/index/home/home.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    personList:[],
    options: [{
      text: '年龄',
      type: 'sort',
    },
    {
      text: '风格',
      type: 'radio',
      options: [{
        text: '全部',
      }
      ],
    },
    {
      text: '类型',
      type: 'checkbox',
      options: [{
        text: '帅气',
      },
      {
        text: '年轻',
      },
      {
        text: '有车',
      },
      {
        text: '有车',
      },
      {
        text: '其他',
      },
      ],
    },
    {
      text: '筛选',
      type: 'filter',
      slotName: 'filter',
    },
    ],
    radioOptions: ["全部", "有车", "有房", "其他"],
    checkboxOptions: ["在京", "国外", "其他"],
    activeTab:0,
    tabs: [
      {
        text: '男生',
        icon: 'male',
        iconSize: '32rpx',
        iconColor: '#ef473a',
      },
      {
        text: '女生',
        icon: 'female',
        iconSize: '32rpx',
        iconColor: '#ef473a',
      }
    ],
    isCertification:true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.checkNewVersion();
    this.getPersonList();
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
    function isUser(res) {
      if (!res || !res.data) {
        wx.showModal({
          title: '暂未获取到用户信息',
          content: '请同意授权获取用户信息',
          showCancel: false,
          cancelText: '退出',
          confirmText: "进入授权",
          success(res) {
            wx.navigateTo({
              url: '/pages/login/login',
            })
          }
        })
      }
    }
    wx.getStorage({
      key: 'userInfo',
      success: function (res) {
        //如果缓存里面没有用户信息则会跳转到授权页面
        isUser(res)

      },
      fail: () => {
        isUser()
      }
    })
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

  },
  getPersonList(){
    let personlist = []
    var f_setDefaultImg = function(list,defaultImg){
      var result = []
      list.forEach(ele=>{
        if(ele.imgUrl){
          result.push(ele)
        }else{
          ele.imgUrl = defaultImg
          result.push(ele)
        }
      })
      return result
    }
    if(this.data.activeTab == 0){
      personlist = [{
        imgUrl: '../../../static/imgs/person/person.png',
        name: '李特',
        desc: '一个耿直的努力boy',
        userid:"6678"
      },
        {
          imgUrl: '../../../static/imgs/person/person2.png',
          name: '李荣浩',
          desc: '我就是眼睛小你能拿我怎么样',
          userid: "6778"
        },
        {
          imgUrl: '../../../static/imgs/person/person3.png',
          name: '薛之谦',
          desc: '我只会唱低音嘿嘿嘿情歌小王子',
          userid: "6878"


        },
        {
          imgUrl: '',
          name: '毛不易',
          desc: '我念你清幽为不知道回复',
          userid: "6978"
        }]
      f_setDefaultImg(personlist,'../../../static/imgs/default_male.png')
    }else if(this.data.activeTab == 1){
      personlist = [{
        imgUrl: '../../../static/imgs/person/famale1.png',
        name: '黛安乃',
        desc: '一个耿直的努力boy',
        userid: "7078"
      },
      {
        imgUrl: '../../../static/imgs/person/famale2.png',
        name: '小萝莉',
        desc: '我就是眼睛小你能拿我怎么样',
        userid: "7178"
      },
      {
        imgUrl: '../../../static/imgs/person/famale3.png',
        name: '御姐',
        desc: '我只会唱低音嘿嘿嘿情歌小王子',
        userid: "7278"
      },
      {
        imgUrl: '../../../static/imgs/person/famale3.png',
        name: '小胖子',
        desc: '我只会唱低音嘿嘿嘿情歌小王子',
        userid: "7378"
      },
      {
        imgUrl: '../../../static/imgs/person/famale4.png',
        name: '小可爱',
        desc: '我只会唱低音嘿嘿嘿情歌小王子',
        userid: "7478"
      },
      {
        imgUrl: '../../../static/imgs/person/famale5.png',
        name: '可爱多',
        desc: '我只会唱低音嘿嘿嘿情歌小王子',
        userid: "7578"
      },
      {
        imgUrl: '',
        name: '我最可爱',
        desc: '我念你清幽为不知道回复',
        userid: "7678"
      }]
      f_setDefaultImg(personlist, '../../../static/imgs/default_female.png')
    }
    
    this.setData({
      personList:personlist
    })
  },
  handleChangePanel(e) {
    console.log(e);
  },
  handleChangeTab(e) {
    //获取当前激活tab属性
    if(this.data.activeTab !=  e.detail.value){
      this.setData({
        activeTab:e.detail.value
      })
      this.getPersonList()
    }
  },
  getUserDetail: function (event){
    var userid = event.target.dataset.userid
      var isCertification = wx.getStorage({
        key: 'isCertification',
        complete: (res) => {
          console.log(res.data)
          if (res.data) {
            wx.navigateTo({
              url: '/pages/user/detail/detail',
            })
          } else {
            wx.navigateTo({
              url: '/pages/user/certification/certification',
            })
          }
        }
      })
  },
  checkNewVersion: function () { // 检查版本更新
    // 获取小程序更新机制兼容
    if (wx.canIUse("getUpdateManager")) {
      const updateManager = wx.getUpdateManager();
      updateManager.onCheckForUpdate(function (res) {
        // 请求完新版本信息的回调
        if (res.hasUpdate) {
          updateManager.onUpdateReady(function () {
            wx.showModal({
              title: "更新提示",
              content: "新版本已经准备好，是否重启应用？",
              success: function (res) {
                if (res.confirm) {
                  // 新的版本已经下载好，调用 applyUpdate 应用新版本并重启
                  updateManager.applyUpdate();
                }
              }
            });
          });
          updateManager.onUpdateFailed(function () {
            // 新的版本下载失败
            wx.showModal({
              title: "已经有新版本了哟~",
              content: "新版本已经上线啦~，请您删除当前小程序，重新搜索打开哟~"
            });
          });
        }
      });
    } else {
      // 如果希望用户在最新版本的客户端上体验您的小程序，可以这样子提示
      wx.showModal({
        title: "提示",
        content: "当前微信版本过低，无法使用该功能，请升级到最新微信版本后重试。"
      });
    }
  }
})