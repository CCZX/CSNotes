function Compile(el, vm) {
  this.$vm = vm

  const container = document.querySelector(el)
  
  if (container) {
    const fragement = this.node2Fragement(container)
    this.compile(fragement)
    container.appendChild(fragement)
  }
}

Compile.prototype.node2Fragement = function (node) {
  const fragement = document.createDocumentFragment()
  while (node.firstChild) {
    fragement.appendChild(node.firstChild)
  }
  return fragement
}

Compile.prototype.compile = function (node) {
  const childNodes = node.childNodes;

  [...childNodes].forEach(node => {
    const text = node.textContent
    const reg = /\{\{(.*)\}\}/
    if (this.isElementNode(node)) {
      this.compileElement(node)
    } else if (this.isTextNode(node) && reg.test(text)) {
      console.log( RegExp.$1)
      this.compileText(node, RegExp.$1)
    }
    if (node.childNodes && node.childNodes.length) {
      this.compile(node)
    }
  })
}

Compile.prototype.isElementNode = (node) => {
  return node.nodeType === 1
}

Compile.prototype.compileElement = (node) => {
  const nodeAttrs = node.attributes;

  [...nodeAttrs].forEach(attr => {
    const attrName = attr.name
    if (this.isDirective) {
      const dir = attrName.slice(2)
      const exp = attr.value
      if (this.isEventDirective(dir)) {
        compileUtils.eventHandle(this.$vm, node, exp, dir)
      } else {
        compileUtils[dir](this.$vm, node, exp)
      }
    }
  })
}

Compile.prototype.isTextNode = (node) => {
  return node.nodeType === 3
}

Compile.prototype.compileText = function(node, exp) {
  compileUtils.text(this.$vm, node, exp)
}

Compile.prototype.isDirective = (attr) => {
  return attr.indexOf('v-') === 0
}

Compile.prototype.isEventDirective = (attr) => {
  return attr.indexOf('on') === 0
}

const compileUtils = {
  eventHandle(vm, node, exp, dir) {
    const eventType = dir.split(':')[1]
    const handleEvent = vm.$options.methods && vm.$options.methods[exp]
    if (node && eventType && handleEvent) {
      node.addEventListener(eventType, handleEvent.bind(vm), false)
    }
  },
  text(vm, node, exp) {
    this.bind(vm, node, exp, 'text')
  },
  bind(vm, node, exp, dir) {
    const updaterFn = updater[dir + 'Updater']
    updaterFn && updaterFn(node, this._getVMVal(vm, exp))

    new Watcher(vm, exp, function (val, oldVal) {
      updaterFn && updaterFn(node, val, oldVal)
    })
  },
  _getVMVal(vm, exp) {
    let val = vm.$data
    exp = exp.split('.')
    exp.forEach(key => {
      val = val[key]
    })
    return val
  }
}

const updater = {
  textUpdater(node, val) {
    node.textContent = val
  }
}
