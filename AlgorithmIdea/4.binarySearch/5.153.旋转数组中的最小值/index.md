
[寻找旋转排序数组中的最小值-力扣](https://leetcode-cn.com/problems/find-minimum-in-rotated-sorted-array/description/)
<span>中等</span>

### 题目描述
假设按照升序排序的数组在预先未知的某个点上进行了旋转。例如，数组 `[0,1,2,4,5,6,7]` 可能变为 `[4,5,6,7,0,1,2]` 。

请找出其中最小的元素。

### 输入输出示例
**示例 1:**
```js
输入：nums = [3,4,5,1,2]
输出：1
```

**示例 2:**
```js
输入：nums = [4,5,6,7,0,1,2]
输出：0
```
[0,1,2,3,4,5,6,7]
输入：nums = [7,0,1,2,3,4,5,6]
输出：0

**示例 3:**
```js
输入：nums = [1]
输出：1
```

**提示：**

- `1 <= nums.length <= 5000`
- `-5000 <= nums[i] <= 5000`
- `nums` 中的所有整数都是 **唯一** 的
- `nums` 原来是一个升序排序的数组，但在预先未知的某个点上进行了旋转

### 解题方法

题目大意就是需要找到旋转的节点，然后通过该节点再次旋转可以重新变为原来的升序。

#### 1、排序

将数组从小到大排序，然后取第一个节点。

```js
/**
 * @param {number[]} nums
 * @return {number}
 */
var findMin = function(nums) {
  return nums.sort((a, b) => a - b)[0]
};
```

> 时间复杂度&空间复杂度：
- 时间复杂度：`O()`，取决于 `sort` 方法
- 空间复杂度：`O(1)`

> 执行结果：

- 执行用时：`88 ms`，在所有`JavaScript`提交中击败了`43.04 %`的用户
- 内存消耗：`38.3 MB`，在所有`JavaScript`提交中击败了`15.73 %`的用户

#### 2、二分法
假设旋转之前数组为 `nums[]` ，旋转之后的数组为 `numsR[]`。`nums[]` 是一个升序的数组，所以在旋转之后 `numsR[]` 由两部分升序数组( `nums1[]、nums2[]` )构成。所以可以使用二分法。

> 代码实现：

```js
/**
 * @param {number[]} nums
 * @return {number}
 */
var findMin = function(nums) {
  var l = 0, r = nums.length - 1
  while(l < r) {
    var m = Math.floor((r + l) / 2)
    if(nums[m] <= nums[r]) {
      r = m
    } else {
      l = m + 1
    }
  }
  return nums[l]
};
```

> 时间复杂度&空间复杂度：
- 时间复杂度：`O()`
- 空间复杂度：`O()`

> 执行结果：

- 执行用时：` ms`，在所有`JavaScript`提交中击败了` %`的用户
- 内存消耗：` MB`，在所有`JavaScript`提交中击败了` %`的用户
