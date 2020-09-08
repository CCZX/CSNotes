
[用最少数量的箭引爆气球-力扣](https://leetcode-cn.com/problems/minimum-number-of-arrows-to-burst-balloons/)
<span style="color: #FFB73F">中等</span>

### 题目描述
在二维空间中有许多球形的气球。对于每个气球，提供的输入是水平方向上，气球直径的开始和结束坐标。由于它是水平的，所以y坐标并不重要，因此只要知道开始和结束的x坐标就足够了。开始坐标总是小于结束坐标。平面内最多存在`10^4`个气球。

一支弓箭可以沿着`x`轴从不同点完全垂直地射出。在坐标`x`处射出一支箭，若有一个气球的直径的开始和结束坐标为 `xstart，xend`， 且满足  `xstart ≤ x ≤ xend`，则该气球会被引爆。可以射出的弓箭的数量没有限制。 弓箭一旦被射出之后，可以无限地前进。我们想找到使得所有气球全部被引爆，所需的弓箭的最小数量

### 输入输出示例

```js
输入:
[[10,16], [2,8], [1,6], [7,12]]

输出:
2

解释:
对于该样例，我们可以在x = 6（射爆[2,8],[1,6]两个气球）和 x = 11（射爆另外两个气球）。
```

```js
len: 1 2 3 4 5 6 7 8 9 10 11 12 13 14 15 16
A:   1 2 3 4 5 6
B:     2 3 4 5 6 7 8
c:               7 8 9 10 11 12
d:                     10 11 12 13 14 15 16
```

### 解题方法

#### 1、贪心
首先我们将所有气球按照半径**结束位置从小到大排序**。

**什么情况下能用一支箭打爆多只？**
1. 半径重合，即：下一个气球半径的开始位置`<=`当前气球半径的结束位置。

**遍历**

0. 定义变量`res`记录箭的数量初始化为`1`
1. 定义变量`end`表示结束位置并将其**初始化为第一个气球半径的结束位置**
2. 遍历半径区间数组，
3. 如果当前半径区间的开始位置**大于**结束位置`end`，就不能用一支箭打爆，则`res++`，**并且将`end`的值设置为当前半径区间的结束位置**
4. 如果当前半径区间的开始位置**小于等于**结束位置`end`则可以使用一支箭打爆，并且结束位置`end`不变，因为需要判断下一个气球半径开始位置和`end`的关系。


> 代码实现：

```js
/**
 * @param {number[][]} points
 * @return {number}
 */
var findMinArrowShots = function(points) {
  if(points.length === 0) return 0;
  const sort_points = points.sort((p1,p2)=>p1[1]-p2[1]);
  let arrows = 1;
  let shoot_endX = sort_points[0][1];
  for(let i = 0;i<sort_points.length;i++){
    if(sort_points[i][0]>shoot_endX){
      arrows++
      shoot_endX = sort_points[i][1]
    }
  }
  return arrows;
};

var findMinArrowShots = function(points) {
  if(points.length == 0){return 0}
  points.sort((a,b)=>{return a[1]-b[1]})
  var count = 1
  var end = points[0][1]
  for(var i = 1;i<points.length;i++){
    if(points[i][0]<=end){
    continue
  }
    end = points[i][1]
    count++
  }
  return count
};
```

> 时间复杂度&空间复杂度：
- 时间复杂度：O(n)，不计算排序时间
- 空间复杂度：O(1)

> 执行结果：

- 执行用时：`128 ms`，在所有`JavaScript`提交中击败了`64 %`的用户
- 内存消耗：`45.3 MB`，在所有`JavaScript`提交中击败了`39.2 %`的用户
