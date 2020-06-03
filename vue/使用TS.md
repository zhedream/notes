# 在 Vue 项目使用 TS

## 整个项目使用 TS

## 在非 TS 项目中引入 TS 

场景: Vue 项目并不是 TS 的, 现在有个库, 或其同事写的代码是用 TS 写的, 
我们项目中需要使用.

**将 TS 改成 js 文件.**
都用 TS 写了, 很多文件咋改

**将 TS 打包后在引入**
猜测, 没尝试过

**babel转换TS**



**配置TS vue.config.js webpack**

// @ts-nocheck 忽略 这个文件 类型检查
// @ts-ignore 忽略 下一行

安装 ts 和 loader 处理 *.ts 文件 
npm install ts-loader typescript -D

安装相关包的 @types/xx 文件, 也可以不安装, 默认会当作 any

根目录新建: tsconfig.json
```json
{
  "compilerOptions": {
    "experimentalDecorators": true,
    "emitDecoratorMetadata": true,
    "lib": ["dom","es2016"],
    "target": "es5"
  },
  "include": ["./src/**/*"]
}
```

编辑: vue.config.js
```bash
...
configureWebpack: {
  module: {
    rules: [
      {
        test: /\.ts?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: ['.ts', '.js'],
  },
},
...
```