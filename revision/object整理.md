所有对象都有的属性和方法？
- hasOwnProperty:不会遍历原型属性，只获取实例内部属性
  - 只在给定对象属性存在于对象实例中时，才会返回true
- isPrototypeOf
  - object.isPrototypeOf(person)：如果`person.__proto__ == object`返回true
- propertyIsEnumerable
- constructor
- toString
- valueOf
- toLocalString
-------------
字符串的特点？ 
- 一旦创建，值就不能更改
-------------
怎么延长作用域链？ 
- with 
- try...catch

判断数组：
- typeOf 
- instanceOf 
- Array.isArray()
- constructor?
- Object.prototype.toString.call(value)     // "[object, Array]"
-------------

for...in...: 
- 遍历数组的对象顺序不确定，会遍历到原型上的属性，属性必须可枚举才能遍历到
- in操作符单独使用：对象能够访问属性时返回true，无论属性位于实例中还是原型上。
- for...in...，返回的是所有能够通过对象访问的、可枚举的属性，其中既包括存在于实例中的属性，也包括存在于原型中的属性。
- 屏蔽了原型中不可枚举属性的实例属性也会返回，规定是所有开发人员定义的属性都可枚举
- 获取对象上所有可枚举实例属性，可以使用`Object.keys(对象)`，返回包含所有可枚举属性的字符串数组，对象传入构造函数的实例，只会返回构造函数的属性（p154）
- `Object.getOwnPropertyNames()`：无论是否可枚举，获取对象上所有实例属性
- 这两个函数可以用来替代`for..in...`

-------------
arguments：
- 类数组，长度取决于传入的参数个数，赋值会同步给同名元素，没传入参数的参数undefined，和参数空间不同。
- callee属性：指针，指向拥有arguments对象的函数（经典阶乘函数）。
- `Array.prototype.slice()`将arguments转化为数组
-------------
alert 接受字符串作为参数，后台会调用toString方法 
- ——《JavaScript高级程序设计》p89
-------------
数组的迭代方法：
- every、filter、map、forEach、some
-------------
正则表达式：
- 转义，字面量同一个实例，new每次新建一个实例，循环匹配有区别
- new创建正则，双重转义
- exec()：
- test()
-------------

函数：
- 函数名是一个指向函数对象的指针，使用不带圆括号的函数名是访问函数指针，不是调用函数。
- 函数没有重载
- 解析器会先读取函数声明，确保他可以使用，函数表达式必须等代码执行到它在的代码行
- 函数内部属性：arguments+this；  
- 函数对象属性caller，保存着调用当前函数的函数的引用 ——《JavaScript高级程序设计》p115
-------------

function.apply(this[在其中运行函数的作用域]，数组[数组或arguments])
- 执行function时传入this值作为this值
- call(this, num1, num2)
- 可以扩充函数作用域   p117
- bind(this/环境)：创建一个函数实例，this值会被绑定到传给bind()的值，var x = sayColor.bind(o)           
-------------

es5中，prototype不可枚举，constructor属性也不可枚举  p116

-------------

基本包装类型String、Boolean、Number

-------------
eval()
- 接受要执行的ecmascript代码字符串，通过eval执行的代码被认为是包含该次调用的执行环境的一部分，因此，被执行的代码具有与该执行环境相同的作用域链。
- 可以引用在包含环境中定义的变量，也可以在eval中定义一个函数，然后在外部调用该函数。
- eval中创建的任何变量或函数都不会被提升。
- 危险：代码注入
-------------
数组中的最大或最小值
- `Math.max.apply(Math, values)`

-------------
slice
- 参数：起始位置
- 负参数：长度+负数
  
substr
- 参数：起始位置，参数个数
- 负参数：第一个负+长度，第二个设为0
  
substring
- 参数：起始位置
- 负参数：全设为0
  
-------------

new一个构造函数的过程：
- 开辟内存空间，创建一个新对象
- 构造函数的作用域赋值给这个新对象（this指向了新对象）
- 执行构造函数中的代码
- 返回新对象

-------------
对象内部特性：数据属性 + 访问器属性
- 数据属性
  - [[Configurable]]：能否delete，重新定义特性……
  - [[Enumerable]]：通过for-in能都循环访问
  - [[Writable]]
  - [[Value]]
- 访问器属性：
  - 一对儿getter和setter函数
  - 读取时候调用getter，写入时候，调用setter
    - [[Configurable]]
    - [[Enumerable]]
    - [[Get]]:默认为undefined
    - [[Set]]：默认为undefined
- 必须用Object.defineProperty()操作定义

-------------
Object.defineProperty():
- 修改属性默认特性
- 3个参数：对象，属性名，描述符对象(必须是数据属性那几个) ——p139
- 一旦把属性定义为不可配置，之后就不能配置了
-------------
Object.defineProperties():
- 定义多个属性
- 2个参数：对象，属性
-------------
Object.getOwnPropertyDesciptor()
- 读取属性的特性
- 2个参数：对象，要读取的对象的属性

-------------
Object.getPrototypeOf():
- 返回实例的原型对象

-------------
创建对象的方法：
- new，然后给对象添加属性
- 对象字面量
- 工厂模式
  - 构造函数内部新建object，给object添加属性，值为函数参数，返回object，new构造函数创建对象
- 构造函数模式：函数内部`this.name = name`
  - 缺点：每个方法都要在每个实例上新创建一次
  - 不同的作用域链和标识符解析，不同实例的同名函数不相等
- 原型模式
  - 函数的prototype指针，指向的对象，包含由特定类型所有实例共享的属性和方法
  - 函数的prototype属性指向函数的原型对象
  - 原型对象的constructor属性，指向原型所在的函数
  - 实例的`__proto__`，指向构造函数的原型对象
  - 读取对象某个属性，先读取实例中的，有就返回，没有去原型中找，所以实例中的同名属性可以屏蔽原型上的同名属性，原型中沿着原型链向上查找
  - 为Person.prototype以对象字面量的方式创建（重写）新对象，constructor不指向Person而是指向Object，手动设置成Person才可以，但是会导致constructor的[[Enumerable]]属性变为true，并且实例person的`__proto__`会始终指向最初的原型对象(person在重写之前声明的)，故person调用最初原型没有的方法属性会报错 ，这种方式会切断原型链     ——p154-156
  - 原型对象的问题：共享属性，包含引用类型的属性会存在问题，比如数组，push一个值，所有实例都会体现这个push的操作，这不是我想要的
  - 默认的原型
- 组合使用构造函数模式+原型模式
  - 构造函数放实例属性，原型上放共享的方法属性
- 动态原型模式：检查某个应该存在的方法是否有效来确定是否初始化原型
- 寄生构造函数模式

-------------

继承：
- 原型链是实现继承的主要方法
  - 思想：子类型函数原型对象B等于另一个超类型构造函数类型A的实例（实例里面的`__proto__`，导致原型对象中也有了实例的`__proto__`，指向实例的原型对象，实现了继承），实现的本质是重写原型对象，代之以一个新类型的实例 ，重写后，新建的B实例的constructor指向改变了，指向A的构造函数，这是因为重写了原型  ——p163
  - 谨慎的定义方法    ——166
    - 子类型覆盖超类型中的某个方法，给原型添加的方法一定要放在替换原型的语句后面，子类型实例调用使用替换的方法，超类型实例调用使用的是原来的方法
- 构造函数：最常用
  - 思想：子类型函数内部调用超类型构造函数，使用`apply()`和`call()`函数在新创建的对象上执行构造函数
  - 优势：可以在子类型构造函数中向超类型构造函数传递参数
- 组合继承
  - 思想：原型链继承原型属性和方法，构造函数继承实例属性
  - 缺点：调用两次构造函数，不得不在调用子类型构造函数时重写这些属性
- 寄生式继承：function函数内部先通过Object.create(original)创建一个对象，然后给对象添加方法，返回这个对象
```javascript
 var person={
    name:'ccdida',
    friends:['shelly','Bob']
  }
  function createAnother(original){
    //clone.__proto__===original
    var clone=Object.create(original)
    //增强对象，添加属于自己的方法
    clone.sayHi=function(){
      console.log('hi')
    }

    return clone

  }
  var person1=createAnother(person)
  var person2=createAnother(person)
  person1.friends.push('shmily')
  console.log(person2.friends)//["shelly", "Bob","shmily"]
  person1.sayHi() //hi
```
- 寄生组合式继承：最有效
- instanceof和isPrototypeof能够识别基于组合继承创建的对象。