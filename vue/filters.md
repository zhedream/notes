```js


 filters: {
    /**
     * 管道 保留几位小数
     * @param number 原始值
     * @param num 保留位数
     * 使用 {{ number | keepDecimal(2) }} 将会保留两位小数
     */
    keepDecimal: function(number, num) {
      if (!number) return "";
      let len = Math.pow(10, num);
      return Math.round(number * len) / len;
    },
    subStr: function(str, start, end) {
      if (!str) return "";
      return str.substring(start,end); // [start,end)
    }
    
}


```
