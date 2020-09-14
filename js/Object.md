# JS 对象

不保证顺序

Array 保证顺序

## key

JS 对象的 key 没有限制, 可以数字或字符串, 也`可以数字开头`的混合 key
数字或数字开头的 key 需要 obj[key] 中括号调用

## 遍历

var obj = {'0':'a','1':'b','2':'c'};
Object.keys(obj).forEach(function(key){
console.log(key,obj[key]);
});

## empty

```js
JSON.stringify(data) == "{}";
Object.keys(data).length === 0;

const obj = {
  a: "a",
  b: "b",
};
for (const [key, val] of Object.entries(obj)) {
  console.log(key, val);
}
Object.keys(obj).forEach((key) => {
  console.log(key, obj[key]);
});
let a = Object.entries(obj); // [ [ 'a', 'a' ], [ 'b', 'b' ] ]
```

## 包装方法, 继承

```js
const originPrototype = Array.prototype;
const nextPrototype = Object.create(originPrototype);
nextPrototype["push"] = function () {
  originPrototype.apply(this, arguments);
  // do something
};
```

## 纯对象 PureObject

```js
let o = {}; // 会继承原型链
Object.create(null); // 不继承原型链
Object.create(null, {
  a: {
    writable: true,
    configureable: true,
    value: 1,
  },
});
```

## 对象合并

https://scarletsky.github.io/2016/04/02/assign-vs-extend-vs-merge-in-lodash/

```js
Object.assign(target, obj, obj2); // 浅合并, 改变原数组, 覆盖属性
_.merge(target, patch); // lodash merge, 深合并,  改变原数组, 合并属性
_.defaultsDeep(target, patch); // lodash 设置对象未定义属性 设置默认值,  深合并 ,改变原数组
```

# 参考

1. JS 中判断空对象
   https://www.cnblogs.com/sefaultment/p/9444345.html
