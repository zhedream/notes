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

## 滚动条

```less
.vxe-table {
  .vxe-body--column > .vxe-cell {
    padding: 1px;
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


## setup


```html
<vxe-grid ref="xGrid" :columns="columns" :data="props.dataSource" v-bind="table.props">
  <template #action="{ row }">
    <a-button :disabled="row.State!==1" size="small" type="link" @click="action('start', row)">开始</a-button>
    <a-button :disabled="row.State!==4" size="small" type="link" @click="action('download', row)">下载</a-button>
    <a-popconfirm cancel-text="否" ok-text="是" title="确定删除?" @confirm="action('del', row)">
      <a-button size="small" type="link">删除</a-button>
    </a-popconfirm>
  </template>
</vxe-grid>
```

```ts


import { reactive, ref } from "vue";
import { columns } from "./columns";

import type { PushHistoryTableActionData } from "./type";

type Row = PushHistoryTableActionData["row"];
type Type = PushHistoryTableActionData["type"];

const props = defineProps<{
  dataSource: Row[]
}>();

const table = reactive({
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


const emit = defineEmits<{
  (event: "action", data: PushHistoryTableActionData)
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

## 拖动排序

https://jsrun.net/wKzKp