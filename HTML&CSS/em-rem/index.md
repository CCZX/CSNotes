## em

相对于父级的font-size，如果父级没有设置font-size则一直向上查找，找不到就使用浏览器的默认字体大小。

```css
1em = 1font-size
```

## rem

相对于根节点的font-size，没有设置则是浏览器默认font-size（16px）

```css
:root {
  font-size: 20px
}
p {
  width: 2rem; // 40px
}
```
