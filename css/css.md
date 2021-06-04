height line-height 一起使用

多行文本不设置 height 只设置 line-height

## flex 弹性策略 1

宽度 小 到 大 做适应
最小 默认 100%
@media (min-width:1200px) width: 48%;
@media (min-width:1600px) width: 30%;

## 最小宽度 body 策略

从大到小

每个页面单独 设置 body

body 控制 最终 宽度 min-width: 1020px; overflow: auto;

主内容 控制 高度 height: calc(100vh - 60px); min-height: 600px;


