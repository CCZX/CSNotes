
为什么react要求必须绑定呢？那我们抛开react先来看看什么时候要绑定this，什么不要绑定this：
```js
var obj = {
  member: 'you got me', 
  func: function(){
    return this.member;
  }
}
```

**不要绑定this的情况 **
```js
obj.func();
// "you got me"
```

```js
/* 一定要绑定this的情况 */
var func = obj.func;
func();
// undefined
func.bind(obj)()
// "you got me"
```

由上面的例子，我们基本可以看出，当对象中的方法被赋值给其他变量暂存后，this就消失了。

注意： 对象中的函数临时暂存不直接调用会丢失this

注意： 对象中的函数临时暂存不直接调用会丢失thisreact之所需要开发者去绑定this的唯一原因，也是当它调用你绑定的事件处理函数时，函数的this消失了，必须要你一开始就帮this绑定死，让他不会后续调用时丢失。那问题就又来了，react怎么会帮我们的this搞丢呢？如果react没有给你搞丢this，那么当事件发生时，它一定是下面这么调用你的事件处理函数的。
```js
instance.eventHandler(); // instance 
```
是react组件类的实例化可惜react不是的，要搞定真正的为什么，需要理解react时怎么处理事件的？

相对于其他框架来说，react使用了合成事件来标准化浏览器的事件。

合成事件是一种顶层代理机制，这种代理机制作用的结果是 事件依然在真实的dom节点上触发，之后会冒泡一路到document的节点，然后开始分发document节点收集到的事件，这个时候react从事件触发的组件实例开始， 遍历虚拟dom树，从树上取下我们绑定的事件，收集起来，然后执行。举个例子：
```js
class Test extends React.Component {
   fatherHandler =  function father() { /*...*/}
   childHander = function child() {/*...*/}

   render(){
     return (
       <div onClick={this.fatherHandler}>
         <span onClick={this.childHander}>
         </span>
       </div>
     );
    }
  }
```
当事件触发以后react会把上面的事件处理函数放到一个数组里是这样的
```js
[father, child]
```
最后，react只要遍历执行这个数组，就能执行所有需要执行的事件处理函数。哈哈，想必眼尖的同学已经看出问题了，这里我们对函数进行了临时保存，这个时候执行的话，this自然就丢失了。有的同学也说了这其实不是react的锅，是js本身的问题。但是如果react保存顺便保存一下实例，还是可以做到，不需要你绑定this的，但是这样对于react来说代价太大了。
```js
[{instance, father}, {instance，child }]
```
如果你看明白了，还可尝试看看这个问题
- 为什么react事件绑定没有用onclick这样，用的是onClick这种形式？
- 为什么捕获事件写成onClickCapture就可以了？
