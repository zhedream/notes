# JS 对象

不保证顺序

Array 保证顺序

## key

JS 对象的 key 没有限制, 可以数字或字符串, 也`可以数字开头`的混合key
数字或数字开头的 key 需要  obj[key]  中括号调用

## empty

```js

JSON.stringify(data) == "{}";
Object.keys(data).length === 0;


const obj = {
  a: 'a',
  b: 'b',
}
for (const [key, val] of Object.entries(obj)) {
  console.log(key, val);
}
Object.keys(obj).forEach(key => {
  console.log(key, obj[key]);
})
let a =Object.entries(obj); // [ [ 'a', 'a' ], [ 'b', 'b' ] ]

```

## 纯对象 PureObject

```js
let o = {}; // 会继承原型链
Object.create(null); // 不继承原型链
Object.create(null,{
  a:{
    writable: true,
    configureable: true,
    value: 1
  }
})
```

# 参考
1. JS中判断空对象
https://www.cnblogs.com/sefaultment/p/9444345.html