多路 并行 promise 队列

https://github.com/Bartozzz/queue-promise

如何用 webpack 打包 umd 模块并测试打包结果

https://segmentfault.com/a/1190000018243783

目前没有 浏览器版, 需要自己 用 webpack 打包 umd

```js
// 初始化
let vm = {
  created() {
    this.promise_queue.stop();

    queue.on("start", (data) => console.log("start"));
    queue.on("stop", (data) => console.log("stop"));
    queue.on("end", (data) => console.log("end"));

    queue.on("resolve", (data) => console.log("resolve", data));
    queue.on("reject", (error) => console.error("reject", error));

    // queue.enqueue(function () {
    //   return new Promise((res) => {
    //     setTimeout(() => {
    //       res(11);
    //     }, 0);
    //   });
    // });
  },
  data() {
    return {
      promise_queue: new QueuePromise({
        concurrent: 2, // 并行个数
        interval: 0, // 调用间隔
        start: true,
      }),
    };
  },
  methdos: {
    // 切换显示
    // 进入页面 加载
    // 离开页面 暂停, 后台不做加载
    changeMode() {
      if (this.mode == "平铺") {
        // 开始 自动执行
        if (this.promise_queue.state == 2 || this.promise_queue.state == 0) {
          console.log("start");
          this.promise_queue.start();
          this.promise_queue.options.start = true; // 入队自动 执行
        }
      } else {
        // 暂停 自动执行
        if (trendMap.promise_queue.shouldRun == true) {
          console.log("stop");
          this.promise_queue.stop();
          this.promise_queue.options.start = false; // 入队自动 不自动执行
        }
      }
    },
    changeData(e) {
      this.promise_queue.clear(); // 触发前 队列前, 清空请求队列
      this.All = e;
    },
  },
};
```
