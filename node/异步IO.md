# 前言

在众多高级编程语言或运行平台中，将异步作为主要编程方式和设计理念的Node是首个。

**伴随着异步I/O的还有事件驱动和单线程，他们构成Node的基调。**

Node是全方位的，既可以作为服务器端去处理客户端带来的大量并发请求，也能作为客户端向网络中的各个应用进行并发请求。

## 异步I/O的原因

这与Node面向网络设计有关。

### 用户体验

在浏览器中，JavaScript在单线程上执行，而且它还与UI渲染共用一个线程。这意味着，JavaScript在执行的时候UI渲染和响应是处于停滞状态的。

通过异步可以消除UI阻塞的现象，但是前端获取资源的速度也取决于后端响应的速度。

只有后端能够快速响应资源，才能让前端的体验更好。

### 资源分配

假设业务场景中有一组互不相关的任务需要完成，现行的主流方法有以下两种。

- 单线程串行依次执行
- 多线程并行完成

多线程的代价在于，创建线程和执行期线程上下文的切换开销较大。此外，在复杂的业务中，多线程编程经常面临死锁、状态同步等问题，但是多线程在多核CPU上能够有效提升CPU的利用率。

单线程同步编程模型会因阻塞I/O导致硬件资源得不到更优的使用。

添加硬件资源是一种提升服务质量的方式，但它不是唯一的方式。

**Node在两者之间给出了它的方案：利用单线程，远离多线程死锁、状态同步等问题；利用异步I/O，让单线程远离阻塞，以更好的使用CPU。**

为了弥补单线程无法利用多核cpu的缺点，Node提供了类似前端浏览器中Web Workers的子进程，该子进程可以通过工作进程高效的利用CPU和I/O。

## 异步I/O实现

### 异步I/O与非阻塞I/O

从计算机内核I/O而言，异步/同步和阻塞/非阻塞实际上是两回事。

操作系统内核对于I/O只有两种方式：阻塞与非阻塞。在调用阻塞I/O时，应用程序需要等待I/O完成才返回结果。**非阻塞I/O和阻塞I/O的差别为调用后会立即返回。**

*操作系统对计算机进行了抽象，将所有输入输出设备抽象为文件。内核在进行文件I/O操作时，通过文件描述符进行管理，而文件描述符类似于应用程序与系统内核之间的凭证。应用程序如果需要进行I/O调用，需要先打开文件描述符，然后再根据文件描述符去实现文件的数据读写。**此处非阻塞I/O与阻塞I/O的区别在于阻塞I/O完成整个获取数据的过程，而非阻塞I/O则不带数据直接返回，要获取数据，还需要通过文件描述符再次读取。***

非阻塞I/O返回后，CPU的时间片可以用来处理其他事物，此时的性能提升是明显的。

![非阻塞](https://github.com/highsea/diveintonode_figures/blob/master/03/async_io.png?raw=true)

由于完成的I/O并没有完成，立即返回的并不是业务层期望的数据，而仅仅是当前调用的状态。**为了获取完整的数据，应用程序需要重复调用I/O操作来确认是否完成。**

这种重复调用判断操作是否完成的技术叫做**轮询**。

**非阻塞带来的麻烦却是需要轮询去确认是否完全完成数据获取，它会让CPU处理状态判断，是对CPU资源的浪费**。

现存的轮询技术主要有以下这些：

- read

它是最原始，性能最低的一种，通过反复调用来检查I/O的状态来完成数据饿读取。在得到最终数据前，CPU一直耗用在等待上。

- select

它是在read基础上改进的一种方案，通过对文件描述符上的事件状态来进行判断。

- poll

该方案较select有所改进，采用链表的方式避免数组长度的限制，其次他能避免不必要的检查。

- **epoll**


**该方案是Linux下效率最高的I/O事件通知机制，在进入轮询的时候如果没有检查到I/O事件，将会进行休眠，直到事件发生将它唤醒。它是真实利用了事件通知、执行回调的方式，而不是遍历查询，所以不会浪费CPU，执行效率较高。**

![epoll](https://github.com/highsea/diveintonode_figures/blob/master/03/epoll_io.png?raw=true)

轮询技术满足了非阻塞I/O确保获取完整数据的需求，但是对于应用程序来说，它仍然只能算是一种同步，因为应用程序仍然需要等待I/O完全返回。

### 理想的非阻塞异步I/O

### 现实的非阻塞异步I/O

**通过让部分线程进行阻塞I/O或者非阻塞I/O加轮询技术来完成数据获取，让一个线程进行计算处理，通过线程之间的通信将I/O得到的数据进行传递，这就轻松实现了异步I/O。**

![](https://github.com/highsea/diveintonode_figures/blob/master/03/simulate_async_io.png?raw=true)

glibc的AIO是典型的线程池模拟异步I/O，但是它存在一些难以忍受的缺陷和bug。

Windows下的**IOCP**，也是一种异步I/O解决方案，它在某种程度上提供了理想的异步I/O：调用异步方法，等待I/O完成之后的通知，执行回调，用户无需考虑轮询。它的内部依旧是线程池原理。

由于Windows和*nix平台的差异，**node提供了libuv作为抽象封装层**，使得所有平台兼容性的判断都由这一层来完成，并保证上层的node与下层的自定义线程池及IOCP之间各自独立。

![基于libuv的架构示意图](https://github.com/highsea/diveintonode_figures/blob/master/03/async_io_arch.png?raw=true)

> 注意⚠️：

**我们时常提到Node是单线程的，这里的单线程指的仅仅只是JavaScript执行在单线程中，在Node中，无论是Windows还是*nix，内部完成I/O任务的另有线程池。**

## Node的异步I/O

### 事件循环

**Node自身的执行模型——事件循环**，正是它使得回调函数十分普遍。

**在进程启动时，Node便会创建一个类似于while(true)的循环，每执行一次循环体的过程成为Tick。每个Tick的过程就是查看是否有事件待处理，如果有，就取出事件及其相关的回调函数。。如果存在关联的回调函数，就执行它们。然后进入下个循环，如果不再有事件处理，就退出进程。**

![Tick流程图](https://github.com/highsea/diveintonode_figures/blob/master/03/loop.png?raw=true)

### 观察者

> 引入一个概念：观察者

每个事件循环中有一个或者多个观察者，而判断是否有事件要处理的过程就是向这些观察者询问是否有要处理的事件。

浏览器采用了类似的机制。事件可能来自用户的点击或家在某些文件时产生，这些事件都由对应的观察者。

在Node中，事件主要来源于网络请求、文件I/O等，这些事件对应的观察者有文件I/O观察者、网络I/O观察者等。


观察者将事件进行了分类。

### 请求对象

JavaScript代码到系统内核之间发生了什么。

对于一般的回调函数，函数由我们自行调用，对于Node的异步I/O来说，回调函数却不由开发者来调用。**从Javascipt发起调用到内核执行完I/O操作的过渡过程中，存在一种中间产物，它叫做请求对象。**

**JavaScript层面的代码通过调用C++核心模块进行下层的操作。**

**从JavaScript调用Node的核心模块，核心模块调用C++内建模块，内建模块通过libuv进行系统调用，这是Node里经典的调用方式。**

至此，JavaScript调用立即返回，由JavaScript层面发起的异步调用的第一阶段就此结束。JavaScript线程可以继续执行当前任务的后续操作。当前I/O操作在线程池中等待执行，不管是否阻塞I/O，都不会影响到JavaScript的后续执行，如此就达到了异步的目的。

**请求对象是异步I/O过程中的重要产物，所有的状态都保存在这个对象中，包括送入线程池等待执行以及I/O操作完毕后的回调处理。**

### 执行回调

组装好请求对象、送入I/O线程池等待执行，实际上完成了异步I/O的第一部分，回调通知是第二部分。

**线程池中的I/O操作调用完毕后**，会将获取的结果储存在`req->result`属性上，然后调用`PostQueuedCompletionStatus()`通知IOCP，告知当前对象操作以已经完成。

```
PostQueuedCompletionStatus((loop) -> iocp, 0, 0, &((req)->overlapped))
```

`PostQueuedCompletionStatus()`方法的作用是向IOCP提交执行状态，并将线程归还线程池，可以通过`GetQueuedCompletionStatus()`获取提交的状态。

此过程中，还动用了事件循环的I/O观察者。**在每次Tick的执行中，它会调用IOCP相关的`GetQueuedCompletionStatus()`方法检查线程池中是否有执行完的请求，若有，会将请求对象加入到I/O观察者的队列中，然后将其当作事件处理。**

**I/O观察者回调函数的行为**就是取出请求对象的`result`属性作为参数，取出`oncomplete_sym`属性作为方法，然后调用执行，以此达到调用JavaScript中传入的回调函数的目的。

![整个异步I/O 的流程](https://github.com/highsea/diveintonode_figures/blob/master/03/io_model.png?raw=true)

**事件循环、观察者、请求对象、I/O线程池这四者构成了Node异步I/O模型的基本要素。**

## 非I/O的异步API

`setTimeout()`、`setInterval()`、`setImmediate()`、`process.nextTick()`

### 定时器

`setTimeout()`和`setInterval()`的实现原理与异步I/O的实现比较类似，但是没有线程池的参与。

`setTimeout()`和`setInterval()`创建的定时器会被插入到定时器观察者内部的一个**红黑树**中。每次Tick执行时，会从该红黑树中迭代取出定时器对象，检查超过是否超过定时时间，如果超过，就形成一个事件，它的回调函数立即执行。

定时器的问题在于，它并非精确的（在容忍范围内）。

![setTimeout的行为](https://github.com/highsea/diveintonode_figures/blob/master/03/timer.png?raw=true)

### process.nextTick()

`process.nextTick()`的操作相比`setTimeout()`较为轻量。

具体代码如下：

```
process.nextTick = function(callback) {
    if(process._exiting) return;

    if(tickDepth >= process.maxTickDepth) maxTickWarn();

    var tock = {callback: callback};
    if(process.domain) rock.domain = process.domain;

    nextTickQueue.push(tock);
    if(nextTickQueue.length) {
        process._needTickCallback();
    }
}
```

每次调用`process.nextTick()`方法，只会将回调函数放入队列中，在下一轮Tick中取出执行。定时器中采用红黑树时间复杂度为O(lg(n))，`process.nextTick()`的是O(1)，更高效。

### setImmediate()

```
process.nextTick(function() {
    console.log('nextTick延迟执行')
});
setImmediate(function() {
    console.log('setImmediate延迟执行')
});
console.log('正常执行')
```

执行结果：

```
正常执行
nextTick延迟执行
setImmediate延迟执行
```

从执行结果来看，`process.nextTick()`的回调函数执行优先级高于`setImmediate()`，这是因为，**事件循环对于观察者的检查是有先后顺序的**，`process.nextTick()`属于idle观察者，`setImmediate()`属于check观察者。在每一个轮循环检查中idle观察者先于I/O观察者，I/O观察者先于check观察者。

在具体实现上，`process.nextTick()`的回调函数保存在一个数组中，`setImmediate()`的结果保存在链表中。在行为上，`process.nextTick()`在每轮循环中会将数组中的回调函数全部执行，`setImmediate()`在每轮循环中执行链表中的一个回调函数。

## 事件驱动和高性能服务器

**事件驱动的本质，通过祝循环加事件触发的方式来运行程序。**

对于网络套接字的处理，Node也用到了异步I/O，网络套接字侦听到的请求都会形成事件交给I/O观察者。事件循环会不停的处理这些网络I/O事件。如果JavaScript有传入回调函数，这些事件将会最终传递到业务逻辑层进行处理。利用Node构建Web服务器，正是在这一个基础上实现的。

![利用Node构建Web服务器流程图](https://github.com/highsea/diveintonode_figures/blob/master/03/server.png?raw=true)

经典的服务器模型：

- 同步式
- 每进程/每请求
- 每线程/每请求

Node通过事件驱动的方式处理请求，无需为每一个请求创建额外的对应线程，可以省掉创建线程和销毁线程的开销，同时操作系统在调度任务时，因为线程较少，上下文切换的代价很低。这是Node高性能的一个原因。