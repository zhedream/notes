# props

当使用 父组件传入props 是 Observer 的数据.

Observer 的数据, vue v-for 时, vue 会自动渲染

但是, 很多时候需要 处理数据后, 再 使用.

这时候就会遇到, undefined 之类的情况, 因为数据还没到

因为是异步的, 就算是 钩子函数 mounted 有可能还没值哦

有几种方法, 监测 Observer 数据

1. beforeUpdate 生命周期上 能获取到, 但所有数据,变动都会执行.
2. watch 监听
3. computed 计算属性

使用计算属性 computed, 就可以对 Observer 的数据进行处理了, 可以 v-for 使用处理后的数据了


