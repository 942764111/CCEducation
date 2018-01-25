var HTTP  = require("HTTP");
var CG = require("Config");
var GN = require("public");
var UserManager = require("UserManager"); 
var PublicUIManger = require("PublicUIManger"); 
cc.Class({
    extends: cc.Component,

    properties: {
        accountEditBox : {
            default : null,
            type:cc.EditBox,
            displayName:"账号输入框",
            tooltip:"账号输入框"
        },
        passwordEditBox : {
            default : null,
            type:cc.EditBox,
            displayName:"密码输入框",
            tooltip:"密码输入框"
        },
        testLable : {
            default : null,
            type:cc.RichText
        }
    },
    onLoad(){
        
        cc.vv = {};
        cc.vv.CG = CG;
        cc.vv.HTTP = HTTP;
        cc.vv.GN = GN;
        cc.vv.Userinfo = new UserManager();
        cc.vv.PublicUI = new PublicUIManger();
        /**
         * 加载客户端json
         */
        cc.vv.CG.INIT_JSON();
    },

    /**
     * 登陆
     */
    onLogin(){
        var self = this;
        var account_str = this.accountEditBox.string;
        var password_str = this.passwordEditBox.string;
        var data = {
            "account":account_str,
            "password":password_str
        }
        cc.vv.HTTP.sendRequest('/loginGame',data,function(data){
            if(data){
                if(data["code"]=='0'){
                    cc.vv.Userinfo["uname"] =  data["userInfo"]["uname"];
                    cc.vv.Userinfo["uid"] = data["userInfo"]["uid"];
                    cc.vv.Userinfo["sign"] = data["sign"]; 
                    cc.vv.Userinfo["account"] = data["userInfo"]["account"];
                    cc.vv.Userinfo["role"] = data["userInfo"]["role"];
                    cc.vv.Userinfo["lv"] = data["userInfo"]["lv"];
                    cc.vv.Userinfo["exp"] = data["userInfo"]["exp"];
                    cc.vv.Userinfo["gems"] = data["userInfo"]["gems"];
                    cc.vv.Userinfo["plantpassindex"] = data["userInfo"]["plantpassindex"];
                    cc.vv.Userinfo["plantindex"] = data["userInfo"]["plantindex"];
                    self.loadScene();
                }else{
                    cc.vv.PublicUI.create_SelectBox({
                        "txt":data.msg
                    });
                }
            }

        })
    },
    /**
     * 注册
     */
    onregister(){
        var self = this;
        var account_str = this.accountEditBox.string;
        var password_str = this.passwordEditBox.string;
        var data = {
            "account":account_str,
            "password":password_str
        }
        cc.vv.HTTP.sendRequest('/register',data,function(data){
            if(data){
                if(data["code"]=='0'){
                    cc.vv.PublicUI.create_SelectBox({
                        "txt":"注册成功！！"
                    });
                }else{
                    cc.vv.PublicUI.create_SelectBox({
                        "txt":data.msg
                    });
                }
            }
        })
    },
    /**
     * 加载场景
     * @param {*场景名字} scenename 
     */
    loadScene(){
        if(cc.vv.Userinfo["uname"]){
            cc.director.loadScene("GameMain");
        }else{
            cc.director.loadScene("SelectRolebg");
        }
        
    }
});
