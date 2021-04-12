## transform是否可以避免重排重绘问题

那么使用CSS3的transform来实现动画是否可以避免重排问题？或者说浏览器针对这一部分做了其他优化？

经过一番查找，答案如下：

CSS的最终表现分为以下四步：**`Recalculate Style -> Layout -> Paint Setup and Paint -> Composite Layers`**

按照中文的意思大致是 查找并计算样式 -> 排布 -> 绘制 -> 组合层

这上面的几个步骤有点类似于上文说到的重排必定导致重绘，而查询属性会强制发生重排。所以上文提到的重排重绘内容可以结合这里进行理解。

由于**transform是位于Composite Layers层**，而width、left、margin等则是位于Layout层，在Layout层发生的改变必定导致Paint Setup and Paint -> Composite Layers，所以相对而言使用transform实现的动画效果肯定比left这些更加流畅。

而且就算抛开这一角度，在另一方面浏览器也会针对transform等开启GPU加速。
