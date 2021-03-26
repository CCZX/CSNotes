// 根 左 右

/**
 * 递归的方式实现
 * @param {TreeNode} root
 * @return {number[]}
 */
var preorderTraversal1 = function (root) {
  if (root === null) return

  console.log(root)
  preorderTraversal1(root.left)
  preorderTraversal1(root.right)
}

/**
 * 非递归的方式实现
 * @param {TreeNode} root
 * @return {number[]}
 */
const preorderTraversal = (root) => {
  if (!root) {
    return root
  }
  const list = [];
  const stack = [];

  stack.push(root)

  while (stack.length) {
    const currNode = stack.pop()
    list.push(currNode)

    // 前序先打印左树，所以先入栈右树
    if (currNode.right) {
      stack.push(currNode.right)
    }

    if (currNode.left) {
      stack.push(currNode.left)
    }
  }
  
  return list
}

