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

X 轴为 time 时, 默认顺序, 但是数据不会

## custom 自定义类型

## echarts-stat

ecStat 是 ECharts 的统计和数据挖掘工具

直方图
聚类
回归
基本统计方法

https://github.com/ecomfe/echarts-stat/blob/master/README.zh-CN.md

## tooltip

```js
option = {
  tooltip: {
    trigger: "axis",
    // triggerOn: 'click',
    confine: true,
    appendToBody: true,
    position(pos, params, el, elRect, size) {
      // console.log(pos, size);
      const { contentSize, viewSize } = size;
      let isLeft = pos[0] < size.viewSize[0] / 2;
      let key = ["right", "left"][+isLeft];
      console.log(key);
      // 鼠标在左
      let num;
      if (isLeft) {
        // 在左边 判断 x 到  viewSize[0]
        num = pos[0] + 10;
      } else {
        num = viewSize[0] - pos[0] + 10;
      }

      return {
        top: viewSize[1] / 2 - contentSize[1] / 2,
        [key]: num,
      };
    },
    formatter(params) {
      params = [].concat(params);
      params.sort((a, b) => {
        return b.value - a.value;
      });
      let item = params[0];
      const MonitorTime = item.axisValue; // trigger 为 x 轴
      let get = $.$safeGetData;

      const getItem = (item) => {
        if (item === undefined) return "";
        const { marker, seriesName, data } = item;
        const { code, a01007, a01008, value, unit } = data;
        const isWind = code == "a01007" || code == "a01008";
        if (isWind) {
          return `${marker}${seriesName}: 
            风速: ${a01007 === undefined ? "--" : get(a01007, ["avgStrength"])},
            风向: ${
              a01008 === undefined
                ? "--"
                : WindSwitch(
                    get(a01007, ["avgStrength"]),
                    get(a01008, ["avgStrength"])
                  )
            }`;
        } else {
          return `${marker} ${seriesName}: ${value ? value : ""} ${
            unit ? unit : ""
          }`;
        }
      };

      const getTds_str = (pList) => {
        return pList.map((p) => `<td>${getItem(p)}</td>`).join("");
      };

      // 每列 个数
      let colCount = (params.length / (params.length / 30)) | 0;
      let arr1 = chunk(params, colCount); // arr1.length 列的数量
      let arr2 = transpose(arr1); // 行数 arr2.length ,  矩阵转置  列数变
      let trList = arr2.map((pList) => `<tr>${getTds_str(pList)} </tr>`); // 一行
      return (
        `<div>${MonitorTime}</div>` +
        // params.map(getItem).join('<br>');
        `<table>${trList.join("")}</table>`
      );
    },
    formatter2: function (params) {
      let item = params[0];
      const time = item.axisValue; // trigger 为 x 轴
      return (
        time +
        "<br/>" +
        params
          .map((item) => {
            const { value } = item;
            const { marker, seriesName } = item;
            return `${marker} ${seriesName}: ${value} μg/m3`;
          })
          .join("<br/>")
      );
    },
  },
};
function chunk(arr, count) {
  let result = [];
  let i = 0;
  while (i < arr.length) {
    result.push(arr.slice(i, i + count));
    i += count;
  }
  return result;
}

function transpose(matrix) {
  return matrix[0].map((col, i) => matrix.map((row) => row[i]));
}
```

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

X 轴 使用类目, category, echarts 会做优化.

用的 xAxis.type=category , echarts 或抽稀处理, 几万的数据不卡顿 , 关键针对 showSymbol

但是用 xAxis.type=time 的时候, echarts 内部就不做优化了, 就很卡.

series 中 `showSymbol`: false, hoverAnimation: false

option 中 animation: false, animationDurationUpdate: 0

在使用 使用抽稀算法, 自定义

在非 category X 轴时, 仍需要显示部分 symbol, 可手动抽稀算法
