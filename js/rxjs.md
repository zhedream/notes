# Rxjs
可以把 RxJS 当做是用来处理事件的 Lodash

## Observale
可观察对象- | 数据/事件源 生产线 | 一个可调用的未来值或事件的集合 | ES6 的 Generator 

fromEvent 与 subject ??  所以说, 普通 Observale 不能在外部 next 使用, 注: Observable.bindCallback 可转换函数, 类似 可实现外部 next

普通 Observale 存在疑问 与 多播 Subject

// https://cn.rx.js.org/manual/tutorial.html#h22
选择哪种方式需要根据场景。当你想要包装随时间推移产生值的功能时，普通的 Observable 就已经很好了。
使用 Subject，你可以从`任何`地方触发新事件，并且将已存在的 observables 和它进行连接。

## Pipe
操作员组合 | 管道 | 链接Operators

## Operators
操作员 | 操作符 | 链式调用 处理数据等
操作符是函数，它基于当前的 Observable 创建一个新的 Observable。这是一个无副作用的操作：前面的 Observable 保持不变。

本质是一个纯函数, so 可以自定义一个 Operators

## Subscription 
订阅 | 主要用于取消订阅 | 参考一下 setInterval | 用于连接可观察对象与观察者

## Observer
观察者 | 一个回调函数的集合 | 观察数据/事件的状态从而执行相应的方法

## Subject
主体 | 主题 | 相当于 EventEmitter，并且是将值或事件多路推送给多个 Observer 的唯一方式。
是一个特殊的 Observale. 也可以作为观察者, 作用:`中转` 数据/事件
Subject 是多播的, 可以支持多个 subscribe
普通Observer 是单播的. 每个已订阅的观察者都拥有 Observable 的独立执行??. 多次 subscribe 会报错么??? 待测试. `独立执行` 产生一个新的对象/事件? 占内存? 
普通Observable 不能 在外部next , Subject 能在外部产生新事件。
在 Subject 的内部，subscribe 不会调用发送值的新执行。它只是将给定的观察者注册到观察者列表中，类似于其他库或语言中的 addListener 的工作方式

## Schedulers 
调度器 | 用来控制并发并且是中央集权的调度员，允许我们在发生计算时进行协调，例如 setTimeout 或 requestAnimationFrame 或其他

```ts
class Demo{

    DemoObservable: Observable<string>;
    DemoSubscription: Subscription;

    constructor(){
        // 1. 数据源
        this.DemoObservable = of('1','2','3') // 立即产生三个数据
        this.DemoObservable = interval(1000) // 一秒产生一个数

        // 2. 产生下一条数据, 注: Observable 的 next 是产生数据, Subscription 则就收数据
        this.DemoObservable.next('4')

        // 3. 添加操作员
        const number = interval(1000)
        const changeNumber = map(val => '#' + val) // map 操作员 做一些事
        this.DemoObservable = changeNuber(number) // 返回一个新的 Observable

        // 4. 组合操作员
        const number = interval(1000)
        const changeNumber = pipe(
            filter((number:number)=>number % 2 !== 0), // 过滤操作员 过滤奇数值
            map(val => '#' + val) // map 操作员 做一些事
        )
        this.DemoObservable = changeNuber(number) // 返回一个新的 Observable

        // 5. 其他设置管道的方法
        this.DemoObservable = interval(1000).pipe(map(val => '#' + val));
        this.DemoObservable
            .pipe(filter((number:number)=>number % 2 !== 0))
            .subscription(val=>{
                console.log(val)
            })

        // 6. 产生数据
    }
    onClick(){
        const observer = {
            next: val =>console.log(val),
            error:err=>console.log(err),
            complete:()=> console.log('complete')
        }

        // this.DemoObservable.subscription(val=>console.log(val))
        this.DemoSubscription = this.DemoObservable.subscription(observer) // 类似定时器的
    }
    unSubscription(){
        this.DemoSubscription.unsubscribe() // 取消订阅
    }
}


```

