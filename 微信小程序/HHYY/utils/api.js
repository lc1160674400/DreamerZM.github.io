var isDev = true
var baseUrl = 'https://admin.musilinzhijia.com'
var toast = require('util.js').toast
Promise.prototype.finally = function(callback){
  let P = this.constructor
  return this.then(
    value => P.resolve(callback()).then(()=>value),
    reason => P.resolve(callback()).then(()=>{throw reason})
  )
}
var url = {
  get_openid: `${baseUrl}/user/openid`,
  get_attestStatus: `${baseUrl}/attest`,
  post_register: `${baseUrl}/user/register`,
  post_login: `${baseUrl}/user/login`,
  post_attest: `${baseUrl}/attest`,
}
const wxPromisify = fn =>{
  return function(obj={}){
    return new Promise((resolve,reject)=>{
      obj.success = function(res){
        resolve(res)
      }
      obj.fail = function(res){
        reject(res)
      }
      fn(obj)
    })
  }
}
// 封装post请求
const post = (url, data,token) => {
  var promise = new Promise((resolve, reject) => {
    //网络请求
    wx.request({
      url: url,
      data: data,
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded',
        'Authorization': token ? 'Bearer ' + token:''
      },
      success: function (res) {//服务器返回数据
        if (res.statusCode == 200) {
          resolve(res);
        } else {//返回错误提示信息
          toast('error', res.data.message)
        }
      },
      error: function (e) {
        toast('error', e)
      }
    })
  })
  return promise;
}
// 封装get请求
const get = (url, data, token) => {
  var promise = new Promise((resolve, reject) => {
    //网络请求
    wx.request({
      url: url,
      data: data,

      header: {
        'content-type': 'application/x-www-form-urlencoded',
        'Authorization': token ? 'Bearer ' + token : ''
      },
      success: function (res) {//服务器返回数据
        if (res.statusCode == 200) {
          resolve(res);
        } else {//返回错误提示信息
          toast('error', res.data.message)
        }
      },
      error: function (e) {
        toast('error', e)
      }
    })
  });
  return promise;
}

module.exports = {
  url:url,
  get:get,
  post:post
}