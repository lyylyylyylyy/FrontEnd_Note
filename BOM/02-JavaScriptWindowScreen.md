# 前言

**window.screen 对象包含用户屏幕的信息。**

## Window Screen

window.screen 对象不带 window 前缀也可以写：

属性：
- screen.width
- screen.height
- screen.availWidth
- screen.availHeight
- screen.colorDepth
- screen.pixelDepth

## Window Screen 宽度

screen.width 属性返回以像素计的访问者屏幕宽度。

**实例**

显示以像素计的屏幕宽度：

```
document.getElementById("demo").innerHTML = "Screen Width: " + screen.width;
```

结果将是：

Screen Width: 1536


## Window Screen 高度

screen.height 属性返回以像素计的访问者屏幕的高度。

实例

显示以像素计的屏幕高度：
```
document.getElementById("demo").innerHTML = "Screen Height: " + screen.height;
```

结果将是：

Screen Height: 864

## Window Screen 可用宽度

screen.availWidth 属性返回访问者屏幕的宽度，以像素计，减去诸如窗口工具条之类的界面特征。

实例

显示以像素计的屏幕可用宽度：

```
document.getElementById("demo").innerHTML = "Available Screen Width: " + screen.availWidth;
```
结果将是：

Available Screen Width: 1536

## Window Screen 可用高度

screen.availHeight 属性返回访问者屏幕的高度，以像素计，减去诸如窗口工具条之类的界面特征。

实例

显示以像素计的屏幕可用高度：
```
document.getElementById("demo").innerHTML = "Available Screen Height: " + screen.availHeight;
```

结果将是：

Available Screen Height: 864

## Window Screen 色深

screen.colorDepth 属性返回用于显示一种颜色的比特数。

所有现代计算机都使用 24 位或 32 位硬件的色彩分辨率：

-24 bits =16,777,216 种不同的 "True Colors"
- 32 bits = 4,294,967,296 中不同的 "Deep Colors"
  
更老的计算机使用 14 位：65,536 种不同的 "High Colors" 分辨率。

异常古老的计算机，以及老式的手机使用 8 位：256 中不同的 "VGA colors"。

实例

显示以位计的屏幕色彩深度：

```document.getElementById("demo").innerHTML = "Screen Color Depth: " + screen.colorDepth;```

结果将是：

Screen Color Depth: 24

## Window Screen 像素深度

screen.pixelDepth 属性返回屏幕的像素深度。

实例

显示以位计的屏幕像素深度：

````document.getElementById("demo").innerHTML = "Screen Pixel Depth: " + screen.pixelDepth;````

结果将是：

Screen Pixel Depth: 24

对于现代计算机，颜色深度和像素深度是相等的。