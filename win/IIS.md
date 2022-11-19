# IIS 基本使用

1. web 平台安装工具 (插件/模块平台)

https://www.iis.net/downloads/microsoft/web-platform-installer

2. URL Rewrite / URL 重写工具 /

https://www.iis.net/downloads/microsoft/url-rewrite

3. ARR / Application Request Routing / 应用程序请求路由 / 代理模块

https://www.iis.net/downloads/microsoft/application-request-routing

4. 在主页 打开 ARR , 进入设置 ,启用 proxy, 保存.

```XML web.config
<?xml version="1.0" encoding="UTF-8"?>
<configuration>
  <system.webServer>
    <rewrite>
      <rules>
        <!--
          关于 match:
          IIS 的 URL 匹配是用  / 之后的字符匹配的, http://localhost:8080/api , api
        -->

        <!-- 代理 api -->
        <rule name="proxy_api" enabled="true" patternSyntax="Wildcard">
          <match url="api/*" negate="false" />
          <action type="Rewrite" url="http://172.16.12.52:5421/api/{R:1}" />
        </rule>

        <!-- 代理 gis 资源 -->
        <rule name="proxy_gis" enabled="false" patternSyntax="Wildcard">
          <match url="gis/*" negate="false" />
          <action type="Rewrite" url="http://172.16.12.52:5421/gis/{R:1}" />
        </rule>

        <!-- 单页应用 重写 index !!! 放在后面 -->
        <rule name="spa_index" enabled="true">
          <match url="^((?!(api)).)*$" />
          <action type="Rewrite" url="/" />
          <conditions logicalGrouping="MatchAll">
            <add input="{REQUEST_FILENAME}" matchType="IsFile" negate="true" />
            <add input="{REQUEST_FILENAME}" matchType="IsDirectory" negate="true" />
          </conditions>
        </rule>
        <!--
          挂载虚拟目录:
          挂载 gis 虚拟目录, 注意 是 反斜杠 `\` ,如: E:\www\gis
        -->
      </rules>

      <outboundRules>
        <rule name="Remove ETag" enabled="false">
          <match serverVariable="RESPONSE_ETag" pattern=".+" />
          <action type="Rewrite" value="" />
        </rule>
      </outboundRules>

    </rewrite>

    <caching>
      <profiles>
        <add extension=".css" policy="CacheUntilChange" kernelCachePolicy="CacheUntilChange" duration="00:00:30" />
        <add extension=".js" policy="CacheUntilChange" kernelCachePolicy="CacheUntilChange" duration="00:00:30" />
        <add extension=".html" policy="CacheUntilChange" kernelCachePolicy="CacheUntilChange" duration="00:00:30" />
      </profiles>
    </caching>
    <staticContent>
      <mimeMap fileExtension=".vue" mimeType="text/plain" />
    </staticContent>
  </system.webServer>
</configuration>


```

## PHP 使用

1. 程序功能开启: CGI
2. 处理程序映射, 网站
3. ISAPI 和 CGI 限制 (可选, win10 测试不需要)

https://blog.csdn.net/wzj0808/article/details/54177067

## 参考

1. Win10 如何通过 IIS 部署网站

https://www.jianshu.com/p/4a9f2cb674ee

2. vue 项目部署在 IIS 上面的心得

https://segmentfault.com/a/1190000014483148
