https://cn.vuejs.org/v2/api/

## 自定义构建配置

https://moe.best/gotagota/vue-build-from-specified-config.html

```json
"scripts": {
    "build1": "node build.dist1.js",
  },
```

```js build.dist1.js
const { spawnSync } = require("child_process");
const { resolve } = require("path");

spawnSync("npm", ["run", "build"], {
  shell: true,
  env: {
    ...process.env, // 要记得导入原本的环境变量
    VUE_CLI_SERVICE_CONFIG_PATH: resolve(__dirname, "vue.build1.config.js"),
  },
  stdio: "inherit",
});
```
