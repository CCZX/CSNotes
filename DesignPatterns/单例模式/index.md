# 【设计模式】- 单例模式

## 1、什么是单例模式

**单例模式**：保证某个类同时**只存在一个实例**，通过**全局可以访问**该实例的方法和属性，即使**多次调用也得到同一个实例对象**。使用单例模式能够减少内存开销节约性能，因为在避免了多次的实例化某个类，也避免了某个类存在多个实例时可能引发的问题。

## 2、单例模式常见的应用场景 - 例子

其实单例模式在`JavaScript`中非常常见，比如：
```js
const tools = {
  getTime() {/*...*/}
}
```

`JavaScript`创建对象可以通过对象字面量的方式，上面的例子中`const`创建的变量不能改变和重复声明，也就确保了只存在一个该实例。

**常见的使用场景：**

### 1、命名空间

## 3、分别使用`JavaScript`和`TypeScript`实现单例模式

> 通过懒加载的方式来实现

```js
function Person(name) {
  this.name = name
}

Person.getInstance = function(name) {
  if(this.instance) {
    return this.instance
  }
  this.instance = new Person(name)
  return this.instance
}

const p1 = Person.getInstance('cc1')
const p2 = Person.getInstance('cc2')

console.log(p1 === p2) // true
```
上面👆的代码多次调用得到的任然是同一个实例。和普通的使用`new`来实例化类不一样，而是**通过一个方法来获取实例对象**，这种方式使用起来有些别扭，**使用者必须知道要使用`Person.getInstance`来创建对象，否则使用`new Person`的方式就不管用了**。对使用者来说是不透明的。

> 透明的单例

基于`JavaScript`闭包的特性，实现透明的单例。

```js
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
console.log(cat.getName()) // cat
console.log(dog.getName()) // cat
console.log(cat === dog) // true
```

## 4、关于单例模式常见的问题


## 5、总结

