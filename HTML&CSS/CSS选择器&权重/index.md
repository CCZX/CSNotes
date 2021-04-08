## 常见选择器

- *
- class
- id
- element
- selector1, selector2：选择selector1和selector2
- element element：子元素
- element > element：直接子元素
- element + element：div + p 紧邻着的div的p元素
- [attribute]: 属性选择器
- [attribute=value]、[attribute~=value]:包含value、[attribute|=value]：value开头
- 伪类（为已存在的元素进行描述）：:link、:visited、:hover、:active、
- 伪元素（添加新的元素）：::before、::after

## 权重

- !important：infinity
- 行内样式：1000
- ID：100
- class、伪类、属性：10
- 伪元素、标签：1

1. 同类选择器不可叠加：无论多少个class组成的选择器，都没有一个ID选择器权重高
2. 高权重生效：如果两个权重不同的选择器作用在同一元素上，权重值高的css规则生效
3. 后面的覆盖前面的：如果两个相同权重的选择器作用在同一元素上：以后面出现的选择器为最后规则.
4. style中样式权重大于link引入的外部样式：权重相同时，与元素距离近的选择器生效，比如head中的style样式大于引入的外部样式表的
