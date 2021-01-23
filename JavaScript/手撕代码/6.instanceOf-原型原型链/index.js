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

/**
 * 对于原型和原型链多叨叨几句
 */
function F() {
  
}

F.__proto__ === Function.prototype // true，because：F = new Function()

Function.prototype.__proto__ === Object.prototype // true

Object.prototype.__proto__ === null // true

// 将对象的__proto__挂载到构造函数的prototype就实现了继承

const f = Object.create(F.prototype)

// class也只是prototype的语法糖

class A {
  constructor(name) {
    this.name = name
  }
  a() {}
}

A.prototype.a

const aa = new A('cc')
aa.name // self
aa.a // __proto__
