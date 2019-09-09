class Promise{
    // 构造函数
    constructor(resolver){
        this.isFunction(resolver);
        this.init();
        resolver(this.resolve.bind(this),this.reject.bind(this))
    }

    // isFunction
    isFunction(arg){
        typeof arg !== 'function' && this.errorHandle(TypeError,`Promise resolver ${arg} is not a function`);
    }
    // 定义错误处理工厂函数
    errorHandle(type,reason){;
        throw new type(reason)
    }

    // 初始化函数
    init(){
        this.status = this.pending;
        this.value = undefined;
        this.reason = undefined;
        // 成功回调函数队列
        this.resolves = [];
        // 失败回调函数队列
        this.rejects =[];
    }

    // resolve
    resolve(value){
        if(this.status === this.pending){
            this.value = value;
            // 把回调函数队列里面的任务全部执行
            this.resolves.forEach(element => {
              element(this.value)  
            });
            this.status = this.fulfilled;
        }
    }
    // reject
    reject(reason){
        if(this.status === this.pending){
            this.reason = reason;
            // 把回调函数队列里面的任务全部执行
            this.rejects.forEach(element => {
                element(reason)
              });
            this.status = this.rejected;
        }
    }
    // then
    then(onResolved,onRejected){
        if(this.status === this.fulfilled){
            this.isFunction(onResolved);
            let promise2 = new Promise((resolve,reject)=>{})
            let x = onResolved(this.value);
            this.createNewPromise(promise2,x,this.resolve,this.reject)
            return promise2;
        }
        if(this.status === this.rejected){
            this.isFunction(onRejected);
            let promise2 = new Promise((resolve,reject)=>{})
            let x = onRejected(this.reason);
            this.createNewPromise(promise2,x,this.resolve,this.reject)
            return promise2;
        }
        if(this.status === this.pending){
            // 如果是异步函数则把回调函数存到回调队列里面
            let promise2 = new Promise ((resolve, reject) => {})
            typeof onResolved === 'function' && this.resolves.push(()=>{
                let x = onResolved(this.value)
                this.createNewPromise(promise2,x,this.resolve,this.reject)
            })
            typeof onRejected === 'function' && this.rejects.push(()=>{
                let x = onRejected(this.reason)
                this.createNewPromise(promise2,x,this.resolve,this.reject)
            })
            return promise2;
        }
    }

    // 链式调用重新返回一个promise对象
    createNewPromise(promise2,x,resolve,reject){
        let called; 
        if(promise2 === x){
            reject(new TypeError('promise 发生了循环引用'))
        }
        if(x !== null && (typeof x ==='function' || typeof x ==='object')){
            try{
                let then = x.then;
                if(typeof then === 'function'){
                    // let y = then.call(x, (y) => {
                    //     //递归调用，传入y若是Promise对象，继续循环                               
                    //     this.createNewPromise(promise2, y, resolve, reject);
                    // }, (r) => {
                    //     reject(r);
                    // });
                    // 如果在回调中重新实例了一个Promise对象
                    then.call(x,(y)=>{
                        this.createNewPromise.call(x,promise2,y,this.resolve,this.reject);
                    }, (r) => {
                        if (called) return
                        called = true;
                        this.reject.call(promise2,r);
                    })
                } else{
                    resolve(then);
                }
            }
            catch(e){
                reject(e)
            }
        }else{
            resolve.call(promise2,x);
        }

    }

}
Promise.prototype.pending = 'pending';
Promise.prototype.fulfilled = 'fulfilled';
Promise.prototype.rejected = 'rejected';
module.exports =  Promise;