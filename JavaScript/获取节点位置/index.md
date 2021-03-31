1. clientHeight：表示可视区域的高度，不包含 border 和滚动条
2. offsetHeight：表示可视区域的高度，包含了 border 和滚动条
3. scrollHeight：表示了所有区域的高度，包含了因为滚动被隐藏的部分
4. clientTop：表示边框 border 的厚度，在未指定的情况下一般为0
5. scrollTop：滚动后被隐藏的高度，获取对象相对于由 offsetParent 属性指定的父坐标（CSS 定位的元素或 body 元素）距离顶端的高度。