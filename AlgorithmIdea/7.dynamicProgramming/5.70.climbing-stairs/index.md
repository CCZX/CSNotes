### 题目

[爬楼梯-力扣](https://leetcode-cn.com/problems/climbing-stairs/)
简单

### 题目描述
假设你正在爬楼梯。需要 `n` 阶你才能到达楼顶。

每次你可以爬 `1` 或 `2` 个台阶。你有多少种不同的方法可以爬到楼顶呢？

### 输入输出示例
示例 1：
```js
输入： 2
输出： 2
解释： 有两种方法可以爬到楼顶。
1.  1 阶 + 1 阶
2.  2 阶
```

示例 2：
```js
输入： 3
输出： 3
解释： 有三种方法可以爬到楼顶。
1.  1 阶 + 1 阶 + 1 阶
2.  1 阶 + 2 阶
3.  2 阶 + 1 阶
```

### 说明
给定 `n` 是一个正整数。

### 解题方法

#### 1、动态规划
由于每次只能移动一步或者两步，所以要到达第`i`阶梯的上一阶梯只能是**第`i - 1`或者第`i - 2`阶梯**，所以得到状态方程：
```js
dp[i] = dp[i - 1] + dp[i - 2], i > 2
```

> 代码实现：

```js
/**
 * @param {number} n
 * @return {number}
 */
const climbStairs = function(n) { 
  const dp = [1, 2]
  for (let i = 2; i < n; i++) {
    dp[i] = dp[i-1] + dp[i-2]
  }
  return dp[n-1]
};
```

> 时间复杂度空间复杂度：
- 时间复杂度：O(n)
- 空间复杂度：O(n)

> 执行结果：

- 执行用时：`84 ms`，在所有`JavaScript`提交中击败了`31.5 %`的用户
- 内存消耗：`37.4 MB`，在所有`JavaScript`提交中击败了`31.23 %`的用户

#### 2、动态规划 + 滚动数组

通过观察我们可以发现当前步数，只和前面两步有关，所以我们可以用两个数来存储前面两步的步数，类似与滚动数组的方法。

> 代码实现：

```js
/**
 * @param {number} n
 * @return {number}
 */
const climbStairs = function(n) { 
  let pre1 = 0
  let pre2 = 1
  for (let i = 1; i <= n; i++) {
    let cur = pre2
    pre2 = pre1 + cur
    pre1 = cur
  }
  return pre2
};
```

> 时间复杂度空间复杂度：
- 时间复杂度：O(n)
- 空间复杂度：O(1)

#### 3、递归

递归的时间复杂度很大，所以我们尽量少使用递归，如果一定要使用可以选择**记忆函数递归**。

```js
/**
 * @param {number} n
 * @return {number}
 */
const climbStairs = function (n) {
  if (n === 1) {
    return 1
  }
  if (n === 2) {
    return 2
  }
  return climbStairs(n-1)+climbStairs(n-2)
}
```

> 时间复杂度空间复杂度：
- 时间复杂度：O(2^n)
- 空间复杂度：O(1)
