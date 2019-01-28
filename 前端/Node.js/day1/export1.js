'use strict'
var greet = function() {
    console.log('hello world')
}

var fs = require('fs');

console.time()
fs.readFile('await.txt',function(err,data){
    if (err) return console.error(err);
    console.log(data.toString())
});
console.timeEnd()
console.log('程序执行结束')


module.exports.greet = greet