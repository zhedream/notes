# css 之 getComputedStyle

获取解析计算后的样式

```js


let el = document.getElementById('id')
Window.getComputedStyle(el,null)
globalThis.getComputedStyle(el,null)


const getStyle = (el, name) => {
    if (globalThis.getComputedStyle) {
        return globalThis.getComputedStyle(el, null);
    } else {
        return el.currentStyle;
    }
};

```

# 参考
1. 
https://developer.mozilla.org/zh-CN/docs/Web/API/Window/getComputedStyle

