
cc.Class({
    extends: cc.Component,

    properties: {
        items: {
            default: null,
            type: cc.Node,
            displayName:"操作方块父节点",
            tooltip:"操作方块父节点"
        },
        lights: {
            default: null,
            type: cc.Node,
            displayName:"提示信息父节点",
            tooltip:"提示信息父节点"
        },
        relativeTime: {
            default: 0,
            type: cc.Float,
            displayName:"提示点出现的时间",
            tooltip:"提示点出现的时间"
        },
        startTime: {
            default: 0,
            type: cc.Float,
            displayName:"游戏正式开始时间",
            tooltip:"游戏正式开始时间"
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
        if(cc.vv.CG.DIALOG_CONSTANT["callback_1_2"].index>=1){
            this.pageview.node.active = false;
            this._F_gameStateControl();
        }
        cc.vv.CG.DIALOG_CONSTANT["callback_1_2"].index+=1;
    },
    _F_gameStateControl(State,args){
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
            self._F_game_Over(args);
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
                init("1");
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
            if(self._HashMap){
                delete self._HashMap;
            }
            self._HashMap = null;
        }
        function _sprite() {
            //创建地图
            self._HashMap = self._F_game_Tools().createHashMap(3,4,self.items.children);
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
    //run game
    _F_game_run(){
        var self = this;
        var tools = this._F_game_Tools();
        function _run() {
            var passitem,passitemArr = [];
            
            /**
             * 设置周边的item的属性istouch  事件的状态
             * void
             */
            function _setitemisTouch(passitem) {
                if(!passitem) return
            

                //先将 所有的item 属性 istouch 设置为警用状态
                var children = self.items.children;
                for(var i=0;i<children.length;i++){
                    children[i].istouch = false;
                }
        
                //设置周围4个方向的item事件为 可用状态
                var getMaps = [];
                getMaps.push(tools.getMapObject1(passitem.hashrow,passitem.hasrank));//me
                getMaps.push(tools.getMapObject1(passitem.hashrow-1,passitem.hasrank));//↑
                getMaps.push(tools.getMapObject1(passitem.hashrow+1,passitem.hasrank));//↓
                getMaps.push(tools.getMapObject1(passitem.hashrow,passitem.hasrank-1));//←
                getMaps.push(tools.getMapObject1(passitem.hashrow,passitem.hasrank+1));//→
        
                for(var i in getMaps){
                    if(getMaps[i]&&!getMaps[i].getChildByName("img").active){
                        getMaps[i].istouch = true;
                    }
                }
            }

            function getPressitem(touchpos) {
                var children = self.items.children ,item = null;
                for(var i=0;i<children.length;i++){
                    if(children[i].istouch&&tools.iscollide(children[i],touchpos)){
                        children[i].getChildByName("img").active = true;
                        item = children[i];
                        _setitemisTouch.bind(self)(item);
                        passitemArr.push(item);
                        break;
                    }
                }
                return item;
            };


            function TOUCH_START(t,e) {
                var touchBeginPoin = t.getLocation();
    
                passitem = getPressitem(touchBeginPoin);
         
                // item.
            }
    
            function TOUCH_MOVE(t,e) {
                var touchmovePoin = t.getLocation();
                passitem = getPressitem(touchmovePoin);
            }
            
            function TOUCH_END(t,e) {
                self._F_gameStateControl(cc.vv.CG.DIALOG_CONSTANT.GAME_RUN_STATE.OVER,{passitemArr:passitemArr});
            }
    
            function TOUCH_CANCEL(t,e) {
                self._F_gameStateControl(cc.vv.CG.DIALOG_CONSTANT.GAME_RUN_STATE.OVER,{passitemArr:passitemArr});
            }
            self.items.on(cc.Node.EventType.TOUCH_START, TOUCH_START, self);
            self.items.on(cc.Node.EventType.TOUCH_MOVE, TOUCH_MOVE, self);
            self.items.on(cc.Node.EventType.TOUCH_END, TOUCH_END, self);
            self.items.on(cc.Node.EventType.TOUCH_CANCEL, TOUCH_CANCEL, self);
        }
        /**
         * 
         * @param {*每个提示颜色出来的时间} relativeTime 
         * @param {*游戏正式开始的事件} startTime 
         */
        function _gamescheduleOnce(relativeTime,startTime){
            var index = 0;

            function GameSateTime() {
                if(index==self.lights.children.length){
                    self.unschedule(GameSateTime);
    
                    function GameSate() {
    
                        var children = self.lights.children
                        for(var i=0;i<children.length;i++){
                            children[i].active = false;
                        }
                        self.unschedule(GameSate);
                        
                        cc.vv.PublicUI.create_SelectBox({
                            "txt":"游戏开始！",
                            "CallBack": {
                                onbtn_1CallBack : function() {
                                    _run();
                                },
                                onbtn_3CallBack : function(){
                                    cc.director.loadScene("Game_1_2");
                                }
                            }
                        });

                    }
                    self.scheduleOnce(GameSate,startTime)
    
                }else{
                    self.lights.children[index].active = true;
                    index++;
                }
            };
            self.schedule(GameSateTime,relativeTime)
        };

        _gamescheduleOnce(self.relativeTime,self.startTime);
    },
    // public tools
    _F_game_Tools(){
        var self = this;
        /**
         * 将 Nodearr 添加到 HashMap 中
         * Array return array[i][i] 
         * @param {*} Maxrow 
         * @param {*} Maxrank 
         * @param {*} Nodearr 
         */
        function _additemsToHashMap(Maxrow,Maxrank,Nodearr) {
            var children = Nodearr;
            // creater  arr
            var arr = new Array();
            for(var i=0;i<Maxrow;i++){
                arr[i]=new Array(i);
                for(var j=0;j<Maxrank;j++){
                    arr[i][j]=0;
                }
            }
    
            //push  item To arr
            var index = 0,
                Maxrow=3,rowindex =0,
                Maxrank = 4,rankindex=0;
            while(index<children.length){
                children[index].hashrow = rowindex;
                children[index].hasrank = rankindex;
                children[index].istouch = true;
                arr[rowindex][rankindex] = children[index];
                rankindex+=1;
                if(rankindex>=Maxrank){
                    rowindex+=1;
                    rankindex=0; 
                }
                index+=1;
            }
            return arr;
        }
        /**
         * 通过 HashMap 索引值找到地图中的对象
         * Object return node object
         * @param {*} hashrow 
         * @param {*} hasrank 
         */
        function _getMapObject1(hashrow,hasrank) {
            if(hashrow>=0&&hasrank>=0&&hashrow<3&&hasrank<4){
                return self._HashMap[hashrow][hasrank]||null;
            }
            return null;
        }
        /**
         * 解析出对应的keys
         * Array  return array[key]
         * @param {*} nodearr 
         */
        function _analysisAllKeys(nodearr) {
            var rearr = [];
            for(var i=0;i<nodearr.length;i++){
                rearr.push(nodearr[i].name.split(",")[1]);
            }
            return rearr;
        }
        /**
         * 检测俩个点的碰撞检测
         * Bool return true or false
         */
        function _iscollide(a, b) {
            var ax = a.x;
            var ay = a.y;
            var bx = self.items.convertToNodeSpaceAR(b).x;
            var by = self.items.convertToNodeSpaceAR(b).y;
            if (Math.abs(ax - bx) > a.getBoundingBox().width/2 || Math.abs(ay - by) > a.getBoundingBox().height/2)return false;
            return true;
        }

        return {
            createHashMap : _additemsToHashMap,
            getMapObject1 : _getMapObject1,
            analysisAllKeys : _analysisAllKeys,
            iscollide     : _iscollide
        }
    },
    _F_game_Over(arg){
        var passitemArr = arg.passitemArr;
        var self = this;
        var tools = this._F_game_Tools();
        function _createDialogBox(iswin) {
            if(iswin){
                cc.vv.Userinfo["plantpassindex"] = cc.vv.CG.DIALOG_CONSTANT["callback_1_2"]["winNextID"];

                //更新分数
                cc.vv.UserScoreinfo.updateUserScore(2);

            }else if(cc.vv.CG.DIALOG_CONSTANT["callback_1_2"].index==cc.vv.CG.DIALOG_CONSTANT["callback_1_2"].Maxindex){
                cc.vv.Userinfo["plantpassindex"] = cc.vv.CG.DIALOG_CONSTANT["callback_1_2"]["winNextID"];

                 //更新分数
                cc.vv.UserScoreinfo.updateUserScore(2);

            }else{
                cc.vv.Userinfo["plantpassindex"] = cc.vv.CG.DIALOG_CONSTANT["callback_1_2"]["failureNextID"];

                if(cc.vv.UserScoreinfo["game_1_2"]>=5){
                    cc.vv.UserScoreinfo["game_1_2"]-=5;
                }
            }
    
            cc.vv.PublicUI.create_DialogBox(cc.vv.Userinfo["plantpassindex"]);
        }


        var children = self.items.children
        for(var i=0;i<children.length;i++){
            children[i].getChildByName("img").active = false;
            children[i].istouch = true;
        }

        /**
         * 是否成功
         */
        function isWin() {
            var b_win = true;
            var passitemKeys = tools.analysisAllKeys(passitemArr);
            var lightsAllKeys = tools.analysisAllKeys(self.lights.children);
            if(passitemKeys.length<1||lightsAllKeys.length<1
                || passitemKeys.length!=lightsAllKeys.length){
                    return false;
            }

            for(var i=0;i<passitemKeys.length;i++){
                if(lightsAllKeys[i]!=passitemKeys[i]){
                    b_win = false;
                    break;
                }
            }
            return b_win;
        }
        _createDialogBox(isWin());
    }
    // update (dt) {},
});
