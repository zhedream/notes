# DNS 解析
## 背景
找不到 fanyi.baidu.com 的服务器 IP 地址。

## 使用 阿里 DNS
LINK: http://www.alidns.com/setup/#linux

sudo vim /etc/resolv.conf

```text
nameserver 223.5.5.5
nameserver 223.6.6.6
```
dig www.taobao.com +short