/*
Navicat MySQL Data Transfer

Source Server         : mylesson3Game
Source Server Version : 50558
Source Host           : localhost:3306
Source Database       : educationgame

Target Server Type    : MYSQL
Target Server Version : 50558
File Encoding         : 65001

Date: 2018-02-05 10:14:12
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
) ENGINE=InnoDB AUTO_INCREMENT=89 DEFAULT CHARSET=latin1;

-- ----------------------------
-- Records of user
-- ----------------------------
INSERT INTO `user` VALUES ('48', 'test', null, '1', '0', '0', '0', '0', 'test', '202cb962ac59075b964b07152d234b70', '2', '20', '1');
INSERT INTO `user` VALUES ('49', 'test12', null, '1', '0', '0', '0', '0', 'test12', '96e79218965eb72c92a549dd5a330112', '2', '20', '1');
INSERT INTO `user` VALUES ('50', 'jjj', null, '1', '0', '0', '0', '0', 'jjj', '3b6281fa2ce2b6c20669490ef4b026a4', '2', '20', '1');
INSERT INTO `user` VALUES ('51', '555', null, '1', '0', '0', '0', '0', '555', 'd3eb9a9233e52948740d7eb8c3062d14', '2', '20', '1');
INSERT INTO `user` VALUES ('52', 'qiaobin', null, '1', '0', '0', '0', '0', 'qiaobin', '202cb962ac59075b964b07152d234b70', '2', '36', '1');
INSERT INTO `user` VALUES ('53', 'iii', null, '1', '0', '0', '0', '0', 'iii', '36347412c7d30ae6fde3742bbc4f21b9', '3', '28', '1');
INSERT INTO `user` VALUES ('54', 'ttt', null, '1', '0', '0', '0', '0', 'ttt', '9990775155c3518a0d7917f7780b24aa', '2', '20', '1');
INSERT INTO `user` VALUES ('55', 'rrr', null, '1', '0', '0', '0', '0', 'rrr', '44f437ced647ec3f40fa0841041871cd', '2', '28', '1');
INSERT INTO `user` VALUES ('56', 'uuu', null, '1', '0', '0', '0', '0', 'uuu', 'c70fd4260c9eb90bc0ba9d047c068eb8', '2', '28', '1');
INSERT INTO `user` VALUES ('57', 'bbb', null, '1', '0', '0', '0', '0', 'bbb', '08f8e0260c64418510cefb2b06eee5cd', '2', '36', '1');
INSERT INTO `user` VALUES ('58', '乔彬', null, '1', '0', '0', '0', '0', '乔彬', '202cb962ac59075b964b07152d234b70', '2', '28', '1');
INSERT INTO `user` VALUES ('59', '123', null, '1', '0', '0', '0', '0', '123', '202cb962ac59075b964b07152d234b70', '4', '28', '1');
INSERT INTO `user` VALUES ('60', 'j d k s ', null, '1', '0', '0', '0', '0', 'j d k s ', 'f495fa6520c6628a27652a0058e31bf5', '4', '28', '1');
INSERT INTO `user` VALUES ('61', '111', null, '1', '0', '0', '0', '0', '111', '698d51a19d8a121ce581499d7b701668', '2', '28', '1');
INSERT INTO `user` VALUES ('62', 'DDEDd', null, '1', '0', '0', '0', '0', 'DDEDd', '03935e09631d78caa2a05d1ae9ebd7d1', '3', '11', '1');
INSERT INTO `user` VALUES ('63', 'assf', null, '1', '0', '0', '0', '0', 'assf', '23d323aa14986e2e5a3a0b0c46e65e23', '2', '28', '1');
INSERT INTO `user` VALUES ('64', 'yu', null, '1', '0', '0', '0', '0', 'yu', '385d04e7683a033fcc6c6654529eb7e9', '4', '28', '1');
INSERT INTO `user` VALUES ('65', 'qwer', null, '1', '0', '0', '0', '0', 'qwer', '962012d09b8170d912f0669f6d7d9d07', '2', '36', '1');
INSERT INTO `user` VALUES ('66', '11146464', null, '1', '0', '0', '0', '0', '11146464', 'b59c67bf196a4758191e42f76670ceba', '4', '1', '1');
INSERT INTO `user` VALUES ('67', 'ppppp', null, '1', '0', '0', '0', '0', 'ppppp', 'a7c471cfd3c42dc6d6a8552ac2c0a22c', '4', '36', '1');
INSERT INTO `user` VALUES ('68', 'kkkk', null, '1', '0', '0', '0', '0', 'kkkk', 'fa7f08233358e9b466effa1328168527', '2', '1', '1');
INSERT INTO `user` VALUES ('69', 'tttt', null, '1', '0', '0', '0', '0', 'tttt', '32bf0e6fcff51e53bd74e70ba1d622b2', '2', '36', '1');
INSERT INTO `user` VALUES ('70', 'ppppppp', null, '1', '0', '0', '0', '0', 'ppppppp', 'a7c471cfd3c42dc6d6a8552ac2c0a22c', '2', '11', '1');
INSERT INTO `user` VALUES ('71', 'bbbbbb', null, '1', '0', '0', '0', '0', 'bbbbbb', '08f8e0260c64418510cefb2b06eee5cd', '2', '1', '1');
INSERT INTO `user` VALUES ('72', 'bbbbb', null, '1', '0', '0', '0', '0', 'bbbbb', '08f8e0260c64418510cefb2b06eee5cd', '2', '1', '1');
INSERT INTO `user` VALUES ('73', 'iiiiii', null, '1', '0', '0', '0', '0', 'iiiiii', '36347412c7d30ae6fde3742bbc4f21b9', '2', '1', '1');
INSERT INTO `user` VALUES ('74', 'mmmm', null, '1', '0', '0', '0', '0', 'mmmm', '9de37a0627c25684fdd519ca84073e34', '2', '36', '1');
INSERT INTO `user` VALUES ('75', '3333', null, '1', '0', '0', '0', '0', '3333', '2be9bd7a3434f7038ca27d1918de58bd', '2', '36', '1');
INSERT INTO `user` VALUES ('76', '9191', null, '1', '0', '0', '0', '0', '9191', 'dfc7defac6624a80f02b02e22b14e8fd', '2', '36', '1');
INSERT INTO `user` VALUES ('77', 'y j w k ', null, '1', '0', '0', '0', '0', 'y j w k ', '87087f0c8da6094704c89e12f7205c8b', '4', '36', '1');
INSERT INTO `user` VALUES ('78', 'Asd445', null, '1', '0', '0', '0', '0', 'Asd445', '202cb962ac59075b964b07152d234b70', '2', '11', '1');
INSERT INTO `user` VALUES ('79', 'uuuuuuu', null, '1', '0', '0', '0', '0', 'uuuuuuu', '9982b2a7fceaaee2c8444b5086aee008', '4', '36', '1');
INSERT INTO `user` VALUES ('80', '梦想', null, '1', '0', '0', '0', '0', '梦想', 'ca45de443799f27e6da18180043bcd9d', '2', '36', '1');
INSERT INTO `user` VALUES ('81', 'asdasd', null, '1', '0', '0', '0', '0', 'asdasd', 'bff149a0b87f5b0e00d9dd364e9ddaa0', '3', '1', '1');
INSERT INTO `user` VALUES ('82', 'dddddddd', null, '1', '0', '0', '0', '0', 'dddddddd', 'ef800207a3648c7c1ef3e9fe544f17f0', '2', '36', '1');
INSERT INTO `user` VALUES ('83', '44444', null, '1', '0', '0', '0', '0', '44444', 'dcb64c94e1b81cd1cd3eb4a73ad27d99', '2', '36', '1');
INSERT INTO `user` VALUES ('84', '乔彬111', null, '1', '0', '0', '0', '0', '乔彬111', '2f365286e867b137290df8d8076be7c8', '4', '36', '1');
INSERT INTO `user` VALUES ('85', null, null, '1', '0', '0', '0', '0', 'koko', 'dc898607cc9bb1cfd92ef83a0d5914b8', null, '1', '1');
INSERT INTO `user` VALUES ('86', 'ppppppp1', null, '1', '0', '0', '0', '0', 'ppppppp1', '202cb962ac59075b964b07152d234b70', '2', '20', '1');
INSERT INTO `user` VALUES ('87', 'Qqqqq', null, '1', '0', '0', '0', '0', 'Qqqqq', '42dae262b8531b3df48cde9cc018c512', '2', '11', '1');
INSERT INTO `user` VALUES ('88', 'saury', null, '1', '0', '0', '0', '0', 'saury', '3c538b2084ef4db9a45e84fbdee045d5', '2', '11', '1');
