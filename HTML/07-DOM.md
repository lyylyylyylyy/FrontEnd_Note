## 前言

浏览器的内核是指支持浏览器运行的最核心的程序，分为两个部分，一是**渲染引擎**，另一个是**JS引擎**。

浏览器请求、加载、渲染一个页面，时间花在下面五件事情上：

- DNS 查询
- TCP 连接
- HTTP 请求即响应
- 服务器响应
- 客户端渲染

## 浏览器渲染页面的过程

浏览器对内容的渲染（渲染树构建、布局及绘制），可以分为下面五个步骤：

- 处理 HTML 标记并构建 DOM 树。
- 处理 CSS 标记并构建 CSSOM 树。
- 将 DOM 与 CSSOM 合并成一个渲染树。
- 根据渲染树来布局，以计算每个节点的几何信息(也叫回流)。
- 将各个节点绘制到屏幕上。

**注：** 
- 文档解析完毕，页面重新渲染。当页面引用的所有 js 同步代码执行完毕，触发 `DOMContentLoaded `事件。
- html 文档中的图片资源，js 代码中有异步加载的 css、js 、图片资源都加载完毕之后，`load` 事件触发。

> 需要明白，这五个步骤并不一定一次性顺序完成。如果 DOM 或 CSSOM 被修改，以上过程需要重复执行，这样才能计算出哪些像素需要在屏幕上进行重新渲染。实际页面中，CSS 与 JavaScript 往往会多次修改 DOM 和 CSSOM，下面就来看看它们的影响方式。

> HTML从第一行开始解析，遇到外联资源就会请求对应资源，有的资源会阻塞请求，有的资源不会，故分为阻塞型与非阻塞型资源，这里区分两类资源的标志是document对象派发DOMContentLoaded事件的时间点，认为**派发DOMContentLoaded事件才表示dom树构建完成**。非阻塞型的资源加载完成由window.onload判断，此时页面加载完毕。

## 阻塞渲染

**会阻塞DOM解析的资源主要是:**
- 内联css
- 内联javascript
- 外联普通javascript
- 外联defer javascript
- javascript标签之前的外联css

现代浏览器总是并行加载资源。

> 举个![](./img/lizi.png), 当 HTML 解析器被脚本阻塞时，解析器虽然会停止构建 DOM，但仍会识别该脚本后面的资源，并进行预加载。

当浏览器遇到一个 `script` 标记时，DOM 构建将暂停，直至脚本完成执行。
JavaScript 可以查询和修改 DOM 与 CSSOM。
CSSOM 构建时，JavaScript 执行将暂停，直至 CSSOM 就绪。

所以，**`script` 标签的位置很重要。实际使用时，可以遵循下面两个原则**：

- CSS 优先：引入顺序上，CSS 资源先于 JavaScript 资源。
- JavaScript 应尽量少影响 DOM 的构建。

**渲染过程中遇见JavaScript会发生什么？**

- JavaScript的加载、解析与执行会阻塞DOM的构建，也就是说，在构建DOM时，HTML解析器若遇到了JavaScript，那么它会暂停构建DOM，将控制权移交给JavaScript引擎，等JavaScript引擎运行完毕，浏览器再从中断的地方恢复DOM构建。这也是都建议将 script 标签放在 `body` 标签底部的原因。当然在当下，并不是说 `script` 标签必须放在底部，因为你可以给 `script` 标签添加` defer` 或者 `async `属性。

- JS文件不只是阻塞DOM的构建，它会导致CSSOM也阻塞DOM的构建。

- 原本DOM和CSSOM的构建是互不影响，但是一旦引入了JavaScript，CSSOM也开始阻塞DOM的构建，只有CSSOM构建完毕后，DOM再恢复DOM构建。

- 因为JavaScript不只是可以改DOM，它还可以更改样式，即可以更改CSSOM。**不完整的CSSOM是无法使用的，但JavaScript中想访问CSSOM并更改它，那么在执行JavaScript时，必须要能拿到完整的CSSOM**。所以，如果浏览器尚未完成CSSOM的下载和构建，而我们却想在此时运行脚本，那么浏览器将延迟脚本执行和DOM构建，直至其完成CSSOM的下载和构建。**在这种情况下，浏览器会先下载和构建CSSOM，然后再执行JavaScript，最后在继续构建DOM**。

## 改变阻塞模式：defer 与 async

**defer**

```
<script src="app1.js" defer></script>
<script src="app2.js" defer></script>
<script src="app3.js" defer></script>
```

`defer` 属性表示延迟执行引入的 JavaScript，不阻塞资源，而是会暂存到一个队列中，等整个html解析完成后再按队列的顺序请求并执行javascript，但是这种外联defer javascript全部加载并执行完成后才会派发`DOMContentLoaded事件`。

**async**

```
<script src="app.js" async></script>
<script src="ad.js" async></script>
<script src="statistics.js" async></script>
```

`async` 属性表示异步执行引入的 JavaScript，与 `defer` 的区别在于，如果已经加载好，就会开始执行—, 无论此刻是 HTML 解析阶段还是 DOMContentLoaded 触发之后。需要注意的是，这种方式加载的 JavaScript 依然会阻塞 load 事件。换句话说`async-script` 可能在 `DOMContentLoaded` 触发之前或之后执行，但一定在 `load` 触发之前执行。


## 回流和重绘

网页生成的时候，至少会渲染一次。在用户访问的过程中，还会不断重新渲染。

**重绘**: 

当渲染树（render tree）中的一些元素需要更新属性，而这些属性只是影响元素的外观、风格，而不会影响布局的，比如background-color。

**回流**:

当渲染树（render tree）中的一部分(或全部)因为元素的规模尺寸、布局、隐藏等改变而需要重新构建。

回流必定会发生重绘，重绘不一定会引发回流。

**常见引起回流属性和方法**

- 任何会改变元素几何信息(元素的位置和尺寸大小)的操作，都会触发回流。
- 添加或者删除可见的DOM元素；
- 元素尺寸改变——边距、填充、边框、宽度和高度
- 内容变化，比如用户在input框中输入文字
- 浏览器窗口尺寸改变——resize事件发生时
- 计算 offsetWidth 和 offsetHeight 属性
- 设置 style 属性的值
