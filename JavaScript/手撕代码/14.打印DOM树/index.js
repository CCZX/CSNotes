function print(node, split, level = 1) {
  // let _level = level + 1
  // let _split = split + '---'
  // console.log(`第${_level}层`, _split, node.tagName)
  // const children = node.children
  // if (!children) return
  // for (const node of children) {
  //   print(node, _split, _level)
  // }
  
}

print(document.body, '---')

function print1(root) {
  const queue = [root]
  let level = 0
  while (queue.length) {
    level += 1
    const _node = queue.shift()
    console.log(`第${level}层`, _node.tagName)
    const children = _node.children
    
    if (children) {
      level += 1
      for (const child of children) {
        console.log(`第${level}层`, _node.tagName)
        queue.push(child)
      }
    }
  }
}

print1(document.body)
