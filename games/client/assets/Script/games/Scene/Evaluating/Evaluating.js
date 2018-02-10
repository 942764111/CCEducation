
cc.Class({
    extends: cc.Component,

    properties: {
        score_list_node : {
            default : null,
            type:cc.Node,
            displayName:"分数列表节点",
            tooltip:"分数列表节点"
        },
        epiloguetxt : {
            default : null,
            type:cc.Label,
            displayName:"总结语Label",
            tooltip:"总结语Label"
        },

        languageBar : {
            default : null,
            type:cc.ProgressBar,
            displayName:"语言智商进度条",
            tooltip:"语言智商进度条"
        },

        operationBar : {
            default : null,
            type:cc.ProgressBar,
            displayName:"操作智商进度条",
            tooltip:"操作智商进度条"
        },


    },

    onLoad () {
       this.setinfo();

       this.setlanguageBar();

       this.setoperationBar();
    },

    setinfo(){

        this.epiloguetxt.getComponent(cc.Label).string = "您孩子的语言能力较弱，可以针对性的进行以下训练：常识、背数、算数"

        var children = this.score_list_node.children;
        for(var i=0;i<children.length;i++){
            children[i].getChildByName("txt").getComponent(cc.Label).string = cc.vv.UserScoreinfo["game_1_"+(i+1)]||0;
        }

    },
    setlanguageBar(){
        //获取当前 语言智商分数 
        function getCurrentScore() {
            var score = 0;
            for(var i=1;i<=4;i++){
                score+= cc.vv.UserScoreinfo["game_1_"+(i)];
            }
            return score;
        }
        cc.log("当前分为"+ getCurrentScore());
        var proBar = this.languageBar.getComponent(cc.ProgressBar);  //得到组件
        proBar.progress = getCurrentScore()/80;
    },

    setoperationBar(){
        //获取当前 操作智商分数 
        function getCurrentScore() {
            var score = 0;
            for(var i=5;i<=6;i++){
                score+= cc.vv.UserScoreinfo["game_1_"+(i)];
            }
            return score*2;
        }
        cc.log("当前分为"+ getCurrentScore());
        var proBar = this.operationBar.getComponent(cc.ProgressBar);  //得到组件
        proBar.progress = getCurrentScore()/80;
    },

    onback_btn(){
        this.node.destroyAllChildren();
        this.node.destroy();
    }
});
