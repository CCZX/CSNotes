
[整数拆分](https://leetcode-cn.com/problems/integer-break/)
<span style="color: #FFB73F">中等</span>

### 题目描述
给定一个正整数 `n`，将其拆分为至少两个正整数的和，并使这些整数的乘积最大化。 返回你可以获得的最大乘积。

### 输入输出示例
- 示例 `1`:
```js
输入: 2
输出: 1
解释: 2 = 1 + 1, 1 × 1 = 1。
```

- 示例 `2`:
```js
输入: 10
输出: 36
解释: 10 = 3 + 3 + 4, 3 × 3 × 4 = 36。
```

### 说明
你可以假设 `n` 不小于 `2` 且不大于 `58`。

### 解题方法

#### 1、动态规划
在拆分中不能出现`0`，如果能不出现`1`就不出现`1`，假设`S(n)`表示数字`n`所拆分的数的乘机最大值，我们先逐个前几个数字来找找规律：
```js
S(2): 1 * 1 = 1
S(3): 1 * 2 = 2
S(4): 2 * 2 = 4
S(5): 2 * 3 = 6
S(6): 3 * 3 = 9
S(7): 2 * 2 * 3 = 12 = S(4) * 3
S(8): 2 * 3 * 3 = 18 = S(5) * 3
S(9): 3 * 3 * 3 = 27 = S(6) * 3
S(10): 3 * 4 * 3 = 36 = S(7) * 3
```

所以我们可以列出状态方程：
```js
S(n) = S(n - 3) * 3, n >= 7
```

> 代码实现：

```js
/**
 * @param {number} n
 * @return {number}
 */
const integerBreak = function(n) {
  const dp = [0, 0, 1, 2, 4, 6, 9]
  for(let i = 7; i <= n; i++) {
    dp[i] = dp[i - 3] * 3
  }
  return dp[n]
};
```

> 时间复杂度&空间复杂度：

> 执行结果：

- 执行用时：`80 ms`，在所有`JavaScript`提交中击败了`78.98 %`的用户
- 内存消耗：`37.3 MB`，在所有`JavaScript`提交中击败了`95.1 %`的用户