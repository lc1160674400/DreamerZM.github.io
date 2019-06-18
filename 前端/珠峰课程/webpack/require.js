
/**
 * //define 声明模块，通过require使用一个模块

 * 简单的 amd 实现
 */
let factories = {

};
//名字，依赖，工厂函数
function define(moduleName,dependencies,factory){
    factories[moduleName] = factory;
    factory.dependencies = dependencies     //将依赖记到factory上
}

function require(mods,callback){
    let result = mods.map(function(mod){//name,content
            let factory = factories[mod]
            let exports ;
            let dependencies = factory.dependencies;
            //require([name],function)
            require(dependencies,function(){
                exports =factory.apply(null,arguments)
            })
            // exports =  factory()
            return exports;
    })
    callback.apply(null,result)
}

define('name',[], function() {
    'use strict';
    return 'hello'
});

define('content',['name'],function(name){
    return name + 9
})


require(['content'],function(content){
    console.log(content)
})