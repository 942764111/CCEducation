

cc.Class({
    extends: cc.Component,

    properties: {
        selectBox: {
            default: null,
            type: cc.Node,
            displayName:"选择框",
            tooltip:"选择框"
        }
    },

    onLoad(){
        cc.vv.PublicUI.create_UserinfoBox();
    },
    onStarClick(e,t){
       this.selectBox.active = true;
    },

    onselectBoxClick(e){
        var target = e.target
                     ,self = this;

        function btn_1() {
            cc.vv.PublicUI.create_DialogBox(cc.vv.Userinfo["plantpassindex"]);
        }
        function btn_2() {
            cc.vv.PublicUI.create_DialogBox(cc.vv.Userinfo["plantpassindex"]);
        }
        function btn_3() {
            self.selectBox.active = false;
        }
        switch(target['name']){
            case "btn_1": //继续探索
                btn_1();
                break;
            case "btn_2": //重新探索
                btn_2();
                break;  
            case "btn_3": //返回
                btn_3();
                break;
        }
    },
    onBackClick(){
        cc.director.loadScene("GameMain");
    }
});
