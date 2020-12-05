# 0、嵌套

和`scss`的嵌套规则类似，可以通过`&`取得父级。

# 1、变量

在`less`中使用`@`符号来声明变量和使用变量，比如：

```less
@width: 12px
@height: 10px

.box {
    width: @width;
    height: @height;
}
```

**在声明字符串变量时注意不要引号，如果携带引号也会被视为变量的一部分。**

`less`**允许在声明之前使用变量**。并且变量具有作用域，作用域查找路径是从当前作用域向全局查找，比如：
```less
.body {
    @w: 12px;
    width: 12px;
}
@w: 120px;
```
编译结果：
```css
.body {
  width: 12px;
}
```
**如果多次声明同一个变量，最后声明的变量值会覆盖之前的值**。
## 1.1、变量插槽

可以理解为字符串的拼接，常用在选择器名称、属性名、`URL`等地方。

语法：
```less
@{variable}
```
实例：
```less
@url: './../';

@import "@{url}a.css";


@box: my-box

.@{box} {
    width: 10px;
    height: 10px
}


@color: color;

.box {
  @{color}: red;
  background-@{color}: red;
}
```
最后编译为：
```css
@import "../a.css";
.box {
  width: 12px;
  height: 12px;
}
.box {
  color: red;
  background-color: red;
}
```

# 2、mixins

`mixins`是将一个选择器下的规则集应用到另一个选择器下：

```less
.base {
  border: 1px solid red;
}

.box {
  width: 12px;
  .base()
}
```
编译为：
```css
.base {
  border: 1px solid red;
}
.box {
  width: 12px;
  border: 1px solid red;
}
```
在使用`mixin`时括号是可选的，但是推荐使用加上括号。

## 2.1、namespace

在使用混合时可以使用多个选择器嵌套选择，类似于自带选择器：

```less
.wrapper {
  .inner {
    color: red
  }
}

.test {
  .wrapper > .inner();
}
```
编译为：
```css
.wrapper .inner {
  color: red;
}
.test {
  color: red;
}
```
## 2.2、传递参数

在使用混合的时候可以传递参数：
```less
.square(@w) {
  width: @w;
  height: @w;
}
.square12 {
  .square(12px)
}
```
编译为：
```css
.square12 {
  width: 12px;
  height: 12px;
}
```

也可以使用**默认参数**：
```less
.square(@w: 10px) {
  width: @w;
  height: @w;
}
.supare10 {
  .square()
}
.square12 {
  .square(12px)
}
```
编译为：
```css
.supare10 {
  width: 10px;
  height: 10px;
}
.square12 {
  width: 12px;
  height: 12px;
}
```

## 2.2、@arguments、@rest

`@arguments`表示传入当前`mixins`的全部参数。

```less
.box-shadow(@x: 0; @y: 0; @blur: 1px; @color: #000) {
  box-shadow: @arguments;
}
.big-block {
  .box-shadow(2px; 5px);
}
```
编译为：
```csss
.big-block {
  box-shadow: 2px 5px 1px #000;
}
```

使用`@rest`可以传递数量可变的参数。

## 2.3、取得混合的某一个属性

在使用`mixins`时可以使用类似`JavaScript`取对象属性的方法取`mixins`中的某个属性值。
```less
.average(@x, @y) {
  res: ((@x + @y) / 2)
}

div {
  padding: .average(10px, 10px)[res];
}
```
编译为：
```css
div {
  padding: 10px;
}
```

## 2.4、递归

在当前`mixins`中可以调用自身。

```less
.generate-columns(4);

.generate-columns(@n, @i: 1) when (@i =< @n) {
  .column-@{i} {
    width: (@i * 100% / @n);
  }
  .generate-columns(@n, (@i + 1));
}
```
编译为：
```css
.column-1 {
  width: 25%;
}
.column-2 {
  width: 50%;
}
.column-3 {
  width: 75%;
}
.column-4 {
  width: 100%;
}
```

# 3、运算符

在`Less`中可以进行`+`、`-`、`*`、`/`运算，并且可以对数字、变量、颜色等进行运算。如果计算过程中带有单位会**连同单位一起运算**。如果被计算的值单位不同则以**最左侧的单位为准**。

如果在`less`中使用了`calc`则`less`不会计算，而是交给`css`计算。

# 4、函数

## 4.1、if

在`less`中可以使用`if`函数来返回给定的两个值得其中一个，并且可以配合`not`、`or`、`and`一起使用。

```less
div {
  width: if((true), 10px, 20px);
  width: if(not 1, 30px, 40px);
  width: if((false) and (true), 50px, 60px);
  width: if((false) or (true), 70px, 80px);
}
```
编译为：
```css
div {
  width: 10px;
  width: 40px;
  width: 60px;
  width: 70px;
}
```

在`less`中还可以使用`boolean`函数来声明一个布尔类型的值。

## 4.2、string function

### 1、% format

使用`%`可以声明占位符：
```less
div {
  str: %('this is %d', 123);
}
```
编译为：
```css
div {
  str: 'this is 123';
}
```

### 2、replace

类似于`JavaScript`的字符串`replace`方法。

接收参数：
- `string`：用于替换的字符串
- `pattern`：被替换的内容，字符串或者正则表达式
- `replacement`：替换内容
- `flags`：如果是正则表达式则可以传递修饰符

```less
replace("Hello, Mars?", "Mars\?", "Earth!");
replace("One + one = 4", "one", "2", "gi");
replace('This is a string.', "(string)\.$", "new $1.");
replace(~"bar-1", '1', '2');
```
编译为：
```css
"Hello, Earth!";
"2 + 2 = 4";
'This is a new string.';
bar-2;
```

## 4.3、list function

`less`中的`list`类似于`JavaScript`中的数组。列表中不同的项用`,`分隔：
```less
@list1: 'a', 'b', 'c';
```

1. `length`：使用`length`函数可以获取列表的长度。
```less
@list1: 'a', 'b', 'c';
length(@list1) // 3
```
2. `extract`：从列表提取某个索引的值，需要注意的是索引是从`1`开始计算。
```less
@list1: 'a', 'b', 'c';
extract(@list1, 2) // b
```
3. `range`：生成列表

参数：
- `start`：开始值
- `end`：结束值
- `step`：增量

如果只传入一个参数`n`，则`start=1`，`end=n`，`step=1`。如果传入两个参数`m`、`n`，则`start=m`，`end=n`，`step=1`。
```less
range(3) // 1, 2, 3
range(1, 3) // 1, 2, 3
range(1, 4, 2) // 1, 3
```
4. `each`：循环遍历`list`

参数：
- `list`：用于遍历的列表
- `rules`：一系列的样式规则或者`mixins`

在`rules`中我们可以取得遍历过程中的`@key`、`@value`、`@index`遍历。这些遍历默认被绑定到了每个`rule`中。

```less
@list1: 'a', 'b', 'c';
each(@list1, {
  .div1 {
    key: @key;
    value: @value;
    index: @index
  }
})
```
编译为：
```css
.div1 {
  key: 1;
  value: 'a';
  index: 1;
}
.div1 {
  key: 2;
  value: 'b';
  index: 2;
}
.div1 {
  key: 3;
  value: 'c';
  index: 3;
}
```

### 4.4、Math function

和`JavaScript`的`Math`函数类似，有`ceil`、`floor`、`round`等方法。https://less.bootcss.com/functions/#math-functions

### 4.5、type function

用于判断遍历的数据类型：
`isnumber、isstring、iscolor`等。https://less.bootcss.com/functions/#type-functions

### 4.5、color function

对颜色的一些操作。https://less.bootcss.com/functions/#color-definition-functions


**`less`中没有自定义函数，而`sass`可以使用`@function`来自定义函数。**虽然`less`没有自定义函数但是`less`的`mixins`功能十分强大，通过调用`mixins`还可以取得`mixins`中的变量：

```less
.average(@x, @y) {
  @average: ((@x + @y) / 2);
}
div {
  .average(16px, 50px); // "call" the mixin
  padding: @average;    // use its "return" value
  margin: @average;
}
```
编译为：
```css
div {
  padding: 33px;
  margin: 33px;
}
```
