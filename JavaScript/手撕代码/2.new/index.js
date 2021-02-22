/**
 * 手写new
 * @param {Function} constructor 
 * @param  {...any} args 
 */
function myNew(constructor, ...args) {

  // 1. 新建对象
  // 2. 原型链指向 instance.__proto__ = constructor.prototype
  const instance = Object.create(constructor.prototype)

  // 3. 改变this
  const constructorRet = constructor.apply(instance, args)

  // 4. 判断构造函数函数有没有显示的返回对象
  if (typeof constructorRet === 'function' || (constructorRet !== null && typeof constructorRet === 'function')) {
    return constructorRet
  }

  // 4. 返回实例化对象
  return instance
}

function myObjectCreate(prototype) {
  function F() {}
  F.prototype = prototype
  return new F()
}

function extend(sub, parent) {
  function F() {}
  F.prototype = parent.prototype
  sub.prototype = new F()
  sub.prototype.constructor = sub
}

function Person(name, age) {
  this.name = name
  this.age = age
}

const p = myNew(Person, 'cc', '22')
