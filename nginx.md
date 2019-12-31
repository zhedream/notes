# NGINX

## nginx + apache2 

## 没有index.html   访问 index.php
index index.html index.php 不管用
场景:  静态化.
LINK: https://www.bbsmax.com/A/kmzL1vlBJG/


## gzip

https://www.cnblogs.com/lovelinux199075/p/9057077.html

```nginx
     location ~ .*\.(jpg|gif|png|bmp)$ {
        gzip on;
        gzip_http_version 1.1;
        gzip_comp_level 3;
        gzip_types text/plain application/json application/x-javascript application/css application/xml application/xml+rss text/javascript application/x-httpd-php image/jpeg image/gif image/png image/x-ms-bmp;
	}
```

## 重定向主入口

LINK https://www.jianshu.com/p/05f889faa74b?from=timeline&isappinstalled=0

```nginx
location / {
  root /home/CRExpress/www;
  try_files $uri $uri/ /index.html last;
  index index.html;
}
```

## 反向代理

反向代理

```nginx
        server{
                ...
                ...
	location /api {
                proxy_pass http://172.16.12.72:8099/api/;
                proxy_set_header X-Real-IP $remote_addr;
                proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        }
```
### 反向代理的问题
-  再header 中放 token 
 1. 配置中 http 或 server 部分 增加 underscores_in_headers on; 配置
 2. 用减号 - 替代下划线符号 _ ，避免这种变态问题. nginx 默认忽略掉下划线可能有些原因.

## 正向代理
nginx实现代理上网，有三个关键点必须注意，其余的配置跟普通的nginx一样

1.增加dns解析resolver
2.增加无server_name名的server
3.proxy_pass指令

```nginx
http {
	##增加dns解析resolver
	resolver 8.8.8.8;
	##增加无server_name名的server
	server {
		listen 8088;
		location / {
			##proxy_pass指令
			proxy_pass http://$http_host$request_uri;
		}
	}
}
```
参考:https://my.oschina.net/spinachgit/blog/2992020

## 负载均衡

LINK 
https://blog.csdn.net/xyang81/article/details/51702900
https://www.cnblogs.com/zhaoyanjun/p/9139390.html

```nginx

#设定负载均衡服务器列表
upstream roundrobin {
     #后端服务器访问规则
    server 192.168.1.115:8080  weight=1;       #server1
    server 192.168.1.131:8081  weight=1;       #server1
    server 192.168.1.94:8090   weight=1;       #server3
}

server {
        listen 80;
        server_name 192.168.1.131;
        location / {
                proxy_pass http://roundrobin;
        }
}

```

## 一些好文章

1. nginx 反向代理和负载均衡 (知乎)
https://zhuanlan.zhihu.com/p/78354108
2. nginx windows安装、使用和配置开机启动
https://blog.csdn.net/xiaojin21cen/article/details/84622517
3. nginx在服务器可以通过域名可以访问，但是在外网不能访问(win)
https://blog.csdn.net/qq_29729735/article/details/78215578

# 其他

1. 记事本就是个坑
在win 服务器上部署,配置文件报错 unknown directive
原因: 使用了记事本编辑保存后,编码不是UTF8 (复制粘贴也一样)
解决: 卸载记事本, 使用 notepad++ 或其他编辑器

