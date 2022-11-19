# NPM&YARN

是 js 的包管理工具. 准确的说应该是 nodejs

npm info packname version
yarn info packname version

## package.json

package.json
说明了 项目开发配置或依赖

dependencies: 项目依赖包

devDependencies: 开发工具包 , 比如说 代码检查

devDependencies 最关键的就是你 npm publish 发布一个包
别人 install 你的包的话 会安装 dependencies 而不会安装 devDependencies. 也是顾名思义……dev 就是你开发用的 你都 publish 了意味着对于别人来说你的包是处于 production 了

不过呢, 好像写哪里都可以, 就是做一个区分 ,但是规范写的好

package.json 包的 版本号, 并不是 , 说安装的包就是 这个版本,
他的功能 是限定版本, 是锁定的包的版本范围.

真正的包锁定的是在 package-lock.json 文件,
这个文件 还保存有 包与包的依赖包的关系.

对于框架来说, 一般不会提交 锁定 lock 文件, 在我们用时, 就能使用到新的包或其他依赖包
但是一般来说, 企业中的项目开始后,是需要把 lock 文件提交到版本库中. 这是很有必要的.
一个项目中, 如果每个成员的依赖版本不一样, 那就真的太糟糕了

npm info packname version
yarn info packname version

## npm

npm i
npm run script
npm
npm install -D packname // 开发依赖
npm install -S packname // 项目依赖
npm info packname // 最新包信息
npm info packname // 包的锁定版本高

升级 npm

sudo npm install npm -g
升级 node
npm install -g n

## yarn

LINK
https://www.kancloud.cn/shellway/yarn-notes/262504

yarn 的全局安装包

yarn bin // 项目级的 目录
yarn global bin // 用户级的 yarn sudo 全局安装目录
sudo yarn global bin // sudo , 系统级的 全局安装目录

yarn global add packname
yarn add packname

yarn upgrade packname | packname@version

升级 yarn
windows msi 安装包 覆盖安装即可

## cnpm

坑: cnpm 不依赖/不生成 package-lock.json 文件, 可能造成 版本一致

## npx

使用一些脚本, 可以不需要全局安装, 只需要在 node_modules 同级目录使用
npx ts ...

## 版本

1. Node.js 中 package.json 中库的版本号详解(^和~区别)
   https://blog.csdn.net/njweiyukun/article/details/70309066
2. package.json 文件 dependencies 中的各种版本号形式
   http://blog.kankanan.com/article/package.json-65874ef6-dependencies-4e2d7684540479cd7248672c53f75f625f0f.html

## proxy

https://freesilo.com/?p=1228

npm config set <key> <value> [--global]
npm config get <key>
npm config delete <key>
npm config list
npm config edit

npm config list
npm config set proxy "http://127.0.0.1:7890"
npm config delete proxy

## 修改第三方包 patch-package

https://m.talkmoney.cn/blog/web/stafflw00008/articleId569

npm i patch-package -D // 安装补丁工具包
npx patch-package view-design // 对比修改的代码 保存到 patches
npx patch-package // 手动打补丁

npm i 钩子, 自动打补丁

```json package.json
{
  "scripts": {
    "postinstall": "patch-package"
  }
}
```

## pnpm

包管理工具, 软链接 , 速度快 , 依赖管理

patch-package 问题
https://github.com/ds300/patch-package/issues/35
