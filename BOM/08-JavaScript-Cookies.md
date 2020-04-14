# 前言

Cookie 让您**在网页中存储用户信息**。

## 什么是 cookie？

Cookie 是在您的计算机上存储在小的文本文件中的数据。

当 web 服务器向浏览器发送网页后，连接被关闭，服务器会忘记用户的一切。

**Cookie 是为了解决“如何记住用户信息”而发明的：**

当用户访问网页时，他的名字可以存储在 cookie 中。
下次用户访问该页面时，cookie 会“记住”他的名字。

Cookie 保存在名称值对中，如：

`username = Bill Gates`

当浏览器从服务器请求一个网页时，将属于该页的 cookie 添加到该请求中。这样服务器就获得了必要的数据来“记住”用户的信息。

如果浏览器已关闭本地 cookie 支持，则以下实例均无法工作。

## 通过 JavaScript 创建 cookie

JavaScript 可以用 `document.cookie` **属性创建、读取、删除 cookie**。

通过 JavaScript，可以这样创建 cookie：

`document.cookie = "username=Bill Gates";`

您还可以添加有效日期expires（UTC 时间）。默认情况下，在浏览器关闭时会删除 cookie：Expires这个是代表当前时间的，这个属性已经逐渐被Max-Age所取代.

`document.cookie = "username=John Doe; expires=Sun, 31 Dec 2017 12:00:00 UTC";`

通过 path 参数，您可以告诉浏览器 cookie 属于什么路径。默认情况下，cookie 属于当前页。
```
document.cookie = "username=Bill Gates; expires=Sun, 31 Dec 2017 12:00:00 UTC; path=/";
```

## 通过 JavaScript 读取 cookie
通过 JavaScript，可以这样读取 cookie：
```
var x = document.cookie;
```

document.cookie 会在一条字符串中返回所有 cookie，比如：cookie1=value; cookie2=value; cookie3=value;

## 通过 JavaScript 改变 cookie

通过使用 JavaScript，你可以像你创建 cookie 一样改变它：

```
document.cookie = "username=Steve Jobs; expires=Sun, 31 Dec 2017 12:00:00 UTC; path=/";
```
旧 cookie 被覆盖。

## 通过 JavaScript 删除 cookie

删除 cookie 非常简单。

删除 cookie 时不必指定 cookie 值：

**直接把 expires 参数设置为过去的日期即可**：
```
document.cookie = "username=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
```

**您应该定义 cookie 路径以确保删除正确的 cookie。**

如果你不指定路径，一些浏览器不会让你删除 cookie。

## Cookie 字符串

document.cookie 属性看起来像一个正常的文本字符串。但它不是。

即使你向 document.cookie 写一份完整的 cookie 字符串，当再次读取时，你只能看到它的名称-值对。

如果设置了新 cookie，则旧的 cookie 不会被覆盖。新的 Cookie 会被添加到 document.cookie，所以如果你读取 document.cookie，你得到的东西会像这样：

`cookie1 = value; cookie2 = value;`

显示所有 cookie 创建 cookie 1 创建 cookie 2 删除 cookie 1 删除 cookie 2
如果你想找到一个指定 cookie 的值，你必须编写 JavaScript 函数来搜索 cookie 字符串中的 cookie 值。

## JavaScript Cookie 实例

在下面的示例中，我们将创建一个 cookie 来存储访问者的名称。

访客第一次到达网页时，会要求他填写姓名。然后将该名称存储在 cookie 中。

下次访客到达同一页时，他将收到一条欢迎消息。

例如，我们将创建 3 个JavaScript函数：

设置 cookie 值的函数

获取 cookie 值的函数

检查 cookie 值的函数

设置 cookie 的函数

首先，我们创建一个函数，将访问者的名字存储在 cookie 变量中：

实例
```
function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    var expires = "expires="+ d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
} 
```

例子解释：

上面这个函数的的参数是：cookie 的名字（cname），cookie 的值（cvalue），以及知道 cookie 过期的天数（exdays）。

通过把 cookie 名称、cookie 值和过期字符串相加，该函数就设置了 cookie。

## 获取 cookie 的函数

然后，我们创建一个函数返回指定 cookie 的值：

实例
```
function getCookie(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for(var i = 0; i <ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
         }
         if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
         }
     }
    return "";
} 
```

函数解释：

把 cookie 作为参数（cname）。

创建变量（name）与要搜索的文本（CNAME”=”）。

解码 cookie 字符串，处理带有特殊字符的 cookie，例如 “$”。

用分号把 document.cookie 拆分到名为 ca（decodedCookie.split(';')）的数组中。

遍历 ca 数组（i = 0; i < ca.length; i++），然后读出每个值 c = ca[i]。

如果找到 cookie（c.indexOf(name) == 0），则返回该 cookie 的值（c.substring(name.length, c.length）。

如果未找到 cookie，则返回 ""。

检测 cookie 的函数
最后，我们创建检查 cookie 是否设置的函数。

如果已设置 cookie，将显示一个问候。

如果未设置 cookie，会显示一个提示框，询问用户的名字，并存储用户名 cookie 365 天，通过调用 setCookie 函数：

实例
```
function checkCookie() {
    var username = getCookie("username");
    if (username != "") {
        alert("Welcome again " + username);
    } else {
        username = prompt("Please enter your name:", "");
        if (username != "" && username != null) {
            setCookie("username", username, 365);
        }
    }
} 
```

现在组合起来

实例
```
function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    var expires = "expires="+d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for(var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
         }
        if (c.indexOf(name)  == 0) {
            return c.substring(name.length, c.length);
         }
    }
    return "";
}

function checkCookie() {
    var user = getCookie("username");
    if (user != "") {
        alert("Welcome again " + user);
    } else {
        user = prompt("Please enter your name:", "");
        if (user != "" && user != null) {
            setCookie("username", user, 365);
        }
    }
}
```