
正则表达式可视化工具：https://jex.im/regulex/#!flags=&re=a%7B1%2C%202%7D

## 正则表达式以及字符串配合常用方法

### 正则表达式
1. `test`方法

语法：`reg.test(str)`，需要注意的是`test`会调用`String`将参数转为字符串。

2. `exec`方法
语法：`reg.exec(str)`，方法会返回匹配到的字符串的数组。

### 字符串
1. `match`方法

语法：`str.match(reg)`，和`exec`方法类似，方法会返回匹配到的字符串的数组。具体可以看第`8`节。

```js
// 全局
reg = /a{2,3}/g
"a aa aaa aaa".match(reg) // ["aa", "aaa", "aaa"]

// 非全局
reg = /(hell|helloworld)/
'helloworld'.match(reg) // ["hello", "hello", index: 0, input: "helloworld", groups: undefined]
```
2. `replace`方法

语法：`str.replace(reg, i)`，字符串的`replace`配合正则表达式可以高效的替换字符串中的指定的字符。

`replace`方法可以用在**引用分组**中，具体可以看第`8`节。


## 1、模糊匹配

### 1.1、横向模糊匹配

横向模糊匹配（针对长度）指的是匹配的**字符串的长度是不固定的**。其实现方式是使用量词，比如`{m, n}`表示匹配的字符串长度出现次数`count`满足：`m <= count <= n`。

```js
const reg = /a{3,5}b/
```
它可以匹配`aaab`、`aaaab`、`aaaaab`。

### 1.2、纵向模糊匹配

纵向模糊匹配（针对不同字符）指的是**匹配到某一位字符时可以不是某个特定的字符，而是多种可能的字符**。

```js
const reg = /a[123]c/
```
它可以匹配`a1c`、`a2c`、`a3c`。

## 2、字符组

字符组表示匹配字符串中的**一个字符**。比如`[abc]`，表示匹配`a`、`b`、`c`中的任意一个字符。

### 2.1、字符组范围

表示匹配`1`到`9`的任意一个字符：
```js
const reg = /[123456789]/
```
可以使用`-`来指定范围：
```js
const reg = /[1-9]/
```
但是如果你想匹配的是`1`、`-`、`9`中任意一个字符，可以使用转义字符`\`转义`-`：
```js
const reg = /[1\-9]/
```

### 2.2、排除字符组

我们想要排除某些特定的字符的时候可以使用`^`来表示：

```js
const reg = /[^abcd]/
```
表示排除`a`、`b`、`c`、`d`。

```js
const reg = /[^1-9]/
```
表示排除`1`到`9`之间的所有字符。

## 3、元字符


元字符 | 对应字符组 | 描述 | 
---|---|---|---
`\d` | `[0-9]` | 一位数字 | 
`\D` | `[^0-9]` | 一位非数字 | 
`\w` | `[0-9a-zA-Z_]` | 一位数字、字母、下划线
`\W` | `[^0-9a-zA-Z]` | 一位非数字、字母、下划线
`\s` | `[\t\v\n\r\f]` | 一位空白符：空格、换行、制表、回车、换页
`\S` | `[^\t\v\n\r\f]` | 一位非空白符

可以发现大写和小写是**相反**的，所以如果要匹配所有：`/[\d\D]/`、`/[\w\W]/`。

还有其他一些元字符：
```js
^ $ . * + ? | \ / ( ) [ ] { } = ! : - ,
```

## 4、量词

**量词的`,`左右间不能有空格**

量词 | 描述 | reg
---|---|---
`{m,}` | 至少出现`m`次 | `/[a]{m,}/`
`{m,n}` | 出现`m`到`n`次 | 
`?` | `{0,1}`的简写形式
`+` | `{1,}`的简写形式
`*` | `{0,}`的简写形式

## 5、贪婪、非贪婪

正则表达式**默认是贪婪匹配**，如果能匹配多个就匹配多个，比如`/a{1,3}/`在匹配时会尽可能的匹配`3`个。

```js
const reg = /a{2,3}/g

"a aa aaa aaa".match(reg) // ["aa", "aaa", "aaa"]
```

贪婪模式会尽可能的匹配少的个数，如果要使用非贪婪模式匹配，则需要在量词后面加上`?`。

```js
const reg = /a{2,3}?/g

"a aa aaa aaa".match(reg) // ["aa", "aa", "aa"]
```

## 6、多选分支

多选分支的语法：

```js
const reg = /(p1|p2|p3)/
```
`()`里面的`p1 p2 p3`表示子模式，匹配时只需匹配其中任何一个子模式即可。


```js
const reg = /(hello|helloworld)/
const str = 'helloworld'
str.match(reg) // ["hello", "hello", index: 0, input: "helloworld", groups: undefined]

const str1 = 'hello'
str1.match(reg) //["hello", "hello", index: 0, input: "hello", groups: undefined]
```
可以发现通过`hello`以及`helloworld`匹配`/(hello|helloworld)/`到的都是`hello`，所以分支匹配时惰性的。

我将`/(hello|helloworld)/`改为`/(helloworld|hello)/`：

```js
const reg = /(helloworld|hello)/
const str = 'helloworld'
str.match(reg) // ["helloworld", "helloworld", index: 0, input: "helloworld", groups: undefined]

const str1 = 'hello'
str1.match(reg) //["hello", "hello", index: 0, input: "hello", groups: undefined]
```

## 7、匹配位置

位置描述符：`^`、`$`、`\b`、`\B`、`(?=p)`、`?!p`，在位置匹配下需要注意的是要**将空字符串所在的位置看做有效的位置**。即：

```js
"hello" = "" + "h" + "" + "e" + "" + "l" + "" + "l" + "o" + ""
```

### 1、`^  $`

`^`表示匹配开始位置，`$``表示匹配结束位置。

将开始和结尾替换为`#`
```js
const result = "hello".replace(/^|$/g, '#')
console.log(result)
// => "#hello#"
```

将以`h`开始的和`o`结尾的替换为`#`
```js
const result = "hello".replace(/^h|o$/g, '#')
console.log(result)
// => "#ell#"
```

### 2、`\b \B`

`\b`表示单词边界，也就是`\w`和`\W`之间的位置、`\w`与开始`^`之间的位置、`\w`与结束`$``之间的位置。

```js
const  res = "[hello] world".replace(/\b/g, '#')
console.log(res)
// [#hello#] #world#
```

`\B`表示非单词边界，排除单词边界，剩下的都是非单词边界。
```js
const  res = "[hello] world".replace(/\B/g, '#')
console.log(res)
// #[h#e#l#l#o]# w#o#r#l#d
```

### 3、`?=p`、`?!p`

`?=p`和`?!p`中的`p`都表示子模式。

匹配`a`前面的字符：
```js
const reg = /?=a/
const res = 'hahaha'.replace(/(?=a)/g, '#')
console.log(res)
// h#ah#ah#a
```

匹配非`a`前面的字符
```js
const reg = /?!a/
const res = 'hahaha'.replace(/(?!a)/g, '#')
console.log(res)
// #ha#ha#ha#
```

## 8、引用分组

使用`()`我可以实现引用分组，比如时间匹配的正则表达式：
```js
const reg = /(\d{4})-(\d{2})-(\d{2})/;
```
其中将`reg`有三个括号，所以分为了三个组。

使用`match`方法
```js
const regex = /(\d{4})-(\d{2})-(\d{2})/;
const string = "2017-06-12";
string.match(regex) // => ["2017-06-12", "2017", "06", "12", index: 0, input: "2017-06-12"]
```
其中返回的数组的第一个值表示整体匹配到的内容，后面三个表示三个分组匹配的内容。

在使用引用分组时可以使用`$1 $2 $3...`获得每一个分组。

例如：
```js
const reg = /(\d{4})-(\d{2})-(\d{2})/;
"2017-06-12".replace(regex, "$2/$3/$1"); // "06/12/2017"
```

在`replace`中第二个参数还可以传入一个回调函数，回调函数的参数依次是正则表达式的每一个分组。
```js
var reg = /(\d{4})-(\d{2})-(\d{2})/;
var string = "2017-06-12";
var result = string.replace(regex, function(match, year, month, day) {
	return month + "/" + day + "/" + year;
})
console.log(result)  //"06/12/2017"
```

## 9、反向引用

使用反向引用可以获**取到某一个分组**匹配到的内容。
```js
var regex = /\d{4}(-|\/|\.)\d{2}\1\d{2}/;
var string1 = "2017-06-12";
var string2 = "2017/06/12";
var string3 = "2017.06.12";
var string4 = "2016-06/12";
console.log( regex.test(string1) ); // true
console.log( regex.test(string2) ); // true
console.log( regex.test(string3) ); // true
console.log( regex.test(string4) ); // false
```
其中`\1`表示第一个分组匹配到的内容，也就是`(-|\/|\.)`。同理`\2`、`\3`表示第二个第三个分组匹配到的内容。

## 10、正则表达式常见概念
1. **字面量**，匹配一个具体字符，包括不用转义的和需要转义的。比如a匹配字符"a"，又比如\n匹配换行符，又比如\.匹配小数点。
2. **字符组**，匹配一个字符，可以是多种可能之一，比如[0-9]，表示匹配一个数字。也有\d的简写形式。另外还有反义字符组，表示可以是除了特定字符之外任何一个字符，比如[^0-9]，表示一个非数字字符，也有\D的简写形式。
3. **量词**，表示一个字符连续出现，比如a{1,3}表示“a”字符连续出现3次。另外还有常见的简写形式，比如a+表示“a”字符连续出现至少一次。
4. **锚点**，匹配一个位置，而不是字符。比如^匹配字符串的开头，又比如\b匹配单词边界，又比如(?=\d)表示数字前面的位置。
5. **分组**，用括号表示一个整体，比如(ab)+，表示"ab"两个字符连续出现多次，也可以使用非捕获分组(?:ab)+。
6. **分支**，多个子表达式多选一，比如abc|bcd，表达式匹配"abc"或者"bcd"字符子串。
7. **反向引用**，比如\2，表示引用第2个分组。

参考：https://juejin.cn/post/6844903487155732494
