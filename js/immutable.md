# Immutable.js

再 js 中, 为了节省内存, 操作 对象/数组的数据, 都会采用引用赋值的方式 ( 所有编程语言都是这样处理的吧 )

在很多情况 我们会对数组/对象进行处理成一个新的变量 再使用, 且保留老数据 之后用.
但是因为是引用赋值, 我们改变 新的数据, 仍然可能影响老数据.

不想改变原数据,要怎么办呢

1. 深拷贝 // 完全不影响老数据 , 消耗性能
2. 拓展运算符 [...data], 也是浅拷贝 , 浅层数据不影响, 深层的对象仍然是 引用赋值
3. JSON.parse(JSON.stringify(data)) , 只会得到明面上的数据, 会丢失 prototype 等数据/方法

Immutable.js

就是这么一个解决方案, 利用各种数据结构和算法
解决对象/数组引用可能导致的不确定问题
解决 深拷贝性能问题

**需要注意的**
经过 Immutable 处理过的 数据 都是 Immutable 专门的数据, 而不是普通的 js 数据了.
操作数据的方式, 需要遵循 Immutable
就好像, js 的 dom , 与 jq 的 dom 一样

所有 Immutable.js 集合都是 Iterable. 都是能正常遍历的

## 相关

1. js 中基本数据类型的值不可变

2. 对象引用/引用赋值

3. 浅拷贝/深拷贝

4. 拓展运算符

5. JSON.stringify/parse

## Immutable 概念

1. Immutable 翻译: 不变的

2. JavaScript 的不可变集合

3. 不变的数据一旦创建就无法更改，从而可以简化应用程序开发，进行防御性复制，并可以使用简单的逻辑实现高级的备忘和更改检测技术,
   持久数据提供了一个可变 API，该 API 不会就地更新数据，而是始终产生新的更新数据。

# 使用

1. 命名规则
   $$data; // .如所有 Immutable 类型对象以 $$ 开头。

2. 常用的数据结构
   Map：键值对集合，对应于 Object，ES6 也有专门的 Map 对象
   List：有序可重复的列表，对应于 Array
   Set：无序且不可重复的列表
   seamless-immutable

3. 推荐使用 TS, flow 等类型检查

```ts
import { fromJS, List, Map } from "immutable";

// 创建 Immutable 数据
Immutable.fromJS();
Immutable.Map();
Immutable.List();

// 操作/遍历 Immutable 数据
$$dataList = $$data.set(key, val) as List<number>;
$$dataMap = $$dataMap.setIn(["a", "2"], 3); // dataMap['a'][2] = 3

// 转回 原js数据
let dataList = $$dataList.toJs() as Array<any>; //
```

# 参考资料

1. Immutable.js 了解一下？
   https://juejin.im/post/5ac437436fb9a028c97a437c

2. 如何理解 js 中基本数据类型的值不可变
   https://blog.csdn.net/WinstonLau/article/details/88754704

3. immutable 官网
   https://immutable-js.github.io/immutable-js/

4. immutable.js 中文文档 | github
   https://github.com/guisturdy/immutable-js-docs-cn

5. immutable 入坑指南 | 知乎
   https://zhuanlan.zhihu.com/p/33459899

6. Immutable 详解及 React 中实践
   https://github.com/camsong/blog/issues/3

7. 处理 JavaScript 复杂对象：深拷贝、Immutable & Immer
   https://juejin.cn/post/6844903687748321294
