### 题目

[最小路径和-力扣](https://leetcode-cn.com/problems/minimum-path-sum/)
中等

### 题目描述
给定一个包含非负整数的 `m x n` 网格，每次只能向下或者向右移动一步，请找出一条从左上角到右下角的路径，使得路径上的数字总和为最小。

### 输入输出示例
```js
输入:
[
  [1,3,1],
  [1,5,1],
  [4,2,1]
]
输出: 7
解释: 因为路径 1→3→1→1→1 的总和最小。
```

### 说明
每次只能向下或者向右移动一步。

### 解题方法

#### 1、动态规划
假设`dp[m, n]`表示到达`p(m, n)`位置的路径的总和最小值，`nums[m, n]`表示该位置的权重。每次只能向下或者向右移动一步，所以状态方程：
```js
dp[m, n] = min(dp[m - 1, n], dp[m, n - 1]) + nums[m, n]
```

> 代码实现：

```js
/**
 * @param {number[][]} grid
 * @return {number}
 */
 const minPathSum = function(grid) {
  const rows = grid.length
  const clos = grid[0].length
  const dp = Array(rows).fill([])

  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < clos; j++) {
      if (i === 0 && j === 0) {
        dp[i][j] = grid[i][j]
      } else if (i === 0) {
        dp[i][j] = grid[i][j] + dp[i][j-1]
      } else if (j === 0) {
        dp[i][j] = grid[i][j] + dp[i-1][j]
      } else {
        dp[i][j] = Math.min(grid[i][j] + dp[i-1][j], grid[i][j] + dp[i][j-1])
      }
    }
  }
  return dp[rows-1][clos-1]
}
```

> 时间复杂度空间复杂度：
- 时间复杂度：O(n^2)
- 空间复杂度：O(n^2)

> 执行结果：

- 执行用时：`84 ms`，在所有`JavaScript`提交中击败了`76.7 %`的用户
- 内存消耗：`38.4 MB`，在所有`JavaScript`提交中击败了`73.32 %`的用户

####

`dp[i][j] = Min(dp[i - 1][j], dp[i][j - 1]) + nums[i][j]`
```js

```
