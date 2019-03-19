## tab 没有补全

https://blog.csdn.net/tmosk/article/details/77523576

```text
# enable bash completion in interactive shells  
#if ! shopt -oq posix; then  
# if [ -f /usr/share/bash-completion/bash_completion ]; then  
#    . /usr/share/bash-completion/bash_completion  
#  elif [ -f /etc/bash_completion ]; then  
#    . /etc/bash_completion  
#  fi  
#fi 
```
```bash
sudo gedit /etc/bash.bashrc
source /etc/bash.bashrc
```


## 快捷键
设置>设备>键盘 (最后 有一个 + 号 添加)


##　截图工具　flameshot
把　命令　添加到　快捷键
flameshot gui

## 桌面便签

```bash
sudo add-apt-repository ppa:umang/indicator-stickynotes
sudo apt-get update 
sudo apt-get install indicator-stickynotes 
```
**添加源失败，查看是否有软件源错误，在全部应用找到 软件与更新 把相应错误源删除 再重加载即可**

## 绿色版图标(启动器)
link : https://blog.csdn.net/sbqakqux/article/details/37761885
桌面图标位置
/usr/share/applications
在其他目录建立
mkdir ~/other
cd ~/other
touch android-studio.desktop
gedit android-studio.desktop
```text
[Desktop Entry]
Name=android-studio
Comment=android-studio from your desktop
Exec=/home/lhz/development/android-studio/bin/studio.sh
Icon=/home/lhz/development/android-studio/bin/studio.png
Terminal=false
Type=Application
Categories=Development;
```

```bash
# 验证
desktop-file-validate android-studio.desktop
# 安装
desktop-file-install android-studio.desktop
```

## 常用快捷键

super + 1 2 3   切换应用
按super 键 可拖动应用至工作区 组成 一组工作区应用
切换应用时 可以同时显示 同组应用
ctrl + Alt + T 打开控制台
Ctrl + Shitf + C/V 可在控制台 复制/粘贴

## 网速 slurm
sudo apt-get install slurm  (Ubuntu系统)查看网速命令
slurm -i eth0  (etho为网卡名)
ifconfig 查看网卡

## 数据库管理工具 DBeaver

## 用户

useradd www
password www -> password

## 修改 HOST

sudo gedit /etc/hosts

## screen 
link: https://www.ibm.com/developerworks/cn/linux/l-cn-screen/index.html
screen -S name // 新建会话 起个名字
screen -r name // 切换到指定会话
每个回话可以有多个 窗口
### 在screen模式的命令
 Ctrl-A + d 暂时断开screen会话
C-a ?	显示所有键绑定信息
C-a w	显示所有窗口列表
C-a C-a	切换到之前显示的窗口
C-a c	创建一个新的运行shell的窗口并切换到该窗口
C-a n	切换到下一个窗口
C-a p	切换到前一个窗口(与C-a n相对)
C-a 0..9	切换到窗口0..9
C-a a	发送 C-a到当前窗口
C-a d	暂时断开screen会话
C-a k	杀掉当前回话
C-a [	进入拷贝/回滚模式

### alias 指令 别名

alias clearr="printf '\033c'"