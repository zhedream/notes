# 渐进式 typescript


- 转变思想：ts 即注释，我可以不写，你不能不写

ts 的功能无非，就是代码智能提示和约束。
写 ts 优点：功能即优点--提示和约束。
写 ts 缺点：增加代码量和约束。

增加一个类型，在我看来就是增加注释。

写注释优点：增加提示
写注释缺点：增加代码量

大家遇到看不懂的代码，也希望有注释吧。有人可能不爱写注释，但却希望别人的代码有注释。

大家写代码，都希望有精确的代码提示吧，所以大家可以不写 ts，但是不能排斥 ts，毕竟 ts 能为编辑器提供这能力。我们必须转变思路，我写的代码可以不写类型，你的代码必须有类型。

- 抗拒 ts 的原因

大家排斥 ts 的关键无非俩点：
1. 就想写注释一样，增加了代码量，不想写。
2. 引入 ts 受到约束，代码飘红，跑不起来。

代码量，和学习成本。

使用类型是几乎没成本的

写类型会增加代码量，很烦，想写注释一样

修改类型



- 工作中常用的 ts

1. 级别1

基本类型
元组
const
递归
动态属性

2. function 类型

泛型：通用的，贯穿 入参和出参
泛型约束: 用到泛型属性，必须有的部分
函数重载：类型上的重载，实际还需要 js 逻辑实现。

3. 一些工具函数

修改一些类型

4. 再往上就是类型体操了。

- 最佳实践

使用非严格模式。 + 允许 js , 两个字 丝滑。
 
你完全可以写 .ts 文件，当 .js 文件写，完全可以不写任何类型包括 any，就依靠自动推断好了。否则就是默认any，要太丝滑，那大家可能会说，这样的意义在哪，还不如 .js 

意义就在于，渐进式 typescript，不想写或不会写复杂类型就不写。后续想用类型也完全没有问题。

学会一下三点，那么你将在 .ts 如鱼得水。

1. "strict": false
2. "allowJs": true
3. 使用 let xxx;

```ts

// 推断类型： function add(a: any, b: any): number
function add(a, b) {
  return a - b;
}


// 推断类型： {name:string,age:number}
let dog = {
  name: "柯基",
  age: 5,
};

// 报错：类型“{ name: string; age: number; }”上不存在属性“newProp”。ts(2339)
dog.newProp = 2;
// 报错：不能将类型“string”分配给类型“number”。ts(2322)
dog.age = '18';

// 推断类型： any
let user;

user = {
  asd: 123,
};

user.a = 123;


```