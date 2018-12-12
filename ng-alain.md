##



### 创建模块
ng g ng-alain:module sys
还需要至 
src/app/routes/routes-routing.module.ts
文件内注册新建的业务模块：
### 创建组件、页面
ng g ng-alain:list sim -m=manage
### 子组件
ng g ng-alain:view view -m=manage -t=sim

ng g ng-alain:view view -m=project -t=site