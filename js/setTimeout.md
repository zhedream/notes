# setTimeout 和 setInterval

WindowOrWorkerGlobalScope.setTimeout 作用域吧
window.setTimeout // window 下
scope.setTimeout; // 当前作用域 scope 省略直接 setTimeout

## 语法

var timeoutID = scope.setTimeout(function[, delay, arg1, arg2, ...]);
var timeoutID = scope.setTimeout(function[, delay]);
var timeoutID = scope.setTimeout(code[, delay]);
clearTimeout(timeoutID); // 清除定时器, 在执行之前清除, 就不会触发了

var intervalID = scope.setInterval(func, delay, [arg1, arg2, ...]);
var intervalID = scope.setInterval(code, delay);
clearInterval(intervalID); // 清除定时器


```js

function myCallback(...params){ console.log(parmas) }
let intervalID = window.setTimeout(myCallback, 500, 'Parameter 1', 'Parameter 2');

let intervalID = window.setTimeout('code', 500, 'Parameter 1', 'Parameter 2');



```

## timers 库

node 的内置库 timers 也有 setTimeout 和 setInterval

编译打包后 和 window.setTimeout 不一样, 但使用什么的是一样的

