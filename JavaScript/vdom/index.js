var oldElement = {
  type: 'ul',
  props: {
    id: 'list',
    onClick: (e) => {
      console.log('list click', e)
    }
  },
  children: [
    {
      type: 'li', props: {
        style: "color: red",
        onClick: (e) => {
          console.log('li click', e)
        },
        onMousemove: () => {
          console.log('onmousemove')
        }
      }, children: ["Item 1"]
    },
    { type: 'li', children: ["Item 2"] },
    { type: 'li', children: ["Item 3"] },
  ]
}

// var newElement = {
//   type: 'ul',
//   props: {
//     id: 'list-1'
//   },
//   children: [
//     {
//       type: 'li', props: {
//       }, children: ["Item"]
//     },
//     { type: 'li', children: ["Item 2"] },
//     { type: 'li', children: ["Item 3"] },
//     { type: 'li', children: ["Item 4"] },
//   ]
// }

const root = document.getElementById('app')
const createBtn = document.querySelector('.create-btn')
const removeBtn = document.querySelector('.remove-btn')
const updateBtn = document.querySelector('.update-btn')

const isStaticType = (type) => typeof type === 'number' || typeof type === 'string'
const isEvent = (prop) => prop.toLowerCase().startsWith('on')
const isAttribute = (prop) => !isEvent(prop)

// 将虚拟DOM转化为真实的DOM
function createElement(vdom) {
  if (isStaticType(vdom)) {
    return document.createTextNode(vdom)
  }
  const {type, props = {}, children = []} = vdom
  const element = document.createElement(type)
  
  setProps(props, element)
  setEvent(props, element)

  // 遍历子节点并插入到父节点
  children.map(createElement).forEach(element.appendChild.bind(element))
  return element
}

function setProps(props, element) {
  Object.keys(props).filter(isAttribute).forEach(p => {
    element[p] = props[p]
  })
}

// 绑定事件
function setEvent(props, element) {
  const events = Object.keys(props).filter(isEvent)
  events.forEach(item => {
    const event = item.substring(2).toLowerCase()
    element.addEventListener(event, (e) => {
      typeof props[item] === 'function' && props[item](e)
    })
  })
}

/**
 * 
 * @param {object} element 
 * @param {Element} container 
 */
function render(element, container) {
  container.appendChild(element)
}

render(createElement(oldElement), root)

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

/**
 * 生成新旧两颗DOM tree的差异对象
 * @param {*} oldVDOM 
 * @param {*} newVDOM 
 */
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
    (isStaticType(oldVDOM) && oldVDOM !== newVDOM) ||
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

    if (propsDiff.length || childrenDiff.some(i => i)) {
      return {
        type: nodePatchTypes.UPDATE,
        props: propsDiff,
        children: childrenDiff
      }
    }
  }
}

/**
 * 比较props
 * @param {*} oldVDOM 
 * @param {*} newVDOM 
 */
function diffProps(oldVDOM, newVDOM) {
  const patches = []
  const allProps = { ...oldVDOM.props, ...newVDOM.props }

  Object.keys(allProps).forEach(key => {
    const oldValue = oldVDOM.props[key]
    const newValue = newVDOM.props[key]

    if (!newValue) {
      patches.push({
        type: propPatchTypes.REMOVE,
        key
      })
    } else if (!oldValue || oldValue !== newValue) {
      patches.push({
        type: propPatchTypes.UPDATE,
        key,
        value: newValue
      })
    }
  })

  return patches
}

/**
 * 比较子节点
 * @param {*} oldVDOM 
 * @param {*} newVDOM 
 */
function diffChildren(oldVDOM, newVDOM) {
  const patches = []

  const childrenLen = Math.max(oldVDOM.children.length, newVDOM.children.length)

  for (let i = 0; i < childrenLen; i++) {
    patches.push(diff(oldVDOM.children[i], newVDOM.children[i]))
  }

  return patches
}

/**
 * 根据生成的差异对象更新DOM tree
 * @param {*} parent 
 * @param {*} patches 
 * @param {*} index 
 */
function patch(parent, patches, index = 0) {
  if (!patches || !parent) return

  // 新建元素
  if (patches.type === nodePatchTypes.CREATE) {
    return parent.appendChild(createElement(patches.vdom))
  }

  // 获取对应的子节点，在更新子节点时根据子节点的索引获取子节点
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

function patchProps(element, props) {
  if (!props) return

  props.forEach(patches => {
    if (patches.type === propPatchTypes.REMOVE) {
      element.removeAttribute(patches.key)
    } else if (patches.type === propPatchTypes.UPDATE) {
      element.setAttribute(patches.key, patches.value)
    }
  })
}

createBtn.addEventListener('click', () => {
  var newElement = {
    ...oldElement,
    children: [...oldElement.children, { type: 'li', children: [`${new Date()}`] }]
  }
  const patches = diff(oldElement, newElement)
  console.log(patches)
  patch(root, patches)
  oldElement = newElement
})

removeBtn.addEventListener('click', () => {
  const cloneOldElement = JSON.parse(JSON.stringify(oldElement))
  cloneOldElement.children.pop()
  var newElement = {
    ...oldElement,
    children: cloneOldElement.children
  }
  const patches = diff(oldElement, newElement)
  patch(root, patches)
  oldElement = newElement
})

updateBtn.addEventListener('click', () => {
  const newElement = JSON.parse(JSON.stringify(oldElement))
  if (!newElement?.children?.length) return
  if (!newElement?.children[0]?.props?.style) return
  newElement.children[0].props.style = "color: blue"
  const patches = diff(oldElement, newElement)
  console.log(patches)
  patch(root, patches)
  oldElement = newElement
})
