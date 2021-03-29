// 前序遍历：根 左 右

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

function preOrder2(T, visit = x => console.log(x.val)) {
  const stack = [];
  let p = T;
  while (stack.length || p) {
    if (p) {
      visit(p);
      stack.push(p)
      p = p.left
    } else {
      p = stack.pop();
      p = p.right;
    }
  }
}
