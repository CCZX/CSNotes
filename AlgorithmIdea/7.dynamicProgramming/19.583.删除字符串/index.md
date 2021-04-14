[583. 两个字符串的删除操作-力扣](https://leetcode-cn.com/problems/delete-operation-for-two-strings/)
<span>中等</span>

### 题目描述
给定两个单词 word1 和 word2，找到使得 word1 和 word2 相同所需的最小步数，每步可以删除任意一个字符串中的一个字符。

### 输入输出示例
**示例 1:**
```js
输入: "sea", "eat"
输出: 2
解释: 第一步将"sea"变为"ea"，第二步将"eat"变为"ea"
```

**提示：**
- 给定单词的长度不超过500。
- 给定单词中的字符只含有小写字母。

### 解题方法

#### 1、递归
对于 str1 和 str2 两个字符串要找到删除字符串使得两个字符串相等，那么我们可以找到两个字符串的**最长子序列** maxSubStr ，所以需要删除的字符串为：len(str1) + len(str2) + 2 * len(maxSubStr)。

定义函数 maxSub(s1, s2, i, j) 表示 s1 到第 i 个位置为止， s2 到第 j 个位置为止的最长子序列。

求最长子序列：
```js
function maxSub(s1, s2, i, j) {
  if(i === 0 || j === 0) return 0
  if(s1[i - 1] === s2[j - 1]) {
    return 1 + maxSub(s1, s2, i - 1, j - 1)
  } else {
    return Math.max(maxSub(s1, s2, i - 1, j), maxSub(s1, s2, i, j - 1))
  }
}
```

> 代码实现：

```js

```

> 时间复杂度&空间复杂度：
- 时间复杂度：`O()`
- 空间复杂度：`O()`

> 执行结果：

- 执行用时：` ms`，在所有`JavaScript`提交中击败了` %`的用户
- 内存消耗：` MB`，在所有`JavaScript`提交中击败了` %`的用户
