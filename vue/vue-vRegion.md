# v-region 城市选择器

https://terryz.github.io/vue/#/region/demo

```html
<v-region v-model="formData.RegionCode"></v-region>
```

```js
const data = ["350000", "", ""];
this.selected.province = data[0];
this.selected.city = data[1];
this.selected.area = data[2];
this.selected.town = data[3]; // 必须有, 可为空

let { province, city, area } = formData.RegionCode;
formData.RegionCode = [province, city, area].join(",");

let [province, city, area] = row.RegionCode;
row.RegionCode = { province, city, area, town: undefined };
```
