#!/bin/bash
source /root/.bashrc
chk_time=5

#---------------------------------start--
start_wechatbot()
{
    echo "start wechatbot"
    nvm use 18 && cd /root/ChatGPT-wechat-bot
    pkill node
    pkill node
    nohup npm run dev > botchat.log 2>err.log &
}

#---------------------watchdog----
watchdog()
{
    local i=0
    local t=0
    local num=0
    while true
    do
        ####mysqld
        echo "check wechatbot"
        num=`ps -ef |grep -v grep |grep "index.ts"|wc -l`
        echo $num
        if [ $num -eq 0 ];then
            start_wechatbot
        fi 

        ##
        echo "sleep $chk_time"
        sleep $chk_time
    done;
}
watchdog
