// 参考学习网址：https://www.cnblogs.com/XieJunBao/p/9156134.html
// es6 Class实现版
// author:zming



class Promise{
    // 构造函数的参数是一个异步函数
    constructor(fn){

        // 定义三个常量
        this.pending = 'pending';
        this.fulfilled = 'fulfilled';
        this.rejected = 'rejected';


        // 初始化阶段
        this.value = null;          // 成功时的值
        this.reason = null;         // 失败时的值
        // this.onFulfilled = null;    // 成功时的回调函数
        // this.onRejected = null;     // 失败时的回调函数
        this.status = this.pending; // 初始化状态
        this.onFulfilledCallbacks = []; // 成功回调函数队列
        this.onRejectedCallbacks = []; // 失败回调函数队列



        // 执行异步函数
        fn(this.resolve.bind(this),this.reject.bind(this));     //绑定this指向
    }
    resolve(value){
        // 状态为pending的时候执行
        if(this.status === this.pending){
            //将resolve方法丢到异步队列放到then后面执行
            setTimeout(()=>{
                this.status = this.fulfilled
                this.value = value;
                // 回调队列中的函数逐一执行
                this.onFulfilledCallbacks.forEach(element => element(this.value)) 
            }) 
        }
      
    }
    reject(reason){
        if(this.status === this.pending){
            setTimeout(()=>{
                this.status = this.rejected
                this.reason = reason;
                this.onRejectedCallbacks.forEach(element => (element(this.reason)))
            })
        }
    }
    then(onFulfilled,onRejected){
        let bridgePromise;
        //防止使用者不传成功或失败回调函数，所以成功失败回调都给了默认回调函数
        onFulfilled = typeof onFulfilled === "function" ? onFulfilled : value => value;
        onRejected = typeof onRejected === "function" ? onRejected : error => { throw error };


        // 如果是pending状态 把回调函数赋值，等待结束时调用
        if(this.status === this.pending){
            return bridgePromise = new Promise((resolve,reject)=>{
                this.onFulfilledCallbacks.push((value)=>{
                    try{
                        let x = onFulfilled(value);
                        this.resolvePromise(bridgePromise,x,resolve,reject)
                    } catch(e){
                        reject(e)
                    }
                })

                this.onRejectedCallbacks.push((error)=>{
                    try{
                        let x = onRejected(error);
                        this.resolvePromise(bridgePromise,x,resolve,reject)
                    } catch(e){
                        reject(e)
                    }
                })
            })
        }
        // 如果是fulfilled直接执行fulfilled回调函数
        if(this.status === this.fulfilled){
            return bridgePromise = new Promise((resolve,reject)=>{
                setTimeout(() => {
                    try {
                        let x = onFulfilled(this.value);
                        this.resolvePromise(bridgePromise,x,resolve,reject)
                    }  catch(e){
                        this.reject(e)
                    } 
                });
            })
        }

        // 如果是rejected直接执行rejected回调函数
        if(this.status === this.rejected){
            return bridgePromise = new Promise((resolve,reject)=>{
                setTimeout(() => {
                    try{
                        let x = onRejected(this.reason);
                        this.resolvePromise(bridgePromise,x,resolve,reject)
                    } catch(e){
                        this.reject(e)
                    }
                });
            })
        }
    }

    // 根据当前promise和返回值x 新实例化一个Promise对象
    resolvePromise(bridgePromise,x,resolve,reject){
        let called = false; 
        if(bridgePromise === x){
            throw new TypeError('防止循环引用')
        }

        // 如果返回值是一个新的promise
        // if (x instanceof Promise){
        //     if(x.status === this.pending){
        //         x.then(y=>{
        //             this.resolvePromise(bridgePromise,y,resolve,reject)
        //         },error=>{
        //             reject(error);
        //         })
        //     } else{
        //         x.then(resolve,reject);
        //     }
        // } else{
        //     resolve(x);
        // }


        // A+ 规范 实现
        if(x !== null &&(typeof x === 'function' || typeof x === 'object')){
            try{
                let then = x.then;
                if(typeof then === 'function'){
                    then.call(x,y=>{
                        if(called) return;
                        called = true;
                        this.resolvePromise(bridgePromise, y ,resolve, reject)
                    },error=>{
                        if(called) return;
                        called = true;
                        reject(error);
                    })
                }else{
                    resolve(x);
                }
            }catch(e){
                if(called) return
                called = true   
                reject(e)
            }
        }else{
            resolve(x);
        }
    }

    // catch 函数
    catch(onRejected) {
        return this.then(null, onRejected);
    }
}

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

// let a = new Promise((resolve,reject)=>{
//     console.log('new promise')
//     reject('测试')
// }).then((res)=>{
//     console.log('resolved1 : ' + res)
// },(res)=>{
//     console.log('rejected1 : ' + res)
//     return new Promise((resolve,reject)=>{
//         setTimeout(()=>{
//             console.log('延时函数')
//             reject('222')
//         },1000)
//     })
// }).then((res)=>{
//     console.log('resolved2 : ' + res)
// },(res)=>{
//     console.log('rejected2 : ' + res)
// })