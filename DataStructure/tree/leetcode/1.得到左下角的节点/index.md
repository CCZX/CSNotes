
[寻找左下角节点-力扣](https://leetcode-cn.com/problems/find-bottom-left-tree-value/description/)
<span>中等</span>

### 题目描述
给定一个二叉树，在树的最后一行找到最左边的值。

### 输入输出示例
**示例 1:**
```js
输入:
    2
   / \
  1   3

输出:
1
```

**示例 2:**
```js
输入:
        1
       / \
      2   3
     /   / \
    4   5   6
       /
      7

输出:
7
```

### 解题方法

#### 1、

> 代码实现：

```js
/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {TreeNode} root
 * @return {number}
 */
var findBottomLeftValue = function(root) {
  if(!root) return

  const queue = [root]
  let last = root.val

  while(queue.length) {
    const node = queue.shift()
    if(node.right) {
      queue.push(node.right)
    }
    if(node.left) {
      queue.push(node.left)
    }
    last = node.val
  }
  return last
};
```

> 时间复杂度&空间复杂度：
- 时间复杂度：`O(n)`
- 空间复杂度：`O(n)`

> 执行结果：

- 执行用时：`100 ms`，在所有`JavaScript`提交中击败了`52.43 %`的用户
- 内存消耗：`42.5 MB`，在所有`JavaScript`提交中击败了`25.7 %`的用户
