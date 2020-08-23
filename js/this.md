## this

LINK
https://segmentfault.com/a/1190000018696018#articleHeader9
https://segmentfault.com/a/1190000016680885#articleHeader3

1. JavaScript this 的六道坎
   https://blog.crimx.com/2016/05/12/understanding-this/

匿名函数
谁调用 指像谁

箭头函数
看定义的时候 外层的内容

## call

LINK
call bind apply 的区别
https://juejin.im/post/59bfe84351882531b730bac2#heading-9

```js
function add(c, d) {
  this.a = 1;
  console.log(this);
  console.log(this.a);
  console.log(c);
  return this.a + this.b + c + d;
}
var o = { a: 1, b: 3 };
let a = add(3, 7); // 1 + 3 + 5 + 7 = 16
//   console.log(a);
//   add.apply(o, [10, 20]); // 1 + 3 + 10 + 20 = 34
// call、apply和bind：this 是第一个参数
```

// const o = {
// name: "o",
// Parent: Parent,
// B: () => {
// // 箭头函数 在这里仅是个表达式, 并不再 o 对象里面, , 箭头函数指向 globalThis. 箭头函数的 this 不可变
// console.log(this.name); // undefined
// console.log(this); // {} | window
// },
// }
