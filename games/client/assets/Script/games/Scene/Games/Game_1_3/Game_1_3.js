

cc.Class({
    extends: cc.Component,

    properties: {
        right_items: {
            default: null,
            type: cc.Node,
            displayName:"右边可用道具节点",
            tooltip:"右边可用道具节点"
        },
        Top_items: {
            default: null,
            type: cc.Node,
            displayName:"上方需求道具节点",
            tooltip:"上方需求道具节点"
        },
        toolbox_item_Maxline: {
            default: 4,
            type: cc.Integer,
            displayName:"工具箱中物品最大行",
            tooltip:"工具箱中物品最大行"
        },
        toolbox_item_Maxrank: {
            default: 3,
            type: cc.Integer,
            displayName:"工具箱中物品最大列",
            tooltip:"工具箱中物品最大列"
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
        cc.vv.CG.DIALOG_CONSTANT["callback_1_3"].index+=1;
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
             self._right_itemArr = [];
             self._Top_itemArr = [];
        }
        function _sprite() {
            var CG = cc.vv.CG;
        
            var get_random_obj = CG.GAME_1_3_JSON[cc.vv.GN.Num.randomNumber(2,4)];   

            function show_Topitem_Childs(allitemid,allnum) {
                var Topitem =  self.Top_items;

                var index =0;
                function setRes() {
                    if(index==allitemid.length)return;
                    var itemid = allitemid[index];
                    Topitem.children[index].active = true;
                    //自定义属性
                    Topitem.children[index]["id"] = CG.GAME_1_3_D1_JSON[itemid]['id'];
                    Topitem.children[index]["num"] = allnum[index];
                    Topitem.children[index]["name"] =  CG.GAME_1_3_D1_JSON[itemid]['name'];
                    self._Top_itemArr.push(Topitem.children[index]);

                    Topitem.children[index].getChildByName("txt").getComponent(cc.Label).string = "X"+allnum[index];
                    cc.loader.loadRes('textures/images/game_1_3/stage_1/'+CG.GAME_1_3_D1_JSON[itemid]['img'], cc.SpriteFrame, function (err, data) {
                        if (err) {
                            cc.error(err.message || err);
                            return;
                        }
                        Topitem.children[index].getComponent(cc.Sprite).spriteFrame = data;
                        index++;


                        setRes();
                    });
                }

                setRes();
            }

            function show_rightitem_Childs(allitemid) {
                var item =  self.right_items;

                var index =0;
                function setRes() {
                    if(index==allitemid.length)return;
                    var itemid = allitemid[index];
                    item.children[index].active = true;
                    //自定义属性
                    item.children[index].type = CG.GAME_1_3_D2_JSON[itemid]['d1id'];//每个对应的数量
                    item.children[index]["itemAlls_"+item.children[index].type] = [];//不同类型的数组容器
                    item.children[index]["num_"+item.children[index].type] = 0;//最终结算数量
                    item.children[index]["num"] = CG.GAME_1_3_D2_JSON[itemid]['num'];//每个对应的数量

                    self._right_itemArr.push(item.children[index]);
                    cc.loader.loadRes('textures/images/game_1_3/stage_2/'+CG.GAME_1_3_D2_JSON[itemid]['img'], cc.SpriteFrame, function (err, data) {
                        if (err) {
                            cc.error(err.message || err);
                            return;
                        }
                        item.children[index].getChildByName("img").getComponent(cc.Sprite).spriteFrame = data;
                        index++;
                        setRes();
                    });
                }

                setRes();
            }

            for(var i in get_random_obj){
                if(i=="sample"){
                    var get_allTopitem_id = get_random_obj["sample"].split(",");
                    var get_allTopitem_Num = get_random_obj["num"].split(",");
                    show_Topitem_Childs(get_allTopitem_id,get_allTopitem_Num);
                }
                if(i=="tools"){
                    var get_allRightitems_id = get_random_obj["tools"].split(",");
                    show_rightitem_Childs(get_allRightitems_id);
                }
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
            ,toolsBoxitems = []//工具箱中现有的道具
            ,toolsBoxitemMaxLine = this.toolbox_item_Maxline//工具箱中item 排列最大行数
            ,toolsBoxitemMaxRank = this.toolbox_item_Maxrank;//工具箱中item 排列最大列数

      function getPressitem(touchpos) {
            var children = self._right_itemArr ,item = null;
            for(var i=0;i<children.length;i++){
                if(tools.iscollide(children[i],touchpos)){
                    item = children[i];
                    break;
                }
            }
            return item;
        };

        function EndCallBack(t) {
            if(!Pressitem)return;
            var hand = tools.showhand(false);
            var ToWorldAR;
            if(hand.children.length>0){
                ToWorldAR = hand.children[0].parent.convertToWorldSpaceAR(hand.children[0]);
            }

            if(ToWorldAR&&!tools.iscollide(self.node.getChildByName("toolbox"),ToWorldAR,3)){
                Pressitem = null;
                hand.destroyAllChildren();
                cc.vv.PublicUI.create_SelectBox({
                    "txt":"请将道具拖入盒子中！！"
                });
                return;
            }
            
            if((toolsBoxitemMaxLine*toolsBoxitemMaxRank)==toolsBoxitems.length){
                Pressitem = null;
                hand.destroyAllChildren();
                cc.vv.PublicUI.create_SelectBox({
                    "txt":"以超出指定范围"
                });
                return;
            }

            var toolboxitem = cc.instantiate(Pressitem);
    

            if(toolsBoxitems.length<1){
                toolboxitem.x =self.node.getChildByName("toolbox_item_reference").x;
                toolboxitem.y =self.node.getChildByName("toolbox_item_reference").y;
            } else if(toolsBoxitems.length>0&&toolsBoxitems.length%toolsBoxitemMaxLine==0){ //换行处理
                toolboxitem.x =self.node.getChildByName("toolbox_item_reference").x;
                toolboxitem.y =toolsBoxitems[toolsBoxitems.length-1].y-Math.abs(toolboxitem.getBoundingBox().height/2.2);
            } else{
                toolboxitem.x =toolsBoxitems[toolsBoxitems.length-1].x+toolboxitem.getBoundingBox().width/1.1;
                toolboxitem.y =toolsBoxitems[toolsBoxitems.length-1].y;
            }

            toolboxitem.zIndex += Math.abs(toolboxitem.y);
    
            toolboxitem.type = Pressitem.type;
            toolboxitem.num = Pressitem.num;

            self.node.addChild(toolboxitem);
            toolsBoxitems.push(toolboxitem);
    
            var children = self._right_itemArr ,item = null;
            for(var i=0;i<children.length;i++){
                item = children[i];
                if(item.type==toolboxitem.type){
                    item["itemAlls_"+toolboxitem.type].push(toolboxitem);
                }
            }
    
            Pressitem = null;
            hand.destroyAllChildren();
        }

        function TOUCH_START(t,e) {
            var touchBeginPoin = t.getLocation();
            var getobj = getPressitem(touchBeginPoin);
                if(getobj){
                    var hand = tools.showhand(true,touchBeginPoin);
                    var initobj = cc.instantiate(getobj.getChildByName("img"));
                    initobj.y-=hand.height;
                    initobj.x-=30;
                    hand.addChild(initobj);
                    getobj.getChildByName("img").type = getobj.type;
                    getobj.getChildByName("img").num = getobj.num;
                    Pressitem = getobj.getChildByName("img");
                }else{
                    tools.showhand(false);
                }
        }

        function TOUCH_MOVE(t,e) {
            var touchmovePoin = t.getLocation();


            if(!Pressitem)return;

            var hand =  tools.showhand(true,touchmovePoin);
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

        function _showhand(active,pos) {
            var hand = cc.find("Canvas/hand");
            hand.active = active;
            if(pos){
                hand.x = hand.parent.convertToNodeSpaceAR(pos).x;
                hand.y = hand.parent.convertToNodeSpaceAR(pos).y;
            }
            return hand;
        }
        return {
            iscollide     : _iscollide,
            showhand      : _showhand
        }
    },

    /**
     * 提交
     */
    onSubmit(){
        var self = this;
        //获取工具盒里最终的数据
        /**
         * 
         *  data = {
         *         id:{
         *          ..... 
         *        }         *      
         *  }
         */
        function getToolboxData() {
            var children = self._right_itemArr,item = null,obj = {};
            for(var i=0;i<children.length;i++){
                item = children[i];
                for(var index in item["itemAlls_"+item.type]){
                    item["num_"+item.type]+= parseInt(item["itemAlls_"+item.type][index].num);
                }
                obj[item["type"]] = {};
                obj[item["type"]]["num"] =  item["num_"+item.type];
            }
            return obj;
        }

        //获取需求的数据
        /**
         *  data = {
         *         id:{
         *          ..... 
         *        }         *      
         *  }
         */
        function getNecessityData() {
            var children = self._Top_itemArr,item = null,obj = {};
            for(var i=0;i<children.length;i++){
                item = children[i];
                obj[item["id"]] = {};
                obj[item["id"]]["num"] = parseInt(item["num"]);
                obj[item["id"]]["name"] = item["name"];
            }
            return obj;
        }   

        function iswin() {
            var b_iswin = false;
            var ToolboxData = getToolboxData();
            var NecessityData = getNecessityData();
            for(var i in NecessityData){
                
                if(ToolboxData[i]['num']!=0 && NecessityData[i]['num']===ToolboxData[i]['num']){
                    b_iswin = true;
                }else{
                    b_iswin = false;
                    self._F_gameStateControl(4);
                    break;
                }
            }
            return b_iswin;
        }


        function _createDialogBox(iswin) {
            if(iswin){
                cc.vv.Userinfo["plantpassindex"] = cc.vv.CG.DIALOG_CONSTANT["callback_1_3"]["winNextID"];
            }else if(cc.vv.CG.DIALOG_CONSTANT["callback_1_3"].index===cc.vv.CG.DIALOG_CONSTANT["callback_1_3"].Maxindex){
                cc.vv.Userinfo["plantpassindex"] = cc.vv.CG.DIALOG_CONSTANT["callback_1_3"]["winNextID"];
            }else{
                cc.vv.Userinfo["plantpassindex"] = cc.vv.CG.DIALOG_CONSTANT["callback_1_3"]["failureNextID"];
            }
    
            cc.vv.PublicUI.create_DialogBox(cc.vv.Userinfo["plantpassindex"]);
        }

        _createDialogBox(iswin());
    }
});
