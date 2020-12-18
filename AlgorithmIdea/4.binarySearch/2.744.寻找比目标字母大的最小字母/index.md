
[寻找比目标字母大的最小字母-力扣](https://leetcode-cn.com/problems/find-smallest-letter-greater-than-target/description/)
<span>简单</span>

### 题目描述
给你一个排序后的字符列表 `letters` ，列表中只包含小写英文字母。另给出一个目标字母 `target`，请你寻找在这一有序列表里比目标字母大的最小字母。

在比较时，字母是依序循环出现的。举个例子：

- 如果目标字母 target = 'z' 并且字符列表为 letters = ['a', 'b']，则答案返回 'a'

### 输入输出示例
**示例:**
```js
输入:
letters = ["c", "f", "j"]
target = "a"
输出: "c"

输入:
letters = ["c", "f", "j"]
target = "c"
输出: "f"

输入:
letters = ["c", "f", "j"]
target = "d"
输出: "f"

输入:
letters = ["c", "f", "j"]
target = "g"
输出: "j"

输入:
letters = ["c", "f", "j"]
target = "j"
输出: "c"

输入:
letters = ["c", "f", "j"]
target = "k"
输出: "c"
```

**提示：**
1. `letters` 长度范围在 `[2, 10000]` 区间内。
2. `letters` 仅由小写字母组成，最少包含两个不同的字母。
3. 目标字母 `target` 是一个小写字母。

### 解题方法

#### 1、二分法

这个题目其实就是给定一个数组，让后在数组中找特定的数的抽象。所以可以使用二分法来实现。

> 代码实现：

```js
/**
 * @param {character[]} letters
 * @param {character} target
 * @return {character}
 */
var nextGreatestLetter = function(letters, target) {
  if(letters.length == 0){return ''}
  if(target < letters[0] || target >= letters[letters.length -1]) return letters[0]
  let l = 0, r = letters.length -1
  while(l <= r ){
    let mid = Math.floor(l + (r - l)/2)
    if(letters[mid] > target){ 
      r = mid - 1
    }else if(letters[mid] < target){
      l = mid + 1
    }else if(letters[mid] == target){
      l = mid + 1
    }
  }
  if(r < 0 ) return -1
  return letters[r + 1]
};

```

> 时间复杂度&空间复杂度：
- 时间复杂度：`O(lgn)`
- 空间复杂度：`O(1)`

> 执行结果：

- 执行用时：`84 ms`，在所有`JavaScript`提交中击败了`82.05 %`的用户
- 内存消耗：`39.2 MB`，在所有`JavaScript`提交中击败了`81.2 %`的用户

#### 2、利用JavaScript数组的find方法

一行代码即可搞定！

```js
/**
 * @param {character[]} letters
 * @param {character} target
 * @return {character}
 */
var nextGreatestLetter = function(letters, target) {
  return letters.find(i => i > target) || letters[0]
};

```

> 时间复杂度&空间复杂度：
- 时间复杂度：`O(n)`
- 空间复杂度：`O(1)`

> 执行结果：

- 执行用时：`80 ms`，在所有`JavaScript`提交中击败了`93.59 %`的用户
- 内存消耗：`39.1 MB`，在所有`JavaScript`提交中击败了`82.48 %`的用户

### 总结

对于排序好的数列，需要从中找一个特定的项，都可以使用二分法来实现；也可以多使用JavaScript的方法效率更高，写法也更简单。
