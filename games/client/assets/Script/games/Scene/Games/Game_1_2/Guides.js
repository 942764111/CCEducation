
cc.Class({
    extends: cc.Component,

    properties: {
        _index : 0,
    },
    onLoad(){
        var children = this.node.children;
    },
    onClickEvents(){
        var self = this;
        this.node.enabled = false;
        this.picFadeOut(self.node.children[self._index],function(){
            self.node.children[self._index].active = false;
            if(self._index+=1>=self.node.children.length){
                cc.log("OK")
            }else{
                self._index+=1;
                self.node.children[self._index].active = true;
                self.node.enabled = true;
            }

        })
    }

});
