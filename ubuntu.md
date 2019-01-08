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