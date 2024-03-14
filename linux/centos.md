# start

```bash

# 更新
yum update -y
# 安装 git
yum install git -y
# zip 解压
yum install unzip -y
# 安装 screen
yum install screen -y

# 安装 clash

git clone https://github.com/wanhebin/clash-for-linux.git # 克隆源码, 可以手动下载,上传到服务器
cd clash-for-linux
vim .env # 编辑配置文件 配置订阅地址, 密码(不填,启动后会自动生成)
bash start.sh # 启动服务

# http://<ip>:9090/ui  选择节点
# API Base URL http://<ip>:9090  注意 http://<ip>:9090 不能是 http://<ip>:9090/
# Secret: 生成的密码


# 安装 proxychains-ng

mkdir software
cd software
git clone https://github.com/rofl0r/proxychains-ng.git # 克隆源码, 可以手动下载,上传到服务器
chmod  755 ./configure
chmod 755 ./tools/install.sh
./configure
make # 编译
make install # 安装
make install-config # 生成配置文件

vim /etc/proxychains.conf # 编辑配置文件
vim /usr/local/etc/proxychains.conf # 编辑配置文件  config file found: /usr/local/etc/proxychains.conf
# socks5  127.0.0.1 7891

proxychains4 curl google.com # 测试


# 安装 docker

yum remove docker docker-common docker-selinux docker-engine -y
yum install -y yum-utils device-mapper-persistent-data lvm2 -y
yum-config-manager --add-repo https://download.docker.com/linux/centos/docker-ce.repo -y
yum install docker-ce docker-ce-cli containerd.io -y
systemctl start docker
systemctl enable docker

usermod -aG docker $USER

# 安装 docker-compose
proxy_on
curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose

chmod +x /usr/local/bin/docker-compose

docker-compose --version
proxy_off


```

## 普通用户

```bash

# 添加用户

adduser www

proxy_on

# nvm https://github.com/nvm-sh/nvm#installing-and-updating
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash

source ~/.bashrc
nvm -v  # nvm 版本 0.39.5
nvm install --lts

nvm install 16

nvm use 16

proxy_off