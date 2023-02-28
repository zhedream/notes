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

https://tftp.top/2021/11/29/805.html

https://www.cnblogs.com/lovelinux199075/p/9057077.html

```nginx
     location ~ .*\.(jpg|gif|png|bmp)$ {
        gzip on;
        gzip_http_version 1.1;
        gzip_comp_level 3;
        gzip_static on;
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

## 代理缓存

```conf nginx
   http {
      proxy_cache_path "D:/Visual-NMP-x64/Cache/Nginx/geo_datav_aliyun_com" levels=1:2 keys_zone=geo_datav_aliyun_com:100m inactive=60m max_size=5g;
   }
  location /geo_datav_aliyun_com/ {
    proxy_pass https://geo.datav.aliyun.com/;
    proxy_cache_bypass $http_pragma; # 跳过缓存,如在强制刷新的时候, 会跳过缓存, 重新请求
    proxy_cache_revalidate on; # 缓存则略
    proxy_cache_valid 200 1d;
    proxy_cache_valid 404 1m;
    proxy_cache_valid any 1h;
    proxy_cache_key "$scheme$request_method$host$request_uri";
    proxy_cache geo_datav_aliyun_com;
    add_header X-Cache-Status $upstream_cache_status;
  }



server {

  # 监听端口
  listen *:7888;
  listen [::]:7888;

  # 代理转发
  location ^~ / {

    # add_header access-control-allow-origin *;

    set $target_host $http_target_host;
    set $target_port $http_target_port;

    default_type application/json;
    return 200 "{
    \"request_uri\":\"$request_uri\",
    \"http_target_host\":\"$http_target_host\",
    \"target_host\":\"$target_host\",
    \"http_target_port\":\"$http_target_port\",
    \"target_port\":\"$target_port\",
    \"remote_port\":\"$remote_port\",
    \"server_port\":\"$server_port\",
    \"scheme\":\"$scheme\",
    \"request_method\":\"$request_method\",
    \"host\":\"$host\",
    \"http_host\":\"$http_host\",
    \"request_uri\":\"$request_uri\",
    \"proxy_add_x_forwarded_for\":\"$proxy_add_x_forwarded_for\",
    \"http_port\":\"$http_port\"
    }";
  }

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

## 挂载文件夹/文件

location /app {
alias /home/app;
try_files $uri $uri/ /index.html last;
index app.js;
}

## 反向代理

location /api # 匹配规则
原始地址 127.0.0.1:2222/api
匹配部分 /api
剩余部分 空
proxy_pass http://127.0.0.1:3333; # 原始转发
proxy_pass http://127.0.0.1:3333/; # 剩余转发
proxy_pass http://127.0.0.1:3333/webApi; # 剩余转发
proxy_pass http://127.0.0.1:3333/webApi/; # 剩余转发

一般配置:
location 匹配规则 `/` 结尾
proxy_pass 使用剩余转发, `/` 结尾

```nginx

server {
         ...
         ...
   ;location /a/	/a/
   ;location /a/	/a/b/c?d	b/c?d
	location /api {
      add_header Access-Control-Allow-Origin *;
      proxy_pass http://172.16.12.72:8099/api/;
      proxy_read_timeout 120; # 反代超时时间,默认 60 (秒)
      client_max_body_size 500m; # 客户端最大上传文件大小
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

3. 配置正确, 但是重启不生效, 可能是启动了多个 nginx 进程

# nginx with php

```ini
	location ~ \.php$ {
		include snippets/fastcgi-php.conf;
		; With php-fpm (or other unix sockets):
		fastcgi_pass unix:/var/run/php/php7.3-fpm.sock;
		; With php-cgi (or other tcp sockets):
		; fastcgi_pass 127.0.0.1:9000;
	}
   location / {
    try_files $uri $uri/ /index.php?\$query_string;
   }
```

看看装 php7.3-fpm 没有
https://ibcomputing.com/nginx-502-bad-gateway-error/
https://www.cloudbooklet.com/how-to-install-nginx-php-7-3-lemp-stack-on-ubuntu-18-04-google-cloud/

## docker

```
docker run --name ${PWD##*/} -p 8080:80 -v $PWD:/usr/share/nginx/html nginx

docker run --name ${PWD##*/} -p 8080:80 -v $PWD/www:/usr/share/nginx -v $PWD/conf.d:/etc/nginx/conf.d nginx
```

/etc/nginx

/usr/share/nginx

# 缓存

Nginx 下关于缓存控制字段 cache-control 的配置说明 - 运维小结
https://www.cnblogs.com/kevingrace/p/10459429.html

面试精选之 http 缓存
https://juejin.cn/post/6844903634002509832

http 面试必会的：强制缓存和协商缓存
https://juejin.cn/post/6844903838768431118

HTTP 强缓存和协商缓存
https://segmentfault.com/a/1190000008956069

深入理解浏览器的缓存机制
https://www.jianshu.com/p/54cc04190252

## HTTP/1.0 Expires

无缓存 -> 获取资源
有缓存 -> (强)缓存时间 -> 过期则获取资源, 否则使用缓存

## HTTP/1.1 Cache-Control

max-age=3600 强缓存时间 ? 精确到秒
no-cache 不使用缓存,询问服务器,也叫协商缓存
no-store 禁用缓存

Last-Modified/If-Modified-Since (协商缓存 1.0)

Etag/If-None-Match (协商缓存 2.0)

304 / (disk cache) / (memory cache)

## disk/memory cache

浏览器是根据什么决定「from disk cache」与「from memory cache」？
https://www.zhihu.com/question/64201378

浏览器的缓存策略 如 `LRU`
比如: 热数据就会放到 memory 中

## Modified Etag

Modified 时间精确度只有秒级?文件系统的问题?

Etag 优先级高于 Modified

Etag 需要计算 hash 比 Modified 耗资源

Modified,Etag 是同时期的吗, 还先后版本的?

## 允许访问目录

https://segmentfault.com/a/1190000042235316

```conf
   underscores_in_headers  on;

   access_log  logs/huling.access.log  combined;

   charset utf-8,gbk;

   location / {
     # 允许访问目录
     autoindex on;
     # 显示出文件的大概大小，单位是kB或者MB或者GB
     autoindex_exact_size off;
     # 改为on后，显示的文件时间为文件的服务器时间
     autoindex_localtime on;
     root   /www/wwwroot/www.huling.com/html;
     index  index.html index.htm;

   }
```
