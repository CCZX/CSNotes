## 冒泡（默认）

```js
target.addEventListenner('click', () => {

}, false)
```

执行顺序：target -> parent -> ... -> document -> window

## 捕获

```js
target.addEventListenner('click', () => {

}, true)
```

执行顺序：window -> document -> ... -> parent -> target

## 自定义事件

```js
const myEvent = new Event('customEvent')

target.addEventListenner('customEvent', () => {

})

target.dispatch(myEvent)

```
