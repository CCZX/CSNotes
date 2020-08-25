### 题目

[两数之和 II - 输入有序数组](https://leetcode-cn.com/problems/two-sum-ii-input-array-is-sorted/)
简单

### 题目描述
给定一个已按照**升序排列的有序数组**，找到两个数使得它们相加之和等于目标数。

函数应该返回这两个下标值 index1 和 index2，其中 index1 必须小于 index2。

### 输入输出示例
```js
输入: numbers = [2, 7, 11, 15], target = 9
输出: [1,2]
解释: 2 与 7 之和等于目标数 9 。因此 index1 = 1, index2 = 2 。
```

### 说明
- 返回的下标值（index1 和 index2）不是从零开始的。
- 你可以假设每个输入只对应唯一的答案，而且你不可以重复使用相同的元素。

### 解题方法

#### 1、双指针
给定的数组是一个升序的数组，所以我们可以采用双指针的方法从收尾开始遍历数组。假设`nums[i]`和`nums[j]`分别是从首开始遍历取得的数和从尾开始遍历取得的数，令：`sum = nums[i] + nums[j]`，如果`sum = target`则`i`和`j`就是需要找的位置，如果`sum > target`则代表需要更小的数则`j--`，如果`sum < target`则代表需要更大的数则`i++`。

> 代码实现：

```js
const twoSum = function(numbers, target) {
  let left = 0
  let right = numbers.length - 1
  let res = []
  while (left < right) {
    const sum = numbers[left] + numbers[right]
    if (sum === target) {
      res = [left + 1, right + 1]
      break
    } else if (sum > target) {
      right--
    } else {
      left++
    }
  }
  return res
}
```

> 时间复杂度空间复杂度：
- 时间复杂度：O(n)
- 空间复杂度：O(1)

> 执行结果：

- 执行用时：` ms`，在所有`JavaScript`提交中击败了` %`的用户
- 内存消耗：` MB`，在所有`JavaScript`提交中击败了` %`的用户

#### 2、哈希表
假设`nums[i]`表示数组的第`i`项，则`target`和`nums[i]`的关系可以表示为：
```js
target - nums[i] = diff
```

所以我们可以遍历数组，然后用一个哈希表来存储`nums[i]`需要值`diff`。这种方法就类似于：在一个班需要两两学生组成一组，使得他们的身高之和等于`target`，然后每个学生（`nums[i]`）告诉老师自己所需要的同学的身高（`diff`），然后老师将该同学需要的身高记录在表格上（哈希表），然后如果后面有同学的身高记录在哈希表上，那么他们两两就能组队。

> 代码实现：

```js
const twoSum = function (numbers, target) {
  const diffMap = {}
  let res = []
  numbers.forEach((num, index) => {
    if (diffMap[num]) {
      res = [diffMap[num], index + 1]
    } else {
      diffMap[target - num] = index + 1
    }
  })
  return res
}
```

> 时间复杂度空间复杂度：
- 时间复杂度：O(n)
- 空间复杂度：O(n)

> 执行结果：

- 执行用时：` ms`，在所有`JavaScript`提交中击败了` %`的用户
- 内存消耗：` MB`，在所有`JavaScript`提交中击败了` %`的用户