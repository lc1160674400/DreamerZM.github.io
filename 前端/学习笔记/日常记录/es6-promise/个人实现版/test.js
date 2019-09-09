var Promise = require('./promise_无法通过A+检测')
function log(str){
    console.log(str)
}
new Promise(function (resolve, reject) {
    setTimeout(() => {
        console.log('第一次promise结束')
        resolve('解决')
    }, 3000);
})
.then((res)=>{
    console.log('resolved1',res)
    return new Promise((resolve,reject)=>{
        setTimeout(() => {
            reject('拒绝')
        }, 3000);
    })
},
(res)=>{
    console.log('rejected1', res)
    return 'reuturn value'
})
.then((res)=>{
    console.log('resolved2',res)

},
(res)=>{
    console.log('rejected2', res)
})