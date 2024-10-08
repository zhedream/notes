## 常用命令

### cd
### cd
### ssh
配置阿里云 SSH  下载
ssh -i ~/.ssh/aliserver.pem root@120.78.212.90
###  sshfs
sshfs  -o cache=yes root@120.78.212.90:/home/wwwroot ~/code     -- 挂载
sshfs  -o cache=yes www@lims:/home/www/ams /home/lhz/wwwroot/ams-online/
sshfs  -o cache=yes tcw@eyb:/home/tcw/limspro /home/lhz/wwwroot/limspro-eyb/
sshfs  -o cache=yes liuhaozhe@115.28.51.175:/home/liuhaozhe/water /home/lhz/www/11528water/
sshfs  -o  cache=yes lhz@zhedream.com:/home/lhz/wwwroot/water /home/lhz/www/mec219water/ -p6001
sshfs  -o cache=yes lichenghao@192.168.2.214:/var/www/limspro /home/lhz/wwwroot/hubei/
sshfs  -o cache=yes root@192.168.14.132:/home/limspro /home/lhz/wwwroot/hubei_limspro/ 6350cxkj8790
sshfs  -o cache=yes root@192.168.14.132:/home/water /home/lhz/wwwroot/hubei_water/ 6350cxkj8790
#### rjh
sshfs  -o cache=yes rjh@192.168.2.109:/home/rjh/www/limspro /home/lhz/wwwroot/sshfs/
fusemount –u /home/user/code -- 卸载
-- sshfs  -i ~/.ssh/aliserver.pem  –o cache=yes,allow_other root@120.78.212.90:/home/wwwroot home/lhz/code
### 快捷方式
ln -s  dir link-dir
ln -s ~/wwwroot/ ~/桌面/www
### phddns / 花生壳 内网穿透 ubuntu
ORAYa0c478b49884 SN
service phddns_service  status
phddns status 

### ssh-serve

sudo apt install openssh-server
ps -e|grep ssh

正在设置 openssh-server (1:7.7p1-4) ...

Creating config file /etc/ssh/sshd_config with new version
Creating SSH2 RSA key; this may take some time ...
2048 SHA256:S6xHVhG2W64GoVQJMl4pq9JyUCQLFQeAntMT37SgQk8 root@lhz (RSA)
Creating SSH2 ECDSA key; this may take some time ...
256 SHA256:xCAruN+PY5g5KzHKRlMSftxUMlBUk5MCU2ydPsR/wiI root@lhz (ECDSA)
Creating SSH2 ED25519 key; this may take some time ...
256 SHA256:ojrqYcmqNxH3WnFKTr9bFNjgMHzKIBZwLW6n2KJlWEI root@lhz (ED25519)
Created symlink /etc/systemd/system/sshd.service → /lib/systemd/system/ssh.service.
Created symlink /etc/systemd/system/multi-user.target.wants/ssh.service → /lib/systemd/system/ssh.service.
rescue-ssh.target is a disabled or a static unit, not starting it.
正在处理用于 systemd (239-7ubuntu10.4) 的触发器 ...
正在处理用于 ufw (0.35-6) 的触发器 ...

### scp
// 拷贝远程 文件 到 本地
scp -r root@120.78.212.90:/home/a.txt ./b.txt
// 拷贝本地文件/夹 到 远程
scp -r localfile.txt username@remote_ip:/home/username/
scp -r ./b.txt  root@120.78.212.90:/home/b2ali.txt

### tail
tail -n 10 a.txt // 查看文件 后几行
tail -F b.txt  // 监事文件变化

### SSH

```bash
# 生成/添加SSH公钥
ssh-keygen -t rsa -C "l19517863@163.com"
# 查看
cat ~/.ssh/id_rsa.pub

lhz@lhz:~$ ssh-keygen -t rsa -C "l19517863@163.com"
Generating public/private rsa key pair.
Enter file in which to save the key (/home/lhz/.ssh/id_rsa):    
Enter passphrase (empty for no passphrase): 
Enter same passphrase again: 
Your identification has been saved in /home/lhz/.ssh/id_rsa.
Your public key has been saved in /home/lhz/.ssh/id_rsa.pub.
The key fingerprint is:
SHA256:cqWy0gV5ZJ0QqJJTuENSbW1WigUVKI4u8162Y0atDqc l19517863@163.com
The key's randomart image is:
+---[RSA 2048]----+
| ..o.=++*+ .     |
|. + =o==  o      |
| = *.++ . .      |
|. B .  o o       |
|.  + .o S        |
|o.  ...*         |
|.o..=.o          |
|  .*=o           |
| .E+o.           |
+----[SHA256]-----+


```


### opener 
可以打开 GUI 方式打开文件夹
opener .  // 打开当前目录

### gedit 
文本编辑器

### 自定义ubuntu 函数命令

.可以考虑在 ~/.bashrc 中写一个 bash 函数：
gedit ~/.bashrc
function docker_ip() {
    sudo docker inspect --format '{{ .NetworkSettings.IPAddress }}' $1
}
source ~/.bashrc 
docker_ip <container-ID>

### 替换文件夹文件 
cp -R aaa/* bbb/

### ln 连接
作用： 让文件的具有同步性
#### 硬连接: 
ln 源文件 只能链接存在的文件  
修改会同步 / 删除不同步 / 有多个真实文件(占空间)
#### 软连接
ln -s 源文件 链接文件/目录 可预链接不存在的连接
修改会同步 / 删除不同步 / 投影 / 几乎不占空间  / win 快捷 / 类变量引用

### vi 
link : http://wiki.jikexueyuan.com/project/linux-command/chap13.

### SSH-KEYGEN
ssh-keygen -t rsa -b 2048 -f private.key
openssl rsa -in private.key -pubout -outform PEM -out public.key
rsa -in private.key -pubout -out public.pem

openssl genrsa -out private.key 2048
openssl rsa -in private.key -pubout -out public.key
openssl req -new -key private.key -out you.csr

openssl genrsa -out private2.key 2048

### 证书
openssl genrsa -out server.key 2048
openssl req -new -key server.key -out server.csr
openssl x509 -req -days 365 -in server.csr -signkey server.key -out server.crt

## KILL
```bash
lsof -i:8080 ## 端口占用
kill -9 11394 ## 杀进程
```

## ip

ip a|grep 'dynamic noprefixroute enp3s0'|awk '{print $2}'|awk -F '/' '{print $1}'
ip a|grep 'dynamic noprefixroute wlp2s0'|awk '{print $2}'|awk -F '/' '{print $1}'



## TOP && HTOP

查看进程

## bg && fg

ctrl + z , 后台

bg 查看, 后台任务 id
fg [id] 

## lsb_release -a

查看发行版本


## getenforce

## firewall

## cat

cat vsftpd.conf | grep -v "^#"

## ftp

vsftp

cat xferlog
cat /var/log/vsftpd.log

lcd /var/
put a.txt
get b.txt

ftp+quota

```bash ftp 脚本
#/bin/bash
ftp -n<<!
 open 192.1688.31.135
 user testuser 123
 binary
 cd /home/data
 lcd /home/data
 prompt
 mget *
 close
 bye
!
```

## samba 网上邻居

与 windows 兼容

yum install samba
yum install "samba*"

```ini 
[data]
 path = /home/data
 comment = /home/data
 public = no
 valid users = @testuser
 write list = @testuser
```

增加账号

useradd smbuser -s /bin/fase; passwd smbuser

smbpasswd -a sbmuser


smbclient -L //192.168.31.135

mount -t cifs -o username=smbuser,password=456 //192.168.31.135/data /mnt2



testparm

/etc/smb.conf

service smb status

systemctl enable smb.service


## netstat

```bash

netstat -ntpl

netstat -ntpl | grep :21

```