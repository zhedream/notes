# CDN 依赖

如果不是单机部署,完全可以将 Vue, antd, zhe 这类 `全局` 公共资源 CDN 引入.

1. 可以很直接的减少打包体积,
2. 减少带宽
3. CDN 就近加速资源加载

```js vue.config.js
// 在html引入script标签后。在vue的配置中，进行声明
...
configureWebpack: {
  externals: {
    'echarts': 'echarts' // 配置使用CDN
  }
}
...
```

## 参考

总结我对 Vue 项目上线做的一些基本优化 | wangly19
https://juejin.im/post/5f0f1a045188252e415f642c#heading-16

## BOOTCDN

https://www.bootcdn.cn/all/

## unpkg

https://unpkg.com/vue@2.6.11/dist/vue.js


还有要注意, 开发需要频繁  强制刷新清缓存, 最好用 本地 jq , 太频繁可能会被屏蔽 ip

