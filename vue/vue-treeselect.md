# vue-treeselect

下拉选择树

中文
https://www.vue-treeselect.cn/
英文
https://vue-treeselect.js.org/

```html
<treeselect
  v-model="addStateFormData.StateCodeArr"
  :limit="1"
  :options="addStateFormStateCode"
  :default-expand-level="1"
  placeholder="请选择状态参数"
  value-consists-of="LEAF_PRIORITY"
  :normalizer="StateCodeNormalizer"
  multiple
>
</treeselect>

<treeselect
  v-model="formModel.PointIDs"
  :limit="3"
  :options="options"
  :normalizer="normalizer"
  :default-expand-level="1"
  placeholder="请选择"
  value-consists-of="LEAF_PRIORITY"
  multiple
>
</treeselect>

<treeselect
  v-model="pointList"
  :limit="0"
  :multiple="true"
  :default-expand-level="1"
  :clearable="false"
  :backspaceRemoves="false"
  :deleteRemoves="false"
  :clearOnSelect="false"
  :options="controlData"
  :normalizer="normalizer"
  placeholder="输入站点名称..."
  value-consists-of="LEAF_PRIORITY"
  @input=""
>
</treeselect>
```

default-expand-level="1" 默认 0 Infinity

options 是一个数组, 多叉树

```js options
[
  {
    id,
    label,
    chilren,
  },
];
```

```js
function normalizer(node) {
  return {
    id: node.value,
    label: node.label,
    children: node.children,
  };
}
```

## 坑

No sub-options

https://github.com/riophae/vue-treeselect/issues/152

```js
function handleData(data) {
  function delEmptyChildren1(nodes) {
    if (!nodes) return;
    if (!nodes.length) return;

    nodes.forEach((node) => {
      console.log("node: ", node.label);
      if (node.children == null || !node.children.length) {
        // console.log('删除空 children');
        delete node.children;
      } else {
        // console.log('非空孩子');
        delEmptyChildren(node.children);
      }
    });
  }

  function delEmptyChildren2(node) {
    if (node == undefined) return;

    console.log(node.label);

    if (node.children && node.children.length) {
      // console.log('有 孩子');
      node.children.forEach((node) => {
        delEmptyChildren2(node);
      });
    } else {
      // delete node.children;
      // console.log('删除空 children');
    }
  }

  delEmptyChildren1(data);

  // data.forEach((node) => delEmptyChildren2(node));

  return data;
}
```
