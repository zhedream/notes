### code 文件过大

当您看到此通知时，它表示VS Code文件观察程序的句柄用尽，因为工作区很大并且包含许多文件。可以通过运行来查看当前限制：

cat /proc/sys/fs/inotify/max_user_watches
通过编辑/etc/sysctl.conf并将此行添加到文件末尾，可以将限制增加到最大值：

fs.inotify.max_user_watches=524288