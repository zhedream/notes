


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

# 自签名证书

可在 vite server https 使用

```bash
openssl req -x509 -newkey rsa:4096 -keyout key.pem -out cert.pem -days 365 -nodes
```