### 题目

[不同路径](https://leetcode-cn.com/problems/unique-paths)
中等

### 题目描述
一个机器人位于一个 m x n 网格的左上角 （起始点在下图中标记为“Start” ）。

机器人每次只能向下或者向右移动一步。机器人试图达到网格的右下角（在下图中标记为“Finish”）。

问总共有多少条不同的路径？

![](https://assets.leetcode-cn.com/aliyun-lc-upload/uploads/2018/10/22/robot_maze.png)

### 输入输出示例
```js
输入: m = 3, n = 2
输出: 3
解释:
从左上角开始，总共有 3 条路径可以到达右下角。
1. 向右 -> 向右 -> 向下
2. 向右 -> 向下 -> 向右
3. 向下 -> 向右 -> 向右
```

```js
输入: m = 7, n = 3
输出: 28
```

### 说明
- `1 <= m, n <= 100`
- 题目数据保证答案小于等于 `2 * 10 ^ 9`

### 解题方法

#### 1、动态规划

由于机器人只有两种做法：向右、向下，所以当机器人到达某个位置`p(m, n)`的时候要么是从该位置的**上方`p1(m - 1, n)`或者左方`p2(m, n - 1)`**到达该位置的，所以到达某个位置时的不同路径等于到达该位置的上方不同路径与到达该位置左方的不同路径。所以假设`f(m, n)`是到达某个位置的不同路径之和，则：
```js
f(m, n) = f(m - 1, n) + f(m, n - 1)
```

```js
dp[i][j] = dp[i - 1][j] + dp[i][j - 1]
```

> 代码实现：

```js
var uniquePaths = function(m, n) {
  const dp = Array(m).fill(0).map(() => Array(n).fill(1))
  for(let i = 1; i < m; i++) {
    for(let j = 1; j < n; j++) {
      dp[i][j] = dp[i - 1][j] + dp[i][j - 1]
    }
  }
  return dp[m - 1][n - 1]
};
```

> 时间复杂度空间复杂度：
- 时间复杂度：O(n^2)
- 空间复杂度：O(n^2)

> 执行结果：

- 执行用时：`76 ms`，在所有`JavaScript`提交中击败了`62.69 %`的用户
- 内存消耗：`37.8 MB`，在所有`JavaScript`提交中击败了`34.93 %`的用户

```js
const uniquePath = (m, n) => {
  const dp = Array(m).fill(0).map(() => Array(n).fill(1))
  for(let i = 1; i < m; i++) {
    for(let j = 1; j < n; j++) {
      dp[i][j] = dp[i - 1][j] + dp[i][j - 1]
    }
  }
}
```
