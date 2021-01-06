
[第一个错误的版本-力扣](https://leetcode-cn.com/problems/first-bad-version/)
<span>简单</span>

### 题目描述
你是产品经理，目前正在带领一个团队开发新的产品。不幸的是，你的产品的最新版本没有通过质量检测。由于每个版本都是基于之前的版本开发的，所以错误的版本之后的所有版本都是错的。

假设你有 `n` 个版本 `[1, 2, ..., n]`，你想找出导致之后所有版本出错的第一个错误的版本。

你可以通过调用 `bool isBadVersion(version)` 接口来判断版本号 `version` 是否在单元测试中出错。实现一个函数来查找第一个错误的版本。你应该尽量减少对调用 `API` 的次数。

### 输入输出示例
**示例 1:**
```js
给定 n = 5，并且 version = 4 是第一个错误的版本。

调用 isBadVersion(3) -> false
调用 isBadVersion(5) -> true
调用 isBadVersion(4) -> true

所以，4 是第一个错误的版本。 
```

### 解题方法

这道题读了几遍才理解到意思，`isBadVersion`是已经实现好的函数，调用`isBadVersion`就可以判断该版本是不是错误版本。所以我们需要做的事就是**尽可能少的调用`isBadVersion`函数。**

#### 1、二分法
因为后一个版本依赖前一个版本，所以我们可以把它看做一个排序好的数组，所以使用二分法很方便。

> 代码实现：

```js
/**
 * Definition for isBadVersion()
 * 
 * @param {integer} version number
 * @return {boolean} whether the version is bad
 * isBadVersion = function(version) {
 *     ...
 * };
 */

/**
 * @param {function} isBadVersion()
 * @return {function}
 */
var solution = function(isBadVersion) {
  /**
  * @param {integer} n Total versions
  * @return {integer} The first bad version
  */
  return function(n) {
    let left = 0, right = n
    let firstBadVersion = n
    while(left <= right) {
      var mid = Math.floor((right + left) / 2)
      if(isBadVersion(mid)) {
        firstBadVersion = mid
        right = mid - 1
      } else {
        left = mid + 1
      }
    }
    return firstBadVersion
  };
};
```

> 时间复杂度&空间复杂度：
- 时间复杂度：`O(lgn)`
- 空间复杂度：`O(1)`

> 执行结果：

- 执行用时：`80 ms`，在所有`JavaScript`提交中击败了`71.53 %`的用户
- 内存消耗：`37.6 MB`，在所有`JavaScript`提交中击败了`47.32 %`的用户
