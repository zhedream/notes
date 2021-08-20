# antdv2.0

https://2x.antdv.com/components/overview-cn/

```
<a-select showSearch mode="multiple" :options="forward.options" v-model:value="forward.ForwardIDs" />

const filterOption = (text: string, option: option) => {
  return option.label.toUpperCase().indexOf(text.toUpperCase()) > -1;
};

```

## table

a-table[ref="tableRef"][:columns="columns"][:dataSource="dataSource"]

## form

https://2x.antdv.com/components/form-cn#API

a-form[ref="formRef" :model="formState" :rules="formRules"]

<a-form-item label="name" name="name">
  <a-input v-model:value="formState.name" />
</a-form-item>

## form-item

https://2x.antdv.com/components/form-cn#API

a-form-item[label="text" name="text"]

## row/col

a-row[type="flex" justify="center"]

## button

<a-button type="primary">Primary</a-button>
a-button[type="primary"]{按钮}

## input

https://2x.antdv.com/components/ipnut-cn#API

a-input[v-model:value="text" placeholder="请输入 text"]

## tree-select

https://2x.antdv.com/components/tree-select-cn#API

```html
<a-tree-select
  v-model:value="value"
  :tree-data="treeOptions"
  :show-checked-strategy="SHOW_PARENT"
  search-placeholder="请选择"
  allow-clear
  tree-checkable
  treeDefaultExpandAll
  @change="change"
/>
```

a-tree-select[v-model:value="form.formState.PointDeviceList" :tree-data="DeviceTree_mode" tree-checkable]

## select

https://2x.antdv.com/components/select-cn#API

a-select[showSearch mode="multiple" :options="options"][v-model:value="forwardids"]

`a-select>a-select-option[value="option$@-"]{$}*3`

placeholder="请选择" 需要值为 null, 为空字符串 不显示

## radio

https://2x.antdv.com/components/radio-cn#API
a-radio-group[:options="options" v-model:value="value"]

<a-radio-group v-model:value="value1" button-style="solid">
        <a-radio-button value="a">Hangzhou</a-radio-button>
        <a-radio-button value="b">Shanghai</a-radio-button>
        <a-radio-button value="c">Beijing</a-radio-button>
        <a-radio-button value="d">Chengdu</a-radio-button>
      </a-radio-group>

`a-radio-group[v-model:value="value1"]>a-radio-button[value="a$"]{A$}*2`

`a-radio-group[v-model:value="value1"]>a-radio[value="a$"]{A$}*2`

a-radio-group[:options="options" v-model:value="value"]

a-radio-group[v-model:value="value"]>a-radio-button[v-for="v in options" :key="v.value" :value="v.value"]{ v.label }

## checkbox

<a-checkbox-group v-model:value="value2" :options="plainOptions" />

a-checkbox-group[v-model:value="form.formState.value" :options="options"]

## switch

https://2x.antdv.com/components/switch-cn#API

a-switch[v-model:checked="checked" checked-children="开"][un-checked-children="关"]

## modal

https://2x.antdv.com/components/modal-cn#API

a-modal[v-bind="modalProps" v-model:visible="visible"][@ok="handleok"]

## modal form formItem row

a-modal[v-bind="modalProps" v-model:visible="visible" @ok="handleOK"]>a-form[:ref="setFormRef" :model="formState" :rules="formRules"]>a-row
