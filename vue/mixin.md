# MINXIN 混入

注意: vue3 中有 compositon 可以了解

minxin , 混入就是你可以单独把某个 data,methods,.. 等属性, 写到一个 js 里
通过 mixins 属性, 可以把 分离出去的属性 混入进来.

混入其实就是合并对象, 就像 webpack-merge 合并公共 config

组件对象 和 混入对象, 有相同的属性, 冲突怎么办
有混入优先级: 组件 > 局部 mixin > 全局 mixin

使用场景:

1. 提取公共代码: 可以把一些 公共的 data, 或 mehtods
2. 分类业务:
   假设你的 manage.vue 里有三个 tab (user,car,menu). 你会发现你的 manage.vue 有几百甚至上千行, 这时可以, 把公共的代码 放在 manage.vue 里, 把 user 业务相关的 data,methods . 分类到 mixin/user.js 中去, 然后再 通过 mixins 混入/合并进来. car,menu 同理.

```js minins/data.js
export default {
  data() {
    return {
      mixinMsg: "这是mixin的数据",
    };
  },
  created() {},
  methods: {
    onClick() {},
  },
};
```

```js demo.vue
import minin1 from "./mixins/data.js";

export default {
  mixins: [minin1],
  data() {
    return {
      mixinMsg: "这是mixin的数据",
    };
  },
  created() {},
  methods: {
    onClick() {},
  },
};
```

## 全局混入

```js
Vue.mixin({
  data() {
    return {
      $_globalMsg: "全局mixin数据",
    };
  },
  created() {
    console.log("触发全局mixin的Created");
  },
  methods: {
    $_globalMixin() {
      console.log("$_globalMixin");
    },
  },
});
```

## 参考

https://juejin.im/post/6856232743286767624
