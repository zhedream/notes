# asd

```css
.a {
  word-break: break-all; /* 自动换行 */
}
.ellipsis {
  flex: 1;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
/* 一行显示否则省略号 */
.line-clamp1 {
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
}
/* 两行省略 */
.line-clamp2 {
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}
/* 两行省略 */
.ellipse {
  word-break: break-all;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  overflow: hidden;
}

/**less**/
.ellipse {
  word-break: break-all;
  text-overflow: ellipsis;
  display: -webkit-box;
  /*! autoprefixer: off */
  -webkit-box-orient: vertical;
  /*! autoprefixer: on */
  -webkit-line-clamp: 2;
  overflow: hidden;
}
```

# 参考

1. https://blog.csdn.net/qq_34159310/article/details/80912873
