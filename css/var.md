# css 变量 (属性)

## 定义

```css
/* 全局 作用域 */
:root {
  --main-bg-color: brown;
}
/* 选择器范围 作用域 */
.selector {
  --main-bg-collor: #fff;
  --main-width: 100px;
}
.box {
  --main-collor2: #fff;
  --main-height: 100px;
}
```

## 使用

有效性 与 作用域

```css
.selector {
  height: var(--main-height); /* 无效 作用域无变量 */
  color: var(--main-bg-collor); /* 有效 #fff */
  color: var(--main-width); /* 无效属性, 默认 */
  color: var(--main-width, --main-color, red); /* 备用变量或属性 */
  color: var(--my-var1, var(--my-var2, pink)); /* 可嵌套, 但会影响性能 */
}
```

js 更改 css 变量(属性)

```js
// 获取一个 Dom 节点上的 CSS 变量
element.style.getPropertyValue("--my-var");

// 获取任意 Dom 节点上的 CSS 变量
getComputedStyle(element).getPropertyValue("--my-var");

// 修改一个 Dom 节点上的 CSS 变量
element.style.setProperty("--my-var", jsVar + 4);
```

## 浏览器支持

IE 不支持

## 资料

1. 使用 CSS 自定义属性（变量）| MDN
   https://developer.mozilla.org/zh-CN/docs/Web/CSS/Using_CSS_custom_properties
