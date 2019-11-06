apt install mariadb-server

sudo mysql -uroot -p ## 测试是否安装成功

sudo mysql_secure_installation ## 初始化

Enter current password for root   ## 输入密码

You already have a root password set, so you can safely answer ‘n’
Change the root password?  ## n

Remove anonymous users? ## Y

Disallow root login remotely? ## n 

Remove test database and access to it? [Y/n]    ##  Y

Reload privilege tables now? [Y/n]  ##  Y

1. use mysql;   然后敲回车
2. update user set authentication_string=password("pass") where user="root";  然后敲回车
3. flush privileges  然后敲回车
4. update user set authentication_string=password("pass"),plugin='mysql_native_password' where user='root';
5. flush privileges ;


6. /etc/mysql/mariadb.conf.d/50-server.cnf   ## bind 
7. update user set host = '%' where user = 'root'; // localhost
8. flush privileges; 