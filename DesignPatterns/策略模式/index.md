# 设计模式 - 策略模式

## 1、什么是策略模式

策略模式指：定义一系列方法（这些方法具有相对的稳定性），把他们封装起来作为一个策略类，当我们需要某个方法时直接从策略类中获取。

一个策略模式一般由两部分组成：
1. 策略类：封装了方法，负责具体计算过程
2. 环境类：接收请求，判断当前环境然后交给策略类中的具体方法实现

使用策略模式可以将方法的实现以及方法的使用分离开来。

## 2、策略模式常见运用场景

### 1、消除if-else
```js
let calculate = function(level, salary) {
  if(level === 'S') {
    return salary*4
  }
  if(level === 'A') {
    return salary*3
  }
  if(level === 'B') {
    return salary*2
  }
}
```
这个函数根据员工的等级与及工资计算出员工的最终工资。但是这个函数的设计实现并不好：
- 过多的if-else语句
- 缺乏弹性，如果要加入C就要深入函数内部
- 复用性较差

**改进**
```js
// 策略类
let strategies = {
  "S": function(salary) {
    return salary*4
  },
  "A": function(salary) {
    return salary*3
  },
  "B": function(salary) {
    return salary*2
  }
}
// 环境类
let cal = function (level,salary) {
  return strategies[level](salary)
}
```
将方法和使用方法的函数分离开来。

### 2、定义表单验证函数
```js
// 第一步： 封装策略类
const strategies = {
  isNonEmpty: (value, errorMsg) => {
    if (value === "") {
      return errorMsg;
    }
  },
  minLength: (value, errorMsg) => {
    if (value.length < 6) {
      return errorMsg;
    }
  },
  isMobile: (value, errorMsg) => {
    if (!/(^1[3|5|8][0-9]{9}$)/.test(value)) {
      return errorMsg;
    }
  }
};

// 第二步：封装Validator类充当Context来接收用户请求并委托给strategy对象
class Validator {
  constructor() {
    this.cache = [];
  }
  add(dom, strategy, errorMsg) {
    this.cache.push(() => {
      const args = [dom.value, errorMsg];
      return strategies[strategy].apply(dom, args);
    });
  }
  start() {
    this.cache.forEach(fn => {
      const msg = fn();
      if (msg) {
        return msg;
      }
    });
  }
}

// 使用
const registerForm = document.getElementById("registerForm");
function validataFunc() {
  const validator = new Validator();
  validator.add(registerForm.userName, "isNonEmpty", "用户名不能为空");
  validator.add(registerForm.password, "minLength", "密码长度不能少于6位");
  validator.add(registerForm.phone, "isMobile", "手机号码格式不正确");
  const error = validator.start();
  return error;
}
registerForm.onsubmit = () => {
  const errorMsg = validataFunc();
  if (errorMsg) {
    alert(errorMsg);
    return false;
  }
};

```

## 3、策略模式常见问题
### 1、优点
1. 可以将算法的实现和使用算法的代码隔离开来。
2. 符合开闭原则，无需对上下文进行修改就能够引入新的策略。
3. 可以在运行时切换对象内的算法。

### 2、缺点
1. 使用者必须知晓策略间的不同选择合适的策略。
2. 过分使用策略模式会让代码变得复杂

## 4、总结
在JavaScript语言的策略模式中，策略类往往被函数所代替，这时策略模式就成了一种“隐形”的模式。使用策略模式解耦了代码，但在策略很少时不要过度使用策略模式，避免造成代码的复杂性。
