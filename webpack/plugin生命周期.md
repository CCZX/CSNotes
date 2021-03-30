## 生命周期

1. compile：开始进入编译环境。开始编译
2. compilation：即将产生一个新的版本
3. make：任务开始
4. optimize：作为compilation的回调方法，优化编译，在compilation回调函数中为每一个新的编译绑定回调
5. after-compile：编译完成
6. emit：准备生成文件，开始释放资源，最后一次将资源添加到资源集合的机会
7. after-emit：文件生成之后编译器释放资源
8. done：所有工作执行完成

```js
MyPlugin.prototype.apply = function(compiler) {
  // 1
  compiler.plugin("compile", function(params) {
    console.log("The compile is starting to compile...", params);
  });
  // 2
  compiler.plugin("compilation", function(compilation, params) {
    console.log("The compile is starting a new compilation...");
    // 4
    compilation.plugin("optimize", function() {
      console.log("The compilation is starting to optimize file...");
    });
  });
  // 3
  compiler.plugin("make", function(compiler, callback){
    console.log("the compile is making file...");
    callback();
  });
  // 5
  compiler.plugin("after-compile", function(compilation) {
    console.log("The compile has aleardy compiled");
  });
	// 6
	compiler.plugin("emit", function(compilation, callback) {
    console.log("The compilation is going to emit files...");
    callback();
  });
	// 7
	compiler.plugin('after-emit', function(compilation) {
    console.log('The compliation has aleardy emitted');
  })
}
```

在`webpack 4+`版本有了新的plugin系统，注册事件如下：

```js
compiler.hooks.comopile.tap('event-name', (compilation) => {

})
```

参考文章：[plugin](https://beacelee.com/2018-01-18-%E8%A7%A3%E6%9E%90webpack%20plugin%E7%9A%84%E7%94%9F%E5%91%BD%E5%91%A8%E6%9C%9F%EF%BC%8C%E4%B9%A6%E5%86%99%E8%87%AA%E5%B7%B1%E7%9A%84%E7%AC%AC%E4%B8%80%E4%B8%AAplugin/)
