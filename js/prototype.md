## 原型链+借用构造函数的组合继承

```js
// LINK https://segmentfault.com/a/1190000018696018#articleHeader9
function Parent(value) {
  this.val = value;
  this.name = "name1";
}
Parent.prototype.getValue = function () {
  console.log(this.val);
};
function Child(value) {
  Parent.call(this, value); // 相当于 执行  构造函数     Parent 可以理解成一个  类 / 原型 ，本身也是一个  构造函数
}
Child.prototype = new Parent();
const child = new Child(1);
child.getValue(); // 1
child.name = "name2";
console.log(child);
console.log(child instanceof Parent); // true
/* 
 这种方式 会有多余的  原型 Parent 会有多余的  name
 child.name => name2
 Parent.name => name1
*/
```

## 寄生组合继承：这种继承方式对上一种组合继承进行了优化

```js
function Parent(value) {
  this.val = value;
  this.name = "123";
}
Parent.prototype.getValue = function () {
  console.log(this.val);
};
function Child(value) {
  Parent.call(this, value);
}
Child.prototype = Object.create(Parent.prototype, {
  constructor: {
    value: Child,
    enumerable: false,
    writable: true,
    configurable: true,
  },
});
const child = new Child(2);
child.getValue(); // 1
child.name = "name2";
console.log(child.name);
console.log(child);
console.log(child instanceof Parent); // true

/* 
 这种方式 Parent 则不会有多余的   name
 child.name => name2
 Parent.name => 无
*/
```

## class

```js
class Parent {
  constructor(value) {
    this.val = value;
  }
  getValue() {
    console.log(this.val);
  }
}
class Child extends Parent {
  constructor(value) {
    super(value); // 看成 Parent.call(this, value)
    this.val = value;
  }
}
let child = new Child(1);
child.getValue(); // 1
child.name = "name2";
console.log(child);
console.log(child instanceof Parent); // true
```

## 乱七八糟

脑洞一下: 妖收的记忆传承 VS 人的教师传递知识.

```js
function f1() {}
var f2 = function () {};
var f3 = new Function("x", "console.log(x)");
// f1，f2 在创建的时候，JS会自动通过 new Function() 的方式来构建这些对象，因此，这三个对象都是通过 new Function() 创建的。

var o1 = {};
var o2 = new Object();
var o3 = new f1();
// o1 h和 o2 是一样的, 只是形式不一样. o3 则使用 自定义函数 构建 对象

// 1. 内置对象 Function
Function.prototype.name = "MyChild"; // @@ prototype 是该 函数对象, 留给 实例 的资产,
Function.prototype.age = 18; // @@ prototype 是该 函数对象, 留给 实例 的资产,
Function.prototype.money = 100; // @@ prototype 是该 函数对象, 留给实例 的资产,
Function.prototype.data = {
  a: "AA",
  b: "BB",
}; // @@ prototype 是该 函数对象, 留给 实例 的资产,
Function.money; // undefined , prototype 对 Function 不可见

// 2. 函数对象 Parent, var Parent = new Function('name', 'console.log(name)');
function Parent(name = "myname") {
  // 作为普通函数, 一般来说 谁掉用 Parent 谁就是 this.  或者 被 bind  改变了 this 指向.
  // console.log(this); // globalThis | window
  this.name = name;
  this.ccc = "CCCC";
}

// Parent 自身是一个函数对象, 所以自带特殊的属性 name, leng 等关键字, 还有资产 __proto__ , 普通属性为空 {},
Parent.__proto__; // Function 留给下一代 的资产 , 放在 __proto__
Parent.name; // Parent , 这里 name 是关键字, 函数名
Parent.money; // 100 , 自身属性没有, money 但是 __proto__ 资产有
Parent.data; // 引用赋值

Parent.prototype.message = "hello"; // 给 实例 的 资产

// 3. 普通对象,   Parent 的实例 parent1
const parent1 = new Parent(11);
parent1.money; // undefined , Function.money 不能跨 两代. 这里比较特殊特殊 Function
parent1.message; // hello , parent1 自身没有 message  但是 parent1.__proto__ 有 Parent 留给自己的资产 prototype

// 4. 函数对象 Son
function Son(name = "default_son") {
  // Parent.call(Son, ...arguments)
  this.name = name;
}
Child.prototype = new Parent();

const son = new Son(name);
console.log(parent1);
console.log(son);
```
