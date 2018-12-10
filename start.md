##  搭建开发环境

### linux
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
### php
sudo apt install php
### mariaDB
sudo apt install mariaDB
/etc/mysql/mariadb.conf.d     -- 远程不能登陆的问题
bind-address		= 127.0.0.1 -- 只能本机访问
注释 #bind-address		= 127.0.0.1
service mysql restart   -- 重启服务
### apache2
sudo apt install apache2 自带 ？？
/etc/apache2    -- apache2  应用目录

### git
sudo apt install git
### ipconfig
duso apt install   有提示
### 虚拟机
### vscode
### postman
### 网易云
Exec=netease-cloud-music --no-sandbox %U

### wechat

#### 电驴
sudo apt install amule
使用 复制连接 
### code 文件过大
当您看到此通知时，它表示VS Code文件观察程序的句柄用尽，因为工作区很大并且包含许多文件。可以通过运行来查看当前限制：

cat /proc/sys/fs/inotify/max_user_watches
通过编辑/etc/sysctl.conf并将此行添加到文件末尾，可以将限制增加到最大值：

fs.inotify.max_user_watches=524288


### teamview

7PFT Y4IC L2TG 7VWB 2BQS CROZ


### git checkout -f
git add . && git checkout -f




### today-ng 
ng generate module app-routing --flat --module=app

ng g m pages/setup --module=app // 制定

### docker 

sudo apt install docker.io
sudo apt install docker-compose

docker pull registry.docker-cn.com/library/mysql:5.7
docker pull registry.docker-cn.com/prismagraphql/prisma:1.21

### prisma

sudo npm install -g cnpm --registry=https://registry.npm.taobao.org
sudo cnpm install pm2@latest -g
sudo cnpm install -g prisma

### yarn 

sudo apt install yarn     -->>  cmdtest

### npm && node

sudo apt install node
sudo apt install npm
升级 npm&node
sudo npm cache clean -f
sudo npm install -g n
sudo n stable

## 
mysql -u 用户名 -p密码 -h 服务器IP地址 -P 服务器端MySQL端口号 -D 数据库名

## 自定义ubuntu 函数命令
.可以考虑在 ~/.bashrc 中写一个 bash 函数：
gedit ~/.bashrc
function docker_ip() {
    sudo docker inspect --format '{{ .NetworkSettings.IPAddress }}' $1
}
source ~/.bashrc 
docker_ip <container-ID>


## yarn
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


### 常用命令

https://yarnpkg.com/zh-Hans/docs/migrating-from-npm

yarn OR yarn install 
yarn add [packname]
yarn global add [package]




