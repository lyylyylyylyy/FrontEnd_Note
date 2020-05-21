# Virtual DOM介绍

Virtual DOM（虚拟DOM）是对DOM的抽象，本质上是JavaScript对象，这个对象就是更加轻量级的对DOM的描述。

例子：

```
真实DOM：
<ul id='list'>
  <li class='item'>itemA</li>
  <li class='item'>itemB</li>
</ul>

虚拟DOM：
{  
    tag:'ul',  // 元素的标签类型
    attrs:{  //  表示指定元素身上的属性
        id:'list'
    },
    children:[  // ul元素的子节点
        {
            tag: 'li',
            attrs:{
                className:'item'
            },
            children:['itemA']
        },
        {   tag: 'li',
            attrs:{
                className:'item'
            },
            children:['itemB']
        }
    ]
}
```

## 虚拟DOM的作用

- 首先，我们都知道在前端性能优化的一个秘诀就是**尽可能少地操作DOM**,不仅仅是DOM操作相对较慢，更因为**频繁变动DOM会造成浏览器的回流或者重绘**，这些都是性能的杀手，因此我们需要这一层抽象，在patch过程中**尽可能地一次性将差异更新到DOM中**，这样保证了DOM不会出现性能很差的情况.
- 现代前端框架的一个基本要求就是无须手动操作DOM,一方面是因为手动操作DOM无法保证程序性能，多人协作的项目中如果review不严格，可能会有开发者写出性能较低的代码，另一方面更重要的是省略手动DOM操作可以大大提高开发效率.
- 打开了函数式UI编程的大门
- 最后，也是Virtual DOM最初的目的，就是更好的跨平台，比如Node.js就没有DOM,如果想实现SSR(服务端渲染),那么一个方式就是借助Virtual DOM,因为Virtual DOM本身是JavaScript对象. 而且在的ReactNative，React VR、weex都是使用了虚拟dom

# Virtual DOM算法

Virtual DOM 算法，包括几个步骤：

- 用 JavaScript 对象结构表示 DOM 树的结构；然后用这个树构建一个真正的 DOM 树，插到文档当中
- 当状态变更的时候，重新构造一棵新的对象树。然后用新的树和旧的树进行比较，记录两棵树差异
- 把第二步所记录的差异应用到步骤1所构建的真正的DOM树上，视图就更新了
  
Virtual DOM 本质上就是在 JS 和 DOM 之间做了一个缓存。可以类比 CPU 和硬盘，既然硬盘这么慢，我们就在它们之间加个缓存：既然 DOM 这么慢，我们就在它们 JS 和 DOM 之间加个缓存。CPU（JS）只操作内存（Virtual DOM），最后的时候再把变更写入硬盘（DOM）。

## 算法实现

### 步骤一：用JS对象模拟DOM树

用 JavaScript 来表示一个 DOM 节点是很简单的事情，你只需要记录它的**节点类型、属性，还有子节点**：

element.js

```
function Element (tagName, props, children) {
  this.tagName = tagName
  this.props = props
  this.children = children
}

module.exports = function (tagName, props, children) {
  return new Element(tagName, props, children)
}
```

例如上面的 DOM 结构就可以简单的表示：
```
var el = require('./element')

var ul = el('ul', {id: 'list'}, [
  el('li', {class: 'item'}, ['Item 1']),
  el('li', {class: 'item'}, ['Item 2']),
  el('li', {class: 'item'}, ['Item 3'])
])
```

现在ul只是一个 JavaScript 对象表示的 DOM 结构，页面上并没有这个结构。我们可以根据这个ul构建真正的`<ul>`：

```
Element.prototype.render = function () {
  var el = document.createElement(this.tagName) // 根据tagName构建
  var props = this.props

  for (var propName in props) { // 设置节点的DOM属性
    var propValue = props[propName]
    el.setAttribute(propName, propValue)
  }

  var children = this.children || []

  children.forEach(function (child) {
    var childEl = (child instanceof Element)
      ? child.render() // 如果子节点也是虚拟DOM，递归构建DOM节点
      : document.createTextNode(child) // 如果字符串，只构建文本节点
    el.appendChild(childEl)
  })

  return el
}
```
render方法会根据tagName构建一个真正的DOM节点，然后设置这个节点的属性，最后递归地把自己的子节点也构建起来。所以只需要：

```
var ulRoot = ul.render()
document.body.appendChild(ulRoot)
```

上面的ulRoot是真正的DOM节点，把它塞入文档中，这样body里面就有了真正的`<ul>`的DOM结构：
```
<ul id='list'>
  <li class='item'>Item 1</li>
  <li class='item'>Item 2</li>
  <li class='item'>Item 3</li>
</ul>
```
完整代码可见 `element.js`。

### 步骤二：比较两棵虚拟DOM树的差异

正如你所预料的，比较两棵DOM树的差异是 Virtual DOM 算法最核心的部分，这也是所谓的 **Virtual DOM 的 diff 算法**。两个树的完全的 diff 算法是一个时间复杂度为 O(n^3) 的问题。但是在前端当中，你很少会跨越层级地移动DOM元素。所以 Virtual DOM 只会对同一个层级的元素进行对比：

![](https://camo.githubusercontent.com/a32766a14f6b7fbe631475ed1a186fbd9de7f2c3/687474703a2f2f6c69766f7261732e6769746875622e696f2f626c6f672f7669727475616c2d646f6d2f636f6d706172652d696e2d6c6576656c2e706e67)

上面的div只会和同一层级的div对比，第二层级的只会跟第二层级对比。这样算法复杂度就可以达到 O(n)。

> 链接：https://github.com/livoras/blog/issues/13