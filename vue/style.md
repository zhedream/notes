
## 绑定 class

<div
  class="static"
  v-bind:class="{ active: isActive, 'text-danger': hasError }"
></div>

## 绑定样式

```html
<div :style="{width:widthPx,height:heightPx}">
</div>

```
有数据则会绑定上去, 没有数据或 false 不会绑定样式

配合 计算属性



## 样式隔离与样式穿透

在开发中修改第三方组件样式是很常见，但由于 scoped 属性的样式隔离，可能需要去除 scoped 或是另起一个 style 。
这些做法都会带来副作用（组件样式污染、不够优雅），样式穿透在css预处理器中使用才生效。
我们可以使用 >>> 或 /deep/ 解决这一问题:

```vue
<style lang="less" scoped>
外层 >>> .el-checkbox {
  display: block;
  font-size: 26px;

  .el-checkbox__label {
    font-size: 16px;
  }
}
</style>

<style lang="less" scoped>
/deep/ .el-checkbox {
  display: block;
  font-size: 26px;

  .el-checkbox__label {
    font-size: 16px;
  }
}
</style>

```

摘自:https://mp.weixin.qq.com/s/X_umpMpPy7IJ5tuULrehGA

