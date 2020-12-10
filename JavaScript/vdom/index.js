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
  const dom = isStatic(element) ? document.createTextNode(element) : document.createElement(type)
  Object.keys(props).forEach(p => {
    dom[p] = props[p]
  })
  children.forEach(c => {
    render(c, dom)
  })

  container.appendChild(dom)
}

render(element, document.getElementById('app'))
