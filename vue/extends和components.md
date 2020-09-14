# new Vue vs Vue.extends vs Vue.component

Vue 是一个构造函数 , 所有的组件是 Vue 实例, 所有的 Vue 实例都是组件

通过 new Vue 的实例, 是最顶层的组件, 称为根实例 root ,
new Vue 一个组件的方式,每次必须写把 模板带上.
Vue 是`根组件`的构造函数, 也没有复用性. 一般不需要复用
Vue 是个没有模板的 构造函数.

Vue.extends 的作用 , 创建一个 `组件`的`构造函数`, 继承自 Vue

```js
// 根组件构造函数, 构造 组件 , 每次都要写 render .  new Vue 的根组件实例自带标识  打印 this 的时候 是 $vue
const rootComponent1 = new Vue({
  render: (h) => {},
});
const rootComponent2 = new Vue({
  render: (h) => {},
});
const rootComponent3 = new Vue({
  render: (h) => {},
});

// 创建组件的构造函数   可复用性 . 这样构造出来的 组件实例, 打印 this 自带 VueComponent
Vue.extend(Component);
const H1ComponentConstruct = Vue.extend({
  render: (h) => {},
});
const H1Component1 = new H1ComponentConstruct();
const H1Component2 = new H1ComponentConstruct();
const H1Component3 = new H1ComponentConstruct({ propData });

Vue.component(); // 注册一个 全局组件, 本质接收一个 组件名称 和 一个组件的构造函数.
```

我们写的 xx.vue 都会转成 构造函数

```js
const root = new Vue({
  el: "#root", // 两个作用, template 和 $mount
});
const app = new Vue({
  router,
  store,
  render: (h) => h(App), // template 会转成 render()函数, 其实就是 虚拟 Dom , h 是 Vue 的 createElement
}).$mount("#app"); // $mount('#app') 生成真实 dom, 并自动挂载到 #app 上, 没有填则, 需要手动挂载  如: body.append(app.$el)
```

拓展:

1. document.createElement : js 自带原生创建虚拟 dom 的方法.
   https://developer.mozilla.org/zh-CN/docs/Web/API/Document/createElement
   Vue 的 createElement 底层应该用到了这个方法

2. Web Components: web 原生组件
   https://developer.mozilla.org/zh-CN/docs/Web/Web_Components

## 参考

vue 实例和组件的区别？
https://segmentfault.com/q/1010000014884274

What is Vue.extend for?
https://stackoverflow.com/questions/40719200/what-is-vue-extend-for

```js
// define
var MyComponent = {
  template: "<div>A custom component!</div>",
};
// register
Vue.component("my-component", MyComponent);
// create a root instance
new Vue({
  el: "#example",
});
```
