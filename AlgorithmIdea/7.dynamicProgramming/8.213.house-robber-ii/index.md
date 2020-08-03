### 题目描述：

[leetcode](https://leetcode-cn.com/problems/house-robber-ii) <span style="color: #ffb73f">中等</span>

> 你是一个专业的小偷，计划偷窃沿街的房屋，每间房内都藏有一定的现金。这个地方所有的房屋都围成一圈，这意味着第一个房屋和最后一个房屋是紧挨着的。同时，相邻的房屋装有相互连通的防盗系统，如果两间相邻的房屋在同一晚上被小偷闯入，系统会自动报警。给定一个代表每个房屋存放金额的非负整数数组，计算你在不触动警报装置的情况下，能够偷窃到的最高金额。

### 示例

输入: [2,3,2]，输出: 3，解释: 你不能先偷窃 1 号房屋（金额 = 2），然后偷窃 3 号房屋（金额 = 2）, 因为他们是相邻的。

输入: [1,2,3,1]，输出: 4，解释: 你可以先偷窃 1 号房屋（金额 = 1），然后偷窃 3 号房屋（金额 = 3）。偷窃到的最高金额 = 1 + 3 = 4 。

### 思路

#### 1、动态规划

这题和[打家劫舍](https://leetcode-cn.com/problems/house-robber/)的解法思路是一样的，唯一的区别是这是在一个环形上进行的，所以打劫了第一个就不能打劫最后一个，打劫了最后一个就不能打劫第一个。所以我们可以**分别计算不打劫第一个和不打劫最后一个的值，然后比较两个值得大小**。在分别计算不打劫第一个和不打劫第二个的值时，就可以使用[7.198.house-robber](./../7.198.house-robber/index.js)的解法。

```js
function robSingle(nums) {
  let pre1 = 0
  let pre2 = 0
  for(let i = 0; i < nums.length; i++) {
    const cur = Math.max(nums[i] + pre2, pre1)
    pre2 = pre1
    pre1 = cur
  }
  return pre1
}

var rob = function(nums) {
  if(nums.length === 0) {
    return 0
  }
  if(nums.length === 1) {
    return nums[0]
  }
  const noFirst = robSingle(nums.slice(1))
  const noLast = robSingle(nums.slice(0, nums.length - 1))
  return Math.max(noFirst, noLast)
}
```

- 执行用时：`84 ms`，在所有`JavaScript`提交中击败了`20.39%`的用户
- 内存消耗：`37.6 MB`，在所有`JavaScript`提交中击败了`44.00%`的用户
