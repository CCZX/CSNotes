## VDOM

### 渲染VDOM

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

所以我们需要实现一个`createElement`方法将上面的对象渲染成真实的`DOM`节点，`createElement`使用递归的方式来生成`DOM`节点，然后将渲染的真实`DOM`插入到对应的容器中。

代码：[index.js](./index.js)

### 更新VDOM

`VDOM` 的更新涉及到 `diff` 算法。`diff` 的比较分为三个部分：

- `tree diff：之比较同层节点，如果同层节点不同则直接重新创建不用比较后面的子节点
- `comment diff`：如果是同类组件则按照 `tree diff` 比较，如果不是则直接删除重新创建
- `element diff`：使用 `key` 对同层节点进行比较

使用上面的方法可以把遍历的时间复杂度从 `O(n^3)` 降到 `O(n)` 。

自己实现还是采用了递归遍历的方式实现 `diff` 方法遍历新旧 `virtual dom` ，比较节点、属性以及子节点的变化，大致把节点的变化分为如下几类：

- `create`：`old tree` 没有当前节点 `new tree` 有当前节点就需要重新创建
- `remove`：`new tree` 没有当前节点就需要删除该节点
- `replace`：新旧 `tree` 的节点类型不同
- `update`：新旧 `tree` 的属性不同

通过对新旧 dom tree 进行 `diff` 方法比较可以得到一个关于新旧 dom tree 差异对象 `patchs`

```
{
  type: 'update',
  vdom?: {}
  children?: [{type: '', vdom: {}}, ...]
  props: [{type: '', key: '', value: ''}, ...]
}
```

最后实现`patch`方法对 `patchs` 对象进行遍历修改真实 `DOM`。
