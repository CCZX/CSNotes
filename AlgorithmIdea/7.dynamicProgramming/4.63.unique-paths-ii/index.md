### 题目

[不同路径 II](https://leetcode-cn.com/problems/unique-paths-ii/)
中等

### 题目描述
一个机器人位于一个 m x n 网格的左上角 （起始点在下图中标记为“Start” ）。

机器人每次只能向下或者向右移动一步。机器人试图达到网格的右下角（在下图中标记为“Finish”）。

现在考虑网格中有障碍物。那么从左上角到右下角将会有多少条不同的路径？

![](https://assets.leetcode-cn.com/aliyun-lc-upload/uploads/2018/10/22/robot_maze.png)

网格中的障碍物和空位置分别用 1 和 0 来表示。


### 输入输出示例
```js
输入:
[
  [0,0,0],
  [0,1,0],
  [0,0,0]
]
输出: 2
解释:
3x3 网格的正中间有一个障碍物。
从左上角到右下角一共有 2 条不同的路径：
1. 向右 -> 向右 -> 向下 -> 向下
2. 向下 -> 向下 -> 向右 -> 向右
```

### 说明
`m` 和 `n` 的值均不超过 100。

### 解题方法
此题的解法和[不同路径 I](./../3.62.unique-paths/index.md)类似，只是需要注意的是加入了障碍物。对于到达某个位置如果该位置不是障碍物那么`f(m, n) = f(m - 1)(n) + f(m)(n - 1)`，如果是障碍物`f(m, n) = 0`，我们任然可以得到状态方程：
```js
f(m, n) = arr[m][n] === 1 ? 0 : f(m - 1)(n) + f(m)(n - 1)
```
对于当`m = 0`或者`n = 0`时需要特殊处理。

#### 1、动态规划


> 代码实现：

```js
const uniquePathsWithObstacles = function(obstacleGrid) {
  const m = obstacleGrid.length
  const n = obstacleGrid[0].length
  const dp = Array(m).fill(0).map(() => Array(n).fill(0))
  // 第一行第一列特殊处理
  for (let i = 0; i < n; i++) {
    if (obstacleGrid[0][i] === 1) {
      break
    }
    dp[0][i] = 1
  }
  for (let i = 0; i < m; i++) {
    if (obstacleGrid[i][0] === 1) {
      break
    }
    dp[i][0] = 1
  }

  for(let i = 1; i < m; i++) {
    for(let j = 1; j < n; j++) {
      if (obstacleGrid[i][j] === 1) {
        dp[i][j] = 0
      } else {
        dp[i][j] = dp[i - 1][j] + dp[i][j - 1]
      }
    }
  }
  return dp[m - 1][n - 1]
};
```

> 时间复杂度空间复杂度：
- 时间复杂度：O(n^2)
- 空间复杂度：O(n^2)

> 执行结果：

- 执行用时：`84 ms`，在所有`JavaScript`提交中击败了`40.34 %`的用户
- 内存消耗：`37.4 MB`，在所有`JavaScript`提交中击败了`83.23 %`的用户

#### 2、更优解的动态规划

> 代码实现

```js
const uniquePathsWithObstacles = function(obstacleGrid) {
  const n = obstacleGrid.length;
  const m = obstacleGrid[0].length;
  const result = Array(m).fill(0);
  result[0] = 1;
  for(let i = 0; i < n; i++){
    for(let j = 0; j < m; j++){
      if(obstacleGrid[i][j] === 1){
        result[j] = 0;
      }else if(j > 0){
        result[j] += result[j - 1];
      }
    }
  }
  return result[m - 1];
};
```
> 时间复杂度空间复杂度：
- 时间复杂度：O(n^2)
- 空间复杂度：O(n)

```js
const uniquePath = (grids) => {
  const row = grids.length
  const col = grids[0].length
  const dp = Array(row).fill(0).map(() => Array(col).fill(0))
  for(let i = 0; i < row; i++) {
    if(grids[i][0] === 1) {
      break
    }
    dp[i][0] = 1
  }
  for(let i = 0; i < col; i++) {
    if(grids[0][i] === 1) {
      break
    }
    dp[0][i] = 1
  }
  for(let i = 1; i < row; i++) {
    for(let j = 1; j < col; j++) {
      if(grids[i][j] !== 1) {
        dp[i][j] = dp[i - 1][j] + dp[i][j - 1]
      }
    }
  }
}
```
