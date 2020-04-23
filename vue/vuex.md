# vuex 的使用

mutations/commit dispatch/actions   的关系

commit/mutations 同步

不直接使用 mutations 函数, 而是通过 commit 调用
store.commit('increment', 10)

dispatch/actions 异步

不直接使用 actions 函数, 而是通过 dispatch 调用
store.dispatch('increment', 10)

mapActions、mapGetters、mapMutations、mapState这几个辅助方法


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

## 其他

provide and inject


## 资料

1. 理解Vuex，看这篇就够了
https://mobilesite.github.io/2016/12/18/vuex-introduction/

2. 浅谈vue中provide和inject 用法
https://juejin.im/post/5c983d575188252d9a2f5bff

3. 
https://vuex.vuejs.org/zh/

