/**
 * 在数组中找出和值为给定值的两个数  
 * arr = [32, 3, 5, 1, 30, 76, 2, 10, 29]  
 * n = 31输出[[1, 30], [2, 29]]
 * function find(arr, n) {}
 * 写一个find函数，实现上面的要求，有没有只遍历一遍的方法？
 */

function find(arr, n) {
  const map = {}
  const res = []
  arr.forEach((item, index) => {
    if (map[item]) {
      res.push([map[item], item])
    } else {
      map[n - item] = item
    }
  });
  return res
}
const arr = [32, 3, 5, 1, 30, 76, 2, 10, 29]
const res = find(arr, 31)
console.log(res)
