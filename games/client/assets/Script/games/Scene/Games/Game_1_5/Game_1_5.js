
cc.Class({
    extends: cc.Component,

    properties: {
        debris_itemNode: {
            default: null,
            type: cc.Node,
            displayName:"碎片物品节点",
            tooltip:"碎片物品节点"
        },
        debris_fullNode: {
            default: null,
            type: cc.Node,
            displayName:"完整的拼图节点",
            tooltip:"完整的拼图节点"
        },
        is_showCollideDebug: true,
    },

    onLoad () {
        cc.vv.CG.DIALOG_CONSTANT["callback_1_5"].index+=1;
        this. _F_gameStateControl();
    },
    _F_gameStateControl(State){
        var self = this;
        function init() {
            self._F_game_init();
        }
        function run() {
            self._F_game_run();
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
            
            self.getCollisionManager = null;
        }
        function _sprite() {
            self.getCollisionManager = cc.director.getCollisionManager();
            if (self.is_showCollideDebug) {
                self.getCollisionManager.enabledDebugDraw = true; // 调试状态绘制出我们物体的碰撞器的形状
            }

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
    //游戏中
    _F_game_run(){
        var self = this
            ,tools = this._F_game_Tools()
            ,Pressitem = null
            ,winindex = 0;

        function getPressitem(touchpos) {
            var children,item;

            children = self.debris_itemNode.children;
            item = null;
            for(var i=0;i<children.length;i++){
                if(tools.iscollide(children[i],touchpos)){
                    item = children[i];
                    break;
                }
            }
            return item;
        };

        function EndCallBack() {

            if(Pressitem){
                
                function _iscollide(a, b,size) {
                    var _size = size?size:0;
                    var ax = a.parent.convertToWorldSpaceAR(a).x;
                    var ay = a.parent.convertToWorldSpaceAR(a).y;
                    var bx = b.parent.convertToWorldSpaceAR(b).x;
                    var by = b.parent.convertToWorldSpaceAR(b).y;
                    if(Math.abs(ax - bx) < a.getBoundingBox().width/4&&Math.abs(ay - by) < a.getBoundingBox().height/4)return true;
                    return false;
                }
              
                if(_iscollide(Pressitem,self.debris_fullNode.getChildByName(Pressitem.name))){
                    self.debris_fullNode.getChildByName(Pressitem.name).opacity = 255;
                    self.debris_fullNode.getChildByName(Pressitem.name).iswin = true;
                    winindex+=1;
                    if(Pressitem){
                        Pressitem.destroyAllChildren();
                        Pressitem.destroy();
                    }
                }else{
                    Pressitem.x = Pressitem["initPos_x"];
                    Pressitem.y = Pressitem["initPos_y"];
                }
                Pressitem = null;

                // 所有碎图都成功拼完以后开启检测;
                if(winindex==self.debris_fullNode.children.length){
                    self.scheduleOnce(function(){
                        self._F_game_Over();
                    },1)
                }

            }
        }

        function TOUCH_START(t,e) {
            var touchBeginPoin = t.getLocation();
            var getobj = getPressitem(touchBeginPoin);
            if(getobj){
                if(getobj.children.length<1)return;
                var initobj = getobj.children[0];
                initobj.initPos_x = initobj.x;
                initobj.initPos_y = initobj.y;
                initobj.y = initobj.parent.convertToNodeSpaceAR(touchBeginPoin).y;
                initobj.x = initobj.parent.convertToNodeSpaceAR(touchBeginPoin).x;
                Pressitem = initobj;
                
            }
        }

        function TOUCH_MOVE(t,e) {
            var touchmovePoin = t.getLocation();
            if(Pressitem){
                Pressitem.y = Pressitem.parent.convertToNodeSpaceAR(touchmovePoin).y;
                Pressitem.x = Pressitem.parent.convertToNodeSpaceAR(touchmovePoin).x;
            }
        }
        
        function TOUCH_END(t,e) {
            EndCallBack(t);
            
        }

        function TOUCH_CANCEL(t,e) {
            EndCallBack(t);
        }
        self.node.on(cc.Node.EventType.TOUCH_START, TOUCH_START, self);
        self.node.on(cc.Node.EventType.TOUCH_MOVE, TOUCH_MOVE, self);
        self.node.on(cc.Node.EventType.TOUCH_END, TOUCH_END, self);
        self.node.on(cc.Node.EventType.TOUCH_CANCEL, TOUCH_CANCEL, self);
    },

    // public tools
    _F_game_Tools(){
        var self = this;
        /**
         * 检测俩个点的碰撞检测
         * Bool return true or false
         */
        function _iscollide(a, b,size) {
            var _size = size?size:2;
            var ax = a.x;
            var ay = a.y;
            var bx = a.parent.convertToNodeSpaceAR(b).x;
            var by = a.parent.convertToNodeSpaceAR(b).y;
            if (Math.abs(ax - bx) > a.getBoundingBox().width/_size || Math.abs(ay - by) > a.getBoundingBox().height/_size)return false;
            return true;
        }
        return {
            iscollide     : _iscollide
        }
    },

    _F_game_Over(){
        var self = this;

        function _iswin() {
            var iswin = false;
            for(var i=0;i<self.debris_fullNode.children.length;i++){
                if(!self.debris_fullNode.children[i]["iswin"]){
                    break;
                }else{
                    iswin = true;
                }
            }
            return iswin;
        }

        function _createDialogBox(iswin) {
            if(iswin){
                cc.vv.Userinfo["plantpassindex"] = cc.vv.CG.DIALOG_CONSTANT["callback_1_5"]["winNextID"];
            }else if(cc.vv.CG.DIALOG_CONSTANT["callback_1_5"].index===cc.vv.CG.DIALOG_CONSTANT["callback_1_5"].Maxindex){
                cc.vv.Userinfo["plantpassindex"] = cc.vv.CG.DIALOG_CONSTANT["callback_1_5"]["winNextID"];
            }else{
                cc.vv.Userinfo["plantpassindex"] = cc.vv.CG.DIALOG_CONSTANT["callback_1_5"]["failureNextID"];
            }
    
            cc.vv.PublicUI.create_DialogBox(cc.vv.Userinfo["plantpassindex"]);
        }

        _createDialogBox(_iswin())
    }

});
