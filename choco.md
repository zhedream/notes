# choco

https://chocolatey.org/

choco list -lo
choco list --local-only

choco upgrade chocolatey

安装需要 `管理员运行` cmd 或 powershell

choco install vim

choco upgrade vim

choco uninstall vim

## 软件包


https://community.chocolatey.org/packages

vim, wintail, mkcert

nvm, git, openssl, ffmpeg

## proxy

https://docs.chocolatey.org/en-us/guides/usage/proxy-settings-for-chocolatey

choco config set proxy http://127.0.0.1:7890

C:\ProgramData\chocolatey\config\chocolatey.config

# windows 软件包管理工具

Chocolatey & Scoop

参考

1. Windows 神器 Cmder Scoop Chocolatey Listary Seer
   https://blog.csdn.net/u013205877/article/details/78993311
2. 软件包管理工具选 Scoop 还是 Chocolatey？看完这篇就知道了
   http://www.sohu.com/a/331046994_99956743

# scoop 安装

1. 第一步，打开 powershell3.0+，输入以下代码，选择 A【全是】
   set-executionpolicy remotesigned -s cu

2. 上面成功之后，进入第二步
   iex (new-object net.webclient).downloadstring('https://get.scoop.sh')
   参考： https://www.cnblogs.com/CyLee/p/7197551.html

# Chocolatey 安装

官网

https://chocolatey.org/install#individual

1. 管理员执行

```bash
Set-ExecutionPolicy Bypass -Scope Process -Force; [System.Net.ServicePointManager]::SecurityProtocol = [System.Net.ServicePointManager]::SecurityProtocol -bor 3072; iex ((New-Object System.Net.WebClient).DownloadString('https://community.chocolatey.org/install.ps1'))
```

参考

路径 https://www.jianshu.com/p/f5f4efd04cab

## 2.x

choco list