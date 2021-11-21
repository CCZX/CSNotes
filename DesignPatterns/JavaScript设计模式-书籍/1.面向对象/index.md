JavaScript并没有提供对象类式的继承，而是通过原型委托来实现的。

## 动态语言和静态语言

1. 静态语言在编译时就已经确定变量类型，动态语言在运行时才会确定，所以动态语言在运行时可能会有一些类型错误发生。
2. 静态语言在编译时就确定数据类型还能提高程序的执行速度
3. 静态语言强迫程序员按照一定契约来编写程序，这样的方式可以辅助写出可靠性高的代码；而动态语言不需要程序这些约定，可以把更多精力放在业务代码之上

鸭子类型：如果一个变量拥有某种实现，我们就可以认为它是某种类型，也就是说**鸭子类型只关心对象的行为而不关注对象自身**。而静态语言实现这些操作往往需要通过向上转型。

## 多态

多态实际含义是：同一操作作用于不同的对象上，可以产生不同的解释和行为。多态背后的思想是将“做什么”和“谁去做以及怎么做”分开来，也就是**将不变的事务与可变的事务分离开来**。通过这样的方式来消除对象之间的耦合关系。通过多态也可以消除条件分支语句，比如下面例子：

```js
const makeSound = (animal) => {
  animal.sound()
}

const Duck = function (){}
Duck.prototype.sound = () => console.log('Dark')

const Dog = function (){}
Dog.prototype.sound = () => console.log('Dog')

makeSound(Duck)
makeSound(Dog)
```

```java
public class Animal {
  abstract void sound()
}

public class Duck extends Animal {
  public void sound() {
    System.out.println('Duck')
  }
}

public class Dog extends Animal {
  public void sound() {
    System.out.println('Dog')
  }
}

public class AnimalSound {
  public void maleSound(Animal animal) {
    animal.sound()
  }
}
```

由于JavaScript的变量类型在运行时是可变的，一个JavaScript对象既可以表示Dog 又可以 表示 Duck ，这意味着JavaScript的多态是与生俱来的。
