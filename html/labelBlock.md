# label layout 行内块布局

```html
<div class="in-block">
  <span class="key width80">车辆:&nbsp;</span>
  <a-select
    style="width:100px"
    :allowClear="false"
    @change="carChange"
    v-model="selectCarNumber"
  >
    <a-select-option v-for="item in projectCars" :value="item" :key="item"
      >{{ item }}</a-select-option
    >
  </a-select>
</div>
```

```less
/* 行内块布局 */
.in-block {
  display: inline-block;
  .key {
    /* label */
    font-weight: 600;
    font-size: 15px;
    text-align: right;
  }
  .width80 {
    /* 固定宽度 */
    display: inline-block;
    width: 80px;
  }
}
```
