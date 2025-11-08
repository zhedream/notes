# Chrome 浏览器


## 1. HSTS (HTTP Strict Transport Security) 缓存

Chrome 会记住曾经访问过的支持 HTTPS 的网站，并强制后续访问使用 HTTPS。即使您的网站现在没有配置 HTTPS，如果之前配置过，Chrome 仍会记住这个设置。

chrome://net-internals/#hsts

可以查询、删除 HSTS 缓存。

## cloudflare 代理

cloudflare 启动代理会自动开启 ssl

可以 SSL/TLS 概述，里面配置策略

浏览器 -> ssl cloudflare -> ssl 源服务器
