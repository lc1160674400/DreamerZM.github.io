import {
    isFunction
  } from './utils';
  import {
    noop,
    nextId,
    PROMISE_ID,
    initializePromise
  } from './-internal';
  import {
    asap,
    setAsap,
    setScheduler
  } from './asap';
  
  import all from './promise/all';
  import race from './promise/race';
  import Resolve from './promise/resolve';
  import Reject from './promise/reject';
  import then from './then';
  
  function needsResolver() {
    throw new TypeError('You must pass a resolver function as the first argument to the promise constructor');
  }
  
  function needsNew() {
    throw new TypeError("Failed to construct 'Promise': Please use the 'new' operator, this object constructor cannot be called as a function.");
  }
  
  /**
    Promise对象表示异步操作的最终结果。该
    与promise相互作用的主要方式是通过它的`then`方法
    注册回调以接收promise的最终值或原因
    为什么承诺无法实现。
  
    术语
    -----------
  
     - `promise`是一个带有`then`方法的对象或函数，其行为符合此规范。
     - `thenable`是定义`then`方法的对象或函数。
     - “value”是任何合法的JavaScript值（包括undefined，thenable或promise）。
     - `exception`是使用throw语句抛出的值。
     - “reason”是一个值，表示拒绝承诺的原因。
     - “确定”承诺的最终休息状态，履行或拒绝。
  
    承诺可以处于以下三种状态之一：待处理，已履行或已拒绝。
  
    履行的承诺具有履行价值并且已经实现
    州。被拒绝的承诺有拒绝原因并且在
    被拒绝的国家履行价值永远不可能。
  
    承诺也可以说*解决*一个价值。如果这个值也是一个
    保证，那么原始承诺的已结算状态将与价值相匹配
    定居状态。因此承诺*解决*拒绝的承诺
    本身拒绝，并承诺*解决*履行意愿的承诺
    本身实现。
  */
  

  // 创建promise类
  class Promise {

    constructor(resolver) {
      //创建一个私有变量 PROMISE_ID  其实就是个自增变量
      this[PROMISE_ID] = nextId();
      // 清空状态和结果
      this._result = this._state = undefined;
      // 订阅者？暂时不确定
      this._subscribers = [];
  
      if (noop !== resolver) {
        // resolver 必须是函数类型
        typeof resolver !== 'function' && needsResolver();
        // 防止直接掉用promise方法
        
        this instanceof Promise ? initializePromise(this, resolver) : needsNew();
        /*
          通过传入的异步函数初始化promise对象
          function initializePromise(promise, resolver) {
            try {
              将resolve函数封装一次
              resolver(function resolvePromise(value){
                resolve(promise, value);
              }, function rejectPromise(reason) {
                reject(promise, reason);
              });
            } catch(e) {
              reject(promise, e);
            }
          }
        */
      }
    }
    catch(onRejection) {
      return this.then(null, onRejection);
    }
    finally(callback) {
      let promise = this;
      let constructor = promise.constructor;
  
      if ( isFunction(callback) ) {
        return promise.then(value => constructor.resolve(callback()).then(() => value),
                           reason => constructor.resolve(callback()).then(() => { throw reason; }));
      }
  
      return promise.then(callback, callback);
    }
  }
  
  Promise.prototype.then = then;
  /*
  export default function then(onFulfillment, onRejection) {

    // 此处的parent 指向promise对象
    const parent = this;
    // child是一个新的promise对象
    const child = new this.constructor(noop);
    // 如果child的primiseID不存在（基本上不会不存在啊？每次new一个对象都会调用nextId）
    if (child[PROMISE_ID] === undefined) {
      makePromise(child);
      // 如果不存在promise ，就初始化一下
      //function makePromise(promise) {
          promise[PROMISE_ID] = id++;
          promise._state = undefined;
          promise._result = undefined;
          promise._subscribers = [];
        }
    }
    // 创建state变量指向原promise
    const { _state } = parent;

    // 如果promise不为空，表示then方法被某个promise调用
    if (_state) {
      const callback = arguments[_state - 1];
      asap(() => invokeCallback(_state, child, callback, parent._result));
    } else {
      subscribe(parent, child, onFulfillment, onRejection);
    }

    return child;
  }
  */
  export default Promise;
  Promise.all = all;
  Promise.race = race;
  Promise.resolve = Resolve;
  Promise.reject = Reject;
  Promise._setScheduler = setScheduler;
  Promise._setAsap = setAsap;
  Promise._asap = asap;
  
  