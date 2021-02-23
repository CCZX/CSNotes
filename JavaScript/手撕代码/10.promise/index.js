const stateMap = {
  PENDING: 'pending',
  FULFILLED: 'fulfilled',
  REJECTED: 'rejected'
}

class MyPromise {
  constructor(fn) {
    this.state = stateMap.PENDING
    this.value = ''
    this.reason = ''
    this.onFulfilledCbList = []
    this.onRejectedCbList = []
    const resolve = (value) => {
      if (this.state === stateMap.PENDING) {
        this.state = stateMap.FULFILLED
        this.value = value
        this.onFulfilledCbList.forEach(cb => {
          cb(this.value)
        })
      }
    }
    const reject = (reason) => {
      if (this.state === stateMap.PENDING) {
        this.state = stateMap.REJECTED
        this.reason = reason
        this.onRejectedCbList.forEach(cb => {
          cb(this.reason)
        })
      }
    }

    try {
      fn(resolve, reject)
    } catch (error) {
      reject(error)
    }
  }

  then(onFulfilled, onRejected) {
    if (this.state === stateMap.FULFILLED) {
      onFulfilled(this.value)
    } else if (this.state === stateMap.REJECTED) {
      onRejected(this.reason)
    }
  }
}
