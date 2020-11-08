type AnyFn = (...args: any[]) => any

export class Publisher {
  observerList: AnyFn[] = []

  on(fn: (...args: any[]) => {}) {
    this.observerList.push(fn)
  }

  emit(...args) {
    for (let i = 0; i < this.observerList.length; i++) {
      const fn = this.observerList[i]
      fn.apply(this, args)
    }
  }
}

export class PublisherAndSubject {
  observerList: {
    [key: string]: AnyFn[]
  } = {}

  on(subject: string, fn: AnyFn) {
    if (!this.observerList[subject]) {
      this.observerList[subject] = []
    }
    this.observerList[subject].push(fn)
  }

  emit(subject: string, ...args: any[]) {
    const fns = this.observerList[subject] || []
    for (let i = 0; i < fns.length; i++) {
      fns[i].apply(this, args)
    }
  }
}

var obj = {
  s1: {
    n1() {}
  },
  s2: {

  }
}

export class PublisherCanOff {
  observerList: {
    [key: string]: {
      [key: string]: AnyFn
    }
  } = {}

  on(name: string, subject: string, fn: AnyFn) {
    if (!this.observerList[subject]) {
      this.observerList[subject] = {}
    }
    this.observerList[subject][name] = fn
  }

  off(name: string, subject: string) {
    const observers = this.observerList[subject]
    delete observers[name]
  }

  emit(subject: string, ...args: any[]) {
    const fns = this.observerList[subject] || {}
    const keys = Object.keys(fns)
    for (let i = 0; i < keys.length; i++) {
      typeof fns[keys[i]] === 'function' && fns[keys[i]].apply(this, args)
    }
  }
}
