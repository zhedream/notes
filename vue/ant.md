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
  <a-form-item
    label="时间间隔"
    :label-col="{ span: 5 }"
    :wrapper-col="{ span: 12 }"
  >
    <a-input-number
      style="width: 100%"
      placeholder="请输入时间间隔"
      v-decorator="['TimeSpace', {initialValue: 4, rules: [{ required: true, message: '请输入时间间隔' }] }]"
      :min="1"
      :max="10"
    />
  </a-form-item>
  <a-form-item
    label="多个 [{key,label}]"
    :label-col="{ span: 5 }"
    :wrapper-col="{ span: 12 }"
  >
    <a-select
      :options="options"
      labelInValue
      mode="multiple"
      v-decorator="[ 'many', { rules: [{ required: true, message: '请选择' }] }]"
      placeholder="请选择"
    >
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

If you want to set empty value, use `null` instead.
初始化使用 null, 不用 ''
setFieldsValue
setFields

## formModel

```html
<a-modal
  v-bind="form.modalProps"
  v-model="form.visible"
  :afterClose="addCancel"
>
  <template slot="footer">
    <a-button key="back" @click="addCancel">取消</a-button>
    <a-button key="submit" type="primary" @click="addOK">确定</a-button>
  </template>
  <a-form-model
    ref="formRef"
    :model="form.formState"
    :rules="form.formRules"
    v-bind="form.formProps"
  >
    <a-form-model-item hidden label="项目ID" prop="ProjectID">
      <a-input v-model="form.formState.ProjectID" />
    </a-form-model-item>
  </a-form-model>
</a-modal>
```

```js
var vm = {
  data: {
    form: {
      visible: false,
      modalProps: {
        footer: null,
        title: "",
        dialogStyle: {
          top: "60px",
        },
        width: "90%",
      },
      formState: getFormState(),
      formRules: getFormRules(),
      formRules: {
        checkPass: [
          {
            validator: (rule, value, callback) => {
              if (value === '') {
                callback(new Error('Please input the password again'));
              } else if (value !== this.ruleForm.pass) {
                callback(new Error("Two inputs don't match!"));
              } else {
                callback();
              }
            },
            trigger: 'change',
          }
        ],
      }
      formProps: {
        labelCol: { span: 4 },
        wrapperCol: { span: 19 },
      },
    },
  },
};
vm.$refs.form.clearValidate();
vm.$refs.form.validate((valid) => {
  if (valid) {
    console.log("submit!");
  } else {
    console.log("error submit!!");
    return false;
  }
});
```

## a-table

```html
<div class="table-box" style="flex:1;overflow:auto;">
  <a-table
    size="middle"
    rowKey="ID"
    :columns="columns"
    :dataSource="dataSource"
    :pagination="true"
    :pagination="{defaultPageSize:5}"
    :customRow="customRow"
    :loading="isLoading"
    :scroll="{ x: 120*3*selectCount+240 }"
  >
    <!-- #NameCustom 这种写法只能 用于 template 标签  -->
    <template #NameCustom="text,data,index">{{text}}</template>
    <span slot="NameCustom" slot-scope="text,data,index"></span>
    <template #action="text,data,index">
      <a-popconfirm
        title="确定删除?"
        ok-text="是"
        cancel-text="否"
        @confirm="delTaskOK(record)"
      >
        <a>删除</a>
      </a-popconfirm>
    </template>
  </a-table>
</div>
```

```ts
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

```ts
const table = reactive<{
  columns: Readonly<Partial<Column>[]>;
  data: Readonly<GetPathPlanResItem[]>;
  props: {
    rowKey: (r: GetPathPlanResItem, index: number) => string;
    pagination: false;
    size: "small";
    [key: string]: any;
  };
}>({
  columns: Object.freeze(columns),
  data: [],
  props: {
    rowKey: (r: GetPathPlanResItem) => r.PlanID,
    pagination: false,
    size: "small",
    scroll: { y: true, x: true },
    // scroll: { y: 260 },
  },
});
```

自适应高度

```less
/deep/ .table-box {
  .ant-table-wrapper,
  .ant-spin-nested-loading,
  .ant-spin-container,
  .ant-table,
  .ant-table-content,
  .ant-table-scroll {
    height: 100%;
  }

  .ant-spin-container {
    display: flex;
    flex-direction: column;

    & > .ant-table {
      flex: 1;
      overflow: auto;
    }

    & > .ant-table-pagination {
      align-self: flex-end;
    }
  }

  // tbody
  .ant-table-scroll {
    display: flex;
    flex-direction: column;
  }

  .ant-table-content .ant-table-body {
    overflow: auto;
    flex: 1;
  }

  // fixed-right
  .ant-table-fixed-right {
    display: flex;
    flex-direction: column;
    height: calc(100% - 20px);
  }

  .ant-table-body-outer {
    overflow: auto;
    flex: 1;
  }

  // fixed-left
  .ant-table-fixed-left {
    display: flex;
    flex-direction: column;
    height: calc(100% - 20px);

    .ant-table-body-outer {
      overflow: hidden;
      flex: 1;
    }
  }

  .ant-table-empty {
    .ant-table-content .ant-table-body {
      flex: 0;
    }
  }
}

// /deep/.table-box {
//   .ant-table-content .ant-table-body {
//     height: calc(100vh - 400px);
//     min-height: 330px;
//     max-height: 730px;
//   }
// }
```

## modal

```html
<a-modal
  forceRender
  :afterClose="editCancel"
  v-model="visible"
  :title="formMode==='add'?'新增':'编辑'"
  :footer="null"
  width="80vw"
>
  <template slot="footer">
    <a-button size="small" key="back" @click="editCancel">取消</a-button>
    <a-button key="submit" type="primary" @click="editOk">确定</a-button>
  </template>
  <div style="height:'80vh'">自适应高度</div>
</a-modal>
<!-- 表单 -->
<a-modal
  v-bind="form.modalProps"
  v-model="form.visible"
  :afterClose="addCancel"
>
  <template slot="footer">
    <a-button key="back" @click="addCancel">取消</a-button>
    <a-button key="submit" type="primary" @click="addOK">确定</a-button>
  </template>
</a-modal>
```

## a-tree

```txt

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

## a-row

```html
<a-row>
  <a-col :span="12"> col-12 </a-col>
  <a-col :span="12"> col-12 </a-col>
</a-row>
```

## a-cascader

```html
<a-cascader
  style="width:90px;"
  class="selectList1"
  :allowClear="false"
  :show-search="{ filter }"
  :default-value="[item.code]"
  :options="item.detail"
  v-model="item.paths"
  placeholder="Please select"
  @change="(a,b)=>cascaderChange(a,b,item)"
>
  <template slot="displayRender" slot-scope="{ labels, selectedOptions }">
    <span
      v-for="(label, index) in labels"
      :key="selectedOptions[index].value+index"
    >
      <span v-if="index === labels.length - 1">{{ label }}</span>
    </span>
  </template>
</a-cascader>
```

## a-tabs

```html
<a-tabs default-active-key="30" @change="callbackMapTab">
  <a-tab-pane
    v-for="equipment in PollutantTypeList"
    :key="equipment.PollutantType"
  >
    <span slot="tab">
      <a-badge
        :number-style="{ backgroundColor: '#52c41a',margin: '-1px -10px' }"
        >{{equipment.PollutantTypeName}}</a-badge
      >
    </span>
  </a-tab-pane>
</a-tabs>
```

## popconfirm 确定

常用于 表格 删除确定

```html
<a-divider type="vertical" />
<a-popconfirm
  title="确定删除?"
  okText="确定"
  cancelText="取消"
  @confirm="() => del2(record.DetailID,record1.GasID)"
>
  <a :disabled="editing==true">删除</a>
</a-popconfirm>
```

## popover 小弹层

```html
<a-popover
  placement="bottom"
  v-model="visiblePopover"
  title="因子组名称"
  trigger="click"
>
  <div slot="content">
    <a-input
      v-model="GroupNamePopover"
      placeholder="请输入因子组名称"
    ></a-input>
    <a @click="savaFactor">确定</a>
  </div>
  <a-button type="default">保存因子组</a-button>
</a-popover>
```

## select 选择器

```text 组件
  VNodes: {
    functional: true,
    render: (h, ctx) => ctx.props.vnodes,
  },
```

```text 方法
  vocsCodesFocus() {
    this.vocsCodesOpen = true;
    const close = () => {
      window.onclick = null;
      this.vocsCodesOpen = false;
      window.onscroll = null;
      this.vocsCodesOpen = false;
    };
    window.onclick = close;
    window.onscroll = close;
  },
```

```html
<a-select
  style="width: 250px"
  mode="multiple"
  placeholder="选择检测项"
  :dropdownMatchSelectWidth="false"
  :maxTagCount="2"
  maxTagPlaceholder=".."
  @focus="vocsCodesFocus"
  :open="vocsCodesOpen"
  :value="vocsCodesModel"
>
  <div slot="dropdownRender" slot-scope="menu">
    <v-nodes :vnodes="menu">
    <div
      style="width: 500px"
      @click.stop=""
      @mousedown.stop="(e) => e.preventDefault()"
    ></div>
  </div>
  <a-select-option
    v-for="item in vocsCodesOption"
    :value="item.polutantCode"
    :key="item.polutantCode"
  >
    {{ item.polutantName }}
  </a-select-option>
</a-select>
```

## 多选 select

```html
<!-- 多选 -->
<a-form-model-item label="跟车员" prop="CarOperator">
  <a-select
    mode="multiple"
    :maxTagCount="3"
    :maxTagTextLength="4"
    maxTagPlaceholder=".."
    show-search
    :filter-option="filterOptionFilter"
    :options="CarOperatorOptions"
    v-model="form.formState.CarOperator"
  >
  </a-select>
</a-form-model-item>
<!-- 单选 -->
<a-select :options="roleData" v-model="form.formState.role"></a-select>
```

```js
var vm = {
  data:{
    CarOperatorOptions:[
      {key:A,label:'A'}
    ]
  }
  methods: {
    filterOptionFilter(input, option) {
      return (
        option.componentOptions.children[0].text
          .toLowerCase()
          .indexOf(input.toLowerCase()) >= 0
      );
    },
  },
};
```

## radio 单选

optinos: [{label,vlaue,disabled: false}]

```html
<a-radio-group
  :options="options"
  v-model="values"
  :default-value="value"
  @change="change"
/>
```

```html
<a-radio-group v-model="value" @change="onChange">
  <a-radio :style="radioStyle" :value="1"> Option A </a-radio>
  <a-radio :style="radioStyle" :value="2"> Option B </a-radio>
  <a-radio :style="radioStyle" :value="3"> Option C </a-radio>
  <a-radio :style="radioStyle" :value="4">
    More...
    <a-input v-if="value === 4" :style="{ width: 100, marginLeft: 10 }" />
  </a-radio>
</a-radio-group>

<script>
  let radioStyle = {
    display: "block",
    height: "30px",
    lineHeight: "30px",
  };
</script>
```

radio 按钮组

```html
<a-radio-group default-value="c" button-style="solid">
  <a-radio-button value="a"> Hangzhou </a-radio-button>
  <a-radio-button value="b" disabled> Shanghai </a-radio-button>
  <a-radio-button value="c"> Beijing </a-radio-button>
  <a-radio-button value="d"> Chengdu </a-radio-button>
</a-radio-group>
```

## checkbox 多选框

option:{label,value}

```html
<a-row
  v-for="item in vocsCodes_filterData"
  :key="item.typeCode"
  style="margin: 3%; border-bottom: 1px solid #d9d9d9"
>
  <a-col span="5">
    <!-- <a-checkbox
        :indeterminate="item.indeterminate"
        :checked="item.checkAll"
        style="color: #1890ff; font-weight: bold"
        @change="vocsCheckCodeAll(item)"
      >
        {{ item.typeName }}</a-checkbox
      > -->
    <span style="color: #1890ff; font-weight: bold">{{ item.typeName }}</span>
  </a-col>
  <a-col span="19">
    <a-checkbox-group
      :value="vocsCodesModel"
      :options="item.children"
      @change="vocsSingleCheck(item, $event)"
    >
    </a-checkbox-group>
  </a-col>
</a-row>
```

## echarts

```html
<echart-component
  v-if="optionData.length>0"
  id="uniq"
  :option="option"
  :loading="isLoading"
  height="750"
></echart-component>
<a-spin v-else :spinning="isLoading">
  <a-empty />
</a-spin>
```

## icon

https://antdv.com/components/icon-cn/

<a-icon type="bars" />

## arow
