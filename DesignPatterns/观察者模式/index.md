# 【设计模式】- 观察者模式

## 1、什么是观察者模式

观察者模式定义了**一对多**的关系，即一个发布者可以有多个订阅者，一个订阅者也可以订阅多个发布者。当发布者在状态改变发送消息的时候，所有订阅者都会接收到这个消息，这样实现了松耦合。

观察者模式可以使用在**异步编程**中。使用观察者模式**只需要订阅我们感兴趣的节点**，不必关心发布者整个过程的状态。

观察者模式和发布订阅模式很相似，但有着细微的差别，发布订阅模式有一个中间者来作为联通发布者和订阅者的桥梁，而观察者模式是发布者和订阅者直接通信。

![](./diff.jpg)

我们实现的时候不过多考虑观察者模式和发布订阅模式的区别。

## 2、实现观察者模式
1. 指定一个发布者
2. 使用一个列表存储订阅者，以便通知订阅者
3. 发布消息时循环遍历列表通知所有订阅者
```js
class Publisher {
  list = []

  on(fn) {
    this.list.push(fn)
  }

  emit(...args) {
    for(let i = 0; i <this.list.length; i++) {
      this.list[i].apply(this, args)
    }
  }
}

// 使用：
const pub = new Publisher()
pub.on(function(...data) {
  console.log(data)
})
pub.emit(1, 2)
```

上面的代码中实现的观察者模式，当发布者发布消息时，所有订阅者都会接收到消息，即使订阅者对这个消息不感兴趣；我们新增一个功能：订阅者在订阅消息时只订阅自己感兴趣的消息，这样只有发布者在发布自己感性的消息的时候订阅者才会收到通知。
```js
class Publisher {
  observerList = {}

  on(subject, fn) {
    if (!this.observerList[subject]) {
      this.observerList[subject] = []
    }
    this.observerList[subject].push(fn)
  }

  emit(subject, ...args) {
    const fns = this.observerList[subject] || []
    for (let i = 0; i < fns.length; i++) {
      fns[i].apply(this, args)
    }
  }
}
```
实现可以卸载掉某个观察者的模式：
```js
class PublisherCanOff {
  observerList = {}

  on(name, subject, fn) {
    if (!this.observerList[subject]) {
      this.observerList[subject] = {}
    }
    this.observerList[subject][name] = fn
  }

  off(name, subject) {
    const observers = this.observerList[subject]
    delete observers[name]
  }

  emit(subject, ...args) {
    const fns = this.observerList[subject] || {}
    const keys = Object.keys(fns)
    for (let i = 0; i < keys.length; i++) {
      typeof fns[keys[i]] === 'function' && fns[keys[i]].apply(this, args)
    }
  }
}
```

## 3、常见应用场景

使用观察者模式时需要事先将所有观察者绑定到发布者身上，如果不同观察者之间存在引用关系的话在发布消息时可能存在问题。

### 1、事件监听

观察者模式在`JavaScript`中的应用十分广泛，比如我们常见的事件监听就是观察者模式，订阅事件`dom.addEventlistener('click', () => {})`，当我们点击`dom`节点的时候节点就会收到消息从而执行响应的回调函数。

### 2、NodeJS的EventEmitter

`EventEmitter`的核心功能就是事件的触发和事件的监听功能，所有的消息传递都可以由`EventEmitter`调度中心来完成，实现代码的解耦。

### 3、Vue的响应式原理

`Vue`的响应式不仅依赖于`Object.defineProperty`还依赖于观察者模式，Vue在初始化的时候劫持`setter`给观察者`Dep`添加订阅者，`Vue`组件在`mount`阶段会创建一个`Watcher`对象，`Watcher`对应着一个`Vue`组件，`Watcher`就对应着`Dep`的订阅者，当数据发生变化时就会通知所有的观察者更新。

参考：https://zhuanlan.zhihu.com/p/88648401

## 4、常见问题

### 1、观察者模式和发布订阅模式区别
- 观察者模式：只有两个角色 —— 观察者 + 被观察者；是松耦合的关系；多用于单个应用内部。
- 发布订阅模式：不仅仅只有发布者和订阅者两个角色，还存在一个中间者；完全不存在耦合；更多用于跨应用的模式，比如我们常用的消息中间件。

### 2、优缺点
- 优点：实现了代码之间的解耦弱化了对象之间的联系，观察者不必知道发布者的具体过程，只需要符合发布者的抽象接口就能实现订阅消息。
- 缺点：过度使用观察者模式会导致对象与对象之间的联系也会被隐藏的很深，使得项目的难以跟踪维护和理解。

## 5、总结

在实际过程中如果遇到当某个状态发生变化时需要通知多个对象时就非常适合使用观察者模式，能够大大降低代码之间的耦合性；但在使用过程中往往也会带来新的问题，所以要逻辑严密避免问题的出现，以及避免不合理的过分的使用观察者模式。
