## 基本概念

执行 Generator 函数会返回一个遍历器对象，也就是说，Generator 函数除了状态机，还是一个遍历器对象生成函数。返回的遍历器对象，可以依次遍历 Generator 函数内部的每一个状态。

两个特征
- function和函数关键字之间有一个*
- 函数体内部使用yield关键字定义不同的状态

```javascript
function* helloWorldGenerator() {
  yield 'hello';
  yield 'world';
  return 'ending';
}

var hw = helloWorldGenerator();
```

- Generator 函数的调用方法与普通函数一样，也是在函数名后面加上一对圆括号。
- 不同的是，调用 Generator 函数后，该函数并不执行，返回的也不是函数运行结果，而是一个指向内部状态的指针对象，也就是上一章介绍的遍历器对象（Iterator Object）。
- 必须调用遍历器对象的next方法，使得指针移向下一个状态。也就是说，每次调用next方法，内部指针就从函数头部或上一次停下来的地方开始执行，直到遇到下一个yield表达式（或return语句）为止。换言之，Generator 函数是分段执行的，yield表达式是暂停执行的标记，而next方法可以恢复执行
- yield表达式只能用在 Generator 函数里面，用在其他地方都会报错。
- yield表达式如果用在另一个表达式之中，必须放在圆括号里面。

## next方法的参数

- next方法可以带一个参数，该参数就会被当作上一个yield表达式的返回值。