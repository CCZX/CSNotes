# 【设计模式】- 工厂模式

## 1、什么是工厂模式

使用工厂🏭模式可以代替使用`new`关键字来常见对象，工厂模式**定义好创建对象的接口，让子类来决定实例化哪个类**，工厂🏭模式将类的实例化延迟到了子类。

## 2、实现工厂模式

### 2.1、静态工厂模式
由**一个工厂对象**决定创建某一种产品对象类的实例。主要用来创建同一类对象。

比如根据用户类型实例化不同的权限。
```js
const UserFactory = function (role) {
  function SuperAdmin() {
    this.name = "超级管理员",
    this.viewPage = ['首页', '通讯录', '发现页', '应用数据', '权限管理']
  }
  function Admin() {
    this.name = "管理员",
    this.viewPage = ['首页', '通讯录', '发现页', '应用数据']
  }
  function NormalUser() {
    this.name = '普通用户',
    this.viewPage = ['首页', '通讯录', '发现页']
  }

  switch (role) {
    case 'superAdmin':
      return new SuperAdmin();
      break;
    case 'admin':
      return new Admin();
      break;
    case 'user':
      return new NormalUser();
      break;
    default:
      throw new Error('参数错误, 可选参数:superAdmin、admin、user');
  }
}

//调用
let superAdmin = UserFactory('superAdmin');
let admin = UserFactory('admin') 
let normalUser = UserFactory('user')
```
简单工厂的优点在于，你只需要一个正确的参数，就可以获取到你所需要的对象，而**无需知道其创建的具体细节**。但是在函数内包含了所有对象的创建逻辑（构造函数）和判断逻辑的代码，每增加新的构造函数还需要修改判断逻辑代码。**当对象更多时，这个函数会成为一个庞大的超级函数，便得难以维护。所以，简单工厂只能作用于创建的对象数量较少，对象的创建逻辑不复杂时使用**。

### 2.2、工厂方式模式

在工厂方法模式中，工厂父类负责定义好创建对象的接口，子类负责实例化对象，这样就把对象的实例好延迟到子类中进行了，即通过子类来决定需要实例化的对象。

定义抽象类：
```ts
// 1. 定义抽象类
abstract class User {
  abstract name: string;
  abstract viewPage: string[];
}

// 分别创建SuperAdmin、Admin、NormalUser类
class SuperAdmin extends User {
  name: 'SuperAdmin'
  viewPage: ['首页', '通讯录', '发现页', '应用数据', '权限管理']
}

class Admin extends User {
  name: 'Admin'
  viewPage: ['首页', '通讯录', '发现页', '应用数据']
}

class NormalUser extends User {
  name: 'NormalUser'
  viewPage: ['首页', '通讯录', '发现页']
}

// 3.定义工厂接口
interface UserFactory {
  createUser(): User
}

// 4.分别创建接口
class SuperAdminFactory implements UserFactory {
  createUser() {
    return new SuperAdmin()
  }
}

class AdminFactory implements UserFactory {
  createUser() {
    return new Admin()
  }
}

class NormalUserFactory implements UserFactory {
  createUser() {
    return new NormalUser()
  }
}

```

工厂方法模式在系统中加入新的类事，无须修改抽象工厂和抽象产品提供的接口，只要添加一个具体工厂和具体子类就可以了。这样，系统的可扩展性也就变得非常好，更加符合 “开闭原则”。而简单工厂模式需要修改工厂类的判断逻辑。

## 3、常见应用场景

### 3.1、框架中的工厂模式
`jQuery`中的`$()`其实就是一个工厂函数，它根据传入参数的不同创建元素或者去寻找上下文中的元素，创建成相应的`jQuery`对象。https://github.com/jquery/jquery/blob/master/src/core/init.js

### 3.2、创建对象时不关心具体的细节，只需要对应的创建对象的子类

## 4、总结
在实际的业务中，需要根据实际的业务复杂度来选择合适的模式。一般灵活使用简单工厂其实就能解决大部分问题。
