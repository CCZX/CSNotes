// 最简单的实现
class Publisher {
  observerList = []

  on(fn) {
    this.observerList.push(fn)
  }

  trigger(...args) {
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

publister.trigger(1, 2)

// 实现可以监听特定主题的
class PublisherAndSubject {
  observerList = {}

  on(subject, fn) {
    if (!this.observerList[subject]) {
      this.observerList[subject] = []
    }
    this.observerList[subject].push(fn)
  }

  trigger(subject, ...args) {
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
p2.trigger('up', 1, 2)
p2.trigger('down', 3, 4)
