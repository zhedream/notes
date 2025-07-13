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
wsl --install -d Ubuntu --name custom-name

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

1. 在 Windows 中运行 Linux：WSL 2 使用入门 | 知乎-Linux 中国
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
sudo apt install xorg x11-apps

echo gnome-session > ~/.xsession
echo xfce4-session > ~/.xsession

### install_xfce_rdp.sh

```bash
#!/usr/bin/env bash
# 轻量桌面 XFCE + xrdp 一键安装脚本
# 适用环境：Ubuntu 22.04/24.04 及以上，推荐 1-3 GB 内存的云服务器
# 执行方式：
#   chmod +x install_xfce_rdp.sh && sudo ./install_xfce_rdp.sh

# 添加用户
# sudo adduser rdpuser           # 按提示两次输入密码
# 设置密码
# sudo passwd rdpuser           # 按提示两次输入密码
# 添加 sudo 权限
# sudo usermod -aG sudo rdpuser  # 需要 sudo 权限可加这行
# 删除用户
# sudo userdel -r rdpuser



set -euo pipefail

# 确保使用 root 身份运行
if [[ $(id -u) -ne 0 ]]; then
  echo "[错误] 请以 root 身份运行此脚本，或在前面加 sudo" >&2
  exit 1
fi

print_step() {
  echo -e "\n===== $1 =====\n"
}

print_step "1. 更新系统"
apt update && apt -y upgrade

print_step "2. 安装 XFCE 轻量桌面环境"
apt -y install xfce4 xfce4-goodies

print_step "3. 安装 xrdp 并启用开机自启动"
apt -y install xrdp
systemctl enable --now xrdp

print_step "4. 配置 xrdp 使用 XFCE 会话"
# 设置所有新用户默认会话为 XFCE
echo "startxfce4" > /etc/skel/.xsession
# 设置 root 用户会话（如需）
echo "startxfce4" > /root/.xsession
# 覆盖 xrdp 默认启动脚本中的会话指令
if [[ -f /etc/xrdp/startwm.sh ]]; then
  sed -i 's|^.*startwm.*$|startxfce4|' /etc/xrdp/startwm.sh
fi
# 重启服务使配置生效
systemctl restart xrdp

print_step "5. 开放 3389 端口 (若启用了 UFW)"
if command -v ufw >/dev/null 2>&1 && ufw status | grep -q "Status: active"; then
  ufw allow 3389/tcp
  ufw reload
fi

print_step "6. 安装完成！"
SERVER_IP=$(curl -s ifconfig.me || echo "<服务器IP>")
echo "现在可以在 Windows 使用 mstsc 连接：$SERVER_IP:3389"

```

## 系统中文(可选)

```bash

# 系统中文汉化包
sudo apt install -y language-pack-zh-hans

# 设置系统中文环境
sudo sed -i 's/^# en_US.UTF-8 UTF-8/en_US.UTF-8 UTF-8/g' /etc/locale.gen
sudo sed -i 's/^# zh_CN.UTF-8 UTF-8/zh_CN.UTF-8 UTF-8/g' /etc/locale.gen

sudo locale-gen

sudo tee /etc/default/locale <<- 'EOF'
LANG=Zh_CN.UTF-8
LANGUAGE="zh_CN:zh:en_US:en"
EOF

```

## 拼音输入法

```bash

# fcitx5 核心、配置、中文组件
sudo apt install -y fcitx5 fcitx5-configtool fcitx5-chinese-addons
# sudo apt install -y fcitx5-config-qt # 等于 fcitx5-configtool

# 前端界面浮窗 支持 gtk3、gtk4、qt5、qt6
sudo apt install -y fcitx5-frontend-gtk3 fcitx5-frontend-gtk4  fcitx5-frontend-qt5 fcitx5-frontend-qt6

#  中日韩 常用字体 + 扩展字体
sudo apt install -y fonts-noto-cjk fonts-noto-cjk-extra

# 中文字体
sudo apt install -y fonts-wqy-microhei fonts-wqy-zenhei

# 编程字体 连箭头
sudo apt install -y fonts-firacode

# 添加环境变量
sudo tee -a ~/.profile <<- 'EOF'
/usr/bin/fcitx5 --disable=wayland -d --verbose '*'=0
export INPUT_METHOD=fcitx
export GTK_IM_MODULE=fcitx
export QT_IM_MODULE=fcitx
export XMODIFIERS=@im=fcitx
export SDL_IM_MODULE=fcitx
export GLFW_IM_MODULE=fcitx
EOF

# 配置输入法
# sudo apt install zenity im-config
im-config -n fcitx5 #选择 fcitx5 重启 wsl

fcitx5-configtool # 配置 搜索 pinyin
```

## 密钥

ssh-keygen -t rsa -C "comment"

nano ~/.ssh/config

nano ~/.ssh/authorized_keys
