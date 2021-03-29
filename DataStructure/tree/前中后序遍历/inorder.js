/**
 * 中序遍历：左 根 右
 * @param {TreeNode} root
 * @return {number[]}
 */
 var inorderTraversal = function(root) {
  const res = []
  const stack = []
  let p = root
  while (p || stack.length) {
    if (p) {
      stack.push(p)
      p = p.left
    } else {
      p = stack.pop()
      res.push(p)
      p = p.right
    }
  }
};
