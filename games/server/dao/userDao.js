//working for userLogic

//引入mysql
var db = require("../utils/db");
var crypto = require("../utils/crypto");
var log = require("../utils/log");

function nop(a,b,c,d,e){}

//更新昵称和性别
exports.updateInfo = function(role,username,account, callback){
    callback = callback == null ? nop : callback;
    if(account == null || username == null || role == null){
        callback(null);
        return;
    }
    var sql = 'update user set  uname = "'+username+'",role = "'+role+'" where account = "'+account+'"';
    db.query(sql,function(err,rows,fields){
        if(err){
                if(err.code == 'ER_DUP_ENTRY'){
                    callback(false);
                    return;
                }
                callback(null);
                throw err;
        }else{
            callback(true);
        }
       
    })
};

//更新用户星球和星球关卡ID
/**
    plantindex:         目前用户处在哪个星球关卡
    plantpassindex:     用户星球中得关卡索引ID 
*/
exports.updatePlantindex = function(plantindex,plantpassindex,account, callback){
    callback = callback == null ? nop : callback;
    if(account == null || plantindex == null || plantpassindex ==null){
        callback(null);
        return;
    }
    var sql = 'update user set  plantindex = "'+plantindex+'",plantpassindex = "'+plantpassindex+'" where account = "'+account+'"';
    db.query(sql,function(err,rows,fields){
        if(err){
                if(err.code == 'ER_DUP_ENTRY'){
                    callback(false);
                    return;
                }
                callback(null);
                throw err;
        }else{
            callback(true);
        }
       
    })
};


exports.getPlantpassindex = function(account, callback){
    callback = callback == null ? nop : callback;
    if(account == null){
        callback(null);
        return;
    }
    var sql = 'select  plantpassindex FROM user where account = "'+account+'"';
    db.query(sql,function(err,rows,fields){
        if(err){
                if(err.code == 'ER_DUP_ENTRY'){
                    callback(false);
                    return;
                }
                callback(null);
                throw err;
        }else{
            callback(rows[0]);
        }
       
    })
};


//创建一个用户
exports.createAccount = function(account,password, callback){
    callback = callback == null ? nop : callback;
    if(account == null || password == null){
        callback(null);
        return;
    }
    var psd = crypto.md5(password);
    log.info("password:",password);
    log.info("psd:",psd);
    var sql = 'insert into user  (account,password) values("'+account+'","'+psd+'")';
    db.query(sql,function(err,rows,fields){
        if(err){
                if(err.code == 'ER_DUP_ENTRY'){
                    callback(false);
                    return;
                }
                callback(null);
                throw err;
        }else{
            callback(true);
        }
       
    })
};

//判断密码是否正确
exports.vercifyPassword = function(account,password, callback){
    callback = callback == null ? nop : callback;
    if(account == null || password == null){
        callback(null);
        return;
    }
    var sql = 'select * from user where account = "'+account+'"';
    db.query(sql,function(err,rows,fields){
        if(err){
            callback(null);
            throw err;
        }
        if(!rows[0]){
            callback(false);
            return;
        }
        var psd = crypto.md5(password);
        if(rows[0].password == psd){
            var temArray = new Array();
            temArray[0] = true;
            temArray[1] = rows[0];
            callback(temArray);
            return;
        }
        //不存在返回false
        callback(false);
    })
};



//判断昵称是否被使用了
exports.judgeUsername = function(username, callback){
    callback = callback == null ? nop : callback;
    if(username == null){
        callback(null);
        return;
    }
    var sql = 'select * from user where uname = "'+username+'"';
    db.query(sql,function(err,rows,fields){
        if(err){
            callback(null);
            throw err;
        }
        if(rows[0]){
            callback(true);
            return;
        }
        //不存在返回false
        callback(false);
    })
};


//判断用户是否存在
exports.judgeAccount = function(account, callback){
    callback = callback == null ? nop : callback;
    if(account == null){
        callback(null);
        return;
    }
    var sql = 'select * from user where account = "'+account+'"';
    db.query(sql,function(err,rows,fields){
        if(err){
            callback(null);
            throw err;
        }
        if(rows[0]){
            callback(true);
            return;
        }
        //不存在返回false
        callback(false);
    })
};



//根据用户id取用户昵称
exports.getNameByUserid = function(userid, callback){
    callback = callback == null ? nop : callback;
    if(userid == null){
        callback(null);
        return;
    }
    var sql = 'select name from user where uid = "'+userid+'"';
    db.query(sql,function(err,rows,fields){
        if(err){
            callback(null);
            throw err;
        }
        if(rows[0].name){
            callback(rows[0].name);
            return;
        }
        callback(null);
    })
};


