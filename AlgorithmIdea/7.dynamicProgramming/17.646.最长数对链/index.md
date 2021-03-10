
[最长数对链-力扣](https://leetcode-cn.com/problems/maximum-length-of-pair-chain)
<span>中等</span>

### 题目描述
给出 n 个数对。 在每一个数对中，第一个数字总是比第二个数字小。

现在，我们定义一种跟随关系，当且仅当 b < c 时，数对(c, d) 才可以跟在 (a, b) 后面。我们用这种形式来构造一个数对链。

给定一个数对集合，找出能够形成的最长数对链的长度。你不需要用到所有的数对，你可以以任何顺序选择其中的一些数对来构造。

### 输入输出示例
**示例 1:**
```js
输入：[[1,2], [2,3], [3,4]]
输出：2
解释：最长的数对链是 [1,2] -> [3,4]
```

**提示：**

给出数对的个数在 [1, 1000] 范围内。

### 解题方法

#### 1、动态规划

我们首先将数对链按照第一个升序排序，对于第 i 个数对 pairs[i] 构成的最长数对链是 dp[i]，要得到 dp[i] 的最大值需要得到 dp[j] (0 < j < i - ) 的最大值，如果 pairs[i][0] > pairs[j][1] 那么 dp[i] = max(dp[j]) + 1。
如果 则 dp[i] 等于前面第 0 到 i 项构成的最长数对链的最大值

if(pairs[i][0] > pairs[j][1]) {
  dp[i] = Math.max(dp[i], dp[j] + 1)
}

> 代码实现：

```js
/**
 * @param {number[][]} pairs
 * @return {number}
 */
var findLongestChain = function(pairs) {
  const p = pairs.sort((a, b) => a[0] - b[0])
  const dp = Array(p.length).fill(1)
  for(let i = 0; i < p.length; i++) {
    for(let j = 0; j < i; j++) {
      if(p[i][0] > p[j][1]) {
        dp[i] = Math.max(dp[i], dp[j] + 1)
      }
    }
  }
  return Math.max(...dp)
};

```

> 时间复杂度&空间复杂度：
- 时间复杂度：`O(n2)`
- 空间复杂度：`O(n)`

> 执行结果：

- 执行用时：`164 ms`，在所有`JavaScript`提交中击败了`27.94 %`的用户
- 内存消耗：`42.2 MB`，在所有`JavaScript`提交中击败了`35.29 %`的用户

#### 2、

```js
var findLongestChain = function(pairs) {
  if(pairs.length == 0){
    return 0
  }
  pairs.sort((a,b)=>{
    return a[1] - b[1]
  })
  var count = 1
  var cur = pairs[0][1]
  for(var i = 1;i < pairs.length;i++){
    if(pairs[i][0] > cur){
      count++
      cur = pairs[i][1]
    }
  }
  return count
};
```

> 时间复杂度&空间复杂度：
- 时间复杂度：`O(n)`
- 空间复杂度：`O(1)`
