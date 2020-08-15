# render

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
