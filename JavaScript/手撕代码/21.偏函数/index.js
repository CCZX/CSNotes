/**
 * 将接受 x 个参数的函数，转换成固定 n 个参数的函数，剩余的 (x - n) 个参数在下一次调用。
 * 有一点点类似于函数柯里化
 */
function partial(fn, ...fixedArgs) {
  return function (...args) {
    fn.apply(this, [...fixedArgs, ...args])
  }
}

/**
 * 我们希望可以实现占位的功能比如：
 * function clg(a, b, c) {
 *  console.log(a, b, c)
 * }
 * let partialClg = partial(clg, '_', 2)
 * partialClg(1, 3)  // 依次打印：1, 2, 3
 * 其中 _ 就是占位符
 * 
 * 其实这种设计有点问题，如上面的例子：只固定第二个参数其实正常的情况应该把第二个参数作为第一个
 * 但是如果有时候需要无奈实现这种需求
 */
function partial2(fn, ...fixedArgs) {
  return function (...args) {
    for (let i = 0; i < fixedArgs.length; i++) {
      const fixedArgsItem = fixedArgs[i]
      if (fixedArgsItem === '_') {
        fixedArgs[i] = args[i]
        args.splice(i, 1)
      }
    }
    fn.apply(this, [...fixedArgs, ...args])
  }
}