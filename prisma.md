### prisma
sudo npm install -g cnpm --registry=https://registry.npm.taobao.org
sudo cnpm install pm2@latest -g
sudo cnpm install -g prisma
###
{
  "Authorization":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7InNlcnZpY2UiOiJkZWZhdWx0QGRlZmF1bHQiLCJyb2xlcyI6WyJhZG1pbiJdfSwiaWF0IjoxNTQ0NDM4OTM1LCJleHAiOjE1NDUwNDM3MzV9.WNBAmP7CR7jVHXT_P5YhDQ_WcaSr4KG2MuQnFjlKdOc"
}

## 导出数据

prisma export

## 导入数据

prisma import --data

## 权限 token