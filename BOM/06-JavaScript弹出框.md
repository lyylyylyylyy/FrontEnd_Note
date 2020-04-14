# 前言

JavaScript 有三种类型的弹出框：**警告框、确认框和提示框**。

## 警告框

如果要确保信息传递给用户，通常会使用警告框。

**当警告框弹出时，用户将需要单击“确定”来继续。**

语法
`window.alert("sometext");`

window.alert() 方法可以不带 window 前缀来写。

实例
`alert("我是一个警告框！");`

## 确认框

如果**您希望用户验证或接受某个东西，则通常使用“确认”框**。

当确认框弹出时，用户将不得不单击“确定”或“取消”来继续进行。

如果用户单击“确定”，该框返回 `true`。如果用户单击“取消”，该框返回 `false`。

语法
`window.confirm("sometext");`

`window.confirm()` 方法可以不带 window 前缀来编写。

实例
```
var r = confirm("请按按钮");
if (r == true) {
    x = "您按了确认！";
} else {
    x = "您按了取消！";
}
```

## 提示框

如果您希望用户在进入页面前输入值，通常会使用提示框。

**当提示框弹出时，用户将不得不输入值后单击“确定”或点击“取消”来继续进行**。

如果用户单击“确定”，该框返回输入值。如果用户单击“取消”，该框返回 NULL。

语法
`window.prompt("sometext","defaultText")`;

window.prompt() 方法可以不带 window 前缀来编写。

实例
```
var person = prompt("请输入您的姓名", "比尔盖茨");
if (person != null) {
    document.getElementById("demo").innerHTML = "你好 " + person + "！今天过的怎么样？";
}
```

## 折行

如需在弹出框中显示折行，请在反斜杠后面加一个字符 `n`。

实例

`alert("Hello\nHow are you?");`