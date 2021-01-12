<?php

/* 

php -S 0.0.0.0:1111 -t ./

情景: 时间分片 chunk
以 十分钟 为间隔 显示 数据,  时间间隔内有多个数据 保留最后一个,或取平均值 等处理

*/


/**
 * 给定时间, 以时间间隔 向下取整 返回规整时间
 * @param string $time 时间 - Y-m-d H:i:s 如: 2019-10-25 12:05:03
 * @param int $jiange 单位(秒)
 * @return string 规整后的时间 - Y-m-d H:i:s
 * @example : getTimeFloor('2019-10-25 12:05:03') : 2019-10-25 12:05:00
 */
function getTimeFloor( $time,  $jiange = 5, $offset = 0)
{
  $count = floor(strtotime($time) / $jiange+$offset); // 间隔
  return date("Y-m-d H:i:s", $count * $jiange + $offset); //. '<br/>' . "\r\n";
}

// echo getTimeFloor('2019-10-25 12:05:03');
// echo getTimeFloor('2019-10-25 12:05:04');
// echo getTimeFloor('2019-10-25 12:05:05');
// echo getTimeFloor('2019-10-25 12:05:06');
// echo getTimeFloor('2019-10-25 12:05:07');
// echo getTimeFloor('2019-10-25 12:05:09');

$arr = [
  ['time' => '2019-10-25 12:05:03', 'name' => 'lise'],
  ['time' => '2019-10-25 12:05:04', 'name' => 'lise'],
  ['time' => '2019-10-25 12:05:05', 'name' => 'lise'],
  ['time' => '2019-10-25 12:05:06', 'name' => 'lise'],
  ['time' => '2019-10-25 12:05:07', 'name' => 'lise'],
  ['time' => '2019-10-25 12:05:09', 'name' => 'lise'],
];

$timeMap = [];

foreach ($arr as $key => $value) {
  $key = getTimeFloor($value['time'],5,4);
  if (!$timeMap[$key]) {
    $timeMap[$key] = [];
    array_push($timeMap[$key], $value);
  } else {
    array_push($timeMap[$key], $value);
  }
}

echo  json_encode($timeMap);
