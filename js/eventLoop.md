# Event Loop

JavaScript 是单线程的语言
Event Loop 是 javascript 的执行机制

# 宏任务 微任务

1. 宏任务一般是：包括整体代码 script，setTimeout，setInterval、setImmediate。
2. 微任务：原生 Promise(有些实现的 promise 将 then 方法放到了宏任务中)、process.nextTick、Object.observe(已废弃)、 MutationObserver

```js
console.log("1");

setTimeout(function () {
  console.log("2");
  process.nextTick(function () {
    console.log("3");
  });
  new Promise(function (resolve) {
    console.log("4");
    // resolve();
  }).then(function () {
    console.log("5");
  });
});
process.nextTick(function () {
  console.log("6");
});
new Promise(function (resolve) {
  console.log("7");
  resolve();
}).then(function () {
  console.log("8");
});

setTimeout(function () {
  console.log("9");
  process.nextTick(function () {
    console.log("10");
  });
  new Promise(function (resolve) {
    console.log("11");
    resolve();
  }).then(function () {
    console.log("12");
  });
});

/* 

1 7 

同步 2 c 4 a 

宏 v 3 5 

微


*/
```

宏任务（Macrotask）微任务（Microtask）setTimeoutrequestAnimationFrame（有争议）setIntervalMutationObserver（浏览器环境）MessageChannelPromise.[ then/catch/finally ]I/O，事件队列 process.nextTick（Node 环境）setImmediate（Node 环境）queueMicrotaskscript（整体代码块）

## demo

@demo/js/EventLoop.js

## 参考

1. JS 事件循环机制（event loop）
   https://juejin.im/post/5b498d245188251b193d4059
2. 微任务、宏任务与 Event-Loop
   https://juejin.im/post/5b73d7a6518825610072b42b
3. 从一道让我失眠的 Promise 面试题开始，深入分析 Promise 实现细节
   https://juejin.cn/post/6945319439772434469
