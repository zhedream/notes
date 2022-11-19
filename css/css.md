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

## 高度与滚动条

浮动框 左右布局 由一边更高内容称起 最小高度 最大高度

1. 一般固定高度 + 滚动条
2. 需要全部显示, 如 div 图例 则 自动最高, 左右多轴, 按最高算

布局盒子 > 抽象盒子 > 纯内容

## 块级元素 block

20210702 1020

如: div, 默认 无高度由内容撑起, 宽度 width 100%

效果: 宽度会尽可能的[大/宽], 高度会尽可能的[小/矮]

## 最小宽高

根据 div 元素特性和效果

20210702 1037

最小高度 由里面的盒子决定.

最小宽度 由外面的盒子决定. 外盒子的 min-height 去除

min-width: 设置 外面的盒子好, 里面的盒子的[默认?]宽度
min-height: 设置 里面的盒子好

`开发顺序`:
设置 min-width 时, 去除 min-width, 从 外盒子 [body] 开始加 min-width.
设置 min-height 时, 去除 min-height, 从 里盒子 [内容盒子] 开始加 min-height.

这样不会出现多余滚动条

## 设置 min-height

对于多层盒子, 如 a-table
给 每层盒子设置 height:100%, 即可在 对应外盒子设置 min-height
则在 对应外层盒子 设置 min-height

## 大屏图片边框处理

```css
.xpanel {
  padding: 15px;
  height: 100%;
  min-height: 170px;
  background: url("../img/panel.png") center no-repeat;
  background-size: 100% 100%;
  box-sizing: border-box;
}

.panel_txt {
  vertical-align: top;
  color: #38a3f0;
  font-size: 20px;
  height: 40px;
  background-image: url("../img/font_bg.png");
  background-repeat: no-repeat;
  background-position-y: bottom;
}
```

## not 选择器

```less
*:not([class*="vxe-"]) {
  &::-webkit-scrollbar {
    width: 4px;
    height: 4px;
    background-color: transparent;
  }

  &::-webkit-scrollbar-track {
    box-shadow: inset 0 0 6px fade(#000, 30%);
    border-radius: 6px;
    background-color: transparent;
    display: none;
  }

  &::-webkit-scrollbar-thumb {
    border-radius: 6px;
    box-shadow: inset 0 0 6px fade(#000, 30%);
    background-color: fade(#555, 60%);
  }
}

.row3 {
  overflow: auto;
  display: flex;
  > *:not(:last-child) {
    margin-right: 5px;
  }
}
.box {
  &_item {
    &:not(:last-child) {
      margin-right: 10px;
    }
  }
}
```
