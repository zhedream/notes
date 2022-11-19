```js
/**
 * 从Cookies中获取token
 *  */
function getCookie(key) {
  var strcookie = document.cookie; //获取cookie字符串
  var arrcookie = strcookie.split("; "); //分割
  //遍历匹配
  for (var i = 0; i < arrcookie.length; i++) {
    var arr = arrcookie[i].split("=");
    if (arr[0] == key) {
      return arr[1];
    }
  }
  return "";
}

function getTokenByCookie() {
  return getCookie("token");
}

getCookie("token");

/**
 * 从Url中获取token
 *
 */
function getTokenByUrl() {
  var token = GetQueryString("token");
  return token;
}

//获取url参数
function GetQueryString(name) {
  var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
  var r = window.location.search.substr(1).match(reg);
  if (r != null) return unescape(r[2]);
  return null;
}
```

## 参考

js 中获取 token 的函数
https://blog.csdn.net/qq602757739/article/details/83069310
