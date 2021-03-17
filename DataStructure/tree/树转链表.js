function Convert(node) {
  var stack = [];
  var prev;
  var root;
  while (node !== null || stack.length !== 0) {
    while (node !== null) {
      stack.push(node);
      node = node.left;
    }
    node = stack.pop();
    if (!prev) {
      root = node;
      node.left = null;
    } else {
      prev.right = node;
      node.left = prev;
    }
    prev = node;
    node = node.right;
  }
  return root;
}

// https://blog.csdn.net/MeiLuan_yahoho/article/details/88920640
