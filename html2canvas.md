# HTML2CANVAS

npm install html2canvas
yarn add html2canvas

将 HTML DOM 转成 canvas 图片

## 使用

```js

import html2canvas from 'html2canvas'

function base64Img2Blob(code) {
  var parts = code.split(";base64,");
  var contentType = parts[0].split(":")[1];
  var raw = window.atob(parts[1]);
  var rawLength = raw.length;
  var uInt8Array = new Uint8Array(rawLength);
  for (var i = 0; i < rawLength; ++i) {
    uInt8Array[i] = raw.charCodeAt(i);
  }
  return new Blob([uInt8Array], { type: contentType });
}
function downloadFile(fileName, content) {
  var aLink = document.createElement("a");
  var blob = base64Img2Blob(content); //new Blob([content]);
  var evt = document.createEvent("MouseEvents");
  evt.initEvent("click", false, false); //initEvent 不加后两个参数在FF下会报错
  aLink.download = fileName;
  aLink.href = URL.createObjectURL(blob);
  aLink.dispatchEvent(evt);
}

const DOM = document.getElementById("capture");
html2canvas(DOM).then((canvas) => {
  downloadFile("ship.png", canvas.toDataURL("image/png"));
});
```

## 参考

1. JS 前端创建 html 或 json 文件并浏览器导出下载
   https://www.zhangxinxu.com/wordpress/2017/07/js-text-string-download-as-html-json-file/

1. 如何通过 js 实现 canvas 保存图片为 png 格式并下载到本地！
   https://segmentfault.com/q/1010000005816241
