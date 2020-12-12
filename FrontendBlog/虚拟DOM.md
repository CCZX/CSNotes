## 什么是虚拟DOM

简单地说虚拟`DOM`其实就是使用`JavaScript`对象的形式来一个`DOM`节点，包含了`type`、`props`、`children`三个属性：

```html
<div class="container">
  hello world
</div>
```
将👆上面的`HTML`代码以虚拟`DOM`的形式表示：
```js
{
  type: 'div',
  props: {
    className: 'container'
  },
  children: [
    "hello world"
  ]
}
```
因为`DOM`树🌲是一个树形的结构，所以使用`JavaScript`对象就可以表示出树的结果。`HTML`和虚拟`DOM`有点类似于`XML`和`JSON`，使用不同的形式来表示相同的数据。

## 虚拟DOM的好处

需要注意的是**虚拟`DOM`不一定比真实的`DOM`操作快**，`JavaScript`引擎和`DOM`引擎使用的是同一个主线程，任何涉及到`DOM`的操作都需要先把`JavaScript`的数据结构转换为`DOM`的数据结构，再将`JavaScript`引擎挂起执行`DOM`引擎，执行完成后再切换执行`JavaScript`引擎，这种上下文的切换是很消耗性能的，**所以解决`DOM`操作的性能问题的关键在于减少不必要的`DOM`操作**。

那么虚拟`DOM`没有带来任何的性能的优化吗？也不是这样！虚拟`DOM`能够实现最细粒度的更新你的`DOM`，对于`DOM`操作我更新`DOM`的常见做法是使用`innerHTML`，但是`innerHTML`的JavaScript计算和DOM操作通常和你的界面数据大小挂钩，即`innerHTML`的时间复杂度O = JavaScript操作时间 + 重新创建所有DOM元素的时间；而虚拟DOM更新UI界面的时间复杂度O = 渲染虚拟DOM + diff + 必要的DOM更新，渲染虚拟DOM和diff操作都是JavaScript计算不会涉及到JavaScript引擎和DOM引擎的上下文切换。所以虚拟DOM不管每次的数据变化是怎样的，每次重绘的对于DOM的操作都是最小的。

虚拟`DOM`最大的好处在于抽象了渲染的过程，为应用带来了跨平台的能力，不再是仅仅局限于浏览器端。比如`React-Native`和`WeeX`可以运行在`Android、IOS`平台上。

## 真实DOM到虚拟DOM的映射

借助`@babel/plugin-transform-react-jsx`可以实现从真实DOM到虚拟DOM的转换。

1.安装babel依赖：`npm i -D @babel/cli @babel/core @babel/plugin-transform-react-jsx`

2.配置 .babelrc：
```js
// .babelrc文件
{
  "plugins": [
    ["transform-react-jsx", {
      "pragma": "h"
    }]
  ]
}
```

下面👇就可以借助`babel`来将真实DOM转换为虚拟DOM

新建`index.js`文件📃：
```js
function toVDOM() {
  return (
    <ul className="group">
      <li className="item">吃饭</li>
      <li className="item">睡觉</li>
      <li className="item">打代码</li>
    </ul>
  )
}
```

执行命令npx babel main.jsx --out-file vdom.js后得到：
```js
function toVDOM() {
  return h("ul", {
    className: "group"
  }, h("li", {
    className: "item"
  }, "吃饭"), h("li", {
    className: "item"
  }, "睡觉"), h("li", {
    className: "item"
  }, "打代码"));
}
```

所以我们只需要实现`h`函数就能得到虚拟DOM了。

```js
function h(type, props, ...children) {
  return {
    type,
    props: props || {},
    children: children.flat()
  }
}
```

## render函数

上面我们已经实现了真实`DOM`到虚拟`DOM`的转换，接下来我们将实现`render`函数将虚拟`DOM`渲染成真实`DOM`：

```js
function render(element, container) {
  const { type, props = {}, children = [] } = element;
  const dom = typeof element === 'number' || typeof element === 'string' ? document.createTextNode(element) : document.createElement(type);

  Object.keys(props).forEach(p => {
    dom[p] = props[p]
  });

  children.forEach(c => {
    render(c, dom)
  });

  container.appendChild(dom);
}
```

将通过h函数生成的虚拟`DOM`传入到`render`函数中就能实现将虚拟`DOM`渲染成真实`DOM`了：

```js
render(element, document.getElementById('app'))
```

## 接下来的更新内容

- 虚拟`DOM`的更新
