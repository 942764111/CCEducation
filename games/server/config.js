var CLIENT_PORT = "8240";
var CLIENT_IP = "192.168.1.108";
var ACCOUNT_KEY = "@#*&^*&@$asdAA";

exports.userServer = function(){
    return {
        CLIENT_PORT : CLIENT_PORT,
        CLIENT_IP : CLIENT_IP,
        VERSION_NUMBER : "20171202",
    }
}
    
exports.mysql = function(){
    return {
        HOST : "192.168.1.108",
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