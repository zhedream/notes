
`
<my-component v-model="value" @change="" />
`

// 异步数据, 数据在组件内维护
let vm = {
  name: 'my-component',
  props: ['value', 'labelInValue'],
  data: {
    valueInner: '',
  },
  watch: {
    value(valueNext) {
      this.valueInner = valueNext;
      console.log('checkAllGroupChange3: ',);
      this.changeState(); // 变更状态
    }
  },
  created() {
    this.getData();
  },
  methods: {

    click() {
      this.$emit('input', this.valueInner);
    },

    // 变更回流, 后执行
    changeState() {

      // valueInner => 状态

      this.$emit('change', this.selectOptions[0])

    },

    // 获取数据后, 触发一个
    getData() {

      this.changeState();
    },

  },




}