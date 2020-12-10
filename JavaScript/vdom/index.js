var element = {
  type: 'ul',
  props: { 
    id: 'list'
  },
  children: [
    {type: 'li', children: ["Item 1"]},
    {type: 'li', children: ["Item 2"]},
    {type: 'li', children: ["Item 3"]},
  ]
}

function render(element, container) {
  const dom = document.createElement(element.type)

}
