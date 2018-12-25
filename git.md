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