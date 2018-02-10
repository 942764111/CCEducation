/*
Navicat MySQL Data Transfer

Source Server         : mylesson3Game
Source Server Version : 50558
Source Host           : localhost:3306
Source Database       : educationgame

Target Server Type    : MYSQL
Target Server Version : 50558
File Encoding         : 65001

Date: 2018-02-10 14:42:37
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for `score`
-- ----------------------------
DROP TABLE IF EXISTS `score`;
CREATE TABLE `score` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT COMMENT 'id',
  `uid` int(11) unsigned DEFAULT NULL COMMENT 'user id',
  `game_1_1` int(32) unsigned DEFAULT '30' COMMENT '常识游戏',
  `game_1_2` int(32) unsigned DEFAULT '30' COMMENT '背数游戏',
  `game_1_3` int(32) unsigned DEFAULT '30' COMMENT '算术游戏',
  `game_1_4` int(32) unsigned DEFAULT '30' COMMENT '译码测试',
  `game_1_5` int(32) unsigned DEFAULT '30' COMMENT '拼图游戏',
  `game_1_6` int(32) unsigned DEFAULT '30' COMMENT '迷津游戏',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=latin1;

-- ----------------------------
-- Records of score
-- ----------------------------
INSERT INTO `score` VALUES ('1', '1', '0', '30', '30', '30', '30', '30');

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
) ENGINE=InnoDB AUTO_INCREMENT=180 DEFAULT CHARSET=latin1;

-- ----------------------------
-- Records of user
-- ----------------------------
INSERT INTO `user` VALUES ('48', 'test', null, '1', '0', '0', '0', '0', 'test', '202cb962ac59075b964b07152d234b70', '2', '20', '1');
INSERT INTO `user` VALUES ('49', 'test12', null, '1', '0', '0', '0', '0', 'test12', '96e79218965eb72c92a549dd5a330112', '2', '20', '1');
INSERT INTO `user` VALUES ('50', 'jjj', null, '1', '0', '0', '0', '0', 'jjj', '3b6281fa2ce2b6c20669490ef4b026a4', '2', '20', '1');
INSERT INTO `user` VALUES ('51', '555', null, '1', '0', '0', '0', '0', '555', 'd3eb9a9233e52948740d7eb8c3062d14', '2', '20', '1');
INSERT INTO `user` VALUES ('52', 'qiaobin', null, '1', '0', '0', '0', '0', 'qiaobin', '202cb962ac59075b964b07152d234b70', '2', '48', '1');
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
INSERT INTO `user` VALUES ('89', 'mhjmhgh', null, '1', '0', '0', '0', '0', 'mhjmhgh', '2c3334866e31058dc94b2b0cc562f093', '2', '1', '1');
INSERT INTO `user` VALUES ('90', '[][][', null, '1', '0', '0', '0', '0', '[][][', 'b5ce86453dbb248e02a2586439c0c8b6', '2', '1', '1');
INSERT INTO `user` VALUES ('91', '67676', null, '1', '0', '0', '0', '0', '67676', '0706e51d6385b85e9a9dca68c1377c94', '2', '1', '1');
INSERT INTO `user` VALUES ('92', 'jkljklj', null, '1', '0', '0', '0', '0', 'jkljklj', '8e98fec3a162df38bd6e79ff767a0f2d', '2', '11', '1');
INSERT INTO `user` VALUES ('93', 'opopop', null, '1', '0', '0', '0', '0', 'opopop', 'de704c9bfdc9bb9105e00b77697fc73a', '2', '1', '1');
INSERT INTO `user` VALUES ('94', 'opop', null, '1', '0', '0', '0', '0', 'opop', '99a30df0f2488360cdd46b4b88e5f5f0', '2', '1', '1');
INSERT INTO `user` VALUES ('95', 'sdfasfas', null, '1', '0', '0', '0', '0', 'sdfasfas', '0aa1ea9a5a04b78d4581dd6d17742627', '2', '11', '1');
INSERT INTO `user` VALUES ('96', 'sdfsdf', null, '1', '0', '0', '0', '0', 'sdfsdf', 'd58e3582afa99040e27b92b13c8f2280', '2', '44', '1');
INSERT INTO `user` VALUES ('97', 'xcvsdvsd', null, '1', '0', '0', '0', '0', 'xcvsdvsd', '530575ae24d0c0861a44bbbe03f26f47', '2', '44', '1');
INSERT INTO `user` VALUES ('98', 'sdfsdfsd', null, '1', '0', '0', '0', '0', 'sdfsdfsd', '8c71fb3f7593543f2ad180d31148a7cf', '2', '44', '1');
INSERT INTO `user` VALUES ('99', 'ntyty', null, '1', '0', '0', '0', '0', 'ntyty', '241eefbb9941695dc8558eafb6a63d85', '2', '1', '1');
INSERT INTO `user` VALUES ('100', 'sace', null, '1', '0', '0', '0', '0', 'sace', '152e5dfe57dc7075cc2b681ce2b0e5b6', '2', '1', '1');
INSERT INTO `user` VALUES ('101', 'fbdfbdf', null, '1', '0', '0', '0', '0', 'fbdfbdf', '865fe807bb0ed8ffba5fcfd7c12269f5', '2', '1', '1');
INSERT INTO `user` VALUES ('102', 'fgbfgb', null, '1', '0', '0', '0', '0', 'fgbfgb', '9afd335a6750e3a019ccf6db6eba0a27', '2', '1', '1');
INSERT INTO `user` VALUES ('103', 'dfvfd', null, '1', '0', '0', '0', '0', 'dfvfd', '6f253bdd69fa5728394e7cceeea753d1', '2', '1', '1');
INSERT INTO `user` VALUES ('104', 'svdsdcs', null, '1', '0', '0', '0', '0', 'svdsdcs', '2de9488cc4391752c70d811d25e16ad9', '2', '1', '1');
INSERT INTO `user` VALUES ('105', 'asdas', null, '1', '0', '0', '0', '0', 'asdas', '0aa1ea9a5a04b78d4581dd6d17742627', '2', '11', '1');
INSERT INTO `user` VALUES ('106', 'cdsc', null, '1', '0', '0', '0', '0', 'cdsc', 'f48e724da4bf786c0d997101b223cfec', '2', '1', '1');
INSERT INTO `user` VALUES ('107', 'asdasas', null, '1', '0', '0', '0', '0', 'asdasas', '0aa1ea9a5a04b78d4581dd6d17742627', '2', '1', '1');
INSERT INTO `user` VALUES ('108', '223', null, '1', '0', '0', '0', '0', '223', '115f89503138416a242f40fb7d7f338e', '3', '20', '1');
INSERT INTO `user` VALUES ('109', null, null, '1', '0', '0', '0', '0', '111aa', '698d51a19d8a121ce581499d7b701668', null, '1', '1');
INSERT INTO `user` VALUES ('110', null, null, '1', '0', '0', '0', '0', 'asdasdsa', '630faa05ea22c48ed5c4b16ad64f6dfa', null, '1', '1');
INSERT INTO `user` VALUES ('111', 'asdasa', null, '1', '0', '0', '0', '0', 'asdasa', 'a8f5f167f44f4964e6c998dee827110c', '2', '11', '1');
INSERT INTO `user` VALUES ('112', 'sadasdas', null, '1', '0', '0', '0', '0', 'sadasdas', 'a8f5f167f44f4964e6c998dee827110c', '4', '1', '1');
INSERT INTO `user` VALUES ('113', 'asaasxas', null, '1', '0', '0', '0', '0', 'asaasxas', 'a8f5f167f44f4964e6c998dee827110c', '4', '1', '1');
INSERT INTO `user` VALUES ('114', 'xczxcxz', null, '1', '0', '0', '0', '0', 'xczxcxz', 'ecb97ffafc1798cd2f67fcbc37226761', '4', '1', '1');
INSERT INTO `user` VALUES ('115', 'asdasdas', null, '1', '0', '0', '0', '0', 'asdasdas', 'e93ccf5ffc90eefcc0bdb81f87d25d1a', '4', '1', '1');
INSERT INTO `user` VALUES ('116', 'sadasdsa', null, '1', '0', '0', '0', '0', 'sadasdsa', '1a18886587c2efa7b720554ff646d482', '4', '1', '1');
INSERT INTO `user` VALUES ('117', 'xzczxczx', null, '1', '0', '0', '0', '0', 'xzczxczx', 'e3eff193482f71b48f7f122ddd1d8ec4', '4', '11', '1');
INSERT INTO `user` VALUES ('118', 'a\'s\'da\'s', null, '1', '0', '0', '0', '0', 'a\'s\'da\'s', 'bff149a0b87f5b0e00d9dd364e9ddaa0', '4', '11', '1');
INSERT INTO `user` VALUES ('119', null, null, '1', '0', '0', '0', '0', 'zxczxczx', 'e40d1ead75bf02d98e1fb3b311fc2f55', null, '1', '1');
INSERT INTO `user` VALUES ('120', null, null, '1', '0', '0', '0', '0', 'ccasc', 'b4fee5762bac346cf05ba1b9922db35d', null, '1', '1');
INSERT INTO `user` VALUES ('121', null, null, '1', '0', '0', '0', '0', 'ghnhgnhg', '1c0d55cade5f8ad4d5f75816f1d9bb71', null, '1', '1');
INSERT INTO `user` VALUES ('122', null, null, '1', '0', '0', '0', '0', 'csdcsd', '153db7d2395fd92a68c8dec459ce0528', null, '1', '1');
INSERT INTO `user` VALUES ('123', null, null, '1', '0', '0', '0', '0', 'asdsad', '630faa05ea22c48ed5c4b16ad64f6dfa', null, '1', '1');
INSERT INTO `user` VALUES ('124', null, null, '1', '0', '0', '0', '0', 'asdasdqw', 'e93ccf5ffc90eefcc0bdb81f87d25d1a', null, '1', '1');
INSERT INTO `user` VALUES ('125', null, null, '1', '0', '0', '0', '0', 'cddsca', 'bd36f8038724581db562ca2bb8f8800a', null, '1', '1');
INSERT INTO `user` VALUES ('126', null, null, '1', '0', '0', '0', '0', 'asxsa', 'ebfca89624341b3c451f6ddbae8641ea', null, '1', '1');
INSERT INTO `user` VALUES ('127', 'axasx', null, '1', '0', '0', '0', '0', 'axasx', '21ce34377f85b43b34e2c330821bd100', '3', '11', '1');
INSERT INTO `user` VALUES ('128', null, null, '1', '0', '0', '0', '0', 'dasd', '0aa1ea9a5a04b78d4581dd6d17742627', null, '1', '1');
INSERT INTO `user` VALUES ('129', null, null, '1', '0', '0', '0', '0', 'asdasasd', '0aa1ea9a5a04b78d4581dd6d17742627', null, '1', '1');
INSERT INTO `user` VALUES ('130', null, null, '1', '0', '0', '0', '0', 'asdaswqe', 'a8f5f167f44f4964e6c998dee827110c', null, '1', '1');
INSERT INTO `user` VALUES ('131', null, null, '1', '0', '0', '0', '0', 'gnghn', '4216fac0ba853d64faf83cfaa83f7f04', null, '1', '1');
INSERT INTO `user` VALUES ('132', 'wqeqw', null, '1', '0', '0', '0', '0', 'wqeqw', '202cb962ac59075b964b07152d234b70', '3', '36', '1');
INSERT INTO `user` VALUES ('133', 'qweqw', null, '1', '0', '0', '0', '0', 'qweqw', '3d53d8bc00bb2f7a56371dce8a16d88f', '4', '36', '1');
INSERT INTO `user` VALUES ('134', 'gbfgb', null, '1', '0', '0', '0', '0', 'gbfgb', '9cc17e8d906b0c2f9eb472dedea8af48', '3', '48', '1');
INSERT INTO `user` VALUES ('135', 'sdcsdc', null, '1', '0', '0', '0', '0', 'sdcsdc', '951d3af3f2376d7dd4201347ad8fa74d', '4', '48', '1');
INSERT INTO `user` VALUES ('136', 'wqeqwqwe', null, '1', '0', '0', '0', '0', 'wqeqwqwe', '07a9f21fdc478d128198a612da31bf0d', '4', '1', '1');
INSERT INTO `user` VALUES ('137', '2222', null, '1', '0', '0', '0', '0', '2222', '934b535800b1cba8f96a5d72f72f1611', '3', '1', '1');
INSERT INTO `user` VALUES ('138', 'qwewqewq', null, '1', '0', '0', '0', '0', 'qwewqewq', '3f76818f507fe7eb6422bd0703c64c88', '2', '1', '1');
INSERT INTO `user` VALUES ('139', '22221', null, '1', '0', '0', '0', '0', '22221', '5a518783270523848f247fb126ac22fa', '3', '48', '1');
INSERT INTO `user` VALUES ('140', '1111', null, '1', '0', '0', '0', '0', '1111', 'b59c67bf196a4758191e42f76670ceba', '4', '11', '1');
INSERT INTO `user` VALUES ('141', null, null, '1', '0', '0', '0', '0', 'qwewq', '07a9f21fdc478d128198a612da31bf0d', null, '1', '1');
INSERT INTO `user` VALUES ('142', null, null, '1', '0', '0', '0', '0', 'wqeqwwqe', '07a9f21fdc478d128198a612da31bf0d', null, '1', '1');
INSERT INTO `user` VALUES ('143', null, null, '1', '0', '0', '0', '0', 'recercw', '683f0bc11eba9e98d9e1a689c5e48800', null, '1', '1');
INSERT INTO `user` VALUES ('144', null, null, '1', '0', '0', '0', '0', 'wqewqcww', 'a8f5f167f44f4964e6c998dee827110c', null, '1', '1');
INSERT INTO `user` VALUES ('145', null, null, '1', '0', '0', '0', '0', 'x\'a\'s\'x\'', 'd3a5ca7e5e987111fafd6688e5cfce27', null, '1', '1');
INSERT INTO `user` VALUES ('146', null, null, '1', '0', '0', '0', '0', 'brtbr', '662fe84c78861a1e4a93f383f51d7e10', null, '1', '1');
INSERT INTO `user` VALUES ('147', null, null, '1', '0', '0', '0', '0', 'qwdqwdwq', 'a8f5f167f44f4964e6c998dee827110c', null, '1', '1');
INSERT INTO `user` VALUES ('148', null, null, '1', '0', '0', '0', '0', 'brtbrt', 'e85642223e156f84523747f2bc2aa231', null, '1', '1');
INSERT INTO `user` VALUES ('149', null, null, '1', '0', '0', '0', '0', 'sadasd', '1a18886587c2efa7b720554ff646d482', null, '1', '1');
INSERT INTO `user` VALUES ('150', null, null, '1', '0', '0', '0', '0', 'asxasxas', '29363768c2a7c0723a8d35c84e92cfcd', null, '1', '1');
INSERT INTO `user` VALUES ('151', null, null, '1', '0', '0', '0', '0', 'cwasacas', 'dd30f01fdac161e9c06535c56c953be1', null, '1', '1');
INSERT INTO `user` VALUES ('152', null, null, '1', '0', '0', '0', '0', 'ccwqcas', 'd480da8c59b88d67017b4228f73653fb', null, '1', '1');
INSERT INTO `user` VALUES ('153', null, null, '1', '0', '0', '0', '0', 'ascqwcsa', '3e61092a6b89cc7d278f1f3ecd041a00', null, '1', '1');
INSERT INTO `user` VALUES ('154', null, null, '1', '0', '0', '0', '0', 'asdqwxsa', '5e7331370326da06b5860522fa06fc11', null, '1', '1');
INSERT INTO `user` VALUES ('155', null, null, '1', '0', '0', '0', '0', 'XESXAS', '324419e4a26e7c67ba3b1019dbfa0eae', null, '1', '1');
INSERT INTO `user` VALUES ('156', null, null, '1', '0', '0', '0', '0', 'XaxAXa', '15d85172a719693864072799f9a236aa', null, '1', '1');
INSERT INTO `user` VALUES ('157', null, null, '1', '0', '0', '0', '0', 'CWQCASX', 'ef812e0a7e4a7c355f1dd6a007071034', null, '1', '1');
INSERT INTO `user` VALUES ('158', null, null, '1', '0', '0', '0', '0', 'ECEASC', '90175b3c3d6370a3df874483caf5bc2c', null, '1', '1');
INSERT INTO `user` VALUES ('159', null, null, '1', '0', '0', '0', '0', 'ascas', '8f87212435e9f183499417aab711cd0b', null, '1', '1');
INSERT INTO `user` VALUES ('160', null, null, '1', '0', '0', '0', '0', 'dvvsdc', 'b4ea23a368b20bc1623e058f392f1fe4', null, '1', '1');
INSERT INTO `user` VALUES ('161', null, null, '1', '0', '0', '0', '0', 'qcwxc', 'fdebe8bbb476d5edb10e8b4514c81400', null, '1', '1');
INSERT INTO `user` VALUES ('162', null, null, '1', '0', '0', '0', '0', 'wecwwe', '2a7d544ccb742bd155e55c796de8e511', null, '1', '1');
INSERT INTO `user` VALUES ('163', null, null, '1', '0', '0', '0', '0', 'qwdqwqww', 'c4d695142157f0f0034b04204cf65add', null, '1', '1');
INSERT INTO `user` VALUES ('164', null, null, '1', '0', '0', '0', '0', 'saxsxqw', 'a71e92c5bc82e6f66cf662f14f2cee7f', null, '1', '1');
INSERT INTO `user` VALUES ('165', null, null, '1', '0', '0', '0', '0', 'wefcwecw', '894000771a0bef05813fb330a83f694c', null, '1', '1');
INSERT INTO `user` VALUES ('166', null, null, '1', '0', '0', '0', '0', 'CASCAS', 'd7a8abfa69d412a629bb5406bb232273', null, '1', '1');
INSERT INTO `user` VALUES ('167', null, null, '1', '0', '0', '0', '0', 'QWXQW', 'ba0b875b1b74567d9289ba0b7eb29476', null, '1', '1');
INSERT INTO `user` VALUES ('168', null, null, '1', '0', '0', '0', '0', 'CWEC', '26439d9984d267665a0a33270348fb41', null, '1', '1');
INSERT INTO `user` VALUES ('169', null, null, '1', '0', '0', '0', '0', 'ASXASXSA', 'f18943e822c600be7cf11e2b8af8b7c1', null, '1', '1');
INSERT INTO `user` VALUES ('170', null, null, '1', '0', '0', '0', '0', 'qqwxqw', '54f084e6f28ba33a1ebff767f65e0210', null, '1', '1');
INSERT INTO `user` VALUES ('171', null, null, '1', '0', '0', '0', '0', 'ADASDSAD', 'a20b858165385473187246c2719260a4', null, '1', '1');
INSERT INTO `user` VALUES ('172', null, null, '1', '0', '0', '0', '0', 'AXSX', 'd9f9ab1b2b9ff1563c95efbe79b7fc94', null, '1', '1');
INSERT INTO `user` VALUES ('173', null, null, '1', '0', '0', '0', '0', 'ASCASCAS', 'd9f9ab1b2b9ff1563c95efbe79b7fc94', null, '1', '1');
INSERT INTO `user` VALUES ('174', null, null, '1', '0', '0', '0', '0', 'ASDASDax', '50d840857d1919521aea558d58d5b083', null, '1', '1');
INSERT INTO `user` VALUES ('175', null, null, '1', '0', '0', '0', '0', 'asdsa', '135d5423b62402a96c619ea9bf1f22b4', null, '1', '1');
INSERT INTO `user` VALUES ('176', 'WCWEAS', null, '1', '0', '0', '0', '0', 'WCWEAS', '0b265dab8788413e84414d9659580ed6', '2', '11', '1');
INSERT INTO `user` VALUES ('177', 'ascasx', null, '1', '0', '0', '0', '0', 'ascasx', 'aa6dfeca717f06132595b91664482ece', '2', '1', '1');
INSERT INTO `user` VALUES ('178', 'REVERVE', null, '1', '0', '0', '0', '0', 'REVERVE', '950410bb51da34684caebbdd3cec596a', '2', '1', '1');
INSERT INTO `user` VALUES ('179', 'WCCWE', null, '1', '0', '0', '0', '0', 'WCCWE', 'e648aed033b42be386f39cae97bc48ed', '2', '1', '1');
