## 16.4之前的生命周期

### 初始化
```js
constructor(props)
componentWillMount(nextProps)
render()
componentDidMount(prevProps, prevState, snapshot)
```

### 更新
```js
componentWillReceiveProps(nextProps, nextContext)
shouldComponentUpdate(nextProps, nextState, nextContext)
componentWillUpdate(nextProps, nextState, nextContext)
render()
componentDidUpdate(prevProps, prevState)
```

## 卸载
```js
componentWillUnmount()
```

16.4之后引入了fiber架构，在比较两颗树时可能会被打断，所以生命周期可能会多次执行
```js
componentWillMount(nextProps)
componentWillReceiveProps(nextProps, nextContext)
shouldComponentUpdate(nextProps, nextState, nextContext)
componentWillUpdate(nextProps, nextState, nextContext)
```

# 16.4之后的生命周期

## 初始化

```js
constructor()
static getDerivedStateFromProps(nextProps, prevState) // 静态方法，返回值可以更新state，如果返回null则不进行任何更新
render()
componentDidMount(prevProps, prevStae, snapshot)
```

## 更新
```js
static getDerivedStateFromProps(nextProps, prevState)
shouldComponentUpdate(nextProps, nextState, nextContext)
render()
getShapshotBeforeUpdate(prevProps, prevState) // 最近一次渲染输出之前调用，可以在DOM更新之前获取一些信息，返回值可以在componentDidUpdate中获取到
componentDidUpdate(prevProps, prevState, snapshot)
```

## 卸载
```js
componentWillUnmount()
```

# 总结

didMount和didUpdate的参数都是prevProps和PrevState，更新之后给一个获取到之前props的机会。
willUpdate和willMount以及shouldUpdate都是nextProps和nextState
