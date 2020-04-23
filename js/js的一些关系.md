# JavaScript 和 nodejs , ES5, TypeScript 的关系

## ES5 与 JS

JavaScript 简称 JS
ECMAScript 简称 ES

ES 是 JS 的标准, JS 是 ES 的实现
ES5 也称 ES2009 . ECMAScript5.0 是 ECMAScript 的五个版本, 在 2009 年发布.

ECMAScript 一种脚本语言规范, 创建它是为了使JavaScript标准化 , 
而 JavaScript 则是 ECMAScript规范的 实现, 目的是用于 网页中交互.
ActionScript 也是 ECMAScript 的实现,主要用于开发针对Adobe Flash Player平台的网站和软件，并以嵌入式SWF文件的形式在网页上使用

ECMAScript 5 (ES5): ECMAScript 的第五版修订，于 2009 年完成标准化。这个规范在所有现代浏览器中都相当完全的实现了。
ECMAScript 6 (ES6): ECMAScript 的第六版修订，于 2015 年完成标准化

## node 与 JS
js 运行环境是在浏览器中, 浏览器有运行 js 的引擎.

Firefox有叫做Spidermonkey的引擎，Safari有JavaScriptCore，Chrome有V8

其中, 其中 大名鼎鼎的 V8 引擎 , 不仅是开源的 而且对比其他的引擎更有优势.

node 的作者 Ryan Dahl , 对 V8 进行了封装移植, 还加入了内置模块：文件系统I/O、网络（HTTP、TCP、UDP、DNS、TLS/SSL等）、二进制数据流、加密算法、数据流等等

node.js  是带有能操作I/O和网络库的V8引擎，因此你能够在浏览器之外使用JavaScript创建shell脚本和后台服务或者运行在硬件上

**node 是 JS 的运行环境**


扩展: deno 是 node 作者新的项目, 作为js 和 ts 的 安全的运行环境

## TypeScript

TypeScript 简称 TS

TypeScript 是 JavaScript 的超集.
ts 可以编译成 纯js

怎么个超集呢? JS 有的, TS 都有且兼容, JS 没有的 TS 也有, 
没错主要就是 TypeScript 中的 type 类型系统

## JS 模块化标准

CommonJS, AMD, CMD, UMD, ES6, TS


## 参考
1. node.js和JavaScript的关系
https://www.cnblogs.com/thinkam/p/8262743.html
2. 「译」ES5, ES6, ES2016, ES.Next: JavaScript 的版本是怎么回事
https://huangxuan.me/2015/09/22/js-version/
3. 理解 ES5, ES2015（ES6） 和 TypeScript
https://blog.csdn.net/Dong_PT/article/details/52709425
