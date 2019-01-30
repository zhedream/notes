##  推送分支

https://www.cnblogs.com/bbm7/p/7308765.html
git push 仓库 分支
git push origin-coding redo

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

### 删除分支

git branch -dr {remote} {branch}  -- 本地的远程 fetch 缓存记录 并没有真的删除远程
git branch -d {branch}

git push --delete {remote} {branch} -- 真正删除远程分之

### 推送拉取

git push origin database:pp -- 把本地 database 推送到 origin/pp  没有则 创建 origin/pp
git pull origin pp:pp1 -- 把 origin/pp 拉取为 pp1 ,并合pp并到当前分之
git checkout origin/pp -- 拉取并切换到 pp
