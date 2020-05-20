## 前言

本章会说明在没有导致Web浏览器重新加载任何窗口或窗体的内容情况下，脚本如何实现Web浏览器与服务器之间的通信。

术语Ajax描述了一种主要使用脚本操纵HTTP的Web应用架构。Ajax应用的主要特点是使用脚本操纵HTTP和Web服务器进行数据交换，不会导致页面重载。Web应用可以使用Ajax技术把用户的交互数据记录到服务器中，也可以开始只显示简单页面，之后按需加载额外的数据和页面组件来提升应用的启动时间。

Comet是和使用脚本操纵HTTP的Web应用架构相关的术语。某种意义上，Comet和Ajax相反。在Ajax中，客户端从服务端“拉”数据，而在Comet中，服务端向客户端“推”数据。

实际上，`<script>`元素的src属性能设置URL并发起 HTTP GET请求。`<script>`**可以跨域通信而不受限于同源策略**。通常，使用基于`<script>`的Ajax传输协议时，**服务器的响应采用JSON编码的数据格式**，当执行脚本时，JavaScript解析器能自动将其解码。由于它使用JSON数据格式，因此这种**Ajax传输协议也叫JSONP**。

所有浏览器都支持XMLHttpRequest对象，它定义了使用脚本操纵HTTP的api，它可以使用get和post，同时能获取任何类型的文本文档。

## 使用XMLHttpRequest

- **使用这个HTTP API必须做的第一件事就是实例化XMLHttpRequest对象**
```
var resuest = new XMLHttpRequest();
```
> 可以重用已经存在的XMLHttpRequest，但是注意这将会终止之前通过该对象挂起的任何请求。

- 一个HTTP请求由4个部分组成
  - HTTP请求方法
  - 正在请求的url
  - 一个可选的请求头集合，其中可能包含身份验证信息
  - 一个可选的请求主体
- 服务器返回的HTTP响应包括3部分
  - 一个数字和文字组成的状态码，用来显示请求的成功和失败
  - 一个响应头集合
  - 响应主题

### 指定请求

- 发起HTTP请求的下一步是调用XMLHttpRequest对象的**open()**方法去指定这个**请求的两个必须部分：方法和url**

```
request.open("GET", "data.csv");
```
open()的第一个参数指定HTTP方法，支持“GET”和“POST”请求，也支持把“HEAD”,“DELETE”,“OPTIONS”,“PUT”作为open()的第一个参数。

open()的第二个参数是url。跨域的请求通常会报错。

- 如果有请求头的话，请求进程的下个步骤就是**设置请求头**。
  ```
  request.setRequestHeader("Content-Type", "text/plain");
  ```

- 发起HTTP请求的最后一步是指定可选的请求主体并向服务器发送它，使用`send()`方法。
```
request.send(null);
```

例子：
```
function postMessage(msg) {
    var resuest = new XMLHttpRequest();
    request.open("POST", "./log.php");
    request.setRequestHeader("Content-Type", "text/plain", charset=UTF-8);
    request.send(msg);
}
```

open的第三个参数可以设置同步或异步响应，默认为异步(true)。

### 取得响应

- status和statusText属性以数字和文本的形式返回HTTP状态码。
- 使用getResponseHeader和getAllResponseHeaders能查询响应头。XMLHttpRequest会自动处理cookie。
- 响应主体可以从responseText属性中得到文本形式的，从responseXML中得到Document形式的。
  
XMLHttpRequest对象通常异步使用，发送请求后，send方法立即返回，直到响应返回，相应方法和属性才有效。为了在响应准备就绪时得到通知，必须监听XMLHttpRequest对象上的`readystatechange`事件。

readyState是一个整数，它指定了HTTP请求的状态。表格如下：

|常量|值|定义|
| :------: | :------: |:------: |
|UNSENT|0|open尚未调用|
|OPENED|1|open已调用|
|HEADERS_RECEIVED|2|接收到头信息|
|LOADING|3|接收到响应主体|
|DONE|4|响应完成|

当readyState值变成4时或服务器的响应完成时，所有的浏览器都触发readystatechange事件。

为了监听readystatechange事件，要把事件监听函数设置为XMLHttpRequest对象的onreadystatechange属性。

例子：
```
function getText(url, callback) {
    var resuest = new XMLHttpRequest();
    request.open("GET", "url");

    request.onreadystatechange = function() {
        if (request.readyState === 4 && request.status === 200) {
            var type = request.getResponseHeader("Conteng-Type");
            if (type.match(/^text^/)) callback(request.responseText);
        }
    }
}
```


