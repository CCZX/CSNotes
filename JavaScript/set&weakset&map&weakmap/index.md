## set

1. 集合，类似于数组，但是成员不能重复，所以可以用于数组去重
2. 可遍历，常见方法有add、delete、has

## WeakSet

1. 成员都是对象
2. 成员都是弱引用，可随时消失，所以可用来保存DOM节点不易造成内存泄露
3. 不能遍历，常见方法有add、delete、has

## map

1. 键值对的集合
2. 可以接受对象作为键
3. 可遍历，常见方法set、has、clear

## WeakMap

1. 只能接受对象作为键
2. 键所指的对象不计入垃圾回收器
3. 不可遍历，常见方法set、has、clear

https://github.com/Advanced-Frontend/Daily-Interview-Question/issues/6
