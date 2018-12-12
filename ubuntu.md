## tab 没有补全

https://blog.csdn.net/tmosk/article/details/77523576

```bash
# enable bash completion in interactive shells  
#if ! shopt -oq posix; then  
# if [ -f /usr/share/bash-completion/bash_completion ]; then  
#    . /usr/share/bash-completion/bash_completion  
#  elif [ -f /etc/bash_completion ]; then  
#    . /etc/bash_completion  
#  fi  
#fi 
```
sudo gedit /etc/bash.bashrc
source /etc/bash.bashrc