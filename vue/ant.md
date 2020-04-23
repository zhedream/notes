# antdv 的使用



## form

```html
<a-form :form="pwdform">
  <div class="ant-row ant-form-item">
    <h2 class="ant-col-5 ant-form-item-label">label</h2>
  </div>
  <a-form-item label="旧的密码">
    <a-input
      type="password"
      v-decorator="['old',{rules: [{ required: true, message: '必填项!' },]}]"
    />
  </a-form-item>
  <a-form-item label="新的密码">
    <a-input
      type="password"
      v-decorator="['new',{rules:{ required: true, message: '必填项!' },]}]"
    />
  </a-form-item>
  <a-form-item label="确认密码">
    <a-input
      type="password"
      v-decorator="['repeat',{rules: [{ required: true, message: '必填项!' },{validator: handleConfirmPassword}]}]"
    />
    <!-- mode="multiple" [{key,label}] -->
    <!-- mode="default" {key,label} -->
  </a-form-item>
  <a-form-item label="多个 [{key,label}]" :label-col="{ span: 5 }" :wrapper-col="{ span: 12 }">
    <a-select :options="options" labelInValue mode="multiple" v-decorator="[ 'many', { rules: [{ required: true, message: '请选择' }] }]"
      placeholder="请选择">
      <a-select-option value="1">many1</a-select-option>
      <a-select-option value="2">many2</a-select-option>
    </a-select>
  </a-form-item>
</a-form>

```

```js
//  创建  vue 表单
data() {
  return {
    pwdform: this.$form.createForm(this), // 修改密码 表单
  };
},
// 自定义验证
handleConfirmPassword  (rule, value, callback)  {
  const { getFieldValue } = this.pwdform
  if (value && value !== getFieldValue('new')) {
    return callback('两次输入不一致！')
  }
  // Note: 必须总是返回一个 callback，否则 validateFieldsAndScroll 无法响应
  return  callback()
}
// 表单数据
this.pwdform.validateFields((err, values) => {
  if (err) return;
  console.log('data: ', user,values);
  this.visible = false;
  this.pwdform.setFields(); // 设置默认表单
  this.pwdform.resetFields(); // 重置表单
});
  process.nextTick(() => {
  this.pwdform.setFieldsValue(object)
  })
```
## a-table

```html
<a-table size="middle" rowKey='ID' :columns="columns" :dataSource="dataSource" :pagination="true"
  :pagination="{defaultPageSize:5}" :customRow="customRow"
  :loading="isLoading" :scroll="{ x: 120*3*selectCount+240 }">
  <!-- #NameCustom 这种写法只能 用于 template 标签  -->
  <template #NameCustom="text,data,index">{{text}}</template>
  <span slot="NameCustom" slot-scope="text,data,index"></span>
</a-table>
```

```js
const customRow = (record, index) => {
  console.log(123);
  return {
    on: {
      click: event => {
        console.log(record, index, event);
      }
    }
  };
}
const columns = [
  {
    title:'名称1',
    title:()=>{
      return '名称2'
    },
    dataIndex: 'Name',
    key: 'Name',
    slots: { title: 'NameTitle' }, // 自定义渲染表头, 无数据-插槽
    scopedSlots: { customRender: 'NameCustom' }, // 自定义渲染内容, 有数据-插槽
  },
  {
    title: "顺序",
    align: 'center',
    dataIndex: "sorts",
    width: "20%"
    slots: { title: 'sortsTitle' },
    scopedSlots: { customRender: "sorts" },
    sorter: (a, b) => a.Name.length - b.Name.length,
    customRender: (text, record, index) => {
      return `${text}`; //es6写法
    }
  },
  {
    title: " ",
    align: "center",
    dataIndex: "IsUsed",
    key: "IsUsed",
    width: 200,
    filters: [
      {
        text: "正式库",
        value: "正式库"
      },
      {
        text: "测试库",
        value: "测试库"
      },
    ],
    onFilter: (value, record) => record.IsUsed.indexOf(value) === 0
  }
];

```

## modal
```html
<a-modal forceRender :afterClose="editCancel" v-model="visible" :title="formMode==='add'?'新增':'编辑'">
  <template slot="footer">
    <a-button key="back" @click="editCancel">取消</a-button>
    <a-button key="submit" type="primary" @click="editOk">确定</a-button>
  </template>
</a-modal>
```
# a-tree

```html

<a-tree 
  checkable - 可选
  v-model="checkedKeys" - checkable 可选的 checkedKeys
  :treeData="treeData" - 数据
  :multiple="false" - select 的多选
  :checkStrictly="true" - 父子节点不关联, 全选
  :replaceFields="replaceFields" - 自定义字段
  @expand="onExpand" - 展开
  :expandedKeys="expandedKeys" 
  :autoExpandParent="autoExpandParent"
  @select="onSelect" - select 选择
  :selectedKeys="selectedKeys" 
/>
```

## a-range-picker

```html
<a-range-picker
showTime
format="YYYY-MM-DD HH:mm:ss"
v-model="rangeDate"
@openChange="rangeDateChange"
@change="timeCahnge"
:disabledDate="disabledDate"
>
<template slot="dateRender" slot-scope="current">
  <div class="ant-calendar-date" style="position: relative;">
    {{current.date()}}
    <i v-if="isExistTask(current)" class="redTip"></i>
  </div>
</template>
</a-range-picker>

<script>

this.taskDays = new Set();
this.taskDays.clear(); // 有任务的日期
TimeList.forEach(item => {
  this.taskDays.add(item); // 红点日期
});

disabledDate(current) {
  // Can not select days before today and today
  return current > moment().endOf("day");
},
rangeDateChange(state) {
  if (!state) {
    // 面板关闭
  }
},
timeCahnge(a) {
  // 时间改变
},
isExistTask(current) {
  // 判断
  // moment().format('YYYY-MM-DD HH:mm:ss')
  let exist = this.taskDays.has(current.format("YYYY-MM-DD"));
  return exist;
}
exportTable() {
  const { export_json_to_excel } = require("@/excel/Export2Excel");
  let { tableColumns, tableDataAll } = this;

  const tHeader = tableColumns
    .filter(v => v.dataIndex !== "operation")
    .map(item => item.title);
  const keys = tableColumns.map(item => item.dataIndex);
  let data = tableDataAll;
  data = data.map(item => keys.map(i => item[i]));
  console.log(this.selectedRows);
  export_json_to_excel(tHeader, data, "用户");
},

<script>

<style lang="less">
.redTip {
  display: block;
  background: #1890ff;
  border-radius: 50%;
  width: 6px;
  height: 6px;
  top: 0px;
  right: 0px;
  position: absolute;
}
</style>

```
```js


```