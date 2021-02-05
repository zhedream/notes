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
## 问题1
https://stackoverflow.com/questions/59647791/tag-android-studio-not-installed-when-run-flutter-doctor-while-android

flutter config --android-sdk="$HOME/Android/Sdk" // 默认 SDK 位置
flutter config --android-studio-dir="/usr/local/android-studio" // 官网推荐
flutter config --android-studio-dir="$HOME/development/android-studio" // 手动安装的位置
## 问题2 插件未安装, 更新 flutter
https://stackoverflow.com/questions/64369971/android-studio-dart-and-flutter-plugin-is-not-installed

flutter channel dev
flutter upgrade
flutter config --android-studio-dir="C:\Program Files\Android\Android Studio"
flutter doctor -v

https://developer.android.com/studio/
安装的失败, 重新安装, 使用管理员启动 安装包 会自动卸载
1. 第一次的SDK ,  翻墙下载 , 内置的socket代理,填写你的代理服务, 镜像不适用只能翻墙
2. 插件安装国内镜像:  内置socket 代理好像没用 , 镜像有效
https://www.jianshu.com/p/0936af70cda3
打开Android Stuido 软件，然后找到Plugin的配置，搜索Flutter插件。
3. 安装AVD虚拟机(可选)
## 安装java
sudo apt install openjdk-11-jre-headless
sudo apt install default-jre           
##  允许协议
flutter doctor --android-licenses

## 安装flutter 包
https://pub.dartlang.org/flutter/
在pubspec 中 添加 保存即可 插件自动安装下载