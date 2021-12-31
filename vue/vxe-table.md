# vxe-table

https://xuliangzhan_admin.gitee.io/vxe-table/#/table/start/install

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
