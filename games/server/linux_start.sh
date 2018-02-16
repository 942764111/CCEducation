#!/bin/sh 
nohup pm2 start /usr/gameServer/game/Server/servers/scoreServer/app.js --name scoreServer -max
nohup pm2 start /usr/gameServer/game/Server/servers/userServer/app.js --name userServer -max

