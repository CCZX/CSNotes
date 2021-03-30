
[分隔等和子集-力扣](https://leetcode-cn.com/problems/partition-equal-subset-sum)
<span>中等</span>

### 题目描述
给定一个只包含正整数的非空数组。是否可以将这个数组分割成两个子集，使得两个子集的元素和相等。

**注意:**

每个数组中的元素不会超过 100
数组的大小不会超过 200

### 输入输出示例
**示例 1:**
```js
示例 1:

输入: [1, 5, 11, 5]

输出: true

解释: 数组可以分割成 [1, 5, 5] 和 [11].
 
```

**示例 2:**
```js
示例 2:

输入: [1, 2, 3, 5]

输出: false

解释: 数组不能分割成两个元素和相等的子集.
```

### 解题方法

#### 1、递归


> 代码实现：

```js
/**
 * @param {number[]} nums
 * @return {boolean}
 */
var canPartition = function(nums) {
  let sum = 0
  for(const num of nums) {
    sum += num
  }
  if(sum % 2 !== 0) return false // 奇数

  const target = sum / 2

  const dfs = (currSum, i) => {
    if(i === nums.length || currSum > target) return false
    if(currSum === target) return true

    return dfs(currSum + nums[i], i + 1) || dfs(currSum, i + 1)
  }

  return dfs(0, 0)
};
```

> 时间复杂度&空间复杂度：
- 时间复杂度：`O()`
- 空间复杂度：`O()`

> 执行结果：

- 执行用时：` ms`，在所有`JavaScript`提交中击败了` %`的用户
- 内存消耗：` MB`，在所有`JavaScript`提交中击败了` %`的用户

#### 2、动态规划

> 代码实现：

```js
/**
 * @param {number[]} nums
 * @return {boolean}
 */
var canPartition = function(nums) {
  const len = nusm.length
  let sum = 0
  for(const num of nums) {
    sum += num
  }
  if(sum % 2 !== 0) return false // 奇数

  const target = sum / 2

  const dp = Array(len).fill(0).map(() => Array(target + 1).fill(false))
  for(let i = 0; i < len; i++) {
    dp[i][0] = true
  }

  for(let i = 1; i < len; i++) {
    for(let j = 1; j <= target; j++) {
      const num = nums[i]
      if (j >= num) {
        dp[i][j] = dp[i - 1][j] | dp[i - 1][j - num];
      } else {
        dp[i][j] = dp[i - 1][j];
      }
    }
  }

  return dp[n - 1][target]
};
```

> 时间复杂度&空间复杂度：
- 时间复杂度：`O()`
- 空间复杂度：`O()`

> 执行结果：

- 执行用时：` ms`，在所有`JavaScript`提交中击败了` %`的用户
- 内存消耗：` MB`，在所有`JavaScript`提交中击败了` %`的用户
