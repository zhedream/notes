# nvm

node 版本管理工具

查看版本

```bash
nvm version # 1.1.9
```

查看可用版本

```basg
nvm list available
```

查看本地下载的版本

```bash
nvm list

* 16.14.2 (Currently using 64-bit executable)
  14.19.1
  12.22.12
```

安装 16 最新一个版本

```bash
nvm install 16 # Downloading node.js version 16.14.2
```

切换版本: 必须写完整版本号

```bash
nvm use 16.14.2
```

查看当前的 node 版本

```bash
nvm current
# nvm list
# node -v
```

卸载: 必须写完整版本号

```bash
nvm uninstall 14.19.1
```

## 安装

建议以 `管理员` 身份运行 

安装 nvm 前, 卸载之前安装的 nodejs

```bash
choco install nvm
```

```bash
PS C:\Users\Administrator> nvm install 14
Downloading node.js version 14.19.1 (64-bit)...
Complete
Downloading npm version 6.14.16... Complete
Installing npm v6.14.16...
Installation complete. If you want to use this version, type
nvm use 14.19.1
```

```bash
C:\Users\Administrator>nvm install 12
Downloading node.js version 12.22.12 (64-bit)...
Complete
Creating C:\ProgramData\nvm\temp

Downloading npm version 6.14.16... Complete
Installing npm v6.14.16...

Installation complete. If you want to use this version, type

nvm use 12.22.12
```

```bash 
C:\Users\Administrator>nvm uninstall 16.14.2
Uninstalling node v16.14.2... done
```

## 国内镜像

查看安装路径

```baash
PS E:\www\note> nvm root
Current Root: C:\ProgramData\nvm
```

修改 C:\ProgramData\nvm\settings.txt

```txt C:\ProgramData\nvm\settings.txt
...

# 原 taobao 镜像

node_mirror: https://npmmirror.com/mirrors/node/
npm_mirror: https://npmmirror.com/mirrors/npm/

# node_mirror: https://npm.taobao.org/mirrors/node/
# npm_mirror: https://npm.taobao.org/mirrors/npm/
```
