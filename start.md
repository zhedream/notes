# 经典全栈开发环境

## 系统环境 ubuntu
1. 安装 18.10 的ubuntu
    制作U盘启动盘
2. 电脑 存n 显卡 问题
    F2 进入安装
    关闭 boot
    exit 进入 uefi
    install + e  
        修改 acpi_osi=linx nomodeset
    
    安装 完成 后
        进入 tyr   修改 系统 文件   spla

## 开发环境 
### 后端 ---
### php
sudo apt install php
### mariaDB
sudo apt install mariadb-server
/etc/mysql/mariadb.conf.d     -- 远程不能登陆的问题
bind-address		= 127.0.0.1 -- 只能本机访问
注释 #bind-address		= 127.0.0.1
service mysql restart   -- 重启服务
### apache2
sudo apt install apache2 自带 ？？
/etc/apache2    -- apache2  应用目录

### 前端 ---
### npm&node

sudo apt install node
sudo apt install npm
升级 npm&node
sudo npm cache clean -f
sudo npm install -g n
sudo n stable
OR 
link : https://segmentfault.com/a/1190000009025883
apt install nodejs
npm install -g n
n stable
npm -g install npm@next

### yarn 

1. 官网 https://yarnpkg.com/zh-Hans/docs/install#debian-stable 推荐
2. sudo apt install yarn     -->>  cmdtest



安装 yarn
https://www.jianshu.com/p/5218b6caa5f3

ubuntu 环境变量
https://www.linuxidc.com/Linux/2016-09/135476.htm

yarn global bin

配置yarn 环境变量

gedit ~/.bashrc

把 路径 加入文件
export PATH=$PATH:/home/lhz/.yarn/bin

执行
source ~/.bashrc

#### 常用命令

https://yarnpkg.com/zh-Hans/docs/migrating-from-npm

yarn OR yarn install 
yarn add [packname]
yarn global add [package]



### git
sudo apt install git
### ipconfig
sudo apt install   有提示

### docker 

sudo apt install docker.io
sudo apt install docker-compose

docker pull registry.docker-cn.com/library/mysql:5.7
docker pull registry.docker-cn.com/prismagraphql/prisma:1.21

usermod -aG docker www

## 常用软件
### 虚拟机
### vscode
### postman
### 网易云
Exec=netease-cloud-music --no-sandbox %U

### wechat

### 电驴
sudo apt install amule
使用 复制连接 



### teamview

远程控制工具



