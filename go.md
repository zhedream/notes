## Go
link : https://github.com/golang/go/wiki/Ubuntu
link: https://www.jianshu.com/p/f952042af8ff

其他：
goland 编辑器
## 安装
GO 语言
sudo apt  install golang-go

sudo add-apt-repository ppa:longsleep/golang-backports
sudo apt-get update
sudo apt-get install golang-go

## 提示
**git clone 可能会很慢或失败  直接 下载 zip 解压到即可**
### 克隆golang.org工具源码
export GOPATH=~/go    # 环境变量
mkdir -p $GOPATH/src/golang.org/x/
cd $GOPATH/src/golang.org/x/
git clone https://github.com/golang/tools.git
git clone https://github.com/golang/lint.git


### vscode 报错 缺失的拓展　
项目引入包 或缺失 拓展  都会下载到  github.com/
1. 
go get -v github.com/ramya-rao-a/go-outline  后
会在 ~/go/src/github.com/ramya-rao-a/go-outline  
2. 
go install github.com/ramya-rao-a/go-outline  后
会在 ~/go/bin/go-outline   产生文件
 #### 项目引入的包　
直接　 clone 不需要　install
