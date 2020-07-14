# COMPOSER

PHP 包管理工具
https://packagist.org/
https://pkg.phpcomposer.com/

## 全局设置

composer config -gl 查看配置


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

## php copy(): SSL operation

```ini php.ini
;1. 打开扩展
extension=openssl
;2. 配置证书
;下载 http://curl.haxx.se/ca/cacert.pem
openssl.cafile=cacert.pem

```

# 参考

1. 安装
   https://pkg.phpcomposer.com/#how-to-install-composer
2. php copy(): SSL operation failed SSL 证书
   https://www.cnblogs.com/zpsong/p/7465182.html
