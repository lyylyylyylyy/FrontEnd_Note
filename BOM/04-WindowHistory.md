# 前言

window.history 对象**包含浏览器历史**。

## Window History

window.history 对象可不带 window 书写。

**为了保护用户的隐私，JavaScript 访问此对象存在限制**。

一些方法：
- history.back() - 等同于在浏览器点击后退按钮
- history.forward() - 等同于在浏览器中点击前进按钮

## Window History Back

history.back() 方法加载历史列表中前一个 URL。

这等同于在浏览器中点击后退按钮。

实例

在页面中创建后退按钮：

```
<html>
<head>
<script>
function goBack() {
    window.history.back()
 }
</script>
</head>
<body>

<input type="button" value="Back" onclick="goBack()">

</body>
</html>
```

## Window History Forward

history forward() 方法加载历史列表中下一个 URL。

这等同于在浏览器中点击前进按钮。

实例

在页面中创建前进按钮：

```
<html>
<head>
<script>
function goForward() {
    window.history.forward()
 }
</script>
</head>
<body>

<input type="button" value="Forward" onclick="goForward()">

</body>
</html>
```
