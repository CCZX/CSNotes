## 1、页面加载时

1. 资源压缩（使用webpack打包生产环境会默认压缩代码）
2. 首屏加载更少资源，对于使用webpack可以进行代码分割，按需加载，公共模块
3. 使用浏览器缓存，涉及到last-modify/if-modify-sence、ETag/if-none-match请求头，webpack指纹策略
4. 服务端渲染
5. HTTP2.0

## 2、页面渲染时

DOMTree + CSSTree = RenderTree

1. JS加载会阻塞DOM解析，所以可以使用async（加载完立即执行）、defer（所有元素解析完成之后，DOMContentLoaded 事件触发之前完成）,当初始的 HTML 文档被完全加载和解析完成之后，DOMContentLoaded 事件被触发，而无需等待样式表、图像和子框架的完全加载。
2. 

## 3、运行时

1. 减少重绘回流，对于DOM操作可以使用documentFragment
2. 防抖节流
3. 图片懒加载
4. 事件委托
5. 长列表优化
