# Event Loop

JavaScript是单线程的语言
Event Loop是javascript的执行机制

# 宏任务 微任务

1. 宏任务一般是：包括整体代码script，setTimeout，setInterval、setImmediate。
2. 微任务：原生Promise(有些实现的promise将then方法放到了宏任务中)、process.nextTick、Object.observe(已废弃)、 MutationObserver

```js

console.log('1');

setTimeout(function() {
    console.log('2');
    process.nextTick(function() {
        console.log('3');
    })
    new Promise(function(resolve) {
        console.log('4');
        resolve();
    }).then(function() {
        console.log('5')
    })
})
process.nextTick(function() {
    console.log('6');
})
new Promise(function(resolve) {
    console.log('7');
    resolve();
}).then(function() {
    console.log('8')
})

setTimeout(function() {
    console.log('9');
    process.nextTick(function() {
        console.log('10');
    })
    new Promise(function(resolve) {
        console.log('11');
        resolve();
    }).then(function() {
        console.log('12')
    })
})

/* 

1 7 

同步 2 c 4 a 

宏 v 3 5 

微


*/

// 链接：https://juejin.im/post/5b498d245188251b193d4059

```