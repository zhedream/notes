# 数据响应

我们知到 vue 在某些情况不能监测 data 的变化

只有 data() return 的数据才会 有数据劫持

在 data return 之外 ,中途添加 this.before = 'hello'  也不劫持
数组, 对象 整体被替换, 还有 Map, Set 变化, vue 监测不到

this.arr = [];
this.obj = {};

this.dataMap.set('key',data)
this.dataSet.set('key',data)

直接this.items[0]=... 视图不会更新
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
if (this.dataMap.has(key) == false) 
  this.isShow = false;
this.dataMap.set(key, { ...Obj });
setTimeout(() => {
  this.isShow = true; // 强制重新渲染
}, 0);

```

2. Vue.$set()

Vue.set()和this.$set()介绍
https://juejin.im/post/5d3c7dcfe51d45572c060131


3. computed

利用可监测 的数据辅助 vue 

让Vue响应Map或Set的变化
https://blog.csdn.net/SGAFPZys/article/details/80754786

```js

vue = {
  data(){
    return {
        dataMap: new Map(), //地图中心的提示信息
        dataMapLock: 0, // 作标识
    }
  },
  computed: {
    dataMapToArr() {
      var x = this.dataMapLock;
      return Array.from(this.dataMap.values());
    }
  },
  methods:{
    dataMapSet(key, val) {
      this.dataMap.set(key, val)
      this.dataMapLock += 1;
    },
    dataMapClear() {
      this.dataMap.clear();
      this.dataMapLock -= 1;
    },
  }
}


```

