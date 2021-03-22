## Observer

Observer 是每个对象（data）的键值转化为 getter\setter 的形式，用于依赖收集以及调度更新。

## Watcher

观察者，收集依赖以后 watcher 会被保存在 Dep 的 subs 里面，数据变化时 Dep 会通知 Watcher 实例，然后 Watcher 实例更新视图。

## Dep

Oberver 在触发 get 的时候就会收集 Watcher 的依赖， Dep 就像刚才说的是一个书店，可以接受多个订阅者的订阅，当有新书时即在data变动时，就会通过 Dep 给 Watcher 发通知进行更新。

## 总结

Vue 的每个组件都有一个 Watcher 实例，Vue 会把数据用过getter/setter 变为响应式的，在getter 阶段会通过 Dep 来收集 Watcher 依赖。

Dep 和 Observer 是一对一的关系，Dep 和 Watcher 是多对多的关系（Dep 可以收起多个 Watcher 依赖，Watcher 也可以监听多个），当 数据变化时 Observer 会调用 Dep.notify() 方法来通知所有的观察者调用 run 方法更新视图。

1. Vue 在模板编译过程中指令或者数据绑定都会实例化一个 Watcher ，实例化过程中触发 get 将自身指向 Dep.target
2. data 在 Observer 时执行 getter 会触发 dep.depend() 进行依赖收集;依赖收集的结果：1、data 在 Observer 时闭包的dep实例的subs添加观察它的 Watcher 实例；2. Watcher 的deps中添加观察对象 Observer 时的闭包dep；
3. 当data中被 Observer 的某个对象值变化后，触发subs中观察它的watcher执行 update() 方法，最后实际上是调用watcher的回调函数cb，进而更新视图。

参考文章：https://juejin.cn/post/6844903561327820808
