var CG = CG || {};
var GN = require("public");
CG.SELECT_BOX = {
    INFO:"",
}

CG.DIALOG_INDEX = 1,


CG.DIALOG_CONSTANT = {
    "One":{"index":0,"Maxindex":3,"random_scope":[
        "1,3",
        "4,17"
    ]}
}


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

}

module.exports = CG;
