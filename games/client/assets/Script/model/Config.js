var CG = CG || {};
var GN = require("public");
CG.SELECT_BOX = {
    INFO:"",
}

CG.DIALOG_INDEX = 1,


CG.DIALOG_CONSTANT = {
    "callback_1_1":{"index":0,"Maxindex":3,"random_scope":[
        "1,3",
        "4,17"
    ]},
    "callback_1_2":{"index":0,"Maxindex":3},
    "GAME_RUN_STATE":{
        INIT : 1, // 初始化
        RUN  : 2, // 游戏中
        RWFEESH : 3, // 重新开始
        OVER : 4,//游戏结束
    }
}

/**
 * 初始化角色的ID
 */
CG.INIT_SELECT_ROLEID = ["2","3","4"];

CG.INIT_JSON = function(){
    /**
     * 角色表
     */
    GN.Obj.getFileJSON("role.json",function(data){
        CG.ROLE_JSON = data;
    });

    /**
     * 游戏中对话表
     */
    GN.Obj.getFileJSON("DialogBox.json",function(data){
       CG.DIALOGBOX_JSON = data;
    });

    /**
     * 题库表
     */
    GN.Obj.getFileJSON("issue_librarys.json",function(data){
        CG.ISSUE_LIBRARYS_JSON = data;
    });

    /**
     *  游戏中星球 1 表
     */
    GN.Obj.getFileJSON("plant/plant_1.json",function(data){
        CG.PLANT_1_JSON = data;
    });



    //====================game_1_3 begin
    /**
     *  1星球    3关卡    控制表
     */
    GN.Obj.getFileJSON("games/game_1_3.json",function(data){
        CG.GAME_1_3_JSON = data;
    });


    /**
     *   1星球    3关卡    上方物品表
     */
    GN.Obj.getFileJSON("games/game_1_3_d1.json",function(data){
        CG.GAME_1_3_D1_JSON = data;
    });

    /**
     *   1星球    3关卡    右方物品表
     */
    GN.Obj.getFileJSON("games/game_1_3_d2.json",function(data){
        CG.GAME_1_3_D2_JSON = data;
    });

    //====================game_1_3 end




}

module.exports = CG;
