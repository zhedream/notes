# UFW 防火墙完整指南

UFW (Uncomplicated Firewall) 是 Ubuntu 系统的简化防火墙管理工具，基于 iptables。

所有的 UFW 规则修改都是实时生效的.

启用防火墙前务必先允许SSH端口，避免锁定自己.

## 安装和基本操作

### 常用操作

```bash
ufw status
ufw enable
ufw disable
ufw status verbose

ufw show added
ufw show listening
ufw show raw

ufw allow 22
ufw allow 80
ufw allow 443
ufw deny 3000

ufw delete allow 80
ufw delete deny 3000

```

### 安装
```bash
sudo apt-get install ufw
```

### 启用防火墙
```bash
sudo ufw enable
```

### 禁用防火墙
```bash
sudo ufw disable
```

### 查看状态和规则
```bash
# 简单状态
sudo ufw status

# 详细状态 (显示端口号和策略)
sudo ufw status verbose

# 显示编号 (便于删除规则)
sudo ufw status numbered

# 查看所有规则 (包括IPv6)
sudo ufw show added

# 查看原始规则 (iptables格式)
sudo ufw show raw
```

### 查看现有防火墙规则的完整方法

#### UFW 层面查看
```bash
# 1. 基本状态查看
sudo ufw status
# 输出: Status: active/inactive

# 2. 详细状态 (推荐)
sudo ufw status verbose
# 显示: 规则详情、默认策略、日志状态

# 3. 带编号的规则列表
sudo ufw status numbered
# 显示: [ 1] 22/tcp ALLOW IN Anywhere

# 4. 查看所有已添加的规则
sudo ufw show added
# 显示: 所有通过ufw添加的规则

# 5. 查看监听规则
sudo ufw show listening
# 显示: 当前监听的端口和对应规则
```

#### 底层 iptables 查看
```bash
# 查看所有iptables规则
sudo iptables -L -n -v

# 查看INPUT链规则 (入站)
sudo iptables -L INPUT -n -v

# 查看OUTPUT链规则 (出站)
sudo iptables -L OUTPUT -n -v

# 查看FORWARD链规则 (转发)
sudo iptables -L FORWARD -n -v

# 查看NAT表规则
sudo iptables -t nat -L -n -v

# 以行号显示规则
sudo iptables -L --line-numbers
```

#### 系统端口和连接查看
```bash
# 查看监听端口
sudo netstat -tlnp          # TCP监听端口
sudo netstat -ulnp          # UDP监听端口
sudo netstat -tlnup         # 所有监听端口

# 使用ss命令 (更现代)
sudo ss -tlnp               # TCP监听
sudo ss -ulnp               # UDP监听
sudo ss -tlnup              # 所有监听

# 查看当前连接
sudo netstat -an            # 所有连接
sudo ss -an                 # 所有连接 (ss更快)

# 查看特定端口
sudo netstat -tlnp | grep :80
sudo ss -tlnp | grep :443
```

### 重置防火墙 (删除所有规则)
```bash
sudo ufw --force reset
```

## 基本规则管理

### 允许连接
```bash
# 允许特定端口
sudo ufw allow 22          # SSH
sudo ufw allow 80          # HTTP
sudo ufw allow 443         # HTTPS
sudo ufw allow 3000        # 自定义端口

# 指定协议
sudo ufw allow 80/tcp
sudo ufw allow 53/udp

# 允许端口范围
sudo ufw allow 1000:2000/tcp
```

### 拒绝连接
```bash
# 拒绝特定端口
sudo ufw deny 23           # Telnet
sudo ufw deny 3000          # 自定义端口

# 拒绝特定协议
sudo ufw deny 3000/tcp      # 自定义端口
```

### 删除规则
```bash
# 方法1: 按编号删除 (推荐)
sudo ufw status numbered   # 先查看编号
sudo ufw delete 2          # 删除编号为2的规则

# 方法2: 按规则内容删除
sudo ufw delete allow 80
sudo ufw delete deny 23
```

## 高级规则配置

### 基于IP地址的规则
```bash
# 允许特定IP访问
sudo ufw allow from 192.168.1.100

# 允许特定IP访问特定端口
sudo ufw allow from 192.168.1.100 to any port 22

# 允许IP段访问
sudo ufw allow from 192.168.1.0/24

# 拒绝特定IP
sudo ufw deny from 203.0.113.100
```

### 基于网络接口的规则
```bash
# 允许特定网卡的连接
sudo ufw allow in on eth0 to any port 80
sudo ufw allow out on eth1
```

### 应用程序配置文件
```bash
# 查看可用的应用配置
sudo ufw app list

# 允许应用程序
sudo ufw allow 'Nginx Full'    # Nginx (HTTP + HTTPS)
sudo ufw allow 'Nginx HTTP'    # 仅 HTTP
sudo ufw allow 'Nginx HTTPS'   # 仅 HTTPS
sudo ufw allow 'OpenSSH'       # SSH

# 查看应用配置详情
sudo ufw app info 'Nginx Full'
```

## 常用服务器配置

### Web服务器 (Nginx/Apache)
```bash
# 基本Web服务器配置
sudo ufw allow 22/tcp          # SSH管理
sudo ufw allow 80/tcp          # HTTP
sudo ufw allow 443/tcp         # HTTPS

# 或使用应用配置
sudo ufw allow 'OpenSSH'
sudo ufw allow 'Nginx Full'
```

### 数据库服务器
```bash
# MySQL/MariaDB (仅允许本地网络)
sudo ufw allow from 192.168.1.0/24 to any port 3306

# PostgreSQL
sudo ufw allow from 192.168.1.0/24 to any port 5432

# Redis (仅本地)
sudo ufw allow from 127.0.0.1 to any port 6379
```

### 开发服务器
```bash
# Node.js 开发服务器
sudo ufw allow 3000/tcp
sudo ufw allow 8000/tcp
sudo ufw allow 8080/tcp

# React 开发服务器
sudo ufw allow 3000/tcp
```

## 默认策略设置

### 设置默认规则
```bash
# 默认拒绝所有入站连接
sudo ufw default deny incoming

# 默认允许所有出站连接
sudo ufw default allow outgoing

# 默认拒绝转发
sudo ufw default deny forward
```

## 日志和监控

### 启用日志
```bash
# 启用日志
sudo ufw logging on

# 设置日志级别
sudo ufw logging low     # 低级别
sudo ufw logging medium  # 中级别
sudo ufw logging high    # 高级别
sudo ufw logging full    # 完整日志
```

### 查看日志
```bash
# 查看UFW日志
sudo tail -f /var/log/ufw.log

# 查看系统日志中的UFW记录
sudo journalctl -u ufw
```

## 实用技巧和最佳实践

### 安全配置建议
```bash
# 1. 首先允许SSH (避免锁定自己)
sudo ufw allow 22/tcp

# 2. 设置默认策略
sudo ufw default deny incoming
sudo ufw default allow outgoing

# 3. 允许必要服务
sudo ufw allow 80/tcp
sudo ufw allow 443/tcp

# 4. 启用防火墙
sudo ufw enable
```

### 针对你的服务器配置 (crs.hertz999.top)
```bash
# 当前状态: Status: active ✅

# 当前配置分析 (2025-10-20):
Status: active
Logging: on (low)
Default: deny (incoming), allow (outgoing), disabled (routed)

允许的端口:
- 22 (SSH) ✅ - 远程管理
- 80 (HTTP) ✅ - 网站访问
- 443 (HTTPS) ✅ - SSL网站访问

拒绝的端口:
- 135 (Windows RPC) ✅ - 安全考虑
- 3000 ❌ - 你的应用端口被拒绝了！

# 修复建议: 如果需要3000端口，执行:
sudo ufw delete deny 3000
sudo ufw allow 3000/tcp
```

### 当前配置问题和建议

**⚠️ 发现的问题**:
1. **端口3000被拒绝** - 如果你的应用运行在3000端口，外部无法访问
2. **端口135被拒绝** - 这是好的安全实践 (Windows RPC端口)

**🔧 修复步骤** (如果需要开放3000端口):
```bash
# 1. 删除拒绝规则
sudo ufw delete deny 3000

# 2. 允许3000端口
sudo ufw allow 3000/tcp

# 3. 验证修改
sudo ufw status verbose
```

**✅ 当前配置的优点**:
- SSH (22) 已允许 - 不会锁定自己
- HTTP/HTTPS (80/443) 已允许 - 网站可正常访问
- 默认拒绝入站 - 安全性良好
- 日志已启用 - 便于监控

## ⚠️ 重要安全提醒

### 启用防火墙前的必要检查
```bash
# 🔴 启用防火墙前必须执行的安全检查步骤:

# 1. 首先检查当前SSH连接端口
echo $SSH_CLIENT | awk '{print $3}'  # 查看SSH连接端口
netstat -tlnp | grep sshd            # 确认SSH服务端口

# 2. 确保SSH端口已允许 (默认22，可能是其他端口)
sudo ufw allow 22/tcp               # 或你实际的SSH端口

# 3. 允许Web服务端口
sudo ufw allow 80/tcp               # HTTP
sudo ufw allow 443/tcp              # HTTPS

# 4. 检查规则配置
sudo ufw status numbered

# 5. 确认关键端口已允许后再启用
sudo ufw enable

# 6. 启用后立即验证
sudo ufw status verbose
```

### 关键端口检查清单
启用防火墙前必须确保以下端口已允许:
- ✅ **22/tcp (SSH)** - 远程管理 (最重要!)
- ✅ **80/tcp (HTTP)** - 网站访问
- ✅ **443/tcp (HTTPS)** - SSL网站访问
- ⚠️ **自定义端口** - 根据应用需求添加

## 🔄 规则修改的实时性

### UFW规则修改特性
**✅ 实时生效 - 无需重启任何服务**

```bash
# 所有UFW操作都是实时生效的:

# 添加规则 - 立即生效
sudo ufw allow 8080/tcp
# ↑ 立即允许8080端口访问

# 删除规则 - 立即生效  
sudo ufw delete allow 8080/tcp
# ↑ 立即禁止8080端口访问

# 启用/禁用防火墙 - 立即生效
sudo ufw enable    # 立即激活所有规则
sudo ufw disable   # 立即停用所有规则

# 修改默认策略 - 立即生效
sudo ufw default deny incoming   # 立即生效
```

### 验证规则生效
```bash
# 修改规则后立即验证:
sudo ufw status verbose

# 测试端口连通性
telnet your-server-ip 80        # 测试HTTP端口
nc -zv your-server-ip 443       # 测试HTTPS端口

# 查看实际iptables规则变化
sudo iptables -L INPUT -n -v     # 查看底层规则
```

### 不需要重启的服务
- ❌ **不需要重启** ufw 服务
- ❌ **不需要重启** iptables 服务  
- ❌ **不需要重启** 系统
- ❌ **不需要重启** 网络服务
- ❌ **不需要重启** nginx/apache (除非修改了应用配置)

### 规则修改最佳实践
```bash
# 1. 安全的规则修改流程
sudo ufw status numbered        # 查看当前规则
sudo ufw allow new-port/tcp     # 添加新规则
sudo ufw status verbose         # 验证添加成功
sudo ufw delete old-rule-number # 删除旧规则 (如需要)

# 2. 批量修改时的建议
# 先添加允许规则，再删除拒绝规则，避免服务中断

# 3. 紧急情况处理
sudo ufw disable               # 紧急禁用防火墙
sudo ufw --force reset         # 重置所有规则
```

### 临时规则 (重启后失效)
```bash
# UFW规则是持久的，如需临时规则可直接使用iptables
sudo iptables -A INPUT -p tcp --dport 8080 -j ACCEPT
```

### 备份和恢复规则
```bash
# 备份规则
sudo cp /etc/ufw/user.rules /etc/ufw/user.rules.backup
sudo cp /etc/ufw/user6.rules /etc/ufw/user6.rules.backup

# 恢复规则
sudo cp /etc/ufw/user.rules.backup /etc/ufw/user.rules
sudo cp /etc/ufw/user6.rules.backup /etc/ufw/user6.rules
sudo ufw reload
```

## 常见问题和故障排除

### 检查防火墙状态
```bash
# 检查UFW状态
sudo ufw status verbose

# 检查iptables规则 (底层)
sudo iptables -L -n -v

# 检查监听端口
sudo netstat -tlnp
sudo ss -tlnp
```

### 紧急情况 (被锁定时)
```bash
# 如果通过控制台访问，可以禁用UFW
sudo ufw disable

# 或重置所有规则
sudo ufw --force reset
```

## 注意事项

1. **SSH安全**: 启用防火墙前务必先允许SSH端口，避免锁定自己
2. **规则顺序**: UFW按规则添加顺序处理，第一个匹配的规则生效
3. **重启持久**: UFW规则在系统重启后自动恢复
4. **IPv6支持**: UFW同时支持IPv4和IPv6规则
5. **应用更新**: 更新应用程序后可能需要更新防火墙规则