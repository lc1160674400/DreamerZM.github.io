var isDev = true
var baseUrl = 'https://admin.musilinzhijia.com'
Promise.prototype.finally = function(callback){
  let P = this.constructor
  return this.then(
    value => P.resolve(callback()).then(()=>value),
    reason => P.resolve(callback()).then(()=>{throw reason})
  )
}
var url = {
  post_register: `${baseUrl}/user/register`,
  get_openid: `${baseUrl}/user/openid`,
  post_login: `${baseUrl}/user/login`
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
const post = (url, data) => {
  var promise = new Promise((resolve, reject) => {
    //网络请求
    wx.request({
      url: url,
      data: data,
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded',
        'token': wx.getStorageSync('token')
      },
      success: function (res) {//服务器返回数据
        if (res.statusCode == 200) {
          resolve(res);
        } else {//返回错误提示信息
          reject(res.data);
        }
      },
      error: function (e) {
        reject('网络出错');
      }
    })
  });
  return promise;
}
// 封装get请求
const get = (url, data) => {
  var promise = new Promise((resolve, reject) => {
    //网络请求
    wx.request({
      url: url,
      data: data,
      header: {
        'content-type': 'application/json',
        'token': wx.getStorageSync('token')
      },
      success: function (res) {//服务器返回数据
        if (res.statusCode == 200) {
          resolve(res);
        } else {//返回错误提示信息
          reject(res.data);
        }
      },
      error: function (e) {
        reject('网络出错');
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