var CG = CG || {};
var GN = require("public");


CG.HTTP_POST_CONFIG = {
     "USER_INFO":8240,
     "USER_SCORE":8241
 }

/**
 * 每一关对话逻辑处理配置表
 * 
 * index :每一关当前进入的次数
 * Maxindex :每一关限制最大进入的次数
 * winNextID : 成功以后玩家的下一步执行ID 参见 plant json
 * failureNextID : 失败以后玩家的下一步执行ID 参见 plant json
 */
CG.DIALOG_CONSTANT = {
        "callback_1_1":{"index":0,"Maxindex":4,"random_scope":{
                "1":[1,2,3],
                "2":[4,5,6,7,8,9,10,11,12,13,14,15,16,17]
            }
        },
        "callback_1_2":{"index":0,"Maxindex":3,"winNextID":19,"failureNextID":17},
        "callback_1_3":{"index":0,"Maxindex":3,"winNextID":27,"failureNextID":26},
        "callback_1_4":{"index":0,"Maxindex":3,"winNextID":35,"failureNextID":34},
        "callback_1_5":{"index":0,"Maxindex":3,"winNextID":43,"failureNextID":42},
        "callback_1_6":{"index":0,"Maxindex":3,"winNextID":48,"failureNextID":47},
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



    //====================game_1_4 begin
    /**
     *  1星球    4关卡    控制表
     */
    GN.Obj.getFileJSON("games/game_1_4.json",function(data){
        CG.GAME_1_4_JSON = data;
    });


    /**
     *   1星球    4关卡    符文表
     */
    GN.Obj.getFileJSON("games/game_1_4_rune.json",function(data){
        CG.GAME_1_4_RUNE_JSON = data;
    });

    //====================game_1_4 end


    /**
     *  loadingtips    tips  
     */
    GN.Obj.getFileJSON("loadingtips.json",function(data){
        CG.TIPS_JSON = data;
    });



}

module.exports = CG;
