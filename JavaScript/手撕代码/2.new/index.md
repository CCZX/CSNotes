`JavaScript`的`new`操作：

1. 创建一个空对象：`instance`
2. 原型链指向改变：`instance.__proto__ = constructor.prototype`
3. 执行构造函数，并且将`this`指向`instance`
4. 如果构造函数没有显示的返回对象或者函数，则返回创建的对象`instance`
