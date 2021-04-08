## 开发
- resolve.module
- resolve.exclude
- resolve.extensions
- 缓存：cache-loader
- 多进程：uglifyJS

## 生产

- 按需加载：import
- 公共代码提取：optimization.splitChunks
- 静态资源分离：external
- tree shaking：package设置sideEffect
- scope hoisting：production自动开启、webpack.optimize.ModuleConcatenationPlugin()收到开启
- gzip：webpack-parallel-uglify-plugin压缩JS，miniCssExtractPlugin压缩CSS
- 提取css：miniCssExtractPlugin，作为单独link引入
