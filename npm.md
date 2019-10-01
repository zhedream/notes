# NPM&YARN

package.json
说明了 项目开发配置或依赖

dependencies: 项目依赖包

devDependencies: 开发工具包 , 比如说  代码检查

这两个 好像 写哪里都可以, 就是做一个区分 ,但是规范写的好

package.json 包的 版本号, 并不是 , 说安装的包就是 这个版本,
他的功能 是限定版本, 是锁定的包的版本范围. 

真正的包锁定的是在  package-lock.json 文件,
这个文件 还保存有  包与包的依赖包的关系.


npm info packname version
yarn info packname version 

# npm

npm i
npm run script
npm
npm install -D packname  // 开发依赖
npm install -S packname // 项目依赖
npm info packname // 最新包信息
npm info packname // 包的锁定版本高

# yarn
LINK 
https://www.kancloud.cn/shellway/yarn-notes/262504


yarn 的全局安装包

yarn bin // 项目级的 目录
yarn global bin // 用户级的 yarn 全局安装目录
sudo yarn global bin // sudo , 系统级的 全局安装目录

yarn global add packname
yarn add packname

yarn upgrade packname | packname@version
