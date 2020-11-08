// 最简单的实现
class Publisher {
  observerList = []

  on(fn) {
    this.observerList.push(fn)
  }

  emit(...args) {
    for (let i = 0; i < this.observerList.length; i++) {
      const fn = this.observerList[i]
      fn.apply(this, args)
    }
  }
}

const publister = new Publisher()

publister.on(function (...data) {
  console.log('oberver---1', data)
})
publister.on(function (...data) {
  console.log('oberver---2', data)
})

publister.emit(1, 2)

// 实现可以监听特定主题的
class PublisherAndSubject {
  observerList = {}

  on(subject, fn) {
    if (!this.observerList[subject]) {
      this.observerList[subject] = []
    }
    this.observerList[subject].push(fn)
  }
  
  emit(subject, ...args) {
    const fns = this.observerList[subject] || []
    for (let i = 0; i < fns.length; i++) {
      fns[i].apply(this, args)
    }
  }
}

const p2 = new PublisherAndSubject()
p2.on('up', function (...args) {
  console.log('up1', args)
})
p2.on('up', function (...args) {
  console.log('up2', args)
})
p2.on('down', function (...args) {
  console.log('down', args)
})
p2.emit('up', 1, 2)
p2.emit('down', 3, 4)

class PublisherCanOff {
  observerList = {}

  on(name, subject, fn) {
    if (!this.observerList[subject]) {
      this.observerList[subject] = {}
    }
    this.observerList[subject][name] = fn
  }

  off(name, subject) {
    const observers = this.observerList[subject]
    delete observers[name]
  }

  emit(subject, ...args) {
    const fns = this.observerList[subject] || {}
    const keys = Object.keys(fns)
    for (let i = 0; i < keys.length; i++) {
      typeof fns[keys[i]] === 'function' && fns[keys[i]].apply(this, args)
    }
  }
}

const p3 = new PublisherCanOff()
p3.on('name1', 'up', function (...args) {
  console.log(args)
})
p3.emit('up', 1, 2)
p3.off('name1', 'up')
p3.emit('up', 1, 2)

