# v-region 城市选择器

https://terryz.github.io/vue/#/region/demo

type: select-(default) text group column city

type: 'select', 'group', 'text', 'column'
{
province: '350000',
city: '350100',
area: '350103',
town: '350103012'
}, // 可为 null
{
province: null,
city: null,
area: null,
town: null
}, // 可为 null

type: city, code []

```html
<v-region v-model="formData.RegionCode"></v-region>

<v-region :value="formData.RegionCode" type="column" @values="regionChange">
</v-region>
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

var vm = {
  // 与 @values 会死循环,  但是没有 面板关闭的事件, 应该可以解决问题
  // 只能 数据 手动处理, 在获取 或提交的时候
  // filters: {
  //   regionArrToObj: function (arr) {
  //     let [province, city, area, town] = arr;
  //     return { province, city, area, town };
  //   },
  // },
  methods: {
    regionArrToObj(arr) {
      let [province, city, area, town] = arr;
      return { province, city, area, town };
    },
    regionObjToArr(obj) {
      let { province, city, area, town } = obj;

      return [province, city, area, town];
    },
    // regionChange(e) {
    //   let { province, city, area } = e;
    //   province = province && province.key;
    //   city = city && city.key;
    //   area = area && area.key;
    //   this.searchData.RegionCode = [province, city, area];
    // },
  },
};
```
