# Canvas 画布

可在 html 的 Canvas 标签 ,利用 Js 画画绘制 2D,3D 图形, 可做动画,游戏等.

```js
var canvas = document.getElementById("tutorial");
var ctx = canvas.getContext("2d");

var canvas = document.getElementById("canvas");
gl = canvas.getContext("webgl");
gl.getExtension("WEBGL_lose_context").loseContext();
```

## 绘制文字

https://www.twle.cn/l/yufei/canvas/canvas-basic-text-measuretext.html

## toDataURL

```js
// 解决 canvas webgl 解决截图空白问题 https://www.py4u.net/discuss/277035
HTMLCanvasElement.prototype.getContext = (function (origFn) {
  return function (type, attributes) {
    if (type === "webgl") {
      attributes = Object.assign({}, attributes, {
        preserveDrawingBuffer: true,
      });
    }
    return origFn.call(this, type, attributes);
  };
})(HTMLCanvasElement.prototype.getContext);

// canvas 第一次获取 context 就决定了后续的 context 的属性, 不会变更 ???
// 会不会有很大的性能影响
```

## 参考

Too many active WebGL contexts

1. https://github.com/pixijs/pixi.js/issues/2233
1. https://developer.mozilla.org/zh-CN/docs/Web/API/WebGLRenderingContext/getExtension
