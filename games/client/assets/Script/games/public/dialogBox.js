
cc.Class({
    extends: cc.Component,
    properties: {

        left_role : {
            default : null,
            type:cc.Node,
            displayName:"left_role",
            tooltip:"left_role"
        },
        rightid_role : {
            default : null,
            type:cc.Node,
            displayName:"rightid_role",
            tooltip:"rightid_role"
        },
        isshowDialogBox_txt : {
            default : null,
            type:cc.Label,
            displayName:"对话框文本",
            tooltip:"对话框文本"
        },
        isshowDialogBox : {
            default : null,
            type:cc.Node,
            displayName:"对话框Node",
            tooltip:"对话框Node"
        }
    },
    onLoad(){
        //临时  播放动画
        var self = this;
        
        

        //临时
        var updateAnimationData,updateAnimationData2;
        this.node.on("playAnimation",function(data){
            updateAnimationData = data["detail"]["sprite"];
            if(data["detail"]["sprite"]){
                self.schedule(function(){
                    updateAnimationData.playAnimation('idle',1); 
                },3)
            }

        })


        this.node.on("playAnimation2",function(data){
            updateAnimationData2 = data["detail"]["sprite"];
            if(data["detail"]["sprite"]){
                self.schedule(function(){
                    updateAnimationData2.playAnimation('idle',1); 
                },3)
            }

        })

    },
    setInfo(plantpassindex,args){
        var self = this;
        var data =self._getplantData(cc.vv.Userinfo["plantindex"]);

        
        function setbg(){
            if(data[plantpassindex]["background"]){
                cc.log(data[plantpassindex]["background"]);
                cc.loader.loadRes('res/refab/bg/'+data[plantpassindex]["background"], function (err, prefab) {
                    if (err) {
                        cc.error(err.message || err);
                        return;
                    }
                    var prefab = cc.instantiate(prefab);
                    self.node.getChildByName("bg").addChild(prefab);
                });

            }
        }

        function setshowRole(roletype){
           var getroleobj = roletype=="left"?self.left_role:self.rightid_role
                     ,roleid = roletype=="left"?"leftid":"rightid";
            var roleres;
            if(!getroleobj)return;
            if(data[plantpassindex][roleid]=="self"){ //自己  
                getroleobj.active = true;

                cc.vv.PublicUI.create_Role(cc.vv.Userinfo["role"],getroleobj,{
                    "playTimes":1
                },function(sprite){
                    if(sprite instanceof dragonBones.ArmatureDisplay){
                        if(!sprite.isTimeout){
                            sprite.isTimeout = true;
                            self.node.emit("playAnimation2",{"sprite":sprite});
                        }

                    }
                });

            }else if(data[plantpassindex][roleid]>0){ //role ID
    
                getroleobj.active = true;
                cc.vv.PublicUI.create_Role(data[plantpassindex][roleid],getroleobj,{
                    "playTimes":1
                },function(sprite){
                    if(sprite instanceof dragonBones.ArmatureDisplay){
                        if(!sprite.isTimeout){
                            sprite.isTimeout = true;
                            self.node.emit("playAnimation",{"sprite":sprite});
                        }

                    }
                });
     

            }else{
                getroleobj.active = false;
            }
        }

        function setDialogBox_txt(){
            self.isshowDialogBox.active =  data[plantpassindex]["isshowDialogBox"];
            if(args&&args["DialogBox_txt"]){
                self.isshowDialogBox_txt.string =  cc.vv.GN.Str.stringFormat(data[plantpassindex]["isshowDialogBox_txt"],args["DialogBox_txt"]) ;
            }else{
                self.isshowDialogBox_txt.string =  data[plantpassindex]["isshowDialogBox_txt"];
            }
        }
        setbg();
        setshowRole("left");
        setshowRole("right");
        setDialogBox_txt();
    },

    /**
     * 下一步
     */
    onNextStep() {
        var self = this;
        var data =self._getplantData(cc.vv.Userinfo["plantindex"])[cc.vv.Userinfo["plantpassindex"]];
        if(cc.vv.GN.Obj.instanceOf(data["next"],"String")){
            this.node.getComponent(cc.Button).interactable = false;
            this._onNextCallBack(data);
            
        }else{
            self.setInfo(data["next"]);
            cc.vv.Userinfo["plantpassindex"] = data["next"];
        }


        function _Save(){
            if(!cc.vv.PublicUI._DialogBox_isLocal && data["save"]){
                cc.vv.Userinfo.updateUserDialog(cc.vv.Userinfo["plantindex"],data["save"]);
            }
        }
        _Save();
    },

    onSelectOneAnswer(e,t){
        var self = this;
        if(this.getOnedata["answer"]===t){
            cc.vv.Userinfo["plantpassindex"] = 9; //成功

            cc.vv.UserScoreinfo["game_1_1"]+=5;
        }else{
            cc.vv.Userinfo["plantpassindex"] = 8; //失败

            if(cc.vv.UserScoreinfo["game_1_1"]>=5){
                cc.vv.UserScoreinfo["game_1_1"]-=5;
            }
        }


        var index = cc.vv.CG.DIALOG_CONSTANT['callback_1_1']['index']
        var maxindex = cc.vv.CG.DIALOG_CONSTANT['callback_1_1']['Maxindex']
        if(index>=maxindex){
            cc.vv.Userinfo["plantpassindex"] = 10;
            //更新分数
            cc.vv.UserScoreinfo.updateUserScore(1);
        }
        //下一步
        this._clearAllScreen();
        var data =this._getplantData(cc.vv.Userinfo["plantindex"])[cc.vv.Userinfo["plantpassindex"]];
        self.setInfo(data["id"],{
            "DialogBox_txt":[this.getOnedata["answer"]]
        });
        this.node.getComponent(cc.Button).interactable = true;
    },

    /**
     * 下一步得回调
     */
    _onNextCallBack(type){
        var self = this;
        
        function _loadScene(scenename){
            self.node.destroyAllChildren();
            self.node.destroy();
            cc.vv.PublicUI._get_DialogBox_Instance = false;
            cc.director.loadScene(scenename);
        }

        /**
         * _Callback_新球id_新球中关卡id
         */
        function _Callback_1_1() {
            var CG = cc.vv.CG;
            var issuedata = CG.ISSUE_LIBRARYS_JSON;
            var CG_callback_1_1 = CG.DIALOG_CONSTANT['callback_1_1'];
  
            //清空下方对话框文本
            self.isshowDialogBox_txt.string = "";
            //显示第一关对话框
            var issueimg = self.node.getChildByName("issueimg");
            var lable = self.node.getChildByName("issueimg").getChildByName("txt").getComponent(cc.Label);
            issueimg.active = true;

            //随机一个题目
            var randomOne;
            if( CG_callback_1_1['index']<=0){
                randomOne = cc.vv.GN.Arr.randomOne(CG_callback_1_1["random_scope"]["1"]);
                CG_callback_1_1["random_scope"]["1"].splice(CG_callback_1_1["random_scope"]["1"].indexOf(randomOne),1);
            }else{
                randomOne = cc.vv.GN.Arr.randomOne(CG_callback_1_1["random_scope"]["2"]);
                CG_callback_1_1["random_scope"]["2"].splice(CG_callback_1_1["random_scope"]["2"].indexOf(randomOne),1);
            }

            self.getOnedata = issuedata[randomOne];
            lable.string = self.getOnedata["title"];

            //设置题目映射选项
            self.isshowDialogBox.getChildByName("One_txt").active = true;
            var getone_txts = self.isshowDialogBox.getChildByName("One_txt").children;
            var getone_txtnode = null;
            var getone_txtLable = null;
            var getselects = self.getOnedata["select"].split(",");

            for(var i=0;i<getselects.length;i++){
                getone_txtnode = getone_txts[i];
                getone_txtLable = getone_txtnode.getComponent(cc.Label);
                getone_txtLable.string = getselects[i];
            }

            cc.vv.CG.DIALOG_CONSTANT['callback_1_1']['index']  +=1; //进入次数
        }


        function _Callback_1_2() {
            _loadScene("Game_1_2");
        }

        function _Callback_1_3() {
            _loadScene("Game_1_3");
        }

        function _Callback_1_4() {
            _loadScene("Game_1_4");
        }

        function _Callback_1_5() {
            _loadScene("Game_1_5");
        }

        function _Callback_1_6() {
            _loadScene("Game_1_6");
        }

        function _Exit(callback) {
            self.node.destroyAllChildren();
            self.node.destroy();
            cc.vv.PublicUI._get_DialogBox_Instance = false;
            if(cc.director.getScene().name!="Explore"){
                cc.director.loadScene("Explore",callback&&callback);
            }
        }


        function _showEvaluating(){
               cc.loader.loadRes('res/prefab/evaluating', function (err, data) {
                if (err) {
                    cc.error(err.message || err);
                    return;
                }

                var getsEvaluatingNode = cc.instantiate(data);
                cc.director.getScene().getChildByName('Canvas').addChild(getsEvaluatingNode);
            });

        }

        switch (type["next"]) {
            case "callback_1_7":
                _Callback_1_1();
                break;
            case "callback_1_15":
                _Callback_1_2();
                break;     
            case "callback_1_24":
                _Callback_1_3();
                break;     
            case "callback_1_33":
                _Callback_1_4();
                break;   
            case "callback_1_40":
                _Callback_1_5();
                break;
            case "callback_1_46":
                _Callback_1_6();
                break;           
            case "Exit": //退出
                _Exit();
                break; 
            case "showEvaluating": //显示   评估页面
                _Exit(function(){
                    _showEvaluating();
                });
                break;
            default:
                _Exit();
                throw new Error(type["next"]+" type not Find");
                break;
        }
    },

    _clearAllScreen(){
        this.isshowDialogBox_txt.string = "";
        this.isshowDialogBox.getChildByName("One_txt").active = false;
        this.node.getChildByName("issueimg").active = false;
        this.left_role.active = false;
        this.rightid_role.active = false;
    },
    _getplantData(userplant){
        return cc.vv.CG["PLANT_"+userplant+"_JSON"];
    }
});
