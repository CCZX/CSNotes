
[判断子序列-力扣](https://leetcode-cn.com/problems/is-subsequence/)
<span>简单</span>

### 题目描述
给定字符串 s 和 t ，判断 s 是否为 t 的子序列。

字符串的一个子序列是原始字符串删除一些（也可以不删除）字符而不改变剩余字符相对位置形成的新字符串。（例如，"ace"是"abcde"的一个子序列，而"aec"不是）。

**进阶：**

如果有大量输入的 S，称作 S1, S2, ... , Sk 其中 k >= 10亿，你需要依次检查它们是否为 T 的子序列。在这种情况下，你会怎样改变代码？

### 输入输出示例
**示例 1:**
```js
输入：s = "abc", t = "ahbgdc"
输出：true
```

**示例 2:**
```js
输入：s = "axc", t = "ahbgdc"
输出：false
```

**提示：**

- 0 <= s.length <= 100
- 0 <= t.length <= 10^4
- 两个字符串都只由小写字符组成。


### 解题方法

#### 1、遍历并记录顺序

遍历 t 的每一个字符，记录当前字符 t[i] 在 s 中的位置 index（每遍历到都要更新index），在遍历 t 的后续字符的时候从 s 的第 index + 1 位开始寻找。

> 代码实现：

```js
/**
 * @param {string} s
 * @param {string} t
 * @return {boolean}
 */
var isSubsequence = function(s, t) {
  let prevIndex = -1
  for(let i = 0; i < s.length; i++) {
    const currIndex = t.indexOf(s[i], prevIndex + 1)
    if(currIndex < 0) {
      return false
    }
    prevIndex = currIndex
  }
  return true
};
```

> 时间复杂度&空间复杂度：
- 时间复杂度：`O(n)`
- 空间复杂度：`O(1)`

> 执行结果：

- 执行用时：`80 ms`，在所有`JavaScript`提交中击败了`84.94 %`的用户
- 内存消耗：`37.6 MB`，在所有`JavaScript`提交中击败了`93.57 %`的用户
