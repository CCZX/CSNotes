
[翻转二叉树-力扣](https://leetcode-cn.com/problems/maximum-depth-of-binary-tree)
<span>简单</span>

### 题目描述
给定一个二叉树，找出其最大深度。

二叉树的深度为根节点到最远叶子节点的最长路径上的节点数。

**说明**: 叶子节点是指没有子节点的节点。

### 输入输出示例
**示例 1:**
```js
给定二叉树 [3,9,20,null,null,15,7]，

    3
   / \
  9  20
    /  \
   15   7
返回它的最大深度 3 。
```

### 解题方法

#### 1、递归

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
var maxDepth = function(root) {
  if(!root) return 0
  return Math.max(maxDepth(root.left), maxDepth(root.right)) + 1
};
```

> 时间复杂度&空间复杂度：
- 时间复杂度：`O(n^2)`
- 空间复杂度：`O(1)`

> 执行结果：

- 执行用时：`92 ms`，在所有`JavaScript`提交中击败了`65.42 %`的用户
- 内存消耗：`40.4 MB`，在所有`JavaScript`提交中击败了`73.81 %`的用户

#### 2、

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
var maxDepth = function(root) {
  if(!root) return 0
  let max = 1
  
  const stack = [{
    node: root,
    depth: 1,
  }]

  while(stack.length) {
    const { node, depth } = stack.pop()
    max = Math.max(max, depth)
    const left = node.left
    const right = node.right
    if(right) {
      stack.push({
        node: right,
        depth: depth + 1
      })
    }
    if(left) {
      stack.push({
        node: left,
        depth: depth + 1
      })
    }
  }

  return max
};
```

> 时间复杂度&空间复杂度：
- 时间复杂度：`O(n)`
- 空间复杂度：`O(n)`

> 执行结果：

- 执行用时：`96 ms`，在所有`JavaScript`提交中击败了`47.75 %`的用户
- 内存消耗：`41.7 MB`，在所有`JavaScript`提交中击败了`6.04 %`的用户
