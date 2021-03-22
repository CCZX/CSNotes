function observe(data) {
  if (!data || Object.prototype.toString.call(data) !== '[object Object]') {
    return
  }

  new Observer(data)
}

function Observer(data) {
  Object.keys(data).forEach(key => {
    this.defineReactive(data, key, data[key])
  })
}

Observer.prototype.defineReactive = function (data, key, val) {
  observe(val)

  const dep = new Dep()

  Object.defineProperty(data, key, {
    enumerable: true,
    get() {
      Dep.target && dep.addSub(Dep.target)
      return val
    },
    set(newVal) {
      if (val !== newVal) {
        val = newVal
        dep.notify()
      }
    }
  })
}

function Dep() {
  this.subs = []
}

Dep.target = null

Dep.prototype.addSub = function (sub) {
  this.subs.push(sub)
}

Dep.prototype.notify = function () {
  this.subs.forEach(sub => {
    sub.update()
  })
}
