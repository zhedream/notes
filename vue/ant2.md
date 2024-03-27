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

## form model setup useForm.ts
```ts @hooks/useForm.ts
import type { FormProps, Rule } from "ant-design-vue/es/form";
import type { Ref, UnwrapRef } from "vue";
import { computed, reactive, ref, unref } from "vue";
import type { FormInstance, ModalProps } from "ant-design-vue";


const defaultFormConfig = {
  datum: {},
  temState: {},
  attrs: {
    // 关闭自动提示
    autoComplete: "off",
  },
  state: {},
  rules: {},
};

interface Form<F, D, T> {
  datum: D;
  temState: T;
  state: F;
  rules: Partial<Record<keyof F, Rule[]>>;
  attrs: typeof defaultFormConfig.attrs & FormProps;
}

interface InForm<F, D, T> extends Omit<Form<F, D, T>, "attrs"> {
  attrs: Partial<typeof defaultFormConfig.attrs> & FormProps;

}

export function useForm<F, D = any, T = any>
(config: Partial<InForm<F, D, T>>): UnwrapRef<Form<F, D, T>> {

  let form: Form<F, D, T> = {
    datum: Object.assign({}, defaultFormConfig.datum, config.datum),
    temState: Object.assign({}, defaultFormConfig.temState, config.temState),
    state: Object.assign({}, defaultFormConfig.state, config.state),
    rules: Object.assign({}, defaultFormConfig.rules, config.rules),
    attrs: Object.assign({}, defaultFormConfig.attrs, config.attrs),
  };
  return reactive(form);
}

export function useFormRef(): Ref<FormInstance> {
  return ref();
}

// useModal

export function useModal<A extends ModalProps = object>(modalProps: A) {

  let target = {
    open: false,
    title: "标题",
    cancelText: "取消",
    okText: "确定",
    maskClosable: false,
    destroyOnClose: true,
  };

  let defaultAttrs: typeof target & A = Object.assign(target, modalProps);

  return reactive({
    // open: false, // 把 open 从 attrs 中提取出,来, 以便 v-model , 或者有什么办法 在 v-bind 也能有 v-model 的效果
    attrs: defaultAttrs,
  });

}

```
## form model setup

- template
```vue
<template>
  <a-modal v-bind="modal.attrs">
    <a-form ref="formRef" :model="form.state" :rules="form.rules" v-bind="form.attrs">
      <a-form-item label="任务类型编码" name="taskTypeCode">
        <a-input v-model:value="form.state.taskTypeCode"></a-input>
      </a-form-item>
      <a-form-item label="任务类型名称" name="taskTypeText">
        <a-input v-model:value="form.state.taskTypeText"></a-input>
      </a-form-item>
      <a-form-item label="是否打卡" name="isPunchCard">
        <a-radio-group v-model:value="form.state.isPunchCard">
          <a-radio :value="true">是</a-radio>
          <a-radio :value="false">否</a-radio>
        </a-radio-group>
      </a-form-item>
    </a-form>
  </a-modal>
</template>
```
- setup
```vue setup
<script setup lang="ts">
import { useForm, useFormRef, useModal } from "@/hooks/useForm";
import type { MainFormModalData } from "./type";
import { TaskTypeInsertTaskType } from "@/api/controllers/TaskType";
import type { TaskTypeInsertTaskTypeReq } from "@/api/types";
import { message } from "ant-design-vue";


// === form

interface FormState extends TaskTypeInsertTaskTypeReq {
}

const formRef = useFormRef();
const form = useForm<FormState>({
  state: {
    isPunchCard: true,
    sys_ID: undefined,
    taskTypeCode: undefined,
    taskTypeText: undefined,
  },
  rules: {
    taskTypeCode: [{ required: true, message: "请输入任务类型编码", trigger: "blur" }],
    taskTypeText: [{ required: true, message: "请输入任务类型名称", trigger: "blur" }],
    isPunchCard: [{ required: true, message: "请选择是否打卡", trigger: "change" }],
  },
});

// === modal

const modal = useModal({
  title: "新增任务类型",
  width: 800,
  onCancel: modalCancel,
  onOk: modalOk,
});


let onOk: MainFormModalData["onOk"];

function modalOpen(data: MainFormModalData) {

  modal.attrs.open = true;

  form.state = {
    sys_ID: data.row.Sys_ID,
    isPunchCard: data.row.isPunchCard,
    taskTypeCode: data.row.taskTypeCode,
    taskTypeText: data.row.taskTypeText,
  };

  if (data.row.Sys_ID) {
    modal.attrs.title = "编辑任务类型";
  } else {
    modal.attrs.title = "新增任务类型";
  }

  onOk = data.onOk;
}

function modalOk() {

  formRef.value.validate()
    .then(() => {

      TaskTypeInsertTaskType(form.state)
        .then(e => e.data)
        .then(res => {
          if (res.requestresult === "1") {
            message.success("操作成功");
            onOk && onOk();
            modalCancel();
          } else {
            message.warning(res.reason || "操作失败");
          }
        });
    });

}

function modalCancel() {
  formRef.value.resetFields();
  modal.attrs.open = false;
}

defineExpose({
  modalOpen,
});

</script>

```

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
