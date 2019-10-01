# C\C++ 的开发环境
1. g++ -v 查看版本, ubuntu 一般自带

# win10

1. 下载 MinGW ,C\C++ 安装器, 官网: https://osdn.net/projects/mingw/releases/  , 下载 mingw-get-setup.exe
2. 以管理员运行, 一直默认下一步就好了, 默认安装到 C:/MinGW , 对所有用户
3. 把 Basic 全部 marked  安装了.
4. 如果没有网络问题, 一路很顺的.
5. 配置环境变量
6. END

# 坑
我在安装的时候, 
出了一些问题, 如中途 有包 失败了(网络). 没有在意, 
g++ -v 能查看过版本, 但是 变异不行, 换了了 power shell, 等 命令行  一点错误也不抱,  最后用 cmd 的时候给了错误, 说. dll 找不到.
我重新 一个个移除, basic ,重新 apply 还是不行. (缓存,但是包还是下载不下来

网络有问题的, 导致有包没成功.
1. 会有提示, 是那个包地址 失败, 记住 域名,  去 https://tool.chinaz.com/dns/, 查询DNS
2.  修改 hosts 
3. 直接删除 MinGW, 重新安装一遍
4. 

# 参考
安装: https://blog.csdn.net/lk274857347/article/details/83068498
调试: https://www.kancloud.cn/qinbao/git/706151

# vsCode debug
0. 插件
前四个

1. ubuntu
```json
{
// 编译的配置
// 有关 tasks.json 格式的文档，请参见
    // https://go.microsoft.com/fwlink/?LinkId=733558
    "version": "2.0.0",
    "tasks": [
        {
            "type": "shell",
            "label": "g++-8 build active file",
            "command": "/usr/bin/g++-8",
            "args": [
                "-g",
                "${file}",
                "-o",
                "${fileDirname}/${fileBasenameNoExtension}.out"
                // "${fileDirname}/${fileBasenameNoExtension}"
            ],
            "options": {
                "cwd": "/usr/bin"
            },
            "problemMatcher": [
                "$gcc"
            ],
            "group": "build"
        }
    ]
}
// 调试的配置 launch.json

{
    "version": "0.2.0",
    "configurations": [
        {
            "name": "g++-8 build and debug active file",
            "type": "cppdbg",
            "request": "launch",
            "program": "${fileDirname}/${fileBasenameNoExtension}",
            "args": [],
            "stopAtEntry": false,
            "cwd": "${workspaceFolder}",
            "environment": [],
            "externalConsole": false,
            "MIMode": "gdb",
            "setupCommands": [
                {
                    "description": "Enable pretty-printing for gdb",
                    "text": "-enable-pretty-printing",
                    "ignoreFailures": true
                }
            ],
            "preLaunchTask": "g++-8 build active file",
            "miDebuggerPath": "/usr/bin/gdb"
        }
    ]
}

```

2. win

```json

// tasks.json
{
    "version": "2.0.0",
    "tasks": [
        {
            "label": "Compile",
            "command": "g++",
            "args": [
                "${file}",
                "-o",
                "${fileDirname}/${fileBasenameNoExtension}.exe",
                "-g",
                "-Wall",
                "-static-libgcc",
                "-std=c++17"
            ],
            "type": "shell",
            "group": {
                "kind": "test",
                "isDefault": true
            },
            "presentation": {
                "echo": true,
                "reveal": "always",
                "focus": false,
                "panel": "shared"
            }
        }
    ]
}

// launch..json


{
    "version": "0.2.0",
    "configurations": [
        {
            "name": "(gdb) Launch", // 配置名称，将会在启动配置的下拉菜单中显示
            "type": "cppdbg", // 配置类型，这里只能为cppdbg
            "request": "launch", // 请求配置类型，可以为launch 启动 或attach（附加）
            "program": "${fileDirname}/${fileBasenameNoExtension}.exe", // 将要进行调试的程序的路径
            "args": [], // 程序调试时传递给程序的命令行参数，一般设为空即可
            "stopAtEntry": false, // 设为true时程序将暂停在程序入口处，我一般设置为true
            "cwd": "${workspaceFolder}", // 调试程序时的工作目录
            "environment": [], //  环境变量
            "externalConsole": true, // 调试时是否显示控制台窗口，一般设置为true显示控制台
            "internalConsoleOptions": "neverOpen", // 如果不设为neverOpen，调试时会跳到“调试控制台”选项卡，你应该不需要对gdb手动输命令吧？
            "MIMode": "gdb", // 指定连接的调试器，可以为gdb或lldb。但目前lldb在windows下没有预编译好的版本。
            "miDebuggerPath": "C:\\MinGW\\bin\\gdb.exe", // 调试器路径，Windows下后缀不能省略，Linux下则去掉
            "setupCommands": [ // 用处未知，模板如此
                {
                    "description": "Enable pretty-printing for gdb",
                    "text": "-enable-pretty-printing",
                    "ignoreFailures": false
                }
            ],
            "preLaunchTask": "Compile" // 调试会话开始前执行的任务，一般为编译程序。与tasks.json的label相对应
        }
    ]

}


```