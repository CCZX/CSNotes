### 题目

[数组中的第K个最大元素](https://leetcode-cn.com/problems/kth-largest-element-in-an-array)
中等

### 题目描述
在未排序的数组中找到第 k 个最大的元素。请注意，你需要找的是数组排序后的第 k 个最大的元素，而不是第 k 个不同的元素。


### 输入输出示例
```js
示例 1:

输入: [3,2,1,5,6,4] 和 k = 2
输出: 5

示例 2:

输入: [3,2,3,1,2,4,5,5,6] 和 k = 4
输出: 4
```

### 说明
你可以假设 k 总是有效的，且 1 ≤ k ≤ 数组的长度

### 解题方法

#### 1、排序


> 代码实现：

```js
/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
const findKthLargest = function(nums, k) {
  return nums.sort((a, b) => b - a)[k-1]
}
```

> 时间复杂度空间复杂度：
- 时间复杂度：O(n)
- 空间复杂度：O(1)

> 执行结果：

- 执行用时：`80.1 ms`，在所有`JavaScript`提交中击败了`74.38 %`的用户
- 内存消耗：`38 MB`，在所有`JavaScript`提交中击败了`65.11 %`的用户
