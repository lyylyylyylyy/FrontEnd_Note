var xhr = new XMLHttpRequest()

xhr的用法；
- xhr.open()：3个参数
  - 请求类型、url，是否异步
  - 发送请求，要调用send()方法，参数为请求主体发送的数据

响应数据
- responseText：响应主体内容
- responseXML
- status：响应http状态，200作为成功的标志，304表示请求的资源没有修改，可以直接使用浏览器中缓存的版本
- statusText：http状态的说明

xhr的readystate属性：
- 1
- 2
- 3
- 4：完成

readystate改变就会触发readystatechange事件

http头
- setRequestHeader()

load事件：
- 可以替代readystatechange事件
- 响应完毕后触发

跨域资源共享CORS
- ajax的限制，跨域安全策略
- 基本思想：使用自定义的HTTP头部让浏览器与服务器进行沟通，从而决定请求是否应该成功
- 发送请求时，给他附加一个额外的Origin头部，包含请求的源信息(协议、域名和端口)，以便服务器根据这个头部信息决定是否给予响应
- 若是服务器接受这个请求，就在`Access-Control-Allow-Origin`头部中回发相同的源信息
- 要请求位于另一个域中的资源，在open方法中的url设置为绝对url即可
- 跨域xhr的限制：不能setRequestHeader()，请求响应不能携带cookie，头部信息无法访问到

CORS的请求头：
- Origin
- Access-Control-Request-Headers：自定义头部信息
- Access-Control-Request-Method：请求自身的方法

CORS的响应头：
- Access-Control-Allow-Origin
- Access-Control-Allow-Methods：允许的方法，逗号隔开
- Access-Control-Allow-Headers：允许的头部，逗号隔开
- Access-Control-Max-Age：这个请求缓存的时间，秒

默认，跨源请求不携带凭据（cookie，http认证及客户端ssl证明等）：
- withCredentials设置为true，可以指定请求应该发送凭据
- Access-Control-Allow-Credentials:true

其他跨域技术：
- `<img>`加载图片
- JSONP
  - 回调函数：响应到来时在页面中执行的函数
  - 数据：传给回调函数的JSON数据 ——p587
  - 通过动态`<script>`元素使用，src指定一个跨域url(http://..../json/?callback=handleResponse)
- document.domain
- Comet：服务器向页面推送数据
  - 实现：长轮询+流

websockets：
- 全双工、双向通信
- url格式是：ws://      wss://
- 数据包小适合移动应用
- API：
  - new WebSocket(绝对url)
  - readystate属性：0正在连接，1已经连接，2正在关闭，3已经关闭
  - close()
  - send()
- 只能发送纯文本数据，发送前必须进行序列化，stringify
- 读取服务器信息就要解析数据，parse
- 事件：
  - message事件，event.data
  - open
  - error
  - close：wasClean、code、reason