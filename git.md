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
