type AnyFn = (...args: any[]) => any

export class Publisher {
  observerList: AnyFn[] = []

  on(fn: (...args: any[]) => {}) {
    this.observerList.push(fn)
  }

  trigger(...args) {
    for (let i = 0; i < this.observerList.length; i++) {
      const fn = this.observerList[i]
      fn.apply(this, args)
    }
  }
}

class PublisherAndSubject {
  observerList: {
    [key: string]: AnyFn[]
  } = {}

  on(subject: string, fn: AnyFn) {
    if (!this.observerList[subject]) {
      this.observerList[subject] = []
    }
    this.observerList[subject].push(fn)
  }

  trigger(subject: string, ...args: any[]) {
    const fns = this.observerList[subject] || []
    for (let i = 0; i < fns.length; i++) {
      fns[i].apply(this, args)
    }
  }
}
