
```js
fetch('https://restapi.amap.com/v3/ip?key=<yourkey>')
    .then(data => {
        let j = data.json();
        console.log(j); // pedding
        return j;
    })
    .then(json => {
        console.log(json); // json data
    }).catch(error => {
        console.log(error);
    })
```

# 参考

1. Using Fetch | MDN
https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch