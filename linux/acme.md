# acme.sh SSL证书管理工具

## 官方文档
https://github.com/acmesh-official/acme.sh/wiki/说明

## 安装
```bash
curl https://get.acme.sh | sh -s email=l19517863@163.com
```

### email 参数的作用

**主要用途**:
1. **CA机构注册**: 在 Let's Encrypt/ZeroSSL 等CA机构注册账户
2. **重要通知**: 接收证书相关的重要通知邮件
3. **到期提醒**: 证书即将到期时的提醒 (虽然有自动续期)
4. **安全警告**: 证书被吊销或出现安全问题时的通知
5. **服务更新**: CA机构的重要服务变更通知

**具体通知内容**:
- 证书申请成功/失败通知
- 证书即将到期提醒 (通常提前30天、7天、1天)
- 证书续期成功/失败通知  
- 账户安全相关警告
- CA机构服务条款变更
- API限制或政策变更通知

**注意事项**:
- 邮箱必须是**真实有效**的
- 建议使用**长期稳定**的邮箱
- 不要使用临时邮箱或一次性邮箱
- 邮箱用于**紧急联系**，务必定期查看

**隐私说明**:
- 邮箱仅用于证书管理相关通知
- 不会用于营销或垃圾邮件
- 符合各大CA机构的隐私政策

## 安装成功信息
- 安装位置: `/root/.acme.sh`
- 已添加别名到 `/root/.bashrc`
- 已安装 cron 定时任务
- 建议安装 socat (用于 standalone 模式)

## 重要提示
安装完成后需要重新打开终端或执行以下命令使别名生效:
```bash
source ~/.bashrc
```

## 常用命令

### 申请证书 (webroot 模式)
```bash
acme.sh --issue -d example.com -w /var/www/html
```

### 申请证书 (standalone 模式)
```bash
acme.sh --issue -d example.com --standalone
```

### 申请证书 (nginx 模式)
```bash
acme.sh --issue -d example.com --nginx
```

### 安装证书到指定位置
```bash
acme.sh --install-cert -d example.com \
--key-file /etc/nginx/ssl/example.com.key \
--fullchain-file /etc/nginx/ssl/example.com.crt \
--reloadcmd "systemctl reload nginx"
```

### 查看已申请的证书
```bash
acme.sh --list
```

### 更新 acme.sh
```bash
acme.sh --upgrade
```

### 设置自动更新
```bash
acme.sh --upgrade --auto-upgrade
```

## 成功案例记录

### crs.hertz999.top 证书申请成功 (2025-10-20)
```
证书文件位置：
- 证书文件: /root/.acme.sh/crs.hertz999.top_ecc/crs.hertz999.top.cer
- 私钥文件: /root/.acme.sh/crs.hertz999.top_ecc/crs.hertz999.top.key
- 中间证书: /root/.acme.sh/crs.hertz999.top_ecc/ca.cer
- 完整链证书: /root/.acme.sh/crs.hertz999.top_ecc/fullchain.cer

安装后的证书位置：
- 私钥: /etc/nginx/ssl/crs.hertz999.top.key
- 证书: /etc/nginx/ssl/crs.hertz999.top.crt
```

证书信息：
- 颁发机构: ZeroSSL ECC Domain Secure Site CA
- 有效期: 2025-10-20 至 2026-01-18
- 加密算法: ECC (椭圆曲线加密)
- 安装状态: ✅ 已成功安装到 Nginx SSL 目录
- HTTPS 状态: ✅ 已正常工作
- 自动续期: 2025-12-18 (约60天后自动续期)

## 证书安装到 Nginx

### 方法一：使用 acme.sh 自动安装
```bash
# 先创建 SSL 目录
mkdir -p /etc/nginx/ssl

# 然后安装证书
acme.sh --install-cert -d crs.hertz999.top \
--key-file /etc/nginx/ssl/crs.hertz999.top.key \
--fullchain-file /etc/nginx/ssl/crs.hertz999.top.crt \
--reloadcmd "systemctl reload nginx"
```

**常见错误解决**：
如果遇到 "No such file or directory" 错误，说明目标目录不存在，需要先创建目录。

### 方法二：手动复制证书文件
```bash
# 创建 SSL 目录
mkdir -p /etc/nginx/ssl

# 复制证书文件
cp /root/.acme.sh/crs.hertz999.top_ecc/crs.hertz999.top.key /etc/nginx/ssl/
cp /root/.acme.sh/crs.hertz999.top_ecc/fullchain.cer /etc/nginx/ssl/crs.hertz999.top.crt

# 设置权限
chmod 600 /etc/nginx/ssl/crs.hertz999.top.key
chmod 644 /etc/nginx/ssl/crs.hertz999.top.crt

# 重启 Nginx
systemctl reload nginx
```

### Nginx 配置示例
```nginx
server {
    listen 443 ssl http2;
    server_name crs.hertz999.top;
    
    ssl_certificate /etc/nginx/ssl/crs.hertz999.top.crt;
    ssl_certificate_key /etc/nginx/ssl/crs.hertz999.top.key;
    
    # SSL 优化配置
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_ciphers ECDHE-RSA-AES128-GCM-SHA256:ECDHE-RSA-AES256-GCM-SHA384;
    ssl_prefer_server_ciphers off;
    ssl_session_cache shared:SSL:10m;
    ssl_session_timeout 10m;
    
    # 网站根目录和其他配置...
    root /var/www/html;
    index index.html index.php;
}

# HTTP 重定向到 HTTPS
server {
    listen 80;
    server_name crs.hertz999.top;
    return 301 https://$server_name$request_uri;
}
```

## 自动续期验证

### 查看证书列表和续期时间
```bash
acme.sh --list
```

### 查看 cron 定时任务
```bash
# 查看当前用户的 cron 任务
crontab -l

# 查看 root 用户的 cron 任务
sudo crontab -l
```

### 测试续期功能
```bash
# 查看证书详细信息 (包括续期配置)
acme.sh --info -d crs.hertz999.top

# 注意：acme.sh 不支持 --dry-run 参数
# 如果想测试续期，可以查看证书剩余天数
openssl x509 -in /etc/nginx/ssl/crs.hertz999.top.crt -noout -dates

# 手动运行 cron 检查 (会检查所有证书)
acme.sh --cron
```

### 证书配置验证结果 (2025-10-20)
```bash
# acme.sh --info -d crs.hertz999.top 输出解析：

域名配置:
- Le_Domain=crs.hertz999.top ✅
- Le_Keylength=ec-256 (ECC加密) ✅
- Le_API=https://acme.zerossl.com/v2/DV90 (ZeroSSL) ✅

时间配置:
- Le_CertCreateTimeStr=2025-10-20T05:31:29Z (创建时间) ✅
- Le_NextRenewTimeStr=2025-12-18T05:31:29Z (下次续期) ✅

文件路径配置:
- Le_RealKeyPath=/etc/nginx/ssl/crs.hertz999.top.key ✅
- Le_RealFullChainPath=/etc/nginx/ssl/crs.hertz999.top.crt ✅

自动化配置:
- Le_ReloadCmd=systemctl reload nginx ✅
- 配置文件: /root/.acme.sh/crs.hertz999.top_ecc/crs.hertz999.top.conf ✅
```

### 强制续期 (如果需要)
```bash
acme.sh --renew -d crs.hertz999.top --force
```

### 查看续期日志
```bash
# 查看 acme.sh 日志
tail -f ~/.acme.sh/acme.sh.log

# 查看系统日志中的 cron 执行记录
grep acme /var/log/syslog
```

### 自动续期工作原理
1. **安装时自动添加 cron 任务**：acme.sh 会在安装时自动添加定时任务
2. **每天检查**：默认每天凌晨检查证书是否需要续期
3. **提前30天续期**：在证书过期前30天自动续期
4. **自动重载服务**：续期后自动执行 `--reloadcmd` 重载 nginx

### 验证自动续期配置
```bash
# 1. 检查 cron 任务是否存在
crontab -l | grep acme

# 2. 检查 acme.sh 配置
cat ~/.acme.sh/account.conf

# 3. 验证续期配置
acme.sh --info -d crs.hertz999.top
```

### cron 任务详解
```bash
0 7 * * * "/root/.acme.sh"/acme.sh --cron --home "/root/.acme.sh" > /dev/null
```

**时间格式说明** (分 时 日 月 周):
- `0` - 分钟: 第0分钟 (整点)
- `7` - 小时: 上午7点 (UTC时间)
- `*` - 日: 每天
- `*` - 月: 每月  
- `*` - 周: 每周

**命令解析**:
- `"/root/.acme.sh"/acme.sh` - 执行 acme.sh 脚本
- `--cron` - cron 模式，检查所有证书是否需要续期
- `--home "/root/.acme.sh"` - 指定 acme.sh 的工作目录
- `> /dev/null` - 将输出重定向到空设备 (静默执行)

**实际含义**: 每天上午7点 (UTC时间) 自动检查所有证书，如果距离过期不足30天则自动续期。

### SSL证书"续期"的本质
**重要概念**: SSL证书的"续期"实际上是**申请一个全新的证书**，而不是延长现有证书的有效期。

**续期过程**:
1. **重新申请**: 向CA机构申请新证书
2. **重新验证**: 重新验证域名所有权  
3. **新的序列号**: 新证书有不同的序列号
4. **新的有效期**: 从申请日期开始计算新的90天
5. **替换文件**: 用新证书文件替换旧证书文件
6. **服务重载**: 重新加载web服务器配置

**为什么叫"续期"**: 
- 对用户来说，感觉像是"续期"了证书
- 实际上是无缝替换成了新证书
- 域名、配置路径等保持不变

### 旧证书的状态和处理

**续期后旧证书的状态**:
1. **仍然有效**: 旧证书在原有效期内依然有效
2. **不会自动吊销**: CA机构不会自动吊销旧证书
3. **可以并存**: 新旧证书可以同时有效
4. **安全风险**: 如果旧证书私钥泄露，仍可被恶意使用

**为什么旧证书不自动吊销**:
- 避免服务中断 (如果新证书部署失败)
- 给用户缓冲时间进行切换
- 减少CA机构的处理负担

### 手动吊销证书

#### 吊销当前使用的证书
```bash
# 吊销指定域名的证书
acme.sh --revoke -d crs.hertz999.top

# 吊销并删除本地文件
acme.sh --revoke -d crs.hertz999.top --remove
```

#### 吊销指定的证书文件
```bash
# 通过证书文件路径吊销
acme.sh --revoke-cert /path/to/certificate.crt

# 示例：吊销备份的旧证书
acme.sh --revoke-cert /root/.acme.sh/crs.hertz999.top_ecc/backup/old.crt
```

#### 查看吊销状态
```bash
# 检查证书是否已被吊销 (通过在线工具)
openssl s_client -connect crs.hertz999.top:443 -servername crs.hertz999.top < /dev/null 2>/dev/null | openssl x509 -noout -serial

# 或使用在线工具检查：
# https://crt.sh/ (输入域名查看证书历史)
# https://www.ssllabs.com/ssltest/ (SSL测试)
```

### 最佳实践建议

**一般情况**:
- **不需要手动吊销**: 让旧证书自然过期即可
- **自动续期**: 依赖 acme.sh 的自动续期机制
- **监控**: 定期检查证书状态

**需要吊销的情况**:
1. **私钥泄露**: 怀疑私钥被恶意获取
2. **服务器被攻击**: 服务器安全性受到威胁
3. **域名转移**: 不再拥有该域名
4. **配置错误**: 证书配置出现严重错误

**吊销注意事项**:
- 吊销是**不可逆**操作
- 吊销后该证书立即失效
- 确保有新证书可用再吊销旧证书
- 吊销可能需要几小时才能在全球生效

## 证书状态监控

### 当前证书信息 (2025-10-20)
```
域名: crs.hertz999.top
密钥长度: ec-256 (ECC)
颁发时间: 2025-10-20T05:31:29Z
续期时间: 2025-12-18T05:31:29Z (约60天后)
CA机构: ZeroSSL.com
```

### 设置证书到期提醒 (可选)
```bash
# 创建检查脚本
cat > /root/check_ssl.sh << 'EOF'
#!/bin/bash
DOMAIN="crs.hertz999.top"
DAYS_LEFT=$(openssl x509 -in /etc/nginx/ssl/$DOMAIN.crt -noout -dates | grep notAfter | cut -d= -f2 | xargs -I {} date -d {} +%s)
NOW=$(date +%s)
DAYS_REMAINING=$(( ($DAYS_LEFT - $NOW) / 86400 ))

if [ $DAYS_REMAINING -lt 7 ]; then
    echo "警告: SSL证书将在 $DAYS_REMAINING 天后过期！"
fi
EOF

chmod +x /root/check_ssl.sh

# 添加到 cron (每天检查)
echo "0 9 * * * /root/check_ssl.sh" | crontab -
```

## 注意事项
1. 确保域名已正确解析到服务器
2. 如使用 webroot 模式，确保网站根目录可写
3. 如使用 standalone 模式，确保 80 端口未被占用
4. 证书默认90天有效期，会自动续期
5. ECC 证书比 RSA 证书更安全且性能更好
6. 自动续期依赖 cron 服务，确保 cron 服务正常运行
