## 元素渲染

- 元素是构成 React 应用的最小砖块。

- 元素描述了你在屏幕上想看到的内容。

- 与浏览器的 DOM 元素不同，React 元素是创建开销极小的普通对象。React DOM 会负责更新 DOM 来与 React 元素保持一致。

### 元素渲染为DOM

假设你的 HTML 文件某处有一个 `<div>`：

`<div id="root"></div>`

我们将其称为“根” DOM 节点，因为该节点内的所有内容都将由 React DOM 管理。

**仅使用 React 构建的应用通常只有单一的根 DOM 节点**。如果你在将 React 集成进一个已有应用，那么你可以在应用中包含任意多的独立根 DOM 节点。

想要将一个 React 元素渲染到根 DOM 节点中，只需把它们一起传入 `ReactDOM.render()`：
```
const element = <h1>Hello, world</h1>;
ReactDOM.render(element, document.getElementById('root'));
```
页面上会展示出 “Hello, world”。

### 更新已渲染的元素

**React 元素是不可变对象**。一旦被创建，你就无法更改它的子元素或者属性。一个元素就像电影的单帧：它代表了某个特定时刻的 UI。

根据我们已有的知识，更新 UI 唯一的方式是创建一个全新的元素，并将其传入 `ReactDOM.render()`。

考虑一个计时器的例子：
```
function tick() {
  const element = (
    <div>
      <h1>Hello, world!</h1>
      <h2>It is {new Date().toLocaleTimeString()}.</h2>
    </div>
  );
  ReactDOM.render(element, document.getElementById('root'));
}

setInterval(tick, 1000);
```

这个例子会在 setInterval() 回调函数，每秒都调用 ReactDOM.render()。

### React 只更新它需要更新的部分

React DOM 会**将元素和它的子元素与它们之前的状态进行比较**，并只会进行必要的更新来使 DOM 达到预期的状态。

## 组件&props

组件允许你将UI拆分为独立可复用的代码片段，并对每个片段进行独立构思。

组件，从概念上类似于JavaScript的函数，它接受任意的入参(即props)，并返回用于描述页面展示内容的React元素。

### 函数组件与class组件

定义组件最简单的方式就是编写 JavaScript 函数：

```
function Welcome(props) {
  return <h1>Hello, {props.name}</h1>;
}
```

该函数是一个有效的 React 组件，因为它接收唯一带有数据的 “props”（代表属性）对象与并返回一个 React 元素。这类组件被称为**函数组件**，因为它本质上就是 JavaScript 函数。

你同时还可以使用 ES6 的 class 来定义组件：
```
class Welcome extends React.Component {
  render() {
    return <h1>Hello, {this.props.name}</h1>;
  }
}
```
上述两个组件在 React 里是等效的。

### 组件渲染

之前，我们遇到的 React 元素都只是 DOM 标签：

`const element = <div />;`

不过，React 元素也可以是用户自定义的组件：

```
const element = <Welcome name="Sara" />;
```

**当 React 元素为用户自定义组件时，它会将 JSX 所接收的属性（attributes）以及子组件（children）转换为单个对象传递给组件，这个对象被称之为 `“props”`。**

例如，这段代码会在页面上渲染 `“Hello, Sara”`：
```
function Welcome(props) {
  return <h1>Hello, {props.name}</h1>;
}

const element = <Welcome name="Sara" />;
ReactDOM.render(
  element,
  document.getElementById('root')
);
```


让我们来回顾一下这个例子中发生了什么：

我们调用 `ReactDOM.render()` 函数，并传入 `<Welcome name="Sara" /> `作为参数。React 调用` Welcome `组件，并将 `{name: 'Sara'} `作为 `props` 传入。
Welcome 组件将 `<h1>Hello, Sara</h1> `元素作为返回值。
React DOM 将 DOM 高效地更新为 `<h1>Hello, Sara</h1>`。

> 注意： 组件名称必须以大写字母开头。React 会将以小写字母开头的组件视为原生 DOM 标签。

### 组合组件

**组件可以在其输出中引用其他组件**。这就可以让我们用同一组件来抽象出任意层次的细节。按钮，表单，对话框，甚至整个屏幕的内容：在 React 应用程序中，这些通常都会以组件的形式表示。

例如，我们可以创建一个可以多次渲染 Welcome 组件的 App 组件：

```
function Welcome(props) {
  return <h1>Hello, {props.name}</h1>;
}

function App() {
  return (
    <div>
      <Welcome name="Sara" />
      <Welcome name="Cahal" />
      <Welcome name="Edite" />
    </div>
  );
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
);
```

通常来说，每个新的 React 应用程序的顶层组件都是 App 组件。但是，如果你将 React 集成到现有的应用程序中，你可能需要使用像 Button 这样的小组件，并自下而上地将这类组件逐步应用到视图层的每一处。

### 提取组件

**将组件拆分为更小的组件。**

例如，参考如下 Comment 组件：

```
function Comment(props) {
  return (
    <div className="Comment">
      <div className="UserInfo">
        <img className="Avatar"
          src={props.author.avatarUrl}
          alt={props.author.name}
        />
        <div className="UserInfo-name">
          {props.author.name}
        </div>
      </div>
      <div className="Comment-text">
        {props.text}
      </div>
      <div className="Comment-date">
        {formatDate(props.date)}
      </div>
    </div>
  );
}
```


该组件用于描述一个社交媒体网站上的评论功能，它接收 `author（对象）`，`text （字符串）`以及 `date（日期）`作为 props。

该组件由于嵌套的关系，变得难以维护，且很难复用它的各个部分。因此，让我们从中提取一些组件出来。

首先，我们将提取 Avatar 组件：

```
function Avatar(props) {
  return (
    <img className="Avatar"
      src={props.user.avatarUrl}
      alt={props.user.name}
    />
  );
}
```

Avatar 不需知道它在 Comment 组件内部是如何渲染的。因此，我们给它的 `props` 起了一个更通用的名字：user，而不是 author。

我们建议从组件自身的角度命名 `props`，而不是依赖于调用组件的上下文命名。

我们现在针对 Comment 做些微小调整：

```
function Comment(props) {
  return (
    <div className="Comment">
      <div className="UserInfo">
        <Avatar user={props.author} />
        <div className="UserInfo-name">
          {props.author.name}
        </div>
      </div>
      <div className="Comment-text">
        {props.text}
      </div>
      <div className="Comment-date">
        {formatDate(props.date)}
      </div>
    </div>
  );
}
```

接下来，我们将提取 UserInfo 组件，该组件在用户名旁渲染 Avatar 组件：
```
function UserInfo(props) {
  return (
    <div className="UserInfo">
      <Avatar user={props.user} />
      <div className="UserInfo-name">
        {props.user.name}
      </div>
    </div>
  );
}
```

进一步简化 Comment 组件：

```
function Comment(props) {
  return (
    <div className="Comment">
      <UserInfo user={props.author} />
      <div className="Comment-text">
        {props.text}
      </div>
      <div className="Comment-date">
        {formatDate(props.date)}
      </div>
    </div>
  );
}
```


最初看上去，提取组件可能是一件繁重的工作，但是，在大型应用中，构建可复用组件库是完全值得的。根据经验来看，如果 UI 中有一部分被多次使用（Button，Panel，Avatar），或者组件本身就足够复杂（App，FeedStory，Comment），那么它就是一个可复用组件的候选项。

### Props 的只读性

**组件无论是使用函数声明还是通过 class 声明，都决不能修改自身的 `props`。**来看下这个 sum 函数：

```
function sum(a, b) {
  return a + b;
}
```

这样的函数被称为“纯函数”，因为该函数不会尝试更改入参，且多次调用下相同的入参始终返回相同的结果。

相反，下面这个函数则不是纯函数，因为它更改了自己的入参：

```
function withdraw(account, amount) {
  account.total -= amount;
}
```

React 非常灵活，但它也有一个严格的规则：

**所有 React 组件都必须像纯函数一样保护它们的 props 不被更改。**

当然，应用程序的 UI 是动态的，并会伴随着时间的推移而变化。在不违反上述规则的情况下，state 允许 React 组件随用户操作、网络响应或者其他变化而动态更改输出内容。