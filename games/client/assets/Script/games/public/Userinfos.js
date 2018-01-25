

cc.Class({
    extends: cc.Component,

    properties: {
        user_headimg : {
            default : null,
            type:cc.Node,
            displayName:"用户头像",
            tooltip:"用户头像"
        },
        user_nametxt : {
            default : null,
            type:cc.Label,
            displayName:"用户名称",
            tooltip:"用户名称"
        },
        user_gems_txt : {
            default : null,
            type:cc.Label,
            displayName:"用户宝石",
            tooltip:"用户宝石"
        },
    },

     onLoad () {
        this.initUserinfo();
     },
    
    initUserinfo(){
        this.user_nametxt.string = cc.vv.Userinfo["uname"];
        this.user_gems_txt.string =  cc.vv.Userinfo["gems"];
    },
    onClickEvent(e,t){
        cc.vv.PublicUI.buttonCallBack();
    }
});
