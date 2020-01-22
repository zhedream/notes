```js
fetch('https://restapi.amap.com/v3/ip?key=<yourkey>')
    .then(data => {
        let j = data.json();
        console.log(j);
        return j;
    })
    .then(json => {
        console.log(json);
    })
```
# 参考

1. IP定位
https://lbs.amap.com/api/webservice/guide/api/ipconfig

