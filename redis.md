## Docker Redis
docker run -p 6379:6379 -v /var/data-redis:/data  -d redis:latest redis-server --appendonly yes
## phpredisadmin redis 可视化 管理工具
docker run -it -d -e REDIS_1_HOST=192.168.2.219 -e REDIS_1_NAME=MyRedis -p 63790:80  erikdubbelboer/phpredisadmin

## 修改容器环境变量

docker run --env <key>=<value> <IMAGE-ID>来修改环境变量
docker run -it -d -e REDIS_1_HOST=172.17.0.1 -e REDIS_1_NAME=MyRedis -p 63790:80  erikdubbelboer/

1. apt install redis-server
2. /etc/redis/redis.conf
3. /var/lib/redis
4. 注意 sudo -s 操作

## ubuntu
19.1
sudo apt install redis