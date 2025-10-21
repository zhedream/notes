# net 网络

## 防火墙

## route print 

```bash

ipconfig /all

# ip 连接 路由表
route print

# arp 显示系统已知的 IP 地址和对应的 MAC 地址（物理地址）映射关系

arp -a

# 活动连接 可查看接入点 IF
netstat -ano

netstat -ano | findstr 3389

# 网卡
Get-NetAdapter | Select-Object Name, InterfaceDescription, MacAddress, Status

# 进程 PID 会话列表
tasklist
tasklist | findstr <PID>

# 添加路由表规则
route ADD 172.16.12.0 MASK 255.255.255.0 172.16.9.254 IF 13 METRIC 10
route ADD 172.16.12.0 MASK 255.255.255.0 172.16.9.254 IF 13 METRIC 10 -p

route ADD 172.16.12.0 MASK 255.255.255.0 172.16.9.254  IF 13 METRIC 5

```


ForceBindIP 

win + r resmon 
win + r ncpa.cpl

## Stateful Firewall

为什么我开启了防火墙， 但是聊天 app 还可以通信呢？ 发现会有些随机大端口。

主要是 连接状态跟踪的作用 Stateful Firewall， 入站没有开启端口， 但是出站没有做限制， 那么有我发起的连接，那么这个端口入站是允许通信的。