var CLIENT_PORT = "8240";
//var CLIENT_IP = "192.168.1.108";
var CLIENT_IP = "localhost";
var ACCOUNT_KEY = "@#*&^*&@$asdAA";

exports.userServer = function(){
    return {
        CLIENT_PORT : CLIENT_PORT,
        CLIENT_IP : CLIENT_IP,
        VERSION_NUMBER : "20171202",
    }
}
    

exports.scoreServer = function(){
    return {
        CLIENT_PORT : 8241,
        CLIENT_IP : CLIENT_IP,
    }
}

exports.mysql = function(){
    return {
        HOST : "47.104.3.58",
        USER : "root",
        PASSWORD : "123456",
        DBNAME : "educationgame",
        PORT : 3306,
    }
}

exports.redis = function(){
    return {
        host : "127.0.0.1",
        port : 6379,
        db: 0,
    }
}