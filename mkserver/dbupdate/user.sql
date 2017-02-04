/*
Navicat MySQL Data Transfer

Source Server         : local
Source Server Version : 50711
Source Host           : localhost:3306
Source Database       : mhmks

Target Server Type    : MYSQL
Target Server Version : 50711
File Encoding         : 65001

Date: 2017-02-04 14:08:05
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for `user`
-- ----------------------------
DROP TABLE IF EXISTS `user`;
CREATE TABLE `user` (
  `id` tinyint(4) NOT NULL AUTO_INCREMENT,
  `username` varchar(10) NOT NULL,
  `realname` varchar(20) DEFAULT NULL,
  `password` varchar(32) NOT NULL,
  `phone` varchar(11) DEFAULT NULL,
  `email` varchar(64) DEFAULT NULL,
  `depart` tinyint(4) DEFAULT '0',
  `role` tinyint(4) DEFAULT '0',
  `enableweb` tinyint(4) DEFAULT '1',
  `enableapp` tinyint(4) DEFAULT '1',
  `check` tinyint(4) DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of user
-- ----------------------------
INSERT INTO `user` VALUES ('2', 'admin', 'admin', '12345678', null, null, null, '1', '1', '1', '0');
INSERT INTO `user` VALUES ('3', '001513', '白焕霞', '12345678', null, 'baihuanxia@myhome-sh.com', null, '1', '1', '0', '0');
INSERT INTO `user` VALUES ('4', '001786', '陈小燕', '12345678', null, 'chenxiaoyan@myhome-sh.com', null, '1', '1', '0', '0');
INSERT INTO `user` VALUES ('5', '001647', '胡玉芝', '12345678', null, 'huyuzhi@myhome-sh.com', null, '1', '1', '0', '0');
INSERT INTO `user` VALUES ('6', '001837', '卢琴', '12345678', null, 'luqin@myhome-sh.com', null, '1', '1', '0', '0');
INSERT INTO `user` VALUES ('7', '001823', '顾慧琳', '12345678', null, null, null, '1', '1', '0', '0');
INSERT INTO `user` VALUES ('8', '000093', '陈慧', '12345678', null, null, null, '1', '1', '0', '0');
INSERT INTO `user` VALUES ('9', '001831', '孙光伟', '12345678', '13015154545', 'sunguangwei@myhome-sh.com', '9', '1', '1', '0', '0');
INSERT INTO `user` VALUES ('10', '008888', '鲍嘉捷', '123456', null, null, null, '1', '1', '0', '0');
INSERT INTO `user` VALUES ('15', '001122', '业务员1', '123', '15026489683', '12323@12.com', '24', '7', '1', '1', '0');
