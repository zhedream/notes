# transition

vue 内置组件, 用于处理 css 过度效果/动画

vue 会在合适的时机添加 class, 以触发过度效果

注意: 在初始渲染的时候, 并不能触发效果.

```xml
<transition name="stretch">
  <HelloWorld class="stretch-defalut" v-show="show" />
</transition>
```

```less
.stretch-defalut {
  position: absolute;
  top: 300px;
  left: 20%;
  width: 500px;
  height: 500px;
  overflow: hidden;
}
// 进入: .xxx-enter{} .xxx-enter-active{} .xxx-enter-active-to{}
// 退出: .xxx-leave{} .xxx-leave-active{} .xxx-leave-active-to{}
.stretch-enter,
.stretch-leave-to {
  height: 0;
}
.stretch-enter-active,
.stretch-leave-active {
  // transition: all 0.382s;
  transition: height 0.382s; // 给高度加过度效果
}
```
