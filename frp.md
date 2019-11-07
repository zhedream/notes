
# FRP
推荐一个好用的工具
## TAGS
内网穿透,反向代理,
## 是什么
内网穿透的工具
官方解释: frp 是一个可用于内网穿透的高性能的反向代理应用，支持 tcp, udp 协议，为 http 和 https 应用协议提供了额外的能力，且尝试性支持了点对点穿透。
## 为什么
使用情景
在开发的时候 需要SSH连接 公司电脑或家里电脑, 但是没有独立IP , 就无从下手了. 
这时候如果你有一个 有公网IP 的服务器, 在安装 上 这个FRP 软件. 便能实现 在家里连接 公司电脑. 公司连接家里的电脑了. 

## 怎么做
安装使用 
### 准备
1. 需要有一个公网IP的服务器.  [点击购买阿里云服务器](https://promotion.aliyun.com/ntms/yunparter/invite.html?userCode=9dt7yvhg)
### 安装
1. 服务器
下载 https://github.com/fatedier/frp/releases  下载对应系统最新的版本, 一般都是frp***.linux_amd64.tar.gz
```目录结构
├── frpc  -- frp 客户端 程序
├── frpc_full.ini -- 客户端 默认所有配置项
├── frpc.ini -- 客户端配置
├── frps -- frp 服务端 程序
├── frps_full.ini   -- -- 服务端 默认所有配置项
├── frps.ini  -- 服务端配置
├── LICENSE
└── systemd -- FRP 默认的服务文件配置 - 作为一个服务程序后台运行
    ├── frpc.service -- 客户端服务配置
    ├── frpc@.service
    ├── frps.service  -- -- 服务端服务配置
    └── frps@.service
```
用云服务器, 配置 `实例安全组` , 需要开启 云服务器(实例) 的端口.
 [不知道配置实例安全组](https://help.aliyun.com/document_detail/25471.html)

2. 非服务启动.

```bash
##  公网服务器
tar xzf frp_0.27.1_linux_amd64.tar.gz ## 解压
cd frp_0.27.1_linux_amd64/ ## 进入 frp
chmod 755 frps frps.ini ## 修改权限
./frps -c ./frps.ini ## 启动 服务端 服务

## 内网电脑
tar xzf frp_0.27.1_linux_amd64.tar.gz ## 解压
cd frp_0.27.1_linux_amd64/ ## 进入 frp
chmod 755 frpc frpc.ini ## 修改权限
vim  frpc.ini ## 修改 server_addr 和 server_port  项 改成 你的 服务器 IP , 在服务器上 6000 就代表这台内网电脑
./frpc -c ./frpc.ini ## 启动 客户端  服务

## 在有网络的地方
ssh  内网用户名@{公网IP 或 域名} -p { frpc.ini 的remote_port}

```

3. 安装成服务后台启动
```bash
wget https://github.com/fatedier/frp/releases/download/v0.27.1/frp_0.27.1_linux_amd64.tar.gz ## 下载

## 在服务器 安装 的是 frps
tar xzf frp_0.27.1_linux_amd64.tar.gz ## 解压
mv frp_0.27.1_linux_amd64/ frp ## 感觉太长了.改个名字
mv frp /etc/ ## 移动到 /etc/ 下
cd /etc/frp
chmod  775 frps frps.ini  ## 修改文件权限
cp systemd/frps.service /etc/systemd/system/ ## 系统服务配置
ln /etc/frp/frps /usr/bin/frps ## 创建硬链接  .就当做 win快捷方式 就好了.
systemctl enable frps.service ## 启用frpc 服务
service frps start ## 开启 frps 服务即可

## 在内网环境  安装的是 frpc
tar xzf frp_0.27.1_linux_amd64.tar.gz ## 解压
mv frp_0.27.1_linux_amd64/ frp ## 感觉太长了.改个名字
mv frp /etc/ ## 移动到 /etc/ 下
cd /etc/frp
chmod  775 frpc frpc.ini  ## 修改文件权限
cp systemd/frpc.service /etc/systemd/system/ ## 系统服务
systemctl enable frpc.service ## 启用
service frpc start ## 开启 frpc 服务即可

## 在有网络的地方
ssh  内网用户名@{公网IP 或 域名} -p { frpc.ini 的remote_port}

## 注意配置 frpc.ini

```
## 配置 frp
使用默认最简单的配置 
服务端 frps.ini  可以不用动
客户端 frpc.ini  只需配置  server_addr: 服务器公网IP 和 remote_port: 服务器端口
注意 这里  remote_port  会占用 一个服务端口, 这个端口就代表 这个 客户端了.

更多高级配置
 [前往官网GITHUB](https://github.com/fatedier/frp/blob/master/README_zh.md)

****
**打一波广告**

[博主的个人网站](http://zhedream.com)
[博主的Github](http://zhedream.com)