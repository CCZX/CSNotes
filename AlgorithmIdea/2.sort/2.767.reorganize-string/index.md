### 题目

[重构字符串](https://leetcode-cn.com/problems/reorganize-string/) <span style="color: #FFB73F">中等</span>

### 题目描述：
给定一个字符串`S`，检查是否能重新排布其中的字母，使得两相邻的字符不同。

若可行，输出任意可行的结果。若不可行，返回空字符串。

### 输入输出示例

```js
输入: S = "aab"
输出: "aba"
示例 2:
```

```js
输入: S = "aaab"
输出: ""
```
**注意**: `S` 只包含小写字母并且长度在`[1, 500]`区间内。

### 说明

### 解题方法

#### 1、排序

首先假设：字符串`S`的长度为`len`。

通过对字符串的观察可以发现，如果某项字母出现的字数大于`len / 2 + 1`那么一定不能组成相邻不相同的字符串。

当我们判断一个字符串可以组成相邻不相同的字符串时我们的做法：

1. 首先我们记录每一个字符出现的次数
2. 从字符出现次数从多到少的顺序去除每一个字符，比如`a`出现`3`次`b`出现两次那么取出的顺序就是`a a a b b`
3. 将取出的字符填充完成所有偶数位后再填充所有奇数位

> 代码：

```js
/**
 * @param {string} S
 * @return {string}
 */
var reorganizeString = function(S) {
   const map = {};
  const length2 = S.length / 2 + 1;
  // 统计各个字母个数，如果在统计过程中出现不符合条件的情况直接退出
  for (let i = 0; i < S.length; i++) {
    const element = S[i];
    if (map[element]) {
      map[element]++;
      if (map[element] >= length2) {
        return '';
      }
    } else {
      map[element] = 1;
    }
  }
  const mapList = Object.entries(map);
  // 对字母数量排序
  mapList.sort((a, b) => b[1] - a[1]);
  const result = [];
  let resIndex = 0,
    i = 0;
  // 从数量最多的字母开始拿 先填充偶数位再填充奇数位--指索引
  // 填充偶数位，
  while (resIndex < S.length) {
    if (mapList[i][1] > 0) {
      result[resIndex] = mapList[i][0];
      resIndex += 2;
      mapList[i][1]--;
    } else {
      i++;
    }
  }
  // 填充奇数位
  resIndex = 1;
  while (resIndex < S.length) {
    if (mapList[i][1] > 0) {
      result[resIndex] = mapList[i][0];
      resIndex += 2;
      mapList[i][1]--;
    } else {
      i++;
    }
  }

  return result.join('');
};

```

> 执行结果：

- 执行用时：`72 ms`，在所有`JavaScript`提交中击败了`90.84 %`的用户
- 内存消耗：`38.9 MB`，在所有`JavaScript`提交中击败了`79.26 %`的用户
