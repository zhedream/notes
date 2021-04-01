# echarts 的使用配置

## Api

初始化实例
chart = echarts.init(document.getElementById('container'), this.theme);
获取 echarts 实例
chart = echarts.getInstanceByDom(el);

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