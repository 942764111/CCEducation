
var dialogBox = require("dialogBox");
/**
 * public UI 工厂
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
     * 
     * var arg = {
            "styleType":styleType,        
            "txt":txt,
            "CallBack":CallBack
        }
     * 
     */
    ,create_SelectBox(args,isInstance){
        var _styleType = "1";
        if(args){
            _styleType  = args["styleType"]||"1";
        }
  
        var _isInstance = isInstance||false;
        if(this._get_SelectBox_Instance&&_isInstance) return;
        this._get_SelectBox_Instance = true;

        function style_General(){
            cc.loader.loadRes('prefab/selectBox', function (err, prefab) {
                if (err) {
                    cc.error(err.message || err);
                    return;
                }
                var getselectboxNode = cc.instantiate(prefab);
                var getselectbox = getselectboxNode.getComponent("SelectBox");
                getselectbox.setInfo(args);
                cc.director.getScene().getChildByName('Canvas').addChild(getselectboxNode);
            });

        }
        switch (_styleType) {
            case "1": //普通选择框
                style_General();
                break;    
            default:
                this._get_SelectBox_Instance = false;
                throw new Error(_styleType + " Type not Find");
                break;
        }
    }
    /**
     * 对话框接口
     */
    ,create_DialogBox(DialogBoxID){
        var  self = this;
        if(!this._get_DialogBox_Instance){
            cc.loader.loadRes('prefab/dialogBox', function (err, prefab) {
                if (err) {
                    cc.error(err.message || err);
                    return;
                }
                var getdialogBoxNode = cc.instantiate(prefab);
                var getdialogBox = getdialogBoxNode.getComponent("dialogBox");
                self._get_DialogBox_Instance = getdialogBox;
                getdialogBox.setInfo(DialogBoxID);
                cc.director.getScene().getChildByName('Canvas').addChild(getdialogBoxNode);
            });
        }else{
            self._get_DialogBox_Instance.setInfo(DialogBoxID);
        }

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
                cc.director.getScene().getChildByName('Canvas').getChildByName("Node").addChild(prefab);
            });
    }
    /**
     * 暂时得按钮公用接口
     */
    ,buttonCallBack(){
        cc.vv.PublicUI.create_SelectBox({
            "txt":"暂未开启！！"
        });
    }
});
