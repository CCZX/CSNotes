
[翻转二叉树-力扣](https://leetcode-cn.com/problems/invert-binary-tree/)
<span>简单</span>

### 题目描述
翻转一棵二叉树。

### 输入输出示例
**示例 1:**
```js
输入：

     4
   /   \
  2     7
 / \   / \
1   3 6   9
输出：

     4
   /   \
  7     2
 / \   / \
9   6 3   1

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

  while(queue.length) {
    const node = queue.shift()
    const leftTree = node.left
    const rightTree = node.right

    node.left = rightTree
    node.right = leftTree

    if(leftTree) {
      queue.push(leftTree)
    }

    if(rightTree) {
      queue.push(rightTree)
    }
  }

  return root
};
```

> 时间复杂度&空间复杂度：
- 时间复杂度：`O(n)`
- 空间复杂度：`O(n)`

> 执行结果：

- 执行用时：`76 ms`，在所有`JavaScript`提交中击败了`93.22 %`的用户
- 内存消耗：`39 MB`，在所有`JavaScript`提交中击败了`32.77 %`的用户
