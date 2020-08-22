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

multiple

```html
<i-Select multiple v-model="formValidate.DataType">
  <i-option v-for="item in DataTypeOption" :value="item.value" :key="item.value"
    >{{ item.label }}</i-option
  >
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
  v-bind:columns="columns"
  v-bind:data="data"
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

# Modal

http://v2.iviewui.com/components/modal#API

```html
<i-Modal
  width="800"
  footer-hide
  on-ok="ok"
  @on-cancel="cancel"
  v-model="visible"
  @on-visible-change="visibleChange"
  :mask-closable="false"
  :title="'标题'"
>
  <div slot="footer">
    <i-Button type="default" @click="warnEditCancel">取消</i-Button>
    <i-Button type="primary" @click="warnAddEditOK">确定</i-Button>
  </div>
</i-Modal>
```

# Transfer

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

# form 表单

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
