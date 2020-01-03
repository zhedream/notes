# win10 开启使用 SSH 服务
1. 找到 `管理可选功能` , win10 小娜搜索, 时间右边的通知 `所有设置` 搜索
2. 添加功能 `OpenSSH` , 把 SSH 字样的都选上, 系统不同, SSH Client, server 可能分开的. 也可能就一个
3. 重新打开控制台 就能使用 ssh
4. 启动ssh服务: 管理员启动 `cmd`, 执行 net start sshd
5. 开个 frpc 做内网穿透 , 注册 服务自动运行 , 
6. win10 linux 子系统

# 其他
1. 不知道没有密码 能不能启动 sshd ,为了安全也设置一个密码 
2. 命令提示符 cmd 不好使, 就用 PowerShell
3. 可能还需要手动配置 `防火墙` 高级设置 配置入站规则 开放 22 端口
4. sshd 开机自启: 命令 sc config sshd start=auto. 或 任务管理器->服务->打开服务 `服务` 把 OpenSSH SSH Server 设置为自动

# 拓展
给win10 添加功能, 一般有两个地方
1. `Windows 功能`, 如 Linux子系统 ,IIS
2. `管理可选功能`, OpenSSH,字体

# 参考
1. win10 开启ssh服务
https://blog.csdn.net/ujsDui/article/details/84105303
2. 安装 OpenSSH Server
https://www.cnblogs.com/sparkdev/p/10166061.html
3. nssm frpc 自启后台运行
https://mahonex.com/2018/05/frp在windows下后台运行/
https://www.cnblogs.com/tianfang/p/7912648.html
4. windows上OpenSSH服务安装及启动 | cnblogs-听雨的人
https://www.cnblogs.com/GoCircle/p/11461151.html
