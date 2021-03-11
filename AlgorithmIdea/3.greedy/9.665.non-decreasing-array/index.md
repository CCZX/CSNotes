
[非递减数列-力扣](https://leetcode-cn.com/problems/non-decreasing-array/)
<span>简单</span>

### 题目描述
给你一个长度为 n 的整数数组，请你判断在 最多 改变 1 个元素的情况下，该数组能否变成一个非递减数列。

我们是这样定义一个非递减数列的： 对于数组中任意的 i (0 <= i <= n-2)，总满足 nums[i] <= nums[i + 1]。

### 输入输出示例
**示例 1:**
```js
输入: nums = [4,2,3]
输出: true
解释: 你可以通过把第一个4变成1来使得它成为一个非递减数列。
```

**示例 2:**
```js
输入: nums = [4,2,1]
输出: false
解释: 你不能在只改变一个元素的情况下将其变为非递减数列。
```

**提示：**

- 1 <= n <= 10 ^ 4
- - 10 ^ 5 <= nums[i] <= 10 ^ 5

### 解题方法

#### 1、遍历

> 代码实现：
[3,4,2,3]
[4,2,3]
nums[i] > nums[i + 1] &&
nums[i] > nums[i + 2] &&
nums[i - 1] > nums[i + 1]
```js
/**
 * @param {number[]} nums
 * @return {boolean}
 */
var checkPossibility = function(nums) {
  let count = 0 // 落差数
  for (let i = 0, len = nums.length; i < len - 1; i++) {
    if (nums[i] > nums[i + 1]) {
      count++
      if (
        i > 0 && nums[i + 2] !== undefined
        && nums[i] > nums[i + 2] && nums[i - 1] > nums[i + 1]
      ) count++
    }
    if (count > 1) break
  }
  return count < 2
};
```
/**
 * @param {number[]} nums
 * @return {boolean}
 */
var checkPossibility = function(nums) {
    let l = nums.length, count = 0
    for(let i = 1; i< l && count<2; i++) {
        if(nums[i] < nums[i-1]) {
            count++
            if(i-2 >=0 && nums[i-2] > nums[i]) {
                nums[i] = nums[i-1]
            } else {
                nums[i-1] = nums[i]
            }
        }
    }
    return count <= 1
};

<!-- // /**
//  * @param {number[]} nums
//  * @return {boolean}
//  */
// var checkPossibility = function(nums) {
//   let num = 0
//   let target = nums[0]
//   for(let i = 0; i < nums.length; i++) {
//     if(nums[i + 1] < nums[i]) {
//       num++
//       if(nums[i + 2] < nums[i] )
//     }

//     if(target < nums[i]) {
//       target = nums[i]
//     } else {
//       num++
//       if(num > 1) {
//         return false
//       }
//     }
//   }
//   return true
// }; -->

> 时间复杂度&空间复杂度：
- 时间复杂度：`O()`
- 空间复杂度：`O()`

> 执行结果：

- 执行用时：` ms`，在所有`JavaScript`提交中击败了` %`的用户
- 内存消耗：` MB`，在所有`JavaScript`提交中击败了` %`的用户
