
[完全平方数-力扣](https://leetcode-cn.com/problems/perfect-squares/description/)
<span style="color: #FFB73F">中等</span>

### 题目描述

给定正整数 `n`，找到若干个完全平方数（比如 `1, 4, 9, 16, ...`）使得它们的和等于 `n`。你需要让组成和的完全平方数的个数最少。

### 输入输出示例
**示例 1:**
```js
输入: n = 12
输出: 3 
解释: 12 = 4 + 4 + 4.
```

**示例 2:**
```js
输入: n = 13
输出: 2
解释: 13 = 4 + 9.
```
### 说明

### 解题方法

#### 1、动态规划

假设`num(n)`表示和为`n`的完全平方数的个数，对于一个数`n`，我们可以发现：`num(n) = num(n - k) + num(k) = num(n - k) + 1`，其中`k`是一个完全平方数。比如：`num(12) = num(8) + num(4)`，而`4`是一个完全平方数，所以`num(12) = num(8) + 1`。

上面只是取得了和的个数，而没有计算最小值。计算最小值：
```js
minNumSquares(n)=min(minNumSquares(n - k) + 1) ∀k ∈ square numbers & k <= n
```
比如`minNumSquares(12) = min(minNumSquares(11) + 1, minNumSquares(8) + 1, minNumSquares(3) + 1)`，而其中`minNumSquares(11)、minNumSquares(8)minNumSquares(3)`都可以通过相同方法计算。所以对于一个数`n`，我们先找到小于它的所有完全平方数：`squaresArr`。

> 代码实现：

```js
/**
 * @param {number} n
 * @return {number}
 */
var numSquares = function(n) {
  var dp = new Array(n + 1).fill(0)
  for(let i = 1; i <= n; i++) {
    dp[i] = i
    for(let j = 1; i - j**2 >= 0; j++) {
      dp[i] = Math.min(dp[i], dp[i - j**2] + 1)
    }
  }
  return dp[i]
};
```

> 时间复杂度&空间复杂度：
- 时间复杂度：`O(n)+ln(n)`
- 空间复杂度：`O(n)`

> 执行结果：

- 执行用时：`268 ms`，在所有`JavaScript`提交中击败了`25.27 %`的用户
- 内存消耗：`40.8 MB`，在所有`JavaScript`提交中击败了`60.61 %`的用户
