# render

iview 中常用,自定义

# 强制渲染

使用 v-if 或 改变 key
v-if="reFresh" 重置的数据
:key="menuKey" 推荐, 会保留数据

1. vue 强制组件重新渲染（重置）
   https://blog.csdn.net/zyx1303031629/article/details/86656785

2. forceUpdate
`this.$forceUpdate()`

Vue 中 v-for 遍历多层嵌套数据，不能重新渲染的问题
https://blog.csdn.net/qq_36952874/article/details/83348804
