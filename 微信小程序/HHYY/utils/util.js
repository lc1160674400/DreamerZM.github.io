const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}
const FORM_VALID = function(type,value){
  switch(type){
    case 'default':
      this.isValid = value.length != 0 && value != undefined && value != ''? true : false
      this.errMsg = this.isValid?'':'请输入有效内容'
      break;
    case 'name':
      var reg = /^[\u4e00-\u9fa5]{2,4}$/ig;
      this.isValid = reg.test(value)
      this.errMsg = this.isValid ? '' : '请输入2-4位的有效姓名'
      break;
    case 'idcard':
      var reg = /^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/;
      this.isValid = reg.test(value)
      this.errMsg = this.isValid ? '' : '请输入正确的身份证信息'
      break;
  }
}


const BASE_TOAST = [
  {
    key:'warn',
    text:'警告'
  },
  {
    key: 'error',
    text: '错误'
  },
  {
    key: 'tip',
    text: '提示'
  },
  {
    key: 'unknow',
    text: '未知'
  },
]
let Toast = function (type, content) {
  if (type in Toast.prototype) {
    Toast.prototype[type](content)
  } else {
    throw new Error('Toast Factory Do Not have method called : ', type)
  }
} 
BASE_TOAST.forEach(element=>{
  Toast.prototype[element.key] = function(content){
    wx.showModal({
      title: element.text,
      content: content,
      showCancel:false,
      confirmColor: (function (key){
        const COLOR_DICT = {
          warn:'#eea236',
          error:'#d9534f',
          tip:'#5bc0de',
          unknow:'#337ab7'
        }
        return COLOR_DICT[key]
      }(element.key))
    })
  }
})

const goTo = function(target,type,time){
  if(typeof target != 'string'){
    Toast('error','Target Page Must Be a String Type')
  }else{
    if(type === 'delay'){
      let SEC = 0
      if (typeof time === 'number') {
        SEC = time
      } else if (typeof time === 'string') {
        SEC = parseInt(time)
      } else {
        Toast('error', 'Function Delay only allow argument with String or Number')
        return ''
      }
      setTimeout(
        function(){
          wx.navigateTo({
            url: target,
          })
        }  
        , SEC)
    }else{
      wx.navigateTo({
        url: target,
      })
    }
    
  }
}





module.exports = {
  formatTime: formatTime,
  formatNumber: formatNumber,
  toast:Toast,
  goto:goTo,
  formValid: FORM_VALID,

}
