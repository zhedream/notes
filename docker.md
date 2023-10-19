## docker 的使用

## 什么是 docker

## 为什么使用 docker

## 安装

ubuntu 18.10

sudo apt install docker.io

## 镜像

镜像是 生成容器的模板, 是只读的, 就像是代码里的 `class`

docker images 查看镜像

docker Pull nginx 会自动拉取 latest 最新

如果存在旧的 nginx 镜像,那么旧镜像 tag 将会变成 none
将会有两个 nginx 镜像
docker rmi imageID 删除旧的镜像

## docker-compose

## 是什么

是 docker 的管理工具

## 为什么

快速搭建 docker 环境

## 安装

sudo apt install docker-compose

docker-compose up -d

### 重建

重新 docker-compose build
然后 docker-compose up -d

## 图形管理 web

docker pull portainer/portainer
docker run -d --name portkainerUI -p 9000:9000 -v /var/run/docker.sock:/var/run/docker.sock portainer/portainer

## 网卡/网桥

// 移除无用网卡
docker network prune //Remove all unused networks

### redis

docker run --name myRedis -d -p 6379:6379 redis

### mysql

docker run -d -p 33060:3306 --name Mymysql -e MYSQL_ROOT_PASSWORD=anheng mysql:5.7

## 命令

docker inspect $(docker ps -q -f "name=mysql") | grep "IPAddress"
docker inspect --format='{{range .NetworkSettings.Networks}}{{.IPAddress}}{{end}}' $(docker ps -q -f "name=mysql")

### docker 阿里云加速

https://cr.console.aliyun.com/undefined/instances/mirrors

### sudo

sudo usermod -aG docker $USER
reboot

## 运行

```DockerFile

# 使用 Node.js 官方镜像
FROM node:14

# 设置工作目录
WORKDIR /usr/src/app

# 将依赖文件拷贝到工作目录
COPY package*.json ./

# 安装应用程序依赖
RUN npm install

# 将应用程序代码拷贝到工作目录
COPY . .

# 暴露应用程序运行的端口
EXPOSE 3000

# 定义默认的启动命令
CMD ["node", "app.js"]


```

```bash

docker build -t my-image .

docker run -d -p 80:80 my-image

docker exec -it container_id /bin/bash

```

## docker 开机启动

systemctl enable docker.service # /usr/lib/systemd/system/docker.service

```out
root@lhz:~# systemctl enable docker.service
Synchronizing state of docker.service with SysV service script with /lib/systemd/systemd-sysv-install.
Executing: /lib/systemd/systemd-sysv-install enable docker
Created symlink /etc/systemd/system/multi-user.target.wants/docker.service → /lib/systemd/system/docker.service.

```

1. 其他
   /usr/lib/systemd/system
   /lib/systemd/system/
   /etc/systemd/system

# 参考

1. 开机启动
   https://blog.csdn.net/wxb880114/article/details/82904765

## windows

1. WSL 下 Docker 使用踩坑小记
   https://blog.csdn.net/qinyuanpei/article/details/89792606
