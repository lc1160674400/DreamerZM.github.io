// components/card/card.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    options:{
      type:Array,
      value:[
        {
          'title':'2048',
          'img':'/imgs/2048.png',
          'page':'/pages/games/2048/2048'
        },{
          'title':'测试2',
          'img': '',
          'page': ''
        }
      ]
    }

  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    toGame:function(event){
      const page = event.currentTarget.dataset.pages;
      if (page){
        wx.navigateTo({
          url: page,
        })
      }else{
        wx.showModal({
          title: '跳转失败',
          content: '游戏暂时未开通',
          showCancel:false
        })
      }
      
    }

  }
})
