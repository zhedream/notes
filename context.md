# context 上下文

context 不是什么高深的东西, 简单理解就是 `附加参数`

但是 有意义/有关联的 参数, 可以理解 调用者(或者框架) 传递的`附加参数`

context , 理解 context 语义 , 上下文

狗.doing('跑',{name:'狗',foods:'狗粮'})
人.doing('跑',{name:'人',foods:'米饭',phone})

都是 doing 函数, 根据 角色, 权限, 其他情况, 传递相关的数据

`框架`会包装 函数, 在调用的时候 , 把一些参数放进一个对象 context (当然也可以平铺, 但大都放进一个变量里) , 一起传

柯基.doing('吃',{instance:柯基,狗粮:''})

## 总结

用 context 的函数, 一般是纯函数, 避免 this
context 附加参数, 获取方式

1. 函数参数 do(params,context)
2. 通过钩子函数 const context = useContext();

## 其他

```ts
function doing(type, context) {
  console.log(type);
}

@axios()
function doing(type, context) {
  context.axios;
  console.log(type);
}

// 我写了一个框架
function doing:jq:axios(type,context){
  context.jq;
  context.axios;
}
```

```js
export default {
  props: {
    title: String,
  },
  setup(props, context) {
    console.log(props.title);
  },
};
```
