# browserify

打包 commonjs , 会递归处理 require 依赖.

```bash
# browserify [入口文件] --s [暴露全局名称] > [打包好的js]
browserify ./node_modules/docx-templates/lib/index.js --s docxTemplates > public/docx-templates.js
```
