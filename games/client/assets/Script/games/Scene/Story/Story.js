
cc.Class({
    extends: cc.Component,

    properties: {
        touch_nextNode:{
            default: null,
            type: cc.Node,
        }
    },

    onLoad () {
        var self = this;
        this.scheduleOnce(function(){
            self.touch_nextNode.active = true;
            self.node.getComponent(cc.Button).interactable = true;
        },4);
    },

    onClickEvent(){
        var self = this;
        self.node.getComponent(cc.Button).interactable = false;
        //场景淡出
        this.picFadeOut(function(){
            if(cc.vv.Userinfo["uname"]){
                cc.director.loadScene("GameMain");
            }else{
                cc.director.loadScene("SelectRolebg");
            }

        });

    },

    //场景淡出
    picFadeOut(callback){
        var picN = cc.find("Canvas");
        var fadeTiem = 3000; //淡出总时间
        var nowTime = Date.now(); //开始淡出的时间
        var timePercent = 0; //淡出百分比

        var changeFade = function() {
            //cc.log("changFade");
            
            //每过一段时间就减少一点透明度
            var duringTime = Date.now() - nowTime; //已经过去的时间
            timePercent = duringTime / fadeTiem; //已经过去的时间所占的百分比
            if(timePercent > 1){
                timePercent = 1;
            }
            //cc.log("timePercent:",timePercent);
            picN.opacity = 255 - timePercent * 255; //设置为他剩余的透明度
            if(timePercent == 1){
                cc.log("active is  false");
                try{
                    callback();
                }catch(e){
                }

                return;
            }else{
                setTimeout(changeFade,25);
            }
        }
        setTimeout(changeFade,25);
    }, 


    // update (dt) {},
});
