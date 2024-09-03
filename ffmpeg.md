# ffmpeg

FFmpeg 是视频处理最常用的开源软件。

它功能强大，用途广泛，大量用于视频网站和商业软件（比如 Youtube 和 iTunes），也是许多音频和视频格式的标准编码/解码实现。

## github

https://github.com/FFmpeg/FFmpeg

## 使用

```bash
# $ ffmpeg \
# [全局参数] \
# [输入文件参数] \
# -i [输入文件] \
# [输出文件参数] \
# [输出文件]

ffmpeg \
-y \ # 全局参数
-c:a libfdk_aac -c:v libx264 \ # 输入文件参数
-i input.mp4 \ # 输入文件
-c:v libvpx-vp9 -c:a libvorbis \ # 输出文件参数
output.webm # 输出文件
```

> ffmpeg -i bbb.mp4 -hide_banner # 查看元信息


ffmpeg -i a.mp4 -i v.mp4 output.mp4

youtube-dl  https://www.youtube.com/watch?v=VTvaZnJ9XuY

## 链接

1. 阮一峰
   https://ruanyifeng.com/blog/2020/01/ffmpeg.html


ffmpeg -i a.mp4 -ss 00:01:26 -to 00:10:22 -c:v copy -c:a copy b.mp4
ffmpeg -i 22729-sc-720p.mp4 -ss 00:01:26 -to 00:10:22 -c:v copy -c:a copy b.mp4
