### 1、第一版

- 一个 promise 有且只有一个状态（pending，fulfilled，rejected 其中之一）
- pending 状态时：可能会转变为 fulfilled 或 rejected 状态
- fulfilled 状态时：
不能再状态为任何其他状态，必须有一个 value，且不可改变
- rejected 状态时：不能再状态为任何其他状态，必须有一个 reason，且不可改变
- 实现了then方法根据不同的状态进行调用
- 

> 缺点

- 所有方法都是同步执行的，then方法里面的回调函数没有等待实例状态变化后才执行。
- 不支持链式调用


```javascript
const PENDING = 'pending'
const FULFILLED = 'fulfilled'
const REJECTED = 'rejected'

class MyPromise {
  constructor(callback) {
    this.status = PENDING
    /**成功的值 */
    this.value = ''
    /**失败原因 */
    this.reason = ''
    const resolve = value => {
      if (this.status === PENDING) {
        this.status = FULFILLED
        this.value = value
      }
    }
    const reject = reason => {
      if (this.status === PENDING) {
        this.status = REJECTED
        this.reason = reason
      }
    }
    try {
      callback(resolve, reject)
    } catch (e) {
      reject(e)
    }
  }
  then(onFulfilled, onRejected) {
    if (this.status === FULFILLED) {
      onFulfilled(this.value)
    } else if (this.status === REJECTED) {
      onRejected(this.reason)
    }
  }
}

new MyPromise((resolve, reject) => {
  // setTimeout(() => {
  //    resolve(1)
  // }, 1000)
  resolve(1)
})
/**
 * 如果使用setTimeout在下个事件循环改变promise的状态
 * then方法在本次事件循环就执行了，没有在下次事件
 * 循环后执行
 */
.then(res => {
  console.log('success', res)
}, err => {
  console.log('error', err)
})

```

**Promise在初始化时，传入的函数是同步执行的，然后注册 then 回调**。注册完之后，继续往下执行同步代码，在这之前，then 中回调不会执行。同步代码块执行完毕后，才会在事件循环中检测是否有可用的 promise 回调，如果有，那么执行，如果没有，继续下一个事件循环。上面的代码then方法没有等待到状态改变后才执行，而是直接执行了。

### 2、第二版

为了解决上面代码的问题，我们在then注册回调函数时不执行回调函数，而是用一个数组把它存储起来，在promise的状态发生后再执行。

```javascript
const PENDING = 'pending'
const FULFILLED = 'fulfilled'
const REJECTED = 'rejected'

class MyPromise {
  constructor(callback) {
    this.status = PENDING
    /**成功的值 */
    this.value = ''
    /**失败原因 */
    this.reason = ''
    this.onFulfilledCallbackList = []
    this.onRejectedCallbackList = []
    const resolve = value => {
      // 使用setTimeout等待then注册回调函数成功。保证了then的方法onFulfill回调在下一轮事件循环执行
      setTimeout(() => {
        if (this.status === PENDING) {
          this.status = FULFILLED
          this.value = value
          this.onFulfilledCallbackList.forEach(cb => {
            if (typeof cb === 'function') {
              // 将value赋值为onFulfill执行的结果，方便下一次调用
              this.value = cb(this.value)
            }
          })
        }
      }, 0)
    }
    const reject = reason => {
    // 使用setTimeout等待then注册回调函数成功。保证了then的方法onRejected回调在下一轮事件循环执行
      setTimeout(() => {
        if (this.status === PENDING) {
          this.status = REJECTED
          this.reason = reason
          this.onRejectedCallbackList.forEach(cb => {
            if (typeof cb === 'function') {
              this.reason = cb(this.reason)
            }
          })
        }
      }, 0)
    }
    try {
      callback(resolve, reject)
    } catch (e) {
      reject(e)
    }
  }
  then(onFulfilled, onRejected) {
    if (typeof onFulfilled === 'function') this.onFulfilledCallbackList.push(onFulfilled)
    if (typeof onRejected === 'function') this.onRejectedCallbackList.push(onRejected)
    
    // 根据不同的状态返回
    if (this.status === PENDING) {
      return new MyPromise((resolve, reject) => {
        this.onFulfilledCallbackList.push(() => {
          // 判断then方法是否返回的promise实例
          if (this.value instanceof MyPromise) {
            // 如果返回值是promise实例则需要调用then方法
            this.value.then(resolve, reject)
          } else {
            resolve(this.value)
          }
        })
        this.onRejectedCallbackList.push(() => {
          if (this.reason instanceof MyPromise) {
            this.reason.then(resolve, reject)
          } else {
            resolve(this.reason)
          }
        })
      })
    }
    if (this.status === FULFILLED) {
      return new MyPromise(resolve => {
        resolve(this.value)
      })
    }
    if (this.status === REJECTED) {
      return new MyPromise(resolve => {
        resolve(this.reason)
      })
    }
  }
  catch(onRejected) {
    if (typeof onRejected === 'function') this.onRejectedCallbackList.push(onRejected)
  }
}
```


### 3、第三版

1. promise（promise1）的then方法必须返回一个新的promise对象（promise2）
2. 不管promise1是reject还是resolve返回的promise2都是被resolve，除非onFulfilled或者onRejected出现异常情况
3. 如果promise1的onFulfilled、onRejected返回一个value，则promise2会以[[Resolve]](promise2, x) 处理解析
4. 如果promise的状态是pending则then方法的回调函数需要等待状态变为fulfilled或者rejected再执行，否则立即执行
5. promise的then方法支持链式调用
6. 如果 onFulfilled 不是一个函数，并且 promise1 状态是 fulfilled，那么 promise2 一定会接受到与 promse1 一样的值 value
7. 如果 onRejected 不是一个函数，并且 promise1 状态是 rejected，promise2 一定会接受到与 promise1 一样的值 reason

依次实现：
```
const PENDING = 'pending'
const FULFILLED = 'fulfilled'
const REJECTED = 'rejected'

class MyPromise {
  constructor(callback) {
    this.status = PENDING
    /**成功的值 */
    this.value = ''
    /**失败原因 */
    this.reason = ''
    this.onFulfilledCallbackList = []
    this.onRejectedCallbackList = []
    const resolve = value => {
      // 使用setTimeout等待then注册回调函数成功。保证了then的方法onFulfill回调在下一轮事件循环执行
      setTimeout(() => {
        if (this.status === PENDING) {
          this.status = FULFILLED
          this.value = value
          this.onFulfilledCallbackList.forEach(cb => {
            if (typeof cb === 'function') {
              this.value = cb(this.value)
            }
          })
        }
      })
    }
    const reject = reason => {
      setTimeout(() => {
        if (this.status === PENDING) {
          this.status = REJECTED
          this.reason = reason
          this.onRejectedCallbackList.forEach(cb => {
            if (typeof cb === 'function') {
              this.reason = cb(this.reason)
            }
          })
        }
      })
    }
    try {
      callback(resolve, reject)
    } catch (e) {
      reject(e)
    }
  }
  then(onFulfilled, onRejected) {
    let nextPromise = null

    /**
     * 如果onFulfilled或者onRejected不是函数，
     * 把它封装成一个返回当前value或者reason的函数
     */
    if (typeof onFulfilled !== 'function') {
      onFulfilled = value => value
    }
    if (typeof onRejected !== 'function') {
      onRejected = reason => reason
    }

    if (this.status === PENDING) {

      /**
       * 状态还是pending，所以将onFulfilled和onRejected加入执行队列，
       * 在状态变为fulfilled或者rejected后才执行
       */
      return nextPromise = new MyPromise((resolve, reject) => {
        this.onFulfilledCallbackList.push(() => {
          try {
            const x = onFulfilled(this.value)
            resolvePromise(nextPromise, x, resolve, reject)
            // 捕获执行中的错误
          } catch (e) {
            reject(e)
          }
        })
        this.onRejectedCallbackList.push(() => {
          try {
            const x = onFulfilled(this.reason)
            resolvePromise(nextPromise, x, resolve, reject)
          } catch (e) {
            reject(e)
          }
        })
      })
    }
    if (this.status === FULFILLED) {

      /**
       * 状态已经改变为fulfilled，直接执行onFulfilled，不需要等待
       */
      return nextPromise = new MyPromise((resolve, reject) => {
        setTimeout(() => {
          try {
            const x = onFulfilled(this.value)
            resolvePromise(nextPromise, x, resolve, reject)
          } catch (e) {
            reject(e)
          }
        }, 0)
      })
    }
    if (this.status === REJECTED) {

      /**
       * 状态已经改变为rejected，直接执行onrejected，不需要等待
       */
      return nextPromise = new MyPromise((resolve, reject) => {
        setTimeout(() => {
          try {
            const x = onRejected(this.reason)
            resolvePromise(nextPromise, x, resolve, reject)
          } catch (e) {
            reject(e)
          }
        }, 0)
      })
    }
  }
  catch(onRejected) {
    if (typeof onRejected === 'function') this.onRejectedCallbackList.push(onRejected)
  }
}

function resolvePromise(promise, x, resolve, reject) {
  if (x instanceof MyPromise) {
    x.then(resolve, reject)
  } else {
    resolve(x)
  }
}
```
