# windows 命令行

## 代理

cmd 有效
set HTTP_PROXY=http://127.0.0.1:7890

power shwll 不好使

$env:HTTP_PROXY="http://127.0.0.1:7890"
$env:HTTPS_PROXY="http://127.0.0.1:7890"

## 文件操作

rmdir /s/q <path:dir>

xcopy <path:dir|file> <path2:dir|file>

## mklink 软链接

windows 软链接的建立及删除
http://blog.chinaunix.net/uid-74941-id-3764093.html

建立 d:develop 链接目录, 指向远程的目标服务器上的 e 盘的对应目录。
mklink /d d:\develop \\138.20.1.141\e$\develop

建立 d:develop 链接目录, 指向远程的目标服务器上的 e 盘的对应目录。
mklink /d d:\recivefiles \\138.20.1.141\e$\recivefiles

#删除虚拟的链接目录, 并不会删除远程文件夹真实文件, `注意`千万不能用 del, del 会删除远程的真实文件。
rmdir d:\recivefiles
rmdir d:\develop

命令格式：mklink /d(定义参数) \MyDocs(链接文件) \Users\User1\Documents(原文件)
/d：建立目录的符号链接符号链接(symbolic link)
/j：建立目录的软链接（联接）(junction)
/h：建立文件的硬链接(hard link)

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
