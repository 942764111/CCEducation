
cc.Class({
    extends: cc.Component,

    properties: {
        HintRuneNode: {
            default: null,
            type: cc.Node,
            displayName:"提示符文父节点",
            tooltip:"提示符文父节点"
        },

        passwordBtns: {
            default: null,
            type: cc.Node,
            displayName:"密码按钮父节点",
            tooltip:"密码按钮父节点"
        },

        RuneAllNode: {
            default: null,
            type: cc.Node,
            displayName:"显示所有符文父节点",
            tooltip:"显示所有符文父节点"
        },

        passwordLable :{
            default: null,
            type: cc.Label,
            displayName:"密码文本框",
            tooltip:"密码文本框"
        },
        pageview: {
            default: null,
            type: cc.ScrollView,
            displayName:"新手引导节点",
            tooltip:"新手引导节点"
        }
    },
    onGameStart(){
        this.pageview.node.destroyAllChildren();
        this.pageview.node.destroy();
        this._F_gameStateControl();
    },
    onLoad () {
        cc.vv.CG.DIALOG_CONSTANT["callback_1_4"].index+=1;
    },
    _F_gameStateControl(State){
        var self = this;
        function init() {
            self._F_game_init();
        }
        function run() {
          //  self._F_game_run();
        }
        function rwfeesh() {
            
        }
        function over() {
            self._F_game_init("1");
        }
        switch(State){
            case cc.vv.CG.DIALOG_CONSTANT.GAME_RUN_STATE.INIT:
                init();
             break;
            case cc.vv.CG.DIALOG_CONSTANT.GAME_RUN_STATE.RUN:
                run();
             break;
            case cc.vv.CG.DIALOG_CONSTANT.GAME_RUN_STATE.RWFEESH:
               
             break; 
            case cc.vv.CG.DIALOG_CONSTANT.GAME_RUN_STATE.OVER:
                over();
             break;
             default : 
                init();
                run();
             break;
        }
    },
    //游戏初始化
    _F_game_init(type){
        var self = this;
        function _variable() {
            var CG = cc.vv.CG;
            self._RESULT = "";
        }
        function _sprite() {
            var CG = cc.vv.CG;
            var get_random_pass = CG.GAME_1_4_JSON[1];

            function loaderRes(type,children,indexeDataIDs,callback) {
                var index= 0
                    ,URL = ""
                    ,getAllid = indexeDataIDs
                    ,getData  = CG.GAME_1_4_RUNE_JSON;

                function loaderImg() {
                    if(index==children.length){
                        index = 0; 
                        return;
                    }
                    if(!children[index].active){
                        children[index].active = true;
                    }
                    switch(type){
                        case "RUNE":
                            URL = 'res/textures/images/game_1_4/runes/'+getData[getAllid[index]]["img"];
                         break;
                         case "PW":
                            URL = 'res/textures/images/game_1_4/password/pw_'+getData[getAllid[index]]["password"]+"";
                         break;
                    }
                    cc.loader.loadRes(URL, cc.SpriteFrame, function (err, data) {
                        if (err) {
                            cc.error(err.message || err);
                            return;
                        }
                        callback&&callback(data,index);
                        index++;
                        loaderImg();
                    });
                }
                loaderImg();
            }
            function init_HintRuneNode_info() {
                var getAllid = get_random_pass["prompt"].split(',')
                   ,getData  = CG.GAME_1_4_RUNE_JSON
                   ,children = self.HintRuneNode.children
                   ,Runeindex = 0
                   ,pwindex = 0;
                   function loaderRune() {
                        loaderRes("RUNE",children,getAllid,function(data,i) {
                            children[i].getChildByName("rune").getComponent(cc.Sprite).spriteFrame = data;
                        })
                   }
                    
                   function loaderPassWord() {
                        loaderRes("PW",children,getAllid,function(data,i) {
                            children[i].getChildByName("password").getComponent(cc.Sprite).spriteFrame = data;
                        })
                    }

                   loaderRune();//加载符文
                   loaderPassWord();//加载相对密码
            }

            function init_RuneAllNode_info() {
                var getAllid = get_random_pass["rune"].split(',') 
                    ,getData = CG.GAME_1_4_RUNE_JSON
                    ,Runeindex = 0
                    ,children = self.RuneAllNode.children;

                    
                    
                    loaderRes("RUNE",children,getAllid,function(data,i) {
                        children[i].getComponent(cc.Sprite).spriteFrame = data;
                        self._RESULT+=getData[getAllid[i]]["password"];
                    })
            }

            function init_PasswordBtns_info() {
                var getAllid = get_random_pass["prompt"].split(',') 
                    ,getData = CG.GAME_1_4_RUNE_JSON
                    ,pwindex = 0
                    ,children = self.passwordBtns.children;
                    
                    loaderRes("PW",children,getAllid,function(data,i) {
                        children[i].getChildByName("img").getComponent(cc.Sprite).spriteFrame = data;
                        children[i]["password"] = getData[getAllid[i]]["password"];
                    });
            }

            init_HintRuneNode_info();
            init_RuneAllNode_info();
            init_PasswordBtns_info();
        }
        switch(type){
            case "1"://只初始化变量
            _variable();
            break;

            case "2"://初始化页面精灵
            _sprite();
            break;

            default:
            _variable();
            _sprite();
            break;
        }
    },

    onPassWordEvents(e){
        var target = e.target;
        if(this.passwordLable.getComponent(cc.Label).string.length>=15){
            cc.vv.PublicUI.create_SelectBox({
                "txt":"密码超过最大长度"
            });
            return;
        }
        this.passwordLable.getComponent(cc.Label).string+=target["password"];
    },
    onBackoutEvent(e){
        var target = e.target;
        var str = this.passwordLable.getComponent(cc.Label).string;
        var strtoArr = str.split("");
        strtoArr.splice(str.length-1,1);
        this.passwordLable.getComponent(cc.Label).string = cc.vv.GN.Str.replaceAll(strtoArr.toString(),',','');
    },
    onsubmitEvent(){
        var self = this;
        
        function _createDialogBox(iswin) {
            if(iswin){
                cc.vv.Userinfo["plantpassindex"] = cc.vv.CG.DIALOG_CONSTANT["callback_1_4"]["winNextID"];

                //更新分数
                cc.vv.UserScoreinfo.updateUserScore(4);

            }else if(cc.vv.CG.DIALOG_CONSTANT["callback_1_4"].index==cc.vv.CG.DIALOG_CONSTANT["callback_1_4"].Maxindex){
                cc.vv.Userinfo["plantpassindex"] = cc.vv.CG.DIALOG_CONSTANT["callback_1_4"]["winNextID"];

                //更新分数
                cc.vv.UserScoreinfo.updateUserScore(4);

            }else{
                cc.vv.Userinfo["plantpassindex"] = cc.vv.CG.DIALOG_CONSTANT["callback_1_4"]["failureNextID"];

               if(cc.vv.UserScoreinfo["game_1_4"]>=5){
                    cc.vv.UserScoreinfo["game_1_4"]-=5;
                }
            }
    
            cc.vv.PublicUI.create_DialogBox(cc.vv.Userinfo["plantpassindex"]);
        }
        function _iswin() {
            var password = cc.vv.GN.Str.trim(self.passwordLable.getComponent(cc.Label).string,1);
            var result = cc.vv.GN.Str.trim(self._RESULT,1);
            return password===result;
        }

        _createDialogBox(_iswin());

    }
});
