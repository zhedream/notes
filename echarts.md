# echarts 的使用配置

## Api

初始化实例
chart = echarts.init(document.getElementById('container'), this.theme);
获取 echarts 实例
chart = echarts.getInstanceByDom(el);

## dataset 数据集合

https://blog.csdn.net/hwhsong/article/details/109319162

数据集合 & 维度映射

注意, 数据映射: 类目 category 和 time, value

X轴为 time 时, 默认顺序, 但是数据不会

## custom 自定义类型




## echarts-stat

ecStat 是 ECharts 的统计和数据挖掘工具

直方图
聚类
回归
基本统计方法

https://github.com/ecomfe/echarts-stat/blob/master/README.zh-CN.md

## dataZoom

```js
[
  {
    type: "slider",
    show: true,
    xAxisIndex: [0],
    start: 0,
    end: 100,
    zoomLock: false,
  },
  {
    type: "slider",
    show: true,
    yAxisIndex: [0],
    left: "95%",
    start: 0,
    end: 100,
    zoomLock: false,
  },
  {
    type: "inside",
    xAxisIndex: [0],
    zoomLock: false,
  },
  {
    type: "inside",
    yAxisIndex: [0],
    zoomLock: false,
  },
];
```

## 导出图片

每次 setOption , 最后都会有一次 finished 事件.

```
const options = [];


```

## pieOption

## 主题构建

https://echarts.apache.org/v4/zh/option.html#yAxis.axisLabel.color

```js
// dark.config.json 导出的 主题配置
// dark.theme.js
let DarkTheme = {};
module.exports = DarkTheme;
// 使用
import DarkTheme from "dark.theme.js";
echarts.init(document.getElementById(this.id), this.theme);
```

## getZr

https://juejin.cn/post/6904232721678073869

echartInstance.getZr().on('click',callback)


## 大数据

X轴 使用类目, category, echarts 会做优化.

用的 xAxis.type=category ,  echarts 或抽稀处理, 几万的数据不卡顿 , 关键针对 showSymbol

但是用 xAxis.type=time 的时候, echarts 内部就不做优化了, 就很卡.

series 中 `showSymbol`: false, hoverAnimation: false

option 中 animation: false, animationDurationUpdate: 0

在使用 使用抽稀算法, 自定义

在非 category X轴时, 仍需要显示部分 symbol, 可手动抽稀算法

