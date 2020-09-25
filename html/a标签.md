# a 标签

```html
<a :href="data.AttachmentUrl" :download="data.AttachmentName">{{text}}</a>
<a href="Blob | 资源地址" download="xxx.mp4">点击下载: xxx.mp4</a>
<a target="_blank" href=""></a>

<script>
  var src = window.URL.createObjectURL(blob);
</script>
```

## src 和 href

scr 是资源 source , 是实体, 内存中, 二进制资源, blob, src 也可以写地址, 但是会把地址的资源获取到, 放到 src

href 是地址, 就是个字符串

至少字面上是这个意思

img video 是 src="地址 | blob" source 类似 Blob

但是 link 比较奇怪, 是 href , 感觉 src 会何理一点, 可能是历史原因, 或者是 link 内部实现不一样

类比 undefined null , src href 不过这就是 语义, 到底汗是看内部实现, 能用, 有那个效果

scr="资源地址 | Blob"

href="纯粹的字符串,一般代表资源地址,也可能是 Base64, 字符串的 Blob"
