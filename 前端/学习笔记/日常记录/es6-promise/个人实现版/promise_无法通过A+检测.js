class Promise{
    // 初始化函数
    constructor(resolver){
        
        // 定义一些常量
        this.pending = 'pending'
        this.fulfilled = 'fulfilled'
        this.rejected = 'rejected'

        //  参数校验
        this.isFunction(resolver);

        // 初始化函数
        this.init();

        // 调用回调函数
        resolver(this.resolve.bind(this),this.reject.bind(this));
    }

    // ifFunction
    isFunction(arg){
        if(typeof arg !== 'function'){
            throw new TypeError(`Promise resolver ${arg} is not a function`)
        }
    }

    // init
    init(){
        this.status = this.pending;
        this.reason = undefined;
        this.value = undefined;
        this.resolves = [];
        this.rejects = [];
    }
    
    // resolve
    resolve (value) {
        if(this.status === this.pending){
            // 如果是等待状态但是是异步执行到这里,则把所有异步队列里的回调方法全部执行一遍
            this.status = this.fulfilled;
            this.value = value;
            this.resolves.forEach(element => {
                if(typeof element === 'function'){
                    element(this.value);
                }
            })
        }
    }

    // reject
    reject (reason) {
        if(this.status === this.pending){
            this.status = this.rejected;
            this.reason = reason;
            // 如果是等待状态但是是异步执行到这里,则把所有异步队列里的回调方法全部执行一遍
            this.rejects.forEach(element => {
                if(typeof element === 'function'){
                    element(this.reason);
                }
            })
        }
    }

    // then
    then (resolve,reject) {

        //  如果是fulfilled状态直接执行回调函数
        if(this.status === this.fulfilled){
            // 针对链式调用，返回一个新的promise
            let promise2 = new Promise(()=>{});
            // 获取上一个promise resolve的返回值
            let x = resolve(this.value);
            // 根据上一个给新的promise2 赋值一些东西
            this.createPromiseNew(promise2,x,this.resolve,this.reject)
            // 返回这个新的promise
            return promise2
        }

        // 如果是rejected状态直接执行rejected回调函数
        if(this.status === this.rejected){
            // 同理resolved
            let promise2 = new Promise(()=> {})
            let x = reject(this.reason);
            this.createPromiseNew(promise2,x,this.resolve,this.reject)
            return promise2
            
        }

        // 如果是异步执行
        if(this.status === this.pending){
            // 如果是异步执行的链式调用的话还是新建一个promise对象
            let promise2 = new Promise(()=>{})
            // 参数校验
            // 将修改promise2的逻辑同样push到对应执行队列里面，并且返回值修改新的返回promise
            typeof resolve === 'function' && this.resolves.push(()=>{
                let x = resolve(this.value)
                this.createPromiseNew(promise2,x,this.resolve,this.reject)
            })
            typeof reject === 'function' && this.rejects.push(()=>{
                let x = reject(this.reason);
                this.createPromiseNew(promise2,x,this.resolve,this.reject)
            })
            return promise2
        }
    }

    // 链式调用创建新的Promise 对象
    createPromiseNew(promise2,x,resolve,reject){
        //防止互相引用用
        if(promise2 === x ){
            throw new TypeError('相互引用')
        }

        // 保证不相互引用的前提下,如果上一个promise的返回值是对象或者方法
        if( x !== null && (typeof x === 'function' || typeof x === 'object')){
            //如果返回值是一个对象或者新的promise对象的话
            /**
             *  x 为对象或函数
                如果 x 为对象或者函数：

                把 x.then 赋值给 then 注5
                如果取 x.then 的值时抛出错误 e ，则以 e 为据因拒绝 promise
                如果 then 是函数，将 x 作为函数的作用域 this 调用之。传递两个回调函数作为参数，第一个参数叫做 resolvePromise ，第二个参数叫做 rejectPromise:
                如果 resolvePromise 以值 y 为参数被调用，则运行 [[Resolve]](promise, y)
                如果 rejectPromise 以据因 r 为参数被调用，则以据因 r 拒绝 promise
                如果 resolvePromise 和 rejectPromise 均被调用，或者被同一参数调用了多次，则优先采用首次调用并忽略剩下的调用
                如果调用 then 方法抛出了异常 e：
                如果 resolvePromise 或 rejectPromise 已经被调用，则忽略之
                否则以 e 为据因拒绝 promise
                如果 then 不是函数，以 x 为参数执行 promise
             */
            try{
                let then = x.then;
                // 如果x.then是函数，将 x 作为函数的作用域 this 调用之。传递两个回调函数作为参数，第一个参数叫做 resolvePromise ，第二个参数叫做 rejectPromise:
                // 那么就可能这是一个新的promise
                if(typeof then === 'function'){
                    then.call(x,(y)=>{
                        //如果 resolvePromise 以值 y 为参数被调用，则运行 [[Resolve]](promise, y)
                        // 如果返回值是promise类型，那么就要再创建一个proimse，以x也就是当前返回promise为父promise，递归创建

                        /**
                        * promise,        x,                     resolve,          reject           ，then
                        * 第一个promise，返回值中的新的promise， 新promise的resolve，新promise的reject ，新的promise中的then
                        */

                        this.createPromiseNew.call(x,promise2,y,this.resolve,this.reject)    //这句话可能有点疑问？？？？？
                    },(r)=>{
                        //如果 rejectPromise 以据因 r 为参数被调用，则以据因 r 拒绝 promise
                        this.reject.call(promise2,r)
                    })
                }
            }catch(e){
                // 如果取x.then出错的话则以e为原因拒绝promise
                reject(e)
            }
        }
        // 如果不是的话直接调用resolve函数
        else{
            resolve.call(promise2,x)
        }
    }
}
Promise.prototype.catch = function(reject) {
    return this.then(null, reject);
}

// 导出Promise模块
// module.exports = Promise


// 执行测试用例需要用到的代码
Promise.deferred = function() {
    let defer = {};
    defer.promise = new Promise((resolve, reject) => {
        defer.resolve = resolve;
        defer.reject = reject;
    });
    return defer;
}
try {
    module.exports = Promise
} catch (e) {}