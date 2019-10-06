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