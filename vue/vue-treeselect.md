# vue-treeselect

下拉选择树

中文
https://www.vue-treeselect.cn/
英文
https://vue-treeselect.js.org/

```html
<treeselect
  v-model="formModel.PointIDs"
  :limit="3"
  :multiple="true"
  :options="options"
  :normalizer="normalizer"
  :default-expand-level="1"
  placeholder="请选择"
  value-consists-of="LEAF_PRIORITY"
>
</treeselect>
```

default-expand-level="1" 默认 0  Infinity 

```js
function normalizer(node) {
  return {
    id: node.value,
    label: node.label,
    children: node.children,
  };
}
```
