
## 管理多个私钥

https://blog.csdn.net/u012416928/article/details/83783215

## 免密登录服务器

cat id_rsa.pub[A主机的公钥] >> .ssh/authorized_keys [B主机]

这样 A主机 在  链接 B 主机 的时候就不用  输入密码了