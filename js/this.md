## this

LINK
https://segmentfault.com/a/1190000018696018#articleHeader9
https://segmentfault.com/a/1190000016680885#articleHeader3

1. JavaScript this 的六道坎
   https://blog.crimx.com/2016/05/12/understanding-this/

匿名函数
谁调用 指像谁

箭头函数: 本身没有 this, 出生的地方/被创建时的作用域的 this. 就是箭头函数的 this.
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

## Demo

箭头函数, this 指向

```js
/* == demo1 */

function CarServe(flower) {
  return new Promise((res) => {
    setTimeout(() => {
      res(`谢谢你的 ${flower.count}朵 ${flower.gift}, 嗯.., 你是个好人`);
    }, 100);
  });
}

function buy(order) {
  setTimeout(() => {
    const { cb, gift, money } = order;
    const flower = {
      gift: gift,
      count: money / 10,
    };
    cb(flower);
    // order.cb(flower);
  }, 100);
}

const V = {
  name: "小 V",
  money: 100,
};

// 送礼
function sendGift() {
  console.log(this); // 小 V
  let that = this;
  const order = {
    gift: "玫瑰",
    money: this.money, // 正确使用 this
    cb(flower) {
      CarServe(flower).then((message) => {
        console.log(message);
        //  .then 的回调,使用箭头函数, 为什么 还要  通过 闭包, 获取正确的 this
        console.log(`${that.name}: 哎, 我的 ${that.money} 块钱.`);
      });
    },
  };
  buy(order);
}
sendGift.call(V);

/* == demo2 */

function getArrowFn() {
  let ArrowFn = () => console.log(111, this); // 这里的 this 时什么
  return ArrowFn;
}

let obj = {
  name: "obj",
  fn: getArrowFn, // 函数没有执行,  ArrowFn 并没有被创建
};

let tem = {
  name: "tem",
};

obj2 = {
  fn0: getArrowFn(),
  fn1: getArrowFn(),
  fn2: obj.fn(), // getArrowFn 被执行 , 此时 ArrowFn 才被创建,    getArrowFn 的 { ... } 的作用与 this 为 obj
};

obj2.fn1();
obj2.fn2();
```
