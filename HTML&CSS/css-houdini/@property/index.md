## what

使用 CSS @property 可以自定义 CSS 属性，并设置属性的默认值，属性类型检测，属性是否可继承等属性

```css
@perperty --my-color {
  syntax: '<color>';
  inherits: false;
  initial-value: '#fff'
}

p {
  color: var(--my-color);
}
```

## reference

- https://juejin.cn/post/6951201528543707150
