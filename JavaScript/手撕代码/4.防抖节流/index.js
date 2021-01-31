/**
 * 防抖，多次调用只执行最后一次。公交车等待最后一个上车
 * @param {*} fn 
 * @param {*} wait 
 */
function debounce(fn, wait) {
  let timer = null
  return function (...args) {
    clearTimeout(timer)
    setTimeout(() => {
      fn.call(this, ...args)
    }, wait)
  }
}

/**
 * 节流：规定时间内只执行一次触发的。公交车一次只能上一个人
 * @param {*} fn 
 * @param {*} interval 
 */
function throttle(fn, interval) {
  let prevTime = 0
  return function (...args) {
    let currTime = Date.now()
    if (currTime - prevTime > interval) {
      fn.call(this, ...args)
      prevTime = currTime
    }
  }
}

/**
 * 防抖有时候因为触发太过频繁，导致一次响应都没有。
 * 所以希望固定的时间必定给用户一个响应，于是就有了防抖 + 节流的操作。
 * 设置 last 记录定时器开始的时间
 * 设置 timer 表示一个定时器
 * 获取当前时间 now
 * 如果当前时间 - 开始时间小于延迟时间，那么就防抖
 * 否则设置时间到了，执行函数
 * @param {*} fn 
 * @param {*} wait 
 */

function debounceThrottle(fn, wait) {
  let prevTime = 0
  let timer = null
  return function (...args) {
    const currTime = Date.now()
    // 如果当前点击的时间和上一次执行的时间差小于间隔时间就使用防抖
    if (prevTime && currTime - prevTime < wait) {
      clearTimeout(timer)
      timer = setTimeout(() => {
        fn.apply(this, args)
        prevTime = currTime
      }, wait)
    } else {
      fn.apply(this, args)
      prevTime = currTime
    }
  }
}
