# 登录

psql -U postgres -h localhost -d crm_restored

# pg 指令

| 指令    | 作用         |
| ------- | ------------ |
| \l      | 查看所有库   |
| \c      | 切换库       |
| \d      | 查看所有表   |
| \d 表名 | 查看表结构   |
| \dt     | 查看所有表   |
| \du     | 查看所有用户 |
| \dn     | 查看所有模式 |
| \q      | 退出         |

# 创建库表

```sql
-- 创建库
CREATE DATABASE crm_learning;

-- 创建表
CREATE TABLE customers (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  phone VARCHAR(20) UNIQUE,
  address TEXT,
  balance NUMERIC(12, 2) DEFAULT 0,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 增加字段
ALTER TABLE customers ADD COLUMN remark TEXT;

-- 修改字段类型
ALTER TABLE customers ALTER COLUMN name TYPE VARCHAR(200);

-- 删除字段
ALTER TABLE customers DROP COLUMN remark;

-- 删除表（危险操作）
DROP TABLE customers;

-- 删除库（危险操作）
DROP DATABASE IF EXISTS crm_learning;


```

## 分配库和表的权限

```sql
CREATE DATABASE crm_savepoint_test OWNER crm_app;
\c crm_savepoint_test
ALTER SCHEMA public OWNER TO crm_app;
```

```bash
# 测试创建表和删除表
psql "postgresql://crm_app:密码@127.0.0.1:5432/crm_test" -c "CREATE TABLE _probe(id int); DROP TABLE _probe;"
```

## 类型

| PG 类型          | 作用               | 重点               |
| ---------------- | ------------------ | ------------------ |
| INTEGER / BIGINT | 整数               | 主键、数量         |
| VARCHAR(n)       | 限长字符串         | 姓名、编号         |
| TEXT             | 字符串             | 描述、备注         |
| NUMERIC(12,2)    | 精确小数           | 金额               |
| BOOLEAN          | 布尔值             | TRUE / FALSE       |
| TIMESTAMPTZ      | 带时区语义的时间戳 | 创建时间           |
| JSONB            | JSON 二进制表示    | 动态规格、扩展字段 |
| UUID             | UUID 分布式标识    |                    |

# 数据操作

```sql
-- 开始事务
BEGIN;

-- 插入数据
INSERT INTO customers (name, phone, address, balance, is_active) VALUES ('John Doe', '1234567890', '123 Main St, Anytown, USA', 1000, TRUE);

-- 查询数据
SELECT * FROM customers;

-- 更新数据
UPDATE customers SET balance = 1000 WHERE id = 1;

-- 删除数据
DELETE FROM customers WHERE id = 1;

-- 提交事务
COMMIT;

-- 回滚事务
ROLLBACK;

```

# 用户权限

```sql
CREATE USER crm_app WITH PASSWORD 'AppDemo_123!';
CREATE USER crm_reader WITH PASSWORD 'ReaderDemo_123!';

-- 允许连接数据库
GRANT CONNECT ON DATABASE crm_learning TO crm_app, crm_reader;

-- 允许访问 Schema
GRANT USAGE ON SCHEMA public TO crm_app, crm_reader;

-- 授予已有表的只读权限
GRANT SELECT ON ALL TABLES IN SCHEMA public TO crm_reader;

-- 授予表的增删改查权限

GRANT SELECT, INSERT, UPDATE, DELETE
ON ALL TABLES IN SCHEMA public
TO crm_app;

-- 授予序列的权限
GRANT USAGE ON ALL SEQUENCES IN SCHEMA public
TO crm_app;

```

# 备份

```bash
# 备份
pg_dump -U postgres -h localhost -Fc -f "D:\crm_learning.backup" crm_learning

# 查看备份内容

# 创建新库
psql -U postgres -h localhost -d postgres -c "CREATE DATABASE crm_restored;"

# 恢复到新库
pg_restore -U postgres -h localhost -d crm_restored "D:\crm_learning.backup"
```
