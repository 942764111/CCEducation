//引入express模块
var express = require('express');
var crypto = require("../../utils/crypto");
//引入userLogic
var scoreLogic = require("../../logic/scoreLogic");

var log = require("../../utils/log");

//创建一个express对象
var app = express();

//监听7777端口
//app.listen("7777");

//响应json数据
function send(res,ret){
	var str = JSON.stringify(ret);
	res.send(str)
}

var config = null;
exports.start = function(cfg){
    config = cfg;
    //监听7777端口
    app.listen(config.CLIENT_PORT);
    log.info("myaccount server is listening on "+config.CLIENT_PORT);
}

//设置跨域访问
app.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By",' 3.2.1')
    res.header("Content-Type", "application/json;charset=utf-8");
    next();
});


//获取用户分数
app.get('/getScore',function(req,res){
    var account = req.query.account;
    var sign = req.query.sign;
    //判断是否为空
    if(account == ""||sign==""){
        send(res,{code : 1 ,msg :"account or sign is null"});
        return;
    }

    // //验证用户秘钥
    var mysign = crypto.md5(account + req.ip + config.ACCOUNT_KEY);
    if(mysign!=sign){
        send(res,{code : 1 ,msg :"the sign is error"});
        return;
    }

    scoreLogic.getScore(account,function(data){
        if(!data){
            send(res,{code : 1, msg : "get getScore happened error"});
            return;
        }
            send(res,{code : 0, msg : "ok",sign : data});
            return;
    });
});


//更具对应的字段更新的用户分数
app.get('/updateScore',function(req,res){
    var account = req.query.account;
    var updateKey = req.query.updateKey;
    var value = req.query.value;
    var sign = req.query.sign;
    //判断是否为空
    if(account == ""||sign==""||updateKey==""||value==""){
        send(res,{code : 1 ,msg :"account or sign is null"});
        return;
    }

    // //验证用户秘钥
    var mysign = crypto.md5(account + req.ip + config.ACCOUNT_KEY);
    if(mysign!=sign){
        send(res,{code : 1 ,msg :"the sign is error"});
        return;
    }

    scoreLogic.updateScore(account,updateKey,value,function(suc){
        if(!suc){
            send(res,{code : 1, msg : "update updateScore happened error"});
            return;
        }
            send(res,{code : 0, msg : "ok",sign : suc});
            return;
    });
});






