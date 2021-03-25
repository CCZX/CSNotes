## 运行流程

1. 初始化配置文件
2. 挂载事件回调函数
3. entry入口遍历文件
4. 对文件调用相关loader
5. 输出chunk

## 三种hash

```json
output: {
  filename: bundle.[name].[hash|chunkhash|contenthash].js
}
```

- hash：只要有更改整个项目文件的hash都会发生变化，粒度整个项目
- chunkhash：根据不同入口进行依赖文件处理，只有被修改的chunk重新构建才会生成新的hash，粒度entry的每个入口文件
- contenthash：每个文件都有唯一的hash值，粒度每个文件

## 按需加载

在项目中加载资源：
```js
import(/** chunkName: xxx*/ './index.jsx').then(data => {
  // ...
})
```
在webpack配置文件的output需要指定chunkFilename

## 公共代码提取
