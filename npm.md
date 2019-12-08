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

对于框架来说, 一般不会提交 锁定 lock 文件, 在我们用时, 就能使用到新的包或其他依赖包
但是一般来说, 企业中的项目开始后,是需要把 lock 文件提交到版本库中. 这是很有必要的.
一个项目中, 如果每个成员的依赖版本不一样, 那就真的太糟糕了

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

升级 yarn
windows msi安装包 覆盖安装即可

# npx
