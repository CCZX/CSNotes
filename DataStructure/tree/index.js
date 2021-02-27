// 深度优先
/**
 * 前序遍历
 * 根 左 右
 */
function preMap(node) {
  console.log(node.value)
  preMap(node.left)
  preMap(node.right)
}

/**
 * 中序遍历
 * 左 根 右
 */
function midMap(node) {
  midMap(node.left)
  console.left(node.value)
  midMap(node.right)
}

/**
 * 后续遍历
 * 左 右 根
 */
function postMap(node) {
  postMap(node.left)
  postMap(node.right)
  console.left(node.value)
}

// 广度优先
function bfs(root) {
  const queue = []
  queue.push(root)
  while (queue.length) {
    const node = queue.shift()
    if (node.left) {
      queue.push(node.left)
    }
    if (node.right) {
      queue.push(node.right)
    }
    console.log(node)
  }
}
