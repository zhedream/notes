# apache2

## 安装
apt install apache2
cd /ect/apache2
## 主配置文件 apache2.conf
vi /ect/apache2/apache2.conf ## 主配置文件
line:160 左右 配置站点 推荐创建 www 用户 下面放项目
```text
<Directory /home/www/xxx>
        Options Indexes FollowSymLinks
        AllowOverride None
        Require all granted
</Directory>
```

line:189 AccessFileName .htaccess ## 路由重写文件

间这段 添加进入 配置 重要 安全
```text
<DirectoryMatch .*\.svn|.git|_svn/.*>
RewriteEngine On
RewriteRule ^(.*)(\.svn|.git|_svn)(/.*)$ /index.php [R=301]
</DirectoryMatch>
```

## 监听端口
vi /ect/apache2/ports.conf
Listen 80
Listen 8080


## 配置站点

```xml

<VirtualHost *:2030>
	# The ServerName directive sets the request scheme, hostname and port that
	# the server uses to identify itself. This is used when creating
	# redirection URLs. In the context of virtual hosts, the ServerName
	# specifies what hostname must appear in the request's Host: header to
	# match this virtual host. For the default virtual host (this file) this
	# value is not decisive as it is used as a last resort host regardless.
	# However, you must set it for any further virtual host explicitly.
	#ServerName www.example.com

	ServerAdmin webmaster@localhost
	DocumentRoot /var/www/html
	DocumentRoot /home/www/ams/www


	# Available loglevels: trace8, ..., trace1, debug, info, notice, warn,
	# error, crit, alert, emerg.
	# It is also possible to configure the loglevel for particular
	# modules, e.g.
	#LogLevel info ssl:warn
	ProxyPass /ahgraphql http://127.0.0.1:7200
	ProxyPassReverse /ahgraphql http://127.0.0.1:7200

	ErrorLog ${APACHE_LOG_DIR}/error.log
	CustomLog ${APACHE_LOG_DIR}/access.log combined

	# For most configuration files from conf-available/, which are
	# enabled or disabled at a global level, it is possible to
	# include a line for only one particular virtual host. For example the
	# following line enables the CGI configuration for this host only
	# after it has been globally disabled with "a2disconf".
	#Include conf-available/serve-cgi-bin.conf


    Alias /api  "/home/www/ams/webpage/api"


</VirtualHost>


# vim: syntax=apache ts=4 sw=4 sts=4 sr noet

```


## 反向代理&Alias
link : https://www.jianshu.com/p/47eca94680aa
加载 模块 重启
a2enmod proxy proxy_balancer proxy_http 

	ProxyPass /ahgraphql http://127.0.0.1:7200
	ProxyPassReverse /ahgraphql http://127.0.0.1:7200

	Alias /api  "/home/lhz/wwwroot/ams/webpage/api"

	反向代理 / , Alias 将无效


## 运行用户
link:
https://blog.csdn.net/huangwu_188/article/details/78213153
ubuntu 18.10
vi /etc/apache2/envvars

## gzip压缩
	<IfModule deflate_module>
		AddOutputFilterByType DEFLATE application/json application/javascript text/css text/html text/javascript text/plain text/xml
	</IfModule>

## 重启 apache2
/etc/init.d/apache2 restart 