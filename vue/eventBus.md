# EventBus

```js
// eventBus.js -- 单例
import Vue from 'vue'
import { Subject } from 'rxjs'

export const eventBus = new Vue();
export const subject = new Subject(); // rxjs

let someData = []; // 模块私有变量 闭包

// 箭头函数不能 绑定 this -- 把又长又臭的 option 写这里
export const getEchartOption = (params)=>{
    let {a,b,c} = params
    return {
        ...
    }
}

// 注意: 需要 bind(this) 用非箭头函数 function
export const getEchartOption = function(params){
    let {a,b,c} = params
    return {
        ...
    }
}

```

```js
// parent.vue
import {eventBus,subject} from './eventBus.js'

// 派发数据
eventBus.$emit('click',data)
subject.next(data);

```

```js
// son.vue
import {eventBus,subject} from './eventBus.js'

// 接收数据
eventBus.$on('click',(data)=>{
    console.log(data);
}))
let sub = subject.subscribe((data)=>{
    console.log(data);
})

// beforeDestroy
sub.unsubscribe(); // 取消订阅

```

# 参考
https://segmentfault.com/a/1190000013636153

