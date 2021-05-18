1. [参考](https://www.cnblogs.com/pssp/p/5216085.html)
```javascript
const obj = {
dev: 'bfe',
a: function() {
  return this.dev
},
b() {
  return this.dev
},
c: () => {
  return this.dev
},
d: function() {
  return (() => {
    return this.dev
  })()
},
e: function() {
  return this.b()
},
f: function() {
  return this.b
},
g: function() {
  return this.c()
},
h: function() {
  return this.c
},
i: function() {
  return () => {
    return this.dev
  }
}
}
console.log(obj.a())
console.log(obj.b())
console.log(obj.c())
console.log(obj.d())
console.log(obj.e())
console.log(obj.f()())
console.log(obj.g())
console.log(obj.h()())
console.log(obj.i()())
```

2. 原型
```javascript
for (let i = 0; i < 3; i++) { setTimeout(() => console.log(i), 1); }
// 0 1 2
for (var j = 0; j < 3; j++) { setTimeout(() => console.log(j), 1); }
// 3 3 3  setTimeout()里的回调函数共享了全局作用域

function Foo() {
  Foo.a = function() {
    console.log(1)
  }
  this.a = function() {
    console.log(2)
  }
}
Foo.prototype.a = function() {
  console.log(3)
}
Foo.a = function() {
  console.log(4)
}
Foo.a(); //4
let obj = new Foo(); 
obj.a(); //2
Foo.a(); //1 被覆盖
```
3. 解释：
- await关键字只能在带有async关键字的函数内部使用，在外部使用时会报错。await等待的是右侧的[表达式结果]，如果右侧是一个函数，等待的是右侧函数的返回值，如果右侧的表达式不是函数则直接是右侧的表达式。await在等待时会让出线程阻塞后面的执行。await的执行顺序为从右到左，会阻塞后面的代码执行，但并不是直接阻塞await的表达式。

- await之后如果不是promise，await会阻塞后面的代码，会先执行async外面的同步代码，等外面的同步代码执行完成在执行async中的代码。

- 如果它等到的是一个 promise 对象，await 也会暂停async后面的代码，先执行async外面的同步代码，等着 Promise 对象 fulfilled，然后把 resolve 的参数作为 await 表达式的运算结果。

- 一段代码执行时，会先执行宏任务中的同步代码：

- 如果执行中遇到 setTimeout 之类宏任务，那么就把这个 setTimeout 内部的函数推入「宏任务的队列」中，下一轮宏任务执行时调用。

- 如果执行中遇到 promise.then() 之类的微任务，就会推入到「当前宏任务的微任务队列」中，在本轮宏任务的同步代码执行都完成后，依次执行所有的微任务1、2、3。

```javascript
async function async1() {
  console.log('async1 start');
  await async2();
  console.log('async1 end');
}
async function async2() {
  console.log('async2');
}

console.log('script start');
setTimeout(function() {
  console.log('setTimeout');
}, 0)
async1();
new Promise(function(resolve) {
  console.log('promise1');
  resolve();
}).then(function() {
  console.log('promise2');
});
console.log('script end');

/*
'script start'
'async1 start'
'async2'
'promise1'
'script end'
'async1 end'
'promise2'
'setTimeout'
*/
```

4. 代码补全

```
const timeout = ms => new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve();
    }, ms);
});
const ajax1 = () => timeout(2000).then(() => {
    console.log('1');
    return 1;
});
const ajax2 = () => timeout(1000).then(() => {
    console.log('2');
    return 2;
});
const ajax3 = () => timeout(2000).then(() => {
    console.log('3');
    return 3;
});

function mergePromise(ajaxArray) {
	// 在此实现代码
    var state = Promise.all(ajaxArray).then(data => )
}
mergePromise([ajax1, ajax2, ajax3]).then(data => {
   console.log('done');    
  console.log(data); // data 为 [1, 2, 3]
});
```