

cc.Class({
    extends: cc.Component,

    properties: {
        stars : {
            default : null,
            type : cc.Node
        },
        btn_1Node : { //继续探索
            default : null,
            type : cc.Node
        },

        btn_2Node : { //重新探索
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

        if(cc.vv.Userinfo["plantpassindex"].toString()>="39"){
            this.btn_1Node.active = false;
            this.btn_2Node.active = true;
        }else{
            this.btn_1Node.active = true;
            this.btn_2Node.active = false;
        }
    },

    start () {

    },

    // update (dt) {},
});
