# mongodb
## docker安装
docker search  mongo
docker pull mongo
docker run -p 27017:27017 -v /var/mongo:/data/db --name mongodb -d mongo

## 使用

> mongo
> use db  ## 没有会自动创建
> db.albums.insert({title:"this is title"}) ## 自动添加字段
> db.albums.insertMany([{title:"this is title"},{title:"this is title2"}]) ## 添加多条数据
> db.albums.find() ## 查找数据

> db.albums.updateMany(
    {},
    {
        $set :{artist:"author"}
    }
)
>db.albums.updateOne(
    {title:"再见理想2"},
    {
        $set :{title:"小时代"}
    }
)

> db.albums.deleteOne({title:""})
> db.albums.remove({title:""},true) ## 第二个参数 true 删除 1 个
> db.albums.remove({title:""},true) ## 第二个参数 true 删除 1 个
> db.albums.deleteMany({title:""})

> db.users.find({},{username:1})
> db.users.find({},{username:1}).size()
> db.users.find({},{username:1}).skip(2)
> db.users.find({},{username:1}).limit(2)
> db.users.find({},{username:1}).sort({title:1})
> db.users.find({},{bumen:1}).sort({"bumen.name":-1})


> db.users.find(
    {"bumen.name":{
        $in:"安"
    }},
    {bumen:1}).sort({"bumen.name":-1})




## 其他
1. 阿里镜像加速
https://cr.console.aliyun.com/undefined/instances/mirrors
2. docker vscode  插件
3. 可视化管理
docker run -itd -p 8081:8081 --link you_contain_name:mongo mongo-express
4. Studio 3T
https://studio3t.com/
