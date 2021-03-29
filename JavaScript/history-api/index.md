浏览器history可以保存浏览器的历史记录，以及前进、后退等。在HTML5新增了pushState和replaceState来增强history，可以通过pushState和replaceState来实现改变浏览器网址而不刷新浏览器的操作。

### pushState
添加一条历史记录，不刷新页面。添加可以回退。
```js
history.pushState(state, title, url)
```
- state：用于指定网址相关的静态对象，触发popstate时会将其作为回调函数的参数
- title：新页面的标题
- url：新的网址，必须和当前同域

### replaceState
替换当前的历史记录，不会刷新页面。替换后不能回退。
```js
history.replaceState(state, titrl, url)
```

### popstate事件

```js
window.addEventListener('popstate', function(event) {
  console.log(event)
})
```

History.back()、History.forward()、History.go()事件是会触发popstate事件的，但是History.pushState()和History.replaceState()不会触发popstate事件。

### 监听pushState和replaceState

popstate不能监听pushState和replaceState的变化，我们可以通过自定义事件来实现：

```js
const bindEventListener = function(type) {
  const historyType = history[type]
  return function(...args) {
    const res = historyType.apply(this, args)
    const event = new Event(type)
    window.dispatchEvent(event)
    return res
  }
}
history.pushState = bindEventListener('pushState');
history.replaceState = bindEventListener('replaceState');
```

这样就创建了2个全新的事件，事件名为pushState和replaceState，我们就可以在全局监听：

```js
window.addEventListener('replaceState', function(e) {
  console.log('THEY DID IT AGAIN! replaceState');
});
window.addEventListener('pushState', function(e) {
  console.log('THEY DID IT AGAIN! pushState');
});
```

自定义事件的两种方式：
```js
// 1.第一种
// 定义
const eve = new Event('coustome')
// 绑定
dom.addEventListenner('coustome', () => {})
// 触发
dom.dispatch(eve)

// 2.第二种，可以添加数据
const eve1 = new CustomoeEvent('coustome1', {data})
// 绑定
dom.addEventListenner('coustome1', () => {})
// 触发
dom.dispatch(eve1)
```
