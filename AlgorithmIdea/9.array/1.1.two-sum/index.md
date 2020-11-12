
[两数之和-力扣](https://leetcode-cn.com/problems/two-sum/)
<span>简单</span>

### 题目描述
给定一个整数数组 `nums` 和一个目标值 `target`，请你在该数组中找出和为目标值的那 两个 整数，并返回他们的数组下标。

你可以假设每种输入只会对应一个答案。但是，数组中同一个元素不能使用两遍。

### 输入输出示例
**示例 1:**
```js
给定 nums = [2, 7, 11, 15], target = 9

因为 nums[0] + nums[1] = 2 + 7 = 9
所以返回 [0, 1]
```

### 解题方法

#### 1、暴力破解
两层`for`循环
> 代码实现：

```js
/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
var twoSum = function(nums, target) {
  for(let i = 0; i < nums.length; i++) {
    for(let j = i + 1; j < nums.length; j++) {
      if(nums[i] + nums[j] === target) {
        return [i, j]
      }
    }
  }
};
```

> 时间复杂度&空间复杂度：
- 时间复杂度：`O(n^2)`
- 空间复杂度：`O(1)`

> 执行结果：

- 执行用时：`4316 ms`，在所有`JavaScript`提交中击败了`5.02 %`的用户
- 内存消耗：`45.9 MB MB`，在所有`JavaScript`提交中击败了`5.00 %`的用户

#### 2、哈希表
使用一个哈希表来记录每个数需要的数，比如`nums = [1, 2, 3]、target = 4`，则`1`需要的数就是 `target - nums[1]`。后续的数字如果哈希表有记录就直接返回。

比如10个人要按两两高矮组合，每个向老师记录自己需要的人，后续的人只需要问老师有没有人需要自己就可以了。
> 代码实现：

```js
/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
var twoSum = function(nums, target) {
  var cache = {}
  for(let i = 0; i < nums.length; i++) {
    if(cache[nums[i]] !== undefined) {
      return [cache[nums[i]], i]
    }
    cache[target - nums[i]] = i
  }
};
```

> 时间复杂度&空间复杂度：
- 时间复杂度：`O(n^2)`
- 空间复杂度：`O(1)`

> 执行结果：

- 执行用时：`106 ms`，在所有`JavaScript`提交中击败了`71.2 %`的用户
- 内存消耗：`46.8 MB`，在所有`JavaScript`提交中击败了`10 %`的用户
