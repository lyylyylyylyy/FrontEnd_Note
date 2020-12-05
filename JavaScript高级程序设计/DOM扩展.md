- Selectors API(选择符 API)
- HTML5

## 选择符 API

|name|接收|返回|备注|
|:----:|:----:|:----:|:----:|
|`querySelector()`|1个 CSS 选择符|匹配的第1个元素，如果没有找到匹配的元素，返回 null|通过 Document 类型调用时，会在文档元素的范围内查找匹配的元素。通过 Element 类型调用时，只会在后代元素的范围内查找匹配的元素|
|`querySelectorAll()`|1个 CSS 选择符|所有匹配的元素，是一个**NodeList**实例| 取得NodeList 中的元素，可以使用 `item()`和方括号语法｜
|`matchesSelector()`|1个 CSS 选择符|调用元素与该选择符匹配，返回 true;否则，返回 false|使用这个方法能够方便地检测它是否会被 `querySelector()`或 `querySelectorAll()`方法返回|

example:

```javascript
//取得 body 元素
var body = document.querySelector("body");
//取得类为"button"的第一个图像元素
var img = document.body.querySelector("img.button");

//取得某<div>中的所有<em>元素(类似于 getElementsByTagName("em"))
var ems = document.getElementById("myDiv").querySelectorAll("em");
//取得所有<p>元素中的所有<strong>元素
var strongs = document.querySelectorAll("p strong");

if (document.body.matchesSelector("body.page1")){
        //true
}
```

## 元素遍历

Element Traversal API 为 DOM 元素添加了以下 5 个属性。
- `childElementCount`:返回子元素(不包括文本节点和注释)的个数。
- `firstElementChild`:指向第一个子元素;firstChild 的元素版。
- `lastElementChild`:指向最后一个子元素;lastChild 的元素版。
- `previousElementSibling`:指向前一个同辈元素;previousSibling 的元素版。 
-  `nextElementSibling`:指向后一个同辈元素;nextSibling 的元素版。

支持的浏览器为 DOM 元素添加了这些属性，利用这些元素不必担心空白文本节点。

## HTML5

- `getElementsByClassName()`

|description|
|:--:|
|通过`document`对象及所有HTML元素调用|
|参数:1个包含一或多个类名的字符串|
|返回带有指定类的所有元素的 **NodeList**|
|**只有位于调用元素子树中的元素才会返回**|
|性能问题|

- classList 属性

|description|
|:----:|
|新集合类型 *DOMTokenList* 的实例|
|length 属性|
|`item()`方法，方括号语法|

|方法|描述|
|:---:|:---:|
|`add(value)`|将给定的字符串值添加到列表中。如果值已经存在，就不添加了|
|`contains(value)`|表示列表中是否存在给定的值，如果存在则返回 true，否则返回 false|
|`remove(value)`|从列表中删除给定的字符串|
|`toggle(value)`|如果列表中已经存在给定的值，删除它;如果列表中没有给定的值，添加它|

example:

```javascript
//切换"user"类 div.classList.toggle("user");
//确定元素中是否包含既定的类名
if (div.classList.contains("bd") && !div.classList.contains("disabled")){}

//切换"user"类 
div.classList.toggle("user");
```

- 焦点管理

|`document.activeElement`|
|:------:|
|始终会引用 DOM 中当前获得了焦点的元素|
|**元素获得焦点的方式有页面加载、用户输入(通常是 通过按 Tab 键)和在代码中调用 focus()方法**|
|文档刚加载完成时，该属性保存的是`document.body`元素的引用|
|文档加载期间，该属性的值为null|

|`document.hasFocus()`|
|:------:|
|用于确定文档是否获得了焦点|

example:

```javascript
var button = document.getElementById("myButton");
button.focus();
alert(document.activeElement === button);   //true

var button = document.getElementById("myButton");
button.focus();
alert(document.hasFocus());  //true
```

- HTMLDocument的变化

|readyState 属性|
|:------:|
| document 对象的属性|
|两个可能的值｜loading，正在加载文档｜complete，已经加载完文档|

|compatMode 的属性|
|:------:|
|告诉开发人员浏览器采用了哪种渲染模式|
|标准模式下："CSS1Compat"，混杂模式："BackCompat"|

|document.head|
|:------:|
|引用文档的`<head>`元素|

- 字符集属性

|charset属性|
|:------:|
|文档中实际使用的字符集，可以用来指定新字符集，默认'utf-16'|
|可以通过`<meta>`元素、响应头部或直接设置 charset 属性修改|

|defaultCharset属性|
|:------:|
|根据默认浏览器及操作系统的设置，当前文档默认的字符集是什么|

- 自定义数据属性

HTML5 规定可以为元素添加非标准的属性，但要添加前缀 `data-`，目的是为元素提供与渲染无关的自定义数据属性信息，或者提供语义信息。这些属性可以任意添加、随便命名，只要以 `data-`开头即可。

添加了自定义属性之后，可以通过元素的 `dataset` 属性来访问自定义属性的值。`dataset` 属性的 值是 DOMStringMap 的一个实例，也就是一个名值对儿的映射。在这个映射中，每个 `data-name` 形式 的属性都会有一个对应的属性，只不过属性名没有 data-前缀。

example:

```javascript
<div id="myDiv" data-appId="12345" data-myname="Nicholas"></div>

//设置值
div.dataset.appId = 23456; 
div.dataset.myname = "Michael";

//有没有"myname"值呢?
if (div.dataset.myname){
    alert("Hello, " + div.dataset.myname);
}
```

- 插入标记

|innerHTML属性|
|:------:|
|读模式，返回与调用元素的**所有子节点**(包括元素、注释和文本节点)对应的HTML标记|
|写模式，根据指定的值创建新的 DOM 树，然后用这个DOM树完全替换调用元素原先的所有子节点|

|outerHTML属性|
|:------:|
|读模式，返回**调用它的元素及所有子节点**的 HTML 标签|
|写模式，根据指定的HTML字符串创建新的DOM子树，然后用这个DOM子树完全替换调用元素|

|`insertAdjacentHTML()`方法|
|:------:|
|它接收两个参数:插入位置和要插入的 HTML 文本|

|第一个参数必须是|描述|
|:------:|
|beforebegin|在当前元素之前插入一个紧邻的同辈元素|
|afterbegin|在当前元素之下插入一个新的子元素或在第一个子元素之前再插入新的子元素|
|beforeend|在当前元素之下插入一个新的子元素或在最后一个子元素之后再插入新的子元素|
|afterend|在当前元素之后插入一个紧邻的同辈元素|

性能问题：

在删除带有事件处理程序或引用了其他JavaScript对象子树时，就有可能导致内存占用问题。<br>
假设某个元素有一个事件处理程序(或者引用了一个JavaScript对象作为属性)，在使用前述某个属性将该元素从文档树中删除后，元素与事件处理程序(或 JavaScript 对象)之间的绑定关系在内存中并没有一并删除。如果这种情况频繁出现，页面占用的内存数量就会明显增加。

- **`scrollIntoView()`方法**

|`scrollIntoView()`方法|
|:------:|
|在所有HTML元素上调用，通过滚动浏览器窗口或某个容器元素，调用元素就可以出现在视口中|
|传入true参数，或者不传入任何参数，那么窗口滚动之后会让调用元素的顶部与视口顶部尽可能平齐|
|传入false作为参数，调用元素会尽可能全部 出现在视口中|

example:

```javascript
//让元素可见 
document.forms[0].scrollIntoView();
```

## 专有扩展

- 文档模式

页面的文档模式决定了可以使用什么功能。

要强制浏览器以某种模式渲染页面，可以使用HTTP头部信息`X-UA-Compatible`，或通过等价的 `<meta>`标签来设置。

通过`document.documentMode`属性可以知道给定页面使用的是什么文档模式。

```html
<meta http-equiv="X-UA-Compatible" content="IE=IEVersion">
```

|children属性|
|:------:|
|只包含元素中同样还是元素的子节点|

|contains()方法|
|:------:|
|知道某个节点是不是另一个节点的后代|
|祖先节点调用|
|接收一个参数，即要检测的后代节点|
|被检测的节点是后代节点，true, 否则，false|

- 插入文本

|innerText属性|
|:------:|
|可以操作元素中包含的所有文本内容，包括子文档树中的文本|
|读取值时，它会按照由浅入深的顺序|
|通过 innerText 写入值时，结果会删除元素的所有子节点，插入包含相应文本值的文本节点|
|设置 innerText 永远只会生成当前节点的一个子文本节点|

|outerText属性|
|:------:|
|读取文本值时，outerText 与 innerText 的结果完全一样|
|写模式，替换整个元素(包括子节点)|
|通过 innerText 写入值时，结果会删除元素的所有子节点，插入包含相应文本值的文本节点|
|设置 innerText 永远只会生成当前节点的一个子文本节点|

example:

```javascript
div.innerText = "Hello world!";

div.outerText = "Hello world!";
// 这行代码实际上相当于如下两行代码:
var text = document.createTextNode("Hello world!");
div.parentNode.replaceChild(text, div);
```

- 滚动

> 对 HTMLElement 类型的扩展，因此在所有元素中都可以调用。
> `scrollIntoView()`和`scrollIntoViewIfNeeded()`的作用对象是元素的容器，而 `scrollByLines()`和`scrollByPages()`影响的则是元素自身。

|name|description|parameter|fit|
|:------:|:------:|:------:|:------:|
|scrollIntoViewIfNeeded(alignCenter)|只在当前元素在视口中不可见的情况下，才滚 动浏览器窗口或容器元素，最终让它可见。如果当前元素在视口中可见，这个方法什么也不做|可选的 alignCenter 参数设置为 true，则表示尽量将元素显示在视口中部(垂直方向)|Safari 和 Chrome|
|scrollByLines(lineCount)|将元素的内容滚动指定的行高|正负均可|Safari 和 Chrome|
|scrollByPages(pageCount)|将元素的内容滚动指定的页面高度，具体高度由元素的高度决 定|none|Safari 和 Chrome|
