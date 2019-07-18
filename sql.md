# SQL笔记
2019年07月04日 报表
1. 分组 count   与  GROUP_CONCAT 不一致的问题
TAGs: SQL ,KEYs: count, GROUP_CONCAT
```sql
COUNT(*) cc,   -- 2
GROUP_CONCAT(
	 item,'-',value
) `aaas`, --  45-51
```
会发现 , item,'-',value   仅仅 查出来 一组 数据, 但是  COUNT(*)   统计显示  2  
```sql
COUNT(*) cc1,   ---  2
COUNT(item) cc2, --- 2
COUNT(value) cc3, --   1
GROUP_CONCAT(
	 item
) `aaas`,  --     45,79
GROUP_CONCAT(
	 item,'-',value
) `aaas`, --  45-51
```
原因就是  俩数据 中  有一条 数据 value   是  NULL 的,GROUP_CONCAT 不会连接
还有注意的坑  GROUP_CONCAT  长度有限制