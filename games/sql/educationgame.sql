/*
Navicat MySQL Data Transfer

Source Server         : mylesson3Game
Source Server Version : 50558
Source Host           : localhost:3306
Source Database       : educationgame

Target Server Type    : MYSQL
Target Server Version : 50558
File Encoding         : 65001

Date: 2018-01-19 19:49:06
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for `user`
-- ----------------------------
DROP TABLE IF EXISTS `user`;
CREATE TABLE `user` (
  `uid` int(11) unsigned NOT NULL AUTO_INCREMENT COMMENT '用户ID',
  `uname` varchar(32) CHARACTER SET utf8 DEFAULT NULL COMMENT '用户名字',
  `sex` varchar(1) CHARACTER SET utf8 DEFAULT NULL COMMENT '性别 0：女  1：男',
  `lv` smallint(6) DEFAULT '1' COMMENT '等级',
  `exp` int(11) DEFAULT '0' COMMENT '用户当前经验',
  `expAll` int(11) DEFAULT '0' COMMENT '当前升级所需要的总经验',
  `gems` int(11) DEFAULT '0' COMMENT '用户的宝石',
  `vip` int(11) DEFAULT '0' COMMENT '用户vip等级',
  `account` varchar(64) CHARACTER SET utf8 DEFAULT '' COMMENT '账号',
  `password` varchar(64) CHARACTER SET utf8 DEFAULT '' COMMENT '密码',
  `role` varchar(1) CHARACTER SET utf8 DEFAULT NULL COMMENT '角色',
  `plantpassindex` varchar(8) CHARACTER SET utf8 DEFAULT '1' COMMENT '用户星球中得关卡索引ID',
  `plantindex` varchar(8) CHARACTER SET utf8 DEFAULT '1' COMMENT '目前用户处在哪个星球关卡',
  PRIMARY KEY (`uid`)
) ENGINE=InnoDB AUTO_INCREMENT=30 DEFAULT CHARSET=latin1;

-- ----------------------------
-- Records of user
-- ----------------------------
INSERT INTO `user` VALUES ('29', 'qiaobin', null, '1', '0', '0', '0', '0', 'qiaobin', '202cb962ac59075b964b07152d234b70', '3', '1', '1');
