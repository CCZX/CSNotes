
[有序数组中的单一元素-力扣](https://leetcode-cn.com/problems/single-element-in-a-sorted-array/)
<span>中等</span>

### 题目描述
给定一个只包含整数的有序数组，每个元素都会出现两次，唯有一个数只会出现一次，找出这个数。

### 输入输出示例
**示例 1:**
```js
输入: [1,1,2,3,3,4,4,8,8]
输出: 2
```

**示例 2:**
```js
输入: [3,3,7,7,10,11,11]
输出: 10
```

**注意**: 您的方案应该在 `O(log n)`时间复杂度和 `O(1)`空间复杂度中运行。

### 解题方法

#### 1、二分查找
令 index 为 Single Element 在数组中的位置。在 index 之后，数组中原来存在的成对状态被改变。如果 m 为偶数，并且 m + 1 < index，那么 nums[m] == nums[m + 1]；m + 1 >= index，那么 nums[m] != nums[m + 1]。

从上面的规律可以知道，如果 nums[m] == nums[m + 1]，那么 index 所在的数组位置为 [m + 2, h]，此时令 l = m + 2；如果 nums[m] != nums[m + 1]，那么 index 所在的数组位置为 [l, m]，此时令 h = m。

因为 h 的赋值表达式为 h = m，那么循环条件也就只能使用 l < h 这种形式。

> 代码实现：

```js
/**
 * @param {number[]} nums
 * @return {number}
 */
var singleNonDuplicate = function(nums) {
  var l = 0, h = nums.length - 1
  while (l < h) {
    var m = l + (h - l) / 2
    if (m % 2 == 1) {
      m--   // 保证 l/h/m 都在偶数位，使得查找区间大小一直都是奇数
    }
    if (nums[m] == nums[m + 1]) {
      l = m + 2
    } else {
      h = m
    }
  }
  return nums[l]
};
```

> 时间复杂度&空间复杂度：
- 时间复杂度：`O(nlgn)`
- 空间复杂度：`O(1)`

> 执行结果：

- 执行用时：`84 ms`，在所有`JavaScript`提交中击败了`63.16 %`的用户
- 内存消耗：`38.1 MB`，在所有`JavaScript`提交中击败了`89.4 %`的用户

#### 2、哈希表缓存
遍历数组nums，将遍历到的数组值nums[i]，存放在哈希表中，如果哈希表中没有nums[i]就放入哈希表中，如果有就删除。

> 代码实现：

```js
/**
 * @param {number[]} nums
 * @return {number}
 */
var singleNonDuplicate = function(nums) {
  var hash = {}
  nums.forEach(n => {
    if(hash[n]) {
      delete hash[n]
    } else {
      hash[n] = String(0)
    }
  })
  return Objct.keys(hash)[0]
};
```

> 时间复杂度&空间复杂度：
- 时间复杂度：`O(n)`
- 空间复杂度：`O(n)`

> 执行结果：

- 执行用时：`92 ms`，在所有`JavaScript`提交中击败了`34.21 %`的用户
- 内存消耗：`40.5 MB`，在所有`JavaScript`提交中击败了`5.29 %`的用户

#### 2、位运算符：异或^
异或运算符需要将操作数转换为二进制进行操作，然后将二进制数对应的每一位按位异或，异或运算符的特点：相同为0相异1，比如
```
1^1 = 0
1^2 = 3
```
还有一个特点就是任何数与0异或得到得都是该数本身。

> 代码实现：

```js
/**
 * @param {number[]} nums
 * @return {number}
 */
var singleNonDuplicate = function(nums) {
  var res = 0
  nums.forEach(n => {
    res = res ^ n
  })
  return res
};
```

> 时间复杂度&空间复杂度：
- 时间复杂度：`O(n)`
- 空间复杂度：`O(1)`

> 执行结果：

- 执行用时：`72 ms`，在所有`JavaScript`提交中击败了`95.39 %`的用户
- 内存消耗：`38.1 MB`，在所有`JavaScript`提交中击败了`89.40 %`的用户
