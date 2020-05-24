## 前言

本文介绍了 React 组件中 state 和生命周期的概念。你可以查阅详细的组件 API 参考文档。

在元素渲染章节中，我们只了解了一种更新 UI 界面的方法。通过调用 `ReactDOM.render()` 来修改我们想要渲染的元素：

```
function tick() {
  const element = (
    <div>
      <h1>Hello, world!</h1>
      <h2>It is {new Date().toLocaleTimeString()}.</h2>
    </div>
  );
  ReactDOM.render(
    element,
    document.getElementById('root')
  );
}

setInterval(tick, 1000);
```


在本章节中，我们将学习如何封装真正可复用的 Clock 组件。它将设置自己的计时器并每秒更新一次。

我们可以从封装时钟的外观开始：

```
function Clock(props) {
  return (
    <div>
      <h1>Hello, world!</h1>
      <h2>It is {props.date.toLocaleTimeString()}.</h2>
    </div>
  );
}

function tick() {
  ReactDOM.render(
    <Clock date={new Date()} />,
    document.getElementById('root')
  );
}

setInterval(tick, 1000);
```

然而，它忽略了一个关键的技术细节：Clock 组件需要设置一个计时器，并且需要每秒更新 UI。

理想情况下，我们希望只编写一次代码，便可以让 Clock 组件自我更新：

```
ReactDOM.render(
  <Clock />,
  document.getElementById('root')
);
```

我们需要在 Clock 组件中添加 “state” 来实现这个功能。

**State 与 props 类似，但是 state 是私有的，并且完全受控于当前组件。**

## 将函数组件转换成 class 组件

通过以下五步将 Clock 的函数组件转成 class 组件：

- 创建一个同名的 ES6 class，并且继承于 React.Component。

- 添加一个空的 `render()` 方法。

- 将函数体移动到 `render()` 方法之中。

- **在 `render()` 方法中使用 `this.props` 替换 `props`。**

- 删除剩余的空函数声明。

```
class Clock extends React.Component {
  render() {
    return (
      <div>
        <h1>Hello, world!</h1>
        <h2>It is {this.props.date.toLocaleTimeString()}.</h2>
      </div>
    );
  }
}
```

现在 Clock 组件被定义为 class，而不是函数。

每次组件更新时 render 方法都会被调用，但只要在相同的 DOM 节点中渲染 `<Clock /> `，就仅有一个 Clock 组件的 class 实例被创建使用。这就使得我们可以使用如 state 或生命周期方法等很多其他特性。

## 向 class 组件中添加局部的 state

我们通过以下三步将 date 从 `props` 移动到 `state` 中：

- 把 `render()` 方法中的 `this.props.date` 替换成 `this.state.date` ：
```
class Clock extends React.Component {
  render() {
    return (
      <div>
        <h1>Hello, world!</h1>
        <h2>It is {this.state.date.toLocaleTimeString()}.</h2>
      </div>
    );
  }
}
```

- 添加一个 class **构造函数**，然后在该函数中为 `this.state` 赋初值：
```
class Clock extends React.Component {
  constructor(props) {
    super(props);
    this.state = {date: new Date()};
  }

  render() {
    return (
      <div>
        <h1>Hello, world!</h1>
        <h2>It is {this.state.date.toLocaleTimeString()}.</h2>
      </div>
    );
  }
}
```

**通过以下方式将 props 传递到父类的构造函数中：**
```
  constructor(props) {
    super(props);
    this.state = {date: new Date()};
  }
```

**Class 组件应该始终使用 props 参数来调用父类的构造函数**。

- 移除 `<Clock />` 元素中的 date 属性：
```
ReactDOM.render(
  <Clock />,
  document.getElementById('root')
);
```

我们之后会将计时器相关的代码添加到组件中。

代码如下：

```
class Clock extends React.Component {
  constructor(props) {
    super(props);
    this.state = {date: new Date()};
  }

  render() {
    return (
      <div>
        <h1>Hello, world!</h1>
        <h2>It is {this.state.date.toLocaleTimeString()}.</h2>
      </div>
    );
  }
}

ReactDOM.render(
  <Clock />,
  document.getElementById('root')
);
```

接下来，我们会设置 Clock 的计时器并每秒更新它。

## 将生命周期方法添加到 Class 中

在具有许多组件的应用程序中，当组件被销毁时释放所占用的资源是非常重要的。

当 Clock 组件第一次被渲染到 DOM 中的时候，就为其设置一个计时器。这在 React 中被称为**挂载（mount）**。

同时，当 DOM 中 Clock 组件被删除的时候，应该清除计时器。这在 React 中被称为“**卸载（unmount）**”。

我们可以为 class 组件声明一些特殊的方法，当组件挂载或卸载时就会去执行这些方法：

```
class Clock extends React.Component {
  constructor(props) {
    super(props);
    this.state = {date: new Date()};
  }

  componentDidMount() {
  }

  componentWillUnmount() {
  }

  render() {
    return (
      <div>
        <h1>Hello, world!</h1>
        <h2>It is {this.state.date.toLocaleTimeString()}.</h2>
      </div>
    );
  }
}
```

这些方法叫做“**生命周期方法**”。

`componentDidMount()` 方法会在组件已经被渲染到 DOM 中后运行，所以，最好在这里设置计时器：
```
  componentDidMount() {
    this.timerID = setInterval(
      () => this.tick(),
      1000
    );
  }
```

接下来把计时器的 ID 保存在 this 之中（this.timerID）。

尽管 `this.props` 和 `this.state` 是 React 本身设置的，且都拥有特殊的含义，但是其实你可以向 class 中随意添加不参与数据流（比如计时器 ID）的额外字段。

我们会在 `componentWillUnmount()` 生命周期方法中清除计时器：
```
  componentWillUnmount() {
    clearInterval(this.timerID);
  }
```

最后，我们会实现一个叫 `tick()` 的方法，Clock 组件每秒都会调用它。

使用 `this.setState()` 来时刻更新组件 state：
```
class Clock extends React.Component {
  constructor(props) {
    super(props);
    this.state = {date: new Date()};
  }

  componentDidMount() {
    this.timerID = setInterval(
      () => this.tick(),
      1000
    );
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  tick() {
    this.setState({
      date: new Date()
    });
  }

  render() {
    return (
      <div>
        <h1>Hello, world!</h1>
        <h2>It is {this.state.date.toLocaleTimeString()}.</h2>
      </div>
    );
  }
}

ReactDOM.render(
  <Clock />,
  document.getElementById('root')
);
```


现在时钟每秒都会刷新。

## 正确地使用 State

关于 `setState()` 你应该了解三件事：

- **不要直接修改 State**

例如，此代码不会重新渲染组件：

```
// Wrong
this.state.comment = 'Hello';
而是应该使用 setState():

// Correct
this.setState({comment: 'Hello'});
```

- **构造函数是唯一可以给 this.state 赋值的地方：**

- **State 的更新可能是异步的**

出于性能考虑，React 可能会把多个` setState() `调用合并成一个调用。

因为 this.props 和 this.state 可能会异步更新，所以你不要依赖他们的值来更新下一个状态。

例如，此代码可能会无法更新计数器：

```
// Wrong
this.setState({
  counter: this.state.counter + this.props.increment,
});
```

**要解决这个问题，可以让 setState() 接收一个函数而不是一个对象**。这个函数用上一个 state 作为第一个参数，将此次更新被应用时的 props 做为第二个参数：

```
// Correct
this.setState((state, props) => ({
  counter: state.counter + props.increment
}));
```
上面使用了箭头函数，不过使用普通的函数也同样可以：
```
// Correct
this.setState(function(state, props) {
  return {
    counter: state.counter + props.increment
  };
});
```

- **State 的更新会被合并**

当你调用 `setState()` 的时候，React 会把你提供的对象合并到当前的 state。

例如，你的 state 包含几个独立的变量：
```
  constructor(props) {
    super(props);
    this.state = {
      posts: [],
      comments: []
    };
  }
```

然后你可以分别调用 `setState()` 来单独地更新它们：
```
  componentDidMount() {
    fetchPosts().then(response => {
      this.setState({
        posts: response.posts
      });
    });

    fetchComments().then(response => {
      this.setState({
        comments: response.comments
      });
    });
  }
```

这里的合并是浅合并，所以 `this.setState({comments}) `完整保留了 `this.state.posts`， 但是完全替换了 `this.state.comments。`

## 数据是向下流动的

不管是父组件或是子组件都无法知道某个组件是有状态的还是无状态的，并且它们也并不关心它是函数组件还是 class 组件。

这就是为什么称 state 为局部的或是封装的的原因。**除了拥有并设置了它的组件，其他组件都无法访问**。

**组件可以选择把它的 state 作为 props 向下传递到它的子组件中：**

```
<h2>It is {this.state.date.toLocaleTimeString()}.</h2>
```

这对于自定义组件同样适用：
```
<FormattedDate date={this.state.date} />
```

FormattedDate 组件会在其 props 中接收参数 date，但是组件本身无法知道它是来自于 Clock 的 state，或是 Clock 的 props，还是手动输入的：
```
function FormattedDate(props) {
  return <h2>It is {props.date.toLocaleTimeString()}.</h2>;
}
```


这通常会被叫做“自上而下”或是“单向”的数据流。**任何的 state 总是所属于特定的组件，而且从该 state 派生的任何数据或 UI 只能影响树中“低于”它们的组件。**

如果你把一个以组件构成的树想象成一个 props 的数据瀑布的话，那么每一个组件的 state 就像是在任意一点上给瀑布增加额外的水源，但是它只能向下流动。

为了证明每个组件都是真正独立的，我们可以创建一个渲染三个 Clock 的 App 组件：

```
function App() {
  return (
    <div>
      <Clock />
      <Clock />
      <Clock />
    </div>
  );
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
);
```

每个 Clock 组件都会单独设置它自己的计时器并且更新它。

在 React 应用中，组件是有状态组件还是无状态组件属于组件实现的细节，它可能会随着时间的推移而改变。你可以在有状态的组件中使用无状态的组件，反之亦然。