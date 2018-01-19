//引入express模块
var express = require('express');
var crypto = require("../../utils/crypto");
//引入userLogic
var userLogic = require("../../logic/userLogic");

var log = require("../../utils/log");

//创建一个express对象
var app = express();

//监听7777端口
//app.listen("7777");

var userRedis = require("../../redis/userRedis");

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

//获取版本号响应
app.get('/getVersion',function(req,res){
    var verNumber = config.VERSION_NUMBER;
    send(res,{version : verNumber});
});


//创建角色
app.get('/createRole',function(req,res){
    var account = req.query.account;
    var sign = req.query.sign;
    var username = req.query.uname;
    var role = req.query.role;
    //判断是否为空
    if(account == "" || sign == "" || username == ""){
        send(res,{code : 1 ,msg :"some params is null"});
        return;
    }
    //验证用户秘钥
    var mysign = crypto.md5(account + req.ip + config.ACCOUNT_KEY);
    if(mysign!=sign){
        send(res,{code : 1 ,msg :"the sign is error"});
        return;
    }
    //验证昵称是否存在
    userLogic.judgeUsername(username,function(has){
        if(has){
            send(res,{code:1,msg : "the username is exist"});
        }else{
            //没有的话，就更新用户的昵称和性别信息
            userLogic.updateInfo(role,username,account,function(suc){
                if(suc){
                    send(res,{code : 0, msg : "ok",uname : username, role : role});
                }else{
                    send(res,{code : 1, msg : "update userinfo happened error"});
                }
            });
            
        }
    });
});


//登录响应
app.get('/loginGame',function(req,res){
    var account = req.query.account;
    var password = req.query.password;
    //判断是否为空
    if(account == "" || password == ""){
        send(res,{code : 1 ,msg :"account or password is null"});
        return;
    }
   
    //验证账号密码是否正确
    userLogic.vercifyPassword(account,password,function(data){
        if(data){
            //密码正确
            var sign = crypto.md5(data[1].account + req.ip + config.ACCOUNT_KEY);
            send(res,{code : 0, msg : "ok", sign : sign,userInfo:data[1]});
            //把用户信息写入redis
            userRedis.setUser(data[1]);
        }else{
             log.warn(data);
            send(res,{code:1,msg : "the password or account is wrong"});
        }
    });
});


// process.on("uncaughtException", function(err) {
// 	log.error("uncaughtException called "+err);
// });


//注册响应
app.get('/register',function(req,res){
    var account = req.query.account;
    var password = req.query.password;
    console.log(password);
    //判断是否为空
    if(account == "" || password == ""){
        send(res,{code : 1 ,msg :"account or password is null"});
        return;
    }

    userLogic.judgeAccount(account,function(has){
        if(has){
            send(res,{code:1,msg : "the account is used"});
        }else{
            //没有的话，就创建一个账号
            userLogic.createAccount(account,password,function(suc){
                if(suc){
                    var sign = crypto.md5(account + req.ip + config.ACCOUNT_KEY);
                    send(res,{code : 0, msg : "ok",account : account, sign : sign});
                }else{
                    send(res,{code : 1, msg : "create account happened error"});
                }
            });
            
        }
    });
});

//更新用户关卡索引ID
app.get('/dialogindex',function(req,res){
    var account = req.query.account;
    var dialogindex = req.query.dialogindex;
    var sign = req.query.sign;
    //判断是否为空
    if(account == "" || dialogindex == "" || sign==""){
        send(res,{code : 1 ,msg :"account or password is null"});
        return;
    }

    //验证用户秘钥
    var mysign = crypto.md5(account + req.ip + config.ACCOUNT_KEY);
    if(mysign!=sign){
        send(res,{code : 1 ,msg :"the sign is error"});
        return;
    }
    userLogic.updateDialogindex(dialogindex,account,function(has){
        if(!has){
            send(res,{code : 1, msg : "update dialogindex happened error"});
            return;
        }
            send(res,{code : 0, msg : "ok",userinfo:{"dialogindex":dialogindex}});
    });
});





