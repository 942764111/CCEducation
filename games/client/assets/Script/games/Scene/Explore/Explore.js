

cc.Class({
    extends: cc.Component,

    properties: {
    },

    onLoad(){
        cc.vv.PublicUI.create_UserinfoBox(false);
    },
    onStarClick(e,t){
        cc.vv.PublicUI.create_DialogBox(cc.vv.Userinfo["plantpassindex"]);
    }
});
