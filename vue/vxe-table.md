# vxe-table

[官方文档](https://vxetable.cn/#/table/start/install)

```js
//  ==== 高亮

// 设置高亮, 只有一行高亮行
vmSiteList.$refs.xGrid.setCurrentRow(vmSiteList.SiteInfoList[1]);
// 清除高亮
vmSiteList.$refs.xGrid.clearCurrentRow();
// 获取高亮行
vmSiteList.$refs.xGrid.getCurrentRecord();
// 高亮事件  current-change

// ======  单选

// 事件 radio-change { row }

// 设置选中
vmSiteList.$refs.xGrid.setRadioRow(vmSiteList.SiteInfoList[1]);
// 清除选中
vmSiteList.$refs.xGrid.clearRadioRow();
// 获取选中
vmSiteList.$refs.xGrid.getRadioRecord();

// ==== 多选

// 事件 checkbox-change  checkbox-all

// 切换
vmSiteList.$refs.xGrid.toggleCheckboxRow(vmSiteList.SiteInfoList[1]);
// 设置
vmSiteList.$refs.xGrid.setCheckboxRow(
  [vmSiteList.SiteInfoList[1], vmSiteList.SiteInfoList[2]],
  true
);
// 设置所有
vmSiteList.$refs.xGrid.setAllCheckboxRow(true);

// 清空
vmSiteList.$refs.xGrid.clearCheckboxRow();
// 获取
vmSiteList.$refs.xGrid.getCheckboxRecords();
```

html 插槽用 vxe-table

完整 用 vxe-grid

```html
<vxe-table
  border
  height="100%"
  align="center"
  :data="dataAll"
  :tree-config="{transform: true, expandAll: false}"
>
  <vxe-column
    v-for="v in getColumn"
    :key="v.field"
    :field="v.field"
    :title="v.title"
    :tree-node="v.treeNode"
  >
    <template slot="header">
      <span> {{v.title}} </span>
    </template>
    <template #default="{row}">
      <template v-if="v.field=='action'">
        <i-button v-show="row['action']" type="text" @click="goAudit(row)">
          去审核
        </i-button>
      </template>
      <template v-else>
        <span> {{row[v.field]}} </span>
      </template>
    </template>
  </vxe-column>
</vxe-table>
```

```js
function getColumn() {
  const baseColumns = [
    { title: "站点名称", field: "pointName", treeNode: true },
    { title: "设备", field: "deviveName" },
    { title: "日期", field: "date" },
    { title: "数据有效率", field: "dataEfficient" },
    { title: "操作", field: "action" },
  ];
  const columns = baseColumns;

  return columns;
}
```

```html
<vxe-grid
  data-v-audit-table
  border
  resizable
  show-overflow
  show-header-overflow
  highlight-hover-row
  highlight-current-row
  ref="xGrid"
  height="100%"
  :columns="columns"
  :data="data"
  :row-config="{height: 52}"
  :scroll-x="{gt: 10,oSize: 2}"
  :scroll-y="{gt: 10,oSize: 2}"
></vxe-grid>
```

```js
function getColumn1() {
  const h = this.$createElement;
  let that = this;
  const { sortsDataHeader, pollutantDataHeader } = this.dataHeader;

  var VOCManyTableProps = {
    columns: [],
    data: [],
    resizable: true,
    border: true,
    showOverflow: true,
    showHeaderOverflow: true,
    highlightHoverRow: true,
    highlightCurrentRow: false,
    height: "300px",
    editConfig: { trigger: "click", mode: "row" },
  };

  const slots_default_span = ({ column, row }, h) => {
    const property = column.property;
    return [h("span", row[property])];
  };

  const slots_edit_input = ({ column, row }, h) => {
    const property = column.property;
    return [
      h("Input", {
        props: {
          value: row[property],
        },
        on: {
          input: (val) => (row[property] = val),
        },
      }),
    ];
  };

  const baseColumns = [
    {
      title: " ",
      field: "selected",
      fixed: "left",
      align: "center",
      width: 40,
      slots: {
        default(e) {
          const { row } = e;

          return [
            h("Checkbox", {
              on: {
                "on-change": (e) => that.rowClick(e, row),
              },
              props: {
                value: row.selected,
              },
            }),
          ];
        },
      },
    }, // type: index expand selection
    {
      title: "时间",
      field: "monitorTime",
      fixed: "left",
      width: 150,
      align: "center",
      editRender: {},
      slots: {
        default: slots_default_span,
        edit: slots_edit_input,
      },
    },
    {
      title: "数据有效率",
      field: "dataEfficient",
      fixed: "left",
      width: 150,
      align: "center",
      slots: {
        default(p) {
          const { row, column } = p;
          const field = column["property"];
          // const cell = row[key] || {};
          // 质控数据
          const { isQuality, isEffectiveness } = row;
          let isQualityText = "";
          if (isQuality) {
            isQualityText = h("img", {
              style: {
                height: "20px",
                width: "20px",
                "vertical-align": "sub",
              },
              attrs: {
                src: "development/page/DataAudit/images/quality.png",
              },
            });
          }

          let color = "";
          if (isEffectiveness == false) color = "red"; // 有效率小于 75%.
          let style = { color };

          const text = row[field];
          return [
            h(
              "div",
              {
                style,
                class: ["table1__cell"],
              },
              [isQualityText, text]
            ),
          ];
        },
      },
    },
  ];

  let columns = [];

  const sortCodes = this.sortCodes;
  // 组分
  for (let hIndex = 0; hIndex < sortsDataHeader.length; hIndex++) {
    const header = sortsDataHeader[hIndex];

    if (sortCodes.indexOf(header.PollutantCode) == -1) continue;

    const tem = {
      align: "center",
      title: header.PollutantName,
      field: header.PollutantCode,
      width: 150,
    };

    if (header.PollutantCode == "TVOC") tem.fixed = "left";

    columns.push({
      ...tem,
      slots: {
        default(p) {
          const { row, column } = p;
          const cell = row[column["property"]] || {};
          const { pollutantCode, pollutantName, pollutantValue } = cell;

          let color = "";
          if (+pollutantValue < 1) color = "red";
          let style = { color };

          console.log("pollutantValue: ", pollutantValue);

          return [
            h(
              "div",
              {
                style,
                class: ["table1__cell"],
              },
              [cell.pollutantValue]
            ),
          ];
        },
      },
    });
  }

  // 刷选因子
  const codes = this.searchFormData.pollutionCodes;
  // 因子
  for (let hIndex = 0; hIndex < pollutantDataHeader.length; hIndex++) {
    const header = pollutantDataHeader[hIndex];
    if (codes.indexOf(header.PollutantCode) == -1) continue;
    columns.push({
      title: header.PollutantName,
      field: header.PollutantCode,
      width: 150,
      align: "center",
      slots: {
        header(p) {
          const { column } = p;

          return [
            h(
              "div",
              {
                class: ["header123"],
              },
              [
                h("Checkbox", {
                  on: {
                    "on-change": (e) => that.colClick(e, column, hIndex),
                  },
                  props: {
                    value: header.selected,
                  },
                }),
                column.title,
              ]
            ),
          ];
        },
        default(p) {
          const { row, column } = p;
          const cell = row[column["property"]] || {};
          const { exceptRason, isArtificial, flag, repairTypeId } = cell;

          // 标识 Flag
          let flagText = "";
          let backgroundColor = "";
          if (flag == "RM") {
            flagText = `(${flag})`;
            backgroundColor = "red";
          }
          if (flag == "AD") {
            flagText = `(${flag})`;
            backgroundColor = "#ff9900"; // 橙色
          }

          // 人工审核
          let isArtificialText = "";
          if (isArtificial) {
            isArtificialText = h("img", {
              style: {
                "vertical-align": "sub",
              },
              attrs: {
                src: "development/page/DataAudit/images/artificial.png",
              },
            });
          }

          // [2]
          let value = cell.pollutantValue;
          let repairValText = "";
          if (repairTypeId == "1") {
            value = cell.repairVal; // 重积分放外面
            repairValText = `[${cell.pollutantValue}]`;
          }

          // 备注
          let exceptRasonText = "";
          if (exceptRason) {
            exceptRasonText = exceptRason;
          }

          // 样式
          let style = {
            border: cell.selected ? "1px solid blue" : "", // 选中
            backgroundColor,
          };

          // console.count('render')

          return [
            h(
              "div",
              {
                style,
                class: ["table1__cell", "select-cell-td"],
                attrs: {
                  title: exceptRasonText,
                  "data-rowindex": row.rowindex,
                  "data-key": column.property,
                },
                on: {
                  click: () => that.cellClick(row, column),
                },
              },
              [isArtificialText, value, repairValText, flagText]
            ),
          ];
        },
      },
    });
  }

  // columns.push({ title: ' ' });

  let heanderNext = baseColumns.concat(columns);
  console.log("heanderNext: ", heanderNext);

  return heanderNext;
}
```

## demo

```html
<div style="margin-top:10px;flex:1;overflow: auto;">
  <vxe-grid
    ref="xGrid"
    :columns="vxeGrid.columns"
    :data="filterVxeData"
    v-bind="vxeGrid.props"
    @checkbox-all="checkboxAll"
    @checkbox-change="checkboxChange"
  ></vxe-grid>
</div>
```

```js
vm = {
  data: {
    vxeGrid: {
      columns: [
        {
          type: "checkbox",
          width: 60,
          align: "center",
        },
        {
          title: "时间",
          field: "monitorTime",
          align: "center",
        },
      ],
      data: [],
      props: {
        rowConfig: {
          height: 40,
          isCurrent: true,
          isHover: true,
          resizable: true,
        },
        scrollX: {
          gt: 10,
          oSize: 2,
        },
        scrollY: {
          gt: 10,
          oSize: 2,
        },
        border: true,
        height: "100%",
        showHeaderOverflow: true,
        showOverflow: true,
        checkboxConfig: {
          checkField: "_checked",
          trigger: "row",
        },
      },
    },
  },
  methods: {
    checkboxAll(p) {
      console.log(p);
      // this.table.data.forEach((item) => {
      //   item._checked = p.checked;
      // });
    },
    checkboxChange(p) {
      console.log(p);
      // Object.assign(p.row, {
      //   _checked: p.checked,
      // });
    },
    resetTable() {
      this.vxeGrid.data.forEach((item) => {
        item._checked = false;
      });
    },
  },
  computed: {
    filterVxeData() {},
    pageVxedata() {},
  },
};
```

## 滚动条 vue2

```less
.vxe-table {
  .vxe-body--column > .vxe-cell {
    padding: 1px;
    width: 100% !important;
  }

  /* 滚动条 start */

  .vxe-table--body-wrapper.body--wrapper {
    &::-webkit-scrollbar {
      width: 8px;
      height: 8px;
      background-color: #f5f5f5;
    }

    &::-webkit-scrollbar-track {
      box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
      border-radius: 8px;
      background-color: #f5f5f5;
    }

    &::-webkit-scrollbar-thumb {
      border-radius: 8px;
      box-shadow: inset 0 0 8px rgba(0, 0, 0, 0.3);
      background-color: #555;
    }
  }

  // 表头字体颜色
  .vxe-table .vxe-table--header-wrapper {
    color: red;
  }
  // 表头背景色
  .vxe-table--render-default.border--none .vxe-table--header-wrapper {
    background-color: transparent;
  }
  // 表头分割线
  .vxe-header--column .vxe-resizable.is--line:before {
    width: 1px;
    height: 50%;
    background-color: #3e5059;
  }

  // 表格 body 字体颜色
  .vxe-table--render-default {
    color: red;
  }
  // 表格 body 背景色
  .vxe-table--render-default .vxe-table--body-wrapper {
    background-color: transparent;
  }
}
```
## setup vue2

## vxe-grid setup vue3

- table action 

```ts ./type.ts TableActionData
export type TableActionType = "edit" | "del";
export type TableActionData = { type: TableActionType, row: TaskTypeGetTaskTypeListItem; };
```
- columns
```ts data.ts columns
import type { VxeColumns } from "@/types";
import type { TableActionData } from "./type";

export const columns: VxeColumns<TableActionData["row"]> = [
  {
    title: "类型编码",
    field: "code",
    align: "center",
  },
  {
    title: "类型名称",
    field: "name",
    align: "center",
  },
  {
    fixed: "right",
    width: 250,
    title: "操作",
    align: "center",
    slots: {
      default: "action",
      // default: ({ row, column }) => {
      //   column.field;
      // },
    },
  },
];
```
- Vxe types
```ts @types/index.ts VxeSlotParams VxeColumns
import type { VxeGridSlots, VxeTableDataRow, VxeTableDefines } from "vxe-table";

// vxe-table 的 column 配置项

// VxeGridProps["columns"]
// VxeGridPropTypes.Columns<FormTableItem>

export interface VxeColumn<D = VxeTableDataRow, K extends string = never> extends VxeTableDefines.ColumnOptions<D> {
  field?: (keyof D extends string ? keyof D : string) | K;
}

export type VxeColumns<D = VxeTableDataRow, F extends string = never> = VxeColumn<D, F>[];


// vxe-table 的 slots
type VxeSlotFn<D = VxeTableDataRow> = VxeGridSlots<D>[string];
export type VxeSlotParams<D = VxeTableDataRow> = Parameters<VxeSlotFn<D>>[0];
```
- vxe-grid
```html vxe-grid
<vxe-grid ref="xGrid" :columns="columns" :data="props.dataSource" v-bind="table.props">
  <template #action="{ row }:SlotParams">
    <a-button :disabled="row.State!==1" size="small" type="link" @click="action('start', row)">开始</a-button>
    <a-button :disabled="row.State!==4" size="small" type="link" @click="action('download', row)">下载</a-button>
    <a-popconfirm cancel-text="否" ok-text="是" title="确定删除?" @confirm="action('del', row)">
      <a-button size="small" type="link">删除</a-button>
    </a-popconfirm>
  </template>
</vxe-grid>
```
- MainTable.vue - setup
```ts setup

import type { VxeSlotParams } from "@/types";
import type { TableActionData } from "./type";
import { reactive, ref } from "vue";
import { columns } from "./data";

type Row = TableActionData["row"];
type Type = TableActionData["type"];

type SlotParams = VxeSlotParams<Row>;

const props = defineProps<{
  dataSource: Row[];
}>();

const table = reactive({
  // columns: columns,
  // data: props.dataSource,
  props: {
    rowConfig: {
      height: 40,
      isCurrent: true,
      isHover: true,
      resizable: true,
    },
    checkboxConfig: {
      // checkField: "_checked",
      trigger: "cell",
    },
    scrollX: {
      gt: 10,
      oSize: 2,
    },
    scrollY: {
      gt: 10,
      oSize: 2,
      enabled: false,
    },
    border: true,
    height: "100%",
    showHeaderOverflow: true,
    showOverflow: true,
    resizable: true,
    // showHeaderOverflow: true,
    // showOverflow: true,

  },
});


// 方法

const emit = defineEmits<{
  (event: "action", data: TableActionData)
}>();

function action(type: Type, row: Row) {
  emit("action", { row, type });
}

const xGrid = ref<any>(null);

function getChecked() {
  return xGrid.value.getCheckboxRecords() as Row[];
}

function clearChecked() {
  xGrid.value.clearCheckboxRow();
}

defineExpose({
  getChecked,
  clearChecked,
});


```

## vxe-pager setup vue3

- .vue
```vue

<vxe-pager v-bind="pageState"></vxe-pager>   

<script lang="ts" setup> 
const pageState = usePageState({
  onPageChange:(e) => {
    if (e.type === "current") {
      search();
    } else {
      pageState.currentPage = 1;
      search();
    }
  }
});
</script>
```
- userPageState
```ts useForm.ts usePageState
import type { VxePagerEvents } from "vxe-table";
interface PageState {
  currentPage: number;
  pageSize: number;
  pageSizes: number[];
  total: number;
  onPageChange?: VxePagerEvents.PageChange;
}

export function usePageState(conf?: Partial<PageState>): UnwrapRef<PageState> {
  let defaultState: PageState = {
    currentPage: 1,
    pageSize: 20,
    pageSizes: [10, 20, 50, 100],
    total: 0,
  };
  return reactive(Object.assign(defaultState, conf));
}

type R<T> = Ref<T> | UnwrapRef<T> | T;

export function usePageData(data: R<unknown[]>, pageState: R<PageState>) {
  return computed(() => {
    const state = unref(pageState);
    return unref(data).slice((state.currentPage - 1) * state.pageSize, state.currentPage * state.pageSize);
  });
}

```


```css

.dark-vxe-grid {
    background-color: #303a4e;

    .vxe-header--gutter {
      background-image: unset !important;
    }

    .vxe-table--render-default {
      color: #a5abb0;
    }

    .vxe-table .vxe-table--header-wrapper {
      color: #a5abb0;
    }

    th, td {
      background-color: #303a4e;
    }

    .vxe-table--render-default.border--default .vxe-body--column {
      background-image: unset;
    }

    .vxe-table--border-line {
      display: none;
    }

    .vxe-table--header-wrapper .vxe-table--header-border-line {
      display: none;
    }

    .vxe-header--column .vxe-resizable.is--line:before {
      background-color: #404f57;
    }

    /* 隔行换色 */

    .vxe-body--row:nth-child(2n) td {
      background-color: #3e485a;
    }


    /* 滚动条 start */

    .vxe-table--body-wrapper.body--wrapper::-webkit-scrollbar {
      width: 6px;
      height: 6px;
      background-color: #555;
    }

    /*定义滚动条轨道 内阴影+圆角*/

    .vxe-table--body-wrapper.body--wrapper::-webkit-scrollbar-track {
      box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
      border-radius: 10px;
      background-color: #555;
    }

    /*定义滑块 内阴影+圆角*/

    .vxe-table--body-wrapper.body--wrapper::-webkit-scrollbar-thumb {
      border-radius: 10px;
      box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
      background-color: #f5f5f5;
    }

    .vxe-table--body-wrapper {
      background-color: transparent;
    }
  }

```


## 拖动排序

https://jsrun.net/wKzKp


## 行转列

```js
// --run--
const headInfo = [
  { title: "id", key: "id" },
  { title: "name", key: "name" },
  { title: "age", key: "age" },
];

const data = [
  { id: 0, name: "张0", age: 20 },
  { id: 1, name: "张1", age: 21 },
  { id: 2, name: "张2", age: 22 },
  { id: 3, name: "张3", age: 23 },
];

// 生成表头信息
const idHeadInfo = data.map((item, index) => ({
  title: item.id,
  key: `_${index}`,
}));

// 行转列操作
const data2 = headInfo.map(({ key }) =>
  data.reduce((acc, row, index) => {
    acc[`_${index}`] = row[key];
    return acc;
  }, {}),
);

console.log(idHeadInfo);
console.log(data2);

```