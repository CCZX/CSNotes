
const obj = {a: 1}

Object.keys(obj).forEach(key => {
  Object.defineProperty(obj, key, {
    get() {
      
    },
    set() {

    },
    enumerable: false,
    writable: false,
    configurable: false,
  })
})
