# underscore.js源码阅读
------
最近看了一些Javascript的书籍，准备先看一些简单的源码，了解一下前人是怎么实现自己的代码逻辑，怎么优化自己的代码习惯，underscore.js好像就是一个不错的小工具源码JS，应该没有用到ES6的新语法，都是一些小功能的实现，但是对于理解js的基础和js的编程习惯应该有很大的帮助


> * 2019-3-23
 
首先全局代码是一个匿名函数，并且用this进行初始化调用，具体语法：
```javascript
    //所有函数体包裹在一个匿名函数内部并且通过call调用
    (function(){}.call(this))
    //call：语法强行改变函数执行的上下文，参数第一个为调用该函数时的对象，后面的参数为原始函数调用的时候需要传的参数，此时只有一个参数，并且为this，此处的this在引入该js时默认为：浏览器=》window，node环境=》exports
    var root = this;
    // 将this赋值给root
    var previousUnderscore = root._;
    //将全局环境的root._属性复制给一个变量
    var ArrayProto = Array.prototype, ObjProto = Object.prototype, FuncProto = Function.prototype;
    //将原型属性赋值出来
    var
      push             = ArrayProto.push,
      slice            = ArrayProto.slice,
      toString         = ObjProto.toString,
      hasOwnProperty   = ObjProto.hasOwnProperty;
    //将原型的一些常用方法赋值出来
    var
      nativeIsArray      = Array.isArray,
      nativeKeys         = Object.keys,
      nativeBind         = FuncProto.bind,
      nativeCreate       = Object.create;
    //将原生支持的一些常用方法封装出来
    var Ctor = function(){};
    //声明一个构造函数！
    var _ = function(obj) {
      if (obj instanceof _)
        return obj;
      if (!(this instanceof _))
        return new _(obj);
      this._wrapped = obj;
    };
    //以上代码使用到了javascript的不加关键字new的构造函数，好像jQuery就有用到这种处理方式，在使用jquery的时候我们并不需要new一个jquery实例进行使用
    //具体实现如下：
    


```
