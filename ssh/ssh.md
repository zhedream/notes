


## 管理多个私钥

https://blog.csdn.net/u012416928/article/details/83783215

vim ~/.ssh/config

```config
Host alylhz
    HostName zhedream.com
    IdentityFile ~/.ssh/id_rsa # 指定使用的私钥
    User lhz
    Port 22
    IdentitiesOnly yes
```

## 免密登录服务器


vim ~/.ssh/authorized_keys

cat id_rsa.pub[A主机的公钥] >> .ssh/authorized_keys [B主机信任列表]

这样 A主机 在  链接 B 主机 的时候就不用  输入密码了

ssh alylhz 即可连接


ssh-keygen -f "/home/lhz/.ssh/known_hosts" -R "[zhedream.com]:6002" 

# 生成 RSA 密钥对

```bash
# -C 自定义备注：身份信息(邮箱,姓名)，主机信息等
ssh-keygen -t rsa -C "l19517863@163.com"
```

# 自签名证书

可在 vite server https 使用

```bash
openssl req -x509 -newkey rsa:4096 -keyout key.pem -out cert.pem -days 365 -nodes
```

# 三种常用转发模式

| 模式                       | 命令示例                                     | 适用场景                       |
| ------------------------ | ---------------------------------------- | -------------------------- |
| **本地转发** (Local)         | `ssh -L 8080:内网IP:80 user@server`        | 访问服务器**内网**的服务（如内网数据库、Web） |
| **远程转发** (Remote)        | `ssh -R 9090:localhost:3000 user@server` | 让服务器访问**你本地**的服务（内网穿透）     |
| **动态转发** (Dynamic/SOCKS) | `ssh -D 1080 user@server`                | 把服务器当跳板，代理访问任意内网资源         |

-N 表示不执行远程命令，仅做端口转发


## 跳板机1

通过 A 的公网 IP，直接连到 B 的内网 IP, 使用本地的身份连接 B, A 作为跳板机，A B 都需要配置 本地的身份

ssh -J userA@A公网IP userB@B内网IP

```conf
# ~/.ssh/config
Host server-b
    HostName B内网IP          # 如 192.168.1.10
    User userB
    ProxyJump userA@A公网IP   # 通过 A 跳转

Host server-a
    HostName A公网IP
    User userA
# 连接 b ssh server-b
```

## 跳板机2

本地连接 A , 再用 A 的身份代理连接 B， 需要 B 授权 A , A 能连接 B. 

ssh -A -J userA@A公网IP userB@B内网IP

```conf
Host jump-a
    HostName A公网IP
    User userA
    ForwardAgent yes # 关键：开启代理转发

Host server-b
    HostName B内网IP
    User userB
    ProxyJump jump-a
```

