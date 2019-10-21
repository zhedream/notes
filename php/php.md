## error_get_last
获取 最后一次错误日志
    if (!@mkdir($filepath . "/aa")) {
        $error = error_get_last();
        echo $error['message'];
    }

## 扩展

sudo apt install php-curl

## 打开报错提示
ini_set("display_errors", "On"); 
error_reporting(E_ALL | E_STRICT);

## php-debugbar
https://github.com/maximebf/php-debugbar

## ltrace -c

## 等待时间
set_time_limit(150);

## 立即输出

header('X-Accel-Buffering: no');
ob_end_flush();
ob_implicit_flush(1);

## opcache
link: https://www.zybuluo.com/phper/note/1016714

## PHP性能优化
https://i6448038.github.io/2017/08/13/PHP性能优化

# VScode Debug

1. vscode 插件
PHP Debug , 调式必备
PHP IntelliSense , 语言服务 智能提示
PHP Intelephense , 格式化

1. 导出php环境配置到 a.txt
php -i > a.txt

2. 官网分析下载对应版本 debug.dll 
https://xdebug.org/wizard

3. 基本配置
更多配置自行百度 `xdebug配置`
```php.ini
[xdebug]
zend_extension = D:\Visual-NMP-x64\Bin\PHP\php-7.3.0-nts-x64\ext\php_xdebug-2.7.2-7.3-vc15-nts-x86_64.dll
xdebug.profiler_output_dir = "D:/Visual-NMP-x64/tmp"
xdebug.trace_output_dir = "D:/Visual-NMP-x64/tmp"
xdebug.remote_enable = on
xdebug.remote_autostart = on
```

# ubuntu

sudo apt install php-xdebug

vim /etc/php/7.2/mods-available/xdebug.ini
```
xdebug.remote_enable = on
xdebug.remote_autostart = on
```


## 使用

vscode -> 菜单 调试 添加配置 选择php

默认生成 两个调试 模式
Listen for XDebug , 用于 http 请求调试
Launch currently open script , 用于本地脚本调试
