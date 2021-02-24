function isSymmetry(node) {
  if (node === null) {
    return false
  }
  compare(node.left, node.right)
}

function compare(left, right) {
  if (left === null) {
    return right === null
  }
  if (right === null) {
    return false
  }
  return compare(left.left, right.right) && compare(left.right, right.left)
}
