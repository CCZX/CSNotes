
[种花问题-力扣](https://leetcode-cn.com/problems/can-place-flowers/description/)
<span>简单</span>

### 题目描述
假设你有一个很长的花坛，一部分地块种植了花，另一部分却没有。可是，花卉不能种植在相邻的地块上，它们会争夺水源，两者都会死去。

给定一个花坛（表示为一个数组包含`0`和`1`，其中`0`表示没种植花，`1`表示种植了花），和一个数 `n` 。能否在不打破种植规则的情况下种入 `n` 朵花？能则返回`True`，不能则返回`False`。

**注意：**
1. 数组内已种好的花不会违反种植规则。
2. 输入的数组长度范围为 `[1, 20000]`。
3. `n` 是非负整数，且不会超过输入数组的大小。

### 输入输出示例
**示例 1:**
```js
输入: flowerbed = [1,0,0,0,1], n = 1
输出: True
```

**示例 2:**
```js
输入: flowerbed = [1,0,0,0,1], n = 2
输出: False
```

### 解题方法

#### 1、贪心

**遍历花坛，只要满足种植条件就种植**，局部最优解可以得到全局的最优解。

> 代码实现：

```ts
function canPlaceFlowers(flowerbed: number[], n: number): boolean {
  let count = 0
  let i = 0
  while(i < flowerbed.length) {
    // 当位置已经种花，则需要间隔一个位置
    if(flowerbed[i] === 1) {
      i+=2
    } else {
      // 相邻位置没有种花（或者在边界），则种上花，然后间隔一个位置
      if(!flowerbed[i + 1] && !flowerbed[i - 1]) {
        count++
        i+=2
      // 相邻有种花，则在下一个位置
      } else {
        i+=1
      }
    }
  }
  return count >= n
};
```

> 时间复杂度&空间复杂度：
- 时间复杂度：`O(n)`
- 空间复杂度：`O(1)`

> 执行结果：

- 执行用时：`84 ms`，在所有`JavaScript`提交中击败了`82.35 %`的用户
- 内存消耗：`41.3 MB`，在所有`JavaScript`提交中击败了`7.14 %`的用户
