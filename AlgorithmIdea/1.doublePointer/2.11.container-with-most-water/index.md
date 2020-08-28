### 题目

[盛最多水的容器](https://leetcode-cn.com/problems/container-with-most-water/)
中等

### 题目描述
给你 `n` 个非负整数 `a1，a2，...，an，`每个数代表坐标中的一个点 `(i, ai)` 。在坐标内画 `n` 条垂直线，垂直线 `i` 的两个端点分别为 `(i, ai)` 和 `(i, 0)`。找出其中的两条线，使得它们与 `x` 轴共同构成的容器可以容纳最多的水。
![](https://aliyun-lc-upload.oss-cn-hangzhou.aliyuncs.com/aliyun-lc-upload/uploads/2018/07/25/question_11.jpg)

### 输入输出示例
```js
输入：[1,8,6,2,5,4,8,3,7]
输出：49
```

### 说明
你不能倾斜容器，且 `n` 的值至少为 `2`。

### 解题方法

#### 1、双指针
我们可以把`a1，a2，...，an，`用一个数组来存放，使用双指针`i j`分别从首位向中间遍历数组，遍历过程中必须满足条件：`i < j`，则在遍历的过程中`ai`和`aj`与`x`共轴构成容器的容积为：
```js
S = Math.min(ai, aj) * (j - i)
```
所以我们只需要找到`S`的最大值即可。通过观察可以发现，`S`和`Math.min(ai, aj)` 以及 `(j - i)`成正比，而在遍历的过程中`j - i`的值是不断减小的，所以在遍历的过中如果`ai < aj`那么需要将`i++`，反之`j--`。

> 代码实现：

```js
/**
 * @param {number[]} height
 * @return {number}
 */
const maxArea = function(height) {
  let i = 0
  let j = height.length
  let max = 0
  while(i < j) {
    const temp = Math.min(height[i], height[j]) * (j - i)
    if(temp > max) {
      max = temp
    }
    if(height[i] < height[j]) {
      i++
    } else {
      j--
    }
  }
  return max
};
```

> 时间复杂度空间复杂度：
- 时间复杂度：O(n)
- 空间复杂度：O(1)

> 执行结果：

- 执行用时：`92 ms`，在所有`JavaScript`提交中击败了`47.33 %`的用户
- 内存消耗：`38.1 MB`，在所有`JavaScript`提交中击败了`49.98 %`的用户

#### 2、存放上一次的高度
```js
/**
 * @param {number[]} height
 * @return {number}
 */
const maxArea = function(height) {
  let i = 0, // 左边界
      j = height.length - 1, // 右边界
      res = 0, // 最大值
      lastHeight = 0; // 存放上一次的高度
  while(i < j){
    if (height[i] < height[j]) { // 以左边界为高
      if (height[i] > lastHeight) { // 只考虑移动后高度增加的情况（移动后宽度肯定变小，若高度也变小，则面积是一定小于之前的）
        res = Math.max(res, (j - i) * height[i]); // 将最大值赋值给res
        lastHeight = height[i]; // 将高度赋值给lastHeight
      }
      i++;
    } else { // 以右边界为高
      if (height[j] > lastHeight) {
        res = Math.max(res, (j - i) * height[j]);
        lastHeight = height[j];
      }
      j--;
    }
  }
  return res;
};
```
