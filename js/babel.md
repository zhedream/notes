# babel 是什么

babel 一个 JS 编译器.

babel 把 代码 分析成 ATS 语法树.

根据相应规则和语法. 将代码进行编译转换.

https://babeljs.io/repl

## ES7 转 ES5

将高版本 JS 语法,转换成低版本 JS 语法.
作用就是兼容浏览器

有些用户可能没有升级浏览器
然而低版本的浏览器并不支持高版本的新语法.

## JSX 语法

jsx 例子

```jsx
const element = <h1>Hello, world!</h1>;
```

转换后

```js
const element = /*#__PURE__*/ React.createElement("h1", null, "Hello, world!");
```

在 原生 JS 中并没有这样的语法.
这个语法是 react 发明的,它被称为 JSX，是一个 JavaScript 的语法扩展.
jsx 语法的优点就是直观.可以摆脱繁琐的 React.createElement

## presets/plugins 预设和插件

**预设**

babel 的预设. 顾名思义, 就是 babel 官方内置的语法规则.

**插件**

一些不常用的, 第三方的规则. 或者其他 babel 功能
应该需要 单独 npm install xx 安装相应的包
然后在 babelrc plugins 配置

## 写一个插件

...待叙
