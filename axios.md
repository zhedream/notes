# axios

## cancelToken
一次请求的钩子函数, 用于结束请求
Cancel {message: undefined}

## 参考
1. axios请求缓存+防止重复提交
https://segmentfault.com/a/1190000013167994


service.js
```js

import axios from 'axios'
import router from './router';

// 创建 axios 实例
export const service = axios.create({
  baseURL: '/api/', // api base_url
  timeout: 100000,// 请求超时时间
})

//请求拦截
service.interceptors.request.use(config => {
  if (config.method === 'post') {
    if (localStorage.token) {
      config.url = config.url + "?authorCode=" + localStorage.SET_CODE
      config.headers['accesskey'] = localStorage.SET_CODE; // 让每个请求携带token--['X-Token']为自定义key 请根据实际情况自行修改
    }
  }
  return config
}, error => {
  return Promise.reject(error)
})

// response 拦截器
service.interceptors.response.use(
  response => {
    if (response.data.requstresult == "-1") {
      return router.push("/login")
    }
    return response;
  },
  error => {
    return Promise.reject(error);
  });

export default service;

```

api.js
```js

export function GetTaskTimeList(params, that) {
  if (that && that.cancelTaskTimeList) {
    that.cancelTaskTimeList('取消上次请求:GetTaskTimeList')
  }
  return service({
    method: 'post',
    url: '/Task/GetTaskTimeList',
    data: params,
    cancelToken: new axios.CancelToken(function executor(c) { // 设置 cancel token
      if (that) {
        that.cancelTaskTimeList = c
      }
    })
  })
}

```


main.js
```js

GetTaskTimeList(params, GetTaskTimeList)
.then(e => {
  if (Axios.isCancel(e)) {
    console.info(e.message);
    return;
  }
  let { data } = e;
  let { TimeList, TaskResult } = data.data;
  this.taskDays.clear(); // 有任务的日期
  TimeList.forEach(item => {
    this.taskDays.add(item); // 红点日期
  });
  this.allTask = TaskResult;
  // console.log(this.taskDays);
  this.GetTaskList(); // 选择日期的任务
})
.catch(e => console.log(e));
```