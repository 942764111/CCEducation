var redis = require("redis");
var log = require('../utils/log');
var client = null;

exports.connect = function(config){
    client = redis.createClient({
        host : config.host,
        port : config.port,
        db : config.db,
    });
    console.log("userRedis is running");
    client.on("error",function(err){
        console.log(err);
    });
}


exports.setUser = function(userInfo){
    if(client === null){
        log.error("userRedis client is null");
        return;
    }
    var key = "user" + "_" + userInfo.userid;
    client.hmset(key, userInfo, function (err, res) {
        if(err){
            log.error("userRedis hmset is err");
        }
    });
    client.hgetall(key, function (err, obj) {
        log.info("redisPrintStart");
        log.info(obj);
        log.info("redisPrintEnd");
    });
}