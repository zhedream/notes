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
<i-Select v-model="formValidate.DataType">
  <i-option v-for="item in DataTypeOption" :value="item.value" :key="item.value"
    >{{ item.label }}</i-option
  >
</i-Select>
```

```html

```

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
  footer-hide
  on-ok="ok"
  @on-cancel="cancel"
  v-model="visible"
  @on-visible-change="visibleChange"
  :title="'标题'"
></i-Modal>
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
