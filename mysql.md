
# MySQL

# sql慢日志查询
link: http://blog.51yip.com/mysql/972.html

```sql
-- 查看一下默认为慢查询的时间10秒
show variables like "%long%";
-- 设置成2秒，加上global,下次进mysql已然生效
set global long_query_time=2;
-- 查看一下慢查询是不是已经开启 
show variables like "%slow%";
-- 启用慢查询  
set global slow_query_log='ON'; 
```


```sql
set global long_query_time=0.001;
set global slow_query_log='ON';
show variables like "%long%";
show variables like "%slow%";
```

设置完 需重启 MySQL 服务


### docker
docker 内部重启 mysql的指令
mysqld restart

## sql_mode=only_full_group_by
```sql

select @@sql_mode;
show variables like "%sql%";

set sql_mode='STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION';
set @@sql_mode='STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION';
set variables sql_mode='STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION';

```
### mysql连接
mysql -u 用户名 -p密码 -h 服务器IP地址 -P 服务器端MySQL端口号 -D 数据库名