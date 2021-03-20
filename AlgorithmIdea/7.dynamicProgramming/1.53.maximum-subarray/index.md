### 题目

[LeetCode](https://leetcode-cn.com/problems/maximum-subarray/solution/) <span style="color: #5AB726">简单</span>

### 题目描述

给定一个整数数组 `nums` ，找到一个具有最大和的连续子数组（子数组最少包含一个元素），返回其最大和。

### 输入输出示例

```js
输入: [-2,1,-3,4,-1,2,1,-5,4]
输出: 6
解释: 连续子数组 [4,-1,2,1] 的和最大，为 6。
```

### 解题方法

#### 1、动态规划

首先假设：`nums`是长度为`n`的数组，`f(i)`代表以第`i`个数结尾的**连续子数组的最大和**。那么和最大的连续子数组为：
```js
max{f(0), f(1), ..., f(n - 1)}
```
所以我们当前的关键就是求得`f(i)`后取出`f`数组中最大的值，所以目前的关键之处就是在于如何求得`f(i)`。我们可以考虑当取得数组第`i`项`nums[i]`时，可以考虑是成为单独一段子数组还是和`f(i - 1)`组成一段，这当然取决于`f(i - 1) + nums[i]`和`nums[i]`的大小关系，所以：
```js
f(i) = max{nums[i], nums[i] + f(i - 1)}
```

```js
dp[i] = max(dp[i - 1] + nums[i], nums[i])
```

> 代码实现：

```js
const maxSubArray = function(nums) {
  let pre = 0
  let max = nums[0]
  nums.forEach((item, index) => {
    pre = Math.max(item, item + pre) // max{nums[i], nums[i] + f(i - 1)}
    max = Math.max(pre, max) // max{f(0), f(1), ..., f(n - 1)}
  })
  return max
};
```
> 执行结果：

- 执行用时：`84 ms`，在所有`JavaScript`提交中击败了`61.84%`的用户
- 内存消耗：`38.2 MB`，在所有`JavaScript`提交中击败了`77.74%`的用户

sum[i] = Max(sum[i - 1], sum[i - 1] + nums[i])
max = Max(sum[0], sum[1], ..., sum[i])

```js
const maxSub = (nums) => {
  let sum = nums[0]
  let max = nums[0]
  nums.forEach(n => {
    sum = Math.max(sum, sum + n)
    max = Math.max(max, sum)
  })
  return max
}
```
