# WinSW

功能与 nssm 类似
# 下载
https://github.com/kohsuke/winsw/releases 下载最新版
在 Assets 里下载, 对应系统版本的软件
WinSW.NET2.exe 对应 win32
WinSW.NET4.exe 对应 win64

# 使用

以nginx.exe 为例
WinSW.NET4.exe 复制到 nginx.exe 的目录
WinSW.NET4.exe 改个名字 nginxservice.exe

nginxservice 这个名字想可以是其他的, 并不是固定格式

当然推荐改个有意义的名字
nginxservice.exe 对应的配置 nginxservice.xml


```xml
 <!-- nginxservice.xml -->
<service>
	<id>nginx</id>
	<name>nginx</name>
	<description>this nginx serve on WinSW.NET4</description>
	<logpath>E:\nginx-1.16.1</logpath>
	<logmode>roll</logmode>
	<depend></depend>
	<executable>E:\nginx-1.16.1\nginx.exe</executable>
	<stopexecutable>E:\nginx-1.16.1\nginx.exe -s stop</stopexecutable>
</service>
```

1. 安装服务
nginxservice.exe install
2. 卸载服务
nginxservice.exe uninstall

# 参考
1. nginx windows安装、使用和配置开机启动
https://blog.csdn.net/xiaojin21cen/article/details/84622517

