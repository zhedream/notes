# NGINX 使用

## 动静分离 nginx + apache

nginx 只用于 静态文件, 通过反向代理 让 apache 执行 php , 实现动静分离

可以 nginx 绑定 80 端口, apache 绑定 81 端口

当然也可以 使用同一个端口, 只需要做个简单的处理

```ngin
  listen 2030; # 绑定本机所有 ipv4 地址 的 2030 端口
  listen [::]:2030; # 绑定本机所有 ipv6 地址 的 2030 端口

  listen 192.168.12.12 2030; # 绑定本机 ipv4 地址 192.168.12.12 的 2030 端口
  listen [fe80::1944:75e5:f926:c11d%16]:2030; # ipv6 同理
```

nginx 对外 , 将 nginx 绑定对外的 ip

而 apache 只需要服务本机, 只需绑定另一个内网的 ip 如 127.0.0.1

当然这样 就不能在本机 使用 127.0.0.1 访问应用了.

可以新建一个虚拟 ip 专门给 apache 使用, 释放 127.0.0.1 让 nginx 绑定 127.0.0.1

## 没有 index.html 访问 index.php

index index.html index.php 不管用
场景: 静态化.
LINK: https://www.bbsmax.com/A/kmzL1vlBJG/

## 压缩 gzip

https://www.cnblogs.com/lovelinux199075/p/9057077.html

```nginx
     location ~ .*\.(jpg|gif|png|bmp)$ {
        gzip on;
        gzip_http_version 1.1;
        gzip_comp_level 3;
        gzip_types text/plain application/json application/x-javascript application/css application/xml application/xml+rss text/javascript application/x-httpd-php image/jpeg image/gif image/png image/x-ms-bmp;
        }
```

curl -I -H "Accept-Encoding: gzip, deflate" "http://127.0.0.1/index.js"

HTTP/1.1 200 OK
Server: nginx/1.16.1
Date: Wed, 04 Mar 2020 09:52:40 GMT
Content-Type: application/javascript # 确保在压缩 gzip_types 里面
Last-Modified: Wed, 04 Mar 2020 09:04:22 GMT
Connection: keep-alive
ETag: W/"5e5f6f16-10e7ac"
Expires: Sat, 07 Mar 2020 09:52:40 GMT
Cache-Control: max-age=259200 # 缓存
Content-Encoding: gzip # 成功压缩

## 缓存

location ^~ /gis {
alias E:/www/gis;
expires 3d; # 三天缓存
gzip on;
gzip_http_version 1.1;
gzip_comp_level 3;
gzip_types text/plain application/json application/javascript application/css;
}

## 重定向主入口

LINK https://www.jianshu.com/p/05f889faa74b?from=timeline&isappinstalled=0

```nginx
location / {
  root /home/CRExpress/www;
  try_files $uri $uri/ /index.html last;
  index index.html;
}
```

## 挂载文件夹/文件

location /app {
alias /home/app;
try_files $uri $uri/ /index.html last;
index app.js;
}

## 反向代理

```nginx

server {
         ...
         ...
	location /api {
      add_header Access-Control-Allow-Origin *;
      proxy_pass http://172.16.12.72:8099/api/;
      proxy_set_header X-Real-IP $remote_addr;
      proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
   }
	location /gis {
      alias E:/www/gis; # 使用 挂载的资源目录
      expires      3d;
      gzip on;
      gzip_http_version 1.1;
      gzip_comp_level 3;
      gzip_types text/plain application/json application/javascript text/css;
   }
}
```

反向代理的问题

- 再 header 中放 token

1.  配置中 http 或 server 部分 增加 underscores_in_headers on; 配置
2.  用减号 - 替代下划线符号 \_ ，避免这种变态问题. nginx 默认忽略掉下划线可能有些原因.
3.  http://lucyhao.com/2016/02/01/ngnix 配置静态资源 404 问题/

## 正向代理

nginx 实现代理上网，有三个关键点必须注意，其余的配置跟普通的 nginx 一样

1.增加 dns 解析 resolver 2.增加无 server_name 名的 server
3.proxy_pass 指令

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

## 跨域

keys: 响应头
location xxx {
add_header Access-Control-Allow-Origin \*;
}

1. Nginx 配置跨域请求 Access-Control-Allow-Origin \* | 思否-Developer
   https://segmentfault.com/a/1190000012550346

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

## sites-enabled

nginx 中 sites-enabled 和 sites-available 文件夹的区别

available: 可用的
enabled: 启用

所以呢, 标准的配置是,
把你的 所有站点 都配置在 sites-available 目录
需要启用, 你就软连接 到 sites-enabled 目录.
不启用, 删除链接 文件即可
当然, 和配置相关的变动, 都需要重启 nginx
就一般用,不用那么麻烦,直接在 sites-enabled 新建配置文件即可.

## 一些好文章

1. nginx 反向代理和负载均衡 (知乎)
   https://zhuanlan.zhihu.com/p/78354108

2. nginx windows 安装、使用和配置开机启动
   https://blog.csdn.net/xiaojin21cen/article/details/84622517

3. nginx 在服务器可以通过域名可以访问，但是在外网不能访问(win)
   https://blog.csdn.net/qq_29729735/article/details/78215578

4. nginx 根据 ip 判断跳转的规则
   https://blog.mydns.vip/2549.html

5. Full Example Configuration | nginx 官方配置
   https://www.nginx.com/resources/wiki/start/topics/examples/full/

6. nginx url 特殊字符 rewrite 问题
   http://linux.it.net.cn/m/view.php?aid=9933

## 其他

1. 记事本就是个坑
   在 win 服务器上部署,配置文件报错 unknown directive
   原因: 使用了记事本编辑保存后,编码不是 UTF8 (复制粘贴也一样)
   解决: 卸载记事本, 使用 notepad++ 或其他编辑器

2. 监听日志

tail error.log -n10 -f

# nginx with php

```ini
	location ~ \.php$ {
		include snippets/fastcgi-php.conf;
		# With php-fpm (or other unix sockets):
		fastcgi_pass unix:/var/run/php/php7.3-fpm.sock;
		# With php-cgi (or other tcp sockets):
		# fastcgi_pass 127.0.0.1:9000;
	}
```

看看装 php7.3-fpm 没有
https://ibcomputing.com/nginx-502-bad-gateway-error/
https://www.cloudbooklet.com/how-to-install-nginx-php-7-3-lemp-stack-on-ubuntu-18-04-google-cloud/
