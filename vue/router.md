# router

https://router.vuejs.org/zh/

根据 浏览器地址, 控制 页面/组件 的显示

```js
1. this.$route.name
2. this.$route.path
3. this.$route.matched[0].name, // 一级路由名称
```

## 基础使用

<router-view></router-view>

## 动态路由 (参数)

## 嵌套路由

## 路由守卫

## 数据获取

https://router.vuejs.org/zh/guide/advanced/data-fetching.html#在导航完成前获取数据

```js
// 路由导航前
// 组件未渲染，通过给next传递回调访问组件实例
beforeRouteEnter (to, from, next) {
  getPost(to.params.id, post => {
    next(vm => vm.setData(post))
  })
}
// 组件已渲染，可以访问this直接赋值
beforeRouteUpdate (to, from, next) {
  this.post = null
  getPost(to.params.id, post => {
    this.setData(post)
    next()
  })
}

//路由导航后
created(){ }
```

## 动态添加路由 (运行时)

```js
this.$router.addRoutes([
  {
    path: "/about", //...
  },
]);
```

## 路由组建缓存

使用 include 或 exclude 时要给组件设置 name

<keep-alive include="name,name1"></keep-alive>
<keep-alive :include="[name]"></keep-alive>
<keep-alive :include="" max=''></keep-alive>
<router-view></router-view>

keep-alive 下的 组建神民周期

两个特别的生命周期：activated、deactivated , 两个状态钩子 激活/非激活
