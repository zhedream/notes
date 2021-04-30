# vuex 的使用

https://vuex.vuejs.org/zh/

全局状态管理 , 全部数据管理 , vuex 是单例

状态可以是 数据, 或者 方法, 就是在 统一 的地方, 维护数据或方法. vuex 就是那个地方

也叫状态树, 通过, modules 就可以体现出 树的个概念了.

mutations 是唯一更改 状态 的途径

mutations/commit dispatch/actions 的关系

commit/mutations 同步 , dispatch/actions 异步

不直接使用 mutations 函数, 而是通过 commit 调用
store.commit('increment', 10)

dispatch/actions 异步操作, commit 的是 mutations

不直接使用 actions 函数, 而是通过 dispatch 调用
store.dispatch('increment', 10)

mapActions、mapGetters、mapMutations、mapState 这几个辅助方法

## 核心概念

state: 组件中的 data

Getter: 组件中的 computed, 也可以叫 派生状态

Mutation: vuex 单向数据流的, 不能直接 state.xx = '', this.\$set() , react 的 setState

Action: 组件中的 methods

modules: 模块的概念, 就是做分类,

## mutations actions 的使用

mutations 直接更改 state , 必须是同步的, 里面没有其他业务逻辑, 最多处理下数据格式

actions , 可异步, 比如 登录 退出 类似的公共的方法, 就非常适合 用 actions
出里完业务逻辑, 最后也是 通过 mutations 完成数据的变更

## 模块的使用场景

混入, 或者命名空间

## 辅助函数的使用
https://vuex.vuejs.org/zh/guide/state.html#mapstate-辅助函数

数组,对象,函数, 普通函数(this)

```js

computed:{
  ...mapGetters(['a','b']),
  ...mapGetters('nameSpace',['a','b']),
  ...mapState('nameSpace',['a','b']),
},
methods:{
  ...mapAction('login') // this.login
  ...mapAction('user/login') // this.['user/login'](data)
}

```

## 严格模式

## 插件

状态持久话

## 使用场景

1. 登录状态
2. 各种下拉 option
3. 总之就是一些 全局的数据, 方法

## 基础使用

## router 中使用

```js
import store from "./store";
```

## getter

```js
import { mapGetters } from 'vuex'

computed: {
  // 使用对象展开运算符将 getter 混入 computed 对象中
  ...mapGetters([
    'doneTodosCount',
    'anotherGetter',
    // ...
  ])
}

created() {
  GetCommonCode({ CodeType: "CarType" }).then(({ data }) => {
    let CarTypes = data.data;
    let newCarTypes = [];
    CarTypes.forEach(CarType => {
      let { Code: key, Name: label } = CarType;
      newCarTypes.push({ key, label });
    });
    console.log("CarType", CarTypes);
    this.$store.commit("setCarTypes", newCarTypes); // 设置 store
  });
}
```

## vuex 刷新数据丢失

1. vue 单页面应用刷新网页后 vuex 的 state 数据丢失的解决方案
   https://blog.csdn.net/guzhao593/article/details/81435342

## 状态的概念

豁然开朗,终于明白,状态这个概念了,知到组件数据(data) 为什么称为状态(state).

如何设计一个数据结构来保存的魔方状态，并使用编程语言来实现某个旋转变换呢？
https://juejin.im/post/6844903665510121479

状态描述组件长什么样, 魔方的状态, 魔方的数据

`组件数据`和`组件状态`就是一个东西, 就是换一个叫法, 会更好理解

## 其他

provide and inject

## 资料

1. 理解 Vuex，看这篇就够了
   https://mobilesite.github.io/2016/12/18/vuex-introduction/

2. 浅谈 vue 中 provide 和 inject 用法
   https://juejin.im/post/5c983d575188252d9a2f5bff

3. 官方文档
   https://vuex.vuejs.org/zh/
