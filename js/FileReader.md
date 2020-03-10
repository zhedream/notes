# FileReader

readAsDataURL 方法会读取指定的 Blob 或 File 对象。读取操作完成的时候，readyState 会变成已完成DONE，并触发 loadend 事件，同时 result 属性将包含一个data:URL格式的字符串（base64编码）以表示所读取文件的内容。

## 应用


一次项目种, 做文件上传, 开始直接上传二进制文件, 后台不用, 直接传字符串.
使用后记录一下, 虽然不知道后台怎么处理的.


```js

const values = {};
const reader = new FileReader();
reader.readAsDataURL(this.File); // 读取文件
reader.addEventListener("load", () => {
    values.DateTime = moment(values.DateTime).format(
        "YYYY-MM-DD HH:mm:ss"
    );
    values.filename = this.File.name;
    values.filestream = reader.result; // 文件 Base 64 String
    console.log("Received values of form: ", values);
    // let data = new FormData();
    // Object.keys(values).forEach(key => {
    //   data.append(key, values[key]);
    //   console.log(key, values[key]);
    // });
    // console.log(data);
    UploadFile(values).then(({ data }) => {
        let { requstresult, reason } = data;
        if (requstresult == "1") {
        this.$message.success("上传成功");
        } else {
        this.$message.warn("上传失败: " + `${reason}`);
        }
        console.log(e);
    });
});


```