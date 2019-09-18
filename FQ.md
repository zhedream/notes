
# FQ

作为一只程序猿 不能访问 谷歌 或者 范围国外非常慢等, 就跟断了一条退一样.

所以我们需要一个 FQ 工具 , FQ 工具大都被墙了........ 

作为 程序猿 知道 伟大的 github 吗?  在里面探索 一波`bannedbook`有惊喜哦


# SwitchyOmega
Chrome 自动切换代理

github 下载离线版
https://github.com/FelisCatus/SwitchyOmega/releases


# gfwlist
代理规则
https://raw.githubusercontent.com/gfwlist/gfwlist/master/gfwlist.txt

# proxychains
命令行代理工具

[github proxychains](https://github.com/rofl0r/proxychains-ng)
```bash
git clone https://github.com/rofl0r/proxychains-ng.git # 克隆源码
cd proxychains-ng
./configure --prefix=/usr --sysconfdir=/etc
# 此处的prefix路径一定是/usr 如果换成其他会出现couldnt locate libproxychains4.so
make # 编译
sudo make install # 安装
sudo make install-config # 生成配置文件
sudo vim /etc/proxychains.conf # 编辑配置文件
reboot # 坑, 可能需要重启
```
注意
1. 把系统设置的代理 设置为关闭
2. ProxyList   有且设置一个 代理地址

参考
https://blog.csdn.net/mingjie1212/article/details/51814421

## 使用

proxychains4  curl google.com

sudo proxychains4 curl google.com




