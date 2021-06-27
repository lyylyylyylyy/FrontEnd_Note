1. 防抖和节流

```javascript
function debounce(fn, delay) {
  // 维护一个 timer，用来记录当前执行函数状态
  let timer = null;

  return function() {
    // 通过 ‘this’ 和 ‘arguments’ 获取函数的作用域和变量
    let context = this;
    let args = arguments;
    // 清理掉正在执行的函数，并重新执行
    clearTimeout(timer);
    timer = setTimeout(function() {
      fn.apply(context, args);
    }, delay);
  }
}
let flag = 0; // 记录当前函数调用次数
// 当用户滚动时被调用的函数
function foo() {
  flag++;
  console.log('Number of calls: %d', flag);
}

// 在 debounce 中包装我们的函数，过 2 秒触发一次
document.body.addEventListener('scroll', debounce(foo, 2000));

function throttle(func, delay){
  let prev = Date.now();
  return function(){
    const context = this;
    const args    = arguments;
    const now     = Date.now();
    if(now - prev >= delay){
      func.apply(context, args);
      prev = Date.now();
    }
  }
}

```

2. 事件委托

```html
　　<ul id="test">
        <li>
            <p>11111111111</p>
        </li>
        <li>
            <div>
                22222222
            </div>
        </li>
        <li>
            <span>3333333333</span>
        </li>
        <li>4444444</li>
    </ul>
```
```javascript
　　var oUl = document.getElementById('test');
    oUl.addEventListener('click',function(ev){
        var target = ev.target;
        while(target !== oUl ){
            if(target.tagName.toLowerCase() == 'li'){
                console.log('li click~');
                break;
            }
            target = target.parentNode;
        }
    })
```

3. 闭包

```javascript
var count = (function() {
  var n = 1;
  return function () {
    return n++;
  }
})();
count(); // 1
count(); //2
count(); //3

function add() {
  var x = 1;
  return function() {
    console.log(++x);
  };
}
var num = add();

num(); //输出2,

num(); //输出3,

num(); //输出4,
```

4. 继承

- 组合继承



- 寄生继承

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

5. promise.all和promise.race

```javascript
promise2.all = function(arr) {
  let list = [];
  let len = 0;
  let hasErr = false;

  return new promise2((resolve, reject) => {
      for(var i=0;i<arr.length;i++) {
          arr[i].then(data => {
              list[i] = data;
              len++;
              len === arr.length && resolve(list);
          }, error => {
              !hasErr && reject(error);
              hasErr = true
          })
      }
  })
}

promise2.race = function(arr) {

    return new promise2((resolve,reject) => {
        for (var i=0; i<arr.length;i++) {
            arr[i].then(data => {
                resolve(data);
            }, error => {
                reject(error);
            })
        }
    })
}
```

6. instanceof

- 原型链的向上查找
```javascript
function myinstanceof(leftValue, rightValue) {
  var rightproto = rightValue.prototype;
  leftValue = leftValue.__proto__;
  while(true) {
      if (leftValue == null) return false;
      if (leftValue == rightproto) return true;
      leftValue = leftValue.__proto__;
  }
}
```

7. 手写promise

```javascript
function Promise(fn) {
    var state = 'pending',
        value = null,
        callbacks = [];

    this.then = function (onFulfilled) {
        if (state === 'pending') {
            callbacks.push(onFulfilled);
            return this;
        }
        onFulfilled(value);
        return this;
    };

    function resolve(newValue) {
        value = newValue;
        state = 'fulfilled';
        setTimeout(function () {
            callbacks.forEach(function (callback) {
                callback(value);
            });
        }, 0);
    }

    fn(resolve);
}
```

8. JavaScript实现一个带并发限制的异步调度器,保证同时最多运行2个任务.

```javascript
class Scheduler {
    constructor() {
        this.tasks = [];
        this.concurrent = 0;
    }
    add(promiseCreator) {
        return new Promise(resolve = >{
            this.tasks.push(() = >promiseCreator().then(resolve));
            this.runTask();
        });
    }
    runTask() {
        if (this.concurrent >= 2) return;
        let currentTask = this.tasks.shift();
        if (currentTask) {
            this.concurrent++;
            currentTask().then(() = >{
                this.concurrent -= 1;
                this.runTask();
            });
        }
    }
}
const timeout = timer = >new Promise(resolve = >setTimeout(resolve, timer));
const scheduler = new Scheduler();
const addTask = (time, order) = >{
    scheduler.add(() = >timeout(time)).then(() = >{
        console.log(order);
    });
};
addTask(1000, "1");
addTask(500, "2");
addTask(300, "3");
addTask(400, "4");

// output: 2 3 1 4
```

9. 手写bind

- 对于普通函数，绑定this指向
- 对于构造函数，要保证原函数的原型对象上的属性不能丢失
- bind返回的是一个对象
```javascript
Function.prototype.bind = function(context, ...args) {
    let self = this;//谨记this表示调用bind的函数
    let fBound = function() {
        //this instanceof fBound为true表示构造函数的情况。如new func.bind(obj)
        return self.apply(this instanceof fBound ? this : context || window, args);
    }
    fBound.prototype = Object.create(this.prototype);//保证原函数的原型对象上的属性不丢失
    return fBound;
}
```

10. 手写call/apply

思路: 利用this的上下文特性。

```javascript
Function.proptotype.myCall = function(context = window, ...args) {
    let func = this;
    let fn = Symbol("fn");
    context[fn] = func;

    let res = context[fn](...args, "fn"); //重点代码，利用this指向，相当于context.caller(...args)
    delete context[fn];
    return res;
}
```

11. 用ES5实现数组的map方法

- 传入的参数有哪些，返回的值是一个【数组】
- 不会改变原来的数组
- `array.map(function(currentValue,index,arr), thisValue)`
  - thisValue可选。对象作为该执行回调时使用，传递给函数，用作 "this" 的值。如果省略了 thisValue，或者传入 null、undefined，那么回调函数的 this 为全局对象。

```javascript
Array.prototype.myMap = function(fn, context) {
    var arr = Array.prototype.slice.call(this);//由于是ES5所以就不用...展开符了,通过this获取原数组
    var mappedArr = [];
    for (var i = 0; i < arr.length; i++ ){
      mappedArr.push(fn.call(context, arr[i], i, this)); // 通过call来在context中执行fn这个回调函数
    }
    return mappedArr;
}


Array.prototype.myForEach = function myForEach(callback,context){  
    context = context || window;  
    if('forEach' in Array.prototye) {  
        this.forEach(callback,context);  
        return;  
    }  
    //IE6-8下自己编写回调函数执行的逻辑  
    for(var i = 0,len = this.length; i < len;i++) {  
        callback && callback.call(context,this[i],i,this);  
    }  
}
```

12. 用ES5实现数组的reduce方法

- `array.reduce(function(total, currentValue, currentIndex, arr), initialValue)`
- 传入的参数，以及返回值是什么【返回计算结果】
- 没有传入初始值怎么处理

```javascript
Array.prototype.myReduce = function(fn, initialValue) {
    // 获取数组
    var arr = Array.prototype.slice.call(this);
    var res = initialValue ? initialValue : arr[0];
    var startIndex = initialValue ? 0 : 1;

    for (var i = startIndex; i < arr.length; i++) {
        res = fn.call(null, res, arr[i], i, this);    // 通过call来执行fn函数
    }
    return res;
}
```

13. 实现Object.create方法

- Object.create()方法创建一个新对象，使用现有的对象来提供新创建的对象的__proto__
- `Object.create(proto，[propertiesObject])`，返回一个新对象

```javascript
function create(proto) {
    function F() {};
    F.prototype = proto;
    F.prototype.constructor = F;

    return new F();
}
```

14. 实现new关键字

- 创建一个全新的对象，这个对象的__proto__要指向构造函数的原型对象
- 执行构造函数
- 返回值为object类型则作为new方法的返回值返回，否则返回上述全新对象

```javascript
function myNew(fn, ...args) {
    let instance = Object.create(fn.prototype);    // 以构造函数的原型来创建一个新的对象/实例，绑定原型对象
    let res = fn.apply(instance, args);    // 执行构造函数
    return typeof res === 'object' ? res: instance;
}
```

15. 闭包

实现函数 makeClosures，调用之后满足如下条件：
- 1、返回一个函数数组 result，长度与 arr 相同
- 2、运行 result 中第 i 个函数，即 result[i]()，结果与 fn(arr[i]) 相同

```javascript
//参考《JavaScript高级程序设计》的典型方法
function makeClosures(arr, fn) {
    var result = new Array();
    for(var i=0;i<arr.length;i++){
        result[i] = function(num){
            return function(){
                return fn(num);
                
            }
        }(arr[i]);
    }
    return result;
}
```
返回一个元素为函数的数组
