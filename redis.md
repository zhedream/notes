## Docker Redis
docker run -p 6379:6379 -v /var/data-redis:/data  -d redis:latest redis-server --appendonly yes
## phpredisadmin redis 可视化 管理工具
docker run -it -d -e REDIS_1_HOST=172.17.0.1 -e REDIS_1_NAME=MyRedis -p 63790:80  erikdubbelboer/phpredisadmin