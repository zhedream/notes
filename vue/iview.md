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
<i-Select v-model="" @on-change="" multiple clearable>
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
  highlight-row
  @on-selection-change="handleSelect"
  :columns="columns"
  :data="data"
  border
>
  <template slot-scope="{row,index,column}" slot="action">
    <i-Button title="编辑" size="small" @click="edit(row,index)">
      <i-icon type="edit"></i-icon>
    </i-Button>
  </template>
</i-table>
```

```js
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
  { title: "排序", key: "sort" },
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
        "aa"
      );
    },
  },
  { title: "操作", slot: "action", width: 200, align: "center" },
];
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

```js
let warnFormRules = {
  AlarmType: [{ required: true, message: "请输入xxx", trigger: "change" }],
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

## 模板

```html

```

```js

```
