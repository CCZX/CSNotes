function Watcher(vm, exp, cb) {
  this.$vm = vm
  this.exp = exp
  this.cb = cb
  this.val = this.get()
}

Watcher.prototype.get = function () {
  Dep.target = this
  const val = this.getVMVal()
  Dep.target = null
  return val
}

Watcher.prototype.getVMVal = function () {
  let val = this.$vm.$data
  const exp = this.exp.split('.')
  exp.forEach(key => {
    val = val[key]
  })
  return val
}

Watcher.prototype.update = function () {
  const val = this.getVMVal()
  const oldVal = this.val
  if (val !== oldVal) {
    this.cb(val, oldVal)
    this.val = val
  }
}
