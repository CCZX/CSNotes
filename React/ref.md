## 1、ref的三种形式

1. string ref（已经被废弃，但在16版本可以使用）
2. callback ref
3. createRef
 
三种形式的使用方法如下：

> string ref

```javascript
class App extends React.Component {
    componentDidMount() {
        console.log(this.refs.myRef)
    }
    render() {
        return (
            <>
                <input ref="myRef" />
            </>
        )
    }
}
```
> callback ref

```javascript
class App extends React.Component {
    componentDidMount() {
        console.log(this.myRef)
    }
    render() {
        return (
            <>
                <input ref={(el) => this.myRef = el} />
            </>
        )
    }
}
```

> createRef

```javascript
class App extends React.Component {
    constructor() {
        this.myRef = React.createRef()
    }
    componentDidMount() {
        console.log(this.myRef.current)
    }
    render() {
        return(
            <>
                <input ref={this.myRef} />
            </>
        )
    }
}
```

需要注意的是React DOM更新是异步的，如果在使用React状态控制节点的显示后不能马上通过this.refs获取到该节点。

> Refs的使用场景

1. 处理焦点、文本选择或者媒体的控制
2. 触发必要的动画
3. 集成第三方 DOM 库

## string ref的缺点

1. 无法知道当前的this，所以react需要追踪当前渲染组件，导致react性能变慢
2. 使用render props时会对ref挂载的位置造成歧义。https://github.com/facebook/react/pull/8333#issuecomment-271648615
```javascript
class MyCmp extends React.Component {
    renderRow(index) {
        // 挂载在DataTable组件
        return <input ref={'input-' + index} />
        
        // 挂载在MyCmp上
        return <input ref={el => this['input-' + index] = el} />
    }
    render() {
        return(
            <DataTable renderRow={this.renderRow} />
        )
    }
}
```
3. ref无法被合并，例如如果第三方组件的父组件已经使用string ref给子组件添加了ref，那么无法再给子组件添加ref；但是可以使用callback解决此问题。
```javascript
/** string ref **/
class Parent extends React.Component {
  componentDidMount() {
    // 可获取到 this.refs.childRef
    console.log(this.refs);
  }
  render() {
    const { children } = this.props;
    return React.cloneElement(children, {
      ref: 'childRef',
    });
  }
}

class App extends React.Component {
  componentDidMount() {
    // this.refs.child 无法获取到
    console.log(this.refs);
  }
  render() {
    return (
      <Parent>
        <Child ref="child" />
      </Parent>
    );
  }
}

/** callback ref **/
class Parent extends React.Component {
  componentDidMount() {
    // 可以获取到 child ref
    console.log(this.childRef);
  }
  render() {
    const { children } = this.props;
    return React.cloneElement(children, {
      ref: (child) => {
        this.childRef = child;
        children.ref && children.ref(child);
      }
    });
  }
}

class App extends React.Component {
  componentDidMount() {
    // 可以获取到 child ref
    console.log(this.child);
  }
  render() {
    return (
      <Parent>
        <Child ref={(child) => {
          this.child = child;
        }} />
      </Parent>
    );
  }
}
```

## callback ref

1. dom节点使用

`<input ref={el => this.myRef = el} />`

2. 自定义组件使用

`<MyComponent ref={cmp => this.myRef = cmp} />`

3. 回调函数触发时机：组件渲染后，即componentDidMount后；组件卸载后，即componentWillMount后，此时，入参为null；ref改变后。

4. 跨级通过props获取子组件的DOM节点

```javascript
function MyComponent(props) {
    const { inpRef } = props
    return <input ref={inpRef} />
}
function Parent(props) {
    const { inpRef } = props
    return (
        Component: <MyComponent inpRef={inpRef} />
    )
}
class App extends Component {
    componentDidMount() {
        // 可以获取到input节点
        console.log(this.inpDOM)
    }
    render() {
        return (
            <Parent
                inpRef={el => this.inpDOM = el}
            />
        )
    }
}
```

callback使用回调函数的方式来添加，使用其他有一些的不方便。

## createRef

createRef是16.3版本提出的API。其使用方式和string ref类似。createRef的性能相比callback ref更好一些，callback ref 采用了组件 render 过程中在闭包函数中分配 ref 的模式，而 createRef 则采用了 object ref。

在实际工作中应该尽量避免使用string ref了，因为它已经被废弃了，callback ref比createRef要强大一点，至于callback ref和createRef的选择还是看实际的使用。
