1. 拖拽

```html
<!DOCTYPE html>
<html lang="zh">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>拖拽盒子</title>
    <style>
        body {
            height: 100%;
        }

        div {
            position: absolute;
            left: 0;
            right: 0;
            width: 200px;
            height: 200px;
            background-color: lightskyblue;
        }
    </style>
</head>

<body>
    <div></div>
    <script>
        var div = document.querySelector('div');

        div.addEventListener('mousedown', function (e) {
            var x = e.pageX - div.offsetLeft;
            var y = e.pageY - div.offsetTop;

            document.addEventListener('mousemove', move);
            
            function move(e1) {
                div.style.left = (e1.pageX - x) + 'px';
                div.style.top = (e1.pageY - y) + 'px';
            }

            document.addEventListener('mouseup', function () {
                document.removeEventListener('mousemove', move);
            });
        });
    </script>
</body>

</html>

```

2. 轮播图

3. 两栏式布局

4. 三栏式布局

5. CSS实现三角形

6. 水平垂直居中

7. 三列等高布局

三列等高布局可能是我们平时开发中用的比较多的布局, 因为有时为了美观必须让三列等高, 但是我们的div又是被内容撑开的, 不能提前设置高度, 这时候就需要我们利用一些骚操作。不过在flex布局出来以后, 这个问题就变得很简单了, 我们后面再介绍。

- 多列等高布局的一个解决思路就是：先给几个子元素设置一个比较大的padding-bottom和一个等值的负数margin-bottom，也就是相当于在父元素溢出了，这时候再从父元素那里设置overflow:hidden，就可以裁剪掉溢出的部分。
- display：flex即可

8. 移动端滑动翻页

9. 实现一个朋友圈那种一张图片占全部，两张图片分开，三张多张平铺的自适应。

10. 图片大小百分比，怎么把图片搞成正方形，纯CSS

11. CSS百分比padding与宽度自适应图片布局

![参考](https://www.zhangxinxu.com/wordpress/2017/08/css-percent-padding-image-layout/)

12. 瀑布流

![参考](https://segmentfault.com/a/1190000016255824)

13. 滚动条懒加载

14. 图片懒加载