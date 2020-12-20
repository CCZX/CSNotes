/**
 * 函数柯里化
 * @param {Function} fn 
 * @param  {...any} initArgs 
 */
function currying(fn, ...initArgs) {
  if (typeof fn !== 'function') {
    throw "The first argument is must be a function"
  }
  const args = [...initArgs]
  const needArgsLength = fn.length
  if (args.length >= needArgsLength) {
    return fn.apply(null, args)
  }
  return function (...restArgs) {
    const restArgsLength = restArgs.length
    if (restArgsLength + args.length >= needArgsLength) {
      return fn.apply(null, [...args, ...restArgs])
    }
    return currying(fn, ...[...args, ...restArgs])
  }
}

function add(x, y, z) {
  return x + y + z
}

// const sum = currying(add, 1, 2, 3)
// console.log(sum)

const curryingAdd = currying(add)
console.log(curryingAdd)

const add1 = curryingAdd(1)
console.log({add1})

var add2 = add1(2)

var sum = add2(4)
console.log(sum)
