# 1、变量
在`scss`中使用`$`声明一个变量。
```scss
$font-size: 12px
```
在`scss`中变量必须在使用前声明。变量的作用域和`JavaScript`的作用域类似，分为全局作用域和局部作用域。

# 2、插值

可用在选择器、属性名等。

```scss
$name: color;
.div1 {
    background-#{$name}: red
}
```
编译为：
```css
.div1 {
  background-color: red;
}
```

# 3、mixin

使用`@mixin`定义一个混合，使用`@include`来使用混合。在使用`@mixin`的时候还可以**传递参数和设置默认参数**。

```scss
@mixin rectangle($w: 3px, $h: 4px) {
    width: $w;
    heigth: $h;
}

.div1 {
    @include rectangle;
}
.div2 {
    @include rectangle(10px, 20px);
}
```
编译为：
```css
div {
  width: 3px;
  heigth: 4px;
}

.div1 {
  width: 10px;
  heigth: 20px;
}
```

# 4、extend
使用`@extend`可以复用另一个类的样式，并且可以定义自己独特的样式。

```scss
.base-suqare {
    width: 12px;
    height: 12px;
}
.red-suqare {
    @extend .base-suqare;
    background: red;
}
```
编译为：
```css
.base-suqare, .red-suqare {
  width: 12px;
  height: 12px;
}

.red-suqare {
  background: red;
}
```

# 5、占位符

通过使用`@extend`可以发现，`.base-square`也被编译到了`css`中，如果我们不想要编译到`css`中，那么可以使用占位符`%`。
```scss
%base-suqare {
    width: 12px;
    height: 12px;
}
.red-suqare {
    @extend %base-suqare;
    background: red;
}
```
编译结果：
```css
.red-suqare {
  width: 12px;
  height: 12px;
}

.red-suqare {
  background: red;
}
```

# 6、数据类型

1. Number：使用$声明变量的时候可以声明number类型的，带单位的数值也是number类型


2. String
3. Color：除了16进制还可以使用`rgb`、`rgba`、`hsl`、`hsla`声明颜色


4. List：列表元素使用空格或者括号分割，可以使用`@each`来遍历列表
5. Maps：使用`(key: value, key: value)`的方式声明
6. Boolean
7. Null
8. Function：`@function`自定义函数


# less和scss比较

规则\语言 | less | scss
---|--- | --
嵌套 | 类似`HTML`的视觉层次结构，使用`&`可以取到父级元素 | 同`less`
文件导入 | `@import 'url';` | `@import 'url';`
变量 | 使用`@`声明，不必在使用前声明，具有作用域 | 使用$声明，需要在使用前声明，具有作用域
插值 | `@{}` | `#{}`
`mixin` | 普通的样式声明方式：`.mixin{}`，使用：`.mixin()` | 使用`@mixin`声明、`@include`使用
继承 | `.选择器()`，和混合的使用方式差不多 | 使用`@extend`基础样式规则
占位符 | `less`声明样式规则时如果传递了参数，则不会被编译到css，从某种意义上来说类似于`scss`的占位符 | 使用`%`声明样式规则
运算 | 加减乘除，可用于颜色的计算 | 加减乘除，不能用于颜色计算
自定义函数 | 无，但是可以使用`mixin`的方式 | `@function`

在比较后个人感觉还是`scss`更好用。

