## flex布局中子元素的宽高问题

- 在不设置子元素的高度的时候默认等于占满父元素的高度。
- 在不设置子元素的宽度或者flex-grow属性时宽度默认为0。

## flex-grow、flex-shrink、flex-basis

- flex-grow：默认值0，即有剩余也不放大
- flex-shrink：默认值1，即空间不足将缩小改项目，如果为0则表示不缩小
- flex-basis：在分配剩余空间之前，项目在主轴占据的空间。默认值auto，即项目原本的大小

flex是flex-grow、flex-shrink、flex-basis的简写。

```css
flex: 1; // flex-grow: 1, flex-shrink: 1, flex-basis: 0%
flex: auto; // 1 1 auto
flex: none; // 0 0 auto
flex: 0; // 0 1 0%
```