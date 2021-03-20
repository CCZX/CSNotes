### 题目描述：

[区域和检索-力扣](https://leetcode-cn.com/problems/range-sum-query-immutable/description/) <span style="color: #5AB726">简单</span>

> 给定一个整数数组  nums，求出数组从索引 i 到 j  (i ≤ j) 范围内元素的总和，包含 i,  j 两点。

### 输入输出示例

```
给定 nums = [-2, 0, 3, -5, 2, -1]，求和函数为 sumRange()

sumRange(0, 2) -> 1
sumRange(2, 5) -> -1
sumRange(0, 5) -> -3
```

### 说明

1. 你可以假设数组不可变。
2. 会多次调用 sumRange 方法。

### 思路

#### 1、动态规划

这里需要注意的是说明中**会多次调用 sumRange 方法**，所以我们希望在多次调用方法时不用每次都取 `i` 到 `j` 的值进行再次计算。

对于一个数组求其`i`项到`j`项之和，可以理解为`sum[j + 1] - sum[i]`，所以`sum[j + 1] - sum[i]`为状态转移方程。所以我们可以遍历数组求得每一个`sum[n]`的和。

sum[j - i] = sum[j] - sum[i]

1,2,3,4,5

```js
/**
 * @param {number[]} nums
 */
var NumArray = function(nums) {
  this.nums = nums
  const dp = [0]
  for(let i = 0; i < this.nums.length; i++) {
    dp.push(dp[i] + this.nums[i])
  }
  this.dp = dp
};

/** 
 * @param {number} i 
 * @param {number} j
 * @return {number}
 */
NumArray.prototype.sumRange = function(i, j) {
  return dp[j + 1] - dp[i]
};

/**
 * Your NumArray object will be instantiated and called as such:
 * var obj = new NumArray(nums)
 * var param_1 = obj.sumRange(i,j)
 */
```

**注意**我们将计算`dp`的循环放在了`NumArray`函数里面，是因为由于如果写在`NumArray.prototype.sumRange`里面每次调用`sumRange`方法的时候都会调用循环，写在`NumArray`这样我们只需要循环调用一次就行了。

- 时间复杂度：`O(n)`
- 空间复杂度：`O(n)`

- 执行用时：`160 ms`，在所有`JavaScript`提交中击败了`43.71%`的用户
- 内存消耗：`44.6 MB`，在所有`JavaScript`提交中击败了`49.18%`的用户

#### 2、暴力破解

当然我们可以使用暴力破解，但是时间复杂度很大，而且每次调用`sumRange`都会计算一次。
