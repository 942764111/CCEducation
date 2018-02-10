

cc.Class({
    extends: cc.Component,

    properties: {
        stars : {
            default : null,
            type : cc.Node
        }
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        var childrens = this.stars.children
            ,starsindex;
        for(var i=0;i<childrens.length;i++){
            starsindex = childrens[i].name.split('_')[1];
            if(parseInt(starsindex)<=cc.vv.Userinfo["plantpassindex"]){
                childrens[i].getChildByName("star").active = true;
            }
        }
    },

    start () {

    },

    // update (dt) {},
});
