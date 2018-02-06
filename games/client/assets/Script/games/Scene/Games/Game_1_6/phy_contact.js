cc.Class({
    extends: cc.Component,

    properties: {
    },

    // use this for initialization
    onLoad: function () {
        this._iswin = false;
        this._canvas = cc.find("Canvas");
    },

    // contact 是碰撞对象,本次碰撞的信息
    // selfCollider: 是自己的碰撞器组件
    // otherCollider: 碰撞到的碰撞器组件;
    // 我们可以有碰撞器组件，来获取我们的碰撞的节点对象
    // 碰撞开始
    onBeginContact: function ( contact, selfCollider, otherCollider) {
        if(otherCollider.tag==2){
            if(!this._iswin){
                this._iswin = true;
                this._canvas.emit("GameControlEvent", {iswin: this._iswin});
            }

        }
    }
});
