# BFC

## 什么是 FC？

`Formatting Context`，格式化上下文，指页面中一个渲染区域，拥有一套渲染规则，它决定了其子元素如何定位，以及与其他元素的相互关系和作用。

## 什么是 BFC

`Block Formatting Contex`t，块级格式化上下文，一个独立的块级渲染区域，该区域拥有一套渲染规则来约束块级盒子的布局，且与区域外部无关。

产生一个,独立的 CSS 作用域

就像 js 代码中, 可以使用 { } 花括号 定义一个块级作用域, 可以不受外部影响

## BFC 的约束规则

1. 内部的 BOX 会在垂直方向上一个接一个的放置；
2. 垂直方向上的距离由 margin 决定。（完整的说法是：属于同一个 BFC 的俩个相邻的 BOX 的 margin 会发生重叠，与方向无关。）
3. 每个元素的左外边距与包含块的左边界相接触（从左到右），即使浮动元素也是如此。（这说明 BFC 中的子元素不会超出它的包含块，而 position 为 absolute 的元素可以超出它的包含块边界）；
4. BFC 的区域不会与 float 的元素区域重叠；
5. 计算 BFC 的高度时，浮动子元素也参与计算；
6. BFC 就是页面上的一个隔离的独立容器，容器里面的子元素不会影响到外面的元素，反之亦然；

## BFC 的应用

防止 margin 发生重叠
防止发生因浮动导致的高度塌陷

## 怎么生成 BFC

1. float 的值不为 none；
1. overflow 的值不为 visible；
1. display 的值为 inline-block table-cell table-caption；
1. position 的值为 absolute 或 fixed；
1. display：table 也认为可以生成 BFC？其实是在于 Table 会默认生成一个匿名的 table-cell，正是这个匿名的 table-cell 生成了 BFC。



摘自: css 布局的各种 FC 简单介绍：BFC，IFC，GFC，FFC
https://segmentfault.com/a/1190000014886753#item-2-1