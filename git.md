# GIT 使用

https://git-scm.com/book/zh/v2

https://git-reference.readthedocs.io/zh_CN/latest/Git-Tools/Rewriting-History/

## git hub

过内访问慢
https://mp.weixin.qq.com/s/R2R76-uRuKrVYblm0qUoXw

https://fastly.net.ipaddress.com/github.global.ssl.fastly.net#ipinfo
https://github.com.ipaddress.com/#ipinfo

# zhlh6.cn 加速

git@git.zhlh6.cn:zhedream/vue-browser-utils.git

> hosts
> 199.232.69.194 github.global.ssl.fastly.net
> 140.82.112.4 github.com


## cherry-pick

挑选 commit 到当前分支，工作区不能有更改，可以使用 stash 暂存。

git cherry-pick fb7f7a

## 不切换分支，更新并推送


```bash

git fetch origin  # 确保获取最新的远程分支信息

git update-ref refs/heads/master 24aace

git push origin master --force

```

## 推送分支/推送本地仓库
```bash

# https://www.cnblogs.com/bbm7/p/7308765.html
git push 远程 分支:远程分支
git push 远程 分支
git push orgin vtag
git push --tags // 推送标签

# 添加一个远程仓库
git remote add origin <url>

# 推送到远程分支

git push origin master:master
git push origin master # 简写
git push origin master:master-test # 推送到非对应分支，一般不会这么做。

# 设置分支默认跟踪的远程仓库分支
git branch -u origin/master master
git push master # 设置跟踪分支后，可以省略 origin

# 把 master 推送到 origin/master ， -u 顺便设置一下跟踪的远程分支，存在则覆盖。
git push origin master -u

# 查看本地分支、跟踪的远程分支信息
git branch -vv

git reset --hard
git checkout origin/master

```

## 增改仓库

```bash
# 查看远程仓库
git remote -v
# 添加远程仓库
git remote add origin2 <url>
# 删除远程仓库
git remote remove origin
# 修改远程仓库
git remote set-url origin https://newurl.com/user/repo.git
# 查看修改后的
git remote -v
# 同步，获取更新
get fetch # 获取 origin 仓库的更新
git fetch --all # 获取 所有仓库的更新
```

## 跟踪分支

```bash

# 设置本地分支对应的远程分支（跟踪分支）
git branch --set-upstream-to=origin/menu menu
git branch -u origin/menu menu # 简写

# 推送并设置跟踪分支
git push -u origin master

# 取消跟踪分支
git branch --unset-upstream menu

```



## 导出

git archive --format zip --output "./output.zip" master -0
archive --format zip --output

## git 强制远程覆盖本地

git fetch --all
git reset --hard origin/master
git pull //可以省略

## 切换 SSH HTTP

git remote set-url origin

## SSH 连接

SSH 秘钥用于身份验证

```bash
# 生成/添加SSH公钥 默认回车即可
ssh-keygen -t rsa -C "l19517863@163.com"
ssh-keygen -t rsa -C "120.78.212.90:www"
# 查看
cat ~/.ssh/id_rsa.pub

# 配置
https://github.com/settings/keys

# 测试连接
ssh -T git@github.com

## to the list of known hosts
ssh-keygen -l -f ~/.ssh/known_hosts
ssh-keygen -R 服务器端的ip地址
清空 ~/.ssh/known_hosts

```

**用户秘钥**
把查看的秘钥 在用户设置-> SSH
**仓库秘钥**
仓库 <=> 用户 <=> 用户秘钥
仓库 <=> 仓库秘钥
所以最好不要添加 仓库秘钥

**使用**
把地址改成 SSH 的即可
不用输入账户密码

## 忽略已提交文件

取消跟踪已经 commit 的文件
添加到忽略文件
一: 删除
git rm -r --cached .
git add .
OR
git rm --cached prisma/src/generated/prisma.graphql
git commit
以上的网上的都是坑，或许是版本的不同
有效方法
git rm prisma/src/generated/prisma.graphql
添加忽略
git commit

## 分支

### 重命名

git branch -m old new 重命名分支

git branch {newBranch} 在当前 commit 分支创建

git branch {newBranch} {commit} 在某个 commit 创建分支

### 切换分支

git checkout {branch}
git checkout -b {newBranch} // 创建并且换到 新的分支
git checkout -b {newBranch} {commint-id} // 在某次提交的基础建立一个分支

### 删除分支

git branch -dr {remote} {branch} -- 本地的远程 fetch 缓存记录 并没有真的删除远程
git branch -D {branch}

git push --delete {remote} {branch} -- 真正删除远程分之

### 推送拉取

git push origin database:pp -- 把本地 database 推送到 origin/pp 没有则 创建 origin/pp
git pull origin pp:pp1 -- 把 origin/pp 拉取为 pp1 ,并合 pp 并到当前分之
git checkout origin/pp -- 拉取并切换到 pp

### 查看修改/分之对比

git diff HEAD -- <文件>
git diff master..otherBrach
git diff master..otherBrach 文件

### 取消修改

1. git checkout -- <文件>
2. git add . && git checkout -f // 撤销所有更改

### git checkout -f

## git 用户全局忽略文件

git config --global core.excludesfile ~/.gitignore_global
vim ~/.gitignore_global && echo '.vscode' // 当前用户 所有仓库 不会检查 设置的文件

## diff 文件对比

git diff // 工作区修改
git diff --staged // 暂存区修改

## checkout 切换版本/恢复

git checkout HEAD^ -- index.html / git checkout <指针^^commint 次数> <分之> 文件 //

## rebase Or merge

短平快的, 设计不广, 高内聚的, 功能模块, 使用 reabse 合并, 干净简洁

持续性的, 关联性的, 使用 merge 合并.

master: 开发主分支, 需要保证, 最新, 最全的代码.

release: 生产环境分支

merge: 准确的叫 merge into

git merge master
当前分支 合并到 master. 并生成一个 合并记录 commit.
以 master 为主, 将当前分支. 合并到 master, 并生成一个合并记录.
将当前分支的最后一个 commit 与 master 最后一个 commit 进行合并
产生的节点记录, 会有两个父节点
有冲突文件, 只需要合并一次, 冲突需要全部一起解决

rebase: 准确点叫 rebase into

git rebase master
当前分支 找到与 master 共同的节点. 变基到 master 上
当前分支 找到与 master 共同的节点. 以 master 为主, 在 master 基础上重建
可能会产生冲突, 需要多次解决, 重复操作, 直到没有冲突

## LOG

git log --oneline

git log --oneline -5 // 最近 5 次记录
git log --oneline --author='liuhaozhe' // 显示指定作者的提交
git log --grep='筛选搜索' // 筛选搜索 提交记录
git log --before='2019-01-19 | 1 week | 1 year | 3 days' // 日期筛选
git log --grep='筛选搜索' --graph // 图形显示
git log --oneline --all // 显示所有分之 提交记录
git log --oneline --decorate --all --graph -10

## revert

git revert {commitID} // 丢弃的 commitID 的提交 , 如果有 后面的提交 和 commitID 相关有关联 应该报错 或 是危险的

## reset

偏移 头部指针
git reset {模式 --mixed soft hard} {HEAD^}

git reset {模式 --mixed soft hard} {HEAD~1}

### 模式

--sort (软重置)

1. 更改指针 为 commitID, 将 commitID 之后的 修改 应用/添加到缓存区
2. 不影响工作区，不影响缓存区。 会把后面的 commit 的修改， 应用/添加到`缓存区`
   --mixed (默认)

3. 更改指针 为 commitID, 将 commitID 之后的 修改和 缓存区内容 应用/添加到`工作区`
4. 重置暂存区的的修改到 工作区 , 将后面的 commit 修改 应用到工作区 , 当行有修改 则不应用到当前行，以当前工作区修改为主
   --hard (硬重置) 直接重置 工作区与缓存区

## stash

git stash save '保存工作进度'
git stash list // 查看
git stash show -p stash@{0} //
git stash apply stash@{0} // 恢复工作进度
git stash drop stash@{0} // 删除工作进度
git stash pop stash@{0} // 恢复加删除

## tag

git tag // 查看 tag
git tag v0.0
git tag -a {commit | 空(HEAD)} -m '注释'
git show {vtag | HEAD | commit } // 文件详细
git tag -d vtag // 删除标签

## cherry-pick

https://www.ruanyifeng.com/blog/2020/04/git-cherry-pick.html

git switch A # cherry-pick into branch-A
git cherry-pick <HashA>
git cherry-pick <HashA> <HashB>
git cherry-pick <HashA>..<HashB> # A 将不会包含
git cherry-pick A^..B # 包含 A
git cherry-pick <Branch> # 转移最后一次 commit

## alias 别名

git config --global alias.co checkout
git config --global alias.graph "log --oneline --decorate --all --graph"

```config
[alias]
	st = status
	ss = status
	co = checkout
	gp = log --oneline --decorate --all --graph
	bc = branch
	br = branch
	sw = switch
	sc = switch
	fc = fetch
	zipout = archive --format zip --output
```

## WARNING: REMOTE HOST IDENTIFICATION HAS CHANGED!

清空 known_hosts
vi /home/\${USER}/.ssh/known_hosts

## 修改提交记录 --amend

git commit --amend --date="\$(date -R)" 修改最近一次时间
git commit --amend --date="2019-01-01T00:00:00+0800" -C edd2dbbe31fbab492f337628011119493a12a9c6

link:
https://blog.lindexi.com/post/git-修改commit日期为之前的日期.html
https://xkcoding.com/2019/01/21/modify-git-commit-timestamp.html

## SVN & GIT

LINK https://blog.csdn.net/u011511086/article/details/80351972
当前仓库配置有效 不会提交到远程
vim .git/info/exclude 忽略文件
alias gvnc="git add . && git commit --no-verify " -m'message' 提交不做验证 如 tslint 验证

## git count

git log --author="liuhaozhe" --pretty=tformat: --numstat | awk '{ add += $1; subs += $2; loc += $1 - $2 } END { printf "added lines: %s, removed lines: %s, total lines: %s\n", add, subs, loc }' -

## 删除历史历史和文件

https://www.cnblogs.com/shines77/p/3460274.html
https://www.cnblogs.com/mafeng/p/10959874.html

```bash
# 文件
git filter-branch --force --index-filter 'git rm --cached --ignore-unmatch path-to-your-remove-file' --prune-empty --tag-name-filter cat -- --all
# 文件夹
git filter-branch --force --index-filter 'git rm --cached -r --ignore-unmatch path-to-your-remove-file' --prune-empty --tag-name-filter cat -- --all
```

建议复制一份 项目, 再进行操作.

不小心添加了,一个文件夹, GIS 产品/\*

GIS*/* : 兼容中文的写法

git filter-branch --force --index-filter 'git rm --cached -r --ignore-unmatch GIS*/*' --prune-empty --tag-name-filter cat -- --all

rm -rf .git/refs/original/

git reflog expire --expire=now --all

git gc --prune=now

git gc --aggressive --prune=now

## sslVerify

全局设置
git config --global http.sslVerify false

局部仓库设置
git config http.sslVerify false

可以先全局设置, 然后移除, 再局部设置

## git bisect 二分法

git bisect start [endCommit] [startCommit]

git bisect good

git bisect bad

git bisect reset

## git hooks

背景: 使用 gitKraken 进行 commmit 速度非常慢.

无论是重装还是移除 husky, 都非常慢, 后来发现在新的电脑上没有这个问题.

可能的原因: npm 安装了 git hook 插件 会在 .git/hooks 创建相关 hook, 但是移除该 npm 插件后, 这些 hook 不会被删除

解决方案: 重新 clone 项目, 再进行 npm install 即可重置 hooks.

## GIT LFS

大文件存储

1. Git LFS 的使用
   https://www.zhangyangjun.com/post/git-lfs-usage.html

## git log 乱码

win

设置环境变量 LESS CHAR SET, 大写, 本次 cmd 有效

或者在我的电脑设置该环境变量就不用每次单独设置了

```bash
# 大写, 本次 cmd 有效
set LESSCHARSET=utf-8
```

git log 中文乱码 windows

https://blog.csdn.net/sheqianweilong/article/details/107830593

## git status 乱码

git config --global core.quotepath false

在使用 git log 出现乱码上面一个设置不能解决问题需要再做以下设置

git config --global gui.encoding utf-8

git config --global i18n.commit.encoding utf-8

git config --global i18n.logoutputencoding utf-8

export LESSCHARSET=utf-8 # 添加到环境变量

https://www.php.cn/tool/git/485156.html

## git fatal: detected dubious ownership in repository

不安全目录，文件夹权限问题，比如：重装系统

```bash
# 方式1
git config --global --add safe.directory E:/www/VoyageCar
# 方式2：命令行修改成管理员
takeown /F "E:\www\VoyageCar" /R /A
# 方式3：删除重新拉取
```

## github 加速

git config --global url."https://".insteadOf git://

https://blog.csdn.net/Scoful/article/details/124041645

https://github.com/PanJiaChen/vue-element-admin/issues/3491

```bash
 ERROR  Command failed with exit code 128: C:\Program Files\Git\cmd\git.EXE ls-remote --refs git+ssh://git@github.com/nhn/raphael.git 2.2.0-c
Connection reset by 20.205.243.166 port 22
fatal: Could not read from remote repository.

Please make sure you have the correct access rights
and the repository exists.
```

谷歌插件
https://chrome.google.com/webstore/detail/github%E5%8A%A0%E9%80%9F/ffjjnphohkfckeplcjflmgneebafggej

git ls-remote -h -t https://github.91chi.fun/https://github.com/nhn/raphael.git

# 相关资源

1. 国内下载地址
   https://github.com/waylau/git-for-win

2. GitHub DeskTop
   git 桌面工具: Simple collaboration from your desktop
   官网: https://desktop.github.com/
   linux 版 :https://github.com/shiftkey/desktop/releases

3. gitKraken
   重量级工具
   官网: https://www.gitkraken.com/

4. tortoisegit
   win 右键工具
   https://tortoisegit.org/download/
   下面有语言包

# 其他

1. github 状态
   https://www.githubstatus.com
2. git 代码统计
   https://segmentfault.com/a/1190000008542123

# 教程

git 是什么.

初始化仓库


git reset --hard origin/master && git stash apply


