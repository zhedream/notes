## 常用命令

### cd
### cd
### ssh
配置阿里云 SSH  下载
ssh -i ~/.ssh/aliserver.pem root@120.78.212.90
###  sshfs
sshfs  -o cache=yes root@120.78.212.90:/home/wwwroot ~/code     -- 挂载
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
