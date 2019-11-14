##  推送分支

https://www.cnblogs.com/bbm7/p/7308765.html
git push 仓库 分支
git push origin-coding redo
git push orgin vtag
git push --tags // 推送标签

## 导出

git archive --format zip --output "./output.zip" master -0

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
```
**用户秘钥**
  把查看的秘钥 在用户设置-> SSH 
**仓库秘钥**
  仓库 <=>  用户 <=>  用户秘钥
  仓库 <=> 仓库秘钥
  所以最好不要添加 仓库秘钥

**使用**
 把地址改成 SSH 的即可 
 不用输入账户密码

## 忽略已提交文件

取消跟踪已经commit 的文件
添加到忽略文件
一:  删除
git rm -r --cached .
git add .
OR
git rm  --cached prisma/src/generated/prisma.graphql
git commit
以上的网上的都是坑，或许是版本的不同
有效方法
git rm prisma/src/generated/prisma.graphql
添加忽略
git commit

## 分支

### 重命名
git branch -m old new

### 切换分支
git checkout {branch}
git checkout -b {newBranch} // 创建并且换到 新的分支
git checkout -b {newBranch} {commint-id} // 在某次提交的基础建立一个分支

### 删除分支

git branch -dr {remote} {branch}  -- 本地的远程 fetch 缓存记录 并没有真的删除远程
git branch -d {branch}

git push --delete {remote} {branch} -- 真正删除远程分之

### 推送拉取

git push origin database:pp -- 把本地 database 推送到 origin/pp  没有则 创建 origin/pp
git pull origin pp:pp1 -- 把 origin/pp 拉取为 pp1 ,并合pp并到当前分之
git checkout origin/pp -- 拉取并切换到 pp

### 查看修改/分之对比
git diff HEAD -- <文件>
git diff master..otherBrach
git diff master..otherBrach 文件

### 取消修改
1. git checkout -- <文件>
2. git add . && git checkout -f  // 撤销所有更改
### git checkout -f

## git 用户全局忽略文件
git config --global core.excludesfile ~/.gitignore_global
vim ~/.gitignore_global && echo '.vscode' // 当前用户 所有仓库 不会检查 设置的文件

## CHECKCOUT
git diff   // 工作区修改
git diff --staged   // 暂存区修改

## checkout
git checkout HEAD^ -- index.html  / git checkout <指针^^commint次数> <分之> 文件  //  

## LOG

## git log --oneline
git log --oneline -5 // 最近5 次记录
git log --oneline --author='liuhaozhe' // 显示指定作者的提交
git log --grep='筛选搜索' // 筛选搜索 提交记录  
git log --before='2019-01-19 | 1 week | 1 year | 3 days' // 日期筛选  
git log --grep='筛选搜索' --grap  // 图形显示  
git log --oneline --all  // 显示所有分之 提交记录  
git log --oneline --decorate  --all --graph -10
## revert 
git revert {commitID} // 丢弃的commitID 的提交  , 如果有 后面的提交 和 commitID 相关有关联  应该报错 或 是危险的

## reset 
偏移 头部指针
git resety {模式}
### 模式
--sort  (软重置) 
1. 更改指针 为 commitID, 将commitID之后的 修改 应用/添加到缓存区
2. 不影响工作区，不影响缓存区。 会把后面的 commit 的修改， 应用/添加到`缓存区`
--mixed (默认) 
1. 更改指针 为 commitID, 将commitID之后的 修改和 缓存区内容 应用/添加到`工作区`
2. 重置暂存区的的修改到 工作区 , 将后面的 commit 修改 应用到工作区 ,  当行有修改 则不应用到当前行，以当前工作区修改为主
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
git tag  v0.0 
git tag -a {commit | 空(HEAD)} -m '注释'
git show {vtag | HEAD | commit } // 文件详细
git tag -d vtag // 删除标签

## WARNING: REMOTE HOST IDENTIFICATION HAS CHANGED!
清空 known_hosts 
vi /home/${USER}/.ssh/known_hosts

## SVN & GIT
LINK https://blog.csdn.net/u011511086/article/details/80351972
当前仓库配置有效 不会提交到远程
vim .git/info/exclude    忽略文件
alias gvnc="git add . && git commit --no-verify "       -m'message'      提交不做验证   如  tslint 验证

# 相关资源

1. 国内下载地址
https://github.com/waylau/git-for-win

2. GitHub DeskTop
git 桌面工具: Simple collaboration from your desktop
官网: https://desktop.github.com/
linux版 :https://github.com/shiftkey/desktop/releases

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