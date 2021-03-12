
[划分字母区间-力扣](https://leetcode-cn.com/problems/partition-labels/)
<span>中等</span>

### 题目描述
字符串 S 由小写字母组成。我们要把这个字符串划分为尽可能多的片段，同一字母最多出现在一个片段中。返回一个表示每个字符串片段的长度的列表。

### 输入输出示例
**示例 1:**
```js
输入：S = "ababcbacadefegdehijhklij"
输出：[9,7,8]
解释：
划分结果为 "ababcbaca", "defegde", "hijhklij"。
每个字母最多出现在一个片段中。
像 "ababcbacadefegde", "hijhklij" 的划分是错误的，因为划分的片段数较少。
```

**提示：**

- S的长度在[1, 500]之间。
- S只包含小写字母 'a' 到 'z' 。

### 解题方法

#### 1、

> 代码实现：

```js
/**
 * @param {string} S
 * @return {number[]}
 */
var partitionLabels = function(S) {
  const res = []
  const maxPosition = {}
  for(let i = 0; i < S.length; i++) {
    maxPosition[S[i]] = i
  }

  let start = 0
  let scanChartMaxPosition = 0

  for(let i = 0; i < S.length; i++) {
    const currChartMaxPosition = maxPosition[S[i]]
    scanChartMaxPosition = Math.max(scanChartMaxPosition, currChartMaxPosition)
    if(i === scanChartMaxPosition) {
      res.push(i - start + 1)
      start = i + 1
    }
  }

  return res
};
```

> 时间复杂度&空间复杂度：
- 时间复杂度：`O()`
- 空间复杂度：`O()`

> 执行结果：

- 执行用时：`84 ms`，在所有`JavaScript`提交中击败了`92.37 %`的用户
- 内存消耗：`40.3 MB`，在所有`JavaScript`提交中击败了`22.13 %`的用户
