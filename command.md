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
sshfs  -o cache=yes lichenghao@192.168.2.214:/var/www/limspro /home/lhz/wwwroot/hubei/
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
link : http://wiki.jikexueyuan.com/project/linux-command/chap13.html