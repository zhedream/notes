# 依赖

pnpm upgrade

## vue 相关

vue vue-router pinia

### ant-design-vue

pnpm add ant-design-vue

消除 core-js 警告，不消除也可以执行 pnpm approve-builds core-js

pnpm add @ant-design/icons-vue

### 拖拽库

pnpm add vuedraggable

### vxe-table

pnpm add vxe-pc-ui vxe-table vxe-table-plugin-export-xlsx xe-utils

如需导出 xlsx 依赖 exceljs

pnpm add exceljs

### vue use

pnpm add @vueuse/core @vueuse/components @vueuse/integrations

pnpm add -D @types/sortablejs

## 可视化

### 进度条

pnpm add nprogress

### 图表

pnpm add echarts

### 地图相关

pnpm add @amap/amap-jsapi-loader @turf/turf

## 工具库

时间库

pnpm add dayjs

网络

pnpm add axios

事件处理

pnpm add mitt rxjs

文件处理

pnpm add file-saver jszip exceljs

工具库

pnpm add lodash-es pnpm add @types/lodash-es -D

数学计算

pnpm add mathjs simple-statistics

汉字转拼音

pnpm add pinyin

## 开发依赖

pnpm add -D vite-plugin-pwa

```js
import { VitePWA } from "vite-plugin-pwa";

VitePWA({
  registerType: "autoUpdate",
  devOptions: {
    enabled: true,
  },
  manifest: {
    name: "Air Collect",
    short_name: "AirCollect",
    description: "Industrial monitoring collection panel",
    theme_color: "#0f172a",
    background_color: "#0f172a",
    display: "standalone",
    start_url: "/",
    icons: [
      {
        src: "/pwa-icon.svg",
        sizes: "any",
        type: "image/svg+xml",
        purpose: "any maskable",
      },
    ],
  },
  workbox: {
    // 海康 SDK 的 WASM/JS 文件体积超过默认 2MB 限制（如 Decoder.wasm 3.5MB），
    // 提升至 5MB 避免 PWA 构建时因 precache 限制而报错。
    maximumFileSizeToCacheInBytes: 5 * 1024 * 1024,
  },
});
```

css 预处理

pnpm add sass-embedded -D

pnpm add less -D

代码定位

https://inspector.fe-dev.cn/guide/start.html

pnpm add code-inspector-plugin -D

https://tailwindcss.com/docs/installation/using-vite

pnpm add tailwindcss @tailwindcss/vite

vite 工程依赖

pnpm add -D vite-plugin-static-copy vite-plugin-html vite-plugin-externals

svg icon 组件 https://github.com/jpkleemans/vite-svg-loader

pnpm add -D vite-svg-loader

部署脚本

pnpm add -D node-ssh fs-extra chalk archiver inquirer dotenv execa

pnpm add -D @types/archiver @types/fs-extra
