# Event Loop

JavaScript 是单线程的语言
Event Loop 是 javascript 的执行机制

宏任务 -> 同步代码 -> 微任务

银行办理业务

代码调度, 代码执行时机

vue 再一个宏任务内, 不会变更视图.
this.$nextTick()将回调延迟到下次 DOM 更新循环之后执行。是一个 宏任务

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

识别微任务 识别微任务所属宏任务, 识别宏任务的微任务 类似 this 指向,

标记 xx 执行微任务

宏任务（Macrotask）微任务（Microtask）setTimeoutrequestAnimationFrame（有争议）setIntervalMutationObserver（浏览器环境）MessageChannelPromise.[ then/catch/finally ]I/O，事件队列 process.nextTick（Node 环境）setImmediate（Node 环境）queueMicrotaskscript（整体代码块）

事件循环中的任务被分为宏任务和微任务，是为了给高优先级任务一个插队的机会：微任务比宏任务有更高优先级。

node 端的事件循环比浏览器更复杂，它的宏任务分为六个优先级，微任务分为两个优先级。node 端的执行规律是一个宏任务队列搭配一个微任务队列，而浏览器是一个单独的宏任务搭配一个微任务队列。但是在 node11 之后，node 和浏览器的规律趋同。

https://juejin.cn/post/7073099307510923295

## demo

@demo/js/EventLoop.js

## 参考

1. JS 事件循环机制（event loop）
   https://juejin.im/post/5b498d245188251b193d4059
2. 微任务、宏任务与 Event-Loop
   https://juejin.im/post/5b73d7a6518825610072b42b
3. 从一道让我失眠的 Promise 面试题开始，深入分析 Promise 实现细节
   https://juejin.cn/post/6945319439772434469
4. 微任务、宏任务与 Event-Loop
   https://juejin.cn/post/6844903657264136200
