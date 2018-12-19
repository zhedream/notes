# NG-ZORRO

## ee
Angular 有三大块 内容  `模块` `组件` `路由`  其中路由不是一定要（简单的应用比如就一个页面）

一般应用会分为好几个页面
组件可以细分 页面级/普通 组件
为了保持好的拓展性和可维护性，我们将每个`大页面`都划分为一个独立的`模块`
页面/组件的显示
`路由`则可以控制 组件的 加载 / 加载后 才能操作





## 指令

1. ng g m pages/setup --module app   创建模块 setup 在 APP 模块中注册
2. ng g c pages/setup --module pages/setup  创建setup模块的组件(页面)   在setup 模块中注册
