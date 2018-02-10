/**
 * public UI 工厂
 */
 cc.Class({
    properties: {
        _get_SelectBox_Instance : false,
        _get_DialogBox_Instance : false,
        _DialogBox_isLocal      : false,
        _get_UserinfoBox_Instance : false,
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

                cc.vv.Userinfo["plantpassindex"] = DialogBoxID;
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
                cc.director.getScene().getChildByName('Canvas').addChild(prefab);
            });
    }

    /**
     * //临时函数
     * 创建角色    对图片和骨骼做了外观模式封装
     * 
     */
    ,create_Role(roleID,roleNode,args,CallBack){
        if(roleNode.RecordroleID&&roleID==roleNode.RecordroleID
            &&roleNode.RecordroleNode&&roleNode.RecordroleNode==roleNode){
            CallBack&&CallBack(roleNode.Recordrolesprite);
            return;
        }
      
        var self = this,sprite;  
        if(cc.vv.CG.ROLE_JSON[roleID]['db']){

            if(roleNode.getComponent(dragonBones.ArmatureDisplay)){
                sprite =  roleNode.getComponent(dragonBones.ArmatureDisplay);  
            }else{
                if(roleNode.getComponent(cc.Sprite)){
                    roleNode.getComponent(cc.Sprite)._destroyImmediate();
                    //临时
                    if(roleNode.getComponent(cc.Animation)){
                        roleNode.getComponent(cc.Animation)._destroyImmediate();
                    }

                }
                sprite =  roleNode.addComponent(dragonBones.ArmatureDisplay);  
            }

           cc.loader.loadResDir('adminClips/roleAdminClips/'+cc.vv.CG.ROLE_JSON[roleID]['db'], function(err, assets){  
                if(err){  
                    return;  
                }  
                  
                if(assets.length <= 0){  
                    return;  
                }   
                try {
                    for(var i in assets){  
                        if(assets[i] instanceof dragonBones.DragonBonesAsset){  
                            sprite.dragonAsset = assets[i];  
                        }  
                        if(assets[i] instanceof dragonBones.DragonBonesAtlasAsset){  
                            sprite.dragonAtlasAsset  = assets[i];  
                        }  
                    }
                    if(roleID.toString()=="3"){
                        sprite.armatureName = "Armature"; 
                    }else{
                        sprite.armatureName = cc.vv.CG.ROLE_JSON[roleID]['name']; 
                    }
                    sprite.playAnimation('idle',args["playTimes"]); 

                    //记录精灵纹理ID和node节点避免多次调用此函数 
                    roleNode.RecordroleID  = roleID;
                    roleNode.RecordroleNode  = roleNode;
                    roleNode.Recordrolesprite = sprite;
                    CallBack&&CallBack(sprite);
                } catch (error) {
                    
                }

            }) 
        }else if(cc.vv.CG.ROLE_JSON[roleID]['img']){
            if(roleNode.getComponent(cc.Sprite)){
                sprite =  roleNode.getComponent(cc.Sprite);  
            }else{
                if(roleNode.getComponent(dragonBones.ArmatureDisplay)){
                    roleNode.getComponent(dragonBones.ArmatureDisplay)._destroyImmediate();
                }
                sprite =  roleNode.addComponent(cc.Sprite);  
            }
            cc.loader.loadRes('textures/images/Role/'+cc.vv.CG.ROLE_JSON[roleID]['img'], cc.SpriteFrame, function (err, data) {
                if (err) {
                    cc.error(err.message || err);
                    return;
                }
                try {
                    sprite.spriteFrame = data;
                    sprite.sizeMode = cc.Sprite.SizeMode.RAW;
                    sprite.trim = false;
                    roleNode.RecordroleID  = roleID;
                    roleNode.RecordroleNode  = roleNode;
                    roleNode.Recordrolesprite = sprite;

                    CallBack&&CallBack(sprite);


                    //临时
                    if(roleID.toString()=="2"){

                        if(roleNode.getComponent(cc.Animation)){
                            sprite =  roleNode.getComponent(cc.Animation);  
                        }else{
                            sprite =  roleNode.addComponent(cc.Animation);  
                        }
 
                        cc.loader.loadRes('adminClips/roleAdminClips/002/002', function (err, data) {
                            sprite.addClip(data,"idle");
                            sprite.playOnLoad = true;
                            sprite.play("idle");
                        })
                    }

                    
                } catch (error) {
                    
                }
            }); 

        }
    }
    /**
     * 临时函数
     * 暂时得按钮公用接口
     */
    ,buttonCallBack(){
        cc.vv.PublicUI.create_SelectBox({
            "txt":"暂未开启！！"
        });
    }
});
