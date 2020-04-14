# 前言

**浏览器对象模型（Browser Object Model (BOM)）允许 JavaScript 与浏览器对话。**

## 浏览器对象模型（Browser Object Model (BOM)）

不存在浏览器对象模型（BOM）的官方标准。

现代的浏览器已经（几乎）实现了 JavaScript 交互相同的方法和属性，因此它经常作为 BOM 的方法和属性被提到。

## Window 对象

所有浏览器都支持 **window** 对象。它代表浏览器的窗口。

所有全局 JavaScript 对象，函数和变量自动成为 window 对象的成员。

**全局变量是 window 对象的属性**。

**全局函数是 window 对象的方法**。

甚至（HTML DOM 的）document 对象也是 window 对象属性：

```
window.document.getElementById("header");
```

等同于：

```
document.getElementById("header");
```

## 窗口尺寸

**两个属性可用用于确定浏览器窗口的尺寸**。

这两个属性都以像素返回尺寸：

- `window.innerHeight` - 浏览器窗口的内高度（以像素计）
- `window.innerWidth` - 浏览器窗口的内宽度（以像素计）
  
> 浏览器窗口（浏览器视口）**不包括工具栏和滚动条**。

对于 Internet Explorer 8, 7, 6, 5：

- document.documentElement.clientHeight
- document.documentElement.clientWidth
- 
或

- document.body.clientHeight
- document.body.clientWidth


一个实用的 JavaScript 解决方案（包括所有浏览器）：

实例
```
var w = window.innerWidth
|| document.documentElement.clientWidth
|| document.body.clientWidth;

var h = window.innerHeight
|| document.documentElement.clientHeight
|| document.body.clientHeight; 
```

## 其他窗口方法

一些其他方法：

- window.open() - 打开新窗口
- window.close() - 关闭当前窗口
- window.moveTo() -移动当前窗口
- window.resizeTo() -重新调整当前窗口

