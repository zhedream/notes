
# fetch 的使用

相关点 get, post, 文件上传, 上传进度

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

2. 踩坑篇--使用 fetch 上传文件 | 知乎-柳兮
https://zhuanlan.zhihu.com/p/34291688

3. fetch使用的常见问题及解决办法
https://www.cnblogs.com/wonyun/p/fetch_polyfill_timeout_jsonp_cookie_progress.html