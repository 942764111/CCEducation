
cc.Class({
    extends: cc.Component,

    properties: {
        id : null,      //分数id
        game_1_1:0,     //常识游戏
        game_1_2:20,     //背数游戏
        game_1_3:20,     //算术游戏
        game_1_4:20,     //译码测试
        game_1_5:20,     //拼图游戏
        game_1_6:20,     //迷津游戏
    },
    //获取用户分数
    getAllUserScore(callBack){
        var self = this;
        var data = {
            "account"         :  cc.vv.Userinfo["account"],
            "sign"            :  cc.vv.Userinfo["sign"]
        }
        cc.vv.HTTP.sendRequest(cc.vv.CG.HTTP_POST_CONFIG["USER_SCORE"],'/getScore',data,function(data){
            if(data){
                if(data["code"]=='0'){
                    self.id = data["sign"]["id"];
                    self.game_1_1 = data["sign"]["game_1_1"];
                    self.game_1_2 = data["sign"]["game_1_2"];
                    self.game_1_3 = data["sign"]["game_1_3"];
                    self.game_1_4 = data["sign"]["game_1_4"];
                    self.game_1_5 = data["sign"]["game_1_5"];
                    self.game_1_6 = data["sign"]["game_1_6"];
                    callBack&&callBack();
                }else{
                    cc.vv.PublicUI.create_SelectBox({
                        "txt":data.msg,
                        "CallBack": {
                            onbtn_1CallBack : function() {
                                cc.director.loadScene("Login");
                            },
                            onbtn_3CallBack : function(){
                                cc.director.loadScene("Login");
                            }
                        }
                    });
                }
            }
        },)
    },

    updateUserScore(gameid,callBack){
        var updateKey = "game_"+cc.vv.Userinfo["plantindex"]+"_"+gameid;
        var self = this;
        var data = {
            "account"         :  cc.vv.Userinfo["account"],
            "sign"            :  cc.vv.Userinfo["sign"],
            updateKey         :  updateKey,
            value             :  self[updateKey]
        }
        cc.vv.HTTP.sendRequest(cc.vv.CG.HTTP_POST_CONFIG["USER_SCORE"],'/updateScore',data,function(data){
            if(data){
                if(data["code"]=='0'){
                    self[updateKey] = self[updateKey];
                    callBack&&callBack();
                }else{
                }
            }
        },)
    }



});
