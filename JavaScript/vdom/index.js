var element = {
  type: 'ul',
  props: { 
    id: 'list'
  },
  children: [
    {type: 'li', props: {
      style: "color: red"
    }, children: ["Item 1"]},
    {type: 'li', children: ["Item 2"]},
    {type: 'li', children: ["Item 3"]},
  ]
}

var newElement = {
  type: 'ul',
  props: { 
    id: 'list'
  },
  children: [
    {type: 'li', props: {
      style: "color: red"
    }, children: ["Item 1"]},
    {type: 'li', children: ["Item 2"]},
    {type: 'li', children: ["Item 3"]},
  ]
}

function isStatic(element) {
  return typeof element === 'number' || typeof element === 'string'
}

/**
 * 
 * @param {object} element 
 * @param {Element} container 
 */
function render(element, container) {

  const { type, props = {}, children = [] } = element

  // 判断节点类型
  const dom = isStatic(element) ? document.createTextNode(element) : document.createElement(type)

  // 设置属性
  Object.keys(props).forEach(p => {
    dom[p] = props[p]
  })

  // 子节点渲染
  children.forEach(c => {
    render(c, dom)
  })

  container.appendChild(dom)
}

// render(element, document.getElementById('app'))

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

  if (newVDOM.type) {
    const patchProps = 1
  }
}

// 更新props
function diffProps(oldVDOM, newVDOM) {
  
}
