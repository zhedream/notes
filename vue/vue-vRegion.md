# v-region 城市选择器

https://terryz.github.io/vue/#/region/demo

```js
const data = ["350000", "", ""];
this.selected.province = data[0];
this.selected.city = data[1];
this.selected.area = data[2];
this.selected.town = data[3]; // 必须有, 可为空

const { province, city, area } = this.selected;
const arr = [province, city, area].join(",");
```
