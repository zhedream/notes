# FORM

```html
      <a-form layout='vertical' :form="pwdform">
        <a-form-item label='旧的密码'>
          <a-input type='password' v-decorator="['old',{
            rules: [
            { required: true, message: '必填项!' },
            ]
          }]"/>
        </a-form-item>
        <a-form-item label='新的密码'>
          <a-input type='password' v-decorator="['new',{
            rules: [
            { required: true, message: '必填项!' },
            ]
          }]" />
        </a-form-item>
        <a-form-item label='确认密码'>
          <a-input type='password' v-decorator="['repeat',{
            rules: [
            { required: true, message: '必填项!' },
            {validator: handleConfirmPassword}
            ]
          }]" />
        </a-form-item>
      </a-form>

```

```js
//  创建  vue 表单
  data() {
    return {
      pwdform: this.$form.createForm(this), // 修改密码 表单
    };
  },
      // 自定义验证
    handleConfirmPassword  (rule, value, callback)  {
        const { getFieldValue } = this.pwdform
        if (value && value !== getFieldValue('new')) {
            return callback('两次输入不一致！')
        }
        // Note: 必须总是返回一个 callback，否则 validateFieldsAndScroll 无法响应
      return  callback()
  }
    // 表单数据
    this.pwdform.validateFields((err, values) => {
        if (err) return;
        console.log('data: ', user,values);
        this.visible = false;
        this.pwdform.resetFields(); // 清空表单
    });
```
