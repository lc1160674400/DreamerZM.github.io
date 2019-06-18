//common.js
/**
 * 简单的common.js的引用实现
 */
let fs = require('fs');

function req(moduleName) {
    let content = fs.readFileSync(moduleName,'utf8')
    /**
     * function(export,module,require,__dirname,__filename){
     *      module.exports = 'hello , world'
     *      return module.exports
     * }
     */
    let fn = new Function('exports','module','require','__dirname','__filename',content + '\n return module.exports')
    let module = {
        exports:{}
    }
    return fn(module.exports,module,req,__dirname,__filename)
}

let str = req('./a.js')
console.log(str)

//amd.js
/**
 * 
 * 优点：
 * -可以在不转换代码直接在浏览器中运行
 * -可以
 */