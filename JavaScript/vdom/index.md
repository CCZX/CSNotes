## VDOM

虚拟`DOM`是使用`JavaScript`对象的方式来表示一个`DOM`对象，一个`DOM`对象涉及到如下信息：
1. `type`：`DOM`节点的类型，比如：`p、div`...
2. `props`：属性，比如：`class、id`...
3. `children`：子节点，子节点可以是对象（对象包含`type、props、children`），或者原始值

所以使用`JavaScript`对象表示`DOM`节点的形式：
```js
{
  type: 'div',
  props: {
    class: 'wrapper'
  },
  children: [
    {
      type: 'p',
      props: {},
      children: ["hello"]
    },
    world
  ]
}
```

所以我们需要实现一个`render`方法将上面的对象渲染成真实的`DOM`节点。

代码：[index.js](./index.js)
