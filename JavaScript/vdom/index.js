var element = {
  type: 'ul',
  props: {
    id: 'list'
  },
  children: [
    {
      type: 'li', props: {
        style: "color: red"
      }, children: ["Item 1"]
    },
    { type: 'li', children: ["Item 2"] },
    { type: 'li', children: ["Item 3"] },
  ]
}

var newElement = {
  type: 'ul',
  props: {
    id: 'list-1'
  },
  children: [
    {
      type: 'li', props: {
        style: "color: red"
      }, children: ["Item update"]
    },
    { type: 'li', children: ["Item 2"] },
    { type: 'li', children: ["Item 3"] },
  ]
}

function isStatic(element) {
  return typeof element === 'number' || typeof element === 'string'
}

// 将虚拟DOM转化为真实的DOM
function createElement(vdom) {
  if (isStatic(vdom)) {
    return document.createTextNode(vdom)
  }
  const {type, props = {}, children = []} = vdom
  const element = document.createElement(type)
  Object.keys(props).forEach(p => {
    element[p] = props[p]
  })
  // 遍历子节点并插入到父节点
  children.map(createElement).forEach(element.appendChild.bind(element))
  return element
}

/**
 * 
 * @param {object} element 
 * @param {Element} container 
 */
function render(element, container) {
  container.appendChild(element)
}

render(createElement(element), document.getElementById('app'))

const nodePatchTypes = {
  CREATE: 'CREATE',
  REMOVE: 'REMOVE',
  REPLACE: 'REPLACE',
  UPDATE: 'UPDATE'
}
const propPatchTypes = {
  REMOVE: 'REMOVE',
  UPDATE: 'UPDATE'
}
// 更新DOM
function diff(oldVDOM, newVDOM) {
  if (!oldVDOM) {
    return {
      type: nodePatchTypes.CREATE,
      vdom: newVDOM
    }
  }
  if (!newVDOM) {
    return {
      type: nodePatchTypes.REMOVE
    }
  }
  if (
    typeof oldVDOM !== typeof newVDOM ||
    (isStatic(oldVDOM) && oldVDOM !== newVDOM) ||
    oldVDOM.type !== newVDOM.type
  ) {
    return {
      type: nodePatchTypes.REPLACE,
      vdom: newVDOM
    }
  }

  if (oldVDOM.type && newVDOM.type) {
    const propsDiff = diffProps(oldVDOM, newVDOM)

    const childrenDiff = diffChildren(oldVDOM, newVDOM)
    console.log(propsDiff)
    if (propsDiff.length || childrenDiff.some(i => i)) {
      return {
        type: nodePatchTypes.UPDATE,
        props: propsDiff,
        children: childrenDiff
      }
    }
  }
}

// 更新props
function diffProps(oldVDOM, newVDOM) {
  const patches = []
  const allProps = { ...oldVDOM.props, ...newVDOM.props }

  Object.keys(allProps).forEach(key => {
    const oldValue = oldVDOM.props[key]
    const newValue = newVDOM.props[key]

    if (newValue === undefined) {
      patches.push({
        type: propPatchTypes.REMOVE,
        key
      })
    } else if (oldValue === undefined || oldValue !== newValue) {
      patches.push({
        type: propPatchTypes.UPDATE,
        key,
        value: newValue
      })
    }
  })

  return patches
}

// 更新子节点
function diffChildren(oldVDOM, newVDOM) {
  const patches = []

  const childrenLen = Math.max(oldVDOM.children.length, newVDOM.children.length)

  for (let i = 0; i < childrenLen; i++) {
    patches.push(diff(oldVDOM.children[i], newVDOM.children[i]))
  }

  return patches
}

// 得到差异对象
const patches = diff(element, newElement)

const app = document.getElementById('app')

patch(app, patches)

function patch(parent, patches, index = 0) {
  if (!patches) {
    return
  }

  // 新建元素
  if (patches.type === nodePatchTypes.CREATE) {
    return parent.appendChild(createElement(patches.vdom))
  }

  // 获取对应的子节点
  const element = parent.childNodes[index]

  // 删除元素
  if (patches.type === nodePatchTypes.REMOVE) {
    return parent.removeChild(element)
  }

  // 替换元素
  if (patches.type === nodePatchTypes.REPLACE) {
    return parent.replaceChild(createElement(patches.vdom), element)
  }

  // 更新元素
  if (patches.type === nodePatchTypes.UPDATE) {
    const { props, children } = patches

    // 更新属性
    patchProps(element, props)

    // 更新子元素
    children.forEach((patches, i) => {
      // 更新子元素时，需要将子元素的序号传入以便获取对应的节点
      patch(element, patches, i)
    })
  }
}

// 更新属性
function patchProps(element, props) {
  if (!props) {
    return
  }

  props.forEach(patches => {
    if (patches.type === propPatchTypes.REMOVE) {
      element.removeAttribute(patches.key)
    } else if (patches.type === propPatchTypes.UPDATE) {
      element.setAttribute(patches.key, patches.value)
    }
  })
}
