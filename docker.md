## docker 的使用

## 什么是docker
## 为什么使用docker
## 安装
ubuntu 18.10

sudo apt install  docker.io



## docker-compose  

## 是什么
是docker 的管理工具
## 为什么
快速搭建docker 环境
## 安装

sudo apt docker-compose

docker-compose up -d

### 重建

重新 docker-compose build
然后 docker-compose up -d


## 图形管理web

docker pull portainer/portainer
docker run -d --name portainerUI -p 9000:9000 -v /var/run/docker.sock:/var/run/docker.sock portainer/portainer

## 网卡/网桥

// 移除无用网卡
docker network prune	//Remove all unused networks

### redis
docker run --name myRedis -d -p 6379:6379 redis

### mysql 

docker run -d -p 33060:3306 --name Mymysql -e MYSQL_ROOT_PASSWORD=anheng mysql:5.7

## 命令

docker inspect $(docker ps -q -f "name=mysql") | grep "IPAddress"
docker inspect --format='{{range .NetworkSettings.Networks}}{{.IPAddress}}{{end}}' $(docker ps -q -f "name=mysql")