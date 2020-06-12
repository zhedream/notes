# component

## 三种创建组件的方法

函数组件 和 class 组件
class 组件又有 ES6 的 class 和 React.createClass 两种形式

所有组件类都必须有自己的 render 方法，用于输出组件。
组件类的第一个字母必须大写, 只能包含一个顶层标签

组件的用法与原生的 HTML 标签完全一致 比如 <HelloMessage name="John">
组件的属性可以在组件类的 this.props 对象上获取, 如: this.props.name
添加组件属性，有一个地方需要注意，就是 class 属性需要写成 className ，for 属性需要写成 htmlFor
这是因为 class 和 for 是 JavaScript 的保留字。

提取组件, 尽可能的提取出 公共通用的组件.

## Props 
Props 的只读性. 要保护 props 不被更改
PropTypes和getDefaultProps

## ref
<input type="text" ref="myTextInput" />
this.refs.['myTextInput']
须获取真实的 DOM 节点

## state
有组件自身管理的数据就是 state
状态数据

## 生命周期

1. 生命周期图例
https://projects.wojtekmaj.pl/react-lifecycle-methods-diagram/

constructor 构造函数
componentdidmount 挂载完成
componentdidupdate 更新完成
componentWillUnmount 卸载前

## 参考

1. React.createClass 和 extends Component 的区别
   https://segmentfault.com/a/1190000005863630
