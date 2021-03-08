# sheetjs

读写表格

excel , xls, xlsx, csv

## 一些概念

workbook 对象，指的是整份 Excel 文档。我们在使用 js-xlsx 读取 Excel 文档之后就会获得 workbook 对象。
worksheet 对象，指的是 Excel 文档中的表。我们知道一份 Excel 文档中可以包含很多张表，而每张表对应的就是 worksheet 对象。
cell 对象，指的就是 worksheet 中的单元格，一个单元格就是一个 cell 对象。

## 基本用法

1. 用 XLSX.read 读取获取到的 Excel 数据，返回 workbook
2. 用 XLSX.readFile 打开 Excel 文件，返回 workbook
3. 用 workbook.SheetNames 获取表名
4. 用 workbook.Sheets[xxx] 通过表名获取表格
5. 用 worksheet[address]操作单元格
6. 用 XLSX.utils.sheet_to_json 针对单个表获取表格数据转换为 json 格式
7. 用 XLSX.writeFile(wb, 'output.xlsx')生成新的 Excel 文件

## 读取表格

xlsx to json

## 导出表格

xlsx.core.min.js

json to xlsx

```txt js
const openDownloadDialog = (url, saveName) => {
  if (typeof url == 'object' && url instanceof Blob) {
    url = URL.createObjectURL(url); // 创建blob地址
  }
  var aLink = document.createElement('a');
  aLink.href = url;
  aLink.download = saveName || ''; // HTML5新增的属性，指定保存文件名，可以不要后缀，注意，file:///模式下不会生效
  var event;
  if (window.MouseEvent) event = new MouseEvent('click');
  else {
    event = document.createEvent('MouseEvents');
    event.initMouseEvent('click', true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
  }
  aLink.dispatchEvent(event);
}
```

```js
const sheet2blob = (sheet, sheetName) => {
  sheetName = sheetName || "sheet1";
  var workbook = {
    SheetNames: [sheetName],
    Sheets: {},
  };
  workbook.Sheets[sheetName] = sheet;
  // 生成excel的配置项
  var wopts = {
    bookType: "xlsx", // 要生成的文件类型
    bookSST: false, // 是否生成Shared String Table，官方解释是，如果开启生成速度会下降，但在低版本IOS设备上有更好的兼容性
    type: "binary",
  };
  var wbout = XLSX.write(workbook, wopts);
  var blob = new Blob([s2ab(wbout)], { type: "application/octet-stream" });
  // 字符串转ArrayBuffer
  function s2ab(s) {
    var buf = new ArrayBuffer(s.length);
    var view = new Uint8Array(buf);
    for (var i = 0; i != s.length; ++i) view[i] = s.charCodeAt(i) & 0xff;
    return buf;
  }
  return blob;
};
var arr = [
  [1, 2, 3],
  [4, 5, 6],
];
const sheet = XLSX.utils.aoa_to_sheet(arr);
openDownloadDialog(sheet2blob(sheet), filename + ".xlsx");
```

## 相关的 js 概念

File , Blob ,arrayBuffer

## 资料

1. How to save .xlsx data to file as a blob
   https://stackoverflow.com/questions/34993292/how-to-save-xlsx-data-to-file-as-a-blob

1. Node 读写 Excel 文件探究实践
   https://aotu.io/notes/2016/04/07/node-excel/index.html

1. 如何使用 JavaScript 实现纯前端读取和导出 excel 文件
   https://www.cnblogs.com/liuxianan/p/js-excel.html
