# WebWorker

通过使用Web Workers，Web应用程序可以在独立于主线程的后台线程中，运行一个脚本操作。这样做的好处是可以在独立线程中执行费时的处理任务，从而允许主线程（通常是UI线程）不会因此被阻塞/放慢。

js 的执行是单线程的, 但是浏览器是多线程的.

worker 是一个 Browser api 接口.
通过worker 可以让 js 有了多线程的能力

## 限制

1. 不能使用 document , dom
2. 不能传函数,dom. 只能传递,纯数据

## 使用场景

1. 后台计算
2. 加密
3. 预取数据
4. 图像处理



## webpack
1. 如何在Webpack打包的项目中使用Web Worker
https://blog.csdn.net/m0_37972557/article/details/80445285


# 参考

1. 聊聊webWorker | 思否
https://segmentfault.com/a/1190000009313491
2. 使用 Web Workers | MDN
https://developer.mozilla.org/zh-CN/docs/Web/API/Web_Workers_API/Using_web_workers
3. Web Worker 使用教程 | 阮一峰
http://www.ruanyifeng.com/blog/2018/07/web-worker.html