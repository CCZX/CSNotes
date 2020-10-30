
// 最简单的实现方式，相当于懒加载
function Person(name) {
  this.name = name
}

Person.getInstance = function (name) {
  if (this.instance) {
    return this.instance
  }
  this.instance = new Person(name)
  return this.instance
}

const p1 = Person.getInstance('cc1')
const p2 = Person.getInstance('cc2')
console.log(p1 === p2)

const Animal = (function () {
  let instance = null
  function Animal(name) {
    this.name = name
    if (!instance) {
      instance = this
    }
    return instance
  }
  Animal.prototype.getName = function () {
    return this.name
  }
  return Animal
})()

const cat = new Animal('cat')
const dog = new Animal('dog')
console.log(cat.getName())
console.log(dog.getName())
console.log(cat === dog)
