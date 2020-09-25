# 动态规划
动态规划（`Dynamic programming`）是指将问题分解为相对简单的子问题，通过求解子问题来求解原来复杂的问题。动态规划非常适合有重复子问题最有子结构性质的问题。

动态规划背后的基本思想非常简单。大致上，若要解一个给定问题，我们需要解其不同部分（即子问题），再根据子问题的解以得出原问题的解。动态规划往往用于优化递归问题，例如斐波那契数列，如果运用递归的方式来求解会重复计算很多相同的子问题，利用动态规划的思想可以减少计算量。

通常许多子问题非常相似，为此动态规划法试图仅仅解决每个子问题一次，具有天然剪枝的功能，从而减少计算量：一旦某个给定子问题的解已经算出，则将其记忆化存储，以便下次需要同一个子问题解之时直接查表。这种做法在重复子问题的数目关于输入的规模呈指数增长时特别有用

## 分类

### 一、斐波那切数列

#### 1、爬楼梯
- [爬楼梯-力扣](https://leetcode-cn.com/problems/climbing-stairs/)
- [解题思路](./5.70.climbing-stairs/index.md)

#### 2、打家劫舍
- [打家劫舍-力扣](https://leetcode-cn.com/problems/house-robber/)
- [解题思路](./7.198.house-robber/index.md)

#### 3、打家劫舍 II（环形）
- [打家劫舍 II-力扣](https://leetcode-cn.com/problems/house-robber-ii/)
- [解题思路](./8.213.house-robber-ii/index.md)

### 二、矩阵路径

#### 1、最小路径和

- [最小路径和-力扣](https://leetcode-cn.com/problems/minimum-path-sum/)
- [解题思路](./6.64.minimum-path-sum/index.md)

#### 2、不同路径

- [不同路径-力扣](https://leetcode-cn.com/problems/unique-paths/)
- [解题思路](./3.62.unique-paths/index.md)

### 三、数组区间

#### 1、区域和检索 - 数组不可变
- [区域和检索-力扣](https://leetcode-cn.com/problems/range-sum-query-immutable/)
- [解题思路](./9.303.range-sum-query-immutable/index.md)

#### 2、等差数列划分
- [等差数列划分-力扣](https://leetcode-cn.com/problems/arithmetic-slices/)
- [解题思路](./10.413.arithmetic-slices/index.md)

### 四、分隔整数

#### 1、整数拆分
- [整数拆分-力扣](https://leetcode-cn.com/problems/integer-break/description/)
- [解题思路](./11.343.integer-break/index.md)

### 2、完全平方数
- [完全平方数-力扣](https://leetcode-cn.com/problems/perfect-squares/description/)
- [解题思路](./12.279.perfect-squares/index.md)


## 题目列表

### 1、最大子序和

- [最大子序和-力扣](https://leetcode-cn.com/problems/maximum-subarray/)
- [解题思路](./1.53.maximum-subarray/index.md)

### 2、最长有效括号

- [最长有效括号-力扣](https://leetcode-cn.com/problems/longest-valid-parentheses/)
- [解题思路](./2.32.longest-valid-parentheses/index.md)

### 3、不同路径

- [不同路径-力扣](https://leetcode-cn.com/problems/unique-paths/)
- [解题思路](./3.62.unique-paths/index.md)

### 4、不同路径 II

- [不同路径 II-力扣](https://leetcode-cn.com/problems/unique-paths-ii/)
- [解题思路](./4.63.unique-paths-ii/index.md)

### 5、爬楼梯
- [爬楼梯-力扣](https://leetcode-cn.com/problems/climbing-stairs/)
- [解题思路](./5.70.climbing-stairs/index.md)

### 6、最小路径和
- [最小路径和-力扣](https://leetcode-cn.com/problems/minimum-path-sum/)
- [解题思路](./6.64.minimum-path-sum/index.md)

### 7、打家劫舍
- [打家劫舍-力扣](https://leetcode-cn.com/problems/house-robber/)
- [解题思路](./7.198.house-robber/index.md)

### 8、打家劫舍 II
- [打家劫舍 II-力扣](https://leetcode-cn.com/problems/house-robber-ii/)
- [解题思路](./8.213.house-robber-ii/index.md)

### 9、区域和检索 - 数组不可变
- [区域和检索-力扣](https://leetcode-cn.com/problems/range-sum-query-immutable/)
- [解题思路](./9.303.range-sum-query-immutable/index.md)

### 10、等差数列划分
- [等差数列划分-力扣](https://leetcode-cn.com/problems/arithmetic-slices/)
- [解题思路](./10.413.arithmetic-slices/index.md)

### 11、整数拆分
- [整数拆分-力扣](https://leetcode-cn.com/problems/integer-break/description/)
- [解题思路](./11.343.integer-break/index.md)

### 12、完全平方数
- [完全平方数-力扣](https://leetcode-cn.com/problems/perfect-squares/description/)
- [解题思路](./12.279.perfect-squares/index.md)
