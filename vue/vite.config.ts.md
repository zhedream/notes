```ts
import { fileURLToPath, URL } from "node:url";

import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import vueJsx from "@vitejs/plugin-vue-jsx";
import vueDevTools from "vite-plugin-vue-devtools";
import { codeInspectorPlugin } from "code-inspector-plugin";
import tailwindcss from "@tailwindcss/vite";

import { versionPlugin } from "./versionPlugin";

import { viteExternalsPlugin } from "vite-plugin-externals";
import { viteStaticCopy } from "vite-plugin-static-copy";
import { createHtmlPlugin } from "vite-plugin-html";
import svgLoader from "vite-svg-loader";
import { VitePWA } from "vite-plugin-pwa";

const isBuild = process.argv[2] === "build";

// 外部库配置
const externals = [
  {
    name: "axios",
    global: "axios",
    file: "axios/dist/axios.min.js",
    output: "js/axios.min.js",
  },
];

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueJsx(),
    vueDevTools({
      launchEditor: "code",
    }),
    codeInspectorPlugin({
      editor: "code",
      bundler: "vite",
      hideDomPathAttr: true,
      showSwitch: true,
      behavior: {
        copy: true,
      },
    }),
    tailwindcss(),
    versionPlugin(),
    svgLoader({
      defaultImport: "url",
    }),
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
    }),
    viteExternalsPlugin({
      ...Object.fromEntries(
        externals.filter(() => isBuild).map((e) => [e.name, e.global]),
      ),
      cesium: "Cesium",
    }),
    viteStaticCopy({
      targets: externals
        .filter(() => isBuild)
        .map((e) => ({
          src: `node_modules/${e.file}`,
          dest: "js",
          rename: { stripBase: true },
        })),
    }),
    createHtmlPlugin({
      inject: {
        tags: externals
          .filter(() => isBuild)
          .map((e) => ({
            tag: "script",
            attrs: { src: `/${e.output}` },
            injectTo: "head" as const,
          })),
      },
    }),
  ],
  build: {
    rollupOptions: {
      output: {
        // 拆分大依赖：降低入口 index chunk 体积，改善首屏加载（依赖走独立缓存）
        manualChunks(id) {
          if (!id.includes("node_modules")) return;

          // 注意：不要用 id.includes('vue') 这种宽匹配，否则 vueuse 等也会被归进 vue chunk
          // 这里用 node_modules 目录级匹配，兼容 Windows(\) / macOS/Linux(/)
          const inPkg = (pkg: string) =>
            id.includes(`/node_modules/${pkg}/`) ||
            id.includes(`\\node_modules\\${pkg}\\`);

          if (inPkg("echarts") || id.includes("EchartComponent"))
            return "EchartComponent";
          if (inPkg("ant-design-vue") || inPkg("@ant-design")) return "antd";
          if (inPkg("vxe-table") || inPkg("vxe-pc-ui") || inPkg("@vxe-ui"))
            return "vxe";
          if (inPkg("exceljs") || inPkg("xlsx")) return "excel";
          if (inPkg("lodash-es")) return "lodash";
          if (inPkg("vue-router")) return "vue-router";
          if (inPkg("pinia")) return "pinia";

          // pinyin 包本体会依赖/带入 segmentit（超大字典），一起拆出去，避免被并入其它 vendor
          if (inPkg("pinyin") || inPkg("segmentit")) return "pinyin";

          if (inPkg("vue")) return "vue";

          // 不强制兜底为 vendor：让 Rollup 保留动态 import 的天然拆分能力
          return;
        },
      },
    },
  },
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
  preview: {
    port: 4174,
  },
  server: {
    port: 5174,
    proxy: {
      // 配置代理规则
      "/api/": {
        target: "http://172.16.12.219:8808/", // 代理的目标地址
        changeOrigin: true, // 允许跨域
        rewrite: (path) => path.replace(/^\/api\//, ""), // 可选的重写规则
      },
      // 视频 WebSocket：前端最终会连到 /videoserver/**
      // 用不带尾斜杠的前缀，兼容 /videoserver 与 /videoserver/ 两种形式
      "/videoserver": {
        // ws 握手本质是 HTTP Upgrade，这里用 ws:// 或 http:// 都可；保持 ws:// 更直观
        target: "ws://172.16.12.97:559",
        changeOrigin: true,
        ws: true,
        // /videoserver/openUrl/xxx -> /openUrl/xxx
        rewrite: (path) => path.replace(/^\/videoserver/, ""),
      },
      // /media 在 Nginx 里是 location /media（非 /media/），这里也用不带尾斜杠的前缀更稳
      "/media": {
        // 让路径原样透传到上游（/media/** -> /media/**）
        target: "ws://172.16.12.97:559",
        changeOrigin: true,
        ws: true,
        rewrite: (path) => path,
      },
    },
  },
});
```

git 版本

```ts
import fs from "fs";
import child_process from "child_process";
import { promisify } from "util";
import { PluginOption } from "vite";

const exec = promisify(child_process.exec);

// 声明全局变量
let globalBuildTime = "";
let globalVersionInfo = "";

export const versionPlugin = (): PluginOption => {
  return {
    name: "vite-plugin-version",
    apply: "build",
    async configResolved() {
      // 获取当前时间作为打包时间（本地时间）
      const now = new Date();
      const buildTime = now.toLocaleString("zh-CN", {
        timeZone: "Asia/Shanghai",
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false,
      });

      // 检测当前目录是否为 git 或 svn 仓库并获取版本信息
      let versionInfo = "";
      if (fs.existsSync(".git")) {
        try {
          const { stdout } = await exec('git log -1 --pretty=format:"%H"');
          versionInfo = `Git commit: ${stdout}`;
        } catch (error) {
          console.error("Error fetching git commit info:", error);
        }
      } else if (fs.existsSync(".svn")) {
        try {
          const { stdout } = await exec("svn info --show-item revision");
          versionInfo = `SVN revision: ${stdout}`;
        } catch (error) {
          console.error("Error fetching svn revision info:", error);
        }
      } else {
        versionInfo = "No version control info found";
      }

      // 更新全局变量
      globalBuildTime = buildTime;
      globalVersionInfo = versionInfo;
    },
    transformIndexHtml(html) {
      // 直接在 HTML 文件中注入脚本，以打印版本信息和打包时间
      return html.replace(
        "</body>",
        `<script>console.log("Build time: ", "${globalBuildTime}"); console.log("${globalVersionInfo}");</script></body>`,
      );
    },
  };
};
```
