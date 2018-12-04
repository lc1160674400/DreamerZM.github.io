// components/header/header.js


Component({
  /**
   * 组件的属性列表
   */
  properties: {
    iconImg1:{
      type:String,
      value:'/img/smile2.png'
    },
    iconImg2: {
      type: String,
      value: '/img/smile.png'
    },
    animate:{
      type:Boolean,
      value:true
    },
    nickname:{
      type:String,
      value:'游客'
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
    handlerEvent:function(event){
      console.log(event)
      this.triggerEvent('titleclick')
    }
  },
  /**
   * 组件生命周期
   */
  ready:function(){
    const that = this;
    
  },
  
})
