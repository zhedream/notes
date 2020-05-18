# undefined 和 null

undefined 和 null 在 if 判断时候没有什么区别, 都是 false

区别就是 语义和状态 上的不同.

undefined: 未定义的. 没有经过人为修改的. 初始的状态
null: 空的. 人为修改

```js

let a;
// a => undefined
// 变量声明 但未定义就是 undefined

```

虽然说, undefined 语义上 表示 没有经过人为修改的,
并不是我们就不能 给变量 赋值 undefined, 可以理解为, 手动让变量 恢复到 初始的状态嘛

undefined 毕竟和 null 有区别, 也是有作用的.
```js

function fn(b='default'){
  console.log(b);
}

let a;
fn(a); // default

let b = 'hello'
fn(b); // hello

b = null;
fn(b); // null

b = undefined;
fn(b); // default

// 结构赋值同理

const data = { name: 'lisi', age: 12 };
const { name = 'zhansang', age = 18, height = 175 } = data

// undefined 和 null 不能进行解构
//  {} 和 []  能结构


```

