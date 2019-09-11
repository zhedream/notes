## 原型链+借用构造函数的组合继承
```js
// LINK https://segmentfault.com/a/1190000018696018#articleHeader9
function Parent(value) {
    this.val = value
    this.name = 'name1'
}
Parent.prototype.getValue = function () {
    console.log(this.val)
}
function Child(value) {
    Parent.call(this, value); // 相当于 执行  构造函数     Parent 可以理解成一个  类 / 原型 ，本身也是一个  构造函数
}
  Child.prototype = new Parent()
const child = new Child(1)
child.getValue() // 1
child.name = 'name2'; 
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
    this.val = value
    this.name = '123';
  }
  Parent.prototype.getValue = function() {
    console.log(this.val)
  }
  function Child(value) {
    Parent.call(this, value)
  }
  Child.prototype = Object.create(Parent.prototype, {
    constructor: {
      value: Child,
      enumerable: false,
      writable: true,
      configurable: true
    }
  })
  const child = new Child(2)
  child.getValue() // 1
  child.name = 'name2'; 
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
    this.val = value
  }
  getValue() {
    console.log(this.val)
  }
}
class Child extends Parent {
  constructor(value) {
    super(value); // 看成 Parent.call(this, value)
    this.val = value
  }
}
let child = new Child(1)
child.getValue() // 1
child.name = 'name2'; 
console.log(child);
console.log(child instanceof Parent); // true

```