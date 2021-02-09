
[分隔等和子集-力扣](https://leetcode-cn.com/problems/partition-equal-subset-sum)
<span>中等</span>

### 题目描述
给定一个只包含正整数的非空数组。是否可以将这个数组分割成两个子集，使得两个子集的元素和相等。

**注意:**

每个数组中的元素不会超过 100
数组的大小不会超过 200

### 输入输出示例
**示例 1:**
```js
示例 1:

输入: [1, 5, 11, 5]

输出: true

解释: 数组可以分割成 [1, 5, 5] 和 [11].
 
```

**示例 2:**
```js
示例 2:

输入: [1, 2, 3, 5]

输出: false

解释: 数组不能分割成两个元素和相等的子集.
```

### 解题方法

#### 1、暴力破解
一个长度为n的数组分隔成两部分一共有`Math.floor(n/2)`种方法（注意：这是类似直接把绳子分为两节的做法，没有考虑数组内不同项的组合情况）
无脑循环

> 代码实现：

```js
/**
 * @param {number[]} nums
 * @return {boolean}
 */
var canPartition = function(nums) {
  const splitCount = Math.floor(nums.length/2)
  let index = 1
  while(index <= splitCount) {
    for(let i = 0; i < nums.length; i++) {

    }
  }
};
```

> 时间复杂度&空间复杂度：
- 时间复杂度：`O()`
- 空间复杂度：`O()`

> 执行结果：

- 执行用时：` ms`，在所有`JavaScript`提交中击败了` %`的用户
- 内存消耗：` MB`，在所有`JavaScript`提交中击败了` %`的用户
