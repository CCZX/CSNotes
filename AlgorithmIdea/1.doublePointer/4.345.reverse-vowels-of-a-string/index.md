
[反转字符串中的元音字母-力扣](https://leetcode-cn.com/problems/reverse-vowels-of-a-string/description/)
<span>简单</span>

### 题目描述
编写一个函数，以字符串作为输入，反转该字符串中的元音字母。


### 输入输出示例
**示例 1:**
```js
输入："hello"
输出："holle"
```

**示例 2:**
```js
输入："leetcode"
输出："leotcede"
```

### 解题方法

#### 1、双指针
元音字母由：`a e i o u`五个组成，使用双指针`i`、`j`首尾遍历，遍历的字母分别为S[i]和S[j]，如果S[i]是元音S[j]也是元音就交换两个字符，如果S[i]不是元音S[j]是元音那么i++，反之亦然。

> 代码实现：

```js
/**
 * @param {string} s
 * @return {string}
 */
var reverseVowels = function(s) {
  var i = 0;
  var j = s.length - 1
  var vowels = ['a', 'A', 'e', 'E', 'i', 'I', 'o', 'O', 'u', 'U']
  var sArr = s.split('')
  while(i <= j) {
    if(vowels.includes(sArr[i]) && vowels.includes(sArr[j])) {
      [sArr[i], sArr[j]] = [sArr[j], sArr[i]]
      i++;
      j--;
    } else if (vowels.includes(sArr[i]) && !vowels.includes(sArr[j])) {
      j--
    } else if (!vowels.includes(sArr[i]) && vowels.includes(sArr[j])) {
      i++
    } else {
      i++
      j--
    }
  }
  return sArr.join('')
};
```

> 时间复杂度&空间复杂度：
- 时间复杂度：`O(n)`
- 空间复杂度：`O(n)`

> 执行结果：

- 执行用时：`108 ms`，在所有`JavaScript`提交中击败了`58.3 %`的用户
- 内存消耗：`43.6 MB`，在所有`JavaScript`提交中击败了`32.93 %`的用户
