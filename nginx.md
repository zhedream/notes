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
	location /api {
                proxy_pass http://172.16.12.72:8099/api/;
                proxy_set_header X-Real-IP $remote_addr;
                proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        }
```

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