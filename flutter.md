## 配置flutter 开发环境
link https://flutter.io/docs/get-started/install

## 1
// 设置中国镜像 本次开机有效
export PUB_HOSTED_URL=https://pub.flutter-io.cn
export FLUTTER_STORAGE_BASE_URL=https://storage.flutter-io.cn

## 创建目录 
mkdir ~/development
cd ~/development

##  获取Flutter SDK
 cd ~/development
 tar xf ~/Downloads/flutter_linux_v1.0.0-stable.tar.xz

## 配置环境变量
1. gedit ~/.bashrc
2. export PATH=$PATH:/home/lhz/development/flutter/bin // 末尾添加
3. source ~/.bashrc
4. flutter doctor # 检测是否配置成功
## 安装Android Studio
https://developer.android.com/studio/

打开Android Stuido 软件，然后找到Plugin的配置，搜索Flutter插件。
安装AVD虚拟机

##  允许协议
flutter doctor --android-licenses