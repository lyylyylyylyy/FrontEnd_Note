- 父子组件之间通信
- 非父子组件之间通信
    - 兄弟组件
    - 隔代组件

![处理边界情况](https://cn.vuejs.org/v2/guide/components-edge-cases.html)

## props && $emit

父组件通过`props`的方式向子组件传递数据，而通过`$emit`子组件可以向父组件通信。

- 父组件向子组件传值

```html
// section父组件
<template>
  <div class="section">
    <com-article :articles="articleList"></com-article>
  </div>
</template>

<script>
import comArticle from './test/article.vue'
export default {
  name: 'HelloWorld',
  components: { comArticle },
  data() {
    return {
      articleList: ['红楼梦', '西游记', '三国演义']
    }
  }
}
</script>

// 子组件 article.vue
<template>
  <div>
    <span v-for="(item, index) in articles" :key="index">{{item}}</span>
  </div>
</template>

<script>
export default {
  props: ['articles']
}
</script>

```
> props只能从父组件传递数据给子组件，并且props的数据是只读的，不可以被修改。

- 子组件向父组件传值

`$emit`绑定一个自定义事件, 当这个语句被执行时, 就会将参数`arg`传递给父组件,父组件通过`v-on`监听并接收参数。 通过一个例子，说明子组件如何向父组件传递数据。

在上个例子的基础上, 点击页面渲染出来的`ariticle`的`item`, 父组件中显示在数组中的下标

```html
// 父组件中
<template>
  <div class="section">
    <com-article :articles="articleList" @onEmitIndex="onEmitIndex"></com-article>
    <p>{{currentIndex}}</p>
  </div>
</template>

<script>
import comArticle from './test/article.vue'
export default {
  name: 'HelloWorld',
  components: { comArticle },
  data() {
    return {
      currentIndex: -1,
      articleList: ['红楼梦', '西游记', '三国演义']
    }
  },
  methods: {
    onEmitIndex(idx) {
      this.currentIndex = idx
    }
  }
}
</script>

<template>
  <div>
    <div v-for="(item, index) in articles" :key="index" @click="emitIndex(index)">{{item}}</div>
  </div>
</template>

<script>
export default {
  props: ['articles'],
  methods: {
    emitIndex(index) {
      this.$emit('onEmitIndex', index)
    }
  }
}
</script>

```

## $children / $parent

用于父子组件之间的通信。

通过`$parent`和`$children`就可以访问组件的实例，拿到实例代表什么？代表可以**访问此组件的所有方法和data**。接下来就是怎么实现拿到指定组件的实例。

```html
// 父组件中
<template>
  <div class="hello_world">
    <div>{{msg}}</div>
    <com-a></com-a>
    <button @click="changeA">点击改变子组件值</button>
  </div>
</template>

<script>
import ComA from './test/comA.vue'
export default {
  name: 'HelloWorld',
  components: { ComA },
  data() {
    return {
      msg: 'Welcome'
    }
  },

  methods: {
    changeA() {
      // 获取到子组件A
      this.$children[0].messageA = 'this is new value'
    }
  }
}
</script>

// 子组件中
<template>
  <div class="com_a">
    <span>{{messageA}}</span>
    <p>获取父组件的值为:  {{parentVal}}</p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      messageA: 'this is old'
    }
  },
  computed:{
    parentVal(){
      return this.$parent.msg;
    }
  }
}
</script>

```

## provide/ inject

使用 `$parent` property 无法很好的扩展到更深层级的嵌套组件上。这也是依赖注入的用武之地，它用到了两个新的实例选项：`provide` 和 `inject`。

`provide` 选项允许我们指定我们想要提供给后代组件的数据/方法。

然后在**任何后代组件**里，我们都可以使用 `inject` 选项来接收指定的我们想要添加在这个实例上的 property。

```html
// A.vue

<template>
  <div>
	<comB></comB>
  </div>
</template>

<script>
  import comB from '../components/test/comB.vue'
  export default {
    name: "A",
    provide: {
      for: "demo"
    },
    components:{
      comB
    }
  }
</script>

```

```html
// B.vue

<template>
  <div>
    {{demo}}
    <comC></comC>
  </div>
</template>

<script>
  import comC from '../components/test/comC.vue'
  export default {
    name: "B",
    inject: ['for'],
    data() {
      return {
        demo: this.for
      }
    },
    components: {
      comC
    }
  }
</script>

```

```html
// C.vue
<template>
  <div>
    {{demo}}
  </div>
</template>

<script>
  export default {
    name: "C",
    inject: ['for'],
    data() {
      return {
        demo: this.for
      }
    }
  }
</script>

```

## ref / refs

`ref`：如果在普通的 DOM 元素上使用，引用指向的就是 DOM 元素；**如果用在子组件上，引用就指向组件实例，可以通过实例直接调用组件的方法或访问数据**， 我们看一个`ref` 来访问组件的例子:

```javascript
// 子组件 A.vue

export default {
  data () {
    return {
      name: 'Vue.js'
    }
  },
  methods: {
    sayHello () {
      console.log('hello')
    }
  }
}

```

```html
// 父组件 app.vue

<template>
  <component-a ref="comA"></component-a>
</template>
<script>
  export default {
    mounted () {
      const comA = this.$refs.comA;
      console.log(comA.name);  // Vue.js
      comA.sayHello();  // hello
    }
  }
</script>

```

## eventBus

`eventBus`又称为事件总线，在vue中可以使用它来作为沟通桥梁的概念, 就像是所有组件共用相同的**事件中心**，可以向该中心注册发送事件或接收事件， 所有组件都可以通知其他组件。

`eventBus`也有不方便之处, 当项目较大,就容易造成难以维护的灾难

在Vue的项目中怎么使用eventBus来实现组件之间的数据通信呢?具体通过下面几个步骤:

- 初始化

首先需要创建一个事件总线并将其导出, 以便其他模块可以使用或者监听它.

```javascript
// event-bus.js

import Vue from 'vue'
export const EventBus = new Vue()
```

- 发送事件

假设你有两个组件: `additionNum` 和 `showNum`, 这两个组件可以是兄弟组件也可以是父子组件；这里我们以兄弟组件为例:

```html
<template>
  <div>
    <show-num-com></show-num-com>
    <addition-num-com></addition-num-com>
  </div>
</template>

<script>
import showNumCom from './showNum.vue'
import additionNumCom from './additionNum.vue'
export default {
  components: { showNumCom, additionNumCom }
}
</script>

// addtionNum.vue 中发送事件

<template>
  <div>
    <button @click="additionHandle">+加法器</button>    
  </div>
</template>

<script>
import {EventBus} from './event-bus.js'
console.log(EventBus)
export default {
  data(){
    return{
      num:1
    }
  },

  methods:{
    additionHandle(){
      EventBus.$emit('addition', {
        num:this.num++
      })
    }
  }
}
</script>

```

- 接收事件

```html
// showNum.vue 中接收事件

<template>
  <div>计算和: {{count}}</div>
</template>

<script>
import { EventBus } from './event-bus.js'
export default {
  data() {
    return {
      count: 0
    }
  },

  mounted() {
    EventBus.$on('addition', param => {
      this.count = this.count + param.num;
    })
  }
}
</script>

```

这样就实现了在组件addtionNum.vue中点击相加按钮, 在showNum.vue中利用传递来的 num 展示求和的结果.

- 移除事件监听者

如果想移除事件的监听, 可以像下面这样操作:

```javascript
import { eventBus } from 'event-bus.js'
EventBus.$off('addition', {})
```

## Vuex

-   Vuex介绍

Vuex 是一个专为 Vue.js 应用程序开发的状态管理模式。它采用集中式存储管理应用的所有组件的状态，并以相应的规则保证状态以一种可预测的方式发生变化.
Vuex 解决了多个视图依赖于同一状态和来自不同视图的行为需要变更同一状态的问题，将开发者的精力聚焦于数据的更新而不是数据在组件之间的传递上

-  Vuex各个模块

`state`：用于数据的存储，是store中的唯一数据源

`getters`：如vue中的计算属性一样，基于state数据的二次包装，常用于数据的筛选和多个数据的相关性计算

`mutations`：类似函数，改变state数据的唯一途径，且不能用于处理异步事件

`actions`：类似于mutation，用于提交mutation来改变状态，而不直接变更状态，可以包含任意异步操作

`modules`：类似于命名空间，用于项目中将各个模块的状态分开定义和操作，便于维护

## localStorage / sessionStorage

这种通信比较简单,缺点是数据和状态比较混乱,不太容易维护。

通过`window.localStorage.getItem(key)`获取数据

通过`window.localStorage.setItem(key,value)`存储数据

> 注意用JSON.parse() / JSON.stringify() 做数据格式转换

> localStorage / sessionStorage可以结合vuex, 实现数据的持久保存,同时使用vuex解决数据和状态混乱问题.

## $attrs与 $listeners

隔代关系的组件进行通信有哪些方式呢？

- 使用`props`绑定来进行一级一级的信息传递, 如果D组件中状态改变需要传递数据给A, 使用事件系统一级级往上传递
- 使用`eventBus`,这种情况下还是比较适合使用, 但是碰到多人合作开发时, 代码维护性较低, 可读性也低
- 使用`Vuex`来进行数据管理, 但是如果仅仅是传递数据, 而不做中间处理,使用Vuex处理感觉有点大材小用了.

在vue2.4中，为了解决该需求，引入了`$attrs` 和`$listeners` ， 新增了`inheritAttrs` 选项。接下来看一个跨级通信的例子:

```html
// app.vue
// index.vue

<template>
  <div>
    <child-com1
      :name="name"
      :age="age"
      :gender="gender"
      :height="height"
      title="程序员成长指北"
    ></child-com1>
  </div>
</template>
<script>
const childCom1 = () => import("./childCom1.vue");
export default {
  components: { childCom1 },
  data() {
    return {
      name: "zhang",
      age: "18",
      gender: "女",
      height: "158"
    };
  }
};
</script>

// childCom1.vue

<template class="border">
  <div>
    <p>name: {{ name}}</p>
    <p>childCom1的$attrs: {{ $attrs }}</p>
    <child-com2 v-bind="$attrs"></child-com2>
  </div>
</template>
<script>
const childCom2 = () => import("./childCom2.vue");
export default {
  components: {
    childCom2
  },
  inheritAttrs: false, // 可以关闭自动挂载到组件根元素上的没有在props声明的属性
  props: {
    name: String // name作为props属性绑定
  },
  created() {
    console.log(this.$attrs);
     // { "age": "18", "gender": "女", "height": "158", "title": "程序员成长指北" }
  }
};
</script>

// childCom2.vue

<template>
  <div class="border">
    <p>age: {{ age}}</p>
    <p>childCom2: {{ $attrs }}</p>
  </div>
</template>
<script>

export default {
  inheritAttrs: false,
  props: {
    age: String
  },
  created() {
    console.log(this.$attrs); 
    // { "gender": "女", "height": "158", "title": "程序员成长指北" }
  }
};
</script>

```

## 总结

常见使用场景可以分为三类:

- 父子组件通信: `props; $parent / $children; provide / inject ; ref ;  $attrs / $listeners`
- 兄弟组件通信: `eventBus ; 	vuex`
- 跨级通信:  `eventBus；Vuex；provide / inject 、$attrs / $listeners`



作者：ikoala

链接：https://juejin.im/post/6844903887162310669

来源：掘金
