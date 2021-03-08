vue-carousel.md

vue 好用的 走马灯

github:
https://github.com/SSENSE/vue-carousel

api文档:
https://ssense.github.io/vue-carousel/api/

```js
// 方法1: use 安装
Vue.use(VueCarousel);
// 方法2: 自定义组件名称: 与使用的 UI 库, 组件名冲突
Vue.component("VueCarousel", VueCarousel.Carousel);
Vue.component("VueSlide", VueCarousel.Slide);
```
