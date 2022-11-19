# render

渲染函数
https://v2.vuejs.org/v2/guide/render-function.html

比模板更灵活, 可以动态改变模板

https://cn.vuejs.org/v2/guide/render-function.html#深入数据对象

```js
Vue.component("m-h", {
  props: ["level"],
  render: function (h) {
    return h(
      "h" + this.level,
      // {}, // 不填写 默认都传递
      this.$slots.default
    );
  },
});
```

```js
Vue.component("my-com", {
  name: "my-com",
  inheritAttrs: false,
  functional: true,
  render: function (createElement) {
    return createElement(
      "div", // 标签名称 | 组件
      {
        styles: {}, // 标签样式
        class: {}, // 样式类 接受一个字符串、对象或字符串和对象组成的数组
        attrs: this.$attrs, // 标签属性
        props: this.$props, // v-bind="$attrs" 不被识别的 props 在 "$attrs 里
        on: this.$listeners, // v-on="this.$listeners"
        nativeOn: {},
        slot: "", // 作为插槽 的名称, 在原生标签的插槽里是没有意义
        scopedSlots: this.$scopedSlots, // 组件插槽写在这里,  scopedSlots 在原生 标签上是没有意义的
      },
      [
        // !!!!! 重要 重要 !!!!
        // 对于 组件标签, createElement 第三个参数 内容标签是没有意义的, 需要写在 scopedSlots 里面
        // 原生标签里使用 插槽 和 后被内容/默认内容
        (this.$scopedSlots.default &&
          this.$scopedSlots.default({ text: this.message })) ||
          null,
        (this.$scopedSlots.title && this.$scopedSlots.title()) ||
          createElement("h1", "插槽的后被内容"),
      ]
    );
  },
});
```

## 渲染方式/场景

template/slot
render/jsx

页面: template

通过函数, 调用弹出消息框, 希望显示自定义内容
this.modal()

组建库, 适合用 render 函数,

## jsx

同过书写 jsx , 通过 babel 转换成 h()
iview 中常用,自定义渲染

## 强制渲染

使用 v-if 或 改变 key
v-if="reFresh" 重置的数据
:key="menuKey" 推荐, 会保留数据

1. vue 强制组件重新渲染（重置）
   https://blog.csdn.net/zyx1303031629/article/details/86656785

2. forceUpdate
   `this.$forceUpdate()`

Vue 中 v-for 遍历多层嵌套数据，不能重新渲染的问题
https://blog.csdn.net/qq_36952874/article/details/83348804
