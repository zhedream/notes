# hello

$ git clone https://github.com/emscripten-core/emsdk.git
$ cd emsdk
$ ./emsdk install latest
$ ./emsdk activate latest
$ source ./emsdk_env.sh --build=Release
$ emsdk install latest upstream

$ emcc hello.c -o hello.html
$ emrun --no_browser --port 8080 .

```
EMSDK = /root/emsdk
EM_CONFIG = /root/.emscripten
EMSDK_NODE = /root/emsdk/node/12.9.1_64bit/bin/node
```

## 依赖

1. python2.7 python

## 坑
1. 不要使用 sudo apt install emscripten