## 介绍

- 保证每个属性的名字独一无二的，这样就从根本上防止属性名的冲突。这就是 ES6 引入Symbol的原因。  
- ES6 引入了一种新的原始数据类型Symbol，表示独一无二的值
- Symbol 值通过Symbol函数生成
- 对象的属性值可以有两种类型，一个是字符串，一个就是symbol（独一无二的，属性名不会发生冲突）

```javascript
let s = Symbol();

typeof s
// "symbol"
```

- symbol函数前不能使用new声明，否则会报错
- Symbol函数可以接受一个字符串作为参数，表示对Symbol实例的描述，主要是为了在控制台显示，或者转换为字符串时容易现实
- Symbol的参数如果不是字符串，则会调用toString()方法转化为字符串，然后才生成symbol值
- Symbol的参数只是表示对symbol对象的描述，所以具有相同参数的symbol生成值并不相等
- Symbol函数不能与其他类型的值进行运算，会报错
- Symbol 值可以显式转为字符串
- Symbol 值也可以转为布尔值，但是不能转为数值

```javascript
let s1 = Symbol('foo');
let s2 = Symbol('bar');

s1 // Symbol(foo)
s2 // Symbol(bar)

s1.toString() // "Symbol(foo)"
s2.toString() // "Symbol(bar)"
```

## Symbol.prototype.description

```javascript
const sym = Symbol('foo');

sym.description // "foo"
```

## 作为属性名的Symbol

```javascript
let mySymbol = Symbol();

// 第一种写法
let a = {};
a[mySymbol] = 'Hello!';

// 第二种写法
let a = {
  [mySymbol]: 'Hello!'
};

// 第三种写法
let a = {};
Object.defineProperty(a, mySymbol, { value: 'Hello!' });

// 以上写法都得到同样结果
a[mySymbol] // "Hello!"
```

- Symbol作为属性名，不可以使用点运算符（.）
- 对象内部使用symbol作为属性名时，symbol的值必须放在方括号内部

Symbol 作为属性名，遍历对象的时候，该属性不会出现在for...in、for...of循环中，也不会被Object.keys()、Object.getOwnPropertyNames()、JSON.stringify()返回。

Object.getOwnPropertySymbols()
- 可以获取指定对象的所有 Symbol 属性名。
- 该方法返回一个数组，成员是当前对象的所有用作属性名的 Symbol 值。

Reflect.ownKeys()方法可以返回所有类型的键名，包括常规键名和 Symbol 键名。

## Symbol.for()，Symbol.keyFor()

Symbol.for()
- 接受一个字符串作为参数，然后搜索有没有以该参数作为名称的symbol
- 如果有，就返回这个 Symbol 值，否则就新建一个以该字符串为名称的 Symbol 值，**并将其注册到全局**。
- Symbol.for()与Symbol()这两种写法，都会生成新的 Symbol。它们的区别是，**前者会被登记在全局环境中供搜索，后者不会**


Symbol.keyFor()
- 返回一个已登记的 Symbol 类型值的key。