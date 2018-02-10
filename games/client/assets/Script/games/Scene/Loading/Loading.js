
cc.Class({
    extends: cc.Component,

    properties: {
        progressBar : {         //进度条节点
            default : null,
            type : cc.Node,     
        },
        progressData : {        //进度百分比
            default : null,
            type : cc.Label,
        },
        status : {              //加载资源进度
            default : null,
            type : cc.Label,
        }
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.proBar = this.progressBar.getComponent(cc.ProgressBar);  //得到组件
        this.initTime();
        this.loadSources();
        this.compDegress = 0; //完成度
        this.comFlag = false; //完成标志
    },
    loadSources(){
        this.status.string = "正在载入游戏资源";
        this.scheduleOnce(function(){
            this.status.string = cc.vv.CG.TIPS_JSON[cc.vv.GN.Num.randomNumber(0,4)]["tips"];
        },1);
        var self = this;
        cc.loader.loadResDir("res",function(compCount,totalCount,item){
            self.compDegress = compCount / totalCount;
        },function(err,assets){
            if(err){
                cc.log("load sources is error");
            }
            self.comFlag = true;
            self.status.string = "已经完成载入资源";

            //场景淡出
            self.picFadeOut(function(){
                if(cc.vv.Userinfo["uname"]){
                    cc.director.loadScene("GameMain");
                }else{
                    cc.director.loadScene("SelectRolebg");
                }

            });
        });

    },


    initTime(){
     
        this.nowTime = 0;  //当前已经过去的时间
        this.allTime = 10; //总时间

    },

    start () {

    },

    //刷新函数
    update (dt) {
        if(this.comFlag){
            this.status.string = "即将开始游戏，请稍后";
        }else {
            this.proBar.progress = this.compDegress;
            this.progressData.string = parseInt(this.compDegress * 100) + "%";
        }
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
});
