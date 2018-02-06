
cc.Class({
    extends: cc.Component,

    properties: {
        is_debug: false, // 是否显示调试信息;
        gravity: cc.p(0, -320), // 系统默认的

        timeLable: {
            default: null,
            type: cc.Label,
        },
        Time : 60,
    },

    onLoad () {
        cc.vv.CG.DIALOG_CONSTANT["callback_1_6"].index+=1;

        cc.director.getPhysicsManager().enabled = true;  // 打开物理引擎
        
        if(this.is_debug){
            var Bits = cc.PhysicsManager.DrawBits;
            cc.director.getPhysicsManager().debugDrawFlags = Bits.e_jointBit | Bits.e_shapeBit;
        }else{ // 关闭调试信息
            cc.director.getPhysicsManager().debugDrawFlags = 0;
        }
        cc.director.getPhysicsManager().gravity = this.gravity;

        this.runGame();
    },
    runGame(){
        var self = this;
        var timetxt = this.timeLable.getComponent(cc.Label);
        timetxt.string =  this.Time;
        function updateTime() {
            if(timetxt.string==0){
                this.unscheduleAllCallbacks();
                this.node.emit("GameControlEvent", {iswin: false});
                return;
            }
            this.Time-=1;
            timetxt.string =  this.Time;
        }
        this.schedule(updateTime.bind(this),1);




        function _createDialogBox(iswin) {
            if(iswin){
                cc.vv.Userinfo["plantpassindex"] = cc.vv.CG.DIALOG_CONSTANT["callback_1_6"]["winNextID"];
            }else if(cc.vv.CG.DIALOG_CONSTANT["callback_1_6"].index===cc.vv.CG.DIALOG_CONSTANT["callback_1_6"].Maxindex){
                cc.vv.Userinfo["plantpassindex"] = cc.vv.CG.DIALOG_CONSTANT["callback_1_6"]["winNextID"];
            }else{
                cc.vv.Userinfo["plantpassindex"] = cc.vv.CG.DIALOG_CONSTANT["callback_1_6"]["failureNextID"];
            }
    
            cc.vv.PublicUI.create_DialogBox(cc.vv.Userinfo["plantpassindex"]);
        }


        // update iswin
        this.node.on("GameControlEvent",function(data){
            if(!data["detail"]["iswin"]){
                self.unscheduleAllCallbacks();
            }
            _createDialogBox(data["detail"]["iswin"]);
        })
    }
});
