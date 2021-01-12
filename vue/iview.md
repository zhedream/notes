# iview 组件使用

## 标签

https://www.iviewui.com/docs/guide/iview-loader

## button

```html
<button type="primary">Primary</button>
<i-button type="primary">Primary</i-button>
```

## Input

'i-input': 'Input'

```html
<i-input
  v-model="value"
  placeholder="Enter something..."
  clearable
  style="width: 300px"
></i-input>
```

## DatePicker 时间选择

```html
<Date-Picker
  type="datetimerange"
  placeholder="请选择创建时间"
  style="width: 300px"
></Date-Picker>
```

## select 选择器

https://www.iviewui.com/components/select

```html
<i-Select v-model="" @on-change="" placeholder="" multiple clearable filterable>
  <template v-for="e in FK_PointGroup">
    <i-Option :label="e.label" :value="e.value" :key="e.value"></i-Option>
  </template>
</i-Select>
```

需要注意的 坑:

1. 多选的时候,

option label 不能由空格回车, 不然显示会有问题

v-model 的值 和 option 是全等匹配 === , item 和 placeholder 都会 display:none
v-model [1,3,4] 和 option ['1','2','3'] 匹配不上 没有 iem,
v-model [1,3,4] 非空, placeholder display:none
会导致 选择框 塌陷

## table

```html
<i-table
  ref="iviewTable"
  row-key="bumenID"
  @on-selection-change="handleSelect"
  :span-method="handleSpan2"
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
// iview  行选中状态, 不是双向绑定, 需要手动修改 表格数据 dataTable
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
const columns = [
  { title: "序号", type: "index" },
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
  },
  { title: "操作", slot: "action", width: 200, align: "center" },
];
```

### 自适应高度和滚动条

固定 数据行, 无数据提示 高度

```less
/* 高度 */
.box .ivu-table-body,
.box .ivu-table-tip,
.box .ivu-table-fixed-body {
  height: calc(100vh - 315px);
}
/* 显示滚动条 */
.box .ivu-table-body {
  overflow: auto;
}

/* 滚动条 start */
.box .ivu-table-body::-webkit-scrollbar {
  width: 6px;
  height: 6px;
  background-color: #f5f5f5;
}

/*定义滚动条轨道 内阴影+圆角*/
.box .ivu-table-body::-webkit-scrollbar-track {
  box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
  border-radius: 10px;
  background-color: #f5f5f5;
}

/*定义滑块 内阴影+圆角*/
.box .ivu-table-body::-webkit-scrollbar-thumb {
  border-radius: 10px;
  box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
  background-color: #555;
}
```

### 表格内编辑

## Modal

http://v2.iviewui.com/components/modal#API

```html
<i-Modal
  width="800"
  footer-hide
  @on-ok="ok"
  @on-cancel="cancel"
  @on-visible-change
  @on-visible-change="visibleChange"
  v-model="visible"
  :mask-closable="false"
  :closable="false"
  :title="'标题'"
>
  <div slot="footer">
    <i-Button type="default" @click="warnEditCancel">取消</i-Button>
    <i-Button type="primary" @click="warnAddEditOK">确定</i-Button>
  </div>
</i-Modal>
```

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
        <i-Button type="default" @click="formCancel" style="margin-left: 5px;"
          >取消</i-Button
        >
      </i-col>
    </row>
  </i-form>
</Modal>
<!-- 
v-if="modalShow" resetFields 必须新实例才能正确 重置表单
 -->
```

表单验证问题

https://github.com/yiminghe/async-validator/issues/182#issuecomment-741485886

input 框, 非必选, 数据为 数值类型, 但不通过验证. 可能是 组件或库的 bug

解决办法:

1. type:string 转成 字符串 + v-model.trim
2. type:number 空为 0 + v-model.number
3. type:any input number 限制数据数值. (新版库才支持)

异步校验: https://github.com/yiminghe/async-validator

```js
let defaultFormModel = {
  name: "", // 姓名
  age: "", // 年龄
  user: {
    name: "",
    age: "",
  },
};
let defaultFormRules = {
  AlarmType: [{ required: true, message: "请输入xxx", trigger: "change" }],
  Num: [
    { required: true, type: "integer", message: "请选择", trigger: "change" },
  ],
  data1: [
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
<Radio-Group v-model="conditionSearch1.code" type="button" v-bind:class="theme">
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

## 模板

```html

```

```js

```
