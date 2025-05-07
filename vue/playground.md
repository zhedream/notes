# vue playground

https://play.vuejs.org/

查看 js css 编译结果。

```html
<script setup lang="jsx">
import { defineComponent } from 'vue';
import { createVNode } from 'vue';
import { h } from 'vue';
import { onMounted } from 'vue';
import { ref } from 'vue'

const msg = ref('Hello World!')


const TextComponent = defineComponent((props) => {
  onMounted(() => {
    console.log('onMounted')
  })
  return () => (
    <input value={props.value}></input>
  );

})

console.log('TextComponent1', TextComponent)

const TextFn = (props) => {
  return (
    <input value={props.value}></input>
  )
}

const h3 = <h3>h3</h3>;
console.log(h3)
const h4Fn = () => <h4>h4</h4>;

// 组件实例：包含渲染函数 + 维护数据/业务逻辑
// 渲染函数 = 纯函数组件  渲染函数的作用就是获取 VNode / 新的 VNode
// 虚拟dom vdom VNode: 是描述真实 dom 的配置对象。diff 精细化控制，配置化-> 声明式，直观，面向结果，需求，用户侧 -> 自动化
// createVNode 作用创建 VNode， 传入参数，支持 VNode, option， 渲染函数

// wow：梳理了，精简高效正确的路径索引图。索引、上下文

// 渲染函数 和 组件实例：组件实例是渲染函数的封装。维护了数据/业务逻辑

/**
组件实例
  ├─ 数据/业务逻辑
  ├─ 生命周期
  └─ 渲染函数
         ↓
      VNode（虚拟DOM）
         ↓
   Vue 内部 patch
         ↓
     真实 DOM
 */

// 阶段1：
const VNodeComponentOld = createVNode(TextComponent, { value: msg.value })
// 创建更新 dom
// 修改 msg
// 手动创建更新 dom

// 阶段2：
let LastVNode
const render = () => {
  return createVNode(TextComponent, { value: msg.value })
}

const patchDom = () => {
  const nextDom = render()
  // 对比更新 dom
  LastVNode = nextDom;
}

// 阶段3：封装组件实例


const Com = (props) => {

  return (
    <>
      <TextFn value={props.value} ></TextFn>
      {createVNode(TextFn, { value: props.value })}
      {h(TextFn, { value: props.value })}
      {TextFn({ value: props.value })}

      <TextComponent value={props.value} ></TextComponent>
      {h(TextComponent, { value: props.value })}
      {createVNode(TextComponent, { value: props.value })}
    </>
  )
}

</script>

<template>
  <h1>{{ msg }}</h1>
  <input v-model="msg" />
  <Com :value="msg" />
</template>

<style scoped>
h1 {
  color: red;
}

:deep() h1 {
  color: red;
}
</style>
```