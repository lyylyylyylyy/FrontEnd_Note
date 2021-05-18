根结点，文档元素，始终是`<html>`

nodeType、nodeName、nodeValue

DOM结构的变化能自动反映在NodeList中，转换成数组，`Array.prototype.slice.call(somenode.childNodes, 0)`

- childNodes
- parentNode
- previousSibling
- nextSibling
- ownerDocument，指向整个文档的文档节点
- firstChild
- lastChild

- appendChild():最后位置添加，已存在的节点会被移到最后
- insertBefore()
- replaceChild()
- removeChild()
- cloneChild()：参数为布尔值，表示是否深复制，不会复制DOM节点上的JavaScript属性，如事件监听
- nomalize()：后代中找，空文本标签删除，两个连续文本标签合并

document.documentElement: html

- document.title(`<title>`)：浏览器窗口标题栏
- document.URL
- document.domain
  - 浏览器限制跨域，将document.domain设为相同可以通信了
  - 域名一开始是松散的，不能再将他设为紧绷的
- document.referer:链接到当前页面的那个页面的url

- document.getElementById()
- document.getElementByTagName()：返回NodeList
  - namedItem(name)
  - [name]
- document.getElementByName()：场景：获取单选按钮🔘（所有单选按钮必须具有相同的name），返回NodeList

html的属性：
- id
- title
- lang
- dir
- className

操作DOM的特性方法
- getAttribute()
  - 通过getAttribute()访问style时，返回的是CSS文本，通过属性访问才会返回style的对象
  - 访问onclick时，通过getAttribute()访问会返回JavaScript字符串，属性访问才会返回对应的JavaScript代码
  - 综上，所以一般只有访问自定义属性才会使用getAttribute()
- setAttribute()
  - 特性不存在，新建属性设置值
- removeAttribute()
- 根据html5的规范，自定义的特性应该加上`data-`前缀以便验证

element.attributes()
- 类似NodeList
- 可以用来遍历元素的特性
- 每个特性都有一个specified属性，表示特性被定义设置过

document.createElement()
- 创建元素
- 传入一个标签 or 完整的标签
- 返回一个DOM元素的引用

document.createTextNode()
- 接受，要插入节点中的文本

- normalize
- splitText
    - 按照指定位置分割为两个文本节点

动态脚本：
- 页面加载时不存在，将来的某一时刻修改DOM动态添加脚本
- 插入外部文件：能够立即运行
- 直接插入JavaScript代码

动态样式：
- `<link>`: rel、type href，加载外部样式的过程是异步的
- `<style>`