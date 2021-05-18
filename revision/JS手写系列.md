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

1. promise.all和promise.race

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

