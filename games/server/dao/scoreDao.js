//引入mysql
var db = require("../utils/db");
var crypto = require("../utils/crypto");
var log = require("../utils/log");

function nop(a,b,c,d,e){};

//创建用户分数表
exports.createScore = function(account, callback){
    callback = callback == null ? nop : callback;
    if(account == null){
        callback(null);
        return;
    }
    var sql = 'insert into score  (account) values("'+account+'")';
    db.query(sql,function(err,rows,fields){
        if(err){
                if(err.code == 'ER_DUP_ENTRY'){
                    callback(false);
                    log.error("createScore err.code == 'ER_DUP_ENTRY'="+err.code);
                    return;
                }
                log.error("createScore err="+err);
                callback(false);
                throw err;
        }else{
        	log.info("createScore rows="+true);
            callback(true);
        }
       
    })
};

//获取用户分数
exports.getScore = function(account, callback){
    callback = callback == null ? nop : callback;
    if(account == null){
        callback(null);
        return;
    }
    var sql = 'select * from  score where account="'+account+'"';
    db.query(sql,function(err,rows,fields){
        if(err){
                if(err.code == 'ER_DUP_ENTRY'){
                	log.error("getScore err.code == 'ER_DUP_ENTRY'="+err.code);
                    callback(false);
                    return;
                }
                callback(null);
                log.error("getScore err="+err);
                throw err;
        }else{
        	log.info("getScore rows="+rows);
            callback(rows[0]);
        }
       
    })
};



//根据key更新对应的值
exports.updateScore = function(account, updateKey,value,callback){
    callback = callback == null ? nop : callback;
    if(account == null){
        callback(null);
        return;
    }
    var sql = 'update score set '+ updateKey +'='+ value +' where account="'+account+'"';
    log.info(sql);
    db.query(sql,function(err,rows,fields){
        if(err){
                if(err.code == 'ER_DUP_ENTRY'){
                    log.error("updateScore err.code == 'ER_DUP_ENTRY'="+err.code);
                    callback(false);
                    return;
                }
                callback(null);
                log.error("updateScore err="+err);
                throw err;
        }else{
            log.info("updateScore rows="+rows);
            callback(true);
        }
       
    })
};

