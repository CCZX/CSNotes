## prefetch

```html
<link rel="prefetch"></link>
```

高速浏览器该资源在将来可能会用到（比如点击某个导航后需要加载的资源），但是资源的权重比较低。**被标记为prefetch的资源将会在浏览器的空闲时间加载**

## preload

```html
<link rel="preload"></link>
```

**preload通过用于本页面需要用到的关键资源**，preload将会把资源的权重提高，使得关键数据下载好，优化页面打开的速度。
