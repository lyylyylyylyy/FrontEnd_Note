

## this

解析器在调用函数每次都会向函数内部传递进一个隐含的参数，这个隐含的参数就是this，**this指向的是一个对象**，这个对象我们称为函数执行的 上下文对象。

**根据函数的调用方式的不同，this会指向不同的对象**：【重要】

- 1.以函数的形式调用时，this永远都是window。比如`fun();`相当于`window.fun();`

- 2.以方法的形式调用时，this是调用方法的那个对象

- 3.以构造函数的形式调用时，this是新创建的那个对象

- 4.使用call和apply调用时，this是指定的那个对象
  
- 5.在函数中，严格模式下，this 是 undefined。
  
- 6.在事件中，this 指的是接收事件的元素。


**针对第1条的举例**：

```javascript
    function fun() {
        console.log(this);
        console.log(this.name);
    }

    var obj1 = {
        name: "smyh",
        sayName: fun
    };

    var obj2 = {
        name: "vae",
        sayName: fun
    };

    var name = "全局的name属性";

    //以函数形式调用，this是window
    fun();       //可以理解成 window.fun()
```


打印结果：

```
    Window
    全局的name属性
```


上面的举例可以看出，this指向的是window对象，所以 this.name 指的是全局的name。


**第2条的举例**：

```javascript
        function fun() {
            console.log(this);
            console.log(this.name);
        }

        var obj1 = {
            name: "smyh",
            sayName: fun
        };

        var obj2 = {
            name: "vae",
            sayName: fun
        };

        var name = "全局的name属性";

        //以方法的形式调用，this是调用方法的对象
        obj2.sayName();

```

打印结果：

```
    Object
    vae
```

上面的举例可以看出，this指向的是 对象 obj2 ，所以 this.name 指的是 obj2.name。

**箭头函数中this的指向**：

ES6中的箭头函数并不会使用上面四条标准的绑定规则，而是会继承外层函数调用的this绑定（无论this绑定到什么）。

## 类数组 arguments


在调用函数时，浏览器每次都会传递进两个隐含的参数：

- 1.函数的上下文对象 this

- 2.**封装实参的对象** arguments

`arguments`对象是所有（非箭头）函数中都可用的局部变量。你可以使用`arguments`对象在函数中引用函数的参数。此对象包含传递给函数的每个参数，第一个参数在索引0处。

`arguments`对象不是一个 `Array` 。它类似于`Array`，但除了`length`属性和索引元素之外没有任何`Array`属性。

您还可以使用`Array.from()`方法或扩展运算符将参数转换为真实数组.

```
var args = Array.from(arguments);
var args = [...arguments];
```


例如：

```javascript
    function foo() {
        console.log(arguments);
        console.log(typeof arguments);
    }

    foo();
```


arguments是一个**类数组对象**，它可以通过索引来操作数据，也可以获取长度。

**arguments代表的是实参**。在调用函数时，我们所传递的实参都会在arguments中保存。有个讲究的地方是：arguments**只在函数中使用**。




### 1、返回函数**实参**的个数：arguments.length


arguments.length可以用来获取**实参的长度**。

举例：

```javascript
    fn(2,4);
    fn(2,4,6);
    fn(2,4,6,8);

    function fn(a,b) {
        console.log(arguments);
        console.log(fn.length);         //获取形参的个数
        console.log(arguments.length);  //获取实参的个数

        console.log("----------------");
    }
```



我们即使不定义形参，也可以通过arguments来使用实参（只不过比较麻烦）：arguments[0] 表示第一个实参、arguments[1] 表示第二个实参...

### 2、返回正在执行的函数：arguments.callee

arguments里边有一个属性叫做callee，这个属性对应一个函数对象，就是当前正在指向的函数对象。

```javascript
    function fun() {

        console.log(arguments.callee == fun); //打印结果为true
    }

    fun("hello");
```

在使用函数**递归**调用时，推荐使用arguments.callee代替函数名本身。

### 3、arguments可以修改元素

之所以说arguments是伪数组，是因为：**arguments可以修改元素，但不能改变数组的长短**。举例：

```javascript
    fn(2,4);
    fn(2,4,6);
    fn(2,4,6,8);

    function fn(a,b) {
        arguments[0] = 99;  //将实参的第一个数改为99
        arguments.push(8);  //此方法不通过，因为无法增加元素
    }

```

## call bind apply 的区别

**简单说一下bind、call、apply的区别**

**三者都是用于改变函数体内this的指向**.

但是**bind与apply和call的最大的区别**是：

**bind不会立即调用，而是返回一个新函数，称为绑定函数**，其内的this指向为创建它时传入bind的第一个参数，而传入bind的第二个及以后的参数作为原函数的参数来调用原函数。
```
var obj = {};

function test() {
    console.log(this === obj);
}

test(); //false

var testObj = test.bind(obj);
testObj();  //true
```
apply和call都是为了改变某个函数运行时的上下文而存在的（就是为了改变函数内部this的指向）；apply和call的调用返回函数执行结果；

　如果使用apply或call方法，那么this指向他们的第一个参数，apply的第二个参数是一个参数数组，call的第二个及其以后的参数都是数组里面的元素，就是说要全部列举出来；

**以下是MDN文档**：

**bind语法**：

func.bind(thisArg, [arg1[, arg2[, ...]]])

thisArg 当绑定函数被调用时，该参数会作为原函数运行时的this指向。当使用new 操作符调用绑定函数时，该参数无效。
arg1, arg2, ... 当绑定函数被调用时，这些参数将置于实参之前传递给被绑定的方法。

**call语法**：

fun.call(thisArg, arg1, arg2, ...)

thisArg:：在fun函数运行时指定的this值。需要注意的是，指定的this值并不一定是该函数执行时真正的this值，如果这个函数处于非严格模式下，则指定为null和undefined的this值会自动指向全局对象(浏览器中就是window对象)，同时值为原始值(数字，字符串，布尔值)的this会指向该原始值的自动包装对象。
arg1, arg2, ... 指定的参数列表。

**apply语法**：

fun.apply(thisArg, [argsArray])

thisArg： 在 fun 函数运行时指定的 this 值。需要注意的是，指定的 this 值并不一定是该函数执行时真正的 this 值，如果这个函数处于非严格模式下，则指定为 null 或 undefined 时会自动指向全局对象（浏览器中就是window对象），同时值为原始值（数字，字符串，布尔值）的 this 会指向该原始值的自动包装对象。

argsArray: 一个数组或者类数组对象，其中的数组元素将作为单独的参数传给 fun 函数。如果该参数的值为null 或 undefined，则表示不需要传入任何参数。从ECMAScript 5 开始可以使用类数组对象。

**区别总结**：

当我们使用一个函数需要改变this指向的时候才会用到call,apply,bind

- 如果你要传递的参数不多，则可以使用fn.call(thisObj, arg1, arg2 ...)
- 如果你要传递的参数很多，则可以用数组将参数整理好调用fn.apply(thisObj, [arg1, arg2 ...])

- 如果你想生成一个新的函数长期绑定某个函数给某个对象使用，则可以使用`const newFn = fn.bind(thisObj)`;`newFn(arg1, arg2...)`
