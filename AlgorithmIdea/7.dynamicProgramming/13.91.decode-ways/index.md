
[解码方法-力扣](https://leetcode-cn.com/problems/decode-ways/description/)
<span>中等</span>

### 题目描述
一条包含字母 `A-Z` 的消息通过以下方式进行了编码：
```js
'A' -> 1
'B' -> 2
...
'Z' -> 26
```
给定一个**只包含数字的非空字符串**，请计算解码方法的总数。

题目数据保证答案肯定是一个 `32` 位的整数。

### 输入输出示例
**示例 1:**
```js
输入："12"
输出：2
解释：它可以解码为 "AB"（1 2）或者 "L"（12）。
```

**示例 2:**
```js
输入："226"
输出：3
解释：它可以解码为 "BZ" (2 26), "VF" (22 6), 或者 "BBF" (2 2 6) 。
```

**示例 3:**
```js
输入：s = "0"
输出：0
```

**示例 4:**
```js
输入：s = "1"
输出：1
```

**示例 5:**
```js
输入：s = "2"
输出：1
```

**提示：**
- `1 <= s.length <= 100`
- `s` 只包含数字，并且可以包含前导零。

### 解题方法

#### 1、动态规划

设`s`表示数字字符串编码。`ss[i]`表示`s`字符串的前几位（`ss[1]`表示`s`的前`1`位、`ss[3]`表示`s`的前`3`位）；`s[i]`表示字符串`s`的第`i`位；`decodeNum`用于计算字符串的解码数。

如果`s[i]`和`s[i - 1]`能够组成一个字母（`s[i - 1]s[i]`组成的数字大于`1`并且小于`26`），**选择将`s[i]`和`s[i - 1]`看做一个整体，那么变化的部分只有`ss[i - 2]`字符串了**，所以`decodeNum(ss[i]) = decodeNum(ss[i - 2])`。如果`s[i]`能够单独作为字母解码，**将`s[i]`看做一个整体，那么变化的部分是`ss[i - 1]`**，所以`decodeNum(ss[i]) = decodeNum(ss[i - 1])`

状态方程：
```js
dp(i) = dp(i - 1) + dp(i - 2)
```
额。。。看到这里有点像斐波那契数列了啊。

其中涉及到一些边界的情况：

- `if`: `s[i] = 0`，那么只能将`s[i - 1]s[i]`看做整体（因为0不能单独解码）
  - `if`: `s[i - 1] = 1 or 2`，那么可以将s`[i - 1]s[i]`看做整体，则`dp[i] = dp[i - 2]`
  - `else`: `s[i - 1] != 1 or 2`，那么返回`0`
- `else`: `s[i] != 0`，那么`s[i]`可以单独看做整体解码，也有可能将`s[i - 1]s[i]`看做整体解码，分析情况：
  - `if`: `(s[i - 1] = 1)`，那么不管`s[i]`是`1-9`任意一个数，`s[i - 1]s[i]`都可以看做整体，则`dp[i] = dp[i - 1] + dp[i - 2]`
  - `else if`: `s[i - 1] = 2`，当`0< s[i] < 7`时`dp[i] = dp[i - 1] + dp[i - 2]`，否则`dp[i] = dp[i - 2]`

> 代码实现：

```ts
/**
 * @param {string} s
 * @return {number}
 */
function numDecodings(s) {
  if(s[0] === '0') return 0
  const len = s.length
  const dp = Array(len + 1).fill(0)
  dp[0] = dp[1] = 1
  for(let i = 2; i <= len; i++) {
    if(s[i - 1] === '0') {
      if(s[i - 2] === '1' || s[i - 2] === '2') {
        dp[i] = dp[i - 2]
      } else {
        dp[i] = 0
      }
    } else if (s[i - 2] === '1') {
      dp[i] = dp[i - 1] + dp[i - 2]
    } else if (s[i - 2] === '2') {
      if (s[i - 1] > '0' && s[i - 1] < '7') {
        dp[i] = dp[i - 1] + dp[i - 2]
      } else {
        dp[i] = dp[i - 1]
      }
    } else {
      dp[i] = dp[i - 1]
    }
  }
  return dp[len]
};
```
> 时间复杂度&空间复杂度：
- 时间复杂度：`O()`
- 空间复杂度：`O()`

> 执行结果：

- 执行用时：`104 ms`，在所有`JavaScript`提交中击败了`27.6 %`的用户
- 内存消耗：`38.9 MB`，在所有`JavaScript`提交中击败了`31.52 %`的用户

#### 2、简化

```js
/**
 * @param {string} s
 * @return {number}
 */
var numDecodings = function(s) {
  if(s[0] == 0){
    return 0;
  }
  let n = s.length;
  let dp = new Array(n+1).fill(0);
  dp[0] = dp[1] = 1;
  for(let i = 2;i <= n;i++){
    if(s[i-1] != 0){
      dp[i] += dp[i-1];
    }
    if((s[i-2] == 1) || (s[i-2] == 2 && s[i-1] <= 6)){
      dp[i] += dp[i-2];
    }
  }
  return dp[n];
};
```

> 执行结果：

- 执行用时：`88 ms`，在所有`JavaScript`提交中击败了`78.39 %`的用户
- 内存消耗：`39 MB`，在所有`JavaScript`提交中击败了`27.39 %`的用户


