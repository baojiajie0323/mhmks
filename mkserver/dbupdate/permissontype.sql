/*
Navicat MySQL Data Transfer

Source Server         : local
Source Server Version : 50711
Source Host           : localhost:3306
Source Database       : mhmks

Target Server Type    : MYSQL
Target Server Version : 50711
File Encoding         : 65001

Date: 2017-02-04 14:07:40
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for `permissontype`
-- ----------------------------
DROP TABLE IF EXISTS `permissontype`;
CREATE TABLE `permissontype` (
  `permissonid` tinyint(4) NOT NULL,
  `name` varchar(128) NOT NULL,
  `parentid` tinyint(4) DEFAULT '0',
  PRIMARY KEY (`permissonid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of permissontype
-- ----------------------------
INSERT INTO `permissontype` VALUES ('1', '后台管理', '0');
INSERT INTO `permissontype` VALUES ('2', 'APP', '0');
