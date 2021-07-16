## 简介

ES6 的class可以看作只是一个语法糖，新的class写法只是让对象原型的写法更加清晰、更像面向对象编程的语法而已。

```javascript
class Point {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  toString() {
    return '(' + this.x + ', ' + this.y + ')';
  }
}

class Point {
  // ...
}

typeof Point // "function"
Point === Point.prototype.constructor // true
```

- 类的数据类型就是函数，类本身就指向构造函数。
- 使用的时候，也是直接对类使用new命令，跟构造函数的用法完全一致。
- **类的所有方法都定义在类的prototype属性上面**。
- 在类的实例上面调用方法，其实就是调用原型上的方法。

```javascript
class B {}
const b = new B();

b.constructor === B.prototype.constructor // true
```

- prototype对象的constructor()属性，直接指向“类”的本身

```javascript
Point.prototype.constructor === Point // true
```

- 类的内部所有定义的方法，都是不可枚举的（non-enumerable）

## constructor 方法

- constructor()方法是类的默认方法，通过new命令生成对象实例时，自动调用该方法。一个类必须有constructor()方法，如果没有显式定义，一个空的constructor()方法会被默认添加。
- constructor()方法默认返回实例对象（即this），完全可以指定返回另外一个对象。
- **类必须使用new调用**，否则会报错。这是它跟普通构造函数的一个主要区别，后者不用new也可以执行。

## 类的实例

- **类必须使用new调用**，否则会报错
- 实例的属性除非显式定义在其本身（即定义在this对象上），否则都是定义在原型上（即定义在class上）
- 类的所有实例共享一个原型对象
- 可以通过实例的__proto__属性为“类”添加方法。


```javascript
//定义类
class Point {

  constructor(x, y) {
    this.x = x;
    this.y = y;
    // 类自身的属性
  }

// 原型上的属性
  toString() {
    return '(' + this.x + ', ' + this.y + ')';
  }

}

var point = new Point(2, 3);

point.toString() // (2, 3)

point.hasOwnProperty('x') // true
point.hasOwnProperty('y') // true
point.hasOwnProperty('toString') // false
point.__proto__.hasOwnProperty('toString') // true
```

## 取值函数（getter）和存值函数（setter）

在“类”的内部可以使用get和set关键字，对某个属性设置存值函数和取值函数，拦截该属性的存取行为

```javascript
class MyClass {
  constructor() {
    // ...
  }
  get prop() {
    return 'getter';
  }
  set prop(value) {
    console.log('setter: '+value);
  }
}

let inst = new MyClass();

inst.prop = 123;
// setter: 123

inst.prop
// 'getter'
```

## 属性表达式

```javascript
let methodName = 'getArea';

class Square {
  constructor(length) {
    // ...
  }

  [methodName]() {
    // ...
  }
}
```

## Class 表达式

类也可以使用表达式的形式定义

```javascript
const MyClass = class Me {
  getClassName() {
    return Me.name;
  }
};
```

上面代码使用表达式定义了一个类。需要注意的是，这个类的名字是Me，但是Me只在 Class 的内部可用，指代当前类。在 Class 外部，这个类只能用MyClass引用。

采用 Class 表达式，可以写出立即执行的 Class。

- 类和模块的内部，默认就是严格模式
- 类不存在变量提升（hoist）
- name 属性
- 如果某个方法之前加上星号（*），就表示该方法是一个 Generator 函数。
- 类的方法内部如果含有this，它默认指向类的实例。但是，必须非常小心，一旦单独使用该方法，很可能报错。

## 静态方法

如果在一个方法前，加上static关键字，就表示该方法不会被实例继承，而是直接通过类来调用，这就称为“静态方法”。
```javascript
class Foo {
  static classMethod() {
    return 'hello';
  }
}

Foo.classMethod() // 'hello'

var foo = new Foo();
foo.classMethod()
// TypeError: foo.classMethod is not a function
```

> 如果静态方法包含this关键字，这个this指的是类，而不是实例

## new.target 属性

ES6 为new命令引入了一个new.target属性，该属性一般用在构造函数之中，返回new命令作用于的那个构造函数。如果构造函数不是通过new命令或Reflect.construct()调用的，new.target会返回undefined，因此这个属性可以用来确定构造函数是怎么调用的。

## class的继承

Class 可以通过extends关键字实现继承

```javascript
class Point {
}

class ColorPoint extends Point {
}

class ColorPoint extends Point {
  constructor(x, y, color) {
    super(x, y); // 调用父类的constructor(x, y)
    this.color = color;
  }

  toString() {
    return this.color + ' ' + super.toString(); // 调用父类的toString()
  }
}
```

- 子类必须在constructor方法中调用super方法，否则新建实例时会报错。这是因为子类自己的this对象，必须先通过父类的构造函数完成塑造，得到与父类同样的实例属性和方法，然后再对其进行加工，加上子类自己的实例属性和方法。如果不调用super方法，子类就得不到this对象。
- 在子类的构造函数中，只有调用super之后，才可以使用this关键字，否则会报错。
- 父类的静态方法，也会被子类继承

## Object.getPrototypeOf()

Object.getPrototypeOf方法可以用来从子类上获取父类

```javascript
Object.getPrototypeOf(ColorPoint) === Point
// true
```

## super 关键字

- super作为函数调用时，代表父类的构造函数。ES6 要求，子类的构造函数必须执行一次super函数。