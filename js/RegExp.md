# RegExp

JS 中的 正则表达式 的基本使用

```js
let text = "插值表达式 {{msg}}"
let reg = /\{\{(.+)\}\}/;
if (reg.test(text) === true){
    let val = RegExp.$1
    console.log(val) // msg
}
```