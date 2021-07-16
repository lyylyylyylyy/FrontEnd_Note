- proxy用于修改某些操作的默认行为
- 目标对象之前架设一层拦截，访问该对象时，必须通过这个拦截，因此提供了一种过滤和修改外部访问的机制
- ES6 原生提供 Proxy 构造函数，用来生成 Proxy 实例。

```javascript
var proxy = new Proxy(target, handler);
// target目标对象
// handler拦截行为
```

- Proxy 实例也可以作为其他对象的原型对象。
- 同一个拦截函数，可以设置拦截多个操作
```javascript
var proxy = new Proxy({}, {
  get: function(target, propKey) {
    return 35;
  }
});

let obj = Object.create(proxy);
obj.time // 35
```

Proxy 支持的拦截操作一览，一共 13 种。
。。。。。。。。

## Proxy 实例的方法

get()
- get方法用于拦截某个属性的读取操作，可以接受三个参数，依次为目标对象、属性名和 proxy 实例本身（严格地说，是操作行为所针对的对象），其中最后一个参数可选。

set()
- set方法用来拦截某个属性的赋值操作，可以接受四个参数，依次为目标对象、属性名、属性值和 Proxy 实例本身，其中最后一个参数可选。

apply() 

has() 

construct() 
- construct()方法用于拦截new命令，下面是拦截对象的写法。
- construct()方法返回的必须是一个对象，否则会报错。
- 由于construct()拦截的是构造函数，所以它的目标对象必须是函数，否则就会报错。

deleteProperty()
- deleteProperty方法用于拦截delete操作，如果这个方法抛出错误或者返回false，当前属性就无法被delete命令删除。

getOwnPropertyDescriptor()
- getOwnPropertyDescriptor()方法拦截Object.getOwnPropertyDescriptor()，返回一个属性描述对象或者undefined。

getPrototypeOf()

ownKeys()
- ownKeys()方法用来拦截对象自身属性的读取操作。具体来说，拦截以下操作。
    - Object.getOwnPropertyNames()
    - Object.getOwnPropertySymbols()
    - Object.keys()
    - for...in循环

## this 问题

- 在 Proxy 代理的情况下，目标对象内部的this关键字会指向 Proxy 代理。

- 另外，Proxy 拦截函数内部的this，指向的是handler对象。
