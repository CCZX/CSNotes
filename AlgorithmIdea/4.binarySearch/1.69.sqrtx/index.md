
[x的平方根-力扣](https://leetcode-cn.com/problems/sqrtx/description/)
<span>简单</span>

### 题目描述
实现 `int sqrt(int x)` 函数。

计算并返回 `x` 的平方根，其中 `x` 是非负整数。

由于返回类型是整数，结果只保留整数的部分，小数部分将被舍去。

### 输入输出示例
**示例 1:**
```js
输入: 4
输出: 2
```

**示例 2:**
```js
输入: 8
输出: 2
说明: 8 的平方根是 2.82842..., 由于返回类型是整数，小数部分将被舍去。
```

### 解题方法

#### 1、二分法

一个数 `x` 的开方 `sqrt` 一定在 `0 ~ x` 之间，并且满足 `sqrt === x / sqrt`。可以利用二分查找在 `0 ~ x` 之间查找 `sqrt`。

对于 `x = 8`，它的开方是 `2.82842...`，最后应该返回 `2` 而不是 `3`。在循环条件为 `l <= h` 循环退出时，`h` 总是比 `l`小，所以最后的返回值应该为 `h`。
> 代码实现：

```js
/**
 * @param {number} x
 * @return {number}
 */
var mySqrt = function(x) {
  let l = 0, h = x, mid
  while(l <= h){
    mid = Math.ceil((l + h)/2)
    if(mid * mid === x) return mid
    if(mid * mid < x){
      l = mid + 1
    }else{
      h = mid - 1
    }
  }
  return Math.floor(h)
}
```

> 时间复杂度&空间复杂度：
- 时间复杂度：`O(n)`
- 空间复杂度：`O(1)`

> 执行结果：

- 执行用时：`92 ms`，在所有`JavaScript`提交中击败了`93.31 %`的用户
- 内存消耗：`39.5 MB`，在所有`JavaScript`提交中击败了`13.68 %`的用户
