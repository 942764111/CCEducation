
cc.Class({
    extends: cc.Component,

    properties: {
        Roles_list: {
            default: [],
            type: cc.Node,
        },
        confirm_Role : {
            default: null,
            type: cc.Node,
        },
        Role_info : {
            default: null,
            type: cc.Label,
        }
    },

    onLoad () {
        this.initRoleList();
    },
     
    initRoleList(){
        var  CG = cc.vv.CG
                    ,roleobj
                    ,self = this
                    ,roleobj = this.Roles_list;
        
        var index = 0;
        function loadRes(i) {
            if(index>CG['INIT_SELECT_ROLEID'].length-1)return;

            var getRoleSpriteFrame = CG.ROLE_JSON[CG['INIT_SELECT_ROLEID'][index]]['img'];
             cc.loader.loadRes('res/textures/images/Role/'+getRoleSpriteFrame, cc.SpriteFrame, function (err, data) {
                if (err) {
                    cc.error(err.message || err);
                    return;
                }
                roleobj[i].getComponent(cc.Sprite).spriteFrame = data;
                roleobj[i].getComponent(cc.Button).clickEvents[0]["customEventData"] = CG['INIT_SELECT_ROLEID'][index];

                cc.log(CG['INIT_SELECT_ROLEID'][index]);
                if(index==0){
                    self.setConfirmRoleinfo(CG['INIT_SELECT_ROLEID'][index]);
                }
                loadRes(index+=1);
            });
        }

        loadRes(index)
    },

    setConfirmRoleinfo(roleid){
        var self = this,
            CG = cc.vv.CG;

            cc.vv.PublicUI.create_Role(roleid,self.confirm_Role,{
                "playTimes":0
            });
            self.Role_info.string = CG.ROLE_JSON[roleid]["info"]
            this.initShowRoleID = roleid;
    },

    onRoles(e,type){
        var ROLE = cc.vv.CG.ROLE_JSON;
        this.setConfirmRoleinfo(type);
    },
    
    onSelectRoles(){
        cc.vv.Userinfo.createRole(this.initShowRoleID,function(){
            cc.director.loadScene("GameMain");
        });
    },
    start () {

    },

    // update (dt) {},
});
