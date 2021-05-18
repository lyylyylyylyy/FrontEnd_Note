## 本文主要内容

- 头标签
- 排版标签：`<p>`、 `<div>`、 `<span>`、`<br>` 、 `<hr>` 、 `<center>` 、 `<pre>`
- 字体标记：`<h1>`、 `<font>`、 `<b>`、 `<u>` 、`<sup>` 、`<sub>`
- 超链接 `<a>`
- 图片标签 `<img>`

**Web 前端分三层**：

- HTML：HyperText Markup Language（超文本标记语言）。从**语义**的角度描述页面的**结构**。相当于人的身体结构。
- CSS：Cascading Style Sheets（层叠样式表）。从**审美**的角度美化页面的**样式**。相当于人的衣服。
- JS：JavaScript。从**交互**的角度描述页面的**行为**。相当于人的动作，让人有生命力。


# **1. HTML结构详解**

> 备注：
> - 所有的浏览器默认情况下都会忽略空格和空行
> - 每个标签都有私有属性。也都有公有属性。
> - html中表示长度的单位都是**像素**。HTML只有一种单位就是像素。

HTML标签通常是成对出现的（<font color="blue">**双边标记**</font>），比如 `<div>` 和 `</div>`，也有单独呈现的标签（<font color="blue">**单边标记**</font>），如：`<br />`、`<hr />`和`<img src="images/1.jpg" />`等。

属性与标记之间、各属性之间需要以空格隔开。属性值以双引号括起来。

### 快速生成 html 的骨架

新建 html 文件，输入`html:5`，按 `Tab`键后，自动生成的代码如下：

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="Content-Type" content="text/html;charset=UTF-8">
    <title>Document</title>
</head>
<body>

</body>
</html>

```


### 1、文档声明头


任何一个标准的HTML页面，第一行一定是一个以`<!DOCTYPE ……>`开头的语句。h5仅规定了一种。

这一行，就是文档声明头，*DocType Declaration*，简称DTD。**此标签可告知浏览器文档使用哪种 HTML 或 XHTML 规范**。`<!DOCTYPE ……>`是严格模式。

#### HTML4.01有哪些规范呢？

**HTML4.01**这个版本是IE6开始兼容的。**HTML5是IE9开开始兼容的**。如今，手机、移动端的网页，就可以使用HTML5了，因为其兼容性更高。

HTML4.01里面规定了**普通**和**XHTML**两大种规范。HTML觉得自己有一些规定不严谨，比如，标签是否可以用大写字母呢？`<H1></H1>`所以，HTML就觉得，把一些规范严格的标准，又制定了一个XHTML1.0。*在XHTML中的字母X，表示“严格的”*。

总结一下，HTML4.01一共有6种DTD。说白了，HTML的第一行语句一共有6种情况：

三种小规范进行解释：

- **strict**：表示“严格的”，这种模式里面的要求更为严格。这种严格体现在哪里？有一些标签不能使用。
比如，u标签，就是给一个本文加下划线，但是这和HTML的本质有冲突，因为HTML只能负责语义，不能负责样式，而u这个下划线是样式。所以，在strict中是不能使用u标签的。
那怎么给文本增加下划线呢？今后的css将使用css属性来解决。
那么，XHTML1.0更为严格，因为这个体系本身规定比如标签必须是小写字母、必须严格闭合标签、必须使用引号引起属性等等。

- **Transitional**：表示“普通的”，这种模式就是没有一些别的规范。

- **Frameset**：表示“框架”，在框架的页面使用。

在sublime输入的html:xt，x表示XHTML，t表示transitional。

**在HTML5中极大的简化了DTD，也就是说HTML5中就没有XHTML了**：

```
<!DOCTYPE html>
```

### 2、头标签

#### html5 的比较完整的骨架：
html的结构主要分为两大部分：head、body。关于网页的描述都应该放入head标签，网页的内容都应该放入body标签。比如link、meta、title和style都应该放入head标签。
这是网页布局的一个例子：
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
	<meta http-equiv="Content-Type" content="text/html;charset=UTF-8">
	<meta name="Author" content="">
    <meta name="Keywords" content="牛逼，很牛逼，特别牛逼" />
    <meta name="Description" content="网易是中国领先的互联网技术公司，为用户提供免费邮箱、游戏、搜索引擎服务，开设新闻、娱乐、体育等30多个内容频道，及博客、视频、论坛等互动交流，网聚人的力量。" />
    <title>Document</title>
</head>
<body>

</body>
</html>
```

面试题：

- 问：网页的head标签里面，表示的是页面的配置，有什么配置？
- 答：字符集、关键词、页面描述、页面标题、IE适配、视口、iPhone小图标等等。

头标签都放在<head></head>头部分之间。包括：`<title>`、`<base>`、`<meta>`、`<link>`

 - `<title>`：指定整个网页的标题，在浏览器最上方显示。
 - `<base>`：为页面上的所有链接规定默认地址或默认目标。
 - `<meta>`：提供有关页面的基本信息
 - `<body>`：用于定义HTML文档所要显示的内容，也称为主体标签。我们所写的代码必须放在此标签內。
 - `<link>`：定义文档与外部资源的关系。

**meta 标签**：

上面的`<meta>`标签都不用记，但是另外还有一个`<meta>`标签是需要记住的：

```html
<meta http-equiv="refresh" content="3;http://www.baidu.com">
```
上面这个标签的意思是说，3秒之后，自动跳转到百度页面。

常见的几种 meta 标签如下：

（1）字符集 charset：

```html
<meta http-equiv="Content-Type" content="text/html;charset=UTF-8">
```

字符集用meta标签中的`charset`定义，meta表示“元”。“元”配置，就是表示基本的配置项目。

charset就是charactor set（即“字符集”）。

浏览器就是通过meta来看网页是什么字符集的。比如你保存的时候，meta写的和声明的不匹配，那么浏览器就是乱码。


（2）视口 viewport：

```html
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
```

`width=device-width` ：表示视口宽度等于屏幕宽度。

viewport 这个知识点，初学者还比较难理解，以后学 Web 移动端的时候会用到。

（2）定义“关键词”：

举例如下：

```html
<meta name="Keywords" content="网易,邮箱,游戏,新闻,体育,娱乐,女性,亚运,论坛,短信" />
```

这些关键词，就是告诉搜索引擎，这个网页是干嘛的，能够提高搜索命中率。让别人能够找到你，搜索到你。

（3）定义“页面描述”：

meta除了可以设置字符集，还可以设置关键字和页面描述。

只要设置Description页面描述，那么百度搜索结果，就能够显示这些语句，这个技术叫做**SEO**（search engine optimization，搜索引擎优化）。

设置页面描述的举例：

```html
<meta name="Description" content="网易是中国领先的互联网技术公司，为用户提供免费邮箱、游戏、搜索引擎服务，开设新闻、娱乐、体育等30多个内容频道，及博客、视频、论坛等互动交流，网聚人的力量。" />
```

**title 标签**:

用于设置网页标题：

```html
	<title>网页的标题</title>
```
title也是有助于SEO搜索引擎优化的。

**base标签**：

```html
<base href="/">
```

base 标签用于指定基础的路径。指定之后，所有的 a 链接都是以这个路径为基准。

### 3、`<body>`标签的属性

其属性有：
 - `bgcolor`：设置整个网页的背景颜色。
 - `background`：设置整个网页的背景图片。
 - `text`：设置网页中的文本颜色。
 - `leftmargin`：网页的左边距。IE浏览器默认是8个像素。
 - `topmargin`：网页的上边距。
 - `rightmargin`：网页的右边距。
 - `bottommargin`：网页的下边距。

`<body>`标签另外还有一些属性：

> `link`属性表示默认显示的颜色、`alink`属性表示鼠标点击但是还没有松开时的颜色、`vlink`属性表示点击完成之后显示的颜色。

接下来，我们讲一下`<body>`里的各种标签的属性。

## 一、排版标签

### 注释标签

```html
<!-- 注释  -->
```

### 段落标签`<p>`

```html
<p>This is a paragraph</p>
<p>This is another paragraph</p>
```

属性：
 - `align="属性值"`：对齐方式。属性值包括left center right。

<br>

> 段落，是英语paragraph“段落”缩写。

HTML标签是分等级的，HTML将所有的标签分为两种：

- **文本级标签**：p、span、a、b、i、u、em。文本级标签里只能放**文字、图片、表单元素**。（a标签里不能放a和input）

- **容器级标签**：div、h系列、li、dt、dd。容器级标签里可以放置任何东西。


从学习p的第一天开始，就要死死记住：**p标签是一个文本级标签，p里面只能放文字、图片、表单元素**。其他的一律不能放。

错误写法：（尝试把 h 放到 p 里）

```html
	<p>
		我是一个小段落
		<h1>我是一级标题</h1>
	</p>
```

### 块级标签 `<div>`和`<span>`

> div和span是非常重要的标签，div的语义是division“分割”； span的语义就是span“范围、跨度”。

>CSS课程中你将知道，这两个东西，都是最最重要的“盒子”。

div：把标签中的内容作为一个块儿来对待(division)。必须单独占据一行。

div标签的属性：
 - `align="属性值"`：设置块儿的位置。属性值可选择：left、right、 center。

<br>

**`<span>`和`<div>`唯一的区别在于**：`<span>`是不换行的，而`<div>`是换行的。

如果单独在网页中插入这两个元素，不会对页面产生任何的影响。这两个元素是专门为定义CSS样式而生的。或者说，DIV+CSS来实现各种样式。


div在浏览器中，默认是不会增加任何的效果的，但是语义变了，div中的所有元素是一个小区域。
div标签是一个**容器级**标签，里面什么都能放，甚至可以放div自己。

span也是表达“小区域、小跨度”的标签，但是是一个**文本级**的标签。
> 就是说，span里面只能放置文字、图片、表单元素。 span里面不能放p、h、ul、dl、ol、div。

span里面是放置小元素的，div里面放置大东西的。举例如下：

span举例：

```html
			<p>
				简介简介简介简介简介简介简介简介
				<span>
					<a href="">详细信息</a>
					<a href="">购买</a>
				</span>
			</p>

```

div举例：

```html
	<div class="header">
		<div class="logo"></div>
		<div class="nav"></div>
	</div>
	<div class="content">
		<div class="guanggao"></div>
		<div class="dongxi"></div>
	</div>
	<div class="footer"></div>

```

所以，我们亲切的称呼这种模式叫做“**div+css**”。**div标签负责布局，负责结构，负责分块。css负责样式**。

<br>

### 内容居中标签 `<center>`

此时center代表是一个标签，而不是一个属性值了。只要是在这个标签里面的内容，都会居于浏览器的中间。
效果演示：

到了H5里面，center标签不建议使用。

<br>

### 预定义（预格式化）标签：`<pre>`

含义：将保留其中的所有的空白字符(空格、换行符)，原封不动的输出结果（告诉浏览器不要忽略空格和空行）
说明：真正排网页过程中，`<pre>`标签几乎用不着。但在PHP中用于打印一个数组时使用。

为什么要有`<pre>`这个标签呢？答案是：
>  所有的浏览器默认情况下都会忽略空格和空行。
> 
<br>

## 二、字体标签

### 标题

标题使用`<h1>`至`<h6>`标签进行定义。`<h1>`定义最大的标题，`<h6>`定义最小的标题。具有align属性，属性值可以是：left、center、right。


### 特殊字符（转义字符）

- `&nbsp;`：空格	（non-breaking spacing，不断打空格）
- `&lt;`：小于号（less than）
-  `&gt;`：大于号（greater than）
- `&amp;`：符号`&`
- `&quot;`：双引号
- `&apos;`：单引号
- `&copy;`：版权`©`
- `&trade;`：商标`™`
-  `&#32464;`：文字`绐`。其实，`#32464`是汉字`绐`的unicode编码。

要求背诵的特殊字符有：`&nbsp;`、`&lt;`、`&gt;`、`&copy;`。


比如说，你想把`<p>`作为一个文本在页面上显示，直接写`<p>`是肯定不行的，因为这代表的是一个段落标签，所以这里需要用到**转义字符**。应该这么写：
```html
这是一个HTML语言的&lt;p&gt;标签
```

来一张表格，方便需要的时候查询：

| 特殊字符 | 描述 |字符的代码 |
|:-------------|:-------------|:-----|
||空格符|`&nbsp;`|
|<|小于号|`&lt;`|
|> |大于号|`&gt;`|
|&|和号|`&amp;`|
|￥|人民币|`&yen;`|
|©|版权|`&copy;`|
|®|注册商标|`&reg;`|
|°|摄氏度|`&deg;`|
|±|正负号|`&plusmn;`|
|×|乘号|`&times;`|
|÷|除号|`&divide;`|
|²|平方2（上标2）|`&sup2;`|
|³|立方3（上标3）|`&sup3;`|

### 一些小标签/小标记

- `<u>`：下划线标记

- `<s>`或`<del>`：中划线标记（删除线）

- `<i>`或`<em>`：斜体标记


### 粗体标签`<b>`或`<strong>`（已废弃）


<br>

### 上标`<sup>`   下标`<sub>`

上小标这两个标签容易混淆，怎么记呢？这样记：`b`的意思是`bottom：底部`
举例：
```html
O<sup>2</sup>    5<sub>3</sub>
```

## 三、超链接

超链接有三种形式：

**1、外部链接**：链接到外部文件。举例：
```html
<a href="02页面.html">点击进入另外一个文件</a>
```

a是英语`anchor`“锚”的意思，就好像这个页面往另一个页面扔出了一个锚。是一个文本级的标签。

href是英语`hypertext reference`超文本地址的缩写。



**2、锚链接**：
指给超链接起一个名字，作用是**在本页面或者其他页面的的不同位置进行跳转**。比如说，在网页底部有一个向上箭头，点击箭头后回到顶部，这个就是利用到了锚链接。
设置锚点的href属性值为井号#加上想跳转区域对应的id属性值，这样就可以创建一个内部跳转。

```html
<a href="#contacts-header">Contacts</a>
...
<h2 id="contacts-header">Contacts</h2>
```
当用户点击了Contacts链接，页面就会跳转到网页的Contacts区域。
<br>

**3、邮件链接**：

代码举例：
```html
<a href="mailto:smyhvae@163.com">点击进入我的邮箱</a>
```
效果：点击之后，会弹出outlook。

### 超链接的属性

- `href`：目标URL
- `title`：悬停文本。
- `name`：主要用于设置一个锚点的名称。
- `target`：告诉浏览器用什么方式来打开目标页面。`target`属性有以下几个值：
	- `_self`：在同一个网页中显示（默认值）
	- `_blank`：**在新的窗口中打开**。
	- `_parent`：在父窗口中显示
	- `_top`：在顶级窗口中显示



`title`属性举例：

```html
<a href="09_img.html" title="很好看哦">结婚照</a>
```



`target`属性举例：

```html
<a href="1.html" title="悬停文本" target="_blank">链接的内容</a>
```

blank就是“空白”的意思，就表示新建一个空白窗口。为啥有一个_ ，就是规定，没啥好解释的。
也就是说，如果不写`target=”_blank”`那么就是在相同的标签页打开，如果写了`target=”_blank”`，就是在新的空白标签页中打开。

#### 备注1：分清楚img和a标签的各自的属性

区别如下：

```html
<img src="1.jpg" />
<a href="1.html"></a>
```
#### 备注2：a是一个文本级的标签

比如一个段落中的所有文字都能够被点击，那么应该是p包裹a：

```html
<p>
	<a href="">段落段落段落段落段落段落</a>
</p>
```

而不是a包裹p：

```html
<a href="">
	<p>
		段落段落段落段落段落段落
	</p>
</a>
```

a的语义要小于p，a就是可以当做文本来处理，所以p里面相当于放的就是纯文字。

## 四、图片标签

img: 代表的就是一张图片。是单边标记。

img是自封闭标签，也称为单标签。

#### 能插入的图片类型：

- 能够插入的图片类型是：jpg(jpeg)、gif、png、bmp。

- 不能往网页中插入的图片格式是：psd、ai

> HTML页面不是直接插入图片，而是插入图片的引用地址，所以也要把图片上传到服务器上。

### `src`属性：图片的相对路径和绝对路径

这里涉及到图片的一个属性：

 - `src`属性：指图片的路径。

在写**图片的路径**时，有两种写法：相对路径、绝对路径

#### 1、**写法一：相对路径**

相对当前页面所在的路径。两个标记 `.` 和 `..` 分表代表当前目录和父路径。

举例1：

```html
<!-- 当前目录中的图片 -->
<img src="2.jpg">
<img src="./2.jpg">
<!-- 上一级目录中的图片 -->
<img src="../2.jpg">
```

img 是image“图片”的简写，src 是英语source“资源”的缩写。

相对路径不会出现这种情况：

```html
aaa/../bbb/1.jpg
```

`../`要么不写，要么就写在开头。

举例2：

```html
<img src="images/1.jpg">
```
上方代码的意思是说，当前页面有一个并列的文件夹`images`，在文件夹`images`中存放了一张图片`1.jpg`

问题：如果想在index.html中插入1.png，那么对应的img语句是？

分析：

现在document是最大的文件夹，里面有两个文件夹work和photo。work中又有一个文件夹叫做myweb。myweb文件夹里面有index.html。  所以index.html在myweb文件夹里面，上一级就是work文件夹，上两级就是document文件夹。通过document文件夹当做一个中转站，进入photo文件夹，看到了1.png。

答案：

```html
<img src="../../photo/1.png" />
```

#### 2、写法二：**绝对路径**

绝对路径包括以下两种：

（1）以盘符开始的绝对路径。举例：

```html
<img src="C:\Users\smyhvae\Desktop\html\images\1.jpg">
```

（2）网络路径。举例：

```html
<img src="https://inews.gtimg.com/newsapp_bt/0/10203863445/1000">
```


### 相对路径和绝对路径的总结

相对路径的好处：站点不管拷贝到哪里，文件和图片的相对路径关系都是不变的。
相对路径使用有一个前提，就是网页文件和你的图片，必须在一个服务器上。


### img标签的其他属性

 - `width`：宽度
 - `height`：高度
 - `align`：指图片的水平对齐方式，属性值可以是：left、center、right
 - `title`：**提示性文本**。公有属性。也就是鼠标悬停时出现的文本。
 - `border`：给图片加边框（描边），单位是像素，边框的颜色是黑色
 - `Hspace`：指图片左右的边距
 - `Vspace`：指图片上下的边距

 - `alt`：当图片不可用（无法显示）的时候，代替图片显示的内容。alt是英语 alternate “替代”的意思，代表替换资源。（有的浏览器不支持）

举例：
```html
<img src="images/1.jpg" width="300" height="`188" title="这是美女">
```

 - 图片的`align`属性：**图片和周围文字的相对位置**。属性取值可以是：bottom（默认）、center、top、left、right。
我们来分别看一下这`align`属性的这几个属性值的区别。

1、`align=""`，图片和文字低端对齐。即默认情况下的显示效果。

2、`align="center"`：图片和文字水平方向上居中对齐。

3、`align="top"`：图片与文字顶端对齐。

4、`align="left"`：图片在文字的左边。

5、`align="right"`：图片在文字的右边。

**注意事项：**
（1）如果要想保证图片等比例缩放，请只设置width和height中其中一个。
（2）如果想实现图文混排的效果，请使用align属性，取值为left或right。

你可以通过把元素嵌套进锚点里使其变成一个链接。

把你的图片嵌套进锚点。举例如下：

把锚点的href属性设置为#，就可以创建固定链接。
```html
<a href="#"><img src="http://cdn.chenzhicheng.com/running-cats.jpg" alt="三只萌萌的小猫"></a>
```
