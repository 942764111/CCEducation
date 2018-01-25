

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
        cc.loader.loadRes('textures/images/Role/'+cc.vv.CG.ROLE_JSON[cc.vv.Userinfo["role"]]['img'], cc.SpriteFrame, function (err, data) {
            if (err) {
                cc.error(err.message || err);
                return;
            }
            self.show_Role.getComponent(cc.Sprite).spriteFrame = data;
        });

        cc.vv.PublicUI.create_UserinfoBox();
    },
    start(){
        cc.log(this.node.getComponent("GameMain"));
    },
    _test : function(){
        cc.log("_test")
    },
    onLoadScene(e,eventid){

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
            default :
                throw new Error(eventid + "not Find By  ",this.name) 
                break;
        }
    },

});
