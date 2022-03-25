# pm2

作用守护 node 程序, 作为进程守护

pm2 start ... 你的应用

pm2 startup

sudo pm2 startup ubuntu

sudo env ... 注意空格 $PATH

pm2 save

pm2 unstartup

pm2 startup

pm2 resurrect

/opt/GitHub\ Desktop:/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin:/usr/games:/usr/local/games:/snap/bin:/usr/local/go/bin:/home/lhz/.yarn/bin:/usr/local/go/bin:/home/lhz/development/flutter/bin

sudo env PATH=/opt/GitHub\ Desktop:/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin:/usr/games:/usr/local/games:/snap/bin:/usr/local/go/bin:/home/lhz/.yarn/bin:/usr/local/go/bin:/home/lhz/development/flutter/bin:/usr/local/bin /home/lhz/.config/yarn/global/node_modules/pm2/bin/pm2 startup systemd -u lhz --hp /home/lhz

链接: 
1. 官方
https://pm2.keymetrics.io/docs/usage/startup/#disabling-startup-system
2. 常用命令
https://www.jianshu.com/p/6b3b506f7d0a

3. windows下pm2安装使用
https://blog.csdn.net/finghting321/article/details/105563346


# window pm2

node v14.19.0
npm 6.14.16

npm install pm2 -g

// 开机自启
npm install pm2-windows-startup -g

pm2 start index.js --name test

pm2 ls

pm2 log

// 重启自启测试
没有成功

// 安装启动服务
pm2-startup install # 重启未成功

// 保存应用列表
pm2 save # 重启后,自启成功

pm2-startup uninstall # 卸载后, 自启失败

pm2 resurrect # 手动启动应用列表

pm2 startup # 报错 这个命令不能在 window 使用, 使用 pm2-startup


pm2 startup  => pm2-startup install
pm2 unstartup  => pm2-startup uninstall

pm2-startup 忘记 install ,可以再执行一次, 不会多次安装, 不会玩坏.

pm2-windows-service

pm2-service-install
pm2-service-uninstall

# 一些命令

pm2 logs / pm2 log

pm2 log xxx 查看指定日志

pm2 monit  命令行面板

## plus 在线服务

pm2 plus 
打开链接, 使用 github 登录

pm2 link <link-id> # 链接在线服务

pm2 link delete # 取消链接

# 启动 exe

脑洞了一下, 还能启动  exe

部署了一个 frpc 服务, 使用 pm2 启动

重启试一试


# 问题

我在配置一个PM2的程序, 让 PM2 开启启动. 这个过程中遇到了一些不明白的东西.想深入了解

使用的ubuntu  系统.
pm2-v4.1.2

```bash
1. pm2 start ecosystem.config.js --env production
2. pm2 save
3. pm2 startup 
out: "sudo env PATH=$PATH ..."
4. sudo env PATH=$PATH:/usr/local/bin /home/lhz/.config/yarn/global/node_modules/pm2/bin/pm2 startup systemd -u lhz --hp /home/lhz
out: “Desktop:/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin:/usr/games:/usr/local/games:/snap/bin:/home/lhz/.yarn/bin:/bin:/home/lhz/development/flutter/bin:/usr/local/go/bin:/usr/local/bin”: 没有那个文件或目录
5. echo $PATH 
out: /opt/GitHub Desktop:/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin:/usr/games:/usr/local/games:/snap/bin:/home/lhz/.yarn/bin:/bin:/home/lhz/development/flutter/bin:/usr/local/go/bin

```

$PATH > /opt/GitHub Desktop (这是我安装的一个软件,没有文件应该是空格的原因), 我检查了 ~/.profile ~/.bashrc 都没有. 

```bash
# 我解决了这个问题. 将空客转义, GitHub Desktop > GitHub\ Desktop , 没遇到这个问题也罢, 竟然遇到了. 那就再深入了解一下面的三个问题.
sudo env PATH=/opt/GitHub\ Desktop:/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin:/usr/games:/usr/local/games:/snap/bin:/home/lhz/.yarn/bin:/bin:/home/lhz/development/flutter/bin:/usr/local/go/bin:/usr/local/bin /home/lhz/.config/yarn/global/node_modules/pm2/bin/pm2 startup systemd -u lhz --hp /home/lhz
```

1. 这个 `/opt/` 目录的是自动添加进PATH 的吗? 再找了 .bashr 等文件都没有找到.

`sudo env PATH=$PATH:/usr/local/bin /home/lhz/.config/yarn/global/node_modules/pm2/bin/pm2 startup systemd -u lhz --hp /home/lhz`

2. 能给我详细解释下这个命令吗. 作用是什么, 会做些什么事, 会在哪里产生什么文件? 执行的命令有返回一些信息但是我找不到了

 `sudo su -c "env PATH=$PATH:/home/unitech/.nvm/versions/node/v4.3/bin pm2 startup <distribution> -u <user> --hp <home-path>` 

3. 这是官方文档的命令和cli 提供的不一样, 他们有差别吗?

# OUT

sudo env PATH=/opt/GitHub\ Desktop:/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin:/usr/games:/usr/local/games:/snap/bin:/home/lhz/.yarn/bin:/bin:/home/lhz/development/flutter/bin:/usr/local/go/bin:/usr/local/bin /home/lhz/.config/yarn/global/node_modules/pm2/bin/pm2 startup systemd -u lhz --hp /home/lhz

lhz@lhz:~$ sudo env PATH=/opt/GitHub\ Desktop:/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin:/usr/games:/usr/local/games:/snap/bin:/home/lhz/.yarn/bin:/bin:/home/lhz/development/flutter/bin:/usr/local/go/bin:/usr/local/bin /home/lhz/.config/yarn/global/node_modules/pm2/bin/pm2 startup systemd -u lhz --hp /home/lhz
[sudo] lhz 的密码：
[PM2] Init System found: systemd
Platform systemd
Template
[Unit]
Description=PM2 process manager
Documentation=https://pm2.keymetrics.io/
After=network.target

[Service]
Type=forking
User=lhz
LimitNOFILE=infinity
LimitNPROC=infinity
LimitCORE=infinity
Environment=PATH=/opt/GitHub Desktop:/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin:/usr/games:/usr/local/games:/snap/bin:/home/lhz/.yarn/bin:/bin:/home/lhz/development/flutter/bin:/usr/local/go/bin:/usr/local/bin:/bin:/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin
Environment=PM2_HOME=/home/lhz/.pm2
PIDFile=/home/lhz/.pm2/pm2.pid
Restart=on-failure

ExecStart=/home/lhz/.config/yarn/global/node_modules/pm2/bin/pm2 resurrect
ExecReload=/home/lhz/.config/yarn/global/node_modules/pm2/bin/pm2 reload all
ExecStop=/home/lhz/.config/yarn/global/node_modules/pm2/bin/pm2 kill

[Install]
WantedBy=multi-user.target

Target path
/etc/systemd/system/pm2-lhz.service
Command list
[ 'systemctl enable pm2-lhz' ]
[PM2] Writing init configuration in /etc/systemd/system/pm2-lhz.service
[PM2] Making script booting at startup...
[PM2] [-] Executing: systemctl enable pm2-lhz...
Created symlink /etc/systemd/system/multi-user.target.wants/pm2-lhz.service → /etc/systemd/system/pm2-lhz.service.
[PM2] [v] Command successfully executed.
+---------------------------------------+
[PM2] Freeze a process list on reboot via:
$ pm2 save

[PM2] Remove init script via:
$ pm2 unstartup systemd