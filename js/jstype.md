# 如何判断JS 数据类型

```js

/* typeof */

typeof(val); // 只能判断 基础 不可变的 数据类型 如: string, boolean number symbol

/* instanceof */

const a = [];
const b = {};
console.log(a instanceof Array);//true
console.log(a instanceof Object);//true,在数组的原型链上也能找到Object构造函数
console.log(b instanceof Array);//false

/* Object toString */

const a = ['Hello','Howard'];
const b = {0:'Hello',1:'Howard'};
const c = 'Hello Howard';
Object.prototype.toString.call(a);//"[object Array]"
Object.prototype.toString.call(b);//"[object Object]"
Object.prototype.toString.call(c);//"[object String]"


/* Array isArray */

const a = [];
const b = {};
Array.isArray(a);//true
Array.isArray(b);//false





```

在JavaScript中，如何判断数组是数组？
https://segmentfault.com/a/1190000006150186

