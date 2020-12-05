## 1、Async iteration

- `iterable`：一个具有`[Symbol.iterator]`属性方法的对象，并可以通过该方法遍历。
- `iterator`：调用`iterable`对象的`[Symbol.iterator]`方法返回的对象，调用其`next`方法可以遍历其每一个元素。

`JavaScript`中常见的`iterable`有`array、string、map、set`等。`for of`循环只能遍历可迭代对象。

> 以数组为例：

```js
const iterable = [1, 2]
const iterator = iterable[Symbol.iterator]()
iterator.next() // { value: '1', done: false }
iterator.next() // { value: '2', done: false }
iterator.next() // { value: undefined, done: false }
```

但是上面的`iterable`都是**同步**的，如果在迭代一些异步的东西就不能正常工作了。

### 1.1、异步iteration
通过`createAsyncIterable`可以创建一个异步的`iterable`。然后调用`[Symbol.asyncIterable]`生成一个异步的迭代器。

```js
const asyncIterable = createAsyncIterable([1, 2]);
const asyncIterator = asyncIterable[Symbol.asyncIterator]();
asyncIterator.next()
.then(iterResult1 => {
    console.log(iterResult1); // { value: 1, done: false }
    return asyncIterator.next();
})
.then(iterResult2 => {
    console.log(iterResult2); // { value: 2, done: false }
    return asyncIterator.next();
})
.then(iterResult3 => {
    console.log(iterResult3); // { value: undefined, done: true }
});
```

当然也可以配合`async/await`、`for of`以及`for-await-of`一起使用。

# 2、tag function

在函数调用后面可以添加一个模板字符串（`styled-component`貌似就是使用的这个方法）。

比如：
```js
function a(){}
a`123` // return undefined
```
因为什么的`a`函数没有任何返回值，所以返回了`undefined`，我们可以声明接收的参数和返回值：

```js
function tagFunc(templateStr) {
    return {
        Cooked: tmplObj,
        Raw: tmplObj.raw,
    };
}
tagFunc`\u{4B}` // { Cooked: [ 'K' ], Raw: [ '\\u{4B}' ] }
```

个人觉得这样能够传模板字符串对于需要传入长的参数还是很有用的，写法比较的清晰简洁。

# 3、数组扁平化：flat(depth)

参数`depth`：表示扁平化的层级，默认为`1`。

```js
const arr = [1, 2, [3, [4]]]
arr.flat() // [1, 2, 3, [4]]
arr.flat(1) // [1, 2, 3, [4]]
arr.flat(2) // [1, 2, 3, 4]
```

# 4、**指数操作符

`**`操作符表示指数运算，类似于`Math.pow`。

```js
Math.pow(2, 10) === 2**10
Math.pow(2, 2) === 2**2
```
# 5、string padding

`String.padStart(targetLength, padString)`和`String.padEnd(targetLength, padString)`方法分别将字符串添加到原始字符串的开始和结束位置。


- `targetLength`：填充后的字符串目标长度，**如果`targetLength`小于当前的长度就会直接返回当前字符串**
- `padString`：用于填充的字符串，如果`padString`的长度加上当前字符串的长度**大于**`targetLength`就只会**截取`padString`的前面部分**。

# 6、`Object.fromEntires(arr)`

`Object.fromEntries`和`Object.entried`的作用是相反的。`Object.entries`可以将对象转为一个包含`[key, value]`对的可迭代对象。

而`Object.fromEntries`将由`[key, value]`组成的数组，转为对象。

```js
const arr = [['a', 1], ['b', 2]]
Object.fromEntries(arr) // {a: 1, b: 2}
```

如果数组的某一项不止由`[key, value]`组成，`[key, value, value1, ...]`，在调用`Object.fromEtries`方法时只会截取**前面两项**。

```js
const arr = [['a', 1, 11], ['b', 2, 22]]
Object.fromEntries(arr) // {a: 1, b: 2}
```

# 7、命名正则表达式捕获分组

语法：

```js
(?<name>regexp)
```
比如，命名年捕获分组：
```js
(?<year>[0-9]{4})
```

使用：
```js
const reg = /(?<year>[0-9]{4})-(?<month>[0-9]{2})-(?<dat>[0-9]{2})/

const execRes = reg.exec('1991-12-12')

// 通过命名来获取匹配到的分组
const year = execRes.groups.year
const month = execRes.groups.month
const day = execRes.groups.day
```

# 8、string trimStart&trimEnd

在之前`js`已经支持了`trim`方法，`trim`可以去除字符串**首尾**的空格。

- `trimStar`：去除字符串左边的空格
- `trimEnd`：去除字符串右边的空格

# 9、可选的错误绑定

在使用`try catch`的时候如果我们不需要捕获到错误信息，我们可以忽略`catch`的参数，比如

```js
try {
    // do...
} catch {
    // do...
}
```

对于需要捕获到的错误信息的，需要传递额外的参数：

```js
try {
    // do...
} catch (error) {
    console.log(error)
    // do...
}
```

# 10、`async/await`

异步的解决方案，`async`和`await`必须成对使用。

使用`async`可以声明一个异步的函数，自动将函数转换为`promise`，其返回值也是一个`Promise`，只有`async`函数内部的异步操作都执行完成后，才会执行`async`的`then`方法。

```js
const fn = async function(){}
```

`await`必须在`async`函数内部使用，后面是一个`Promise`对象，如果不是专为`promise`。只有当`await`后面的异步函数执行完成后才会执行`await`下面的代码。**啊你如果`async`中有多个`await`，其中一个的`await`结果为`reject`那么后面的`await`都不会执行**。

并且：**使用`await`在`async`函数内不能捕获错误，所以建议将代码放在`try-catch`内部。**

```js
async function foo() {
    const a = await 111
    return a
}
```

11、`Promise.allSettled`

`Promise.allSettled`方法，在**所有`Promise`对象都`fulfilled` 或 `rejected`后才返回一个数组**，数组每个值对应`Promise`的状态。

- `race`：返回最先状态最先完成的，不管成功还是失败
- `all`：都成功的时候返回一个数组，有一个失败则返回失败的结果
 
12、`Nullish coalescing Operator`

运算符：`??`。**当左侧的值为`null`或者`undefined`才返回右侧的值，否则返左侧的值**。和`||`运算符有所不同。

```js
const a = 0 ?? 1 // 0
const b = 0 || 1 // 1
```

13、`Optional Chaining`

可链选操作符：`?.`。链选操作符类似于`&&`和`.`的组合形式，在取对象属性时需要判断对象是否为`null`或者`undefined`。

避免了很多错误：
```js
Uncaught TypeError: Cannot read property 'c' of undefined
```

不使用链选运算符：
```js
const res = obj.a && obj.a.res
```

使用链选运算符：
```js
const res = obj.a?.res
```
