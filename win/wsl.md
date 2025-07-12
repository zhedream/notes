# WSL

Windows Subsystem for Linux 文档

https://learn.microsoft.com/zh-cn/windows/wsl/

## 安装

推荐 Windows 11 专业版

测试环境：
版本：Windows 11 专业版
版本号： 23H2
操作系统版本： 22631.5472
体验：Windows 功能体验包 1000.22700.1106.0

```sh
wsl --help

wsl --update

wsl --list --verbose

wsl --list --online

wsl --install -d Ubuntu

wsl # 第一个安装的发行版就是默认发行版， 无需 -d 参数

# 进入指定发行版
wsl -d Ubuntu 

# 查看 wsl 状态和默认发行版
wsl --status

```


- wsl 安装
https://learn.microsoft.com/en-us/windows/wsl/install
- wsl 开发环境
https://learn.microsoft.com/en-us/windows/wsl/tutorials/wsl-containers#install-docker-desktop
- docker
https://docs.docker.com/desktop/wsl/#download
- gitkraken
 https://help.gitkraken.com/gitkraken-desktop/windows-subsystem-for-linux/

## 参考
1. 在 Windows 中运行 Linux：WSL 2 使用入门 | 知乎-Linux中国
https://zhuanlan.zhihu.com/p/69121280


## default

```sh
# 查看已安装的发行版
wsl --list --verbose

# 设置默认发行版（Ubuntu）
wsl --set-default Ubuntu

# 进入指定发行版
wsl -d Ubuntu 
```

## 备份

```sh
# 1. 先导出备份
wsl --shutdown
wsl --export Ubuntu C:\backup\ubuntu-full-backup.tar

# 2. 测试备份可用性
wsl --import Ubuntu-Test C:\temp Ubuntu-Full-Backup.tar
wsl -d Ubuntu-Test -- whoami  # 测试是否正常

# 3. 确认备份无误后再 unregister
wsl --unregister Ubuntu-Test  # 删除测试环境
wsl --unregister Ubuntu       # 删除原环境

# 4. 恢复到新位置
wsl --import ubuntu-test E:\wsl\ubuntu-test E:\wsl-bak\ubuntu-backup.tar
```

## 字体

中文字体：fonts-wqy-microhei fonts-wqy-zenhei
编程箭头：fonts-firacode
sudo apt install fonts-wqy-microhei fonts-wqy-zenhei fonts-firacode

## 桌面环境

一些经典的 GUI 应用，可用于测试 GUI 环境
sudo apt install x11-apps

echo gnome-session > ~/.xsession
echo xfce4-session > ~/.xsession