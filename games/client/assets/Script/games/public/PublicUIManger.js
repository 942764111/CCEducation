
var dialogBox = require("dialogBox");
/**
 * 公用得资源管理接口 如：弹出框 
 */
 cc.Class({
    properties: {
        _get_SelectBox_Instance : false,
        _get_DialogBox_Instance : false,
        _get_UserinfoBox_Instance : false
    }
    /**
     * 弹出框接口
     * @param {*提示文本} txt 
     * @param {*样式类型 默认为 "1"类型} styleType 
     * @param {*是否为单例模式} isInstance
     */
    ,create_SelectBox(txt,styleType,isInstance){
        var _styleType  = styleType||"1";
        if(this._get_SelectBox_Instance&&_isInstance) return;
        this._get_SelectBox_Instance = true;

        function style_One(){
            cc.loader.loadRes('prefab/selectBox', function (err, prefab) {
                if (err) {
                    cc.error(err.message || err);
                    return;
                }
                var selectbox = cc.instantiate(prefab);
                if(txt){
                    cc.vv.CG.SELECT_BOX.INFO = txt;
                }
                cc.director.getScene().getChildByName('Canvas').addChild(selectbox);
            });
        }
        switch (_styleType) {
            case "1":
                style_One();
                break;
            default:
                this._get_SelectBox_Instance = false;
                break;
        }
    }

    /**
     * 对话框接口
     */
    ,create_DialogBox(DialogBoxID){
        var  self = this;
        function setInfo(obj){
            function _getplantData(userplant){
                return cc.vv.CG["PLANT_"+userplant+"_JSON"];
            }
            var data =_getplantData(cc.vv.Userinfo["plantindex"]);

            var roleres;
            if(data[DialogBoxID]["leftid"]>0){
                obj.left_role.active = true;
                roleres = cc.vv.CG.ROLE_JSON[data[DialogBoxID]["leftid"]]["img"];
                cc.loader.loadRes('textures/images/Role/'+roleres, cc.SpriteFrame, function (err, data) {
                    if (err) {
                        cc.error(err.message || err);
                        return;
                    }
                    obj.left_role.getComponent(cc.Sprite).spriteFrame  = data;
                });

            }else{
                obj.left_role.active = false;
            }

            if(data[DialogBoxID]["rightid"]>0){
                obj.rightid_role.active = true;
                roleres = cc.vv.CG.ROLE_JSON[data[DialogBoxID]["rightid"]]["img"];
                cc.loader.loadRes('textures/images/Role/'+roleres, cc.SpriteFrame, function (err, data) {
                    if (err) {
                        cc.error(err.message || err);
                        return;
                    }
                    obj.rightid_role.getComponent(cc.Sprite).spriteFrame  = data;
                });
            }else{
                obj.rightid_role.active = false;
            }

    
            obj.isshowDialogBox.active =  data[DialogBoxID]["isshowDialogBox"];
            obj.isshowDialogBox_txt.string =  data[DialogBoxID]["isshowDialogBox_txt"];
        }

        if(this._get_DialogBox_Instance){
              setInfo(self._get_DialogBox_Instance);
        }else{
            this._get_DialogBox_Instance = true;
            cc.loader.loadRes('prefab/dialogBox', function (err, prefab) {
                if (err) {
                    cc.error(err.message || err);
                    return;
                }
                var prefab = cc.instantiate(prefab);
                var dialog = prefab.getComponent(dialogBox);
                self._get_DialogBox_Instance = dialog;
                setInfo(dialog);
                cc.director.getScene().getChildByName('Canvas').addChild(prefab);
            });
        };
    }

    ,create_UserinfoBox(isInstance){
        var  self = this;
            if(this._get_UserinfoBox_Instance&&isInstance)return;

            this._get_UserinfoBox_Instance = true;
            cc.loader.loadRes('prefab/infos', function (err, prefab) {
                if (err) {
                    cc.error(err.message || err);
                    return;
                }
                var prefab = cc.instantiate(prefab);
                cc.director.getScene().getChildByName('Canvas').addChild(prefab);
            });
    }
    /**
     * 暂时得按钮公用接口
     */
    ,buttonCallBack(){
        this.create_SelectBox("暂未开放！！");
    }
});
