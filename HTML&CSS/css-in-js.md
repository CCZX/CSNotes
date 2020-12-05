### 1、什么是css in js

`css in js`指的就是将`css`（认为也可以是事件绑定）写在`js`里面。这种用法在`React`出现后使用得越来越多。

但是`css in js`确实违背了结构、样式、行为分离的原则，但是`React`带来了更好编程体验、复用。衡量之下使用`css in js`的利大于弊。

`css in js`是对`html`、`css`的封装，我们可以使用`js`来写`html`和`css`，这就是`jsx`

因为`css in js`就是相对于内联的`css`样式，只是使用`js`来书写，所以对比`less scss`等`css`预处理语言的好处在于不需要进行编译

但是**个人认为**`less scss`等预处理语言在编写比较复杂的样式还是很有优势的，`css in js`适用于一些小的组件和少的样式。

### 2、封装CSS函数

在`js`文件里面：
```jsx
<div
    style={{
        fontSize: '20px',
        width: '20px'
    }}
>
</div>
```

我们也可以对经常使用的`css`使用函数封装起来

```jsx
function Demo() {
    function suqare() {
        return {
            width: '20px',
            height: '20px'
        }
    }
    return <div
        style={{
            ...suqare()
        }}
    >
    <div>
}

```

我们将一些常用的`css`封装成函数，在需要时调用还是很方便的。

### 3、styled-component

`styled-component`的用法看起来有点类似于写组件的方式，每一个`HTML`标签都可以看做一个组件。由于每一个标签都是组件感觉在使用`react-dev-tools`调试起来有点麻烦。

并且`styled-component`具有嵌套、基础、props传递等高级方法

常见用法可以参考：https://www.jianshu.com/p/2178abb2ee95

### 4、常见css in js库
- https://github.com/styled-components/styled-components
- https://polished.js.org/
- https://github.com/Khan/aphrodite

### 5、个人总结

个人感觉使用`css in js`的`style`方式比较适合于一些小的组件或者`css`代码不多的地方。如果代码过多容易还是比较拥挤，当然使用函数封装起来还是比较不错的。

`styled-component`的方法还是比较强大，但是还是使用不习惯，需要学习的方法比较多，并且其嵌套不是视觉可见的，相比较还是`scss`等`css`预处理语言好用。

