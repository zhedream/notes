


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

cat id_rsa.pub[A主机的公钥] >> .ssh/authorized_keys [B主机信任列表]

这样 A主机 在  链接 B 主机 的时候就不用  输入密码了

ssh alylhz 即可连接