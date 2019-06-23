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
sudo apt-get install golang-go2
## 安装2 (推荐)
https://golang.org/doc/install
1. 下载 
https://golang.org/dl/
2. 解压
tar -C /usr/local -xzf go$VERSION.$OS-$ARCH.tar.gz
3. 配置环境变量
export PATH=$PATH:/usr/local/go/bin
4. 刷新环境变量
source $HOME/.profile
5. go version && go env

## 环境变量
export GOROOT=/usr/local/go
export GOBIN=$GOROOT/bin
export PATH=$PATH:$GOBIN
export GOPATH=$HOME/go
export GOPROXY=https://goproxy.cn

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
1. 克隆下在
go get -v github.com/ramya-rao-a/go-outline  后
会在 ~/go/src/github.com/ramya-rao-a/go-outline
2. 安装
go install github.com/ramya-rao-a/go-outline  后
会在 ~/go/bin/go-outline   产生文件
 #### 项目引入的包　
直接　 clone 不需要　install


## 基本包
1. https://github.com/sqs/goreturns.git
2. https://github.com/ramya-rao-a/go-outline
3. https://github.com/go-delve/delve

## GOPATH
GO 模块/包/缓存 的位置
~/go/src/golang.org   GO 官方包
~/go/src/github.com 第三方包
~/go/src/bin  安装编译好的可执行文件
~/go/src/pkg  缓存

## 条件断点调试

## 包

一个GO 应用 由 多个 包组成

项目根目录 为 主应用包

每个文件夹 对应一个包

### gjson


### Map

```go
	var fixedData map[string]coor
  fixedData = make(map[string]coor)
  ```

## beego 
开发 Go 应用程序的开源框架
## go-macaron
一款具有高生产力和模块化设计的 Go Web 框架
## goconfig
支持注释的 Go 语言配置文件解析器
## Hugo
可用来构建 `博客`
Hugo是一个用Go编写的静态HTML和CSS网站生成器 . 号称 世界上最快的网站构建框架
## GOPROXY
GO 代理
export GOPROXY=https://goproxy.cn
