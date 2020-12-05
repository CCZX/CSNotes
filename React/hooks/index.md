## 1、react-hooks解决的问题

1. 函数组件中不能拥有自己的状态（state）。在hooks之前函数组件是无状态的，都是通过props来获取父组件的状态，但是hooks提供了useState来维护函数组件内部的状态。

2. 函数组件中不能监听组件的生命周期。useEffect聚合了多个生命周期函数。
3. class组件中生命周期较为复杂（在15版本到16版本的变化大）。
4. class组件逻辑难以复用（HOC，render props）。

## 2、hooks对比class的好处

### 1、写法更加的简洁

我们以最简单的计数器为例：
> class组件

```javascript
class ExampleOfClass extends Component {
  constructor(props) {
    super(props)
    this.state = {
      count: 1
    }
  }
  handleClick = () => {
    let { count } = this.state
    this.setState({
      count: count+1
    })
  }
  render() {
    const { count } = this.state
    return (
      <div>
        <p>you click { count }</p>
        <button onClick={this.handleClick}>点击</button>
      </div>
    )
  }
}
```
> hooks

```javascript
function ExampleOfHooks() {
    const [count, setCount] = useState(0)
    const handleClick = () => {
        setCount(count + 1)
    }
    return (
      <div>
        <p>you click { count }</p>
        <button onClick={handleClick}>点击</button>
      </div>
    )
}
```
可以看到使用hooks的代码相比class组件代码更加的简洁、清晰。

### 2、业务代码更加聚合

使用class组件经常会出现一个功能出现在两个生命周期函数内的情况，这样分开写有时候可能会忘记。比如：

```javascript
let timer = null
componentDidMount() {
    timer = setInterval(() => {
        // ...
    }, 1000)
}
// ...
componentWillUnmount() {
    if (timer) clearInterval(timer)
}
```
由于添加定时器和清除定时器是在两个不同的生命周期函数，中间可能会有很多其他的业务代码，所以可能会忘记清除定时器，如果在组件卸载时没有添加清楚定时器的函数就可能会造成内存泄漏、网络一直请求等问题。

但是使用hooks可以让代码更加的集中，方便我们管理，也不容易忘记：

```javascript
useEffect(() => {
    let timer = setInterval(() => {
        // ...
    }, 1000)
    return () => {
        if (timer) clearInterval(timer)
    }
}, [//...])
```

### 3、逻辑复用方便

class组件的逻辑复用通常用render props以及HOC两种方式。react hooks提供了自定义hooks来复用逻辑。

下面以获取鼠标在页面的位置的逻辑复用为例：

> class组件render props方式复用

```
import React, { Component } from 'react'

class MousePosition extends Component {
  constructor(props) {
    super(props)
    this.state = {
      x: 0,
      y: 0
    }
  }

  handleMouseMove = (e) => {
    const { clientX, clientY } = e
    this.setState({
      x: clientX,
      y: clientY
    })
  }

  componentDidMount() {
    document.addEventListener('mousemove', this.handleMouseMove)
  }

  componentWillUnmount() {
    document.removeEventListener('mousemove', this.handleMouseMove)
  }

  render() {
    const { children } = this.props
    const { x, y } = this.state
    return(
      <div>
        {
          children({x, y})
        }
      </div>
    )
  }

}

// 使用
class Index extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <MousePosition>
        {
          ({x, y}) => {
            return (
              <div>
                <p>x:{x}, y: {y}</p>
              </div>
            )
          }
        }
      </MousePosition>
    )
  }
}

export default Index

```

> 自定义hooks方式复用

```
import React, { useEffect, useState } from 'react'

function usePosition() {
  const [x, setX] = useState(0)
  const [y, setY] = useState(0)

  const handleMouseMove = (e) => {
    const { clientX, clientY } = e
    setX(clientX)
    setY(clientY)
  } 

  useEffect(() => {
    document.addEventListener('mousemove', handleMouseMove)
    return () => {
      document.removeEventListener('mousemove', handleMouseMove)
    }
  })
  return [
    {x, y}
  ]
}

// 使用
function Index() {
  const [position] = usePosition()
  return(
    <div>
      <p>x:{position.x},y:{position.y}</p>
    </div>
  )
}

export default Index

```

可以很明显的看出使用hooks对逻辑复用更加的方便，使用的时候逻辑也更加清晰。

## 3、hooks常见的一些API使用

### 1、useState

> 语法

`const [value, setValue] = useState(0)`

这种语法方式是ES6的数组结构，数组的第一个值是声明的状态，第二个值是状态的改变函数。

> 每一帧都有独立的状态

个人理解针对每一帧独立的状态是采用了闭包的方法来实现的。

```javascript
function Example() {
  const [val, setVal] = useState(0)
  const timeoutFn = () => {
      setTimeout(() => {
        // 取得的值是点击按钮的状态，不是最新的状态
          console.log(val)
      }, 1000)
  }
  return (
      <>
          <p>{val}</p>
          <button onClick={()=>setVal(val+1)}>+</button>
          <button onClick={timeoutFn}>alertNumber</button>
      </>
  )
}
```

当组件的状态或者props更新时，该函数组件会被重新调用渲染，并且每一次的渲染都是独立的都有自己独立的props以及state，不会影响其他的渲染。


### 2、useEffect

> 语法

```javascript
useEffect(() => {
    //handler function...
    
    return () => {
        // clean side effect
    }
}, [//dep...])
```

useEffect接收一个回调函数以及依赖项，当依赖项发生变化时才会执行里面的回调函数。useEffect类似于class组件didMount、didUpdate、willUnmount的生命周期函数。

> 注意点

1. useEffect是异步的在组件渲染完成后才会执行
2. useEffect的回调函数只能返回一个清除副作用的处理函数或者不返回
3. 如果useEffect传入的依赖项是空数组那么useEffect内部的函数只会执行一次

### 3、useMemo、useCallback

useMemo和useCallback主要用于减少组件的更新次数、优化组件性能的。

1. useMemo接收一个回调函数以及依赖项，只有依赖项变化时才会重新执行回调函数。
2. useCallback接收一个回调函数以及依赖项，并且返回该回调函数的memorize版本，只有在依赖项重新变化时才会重新新的memorize版本。

> 语法

```
const memoDate = useMemo(() => data, [//dep...])
const memoCb = useCallback(() => {//...}, [//dep...])
```

在优化组件性能时针对class组件我们一般使用React.PureComponent，PureComponent会在shouldUpdate进行一次钱比较，判断是否需要更新；针对函数组件我们一般使用React.memo。但是在使用react hooks时由于每一次渲染更新都是独立的（生成了新的状态），即使使用了React.memo，也还是会重新渲染。

> 比如下面这种场景，改变子组件的name值后由于父组件更新后每次都会生成新值（addAge函数会改变），所以子组件也会重新渲染。

```javascript
function Parent() {
  const [name, setName] = useState('cc')
  const [age, setAge] = useState(22)

  const addAge = () => {
    setAge(age + 1)
  }

  return (
    <>
      <p>父组件</p>
      <input value={name} onChange={(e) => setName(e.target.value)} />
      <p>age: {age}</p>
      <p>-------------------------</p>
      <Child addAge={addAge} />
    </>
  )
}

const Child = memo((props) => {
  const { addAge } = props
  console.log('child component update')
  return (
    <>
      <p>子组件</p>
      <button onClick={addAge}>click</button>
    </>
  )
})
```

> 使用useCallback优化

```javascript
function Parent() {
  const [name, setName] = useState('cc')
  const [age, setAge] = useState(22)

  const addAge = useCallback(() => {
    setAge(age + 1)
  }, [age])

  return (
    <>
      <p>父组件</p>
      <input value={name} onChange={(e) => setName(e.target.value)} />
      <p>age: {age}</p>
      <p>-------------------------</p>
      <Child addAge={addAge} />
    </>
  )
}

const Child = memo((props) => {
  const { addAge } = props
  console.log('child component update')
  return (
    <>
      <p>子组件</p>
      <button onClick={addAge}>click</button>
    </>
  )
})
```

只有useCallback的依赖性发生变化时，才会重新生成memorize函数。所以当改变name的状态是addAge不会变化。

### 4、useRef

useRef类似于react.createRef。

```javascript
const node = useRef(initRef)
```
useRef 返回一个可变的 ref 对象，其 current 属性被初始化为传入的参数（initRef）

> 作用在DOM上

```javascript
const node = useRef(null)
<input ref={node} />
```

这样可以通过node.current属性访问到该DOM元素。

需要注意的是**useRef创建的对象在组件的整个生命周期内保持不变**，也就是说每次重新渲染函数组件时，返回的ref 对象都是同一个（使用 React.createRef ，每次重新渲染组件都会重新创建 ref）。

### 5、useReducer

useReducer类似于redux中的reducer。

> 语法
```javascript
const [state, dispatch] = useReducer(reducer, initstate)
```
useReducer传入一个计算函数和初始化state，类似于redux。通过返回的state我们可以访问状态，通过dispatch可以对状态作修改。

```javascript
const initstate = 0;
function reducer(state, action) {
  switch (action.type) {
    case 'increment':
      return {number: state.number + 1};
    case 'decrement':
      return {number: state.number - 1};
    default:
      throw new Error();
  }
}
function Counter(){
    const [state, dispatch] = useReducer(reducer, initstate);
    return (
        <>
          Count: {state.number}
          <button onClick={() => dispatch({type: 'increment'})}>+</button>
          <button onClick={() => dispatch({type: 'decrement'})}>-</button>
        </>
    )
}

```

### 6、useContext

通过useContext我们可以更加方便的获取上层组件提供的context。

> 父组件
```javascript
import React, { createContext, Children } from 'react'
import Child from './child'

export const MyContext = createContext()

export default function Parent() {

  return (
    <div>
      <p>Parent</p>
      <MyContext.Provider value={{name: 'cc', age: 21}}>
        <Child />
      </MyContext.Provider>
    </div>
  )
}
```
> 子组件

```javascript
import React, { useContext } from 'react'
import { MyContext } from './parent'

export default function Parent() {
  const data = useContext(MyContext) // 获取父组件提供的context
  console.log(data)
  return (
    <div>
      <p>Child</p>
    </div>
  )
}
```
> 使用步骤
- 父组件创建并导出`context：export const MyContext = createContext()`
- 父组件使用`provider`和`value`提供值：`<MyContext.provide value={{name: 'cc', age: 22}} />`
- 子组件导入父组件的`context：import { MyContext } from './parent'`
- 获取父组件提供的值：`const data = useContext(MyContext)`

不过在多数情况下我们都不建议使用`context`，因为会增加组件的耦合性。

### 7、useLayoutEffect

useEffect 在全部渲染完毕后才会执行；useLayoutEffect 会在 浏览器 layout之后，painting之前执行，并且会柱塞DOM；可以使用它来读取 DOM 布局并同步触发重渲染。

```javascript
export default function LayoutEffect() {
  const [color, setColor] = useState('red')
  useLayoutEffect(() => {
      alert(color) // 会阻塞DOM的渲染
  });
  useEffect(() => {
      alert(color) // 不会阻塞
  })
  return (
      <>
        <div id="myDiv" style={{ background: color }}>颜色</div>
        <button onClick={() => setColor('red')}>红</button>
        <button onClick={() => setColor('yellow')}>黄</button>
      </>
  )
}

```
上面的例子中useLayoutEffect会在painting之前执行，useEffect在painting之后执行。

hooks让函数组件拥有了内部状态、生命周期，使用hooks让代码更加的简介，自定义hooks方便了对逻辑的复用，并且摆脱了class组件的this问题；但是在使用hooks时会产生一些闭包问题，需要仔细使用。
