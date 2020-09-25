# Canvas 画布

可在 html 的 Canvas 标签 ,利用 Js 画画绘制 2D,3D 图形, 可做动画,游戏等.

```js
var canvas = document.getElementById("tutorial");
var ctx = canvas.getContext("2d");

var canvas = document.getElementById("canvas");
gl = canvas.getContext("webgl");
gl.getExtension("WEBGL_lose_context").loseContext();
```

## 参考

Too many active WebGL contexts

1. https://github.com/pixijs/pixi.js/issues/2233
1. https://developer.mozilla.org/zh-CN/docs/Web/API/WebGLRenderingContext/getExtension
