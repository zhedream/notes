## Anglar 使用

## 指令
ng seve --open  // 启动服务 且 打开浏览器
ng generate component heroes // 生成新的组件
ng generate service message // 创建服务
ng serve --port 4200 --host=192.168.2.219 // 内网访问
### 服务
你把数据访问逻辑重构到了 HeroService 类中。

@Injectable({
  providedIn: 'root'
})
？？


### 路由

ng generate module app-routing --flat --module=app




### 理解 模块 路由 组件 

#### 模块
是一个 作用域 盒子 
模块里的 组件 都应该 在模块 文件里注册 ， 这样 在 当前模块 范围内  才能且都能 使用
#### 路由
用来 操纵 盒子里 的组件 的东西
就像是 模块的触手
可以 调用 显示 隐藏 组件等
#### 组件
盒子里的实际 内容




###  遇到的问题

HTTP 部分
/home/lhz/wwwroot/ng-app/src/app/heroes/heroes.component.ts
增删改

/home/lhz/wwwroot/ng-app/src/app/hero.service.ts
private heroesUrl = 'api/heroes';  


## debug-vscode

安装 Debugger for Chrome 插件

### 打断点
F5 进行调试 会弹出 一个新的 浏览窗口
先 在需要打断点的地方 console.log   在 vscode 调试控制台可见
点击可跳转 到 一个 文件（特殊的一样的文件）
在里面 在进行 断点 即可

## 打包
ng build --prod

## 打包过大
https://stackoverflow.com/questions/53995948/warning-in-budgets-maximum-exceeded-for-initial
"budgets": [
   {
      "type": "initial",
      "maximumWarning": "2mb",
      "maximumError": "5mb"
   }
]

## 性能遍历渲染 trackBy

## 父子组件双向数据绑定

## 
