# iview 组件使用

## 标签

https://www.iviewui.com/docs/guide/iview-loader

## button

```html
<button type="primary">Primary</button>
<i-button type="primary">Primary</i-button>
```

## Input

type: text、password、textarea、url、email、date、number、tel

'i-input': 'Input'

```html
<i-input
  v-model="value"
  placeholder="Enter something..."
  style="width: 300px"
  clearable
  disabled
></i-input>
```

## DatePicker 时间选择

https://www.iviewui.com/components/date-picker

type: 显示类型，可选值为 date ,daterange ,datetime ,datetimerange ,year ,month

value: JavaScript 的 Date , 或 [Date,date]

format: yyyy-MM-dd HH:mm

multiple: date 可以多选

split-panels: 左右面板不联动 daterange, datetimerange

没有自定义: 渲染

```js
const options = {
  disabledDate(date) {
    return date && date.valueOf() > Date.now();
  },
};
```

```html
<Date-Picker
  @on-change
  type="datetimerange"
  placeholder="请选择创建时间"
  style="width: 300px"
></Date-Picker>

<Date-Picker
  v-model="searchData.DateTime"
  type="datetimerange"
  placeholder="选择时间"
  format="yyyy-MM-dd HH:mm"
  style="width: 70%"
  clearable
>
</Date-Picker>
```

## select 选择器

https://www.iviewui.com/components/select

filterable 的坑: this.$refs.select.setQuery(null)
https://www.cnblogs.com/victory820/p/10145485.html

```html
<i-Select
  v-model=""
  @on-change=""
  @on-open-change=""
  placeholder=""
  multiple
  clearable
  filterable
  transfer
>
  <template v-for="e in FK_PointGroup">
    <i-Option :label="e.label" :value="e.value" :key="e.value"></i-Option>
  </template>
</i-Select>
```

需要注意的 坑:

1. 多选的时候,

option label 不能由空格回车, 不然显示会有问题

v-model 的值 和 option 是全等匹配 === , item 和 placeholder 都会 display:none
v-model [1,3,4] 和 option ['1','2','3'] 匹配不上 没有 item,
v-model [1,3,4] 非空, placeholder display:none
会导致 选择框 塌陷

## table

http://v2.iviewui.com/components/table

```html
<i-table
  ref="iviewTable"
  row-key="bumenID"
  @on-selection-change="handleSelect"
  :span-method="handleSpan2"
  :row-class-name=""
  :columns="columns"
  :data="data"
  class="box"
  highlight-row
  stripe
  border
>
  <template slot-scope="{row,index,column}" slot="action">
    <i-Button title="编辑" size="small" @click="edit(row,index)">
      <i-icon type="edit"></i-icon>
    </i-Button>
    <Poptip
      confirm
      transfer
      title="确定删除吗？"
      @on-ok="del(row)"
      @on-cancel=""
    >
      <i-button size="small">
        <Icon type="android-delete"></Icon>
      </i-button>
    </Poptip>
  </template>
</i-table>
```

要点:

1. 固定头部, x 轴-长表头, 动态表头
2. 自定义渲染, 数据/按钮
3. 合并单元格
4. 高度自适应
5. 导出表格

```js
// iview table 导出csv文件错行问题
// https://blog.csdn.net/qq_29832217/article/details/100767745
// 字符串转义
const handle = function (str) {
  let handleStr = str.replace(/[\r\n]/g, "");
  //先判断字符里是否含有逗号
  if (str.indexOf(",") != -1) {
    //如果还有双引号，先将双引号转义，避免两边加了双引号后转义错误
    if (str.indexOf('"') != -1) {
      handleStr = str.replace('"', '""');
    }
    //将逗号转义
    handleStr = '"' + handleStr + '"';
    return handleStr;
  }
  return '"' + handleStr + '"';
};
data.forEach((e) => {
  Object.keys(e).forEach((a) => {
    if (typeof e[a] == "string") e[a] = handle(e[a]);
  });
});

this.$refs["iviewTable"].exportCsv({
  filename: "部门数据",
  // columns: this.columns
  // data: this.data
});
// iview  行选中状态, 是单向数据流, 不是双向绑定, 需要手动修改 表格数据 @on-selection-change
function handleSelect(rows) {
  let set = new Set();
  rows.forEach((row) => {
    set.add(row.PollutantCode);
  });
  // 更新数据 状态
  this.dataTable.forEach((row) => {
    if (set.has(row.PollutantCode)) {
      Object.assign(row, { _checked: true });
    } else {
      Object.assign(row, { _checked: false });
    }
  });
}

// 表格多选与搜索的问题
// 空格多选 显示选中 高亮
// +下拉树 勾选 搜索

var refresh_temp = {
  props: ["data", "columns3"],
  template:
    '<div id="divTable"><i-table  border v-bind:columns="columns3"  v-bind:data="data"></i-table></div>',
};
const columns = [
  { title: "序号", type: "index", fixed: "left", align: "center" }, // type: index expand selection
  { title: "部门名称", key: "bumenName", tree: true },
  {
    title: "创建人",
    key: "createUser",
    render: (h, params) => {
      const { row, index, column } = params;
      return h(
        "span",
        {
          props: {
            style: "color:red;",
          },
        },
        row.createUser
      );
    },
    // render: (h, params) => {
    //   this.size();
    //   return h(refresh_temp, {
    //     props: {
    //       data: params.row.detail,
    //       columns3: vmFeedback.columns3,
    //     },
    //   });
    // },
  },
  { title: "操作", slot: "action", width: 200, align: "center" },
  { title: " ", align: "center" }, // 占位
];

if (columns.length <= 8) columns[0]["fixed"] = "";

const rowClassName = (row, index) => {
  if (index === 1) {
    return "demo-table-info-row";
  } else if (index === 3) {
    return "demo-table-error-row";
  }
  return "";
};
let data = [
  {
    name: "名字",
    age: "18",
    cellClassName: {
      // cellClassName, iview table 关键字
      key1: "selected",
      key2: "selected2",
    },
  },
];
```

### fixed 坑

尽量不要使用 fixed

使用了 fixed-left 发现 table 插槽某个组件, watch 打印了 两次的问题.

使用 fixed body 会有冗余组件,fixed-right 和 fixed-left 各冗余一次
插槽内使用 组件时 , 某个事件 change 可能多打印了一次

### 自适应高度和滚动条

固定 数据行, 无数据提示 高度

```less
.main {
  display: flex;
  flex-direction: column;
  height: calc(100vh - 60px);
}
/* 容器 */
.main > :nth-child(4) {
  flex: 1;
  overflow: hidden;
}
.container {
  // height: calc(100vh - 200px);
  flex: 1;
  overflow: auto;
}
/* 表格 div */
.box {
  height: 100%;
}
/* 高度 */
.box .ivu-table-tip,
.box .ivu-table-body,
.box .ivu-table-fixed-body {
  /* height: calc(100vh - 315px); */
  height: calc(100% - 42px);
}
/* 显示滚动条 */
.box .ivu-table-tip,
.box .ivu-table-body {
  overflow: auto;
}
/* fixed 遮挡滚动条X */
.box .ivu-table-fixed {
  height: calc(100% - 8px);
}

.box .ivu-table-fixed-right {
  right: 6px !important;
}

/* 滚动条 start */
.box .ivu-table-tip::-webkit-scrollbar,
.box .ivu-table-body::-webkit-scrollbar {
  width: 6px;
  height: 6px;
  background-color: #f5f5f5;
}

/*定义滚动条轨道 内阴影+圆角*/
.box .ivu-table-tip::-webkit-scrollbar-track,
.box .ivu-table-body::-webkit-scrollbar-track {
  box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
  border-radius: 10px;
  background-color: #f5f5f5;
}

/*定义滑块 内阴影+圆角*/
.box .ivu-table-tip::-webkit-scrollbar-thumb,
.box .ivu-table-body::-webkit-scrollbar-thumb {
  border-radius: 10px;
  box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
  background-color: #555;
}
```

### 表格内编辑

### 表格样式 暗色

```html
<!-- 暗色 表格 主题 -->
<style>
  /* .dark-table {} */

  .dark-table .ivu-table:before,
  .dark-table .ivu-table:after {
    background-color: #656c74;
  }

  /* 表头 */
  .dark-table .ivu-table th {
    background-color: #148d97;
    color: #fff;
    height: 32px;
  }

  /* body */
  .dark-table .ivu-table td {
    /* 背景色 */
    background-color: #3e485a;
    /* 字体色 */
    color: #a5abb0;
  }

  /* highlight-row hover */
  .white-table .ivu-table .ivu-table-row-highlight td,
  .white-table .ivu-table .ivu-table-row-hover td {
    background-color: #ebf7ff;
  }

  .dark-table .ivu-table td,
  .dark-table .ivu-table th {
    /* 边色 */
    border-bottom: 1px solid #656c74;
  }

  /* fixed 样式 */
  .dark-table .ivu-table-fixed {
    left: 1px;
  }

  .dark-table .ivu-table-fixed-right::before,
  .dark-table .ivu-table-fixed::before {
    /* 背景色 */
    background-color: #3e485a;
  }

  .dark-table.ivu-table-wrapper {
    border: none;
  }

  .dark-table .ivu-table,
  .dark-table .ivu-table-body {
    border-color: #656c74;
    /* 背景色 */
    background-color: #3e485a;
  }
</style>
```

## 分页 page

https://www.iviewui.com/components/table

```js
let page = {
  total: 0,
  pageIndex: 1,
  pageSize: 10,
  pageSizeRange: [10, 20, 50, 100],
  pageSizeRange: [50, 100, 300, 500],
};

function pageData1() {
  const pageIndex = this.page.pageIndex;
  const pageSize = this.page.pageSize;
  const data = this.data1;
  return $.paginationFromArray(pageIndex, pageSize, data);
}
```

接口分页 page.total, 本地分页 data.length

<Page :total="page.total"current="page.pageIndex"
:page-size="page.pageSize" show-sizer show-total
:page-size-opts="page.pageSizeRange" @on-change="pageChange"
@on-page-size-change="pageSizeChange" placement="top"></Page>

<Page :total="page.total" :current="page.pageIndex"
:page-size="page.pageSize" show-sizer show-total
:page-size-opts="page.pageSizeRange" @on-change="page.pageIndex=$event"
@on-page-size-change="page.pageSize=$event;page.pageIndex=1" placement="top"></Page>

## tabs 标签页

http://v2.iviewui.com/components/tabs

```html
<tabs value="name1">
  <tab-pane label="label1" name="label1">label1</tab-pane>
  <tab-pane label="label2" name="label2">label2</tab-pane>
</tabs>
```

##

## Modal

http://v2.iviewui.com/components/modal#API

```html
<i-Modal
  @on-ok="ok"
  @on-cancel="cancel"
  @on-visible-change="visibleChange"
  v-model="visible"
  :mask-closable="false"
  :closable="false"
  :title="'标题'"
  width="800"
  footer-hide
>
  <div slot="footer">
    <i-Button type="default" @click="warnEditCancel">取消</i-Button>
    <i-Button type="primary" @click="warnAddEditOK">确定</i-Button>
  </div>
</i-Modal>
```

坑: @on-ok 会关闭弹框, :value , 也不行. 解决: 使用插槽 footer

## Transfer

http://v2.iviewui.com/components/transfer#API

```html
<i-Transfer
  :filter-method=""
  :titles="['源列表','目标列表']"
  :data="bindUserData"
  :target-keys="bindUserTargetKeys"
  :list-style="{width: '250px',height: '300px'}"
  :render-format="bindUserRender"
  :operations="['加入','移除']"
  filterable
  @on-change="bindUserChange"
>
</i-Transfer>
```

```html

```

## form 表单

```html
<Modal footer-hide v-model="modalShow" :title="title" width="700">
  <i-form
    v-if="modalShow"
    ref="form"
    :model="formData"
    :rules="rules"
    :label-width="100"
    inline
  >
    <!-- 中文名称/因子编号 -->
    <row>
      <i-col span="12">
        <Form-Item label="中文名称：" prop="Describe">
          <i-Input
            v-model.trim="formData.Describe"
            placeholder="请输入中文名称"
          />
        </Form-Item>
      </i-col>
      <i-col span="12">
        <row>
          <i-col span="17">
            <Form-Item label="因子编号：" prop="PollutantCode">
              <i-Input
                v-model.trim="formData.PollutantCode"
                placeholder="请输入因子编号"
              />
            </Form-Item>
          </i-col>
          <i-col span="5" offset="1">
            <i-button>查询编码</i-button>
          </i-col>
        </row>
      </i-col>
    </row>
    <row>
      <i-col span="9" offset="15" style="text-align: right;">
        <i-Button type="primary" @click="formSubmit">确定</i-Button>
        <i-Button type="default" @click="formReset" style="margin-left: 5px;"
          >重置</i-Button
        >
        <i-Button type="default" @click="formCancel" style="margin-left: 5px;">
          取消
        </i-Button>
      </i-col>
    </row>
  </i-form>
</Modal>
<!-- 
  v-if="modalShow" resetFields 必须新实例才能正确 重置表单. 引用,缓存. 可能导致原数据为空
 -->
```

## 表单验证问题

https://github.com/yiminghe/async-validator/issues/182#issuecomment-741485886

input 框, 非必选, 数据为 数值类型, 但不通过验证. 可能是 组件或库的 bug

解决办法:

1. type:string 转成 字符串 + v-model.trim
2. type:number 空为 0 + v-model.number
3. type:any input number 限制数据数值. (新版库才支持)

异步校验: https://github.com/yiminghe/async-validator

校验类型 https://github.com/yiminghe/async-validator#type

type: string number boolean method integer float array object url hex email any

```js
let defaultFormModel = {
  name: "", // 姓名
  age: "", // 年龄
  user: {
    name: "",
    age: "",
  },
};
const validateArrayLeast =
  (message, limitCount = 1) =>
  (rule, value, callback) => {
    const msg = message ? message : "至少选择".concat(limitCount).concat("项");
    if (!value || value.length < limitCount) return callback(new Error(msg));
    else callback();
  };
const validatePollutant = validateArrayLeast("至少选择1项 XX", 1);

let defaultFormRules = {
  AlarmType: [{ required: true, message: "请输入xxx", trigger: "change" }],
  Num: [
    { required: true, type: "integer", message: "请选择", trigger: "change" },
  ],
  repwd: [
    {
      validator: function (rule, value, callback) {
        if (value === "") {
          callback(new Error("必填项!"));
        } else if (value !== this.formData["pwd"]) {
          callback(new Error("两次密码不匹配!"));
        } else {
          callback();
        }
      },
      trigger: "change",
    },
  ],
  "obj.name": [{ required: true, message: "请输xxx", trigger: "change" }], // 对象嵌套 验证
  "obj.arr": [
    {
      required: true,
      validator: validateArr,
      type: "array",
      min: 1,
      trigger: "input",
    },
  ],
};

const add = () => {
  this.formData = JSON.stringify(defaultFormModel);
  this.formMode = "add";
  this.modalShow = true;
};

const edit = (row) => {
  this.formData = JSON.stringify(defaultFormModel);
  Object.assign(this.formData, data);
  this.formData.PollutantTypeCode += "";
  this.formMode = "edit";
  this.modalShow = true;
};

// 重置表单
this.$refs["form"].resetFields();
// 校验表单
this.$refs["form"].validate((valid) => {
  let data = { status: valid, data: this.formData };
});
```

## radio

注意: 这里由坑 label 应该是 value

```html
<Radio-Group v-model="conditionSearch1.code" type="button" :class="theme">
  <Radio label="a34004">PM₂.₅</Radio>
  <Radio label="a34002">PM₁₀</Radio>
  <Radio label="a21005">CO</Radio>
  <Radio label="a21004">NO₂</Radio>
  <Radio label="a21026">SO₂</Radio>
  <Radio label="a05024">O₃</Radio>
</Radio-Group>

<Radio-Group v-model="value" type="button" :class="theme">
  <template v-for="e in option">
    <Radio :key="e.value" :label="e.value">
      <span>{{e.label}}</span>
    </Radio>
  </template>
</Radio-Group>
```

```js

```

value 只在`单独使用时有效`。可以使用 v-model 双向绑定数据 Boolean false
label 只在组合使用时有效。指定当前选项的 value 值，组合会自动判断当前选择的项目

https://www.iviewui.com/components/radio#API

## switch 开关

https://www.iviewui.com/components/switch#API

```html
<Form-Item label="开关" prop="isXXX">
  <i-Switch v-model="formData.isXXX" @on-change>
    <span slot="open">开</span>
    <span slot="close">关</span>
  </i-Switch>
</Form-Item>
```

## upload 上传

要点: 单选 , 多选 , base64, 文件先行表单后提

```html
<Upload
  action=""
  :before-upload="handleUploadicon"
  :show-upload-list="false"
  :format="['pdf']"
  :on-format-error="handleFormatError"
>
  <i-Button type="primary" icon="ios-cloud-upload-outline" style="width:100% ;"
    >上传报告
  </i-Button>
</Upload>
<span>{{ReportName}}</span>
```

```js
function beforeUpload(file) {
  // TODO: 文件上传 , 钩子
  const { name, size, type } = file;

  const ext = type.split("/")[1];
  const alowType = ["jpg", "jpeg", "png"];
  // 文件类型
  if (alowType.indexOf(ext) == -1) {
    this.$Message.warning("文件格式不正确，请上传 jpg 或 png 格式的图片!");
    return;
  }

  // 文件大小
  if (size > 1024 * 1024 * 2) {
    this.$Message.warning("图片大小不能超过2M!");
    return;
  }

  // 重名
  const nameIndex = this.faultUploadList.findIndex((v) => name == v.fileName);
  if (nameIndex > -1) {
    this.$Message.warning("已选择该文件!");
    return;
  }

  // 附加字段
  let uuid;
  if (this.formData.uuid) {
    uuid = this.formData.uuid;
  } else {
    uuid = this.formData.uuid = Date.now() + "";
  }
  file.attachID = this.faultUploadList.length + 1;

  getFileModels([file], uuid).then((arr) => {
    this.faultUploadList.push(...arr); // ObjectURL 展示
  });

  return false;
}
// 获取图片数据: 文件s, uuid
function getFileModels(files, uuid) {
  let files_promise = [];
  files.forEach((file, index) => {
    files_promise.push(
      new Promise((res, rej) => {
        let reader = new FileReader();
        try {
          reader.readAsDataURL(file);
          reader.onload = function (evt) {
            const base64 = evt.target.result;
            uuid = uuid || file.uid || Date.now();
            res({
              uuid: uuid,
              fileName: file.name, // 文件名
              filetype: "." + file.type.split("/")[1], // 文件类型
              fileSize: file.size, // 文件大小
              // 以下 为接口所需参数
              fileFullName: file.name,
              fileStr: base64.split(",")[1], // 文件上传流 base64.split(",")[1]
            });
          };
        } catch (error) {
          rej(error);
        }
      })
    );
  });

  return Promise.all(files_promise);
}
```

## checkbox

注:

组的 v-model : **不影响用户的其他数据**, 一个数据, 可以用在多个 v-model, 如 v-for . (需注意唯一性,冲突除外)

组的: 选中状态 通过 `v-model` (Checkbox-Group), `label` (Checkbox) 控制

单选: `value` (v-model) 控制

显示字样: 通过内容(插槽), 不通过 label 控制

BUG: 响应 问题,

```html
<Checkbox-Group
  v-for=""
  v-model="types_a5ba_model"
  style="display: inline-block;"
>
  <template v-for="e in types_a5ba">
    <Checkbox
      :key="e.typeName"
      :label="e.typeName"
      :value="e.checkAll"
      :indeterminate="e.indeterminate"
    >
      <span>{{e.typeName}}</span>
    </Checkbox>
  </template>
</Checkbox-Group>
```

## message 通知

```js
// 轻量级的信息反馈组件，在顶部居中显示，并自动消失。有多种不同的提示状态可选择。
this.$Message.error("操作失败!");
this.$Message.warning("操作失败!");
this.$Message.success("操作成功!");

// 在界面右上角显示可关闭的全局通知
// 通知内容带有描述信息 | 系统主动推送
this.$Notice.success({
  title: "Notification title",
  desc: "The desc will hide when you set render.",
  duration: 0, // 为 0 则不自动关闭
  render: (h) => {
    return h("span", ["This is created by ", h("a", "render"), " function"]);
  },
});
```

## 模板

```html

```

```js

```
