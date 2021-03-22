function MVVM(options) {
  this.$options = options
  this.$data = options.data

  Object.keys(this.$data).forEach(key => {
    this._proxyData(key)
  })

  observe(this.$data)

  new Compile(options.el || document.body, this)
}

MVVM.prototype._proxyData = function (key) {
  Object.defineProperty(this, key, {
    enumerable: true,
    get() {
      return this.$data[key]
    },
    set(newVal) {
      this.$data[key] = newVal
    }
  })
}
