# JSX 是什么

JSX 是一种语法

const element = <h1>Hello, world!</h1>;

这 既不是字符串也不是 HTML。

JSX 的基本语法规则：遇到 HTML 标签（以 < 开头），就用 HTML 规则解析；遇到代码块（以 { 开头），就用 JavaScript 规则解析

```jsx
const element = <h1>Hello, world!</h1>;
```

babel 转换后

```js
const element = /*#__PURE__*/ React.createElement("h1", null, "Hello, world!");
```

在 原生 JS 中并没有这样的语法.
这个语法是 react 发明的,它被称为 JSX，是一个 JavaScript 的语法扩展.
jsx 语法的优点就是直观.可以摆脱繁琐的 React.createElement

JSX 简介
https://zh-hans.reactjs.org/docs/introducing-jsx.html

我们可以通过 babel 进行 JSX 语法的转换 ( presets 选择 react )
https://babeljs.io/repl
