# net 网络

## 防火墙

## route print 

```bash

ipconfig /all

# ip 连接 路由表
route print

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