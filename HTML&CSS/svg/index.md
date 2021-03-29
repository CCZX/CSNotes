https://www.cnblogs.com/xiaohuochai/p/7478486.html

## what?

svg是矢量图，使用XML来描述图形，放大不会失真。

## 内置图形

- rect
- cricle
- ellipse
- line
- polyline
- polygon

## 高级

- path：可以绘制任何图形，上面的内置图形可以理解为path的语法糖
- use：使用页面中的其他svg节点，可defs、symbol配合：`<use xlink:href="#Port"/>`
- defs：定义需要重复使用的svg，defs中的元素不会直接呈现
- symbol：symbol元素用来定义一个图形模板对象，一个<symbol>元素可以有preserveAspectRatio和viewBox属性。而<g>元素不能拥有这些属性。因此相比于在<defs>元素中使用<g>的方式来复用图形，使用<symbol>元素也许是一个更好的选择
- g：定义svg组，可以设置一组元素的属性

## canvas和svg对比

**canvas优点：**
1. 基于像素，内存恒定
2. 一张图只存在一个HTML节点
3. 大数据情况下性能比svg好

**canvas缺点：**
1. 事件交互基于整个画布，根据坐标计算节点，编程方式琐碎
2. 不支持插入HTML节点，臂支撑CSS
3. 因为基于像素，所以大屏下渲染时间长

**svg优点：**
1. 矢量图
2. 基于XML，可以使用CSS修改样式

**svg缺点：**
1. 元素过多时会有性能问题
