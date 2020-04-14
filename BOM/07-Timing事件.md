# 前言

JavaScript 可以在时间间隔内执行。

这就是所谓的定时事件（ Timing Events）。

## timing 事件

window 对象允许以指定的时间间隔执行代码。

这些时间间隔称为定时事件。

通过 JavaScript 使用的有两个关键的方法：

- setTimeout(function, milliseconds):在等待指定的毫秒数后执行函数。
- setInterval(function, milliseconds)等同于 setTimeout()，但持续重复执行该函数。
  
`setTimeout()` 和 `setInterval()` 都属于 HTML DOM Window 对象的方法。

## setTimeout() 方法
``
window.setTimeout(function, milliseconds);
``

window.setTimeout() 方法可以不带 window 前缀来编写。

- 第一个参数是要执行的函数。

- 第二个参数指示执行之前的毫秒数。

实例

单击按钮。等待 3 秒，然后页面会提示 "Hello"：
```
<button onclick="setTimeout(myFunction, 3000)">试一试</button>

<script>
function myFunction() {
    alert('Hello');
 }
</script>
```

## 如何停止执行？

`clearTimeout() `方法停止执行 setTimeout() 中规定的函数。

`window.clearTimeout(timeoutVariable)`

window.clearTimeout() 方法可以不带 window 前缀来写。

- clearTimeout() 使用从 setTimeout() 返回的变量：
```
myVar = setTimeout(function, milliseconds);
clearTimeout(myVar);
```

实例

类似上例，但是添加了“停止”按钮：
```
<button onclick="myVar = setTimeout(myFunction, 3000)">试一试</button>

<button onclick="clearTimeout(myVar)">停止执行</button>
```

## setInterval() 方法

`setInterval()` 方法在每个给定的时间间隔重复给定的函数。

`window.setInterval(function, milliseconds);`

window.setInterval() 方法可以不带 window 前缀来写。

- 第一个参数是要执行的函数。

- 第二个参数每个执行之间的时间间隔的长度。

本例每秒执行一次函数 "myTimer"（就像数字手表）。

实例

显示当前时间：
```
var myVar = setInterval(myTimer, 1000);
 
function myTimer() {
    var d = new Date();
    document.getElementById("demo").innerHTML = d.toLocaleTimeString();
}
```

## 如何停止执行？

`clearInterval()` 方法停止 setInterval() 方法中指定的函数的执行。

`window.clearInterval(timerVariable)`

window.clearInterval() 方法可以不带 window 前缀来写。

- clearInterval() 方法使用从 setInterval() 返回的变量：
```
myVar = setInterval(function, milliseconds);
clearInterval(myVar);
```

实例

类似上例，但是我们添加了一个“停止时间”按钮：
```
<p id="demo"></p>

<button onclick="clearInterval(myVar)">停止时间</button>

<script>
var myVar = setInterval(myTimer, 1000);
 function myTimer() {
    var d = new Date();
    document.getElementById("demo").innerHTML = d.toLocaleTimeString();
}
</script>
```
