# 数据响应

我们知到 vue 在某些情况不能监测 data 的变化

只有 data() return 的数据才会 有数据劫持

在 data return 之外 ,中途添加 this.before = 'hello' 也不劫持
数组, 对象 整体被替换, 还有 Map, Set 变化, vue 监测不到

this.arr = [];
this.obj = {};

this.dataMap.set('key',data)
this.dataSet.set('key',data)

直接 this.items[0]=... 视图不会更新
this.items[0].message=...视图会更新

1. 重新渲染

```html
<div v-if="isShow==true">
  <div v-for="item in dataMap">
    <!-- some code -->
  </div>
</div>
```

```js
// 重新渲染dom, vue 会重新读取 dataMap
if (this.dataMap.has(key) == false) this.isShow = false;
this.dataMap.set(key, { ...Obj });
setTimeout(() => {
  this.isShow = true; // 强制重新渲染
}, 0);
```

2. Vue.\$set()

Vue.set()和 this.\$set()介绍
https://juejin.im/post/5d3c7dcfe51d45572c060131

3. computed

利用可监测 的数据辅助 vue

让 Vue 响应 Map 或 Set 的变化
https://blog.csdn.net/SGAFPZys/article/details/80754786

```js
vue = {
  data() {
    return {
      dataMap: new Map(), //地图中心的提示信息
      dataMapLock: 0, // 作标识
    };
  },
  computed: {
    dataMapToArr() {
      var x = this.dataMapLock;
      return Array.from(this.dataMap.values());
    },
  },
  methods: {
    dataMapSet(key, val) {
      this.dataMap.set(key, val);
      this.dataMapLock += 1;
    },
    dataMapClear() {
      this.dataMap.clear();
      this.dataMapLock -= 1;
    },
  },
};
```

## Arrary.length

arr.length = 0; // 优点: 清空数组的性能高, 内存地址不会发生改变
Vue 不能检测到 arr.length = 0 的变化

```js
this.conditionSearch1.testSite.length = 0;
this.$set(this.conditionSearch1.testSite, "length", 0);
this.conditionSearch1.testSite = [];
```

## 响应顺序

v-model > @change > watch > computed

data > watch > create > mounted > computed

$watch(): 可以指定在某个生命周期立即执行.

computed: 惰性执行, 第一次在哪个生命周期调用, 就是它首次执行计算的时机.
应该是纯函数. 不要有副作用.

不应该使用箭头函数来定义 watcher 函数

this.$watch(
  "maxSizeInParentBox",
  function (next) {
    console.log(next);
    if (!next) {
      // 取消自动计算
      if (cancelAutoCalc) {
        cancelAutoCalc();
        cancelAutoCalc = null;
      }
    } else {
      // 开启自动计算 父盒子宽高
      cancelAutoCalc = this.initAutoCalcMaxSizeInParentBox();
      const { width, height } = this.calcSizeParentBox();
      this.maxWidthInner = width;
      this.maxHeightInner = height;
    }
  },
  { immediate: true }
);
