# phpMyAdmin
## 下载
https://www.phpmyadmin.net
## 警告
1. tmp

```bash
mkdir tmp 
chmod 777 tmp
```
2. 配置文件现在需要一个短语密码。
vim config.sample.inc.php
vim libraries/config.default.php
$cfg['blowfish_secret'] = '12464324124652765765q23654378568'; // 随便填 32

