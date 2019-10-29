# COMPOSER
PHP 包管理工具
https://packagist.org/
https://pkg.phpcomposer.com/

## 全局设置
composer config -g repo.packagist composer https://packagist.phpcomposer.com

## 恢复默认
composer config -g --unset repos.packagist

## 项目设置
composer config repo.packagist composer https://packagist.phpcomposer.com

# 安装

win
```bash

# cd 到 php.exe 的同级目录 # where.exe php
php -r "copy('https://install.phpcomposer.com/installer', 'composer-setup.php');"
php composer-setup.php
php -r "unlink('composer-setup.php');"
echo @php "%~dp0composer.phar" %* > composer.bat 
# 或者手动新建 txt, 改为 composer.bat  写入 [ @php "%~dp0composer.phar" %* ] , 不包含 []

```

# 参考
1. 
https://pkg.phpcomposer.com/#how-to-install-composer