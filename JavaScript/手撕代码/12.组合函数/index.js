/**
 * const f = x => x + 1
 * const g = x => x * 2
 * const t = (x, y) => x + y
 * const c = compress(f, g, t)
 * f(g(f(1, 2)))
 * c(1, 2) // 3 => 6 => 7
 */

function compress(...fns) {
  return function (...args) {
    return fns.reduceRight((result, fn) => {
      return fn.apply(null, result)
    }, args)
  }
}

const compose = (...fns) => {
  return (...args) => {
    return fns.reduceRight((val, fn) => {
      fn.apply(null, [].concat(val))
    }, args);
  }
}
