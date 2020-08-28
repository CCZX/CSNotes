
[平方数之和](https://leetcode-cn.com/problems/sum-of-square-numbers/)
<span style="color: #5AB726">简单</span>

### 题目描述
给定一个非负整数 `c` ，你要判断是否存在两个整数 `a` 和 `b`，使得 `a^2 + b^2 = c`。
### 输入输出示例

```js
示例1:

输入: 5
输出: True
解释: 1 * 1 + 2 * 2 = 5
 

示例2:

输入: 3
输出: False
```

### 说明

### 解题方法

#### 1、二分法
`c`与`a b`两个数存在关系：`a^2 + b^2 = c`，则：`a^2 < c && b^2 < c`。我们使用变量`i`开始遍历该数，则终止条件 `i^2 > c`。

> 代码实现：

```js
/**
 * @param {number} c
 * @return {boolean}
 */
var judgeSquareSum = function(c) {
  for(let i = 0; i * i <= c; i++){
    const req = Math.sqrt(c - (i**2))
    if(req % 1 === 0) return true
  }
  return false
};
```

> 时间复杂度&空间复杂度：
- 时间复杂度：O(logn)
- 空间复杂度：O(1)

> 执行结果：

- 执行用时：`96.21 ms`，在所有`JavaScript`提交中击败了`37.5 %`的用户
- 内存消耗：`38.1 MB`，在所有`JavaScript`提交中击败了`29.91 %`的用户

#### 4、双指针

```js
/**
 * @param {number} c
 * @return {boolean}
 */
const judgeSquareSum = function(c) {
  let i = 0
  let j = Math.ceil(Math.sqrt(c))
  while ( i <= j ) {
    const sum = i ** 2 + j ** 2
    console.log(sum)
    if (sum === c) {
      return true
    } else if (sum < c) {
      i++
    } else if (sum > c) {
      j--
    }
  }
  return false
}
```
