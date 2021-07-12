## let

- 声明的变量只在let所在的代码块内有效

```javascript
var a = [];
for (var i = 0; i < 10; i++) {
  a[i] = function () {
    console.log(i);
  };
}
a[6](); // 10

var a = [];
for (let i = 0; i < 10; i++) {
  a[i] = function () {
    console.log(i);
  };
}
a[6](); // 6
```

- for循环还有一个特别之处，就是设置循环变量的那部分是一个父作用域，而循环体内部是一个单独的子作用域。

- 不存在变量提升
- 暂时性死区：声明前不可以使用，且块级作用域内的let声明变量不受外部影响，与外部无关
- 不允许重复声明

## const

- 只读变量，声明后不能改变
- 声明时必须赋值
- 没有变量提升
- 暂时性死区

> const实际上保证的，并不是变量的值不得改动，而是变量指向的那个内存地址所保存的数据不得改动。

> ES6的6种变量声明方法：var、let、const、function、import、class

- var命令和function命令声明的全局变量，依旧是顶层对象的属性，在javascript中属于window；
- let命令、const命令、class命令声明的全局变量，不属于顶层对象的属性。在Script上。
