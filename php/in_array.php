<?php
/**
 * in_array() 存在效率问题, 解决办法
 */
$exist = ['as',4,'1','5',7,''];
$arr = [1,3,5,7,3,5,4,'','as'];

$exist = array_flip($exist); // 交换键值对
// var_dump($exist);
foreach ($arr as $value) {
    if(isset($exist[$value])){
        echo '$exist存在'.$value."\r\n";
    }else{
        echo '$exist不存在'.$value."\r\n";
    }
}
