cc.Class({
    extends: cc.Component,

    properties: {
    },

    onLoad () {
    },
    
    setInfo(args){
        var self = this;

        var _styleType = "1";
        if(args){
            _styleType  = args["styleType"]||"1";
        }

        switch(_styleType){
            case "1":
                self.node.getChildByName("btn_1").active = true;
                self.node.getChildByName("btn_3").active = true;
                if(args&&args["txt"]){
                    self.node.getChildByName("lableinfo").active = true;
                    self.node.getChildByName("lableinfo").getComponent(cc.Label).string = args["txt"];
                }
        
                if(args&&args["CallBack"]){
                    self.node.getComponent("SelectBox").onbtn_1CallBack = args["CallBack"].onbtn_1CallBack;
                    self.node.getComponent("SelectBox").onbtn_3CallBack = args["CallBack"].onbtn_3CallBack;
                }
            break;
        }

    },

    onClickEvents(e){

        var target = e.target
                     self = this;

        function onbtn_1(){
            self.node.destroyAllChildren();
            self.destroy();
            cc.vv.PublicUI._get_SelectBox_Instance = false;

            self.onbtn_1CallBack&&self.onbtn_1CallBack();
        }
        function onbtn_3(){
            cc.vv.PublicUI._get_SelectBox_Instance = false;
            self.node.destroyAllChildren();
            self.destroy();
            self.onbtn_3CallBack&&self.onbtn_3CallBack();
        }

        switch(target['name']){
            case "btn_1": //确定
                onbtn_1();
                break;
            case "btn_3": // 取消
                onbtn_3();
                break;
            default:
                throw new Error(target['name']+" Type not Find");
                break;   
        }
    }
});
