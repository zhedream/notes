# Array,Set,Map,Object 的对比

结构  优缺点  适用范围

## Array: 
有序的, 有关排序的用 Array

## Set 
无序, 唯一. 数组去重, 判断存在, 场景: 日历中有任务的日期加个红点

## Object
键必须是单一类型
Object并不会保证属性的顺序

## Map
Map 继承与 Object.
有序? 顺序插入, key可以为任意数据类型.
Vue的key 就能使用 对象, 相关的数据应该使用的Map.
可查找存储结构时，Map相比Object更具优势

# 参考

1. 【译】Object与Map的异同及使用场景 | 掘金-EniviaQ
https://juejin.im/post/5c7f6251f265da2dce1f68d3

2. javaScript (js) 中object,map,set,array关键对比 | 思否-jsure
https://segmentfault.com/a/1190000015267259