# prettier-eslint-stylelint

prettier 格式化工具. 也能做检查. 侧重格式化.

eslint: 对 js 的检查
stylelint: 对样式的的检查

linter 是检查卫生的, prettier 是打扫卫生的. 
linter 检查了一个犄角旮瘩, prettier 解决不了. 那就吧哪个检查规则去了.
存在 eslintm,stylelint 与 prettier 有冲突的情况. 以 prettier 为主.

linter --fix 是如何实现的, 自带格式化? 还是用的 prettier?
linter 也能格式化? 以 prettier 为主.

可能的冲突检查插件, 存在冲突 将 linter 检查规则 移除即可.
eslint-config-prettier
stylelint-config-prettier


## 参考

项目中 Prettier + Stylelint + ESlint 配置
https://juejin.cn/post/6878121082188988430
