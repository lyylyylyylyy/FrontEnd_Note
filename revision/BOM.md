全部变量成为window的属性

全局变量[[Configurable]]不能通过delete操作符删除，直接在window对象上的定义的属性可以

页面中包含框架，每个框架都有window，保存在frames中

top对象始终指向最外层的框架，即浏览器窗口

parent：框架的直接父框架

- screenLeft
- screenRight
- moveTo
- moveBy
- resizeTo
- resizeBy

- innerWidth
- innerHeight
- outerWidth
- outerHeight

window.open()
- 4个参数
- 返回新窗口的引用

window.close()

location：既是window的属性也是document的属性
- hash
- host
- pathname
- search：问号直到结尾
- href
- hostname
- port
- protocol

location.assign(url):
- 立即打开新的url，并在浏览器历史记录中生成一条记录
- location.href效果相同

location.replace(url):
- 不会在历史记录中生成新纪录，不能后退

location.reload():
- 重新加载页面
- 以最有效的方式重新加载，未改变从缓存
- 参数传true，强制从浏览器中加载

navigator对象
- 关于客户端浏览器的一些信息

navigator.plugins：
- 访问浏览器插件，是一个数组
- 属性：name、decription、filename、length
- 最好针对每个插件分别创建检测函数

- registerContentHandler()
- registerProtocolHandler()

- history.go()：若是传递一个字符串，会跳到历史记录中包含该字符串的第一个位置
- history.back()
- history.forward()
- history.length：历史记录的数量