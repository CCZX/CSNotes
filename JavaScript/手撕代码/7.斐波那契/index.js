/**
 * 递归实现。有大量重复计算的问题，比如f(5)需要计算f(4)、f(3)，f(4)又需要计算f(3)
 * @param {*} n 
 */
function recursion(n) {
  if (n === 0) return 0
  if (n === 1) return 1
  return recursion(n - 2) + recursion(n - 1)
}

const cache = {}
function cacheRecursion(n) {
  if (cache[n]) return cache[n]
  if (n === 0 || n === 1) {
    cache[n] = n
    return n
  }
  const temp = recursion(n - 2) + recursion(n - 1)
  cache[n] = temp
  return temp
}

/**
 * 动态规划实现
 * @param {*} n 
 */
function dpFibonacci(n) {
  let arr = new Array(n + 1).fill(0)
  arr[1] = 1
  arr[2] = 1
  if (n <= 2) {
    return arr[n]
  }
  for (let i = 3; i <= n; i++) {
    arr[i] = arr[i - 1] + arr[i - 2]
  }
  console.log(arr)
  return arr[n]
}

/**
 * 通过观察发现在整个过程中只有 n - 1 和 n - 2 有关所以只用两个变量即可
 * @param {*} n 
 */
function dpSignle(n) {
  if (n < 2) {
    return n
  }
  let prev = 0
  let curr = 1
  for (let i = 2; i <= n; i++) {
    let temp = curr + prev
    prev = curr
    curr = temp
  }
  return curr
}

