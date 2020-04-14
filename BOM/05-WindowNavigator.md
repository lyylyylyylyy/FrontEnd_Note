# 前言

window.navigator 对象**包含有关访问者的信息**。

## Window Navigator

window.navigator 对象可以不带 window 前缀来写。

一些例子：

- navigator.appName
- navigator.appCodeName
- navigator.platform

## 浏览器 Cookie

cookieEnabled 属性返回 true，如果 cookie 已启用，否则返回 false：

实例

```
<p id="demo"></p>

<script>
document.getElementById("demo").innerHTML = "cookiesEnabled is " + navigator.cookieEnabled;
</script>
```

## 浏览器应用程序名称

appName 属性返回浏览器的应用程序名称.

## 浏览器应用程序代码名称

appCodeName 属性返回浏览器的应用程序代码名称：

实例
```
<p id="demo"></p>

<script>
document.getElementById("demo").innerHTML = "navigator.appCodeName is " + navigator.appCodeName;
</script>
```

"Mozilla" 是 Chrome、Firefox、IE、Safari 以及 Opera 的应用程序代码名称。

## 浏览器引擎

product 属性返回浏览器引擎的产品名称：

实例
```
<p id="demo"></p>

<script>
document.getElementById("demo").innerHTML = "navigator.product is " + navigator.product;
</script>
```

## 浏览器版本

appVersion 属性返回有关浏览器的版本信息.

## 浏览器代理

userAgent 属性返回由浏览器发送到服务器的用户代理报头（user-agent header）.

#### 来自 navigator 对象的信息通常是误导性的，不应该用于检测浏览器版本，因为：

- 不同浏览器能够使用相同名称
- 导航数据可被浏览器拥有者更改
- 某些浏览器会错误标识自身以绕过站点测试
- 浏览器无法报告发布晚于浏览器的新操作系统

## 浏览器平台

platform 属性返回浏览器平台（操作系统）.

## 浏览器语
language 属性返回浏览器语言.

## 浏览器是否在线？
onLine 属性返回 true，假如浏览器在线.

## Java 是否启用？

javaEnabled() 方法返回 true，如果 Java 已启用：