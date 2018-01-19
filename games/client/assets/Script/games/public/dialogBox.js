
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

    /**
     * 下一步
     */
    onNextStep() {
        var self = this;
        var data =self._getplantData(cc.vv.Userinfo["plantindex"])[cc.vv.Userinfo["plantpassindex"]];
        cc.log(data["next"]);
        if(cc.vv.GN.Obj.instanceOf(data["next"],"String")){
            this.node.getComponent(cc.Button).interactable = false;
            this._onNextCallBack(data["next"]);
        }else{
            cc.vv.PublicUI.create_DialogBox(data["next"]);
            cc.vv.Userinfo["plantpassindex"] = data["next"];
        }
    },

    onSelectOneAnswer(e,t){
        if(this.getOnedata["answer"]===t){
            cc.vv.Userinfo["plantpassindex"] = 9;
        }else{
            cc.vv.Userinfo["plantpassindex"] = 8;
            cc.vv.CG.DIALOG_CONSTANT['One']['Maxindex'] = 4;
        }


        var index = cc.vv.CG.DIALOG_CONSTANT['One']['index']
        var maxindex = cc.vv.CG.DIALOG_CONSTANT['One']['Maxindex']
        if(index>=maxindex){
            cc.vv.Userinfo["plantpassindex"] = 10;
        }
        //下一步
        this._clearAllScreen();
        var data =this._getplantData(cc.vv.Userinfo["plantindex"])[cc.vv.Userinfo["plantpassindex"]];
        cc.vv.PublicUI.create_DialogBox(data["id"]);
        this.node.getComponent(cc.Button).interactable = true;
    },

    /**
     * 下一步得回调
     */
    _onNextCallBack(type){
        var self = this;
        function One() {

            var issuedata = cc.vv.CG.ISSUE_LIBRARYS_JSON;
            //清空下方对话框文本
            self.isshowDialogBox_txt.string = "";
            //显示第一关对话框
            var issueimg = self.node.getChildByName("issueimg");
            var lable = self.node.getChildByName("issueimg").getChildByName("txt").getComponent(cc.Label);
            issueimg.active = true;

            //随机一个题目

            var randomOne;
            if( cc.vv.CG.DIALOG_CONSTANT['One']['index']>0){
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

            cc.vv.CG.DIALOG_CONSTANT['One']['index']  +=1; //进入次数
        }
        function Exit() {
            self.node.destroyAllChildren();
            self.node.destroy();
            cc.vv.PublicUI._get_DialogBox_Instance = false;
            cc.vv.Userinfo.updateUserDialog(cc.vv.Userinfo["plantpassindex"]);
        }
        switch (type) {
            case "callback_1_6":
                One();
                break;
            case "Exit": //退出
                Exit();
                break;
            default:
                throw new Error("type not Find");
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
