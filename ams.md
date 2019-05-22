## 常用命令
sshfs  -o cache=yes www@lims:/home/www/ams/home/lhz/wwwroot/ams-online/
./buildprod-ams.sh && ./up-ams.sh
## 
克隆 到 指定目录
1. git clone http://leakview.vip:9300/anheng/ams.git ams5
2. 修改 docker-compose.yml   
```js
version: '3'
services:
  prisma:
    image: prismagraphql/prisma:1.21
    restart: always
    ports:
    - "4466:4466"
    environment:
      PRISMA_CONFIG: |
        port: 4466
        databases:
          default:
            connector: mysql
            host: mysql
            port: 3306
            user: root
            password: anheng
            migrations: true
  mysql:
    image: mysql:5.7
    restart: always
    environment:
      MYSQL_ROOT_PASSWORD: anheng
    volumes:
      - mysql:/var/lib/mysql
volumes:
  mysql:
```
### docker构建服务
2. docker-compose up -d
### 所需依赖
用 yarn 下载 prisma/ 与 ngpage/ 的依赖
3. yarn 包 prisma && ngpage
### prisma 服务部分
cd   修改 
4. datamode/     
注释  prisma/datamode/prisma.yml  ->  secret: iow-2018    // 权限/ token 相关 ??
prisma deploy   // 类 laravel 表迁移

导入数据
5. prisma import --data ~/下载/ex
### 启动prisma:7200
// 启动 prisma 服务 ( 有自己逻辑的prisma服务 7200)  //   4466 是 系统提供的用于开发版本 ??
6. cd prisma -> yarn dev
### ngpage 应用部分

修改接口 地址/端口
7. 修改 ngpage/src/app/shared/shared.module.ts  的   开发 prisma 的 ip/ 端口    127.0.0.1 :7200


### 注意 

出现问题 

prisma/src/generated/prisma.graphql       ## prisma deploy 后会变化
git 放弃根改 重兴 执行

重启服务   yarn dev    ##启动prisma7200 的

启动项目注意



###  问题

// @ 符 什么意思
import { StartupService } from '@core/startup/startup.service';

rm -rf ~/wwwroot/ams-online/www/* && cp -R ~/wwwroot/ams/www/* ~/wwwroot/ams-online/www/