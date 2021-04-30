# vue-treeselect

下拉选择树

中文
https://www.vue-treeselect.cn/
英文
https://vue-treeselect.js.org/

```html 普通多选,非树
<treeselect
  @input="input"
  v-model="formData.BJYY"
  :disabled="disabled"
  :limit="3"
  :options="options"
  :normalizer="normalizer"
  :default-expand-level="1"
  placeholder="请选择"
  value-consists-of="LEAF_PRIORITY"
  :clearable="false"
  :backspace-removes="false"
  :delete-removes="false"
  :clear-on-select="false"
  :z-index="999"
  append-to-body
  multiple
>
</treeselect>

<script>
  var options = [{ label, value }];
  function normalizer(node) {
    return {
      id: node.value,
      label: node.label,
      children: node.children,
    };
  }
</script>
```

````html
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
  limitText="+"
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
````

default-expand-level="1" 默认 0 Infinity

options 是一个数组, 多叉树

```js original options
[
  {
    id,
    label,
    chilren,
  },
];
```

```js normal options
[
  {
    value,
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

## 样式

```css
/* == 下拉树样式 treeselect */
.vue-treeselect {
  display: inline-block;
  vertical-align: middle;
  line-height: initial;
}

.vue-treeselect__multi-value-item {
  background: #f7f7f7;
  color: #495060;
}

.vue-treeselect__value-remove {
  color: #666;
}

/* .vue-treeselect__multi-value {
            height: 25px;
            overflow-y: auto;
        } */
```

## 坑

vue-treeselect 爬坑之路
https://www.jianshu.com/p/6d20834352be

### limitText

and more 不生效

修改源码

### No sub-options

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
