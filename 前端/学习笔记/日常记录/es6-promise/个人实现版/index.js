function log(str){
    console.log(str)
}
log('promise 开始')


new Promise(function (resolve, reject) {
    setTimeout(function () {
        reject();
    }, 1000);
})
.then(function (r) {
    log('resolve1');
},function (r) {
    log('reject1');
    return new Promise(function(resolve,reject){
        setTimeout(function(){
            reject();
        }, 1000)
    })
})
.then(function (r) {
    log('resolve2: ' + r);
},function (r) {
    log('reject2');
})