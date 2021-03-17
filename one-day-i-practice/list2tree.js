const userList = [
  { name: 'user1', age: 18, province: '四川', city: '成都', district: '高新区' },
  { name: 'user2', age: 19, province: '四川', city: '成都', district: '天府新区' },
  { name: 'user3', age: 20, province: '四川', city: '南充', district: '顺庆区' },
  { name: 'user4', age: 22, province: '江苏', city: '南京', district: '鼓楼区' },
  { name: 'user5', age: 21, province: '江苏', city: '南京', district: '玄武区' },
  { name: 'user6', age: 21, province: '江苏', city: '镇江', district: '京口区' }
]

const leafNodeId = 'LEAF_NODE_ID'
const rootNodeId = 'ROOT_NODE_ID'

function list2tree(list, path) {
  const data = formatList(list, path)
  console.log(data)
  return getTree(data)
}

function formatList(list, path) {
  const pathArr = path.split('/')
  const resArr = [{ name: 'root', level: 'root', id: rootNodeId, pid: 0 }]
  for (let i = 0; i < pathArr.length; i++) {
    const pathItem = pathArr[i]
    const prevPathItem = pathArr[i - 1]
    for (let j = 0; j < list.length; j++) {
      const listItem = list[j]
      const isAdd = resArr.some(item => item.name === listItem[pathItem])
      if (!isAdd) {
        const id = `${pathItem}-${listItem[pathItem]}`
        let pid = `${prevPathItem || rootNodeId}`
        if (listItem[prevPathItem]) {
          pid += `-${listItem[prevPathItem]}`
        }
        resArr.push({
          name: listItem[pathItem],
          level: pathItem,
          id: id,
          pid: pid,
        })
      }
    }
  }

  const lastPath = pathArr[pathArr.length - 1]
  for (let i = 0; i < list.length; i++) {
    const listItem = list[i]
    const leafNode = {id: leafNodeId, pid: `${lastPath}-${listItem[lastPath]}`}
    Object.keys(listItem).forEach(key => {
      if (!pathArr.includes(key)) {
        leafNode[key] = listItem[key]
      }
    })
    resArr.push(leafNode)
  }
  return resArr
}

function getTree(list) {
  for (const item of list) {
    if (item.pid === 0) {
      const parent = {
        name: item.name,
        level: item.level,
      }
      parent.children = getchildTree(item.id, list)
      return parent
    }
  }
}

function getchildTree(id, list) {
  const childrenTree = []
  for (const item of list) {
    if (item.pid === id) {
      if (item.id === leafNodeId) {
        delete item.pid
        childrenTree.push(item)
      } else {
        childrenTree.push({
          name: item.name,
          level: item.level,
          id: item.id,
        })
      }
    }
  }
  for (const child of childrenTree) {
    const children = this.getchildTree(child.id, list)
    delete child.id
    if (children.length) {
      child.children = children
    }
  }
  return childrenTree
}

const tree = list2tree(userList, 'province/city/district')
console.log(tree)
