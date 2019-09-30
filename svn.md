# SVN 基本使用
LINK 
 [参考LINK](https://blog.csdn.net/mengdong_zy/article/details/78271247)
 
svn checkout <url> // 拉代码  = git clone <url>
svn update  // 更新代码 = git pull

svn revert <path> //   恢复到未修改状态 = git checkout  <path>  

svn add <file> // 新增文件到 版本库

svn commit -m "message" <file> <file2> *.php  
// 更新到 版本库 ,  svn  没有缓存区 和 本地仓库的概念,只有工作区(工作副本),  是直接 把修改提交到 中央版本库 = git push , 所以没 有  git add . & git commit -m 'message' , SO 连不到 服务器的话, 就提交不了代码了.

svn log -l3 // 查看最近三条日志    =   git log -3 | -n3

# SVN + GIT 混合使用

公司用的版本控制 SVN,  之前就一直用的 git , 写代码的时候 一些 git 特性就没有了. 

总之 你就是想用 git 

混合使用的 生命周期

0. svn co path  & git init & git add . & git commit -m 'svn:init'
1. 编写代码  
    svn update    & git add . & git commit -m 'svn:版本号'  // 以SVN 为主  将svn 版本库 同步到 git 版本库
2. git 新建分之 B , 写代码. 提交
3.  svn 检查更新,  有更新,  git版本库 ,切换到 master  同步到 git 版本. 
4. git  将 B 合并到  master.  有冲突在  用 git 解决,
5. svn commit -m' 更新'.

## 忽略 .svn
仅对这个仓库有效果, 不会提交 git 远程
vim .git/info/exclude    
写入  .svns

## 周期2

1. svn update & gvnc -m ''  && gvnc -m'svn:493-wangsha:修改密码' // 更新 svn 版本库 , 合并好 git 版本库
2. git checkout -b pwd & 编写代码 & gvnc -m '' // git 创建新的分之 编写代码,提交 (git版本库)
3. git checkout master & svn update & gvnc -m '' // 回到 git 主支, 更新 svn 版本, 同步更新 到 git 版本库
4. git rebase | merge pwd & svn commit -m'' path // 合并 pwd 到 master  [ 解决冲突 ],  更新到svn 版本库  


## gvnc

--no-verify

项目 在 git 提交代码的时候, 会触发 代码检查,
公司用的 是 svn 就 直接 提交了, 所以在  git 提交 都要 加  这个参数 忽略检查

```bash
## 快速  将 svn 版本库  提交 进 git  ,    svn 更新后 或 提交代码
alias gvnc="git add . && git commit --no-verify "

```

## show log
win10
使用 TortoiseSVN 错误
show log 出错 | 或者链接服务器失败
there has been a problem contacting the server
出现的原因： 可能使用 svn 命令行，没用 TortoiseSVN 没数据

解决办法， 
1. 右键 -> TortoiseSVN -> setting ->  saved data   clear 都点清理一下
2. TortoiseSVN ->  Repo-browser |  Check for modifications | Revision graph

注意：
TortoiseSVN -> udpate 更新了代码
命令行 svn log -l3  是没有最新的记录的
所以说 命令行 svn 和 TortoiseSVN ，至少本地日志缓存是不共享的
版本是 svn status  是一致的