/*
Navicat MySQL Data Transfer

Source Server         : gamesdata
Source Server Version : 50550
Source Host           : localhost:3306
Source Database       : educationgame

Target Server Type    : MYSQL
Target Server Version : 50550
File Encoding         : 65001

Date: 2018-02-11 01:01:00
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for `score`
-- ----------------------------
DROP TABLE IF EXISTS `score`;
CREATE TABLE `score` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT COMMENT 'id',
  `account` varchar(64) DEFAULT NULL COMMENT 'user account',
  `game_1_1` int(32) unsigned DEFAULT '0' COMMENT '常识游戏',
  `game_1_2` int(32) unsigned DEFAULT '20' COMMENT '背数游戏',
  `game_1_3` int(32) unsigned DEFAULT '20' COMMENT '算术游戏',
  `game_1_4` int(32) unsigned DEFAULT '20' COMMENT '译码测试',
  `game_1_5` int(32) unsigned DEFAULT '20' COMMENT '拼图游戏',
  `game_1_6` int(32) unsigned DEFAULT '20' COMMENT '迷津游戏',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=40 DEFAULT CHARSET=latin1;

-- ----------------------------
-- Records of score
-- ----------------------------
INSERT INTO `score` VALUES ('33', 'WSVCDS', '0', '20', '20', '10', '20', '20');
INSERT INTO `score` VALUES ('34', 'RTBRT', '5', '20', '20', '20', '20', '20');
INSERT INTO `score` VALUES ('35', 'ERVERFGV', '0', '20', '20', '20', '20', '20');
INSERT INTO `score` VALUES ('36', 'SDVCSD', '0', '20', '20', '20', '20', '20');
INSERT INTO `score` VALUES ('37', ' RTGBVRE', '0', '20', '20', '20', '20', '20');
INSERT INTO `score` VALUES ('38', 'ERTGE1', '0', '20', '20', '20', '20', '20');
INSERT INTO `score` VALUES ('39', 'g\'g\'j\'k\'', '0', '20', '20', '10', '20', '20');

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
) ENGINE=InnoDB AUTO_INCREMENT=249 DEFAULT CHARSET=latin1;

-- ----------------------------
-- Records of user
-- ----------------------------
