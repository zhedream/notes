## error_get_last
获取 最后一次错误日志
    if (!@mkdir($filepath . "/aa")) {
        $error = error_get_last();
        echo $error['message'];
    }

## 扩展

sudo apt install php-curl
