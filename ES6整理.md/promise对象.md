## 含义

- 异步编程解决方案
- 解决回调函数的回调地狱问题

promise的两个特点
- 对象的状态不受外界影响。有三种状态：pending（进行中）、fulfilled（已成功）和rejected（已失败）。只有异步操作的结果，可以决定当前是哪一种状态，任何其他操作都无法改变这个状态。
- 一旦状态改变，就不会再变，任何时候都可以得到这个结果。Promise对象的状态改变，只有两种可能：从pending变为fulfilled和从pending变为rejected。只要这两种情况发生，状态就凝固了，不会再变了，会一直保持这个结果，这时就称为 resolved（已定型）

缺点：
- 无法取消Promise，一旦新建它就会立即执行，无法中途取消。
- 如果不设置回调函数，Promise内部抛出的错误，不会反应到外部。
- 当处于pending状态时，无法得知目前进展到哪一个阶段（刚刚开始还是即将完成）。

## 基本用法

- ES6 规定，Promise对象是一个构造函数，用来生成Promise实例。
- Promise构造函数接受一个函数作为参数，该函数的两个参数分别是resolve和reject。
- resolve函数的作用是，将Promise对象的状态从“未完成”变为“成功”（即从 pending 变为 resolved），在异步操作成功时调用，并将异步操作的结果，作为参数传递出去；
- reject函数的作用是，将Promise对象的状态从“未完成”变为“失败”（即从 pending 变为 rejected），在异步操作失败时调用，并将异步操作报出的错误，作为参数传递出去。
- Promise实例生成以后，可以用then方法分别指定resolved状态和rejected状态的回调函数。

```javascript
promise.then(function(value) {
  // success
}, function(error) {
  // failure
});
```

- **Promise 新建后就会立即执行。**[new Promise()]
- 如果调用resolve函数和reject函数时带有参数，那么它们的参数会被传递给回调函数。
- 注意，调用resolve或reject并不会终结 Promise 的参数函数的执行。

```javascript
new Promise((resolve, reject) => {
  resolve(1);
  console.log(2);
}).then(r => {
  console.log(r);
});
// 2
// 1
```

## Promise.prototype.then()

- then方法的第一个参数是resolved状态的回调函数，第二个参数是rejected状态的回调函数，它们都是可选的。
- then方法返回的是一个新的Promise实例（注意，不是原来那个Promise实例）。因此可以采用链式写法，即then方法后面再调用另一个then方法。

## Promise.prototype.catch()

- 用于指定发生错误时的回调函数
- Promise 对象的错误具有“冒泡”性质，会一直向后传递，直到被捕获为止。也就是说，错误总是会被下一个catch语句捕获。
- 如果没有使用catch()方法指定错误处理的回调函数，Promise 对象抛出的错误不会传递到外层代码，即不会有任何反应
- catch()方法返回的还是一个 Promise 对象，因此后面还可以接着调用then()方法。
- catch()方法之中，还能再抛出错误

## Promise.prototype.finally()

- 表示不管promise最后的状态如何都会执行的操作
- finally方法的回调函数不接受任何参数，表示与promise的状态无关
- finally方法总是会返回原来的值。

实现方法：

```javascript
Promise.prototype.finally = function (callback) {
  let P = this.constructor;  // 构造函数是promise
  return this.then(
    value  => P.resolve(callback()).then(() => value),
    reason => P.resolve(callback()).then(() => { throw reason })
  );
};
```

## Promise.all()

```javascript
const p = Promise.all([p1, p2, p3]);
```

- 参数：多个promise的数组，返回一个promise，如果数组的成员不是promise，会先调用Promise.resolve转换为promise，参数也可以不是数组，只要具有iterator接口即可

p的状态由p1、p2、p3决定，分成两种情况。（相当于&的操作）
- （1）只有p1、p2、p3的状态都变成fulfilled，p的状态才会变成fulfilled，此时p1、p2、p3的**返回值组成一个数组**，传递给p的回调函数。
- （2）只要p1、p2、p3之中有一个被rejected，p的状态就变成rejected，此时第一个被reject的实例的返回值，会传递给p的回调函数。

> 如果作为参数的 Promise 实例，自己定义了catch方法，那么它一旦被rejected，并不会触发Promise.all()的catch方法。

## Promise.race()

```javascript
const p = Promise.race([p1, p2, p3]);
```

- 只要p1、p2、p3之中有一个实例率先改变状态，p的状态就跟着改变。那个率先改变的 Promise 实例的返回值，就传递给p的回调函数。

## Promise.allSettled()

- Promise.allSettled()方法接受一组 Promise 实例作为参数，包装成一个新的 Promise 实例。
- 只有等到所有这些参数实例都返回结果，不管是fulfilled还是rejected，包装实例才会结束
- 该方法返回的新的 Promise 实例，一旦结束，状态总是fulfilled，不会变成rejected。状态变成fulfilled后，Promise 的监听函数接收到的参数是一个数组，每个成员对应一个传入Promise.allSettled()的 Promise 实例。

## Promise.any()

类似或的操作
- 只要参数实例有一个变成fulfilled状态，包装实例就会变成fulfilled状态；如果所有参数实例都变成rejected状态，包装实例就会变成rejected状态。
- 返回值？

## Promise.resolve()

有时需要将现有对象转为 Promise 对象，Promise.resolve()方法就起到这个作用。

参数是一个thenable对象
- Promise.resolve()方法会将这个对象转为 Promise 对象，然后就立即执行thenable对象的then()方法。

参数不是具有then()方法的对象，或根本就不是对象
- 如果参数是一个原始值，或者是一个不具有then()方法的对象，则Promise.resolve()方法返回一个新的 Promise 对象，状态为resolved

不带有任何参数
- 直接返回一个resolved状态的 Promise 对象。

## Promise.reject()

Promise.reject(reason)方法也会返回一个新的 Promise 实例，该实例的状态为rejected