react使用的是一种自上而下的数据流方式。
# 1、state、props
react的核心思想是组件，组件和UI之间的关系可以简单的表示为：
```javascript
UI = fn(props, state)
```
而这里fn就代表react中的Component。Component通过对state以及props的一些操作来实现UI层面的渲染。

state是组件内部维护的数据状态。props是组件对外部定义的数据接口，如果下层组件需要访问外层组件的数据，就可以通过下层组件定义的props接口来进行数据的传递。

state中的属性值是可以变化的，但是你应该避免直接修改state的属性（`this.state.arg = 'test'`），因为react没有监听state的数据变化，所以这样的改变是不会同步到UI层面的（这一点和Vue不同，Vue data中的数据都是响应式的，但是这样的开销很大，所以Vue3.0使用了reactive来声明你的数据是否需要响应式），应该使用`this.setState({arg: 'test'})`的方式。

props中的属性是不可以修改的，如果想要修改props属性的值，需要在下层组件调用上层组件的方法，让上层组件来修改，然后将新的props传递到下层组件。

## 1.1、state

> 如何定义State

state中的数据必须能够完整的反映UI的变化，并且state中的所有数据都是和UI相关的。

> 判断一个数据是不是state
1. 从props中获取。它不是state
2. 在组件中没有发生变化。他不是state
3. 可以通过已有的state或者props获取。他不是state
4. 和UI的表现没有关系。他不是state，比如定时器


> 更新state时不能通过直接赋值的方式：

```javascript
this.state.test = '123'
```
这样是不会触发组件的重新render的，因为react是默认没有监听state中的数据的。我们可以通过setState的方式来触发组件的更新
```javascript
this.setState({
    test: '123'
})
```

> State的更新是异步的，短时间内会将多个更新state合并为一个setState来进行操作。

```javascript
public state = {
    num: 0
}
componentDidMount() {
    for(let i = 0; i < 100; i++) {
        this.setState({num: this.state.num + 1})
    }
    console.log(this.state.num)
}
```
这样最后state.num的结果任然是1。并且在控制台输出了1个0，可见在调用this.setState后没有马上获取到最新的值。

为了解决多次更新合并的问题react提供了向setState传递一个函数的方式，该函数接收上一次的state以及最新的props
```javascript
public state = {
    num: 0
}
componentDidMount() {
    for(let i = 0; i < 100; i++) {
        this.setState((preState, props) => {
            return {
                num: preState.num + 1
            }
        })
    }
    console.log(this.state.num)
}
```
这样虽然没有将多次更新合并为一个更新了但是获取到的this.state.num任然是0，所以如果我们想要在state更新后马上做一些事应该怎么做呢？

或许你可以将后续操作使用setTimeout包装成为一个异步的操作。
```javascript
fn = () => {
    this.setState({
        num: 123
    })
    setTimeout(() => {
        // do...
    }, 0)
}
```

更好的方法：react官方在使用setState的时候允许使用第二参数，是一个callback，表示在state更新后要进行的操作，里面获取到state的状态是更新后的状态。
```javascript
this.setState({
    num: 123
}, () => {
    // do...
})

```
## 1.2、props

props就是上层组件的state。如果要更新props需要调用上层组件的方法更新，然后将最新的数据传入到下层组件。

> 给props定义类型

```javascript
import PropTypes from 'prop-types'
class Test extends Component {
    // ...
}
// 类型
Test.propTypes = {
    name: PropTypes.string,
    age: PropTypes.number
}
// 默认值
Test.defaultProps = {
    name: 'cc',
    age: 21
}
```

# 2、redux

redux是一个全局的状态管理器。每个组件都可以共享，可以修改redux中的数据。修改redux中的状态后所有依赖该状态的组件都会得到响应。

1. redux将数据存储到Store中，store中的数据是不可变的
2. 组件通过使用store的state来访问数据
3. 组件如果要修改store中的数据需要调用dispatch1方法发送一个action，然后action被reducer处理后返回一个新的store

![image](http://static.chenr.cn/企业微信截图_b5df7f9d-1efc-4cad-b518-a7d4746458a6.png)

## 2.1、store

store是应用状态（state）的管理者，我们可以通过`store.getState()`的方式获取状态，通过`store.dispatch()`方法来改变store的状态。

一个应用只能有一个store以及唯一的state。state中的属性不能直接修改，要修改state的属性只能通过`dispatch`来派发一个action。

## 2.2、action

action就是要改变state值发起的一些操作。
```javascript
store.dispatch(action)
```
action的结构应该符合一些规范：
```javascript
{
    type: '', // 这里和reducer对应
    data: {}  // 改变的数据
}
```
为了方便统一管理我会通常使用actionCreator来创建action。
```javascript
export const Add_Action = (data) => {
  return {
      type: 'ADD',
      data
  }
}
```

action既可以是同步的也可以是异步的，所以我们在action中发起一起ajax请求。
```javascript
export const Async_Action = (data) => {
  return (dispatch) => {
    setTimeout(() => {
      const action = {
        type: 'ASYNC',
        data
      }
      dispatch(action)
    }, 2000)
  }
}
```
## 2.3、reducer

reducer必须是一个同步的纯函数。它根据action的type基于原有的state值来生成新的state，并使用新的state替代原来的state。

> 我们也可以在react中使用react-redux来简化我们的操作。

react-redux提供provider、connect等方法来简化我们的操作。

# 3、MobX

参考文章：[Mobx](https://cn.mobx.js.org/)

MobX是响应式编程（有点类似于Vue了）。它主要的任务是：定义可响应的状态，在视图上响应变化，更改状态。

## 3.1、observable

使用observable创建可以响应的状态。observable的值类型可以是基本数据类型、引用类型、普通对象、类实例等

```javascript
const appState = observable({
    count: 1
})
```
## 3.2、action

通过action来改变state，action函数是对传入的function进行一次包装，使得function中的observable对象的变化能够被观察到，从而触发相应的衍生。
```javascript
import { observable } from 'mobx'

class CounterStore {
    @observable counter = 0
    @observable remoteCounter = 0
    increment(){
        this.counter++;
    }
    decrement(){
        this.counter--;
    }
}

const counterStore = new CounterStore;

export default counterStore;
```

