<?php

/* 

情景: 时间分片 chunk
以 十分钟 为间隔 显示 数据,  时间间隔内有多个数据 保留最后一个

*/

$jiange = 600; // 秒为单位  10 分钟
$cinum = floor(strtotime($date . " " . $h_i_s) / $jiange); // 间隔
date("Y-m-d H:i:s", $cinum * $jiange);