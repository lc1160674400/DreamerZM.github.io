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

module.exports = {
  formatTime: formatTime,
  formatNumber: formatNumber,
  toast:Toast
}
