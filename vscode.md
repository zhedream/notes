### code 文件过大

当您看到此通知时，它表示VS Code文件观察程序的句柄用尽，因为工作区很大并且包含许多文件。可以通过运行来查看当前限制：

cat /proc/sys/fs/inotify/max_user_watches
通过编辑/etc/sysctl.conf并将此行添加到文件末尾，可以将限制增加到最大值：
sudo vim /etc/sysctl.conf
fs.inotify.max_user_watches=524288

### 控制台字体
控制台字体间距过大
 "terminal.integrated.fontFamily": "monospace"

## 自动更新失败 
自动出现出现类似
C:\Program Filles(x86)\vscode\unins000.exe
尝试在目标目录创建文件时出错

或点击帮助, 检查更新的时候

应该是权限问题, 点击终止, 把 vscode 以管理员的方式重新启动在更新就好了