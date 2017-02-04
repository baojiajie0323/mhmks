/*
Navicat MySQL Data Transfer

Source Server         : local
Source Server Version : 50711
Source Host           : localhost:3306
Source Database       : mhmks

Target Server Type    : MYSQL
Target Server Version : 50711
File Encoding         : 65001

Date: 2017-02-04 14:07:27
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for `department`
-- ----------------------------
DROP TABLE IF EXISTS `department`;
CREATE TABLE `department` (
  `id` tinyint(4) NOT NULL AUTO_INCREMENT,
  `name` varchar(128) NOT NULL,
  `parentid` tinyint(4) DEFAULT '0',
  `userid` tinyint(4) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=25 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of department
-- ----------------------------
INSERT INTO `department` VALUES ('4', '满好内销部', '0', '0');
INSERT INTO `department` VALUES ('5', 'KA部', '4', '0');
INSERT INTO `department` VALUES ('6', 'AM部', '4', '0');
INSERT INTO `department` VALUES ('7', 'TM部', '4', '0');
INSERT INTO `department` VALUES ('8', '东北区', '5', '0');
INSERT INTO `department` VALUES ('10', '华中区', '5', '0');
INSERT INTO `department` VALUES ('11', '华北区', '5', '0');
INSERT INTO `department` VALUES ('12', '沪浙区', '5', '0');
INSERT INTO `department` VALUES ('14', '浙江宁波区', '12', '3');
INSERT INTO `department` VALUES ('15', '浙江杭州区', '12', '6');
INSERT INTO `department` VALUES ('17', '苏州区', '13', '0');
INSERT INTO `department` VALUES ('24', '华南区', '5', '8');
