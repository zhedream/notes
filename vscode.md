# vscode

## code 文件过大

当您看到此通知时，它表示 VS Code 文件观察程序的句柄用尽，因为工作区很大并且包含许多文件。可以通过运行来查看当前限制：

cat /proc/sys/fs/inotify/max_user_watches
通过编辑/etc/sysctl.conf 并将此行添加到文件末尾，可以将限制增加到最大值：
sudo vim /etc/sysctl.conf
fs.inotify.max_user_watches=524288

## 控制台字体

控制台字体间距过大
"terminal.integrated.fontFamily": "monospace"

## 编辑器间距

1. https://github.com/tonsky/FiraCode/releases
   在 releases 下载最新的字体. (当前 v2)
2. 解压压缩文件并打开 ttf 文件夹, 双击安装字体文件, 安装完所有的字体文件
3. 打开 vscode 的 settings.json 文件
4. 添加字体文件配置

```json
  // 以下两行必须
  "editor.fontFamily": "'Fira Code'",
  "editor.fontLigatures": true,
  //下面四行分别设置不同粗细的字体，选择一种
  // "editor.fontWeight": "300",// Light
  "editor.fontWeight": "400", // Regular
  // "editor.fontWeight": "500", // Medium
  // "editor.fontWeight": "600", // Bold
```

## 自动更新失败

自动出现出现类似
C:\Program Filles(x86)\vscode\unins000.exe
尝试在目标目录创建文件时出错

或点击帮助, 检查更新的时候

应该是权限问题, 点击终止, 把 vscode 以管理员的方式重新启动在更新就好了

## 代码折叠

C + K + 4 > Ctrl + k + 4

## 代码块

生成代码块
https://snippet-generator.app/

## 自定义快捷键

Ctrl + Num1 切换 禅定模式
Ctrl + Num2 切换 状态栏
Ctrl + Num4 切换 活动栏
Ctrl + Num6 切换 缩略图, 滚动条
Ctrl + Num9 保存全部

## 扩展

**通用**

Chinese 中文
Bracket Pair Colorizer 括号颜色
TabNine AI 提示
Prettier 格式化
vscode-icons 图标
Debugger for Chrome
Regex Previewer 正则
TODO 待办事件
Paste JSON
Docker
SFTP
Path

**File Watcher**

settings.json

```json 
{
  "filewatcher.commands": [
    {
      // appulate.filewatcher 插件，监听 .ts 变动。执行 babel 编译 ts/tsx
      // babel a.tsx --out-file a.js --presets babel-preset-typescript --plugins babel-plugin-transform-vue-jsx
      // npx babel ${fileDirname}\\${fileBasename} --out-file ${fileDirname}\\${fileBasenameNoExt}.js --presets babel-preset-typescript
      "match": "\\.ts*",
      "isAsync": true,
      "cmd": "cd /d ${currentWorkspace} && npx babel ${fileDirname}\\${fileBasename} --out-file ${fileDirname}\\${fileBasenameNoExt}.js --presets babel-preset-typescript",
      "event": "onFileChange"
    }
  ]
}
```


**node**
import cost 包大小

**版本控制**

SVN svn 必备 有修改提示
GitLens git

**PHP**

1. PHP Debug
2. PHP Intelephense
3. PHP IntelliSense

## emmet

vue vscode 标签 tab

"emmet.triggerExpansionOnTab": true

## 任务系统 task

https://juejin.cn/post/7035448197883363359