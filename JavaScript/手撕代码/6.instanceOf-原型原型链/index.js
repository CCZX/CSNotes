const { prototype } = require("node:events")

/**
 * 实例的原型链（__proto__）上也没有构造函数的原型（prototype）
 * @param {*} instance 
 * @param {*} constructor 
 */
function instanceOf(instance, constructor) {
  let proto = instance.__proto__
  while (proto) {
    if (proto === constructor.prototype) {
      return true
    }
    proto = proto.__proto__
  }
  return false
}

Object.create2 = function (proto, propertyObject = undefined) {
  if (typeof proto !== 'object' && typeof proto !== 'function') {
    throw new TypeError('Object prototype may only be an Object or null.')
  }

  if (propertyObject == null) {
    new TypeError('Cannot convert undefined or null to object')
  }
  function F() { }
  F.prototype = proto
  const obj = new F()
  if (propertyObject != undefined) {
    Object.defineProperties(obj, propertyObject)
  }
  if (proto === null) {
    // 创建一个没有原型对象的对象，Object.create(null)
    obj.__proto__ = null
  }
  return obj
}


/**
 * 对于原型和原型链多叨叨几句
 */
function F() {

}

F.__proto__ === Function.prototype // true，because：F = new Function()

Function.prototype.__proto__ === Object.prototype // true

Object.prototype.__proto__ === null // true

// 将对象的__proto__挂载到构造函数的prototype就实现了继承

const f = Object.create(F.prototype) // f.__proto__ === F.prototype

// class也只是prototype的语法糖

class A {
  constructor(name) {
    this.name = name
  }
  a() { }
}

A.prototype.a

const aa = new A('cc')
aa.name // self
aa.a // __proto__
