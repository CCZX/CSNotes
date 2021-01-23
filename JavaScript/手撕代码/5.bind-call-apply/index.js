Function.prototype.myCall = function (ctx, ...args) {
  const fn = this
  ctx.fn = fn
  const res = ctx.fn(...args)
  delete ctx.fn

  return res
}

Function.prototype.myApply = function (ctx, args) {
  ctx.fn = this
  let res
  if (Array.isArray(args)) {
    res = ctx.fn(...args)
  } else {
    res = ctx.fn()
  }

  delete ctx.fn

  return res
}

Function.prototype.myBind = function (ctx, ...initArgs) {
  const fn = this

  function resFn(...args) {

    // 用于判断是否为 new 调用
    if (this instanceof resFn) {
      fn.apply(this, [...initArgs, ...args])
    } else {
      fn.apply(ctx, [...initArgs, ...args])
    }
  }

  resFn.prototype = Object.create(this.prototype)

  return resFn
}
