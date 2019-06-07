## 开启日志
sudo vi /etc/rsyslog.d/50-default.conf
sudo service rsyslog restart
tail -f /var/log/cron.log

## crontab
sudo service cron restart