# windows 命令行

## 代理

set HTTP_PROXY=http://127.0.0.1:7890

## 文件操作

rmdir /s/q <path:dir>

xcopy <path:dir|file> <path2:dir|file>

## systeminfo

查看系统信息
虚拟内存, 内存, 补丁, Hyper-V

## tree && tree-node-cli

https://juejin.cn/post/6844904187143127053#heading-4

windows 自带 tree 不好用, 不能过滤文件

```bash
tree /F src
```

yarn global add tree-node-cli OR npm install -g tree-node-cli

```bash
treee -I "node_modules" -L 3
treee -I "node_modules" -L 2 -d
treee -I "node_modules" -L 3 > tree.txt
```
