
[最长上升子序列-力扣](https://leetcode-cn.com/problems/longest-increasing-subsequence/description/)
<span>中等</span>

### 题目描述
给定一个无序的整数数组，找到其中最长上升子序列的长度。

### 输入输出示例
**示例 1:**
```js
输入: [10,9,2,5,3,7,101,18]
输出: 4 
解释: 最长的上升子序列是 [2,3,7,101]，它的长度是 4。
```

**说明：**
- 可能会有多种最长上升子序列的组合，你只需要输出对应的长度即可。
- 你算法的时间复杂度应该为 `O(n2)` 。

**进阶：**你能将算法的时间复杂度降低到 `O(n log n)` 吗?


### 解题方法

#### 1、动态规划
假设`nums[i]`表示第`i`个数的值`dp[i]`表示前`i`个数能产生最长升序子序列的长度，所以想要得到`dp[i]`，就需要得到`dp[i - 1]`(前`i - 1`个数能产生最长升序子序列的长度)。如果`nums[i] > nums[i - 1]`，那么`dp[i] = dp[i - 1] + 1`，否则`dp[i] = dp[i - 1]`。同理类似需要得到dp[i - 1]，就需要得到dp[i - 2]以及`nums[i - 1]和nums[i - 2]`的大小关系。

所以让第`i`为，分别跟在第`0`到`i`为作为结束字符串的后面。

状态转移方程：
```js
if (nums[i] > nums[i - 1]) {
  dp[i] = dp[i - 1] + 1
} else {
  dp[i] = 1
}
```

> 代码实现：

```js
/**
 * @param {number[]} nums
 * @return {number}
 */
var lengthOfLIS = function(nums) {
  const len = nums.length
  if(len < 2) return len
  const dp = new Array(len).fill(1)
  for(let i = 1; i < len; i++) {
    // 遍历i前面的dp[0]到dp[i-1]
    for(let j = 0; j < i; j++) {
      if(nums[i] > nums[j]) {
        dp[i] = Math.max(dp[j] + 1, dp[i])
      }
    }
  }
  return Math.max(...dp)
};
```

> 时间复杂度&空间复杂度：
- 时间复杂度：`O(n^2)`
- 空间复杂度：`O(n)`

> 执行结果：

- 执行用时：`104 ms`，在所有`JavaScript`提交中击败了`63.09 %`的用户
- 内存消耗：`38.1 MB`，在所有`JavaScript`提交中击败了`21.71 %`的用户
