https://cn.vuejs.org/v2/api/

# 自定义构建配置

https://moe.best/gotagota/vue-build-from-specified-config.html

```json
"scripts": {
    "build1": "node build.dist1.js",
  },
```

```js build.dist1.js
const { spawnSync } = require("child_process");
const { resolve } = require("path");

spawnSync("npm", ["run", "build"], {
  shell: true,
  env: {
    ...process.env, // 要记得导入原本的环境变量
    VUE_CLI_SERVICE_CONFIG_PATH: resolve(__dirname, "vue.build1.config.js"),
  },
  stdio: "inherit",
});
```

# watch

watch 的作用, 上传下达. props

场景 1: 取消 重置 确定 需求, 用于 innerData 中间缓存数据

handler 使用普通函数, 不用箭头函数, 否则 this 将不会按照期望指向 Vue 实例.

```js
var vm = {
  watch: {
    data1: [],
    "data2.name": function () {},
    data3() {},
    data4: {
      handler: function (next, pre) {
        this.innerData = next;
      },
      immediate: true,
      deep: true,
    },
  },
};
```

# hover

```html
<span @mouseover="hoverShow=true" @mouseleave="hoverShow=false"></span>
```

## 事件 .native.stop.prevent

2021 年 4 月 28 日 15 点 31 分
要阻止点击事件
stopImmediatePropagation 阻止其他事件函数
stopPropagation 阻止冒泡和捕获
preventDefault 阻止默认行为
普通标签 @click.stop.prevent
组件标签 @click.native.stop.prevent

对于普通标签 @ 的事件 就是原生事件
对于组件 @ 的事件 是合成事件, 也就是 $emit

有的时候 在 组件上使用 @click.stop.prevent 也能阻止 , 是因为
是因为组件内部 $emit('click') 作用的就是 原生 click.

.native 是用在组件上的, 用在普通标签上 没有意义
用了 .native 不会用合成事件 $emit ,而是 这个组件对应的 标签的事件

# 生命周期

```js
var vm = {
  created() {},
  mounted() {},
  beforDestroy() {},
};
```

# props

update:xxx
应该先行于事件, 否则 v-model sync 数据会不一致

```js
var vm = {
  props: {
    value: {
      type: String, // Number Array
      required: true,
      default: function () {
        return "hello";
      },
    },
  },
};
```

# 知识点

provider/inject
不是响应式的, 异步数据, 引用

`computed` 一些联动的 数据可用 前端分页 , 强耦合 , 注意递归问题

## 性能优化

每一个组件都有一个 watcher, 负责一个页面的渲染

## data

不必要的响应数据

## props

不要直接绑定对象/数组. :dataSource="{}"
否则每次更新都是 新的地址,导致 组件重新渲染


## 复杂逻辑 交互

使用用户 直接点击的

使用一手数据, 不用 watch 的数据, 