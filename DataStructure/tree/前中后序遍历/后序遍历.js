/**
 * 左 右 根
 * @param {TreeNode} root
 * @return {number[]}
 */
 var postorderTraversal1 = function(root) {
  if (!root) {
    return
  }

  postorderTraversal1(root.left)
  postorderTraversal1(root.right)
  console.log(root)
};

/**
 * 左 右 根
 * @param {TreeNode} root
 * @return {number[]}
 */
 var postorderTraversal1 = function(root) {
  if (!root) {
    return
  }

  const res = []
  const stack = []
  let prev = null
  let p = root

  while (root || stack.length) {
    if (p) {
      stack.push(p)
      p = p.left
    } else {
      p = stack.pop()
      if (!p.right || prev === p.right) {
        prev = p
        p = null
      } else {
        stack.push(p)
        stack.push(p.right)
        p = p.right.left
      }
    }
  }
};
