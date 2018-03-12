
cc.Class({
    extends: cc.Component,

    properties: {
        item_Prefab : {
            default: null,
            type: cc.Prefab,
        },
        layout_Node : {
            default: null,
            type: cc.Node,
        },
    },

    onLoad () {
        
        for(var i=0;i<9;i++){
            var item = cc.instantiate(this.item_Prefab);
            item.x = this.layout_Node.getChildByName("item_"+(i+1)).x;
            item.y = this.layout_Node.getChildByName("item_"+(i+1)).y;
            this.layout_Node.addChild(item);
        }

    },
});
