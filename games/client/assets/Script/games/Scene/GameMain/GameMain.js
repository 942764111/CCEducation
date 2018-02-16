

cc.Class({
    extends: cc.Component,

    properties: {
        show_Role: {
            default: null,
            type: cc.Node,
        },
    },
    onLoad () {

        var self = this;
        cc.vv.PublicUI.create_Role(cc.vv.Userinfo.role,self.show_Role,{
            "playTimes":0
        });
        cc.vv.PublicUI.create_UserinfoBox(false);



        //获取用户分数
        cc.vv.UserScoreinfo.getAllUserScore();
    },
    onClickEvents(e,eventid){

        function loadScene(scenename){
            cc.director.loadScene(scenename);
        }

        switch(eventid){
            case "explore"://探索
                loadScene("Explore");
                break;
            case "figure"://人物
            cc.vv.PublicUI.buttonCallBack();
                break;
            case "Webstars"://星网
            cc.vv.PublicUI.buttonCallBack();
                break;
            case "cabin"://船舱
            cc.vv.PublicUI.buttonCallBack();
                break;
            case "collect"://收藏
            cc.vv.PublicUI.buttonCallBack();
                break;
            case "set_btn"://设置
                
                cc.loader.loadRes('res/prefab/evaluating', function (err, data) {
                    if (err) {
                        cc.error(err.message || err);
                        return;
                    }

                    var getsEvaluatingNode = cc.instantiate(data);
                    cc.director.getScene().getChildByName('Canvas').addChild(getsEvaluatingNode);
                });

                break;
            default :
                throw new Error(eventid + "not Find By  ",this.name) 
                break;
        }
    }
});
