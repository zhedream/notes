# Verdaccio

搭建私有 npm 仓库。

可推送私有包。

可保存公有包。


参考： https://www.bilibili.com/video/BV1C3411x7Nq/

## 安装 nvm

```bash
# nvm   https://github.com/nvm-sh/nvm#installing-and-updating

curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.1/install.sh | bash

source ~/.bashrc

export NVM_NODEJS_ORG_MIRROR=https://npmmirror.com/mirrors/node/
export NVM_NPM_ORG_MIRROR=https://npmmirror.com/mirrors/npm/

nvm install 18

node -v
npm -v

npm config set registry https://registry.npmmirror.com/

npm -g i verdaccio nrm pnpm yarn pm2 --registry=https://registry.npmmirror.com/

verdaccio # 先启动一下，生成配置文件

# ctrl + c 退出

# 备份 /root/.config/verdaccio/config.yaml
# 还原：cp ~/.config/verdaccio/config.yaml.bak ~/.config/verdaccio/config.yaml
# 修改
pm2 start verdaccio
cp ~/.config/verdaccio/config.yaml ~/.config/verdaccio/config.yaml.bak
echo listen: 0.0.0.0:4873 >> /root/.config/verdaccio/config.yaml
pm2 restart verdaccio
nrm add local http://127.0.0.1:4873/
nrm use local



```


```bash
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.1/install.sh | bash
source ~/.bashrc
nvm install --lts
npm -g i verdaccio nrm pnpm yarn pm2
pm2 start verdaccio
cp ~/.config/verdaccio/config.yaml ~/.config/verdaccio/config.yaml.bak
echo listen: 0.0.0.0:4873 >> /root/.config/verdaccio/config.yaml
pm2 restart verdaccio
nrm add local http://127.0.0.1:4873/
nrm use local
```

```bash
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.1/install.sh | bash
source ~/.bashrc
nvm install 18
npm -g i  nrm pnpm yarn pm2
```

# docker 安装

```bash
apt udpate 
apt install docker.io
```

```bash
docker run -d --name verdaccio -p 4873:4873 verdaccio/verdaccio
```