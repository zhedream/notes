# Array,Set,Map,Object 的对比

结构  优缺点  适用范围

## Array: 
有序的, 有关排序的用 Array

```js
arr = [...new Set(arr)]; // 数组去重


let text = 'India';
let mySet = new Set(text);  // Set {'I', 'n', 'd', 'i', 'a'}
mySet.size;  // 5

```



## Set 
无序, 唯一. 数组去重, 判断存在, 场景: 日历中有任务的日期加个红点

```js
let set = new Set([]);
// 是否 全集
function isSuperset(set, subset) {
    for (let elem of subset) {
        if (!set.has(elem)) {
            return false;
        }
    }
    return true;
}
// 并集
function union(setA, setB) {
    let _union = new Set(setA);
    for (let elem of setB) {
        _union.add(elem);
    }
    return _union;
}
// 交集, A,B 都有的
function intersection(setA, setB) {
    let _intersection = new Set();
    for (let elem of setB) {
        if (setA.has(elem)) {
            _intersection.add(elem);
        }
    }
    return _intersection;
}

// 对称性差集, A,B交集的补集
function symmetricDifference(setA, setB) {
    let _difference = new Set(setA);
    for (let elem of setB) {
        if (_difference.has(elem)) {
            _difference.delete(elem);
        } else {
            _difference.add(elem);
        }
    }
    return _difference;
}
// 差集, A 对 B 的差集, A 有 B 没有
function difference(setA, setB) {
    let _difference = new Set(setA);
    for (let elem of setB) {
        _difference.delete(elem);
    }
    return _difference;
}

```

## Object
键必须是单一类型
Object并不会保证属性的顺序

## Map
Map 继承与 Object.
有序? 顺序插入, key可以为任意数据类型.
Vue的key 就能使用 对象, 相关的数据应该使用的Map.
可查找存储结构时，Map相比Object更具优势

let map = new Map([
    [key,val],
    [key,val],
])

# 参考

1. 【译】Object与Map的异同及使用场景 | 掘金-EniviaQ
https://juejin.im/post/5c7f6251f265da2dce1f68d3

2. javaScript (js) 中object,map,set,array关键对比 | 思否-jsure
https://segmentfault.com/a/1190000015267259