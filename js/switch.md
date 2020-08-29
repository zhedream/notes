# switch 块分支

```js
// 每个 if 分支 都需要 运算
const arr = [
  { key: "a", fn: () => {} },
  { key: "b", fn: () => {} },
  { key: "c", fn: () => {} },
];
let k = "a";
arr.find((e) => e.key == k).fn();

// switch 跳转表,  有字典的意思, 直接命中
const map = {
  a: () => {},
  b: () => {},
  c: () => {},
  d: () => {},
};
const key = a;
map[key]();
```

```js
// 方案
function dis(key) {
  ({
    key1: () => {},
    key2: () => {},
    key3: () => {},
  }[key]());
}
```

就一般情况, 两三个分支, if 性能, 不比 switch 慢

if 灵活, 简洁

switch 比较繁琐

1. if 与 switch 选择
   https://www.jianshu.com/p/a886b8e6c42d

2. if 和 switch 的效率
   https://juejin.im/post/6844903585868677133

3. switch 跟 if-else 性能比较
   https://blog.csdn.net/xiaohubeiplus/article/details/51454174
