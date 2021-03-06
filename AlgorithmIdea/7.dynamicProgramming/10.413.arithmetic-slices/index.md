### 题目

[等差数列划分-力扣](https://leetcode-cn.com/problems/arithmetic-slices) <span style="color: #FFB73F">中等</span>

### 题目描述

如果一个数列至少有三个元素，并且任意两个相邻元素之差相同，则称该数列为等差数列。

例如，以下数列为等差数列:
```js
1, 3, 5, 7, 9
7, 7, 7, 7
3, -1, -5, -9
```
以下数列不是等差数列。
```js
1, 1, 2, 5, 7
```

数组`A`包含`N`个数，且索引从`0`开始。数组`A`的一个子数组划分为数组 `(P, Q)`，`P`与`Q`是整数且满足`0<=P<Q<N` 。

如果满足以下条件，则称子数组`(P, Q)`为等差数组：

元素 `A[P], A[p + 1], ..., A[Q - 1], A[Q]` 是等差的。并且 `P + 1 < Q` 。

函数要返回数组 `A` 中所有为等差数组的子数组个数。

### 输入输出示例

```js
A = [1, 2, 3, 4]

返回: 3, A 中有三个子等差数组: [1, 2, 3], [2, 3, 4] 以及自身 [1, 2, 3, 4]
```

### 解题方法

#### 1、动态规划

A[i] - A[i - 1] = A[i + 1] - A[i]

dp[i] = dp[i - 1] + 1

如果一个数列是等差数列那么会满足条件：`A[i] - A[i-1] === A[i-1] - A[i-2]`，需要这种判断的是三个数字，对于四个数字如果前三个满足以上关系，并且`A[i+1] - A[i] === A[i] - A[i-1]`，那么这四个数字也是等差数列，五个数字类似...。
> 代码：

```js
/**
 * @param {number[]} A
 * @return {number}
 */
var numberOfArithmeticSlices = function(A) {
  const dp = [0, 0]
  let res = 0
  for(let i = 2; i < A.length; i++) {
    if(A[i] - A[i-1] === A[i-1] - A[i-2]) {
      // 这表示如果i-2,i-1,i是等差数列并且i-1,1,i+1是等差数列，那么i-2,i-1,i,i+1也是等差数列所以+1
      dp[i] = dp[i-1] !== 0 ? dp[i-1] + 1 : 1
    } else {
      dp[i] = 0
    }
    res += dp[i]
  }
  return res
};
```

> 执行结果：

- 执行用时：`88 ms`，在所有`JavaScript`提交中击败了`18.09%`的用户
- 内存消耗：`37.6 MB`，在所有`JavaScript`提交中击败了`57.33%`的用户

####

A[i] - A[i - 1] = A[i - 1] - A[i - 2]，则A[i - 2]到A[i]构成了等差数列。

假设dp[i]表示前 i 项构成的等差数列的个数，则
if A[i] - A[i - 1] = A[i - 1] - A[i - 2]
 dp[i] = dp[i - 1] + 1
else 
  dp[i] = 0

如果A[i - 1]到A[i + 1]也构成了等差数列
