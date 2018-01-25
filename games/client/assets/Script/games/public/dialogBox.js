
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
        },

    },

    setInfo(plantpassindex){
        var self = this;
        var data =self._getplantData(cc.vv.Userinfo["plantindex"]);

        function setshowRole(roletype){
           var getroleobj = roletype=="left"?self.left_role:self.rightid_role
                     ,roleid = roletype=="left"?"leftid":"rightid";
            var roleres;
            if(data[plantpassindex][roleid]=="self"){ //自己

                getroleobj.active = true;
                roleres = cc.vv.CG.ROLE_JSON[cc.vv.Userinfo["role"]]["img"];
                cc.loader.loadRes('textures/images/Role/'+roleres, cc.SpriteFrame, function (err, data) {
                    if (err) {
                        cc.error(err.message || err);
                        return;
                    }
                    getroleobj.getComponent(cc.Sprite).spriteFrame  = data;
                });

            }else if(data[plantpassindex][roleid]>0){ //role ID

                getroleobj.active = true;
                roleres = cc.vv.CG.ROLE_JSON[data[plantpassindex][roleid]]["img"];
                cc.loader.loadRes('textures/images/Role/'+roleres, cc.SpriteFrame, function (err, data) {
                    if (err) {
                        cc.error(err.message || err);
                        return;
                    }
                    getroleobj.getComponent(cc.Sprite).spriteFrame  = data;
                });

            }else{
                getroleobj.active = false;
            }
        }

        setshowRole("left");
        setshowRole("right");
        self.isshowDialogBox.active =  data[plantpassindex]["isshowDialogBox"];
        self.isshowDialogBox_txt.string =  data[plantpassindex]["isshowDialogBox_txt"];
    },

    /**
     * 下一步
     */
    onNextStep() {
        var self = this;
        var data =self._getplantData(cc.vv.Userinfo["plantindex"])[cc.vv.Userinfo["plantpassindex"]];
        cc.log(data["next"]);
        if(cc.vv.GN.Obj.instanceOf(data["next"],"String")){
            this.node.getComponent(cc.Button).interactable = false;
            this._onNextCallBack(data);
            
        }else{
            self.setInfo(data["next"]);
            cc.vv.Userinfo["plantpassindex"] = data["next"];
        }
    },

    onSelectOneAnswer(e,t){
        var self = this;
        if(this.getOnedata["answer"]===t){
            cc.vv.Userinfo["plantpassindex"] = 9;
        }else{
            cc.vv.Userinfo["plantpassindex"] = 8;
            cc.vv.CG.DIALOG_CONSTANT['callback_1_2']['Maxindex'] = 4;
        }


        var index = cc.vv.CG.DIALOG_CONSTANT['callback_1_2']['index']
        var maxindex = cc.vv.CG.DIALOG_CONSTANT['callback_1_2']['Maxindex']
        if(index>=maxindex){
            cc.vv.Userinfo["plantpassindex"] = 10;
        }
        //下一步
        this._clearAllScreen();
        var data =this._getplantData(cc.vv.Userinfo["plantindex"])[cc.vv.Userinfo["plantpassindex"]];
        self.setInfo(data["id"]);
        this.node.getComponent(cc.Button).interactable = true;
    },

    /**
     * 下一步得回调
     */
    _onNextCallBack(type){
        var self = this;

        function _Save(){
            if(type["save"]){
                cc.vv.Userinfo.updateUserDialog(cc.vv.Userinfo["plantindex"],type["save"]);
            }
        }
        
        function _loadScene(scenename){
            cc.vv.PublicUI._get_DialogBox_Instance = false;
            cc.director.loadScene(scenename);
        }

        /**
         * _Callback_新球id_新球中关卡id
         */
        function _Callback_1_1() {

            var issuedata = cc.vv.CG.ISSUE_LIBRARYS_JSON;
            //清空下方对话框文本
            self.isshowDialogBox_txt.string = "";
            //显示第一关对话框
            var issueimg = self.node.getChildByName("issueimg");
            var lable = self.node.getChildByName("issueimg").getChildByName("txt").getComponent(cc.Label);
            issueimg.active = true;

            //随机一个题目

            var randomOne;
            if( cc.vv.CG.DIALOG_CONSTANT['callback_1_2']['index']>0){
                randomOne = cc.vv.GN.Num.randomNumber(4,17);
            }else{
                randomOne = cc.vv.GN.Num.randomNumber(1,3);
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

            cc.vv.CG.DIALOG_CONSTANT['callback_1_2']['index']  +=1; //进入次数
        }


        function _Callback_1_2() {
            _loadScene("Game_1_2");
        }

        function _Exit() {
            self.node.destroyAllChildren();
            self.node.destroy();
            cc.vv.PublicUI._get_DialogBox_Instance = false;
            _Save();
            if(cc.director.getScene().name!="Explore"){
                cc.director.loadScene("Explore");
            }
        }

        switch (type["next"]) {
            case "callback_1_7":
                _Callback_1_1();
                break;
            case "callback_1_15":
                _Callback_1_2();
                break;      
            case "Exit": //退出
                _Exit();
                break;    
            default:
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
    // update (dt) {},
});
