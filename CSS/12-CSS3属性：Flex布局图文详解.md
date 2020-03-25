
### flex 布局的优势

1、**flex 布局的子元素不会脱离文档流**，很好地遵从了“流的特性”。

但你如果用 float 来做布局，float 属性的元素会脱离文档流，而且会涉及到各种 BFC、清除浮动的问题。浮动相关的问题，比较麻烦，所以也成了面试必问的经典题目。但有了 flex 布局之后，这些问题都不存在的。

2、**flex 是一种现代的布局方式，是 W3C 第一次提供真正用于布局的 CSS 规范**。 flex 非常提供了丰富的属性，非常灵活，让布局的实现更佳多样化，且方便易用。

flex 唯一的缺点就在于，它不支持低版本的 IE 浏览器。

### flex 的兼容性问题

flex 布局不支持 IE9 及以下的版本；IE10及以上也只是部分支持。如果你的页面不需要处理 IE浏览器的兼容性问题，则可以放心大胆地使用 flex 布局。


### 概念：弹性盒子、子元素

在讲 flex 的知识点之前，我们事先约定两个概念：

- **弹性盒子**：指的是使用 `display:flex` 或 `display:inline-flex` 声明的**父容器**。

- **子元素/弹性元素**：指的是父容器里面的子元素们（父容器被声明为 flex 盒子的情况下）。

### 概念：主轴和侧轴


- 主轴：flex容器的主轴，默认是水平方向，从左向右。

- 侧轴：与主轴垂直的轴称作侧轴，默认是垂直方向，从上往下。

> 主轴和侧轴并不是固定不变的，可以通过 `flex-direction` 更换方向。

## 弹性盒子

### 声明定义

使用 `display:flex` 或 `display:inline-flex` 声明一个**父容器**为弹性盒子。此时，这个父容器里的子元素们，会遵循弹性布局。

> 一般是用 `display:flex`这个属性。`display:inline-flex`用得较少。

### flex-direction 属性

`flex-direction`：用于设置盒子中**子元素**的排列方向。属性值可以是：

| 属性值 | 描述 |
|:-------------|:-------------|
| row | 从左到右水平排列子元素（默认值） |
|column|从上到下垂直排列子元素|
| row-reverse |从右向左排列子元素 |
|column-reverse|从下到上垂直排列子元素|
<br>

> 如果我们不给父容器写`flex-direction`这个属性，那么，子元素默认就是从左到右排列的。


### flex-wrap 属性

`flex-wrap`：控制子元素溢出时的换行处理。

### justify-content 属性

`justify-content`：控制子元素在主轴上的排列方式。

## 弹性元素

### justify-content 属性

- `justify-content: flex-start;` 设置子元素在**主轴上的对齐方式**。属性值可以是：
    - `flex-start` 从主轴的起点对齐（默认值）
    - `flex-end` 从主轴的终点对齐
    - `center` 居中对齐
    - `space-around` 在父盒子里平分
    - `space-between` 两端对齐 平分



### align-items 属性

`align-items`：设置子元素在**侧轴上的对齐方式**。属性值可以是：
    - `flex-start` 从侧轴开始的方向对齐
    - `flex-end` 从侧轴结束的方向对齐
    - `baseline` 基线 默认同flex-start
    - `center` 中间对齐
    - `stretch` 拉伸

## 总结

| 属性值 | 描述 |
|:-------------|:-------------|
| flex-direction | 设置主轴方向，确定弹性子元素排列方式。|
| flex-wrap | 当弹性子元素超出弹性容器范围时是否换行。|
|flex-flow | flex-direction和flex-wrap属性的快捷方式，复合属性。|
| justify-content|主轴上的对齐方式。|
|align-items|侧轴上的对齐方式。|
|align-content|侧轴上有空白时，侧轴的对齐方式。|

**多列属性**

| 属性值 | 描述 |
|:-------------|:-------------|
|columns|复合属性，设置宽度和列数|
|column-width|设置每列的宽度|
|column-count|设置列数|
|column-gap|设置列之间的间隙|
|column-rule|复合属性(column-rule-width,column-rule-style,column-rule-color)，设置列之间的边框样式|
|column-fill|设置列的高度是否统一|
|column-span|设置是否横跨所有列|


column-width：`<length>` | auto

column-count：`<integer>` | auto

columns：`[column-width]` || `[column-count]`

column-gap: `<integer>` | nomal

column-fill: auto | balance

column-span: none | all

**flex 属性可以指定1个，2个或3个值**。

**单值语法**: 值必须为以下其中之一:

- 一个无单位数(<number>): 它会被当作<flex-grow>的值。
- 一个有效的宽度(width)值: 它会被当作 <flex-basis>的值。
- 关键字none，auto或initial.

**双值语法**: 
- 第一个值必须为一个无单位数，并且它会被当作 <flex-grow> 的值。
- 第二个值必须为以下之一：

- 一个无单位数：它会被当作 <flex-shrink> 的值。
- 一个有效的宽度值: 它会被当作 <flex-basis> 的值。

**三值语法**:

- 第一个值必须为一个无单位数，并且它会被当作 <flex-grow> 的值。
- 第二个值必须为一个无单位数，并且它会被当作  <flex-shrink> 的值。
- 第三个值必须为一个有效的宽度值， 并且它会被当作 <flex-basis> 的值。