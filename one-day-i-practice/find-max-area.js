// 给定一个正整数数组，寻找和最大的连续子序列

/**
 * [-2, 1, -3, 4, -1, 2, 1, -5, 4]
 * [4, -1, 2 ,1]最大为6
 */

function find(arr) {
  let prev = 0
  let rest = 0
  arr.forEach(item => {
    prev = Math.max(item, prev + item)
    rest = Math.max(prev, rest)
  })
  return rest
}

const res = find([-2, 1, -3, 4, -1, 2, 1, -5, 4])
console.log(res)

function find2(arr) {
  let res = arr[0]
  arr.forEach(item => {

  })
}
