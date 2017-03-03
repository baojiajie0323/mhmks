'use strict';
import $ from 'jquery'
import { message } from 'antd';

var _debug = true;

const AJAXTIMEOUT = 20 * 1000;
var React = require('react');
var AppDispatcher = require('./AppDispatcher');
var ActionEvent = require('./event-const').ActionEvent;
var Action = {
  login: function (data) {
    var context = this;
    data.command = 'login';
    $.ajax({
      url: '/users', type: 'POST', timeout: AJAXTIMEOUT,
      data: data
    })
      .done(function (response) {
        console.log('login:', response);
        if (response.code == 0) {
          context.dispatch(ActionEvent.AE_LOGIN, response.data[0]);
          message.success('登录成功');
        } else {
          message.error('登录失败！' + response.msg);
        }
      })
      .fail(function (xhr, textStatus, thrownError) {
        message.error('与服务器建立连接失败');
        console.log('login fail');
        if (_debug) {
          var response = '{"data":{},"result":"ok"}';
          var rsp = JSON.parse(response);
          context.dispatch(ActionEvent.AE_LOGIN, rsp.data);
        }
      })
  },
  logout: function () {
    var context = this;
    var data = {
      command: 'logout'
    }
    $.ajax({
      url: '/users', type: 'POST', timeout: AJAXTIMEOUT,
      data: data
    })
      .done(function (response) {
        console.log('logout:', response);
        if (response.code == 0) {
          context.dispatch(ActionEvent.AE_LOGOUT);
          message.success('注销成功');
        } else {
          message.error('注销失败' + response.msg);
        }
      })
      .fail(function (xhr, textStatus, thrownError) {
        message.error('与服务器建立连接失败');
        console.log('logout fail');
        if (_debug) {
          context.dispatch(ActionEvent.AE_LOGOUT);
        }
        //context.dispatch(ActionEvent.AE_LOGOUT);
      })
  },
  getStoreArea: function () {
    var context = this;
    var data = {
      command: 'getstorearea'
    }
    $.ajax({
      url: '/info', type: 'POST', timeout: AJAXTIMEOUT,
      data: data
    })
      .done(function (response) {
        console.log('getStoreArea:', response);
        if (response.code == 0) {
          context.dispatch(ActionEvent.AE_STOREAREA, response.data);
        } else {
          message.error('获取门店系统区域失败！' + response.msg);
        }
      })
      .fail(function (xhr, textStatus, thrownError) {
        message.error('与服务器建立连接失败');
        console.log('getStoreArea fail');
        if (_debug) {
          var response = '{"data":[]}';
          var rsp = JSON.parse(response);
          context.dispatch(ActionEvent.AE_STOREAREA, rsp.data);
        }
      })
  },
  getStoreBasic: function () {
    var context = this;
    var data = {
      command: 'getstorebasic'
    }
    $.ajax({
      url: '/info', type: 'POST', timeout: AJAXTIMEOUT,
      data: data
    })
      .done(function (response) {
        console.log('getStoreBasic:', response);
        if (response.code == 0) {
          context.dispatch(ActionEvent.AE_STOREBASIC, response.data);
        } else {
          message.error('获取门店失败！' + response.msg);
        }
      })
      .fail(function (xhr, textStatus, thrownError) {
        message.error('与服务器建立连接失败');
        console.log('getStoreBasic fail');
        if (_debug) {
          var response = '{"data":[]}';
          var rsp = JSON.parse(response);
          context.dispatch(ActionEvent.AE_STOREBASIC, rsp.data);
        }
      })
  },
  getStoreContacts: function () {
    var context = this;
    var data = {
      command: 'getstorecontacts'
    }
    $.ajax({
      url: '/info', type: 'POST', timeout: AJAXTIMEOUT,
      data: data
    })
      .done(function (response) {
        console.log('getStoreContacts:', response);
        if (response.code == 0) {
          context.dispatch(ActionEvent.AE_STORECONTACTS, response.data);
        } else {
          message.error('获取门店联系人失败！' + response.msg);
        }
      })
      .fail(function (xhr, textStatus, thrownError) {
        message.error('与服务器建立连接失败');
        console.log('getStoreContacts fail');
        if (_debug) {
          var response = '{"data":[]}';
          var rsp = JSON.parse(response);
          context.dispatch(ActionEvent.AE_STORECONTACTS, rsp.data);
        }
      })
  },
  getStoreDisplay: function () {
    var context = this;
    var data = {
      command: 'getstoredisplay'
    }
    $.ajax({
      url: '/info', type: 'POST', timeout: AJAXTIMEOUT,
      data: data
    })
      .done(function (response) {
        console.log('getStoreDisplay:', response);
        if (response.code == 0) {
          context.dispatch(ActionEvent.AE_STOREDISPLAY, response.data);
        } else {
          message.error('获取门店联系人失败！' + response.msg);
        }
      })
      .fail(function (xhr, textStatus, thrownError) {
        message.error('与服务器建立连接失败');
        console.log('getStoreDisplay fail');
        if (_debug) {
          var response = '{"data":[]}';
          var rsp = JSON.parse(response);
          context.dispatch(ActionEvent.AE_STOREDISPLAY, rsp.data);
        }
      })
  },
  getProduct: function () {
    var context = this;
    var data = {
      command: 'getproduct'
    }
    $.ajax({
      url: '/info', type: 'POST', timeout: AJAXTIMEOUT,
      data: data
    })
      .done(function (response) {
        console.log('getProduct:', response);
        if (response.code == 0) {
          context.dispatch(ActionEvent.AE_PRODUCT, response.data);
        } else {
          message.error('获取产品失败！' + response.msg);
        }
      })
      .fail(function (xhr, textStatus, thrownError) {
        message.error('与服务器建立连接失败');
        console.log('getStoreDisplay fail');
        if (_debug) {
          var response = '{"data":[]}';
          var rsp = JSON.parse(response);
          context.dispatch(ActionEvent.AE_PRODUCT, rsp.data);
        }
      })
  },
  getProductPrice: function (page) {
    var context = this;
    var data = {
      command: 'getproductprice',
      page: page
    }
    $.ajax({
      url: '/info', type: 'POST', timeout: AJAXTIMEOUT,
      data: data
    })
      .done(function (response) {
        console.log('getProductPrice:', response);
        if (response.code == 0) {
          context.dispatch(ActionEvent.AE_PRODUCTPRICECOUNT, response.count);
          context.dispatch(ActionEvent.AE_PRODUCTPRICE, response.data);
        } else {
          message.error('获取产品价格失败！' + response.msg);
        }
      })
      .fail(function (xhr, textStatus, thrownError) {
        message.error('与服务器建立连接失败');
        console.log('getProductPrice fail');
        if (_debug) {
          var response = '{"data":[]}';
          var rsp = JSON.parse(response);
          context.dispatch(ActionEvent.AE_PRODUCTPRICE, rsp.data);
        }
      })
  },
  getProductStock: function (page) {
    var context = this;
    var data = {
      command: 'getproductstock',
      page: page
    }
    $.ajax({
      url: '/info', type: 'POST', timeout: AJAXTIMEOUT,
      data: data
    })
      .done(function (response) {
        console.log('getProductStock:', response);
        if (response.code == 0) {
          context.dispatch(ActionEvent.AE_PRODUCTSTOCKCOUNT, response.count);
          context.dispatch(ActionEvent.AE_PRODUCTSTOCK, response.data);
        } else {
          message.error('获取产品安全库存失败！' + response.msg);
        }
      })
      .fail(function (xhr, textStatus, thrownError) {
        message.error('与服务器建立连接失败');
        console.log('getProductStock fail');
        if (_debug) {
          var response = '{"data":[]}';
          var rsp = JSON.parse(response);
          context.dispatch(ActionEvent.AE_PRODUCTSTOCK, rsp.data);
        }
      })
  },
  getProductBrand: function () {
    var context = this;
    var data = {
      command: 'getproductbrand'
    }
    $.ajax({
      url: '/info', type: 'POST', timeout: AJAXTIMEOUT,
      data: data
    })
      .done(function (response) {
        console.log('getProductBrand:', response);
        if (response.code == 0) {
          context.dispatch(ActionEvent.AE_PRODUCTBRAND, response.data);
        } else {
          message.error('获取品牌失败！' + response.msg);
        }
      })
      .fail(function (xhr, textStatus, thrownError) {
        message.error('与服务器建立连接失败');
        console.log('getProductBrand fail');
        if (_debug) {
          var response = '{"data":[]}';
          var rsp = JSON.parse(response);
          context.dispatch(ActionEvent.AE_PRODUCTBRAND, rsp.data);
        }
      })
  },
  getPromotionType: function () {
    var context = this;
    var data = {
      command: 'getpromotiontype'
    }
    $.ajax({
      url: '/info', type: 'POST', timeout: AJAXTIMEOUT,
      data: data
    })
      .done(function (response) {
        console.log('getPromotionType:', response);
        if (response.code == 0) {
          context.dispatch(ActionEvent.AE_PROMOTIONTYPE, response.data);
        } else {
          message.error('获取促销类型失败！' + response.msg);
        }
      })
      .fail(function (xhr, textStatus, thrownError) {
        message.error('与服务器建立连接失败');
        console.log('getPromotionType fail');
        if (_debug) {
          var response = '{"data":[]}';
          var rsp = JSON.parse(response);
          context.dispatch(ActionEvent.AE_PROMOTIONTYPE, rsp.data);
        }
      })
  },
  getPromotion: function (page) {
    var context = this;
    var data = {
      command: 'getpromotion',
      page: page
    }
    $.ajax({
      url: '/info', type: 'POST', timeout: AJAXTIMEOUT,
      data: data
    })
      .done(function (response) {
        console.log('getPromotion:', response);
        if (response.code == 0) {
          context.dispatch(ActionEvent.AE_PROMOTIONCOUNT, response.count);
          context.dispatch(ActionEvent.AE_PROMOTION, response.data);
        } else {
          message.error('获取促销活动失败！' + response.msg);
        }
      })
      .fail(function (xhr, textStatus, thrownError) {
        message.error('与服务器建立连接失败');
        console.log('getPromotion fail');
        if (_debug) {
          var response = '{"data":[]}';
          var rsp = JSON.parse(response);
          context.dispatch(ActionEvent.AE_PROMOTION, rsp.data);
        }
      })
  },

  getUser: function () {
    var context = this;
    var data = {
      command: 'getuser'
    }
    $.ajax({
      url: '/users', type: 'POST', timeout: AJAXTIMEOUT,
      data: data
    })
      .done(function (response) {
        console.log('getUser:', response);
        if (response.code == 0) {
          context.dispatch(ActionEvent.AE_USER, response.data);
        } else {
          message.error('获取用户失败！' + response.msg);
        }
      })
      .fail(function (xhr, textStatus, thrownError) {
        message.error('与服务器建立连接失败');
        console.log('getUser fail');
        if (_debug) {
          var response = '{"data":[{"id":1,"username":"008888","realname":"鲍嘉捷","password":"123456","phone":"15026489683","email":"baojiajie@myhome.com","depart":"","enableweb":1,"enableapp":0}]}';
          var rsp = JSON.parse(response);
          context.dispatch(ActionEvent.AE_USER, rsp.data);
        }
      })
  },
  addUser: function (data) {
    var context = this;
    data.command = 'adduser';
    $.ajax({
      url: '/users', type: 'POST', timeout: AJAXTIMEOUT,
      data: data
    })
      .done(function (response) {
        console.log('addUser:', response);
        if (response.code == 0) {
          context.dispatch(ActionEvent.AE_USER_ADD, response.data);
          message.success('创建用户成功！');
        } else {
          message.error('创建用户失败！' + response.msg);
        }
      })
      .fail(function (xhr, textStatus, thrownError) {
        message.error('与服务器建立连接失败');
        console.log('adduser fail');
      })
  },
  modUser: function (data) {
    var context = this;
    data.command = 'moduser';
    $.ajax({
      url: '/users', type: 'POST', timeout: AJAXTIMEOUT,
      data: data
    })
      .done(function (response) {
        console.log('modUser:', response);
        if (response.code == 0) {
          context.dispatch(ActionEvent.AE_USER_MOD, response.data);
          message.success('修改用户成功！');
        } else {
          message.error('修改用户失败！' + response.msg);
        }
      })
      .fail(function (xhr, textStatus, thrownError) {
        message.error('与服务器建立连接失败');
        console.log('modUser fail');
      })
  },
  delUser: function (data) {
    var context = this;
    data.command = 'deluser';
    $.ajax({
      url: '/users', type: 'POST', timeout: AJAXTIMEOUT,
      data: data
    })
      .done(function (response) {
        console.log('delUser:', response);
        if (response.code == 0) {
          context.dispatch(ActionEvent.AE_USER_DEL, response.data);
          message.success('删除用户成功！');
        } else {
          message.error('删除用户失败！' + response.msg);
        }
      })
      .fail(function (xhr, textStatus, thrownError) {
        message.error('与服务器建立连接失败');
        console.log('delUser fail');
      })
  },
  getDepartment: function () {
    var context = this;
    var data = {
      command: 'getdepart'
    }
    $.ajax({
      url: '/users', type: 'POST', timeout: AJAXTIMEOUT,
      data: data
    })
      .done(function (response) {
        console.log('getDepart:', response);
        if (response.code == 0) {
          context.dispatch(ActionEvent.AE_DEPARTMENT, response.data);
        } else {
          message.error('获取部门失败！' + response.msg);
        }
      })
      .fail(function (xhr, textStatus, thrownError) {
        message.error('与服务器建立连接失败');
        console.log('getDepart fail');
        if (_debug) {
          var response = '{"data":[{"id":"1","name":"市场部","parentid":"0"},{"id":"2","name":"营销部","parentid":"0"},{"id":"3","name":"华东区","parentid":"1"},{"id":"4","name":"华中区","parentid":"1"},{"id":"5","name":"上海区","parentid":"4"}]}';
          var rsp = JSON.parse(response);
          context.dispatch(ActionEvent.AE_DEPARTMENT, rsp.data);
        }
      })
  },
  addDepartment: function (data) {
    var context = this;
    data.command = 'adddepart';
    $.ajax({
      url: '/users', type: 'POST', timeout: AJAXTIMEOUT,
      data: data
    })
      .done(function (response) {
        console.log('addDepartment:', response);
        if (response.code == 0) {
          context.dispatch(ActionEvent.AE_DEPARTMENT_ADD, response.data);
          message.success('创建部门成功！');
        } else {
          message.error('创建部门失败！' + response.msg);
        }
      })
      .fail(function (xhr, textStatus, thrownError) {
        message.error('与服务器建立连接失败');
        console.log('addDepartment fail');
      })
  },
  modDepartment: function (data) {
    var context = this;
    data.command = 'moddepart';
    $.ajax({
      url: '/users', type: 'POST', timeout: AJAXTIMEOUT,
      data: data
    })
      .done(function (response) {
        console.log('modDepartment:', response);
        if (response.code == 0) {
          context.dispatch(ActionEvent.AE_DEPARTMENT_MOD, response.data);
          message.success('修改部门成功！');
        } else {
          message.error('修改部门失败！' + response.msg);
        }
      })
      .fail(function (xhr, textStatus, thrownError) {
        message.error('与服务器建立连接失败');
        console.log('modDepartment fail');
      })
  },
  delDepartment: function (data) {
    var context = this;
    data.command = 'deldepart';
    $.ajax({
      url: '/users', type: 'POST', timeout: AJAXTIMEOUT,
      data: data
    })
      .done(function (response) {
        console.log('delDepartment:', response);
        if (response.code == 0) {
          context.dispatch(ActionEvent.AE_DEPARTMENT_DEL, response.data);
          message.success('删除部门成功！');
        } else {
          message.error('删除部门失败！' + response.msg);
        }
      })
      .fail(function (xhr, textStatus, thrownError) {
        message.error('与服务器建立连接失败');
        console.log('delDepartment fail');
      })
  },
  getPermissonType: function () {
    var context = this;
    var data = {
      command: 'getpermissontype'
    }
    $.ajax({
      url: '/users', type: 'POST', timeout: AJAXTIMEOUT,
      data: data
    })
      .done(function (response) {
        console.log('getPermissonType:', response);
        if (response.code == 0) {
          context.dispatch(ActionEvent.AE_PERMISSONTYPE, response.data);
        } else {
          message.error('获取权限失败！' + response.msg);
        }
      })
      .fail(function (xhr, textStatus, thrownError) {
        message.error('与服务器建立连接失败');
        console.log('getPermissonType fail');
        if (_debug) {
          var response = '{"data":[{"permissonid":1,"name":"后台管理","parentid":"0"},{"permissonid":2,"name":"大区主管","parentid":"0"}]}';
          var rsp = JSON.parse(response);
          context.dispatch(ActionEvent.AE_PERMISSONTYPE, rsp.data);
        }
      })
  },
  getRole: function () {
    var context = this;
    var data = {
      command: 'getrole'
    }
    $.ajax({
      url: '/users', type: 'POST', timeout: AJAXTIMEOUT,
      data: data
    })
      .done(function (response) {
        console.log('getRole:', response);
        if (response.code == 0) {
          context.dispatch(ActionEvent.AE_ROLE, response.data);
        } else {
          message.error('获取角色失败！' + response.msg);
        }
      })
      .fail(function (xhr, textStatus, thrownError) {
        message.error('与服务器建立连接失败');
        console.log('getRole fail');
        if (_debug) {
          var response = '{"data":[{"id":1,"name":"系统管理员"},{"id":2,"name":"大区主管"}]}';
          var rsp = JSON.parse(response);
          context.dispatch(ActionEvent.AE_ROLE, rsp.data);
        }
      })
  },
  addRole: function (data) {
    var context = this;
    data.command = 'addrole';
    $.ajax({
      url: '/users', type: 'POST', timeout: AJAXTIMEOUT,
      data: data
    })
      .done(function (response) {
        console.log('addRole:', response);
        if (response.code == 0) {
          context.dispatch(ActionEvent.AE_ROLE_ADD, response.data);
          message.success('创建角色成功！');
        } else {
          message.error('创建角色失败！' + response.msg);
        }
      })
      .fail(function (xhr, textStatus, thrownError) {
        message.error('与服务器建立连接失败');
        console.log('addRole fail');
      })
  },
  modRole: function (data) {
    var context = this;
    data.command = 'modrole';
    $.ajax({
      url: '/users', type: 'POST', timeout: AJAXTIMEOUT,
      data: data
    })
      .done(function (response) {
        console.log('modRole:', response);
        if (response.code == 0) {
          context.dispatch(ActionEvent.AE_ROLE_MOD, response.data);
          message.success('修改角色成功！');
        } else {
          message.error('修改角色失败！' + response.msg);
        }
      })
      .fail(function (xhr, textStatus, thrownError) {
        message.error('与服务器建立连接失败');
        console.log('modRole fail');
      })
  },
  delRole: function (data) {
    var context = this;
    data.command = 'delrole';
    $.ajax({
      url: '/users', type: 'POST', timeout: AJAXTIMEOUT,
      data: data
    })
      .done(function (response) {
        console.log('delRole:', response);
        if (response.code == 0) {
          context.dispatch(ActionEvent.AE_ROLE_DEL, response.data);
          message.success('删除角色成功！');
        } else {
          message.error('删除角色失败！' + response.msg);
        }
      })
      .fail(function (xhr, textStatus, thrownError) {
        message.error('与服务器建立连接失败');
        console.log('delRole fail');
      })
  },

  getPath: function () {
    var context = this;
    var data = {
      command: 'getpath'
    }
    $.ajax({
      url: '/visitor', type: 'POST', timeout: AJAXTIMEOUT,
      data: data
    })
      .done(function (response) {
        console.log('getPath:', response);
        if (response.code == 0) {
          context.dispatch(ActionEvent.AE_PATH, response.data);
        } else {
          message.error('获取路线失败！' + response.msg);
        }
      })
      .fail(function (xhr, textStatus, thrownError) {
        message.error('与服务器建立连接失败');
        console.log('getPath fail');
        if (_debug) {
          var response = '{"data":[{"Path_id":"Q00001","Path_name":"山东1"},{"Path_id":"Q00002","Path_name":"山东2"}]}';
          var rsp = JSON.parse(response);
          context.dispatch(ActionEvent.AE_PATH, rsp.data);
        }
      })
  },
  getPath_app: function (data) {
    var context = this;
    data.command = 'getpath_app';
    $.ajax({
      url: '/visitor', type: 'POST', timeout: AJAXTIMEOUT,
      data: data
    })
      .done(function (response) {
        console.log('getPath:', response);
        if (response.code == 0) {
          context.dispatch(ActionEvent.AE_PATH, response.data);
        } else {
          message.error('获取路线失败！' + response.msg);
        }
      })
      .fail(function (xhr, textStatus, thrownError) {
        message.error('与服务器建立连接失败');
        console.log('getPath fail');
        if (_debug) {
          var response = '{"data":[{"Path_id":"Q00001","Path_name":"山东1"},{"Path_id":"Q00002","Path_name":"山东2"}]}';
          var rsp = JSON.parse(response);
          context.dispatch(ActionEvent.AE_PATH, rsp.data);
        }
      })
  },
  getPathDetail: function () {
    var context = this;
    var data = {
      command: 'getpathdetail'
    }
    $.ajax({
      url: '/visitor', type: 'POST', timeout: AJAXTIMEOUT,
      data: data
    })
      .done(function (response) {
        console.log('getPathDetail:', response);
        if (response.code == 0) {
          context.dispatch(ActionEvent.AE_PATHDETAIL, response.data);
        } else {
          message.error('获取路线详情失败！' + response.msg);
        }
      })
      .fail(function (xhr, textStatus, thrownError) {
        message.error('与服务器建立连接失败');
        console.log('getPath fail');
        if (_debug) {
          var response = '{"data":[{"Path_id":"Q00001","Path_name":"山东1"},{"Path_id":"Q00002","Path_name":"山东2"}]}';
          var rsp = JSON.parse(response);
          context.dispatch(ActionEvent.AE_PATHDETAIL, rsp.data);
        }
      })
  },
  getPlanSum: function (data) {
    var context = this;
    data.command = 'getplansum';
    $.ajax({
      url: '/visitor', type: 'POST', timeout: AJAXTIMEOUT,
      data: data
    })
      .done(function (response) {
        console.log('getPlanSum:', response);
        if (response.code == 0) {
          context.dispatch(ActionEvent.AE_PLANSUM, response.data);
        } else {
          message.error('获取计划统计失败！' + response.msg);
        }
      })
      .fail(function (xhr, textStatus, thrownError) {
        message.error('与服务器建立连接失败');
        console.log('getPlanSum fail');
        if (_debug) {
          var response = '{"data":[{"Path_id":"Q00001","Path_name":"山东1"},{"Path_id":"Q00002","Path_name":"山东2"}]}';
          var rsp = JSON.parse(response);
          context.dispatch(ActionEvent.AE_PLANSUM, rsp.data);
        }
      })
  },
  getPlan: function (data) {
    var context = this;
    data.command = 'getplan';
    $.ajax({
      url: '/visitor', type: 'POST', timeout: AJAXTIMEOUT,
      data: data
    })
      .done(function (response) {
        console.log('getPlan:', response);
        if (response.code == 0) {
          context.dispatch(ActionEvent.AE_PLAN, response.data);
        } else {
          message.error('获取计划失败！' + response.msg);
        }
      })
      .fail(function (xhr, textStatus, thrownError) {
        message.error('与服务器建立连接失败');
        console.log('getPlan fail');
        if (_debug) {
          var response = '{"data":[{"Path_id":"Q00001","Path_name":"山东1"},{"Path_id":"Q00002","Path_name":"山东2"}]}';
          var rsp = JSON.parse(response);
          context.dispatch(ActionEvent.AE_PLAN, rsp.data);
        }
      })
  },
  dispatch: function (funname, value) {
    AppDispatcher.dispatch({
      eventName: funname,
      value: value
    });
  }
};

window.Action = Action;
module.exports = Action;
