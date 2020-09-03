
[无重叠区间-力扣](https://leetcode-cn.com/problems/non-overlapping-intervals/description/)
<span style="color: #FFB73F">中等</span>

### 题目描述

给定一个区间的集合，找到需要移除区间的最小数量，使剩余区间互不重叠。

**注意**:

可以认为区间的终点总是大于它的起点。
区间 `[1,2]` 和 `[2,3]` 的边界相互“接触”，但没有相互重叠。

### 输入输出示例
**示例 1:**
```js
输入: [ [1,2], [2,3], [3,4], [1,3] ]

输出: 1

解释: 移除 [1,3] 后，剩下的区间没有重叠。
```
**示例 2**:
```js
输入: [ [1,2], [1,2], [1,2] ]

输出: 2

解释: 你需要移除两个 [1,2] 来使剩下的区间没有重叠。
```
**示例 3:**
```js
输入: [ [1,2], [2,3] ]

输出: 0

解释: 你不需要移除任何区间，因为它们已经是无重叠的了。
```

### 解题方法

#### 1、排序+贪心
将传入的数组排序，排序后遍历数组`intervals`，假设`res`表示需要删除区间的个数，`i`代表`intervals`的索引，`nums[i]`表示`intervals`的第`i`项。

如果`nums[i + 1][0] < nums[i][1]`则代表两个区间有重合的，则将`nums[i]`从`intervals`中删除，然后将`res += 1`。


> 代码实现：

```js
/**
 * @param {number[][]} intervals
 * @return {number}
 */
const eraseOverlapIntervals = function(intervals) {
  if(intervals.length < 2) return 0
  intervals = intervals.sort((a, b) => a[1] - b[1])
  let res = 0
  for(let i = 0; i < intervals.length - 1; i++) {
    const cur = intervals[i]
    const next = intervals[i + 1]
    if(next[0] < cur[1]) {
      res += 1
      intervals.splice(i + 1, 1)
      i--
    }
  }
  return res
};
```

> 时间复杂度&空间复杂度：
- 时间复杂度：O(n)
- 空间复杂度：o(1)

> 执行结果：

- 执行用时：`96 ms`，在所有`JavaScript`提交中击败了`40.74 %`的用户
- 内存消耗：`36.4 MB`，在所有`JavaScript`提交中击败了`96.49 %`的用户
