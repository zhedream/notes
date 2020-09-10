# Jquery 的 Ajax

https://www.runoob.com/jquery/ajax-get.html

https://www.runoob.com/jquery/ajax-post.html

https://www.runoob.com/jquery/ajax-getjson.html

静态资源不能使用 post 方式请求
https://blog.csdn.net/guo_qiangqiang/article/details/90177327

HTTP 请求中 request payload 和 formData 区别？

1. https://www.cnblogs.com/tugenhua0707/p/8975615.html
2. https://segmentfault.com/a/1190000018774494

```js
$.ajaxSettings.async = false;
// some ajax
$.ajaxSettings.async = true;

$.getJSON(
  "/data.json",
  // {id:''}, // 参数可以忽略
  function (data) {
    this.data = data;
  }.bind(this)
);

$.post("demo_ajax_gethint.html", { suggest: txt }, function (result) {
  $("span").html(result);
});
$.get("demo_ajax_gethint.html", { suggest: txt }, function (result) {
  $("span").html(result);
});
```

```js
const data = new FormData();
data.append("asd", "asdf"); // key:value|Blob , 文件上传
$.ajax({
  url: "/development/page/department/bumenData.json",
  async: true, // 请求是否异步处理，默认true
  type: "post",
  dataType: "json",
  contentType: false,
  processData: false,
  data: data,
  success: function (e) {
    console.log(e);
  },
});
$.ajax({
  url: "/development/page/department/bumenData.json",
  async: true, // 请求是否异步处理，默认true
  type: "post",
  dataType: "application/json",
  contentType: false,
  processData: false,
  data: JSON.stringify({}),
  success: function (e) {
    console.log(e);
  },
});
```

```js jq.ajax
$.ajax({
  url: "xxx", // 请求地址
  type: "post", // 请求方式（post或get），默认get
  timeout: 2000, // 请求超时时间,毫秒
  async: true, // 请求是否异步处理，默认true
  data: formData, // 发送到服务器的数据
  dataType: "json", // 预期服务器返回的数据类型，包括xml,html,script,json,jsonp,text
  cache: false, // 浏览器是否缓存被请求页面，默认为true

  /*
   *  contentType 是发送给服务器的格式
   *  "application/x-www-form-urlencoded",默认（格式特点key和value为一组，组间用&连接）
   *  "application/json"，适合复杂的json数据，用JSON.stringfy序列化后发送，服务端再JSON.parse进行还原
   *  false，会自动加上正确的Content-Type(比如form标签中设置了enctype="multipart/form-data",请求中的contentType就会默认为multipart/form-data)
   */

  contentType: "application/json",

  processData: false, // 请求发送的数据是否转换为查询字符串，默认true，（设置为false，因为data值是FormData对象，避免FormData对象被转换成URL编码。）
  context: { some: "value" }, // 为所有 AJAX 相关的回调函数规定 "this" 值。
  username: "username", // 响应HTTP访问认证请求的用户名
  password: "password", // 响应HTTP访问认证请求的密码
  global: true, // 默认是 true，是否为请求触发全局 AJAX 事件处理程序。
  ifModified: false, // 默认是 false。是否仅在服务器数据改变时获取数据。使用HTTP包Last-Modified头信息判断。

  /*
   *  traditional参数，是否使用参数序列化的传统样式，默认是 false，jquery会深度序列化参数对象。
   *  设置为true阻止深度序列化，后台通过request.getParameterValues()来获取参数的值数组
   */
  traditional: false,

  beforeSend: function (xhr) {
    // 发送请求前运行的函数
    // 禁用按钮防止重复提交
    $("#submit").attr({ disabled: "disabled" });
  },
  success: function (data) {
    //成功回调
    console.log(data);
    console.log(this.some); // 'value'
  },
  error: function (xhr, status, err) {
    //失败回调
  },
  complete: function (xhr, status) {
    // 请求完成回调

    if (status == "timeout") {
      ajaxTimeOut.abort(); //取消请求

      alert("超时");
    }
  },
});
```

```js
jQuery.extend({
  $post: function ({ url, data, successInfo = false, errorInfo = "操作失败" }) {
    return new Promise(function (resolve, reject) {
      jQuery.ajax({
        url: url,
        type: "post",
        contentType: "application/json",
        data: JSON.stringify(data),
        success: (e) => resolve(e) || (successInfo && vm.success(successInfo)),
        error: (e) => reject(e) || (errorInfo && vm.error(errorInfo)),
        beforeSend: () => Loading(),
        complete: () => CloseLoading(),
      });
    });
  },
});
```

## 全局配置

jQuery ajax 设置全局配置
https://blog.csdn.net/yezitoo/article/details/89461616

https://blog.csdn.net/qq_30930805/article/details/74294484

```js
$.ajaxSetup({
  dataType: "json",
  async: true,
  xhrFields: {
    withCredentials: true,
  },
  crossDomain: true,
});
```

默认: contentType: "application/x-www-form-urlencoded"
常用: contentType: "application/json"  
每次请求设置 很麻烦, 就可以全局配置
