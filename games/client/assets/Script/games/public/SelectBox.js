cc.Class({
    extends: cc.Component,

    properties: {
    },

    onLoad () {
        var lableinfo = this.node.getChildByName("lableinfo").getComponent(cc.Label);
        lableinfo.string = cc.vv.CG.SELECT_BOX.INFO;
    },

    /**
     * 确定
     */
    onpass(){
        this.node.destroyAllChildren();
        this.destroy();
        cc.vv.PublicUI._get_SelectBox_Instance = false;
    },

    /**
     * 取消
     */
    onwarning(){
        this.node.destroyAllChildren();
        this.destroy();
        cc.vv.PublicUI._get_SelectBox_Instance = false;
    },

    start () {

    },

    // update (dt) {},

    // this.node.prototype
});
