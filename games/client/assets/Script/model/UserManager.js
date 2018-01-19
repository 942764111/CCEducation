
cc.Class({
    extends: cc.Component,

    properties: {
        uid : null,      //用户id
        account : null,     //用户账号
        uname : null,       //用户昵称
        sex  : 1,       //1: 男 ;  2 : 女
        role : 1,       // 用户角色
        lv : 1,         //等级从1开始
        exp : 0,        //经验从0开始
        gems : 0,       //宝石从0开始
        sign : null,    //用户安全秘钥
        vip  : 0,       //用户vip
        plantpassindex : 1, //用户星球中得关卡索引ID
        plantindex  :   1,//目前用户处在哪个星球关卡
    },

    /**
     * 更新用户关卡索引ID
     */
    updateUserDialog(dialogindex){
        var data = {
            "account"     :  cc.vv.Userinfo["account"],
            "dialogindex" :  dialogindex,
            "sign"        :  cc.vv.Userinfo["sign"]
        }
        cc.vv.HTTP.sendRequest('/dialogindex',data,function(data){
            if(data){
                if(data["code"]=='0'){
                    cc.vv.PublicUI.create_SelectBox(data["userinfo"]["dialogindex"]);
                }else{
                    cc.vv.PublicUI.create_SelectBox(data.msg);
                }
            }
        })

    }
});
