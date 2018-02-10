//引入scoreDao
var scoreDao = require("../dao/scoreDao");

//引入 userLogic
var userLogic = require("./userLogic");

var crypto = require("../utils/crypto");
var log = require("../utils/log");
function nop(a,b,c,d,e){};

//获取分数

exports.getScore = function(account, callback){
	var self = this;
		callback = callback == null ? nop : callback;
	    if(account == null){
	        callback(null);
	        return;
	    }

//如果有此数据返回此用户数据
//如果没有创建一个数据
    scoreDao.getScore(account,function(suc){
            if(suc){
                callback(suc);
               	return;
            }else{
               scoreDao.createScore(account,function(suc){
               		if(suc){

               			 scoreDao.getScore(account,function(suc){
               			 	log.info(suc);
            				if(suc){
                				callback(suc);
               					return;
               				}else{
               					callback(null);
				        		    return;
               				}
               			 })

               		}else{
               			callback(null);
				            return;
               		}
               });
            }
    });
}



//根据key更新对应的值
exports.updateScore = function(account, updateKey,value,callback){
    var self = this;
    callback = callback == null ? nop : callback;
      if(account == null||updateKey == null|| value == null){
          callback(null);
          return;
      }

      scoreDao.updateScore(account, updateKey,value,function(suc){
            if(suc){
              callback(true);
              return;
            }else{
              callback(false);
              return;
            }
      })

}