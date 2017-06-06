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
          var response = '{"code":0,"data":[{"id":6,"username":"001837","realname":"卢琴","password":"123456","phone":"","email":"luqin@myhome-sh.com","depart":12,"role":6,"enableweb":1,"enableapp":1,"check":0,"departname":"沪浙区","userid":6}]}';
          var rsp = JSON.parse(response);
          context.dispatch(ActionEvent.AE_LOGIN, rsp.data[0]);
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
  getStoreBasic: function (data) {
    var context = this;
    data = data || {};
    data.command = 'getstorebasic';
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
          message.error('获取区域失败！' + response.msg);
        }
      })
      .fail(function (xhr, textStatus, thrownError) {
        message.error('与服务器建立连接失败');
        console.log('getDepart fail');
        if (_debug) {
          var response = '{"data":[{"id":"1","name":"市场部","parentid":"0"},{"id":"2","name":"访客部","parentid":"0"},{"id":"3","name":"华东区","parentid":"1"},{"id":"4","name":"华中区","parentid":"1"},{"id":"5","name":"上海区","parentid":"4"}]}';
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
          message.success('创建区域成功！');
        } else {
          message.error('创建区域失败！' + response.msg);
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
          message.success('修改区域成功！');
        } else {
          message.error('修改区域失败！' + response.msg);
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
          message.success('删除区域成功！');
        } else {
          message.error('删除区域失败！' + response.msg);
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
          var response = '{"code":0,"data":[{"Path_id":"Q00001","Path_seq":1,"Store_id":"RTM-HB-016","Path_name":"山东1","Store_name":"华北大润发即墨店"},{"Path_id":"Q00002","Path_seq":1,"Store_id":"CAF-057","Path_name":"山东2","Store_name":"家乐福青岛辽阳路店"},{"Path_id":"Q00003","Path_seq":1,"Store_id":"RTM-HB-034","Path_name":"山东3","Store_name":"华北大润发崂山店"},{"Path_id":"Q00004","Path_seq":1,"Store_id":"RTM-HB-026","Path_name":"山东4","Store_name":"华北大润发平度店"},{"Path_id":"Q00005","Path_seq":1,"Store_id":"RTM-HB-044","Path_name":"山东5","Store_name":"华北大润发阜安店"},{"Path_id":"Q00006","Path_seq":1,"Store_id":"WAL-5744","Path_name":"山东6","Store_name":"沃尔玛济南泉城路分店"},{"Path_id":"Q00007","Path_seq":1,"Store_id":"RTM-HB-054","Path_name":"山东7","Store_name":"华北大润发省博店"},{"Path_id":"Q00008","Path_seq":1,"Store_id":"RTM-HB-041","Path_name":"山东8","Store_name":"华北大润发章丘店"},{"Path_id":"Q00009","Path_seq":1,"Store_id":"RTM-HB-060","Path_name":"山东9","Store_name":"华北大润发东昌店"},{"Path_id":"Q00010","Path_seq":1,"Store_id":"RTM-HB-029","Path_name":"山东10","Store_name":"华北大润发文登店"},{"Path_id":"Q00011","Path_seq":1,"Store_id":"RTM-HB-036","Path_name":"山东11","Store_name":"华北大润发世昌店"},{"Path_id":"Q00012","Path_seq":1,"Store_id":"MTR-071","Path_name":"山东12","Store_name":"麦德龙烟台芝罘商场"},{"Path_id":"Q00013","Path_seq":1,"Store_id":"WAL-1033","Path_name":"山东13","Store_name":"沃尔玛潍坊东风东街分店"},{"Path_id":"Q00015","Path_seq":1,"Store_id":"RTM-HB-017","Path_name":"山东15","Store_name":"华北大润发济宁店"},{"Path_id":"Q00016","Path_seq":1,"Store_id":"RTM-HB-027","Path_name":"山东16","Store_name":"华北大润发泰安店"},{"Path_id":"Q00018","Path_seq":1,"Store_id":"RTM-HB-035","Path_name":"山东18","Store_name":"华北大润发枣庄店"},{"Path_id":"Q00001","Path_seq":2,"Store_id":"RTM-HB-013","Path_name":"山东1","Store_name":"华北大润发城阳店"},{"Path_id":"Q00002","Path_seq":2,"Store_id":"CAF-020","Path_name":"山东2","Store_name":"家乐福青岛新兴店"},{"Path_id":"Q00003","Path_seq":2,"Store_id":"RTM-HB-007","Path_name":"山东3","Store_name":"华北大润发青岛店"},{"Path_id":"Q00004","Path_seq":2,"Store_id":"MTR-059","Path_name":"山东4","Store_name":"麦德龙青岛黄岛商场"},{"Path_id":"Q00005","Path_seq":2,"Store_id":"RTM-HB-053","Path_name":"山东5","Store_name":"华北大润发三里河店"},{"Path_id":"Q00006","Path_seq":2,"Store_id":"CAF-025","Path_name":"山东6","Store_name":"家乐福济南公共汽车站店"},{"Path_id":"Q00007","Path_seq":2,"Store_id":"RTM-HB-003","Path_name":"山东7","Store_name":"华北大润发市中店"},{"Path_id":"Q00008","Path_seq":2,"Store_id":"RTM-HB-010","Path_name":"山东8","Store_name":"华北大润发淄博店"},{"Path_id":"Q00009","Path_seq":2,"Store_id":"RTM-HB-025","Path_name":"山东9","Store_name":"华北大润发滨州店"},{"Path_id":"Q00010","Path_seq":2,"Store_id":"RTM-HB-018","Path_name":"山东10","Store_name":"华北大润发荣成店"},{"Path_id":"Q00011","Path_seq":2,"Store_id":"RTM-HB-011","Path_name":"山东11","Store_name":"华北大润发威海店"},{"Path_id":"Q00012","Path_seq":2,"Store_id":"RTM-HB-006","Path_name":"山东12","Store_name":"华北大润发烟台店"},{"Path_id":"Q00013","Path_seq":2,"Store_id":"MTR-123","Path_name":"山东13","Store_name":"麦德龙潍坊商场"},{"Path_id":"Q00014","Path_seq":2,"Store_id":"RTM-HB-022","Path_name":"山东14","Store_name":"华北大润发青州店"},{"Path_id":"Q00015","Path_seq":2,"Store_id":"WAL-2371","Path_name":"山东15","Store_name":"沃尔玛（山东）百货有限公司济宁神道路分店"},{"Path_id":"Q00016","Path_seq":2,"Store_id":"RTM-HB-023","Path_name":"山东16","Store_name":"华北大润发莱芜店"},{"Path_id":"Q00017","Path_seq":2,"Store_id":"MTR-160","Path_name":"山东17","Store_name":"麦德龙临沂罗庄商场"},{"Path_id":"Q00018","Path_seq":2,"Store_id":"RTM-HB-030","Path_name":"山东18","Store_name":"华北大润发日照店"},{"Path_id":"Q00001","Path_seq":3,"Store_id":"RTM-HB-032","Path_name":"山东1","Store_name":"华北大润发长城路店"},{"Path_id":"Q00002","Path_seq":3,"Store_id":"CAF-014","Path_name":"山东2","Store_name":"家乐福青岛名达店"},{"Path_id":"Q00003","Path_seq":3,"Store_id":"WAL-5745","Path_name":"山东3","Store_name":"沃尔玛青岛台东分店"},{"Path_id":"Q00006","Path_seq":3,"Store_id":"RTM-HB-002","Path_name":"山东6","Store_name":"华北大润发历城店"},{"Path_id":"Q00007","Path_seq":3,"Store_id":"RTM-HB-008","Path_name":"山东7","Store_name":"华北大润发天桥店"},{"Path_id":"Q00008","Path_seq":3,"Store_id":"WAL-1032","Path_name":"山东8","Store_name":"沃尔玛淄博柳泉路分店"},{"Path_id":"Q00009","Path_seq":3,"Store_id":"MTR-121","Path_name":"山东9","Store_name":"麦德龙淄博张店商场"},{"Path_id":"Q00012","Path_seq":3,"Store_id":"RTM-HB-020","Path_name":"山东12","Store_name":"华北大润发莱阳店"},{"Path_id":"Q00013","Path_seq":3,"Store_id":"RTM-HB-051","Path_name":"山东13","Store_name":"华北大润发历奎文店"},{"Path_id":"Q00015","Path_seq":3,"Store_id":"RTM-HB-052","Path_name":"山东15","Store_name":"华北大润发兖州店"},{"Path_id":"Q00003","Path_seq":4,"Store_id":"MTR-020","Path_name":"山东3","Store_name":"麦德龙青岛四方商场"},{"Path_id":"Q00006","Path_seq":4,"Store_id":"RTM-HB-001","Path_name":"山东6","Store_name":"华北大润发历下店"}]}';
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
          var response = '{"code":0,"data":[{"userid":"z00189","year":2017,"month":1,"storeA":3.5,"storeB":5.3,"storeC":0.9,"cover":88,"complete":90},{"userid":"z00189","year":2017,"month":2,"storeA":4.1,"storeB":2.2,"storeC":1.2,"cover":97,"complete":75},{"userid":"z00189","year":2017,"month":3,"storeA":4.3,"storeB":2.5,"storeC":1.3,"cover":92,"complete":20}]}';
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
          var response = '{"code":0,"data":[{"userid":"z00189","year":2017,"month":4,"day":1,"plan_type":1,"path_id":"Q00004","store_id":"MTR-059","isfinish":0,"signin_time":null,"signin_gps_x":null,"signin_gps_y":null,"signout_time":null,"signout_gps_x":null,"signout_gps_y":null,"Path_Name":"山东4"},{"userid":"z00189","year":2017,"month":4,"day":1,"plan_type":1,"path_id":"Q00004","store_id":"RTM-HB-026","isfinish":0,"signin_time":null,"signin_gps_x":null,"signin_gps_y":null,"signout_time":null,"signout_gps_x":null,"signout_gps_y":null,"Path_Name":"山东4"},{"userid":"z00189","year":2017,"month":4,"day":2,"plan_type":1,"path_id":"Q00006","store_id":"CAF-025","isfinish":0,"signin_time":null,"signin_gps_x":null,"signin_gps_y":null,"signout_time":null,"signout_gps_x":null,"signout_gps_y":null,"Path_Name":"山东6"},{"userid":"z00189","year":2017,"month":4,"day":2,"plan_type":1,"path_id":"Q00006","store_id":"RTM-HB-001","isfinish":0,"signin_time":null,"signin_gps_x":null,"signin_gps_y":null,"signout_time":null,"signout_gps_x":null,"signout_gps_y":null,"Path_Name":"山东6"},{"userid":"z00189","year":2017,"month":4,"day":2,"plan_type":1,"path_id":"Q00006","store_id":"RTM-HB-002","isfinish":0,"signin_time":null,"signin_gps_x":null,"signin_gps_y":null,"signout_time":null,"signout_gps_x":null,"signout_gps_y":null,"Path_Name":"山东6"},{"userid":"z00189","year":2017,"month":4,"day":2,"plan_type":1,"path_id":"Q00006","store_id":"WAL-5744","isfinish":0,"signin_time":null,"signin_gps_x":null,"signin_gps_y":null,"signout_time":null,"signout_gps_x":null,"signout_gps_y":null,"Path_Name":"山东6"},{"userid":"z00189","year":2017,"month":4,"day":7,"plan_type":1,"path_id":"Q00002","store_id":"CAF-014","isfinish":0,"signin_time":null,"signin_gps_x":null,"signin_gps_y":null,"signout_time":null,"signout_gps_x":null,"signout_gps_y":null,"Path_Name":"山东2"},{"userid":"z00189","year":2017,"month":4,"day":7,"plan_type":1,"path_id":"Q00002","store_id":"CAF-020","isfinish":0,"signin_time":null,"signin_gps_x":null,"signin_gps_y":null,"signout_time":null,"signout_gps_x":null,"signout_gps_y":null,"Path_Name":"山东2"},{"userid":"z00189","year":2017,"month":4,"day":7,"plan_type":1,"path_id":"Q00002","store_id":"CAF-057","isfinish":0,"signin_time":null,"signin_gps_x":null,"signin_gps_y":null,"signout_time":null,"signout_gps_x":null,"signout_gps_y":null,"Path_Name":"山东2"},{"userid":"z00189","year":2017,"month":4,"day":8,"plan_type":1,"path_id":"Q00006","store_id":"CAF-025","isfinish":0,"signin_time":null,"signin_gps_x":null,"signin_gps_y":null,"signout_time":null,"signout_gps_x":null,"signout_gps_y":null,"Path_Name":"山东6"},{"userid":"z00189","year":2017,"month":4,"day":8,"plan_type":1,"path_id":"Q00006","store_id":"RTM-HB-001","isfinish":0,"signin_time":null,"signin_gps_x":null,"signin_gps_y":null,"signout_time":null,"signout_gps_x":null,"signout_gps_y":null,"Path_Name":"山东6"},{"userid":"z00189","year":2017,"month":4,"day":8,"plan_type":1,"path_id":"Q00006","store_id":"RTM-HB-002","isfinish":0,"signin_time":null,"signin_gps_x":null,"signin_gps_y":null,"signout_time":null,"signout_gps_x":null,"signout_gps_y":null,"Path_Name":"山东6"},{"userid":"z00189","year":2017,"month":4,"day":8,"plan_type":1,"path_id":"Q00006","store_id":"WAL-5744","isfinish":0,"signin_time":null,"signin_gps_x":null,"signin_gps_y":null,"signout_time":null,"signout_gps_x":null,"signout_gps_y":null,"Path_Name":"山东6"}]}';
          var rsp = JSON.parse(response);
          context.dispatch(ActionEvent.AE_PLAN, rsp.data);
        }
      })
  },
  updatePlan: function (data) {
    var context = this;
    data.command = 'updateplan';
    console.log('updatePlan  req: ', data);
    $.ajax({
      url: '/visitor', type: 'POST', timeout: AJAXTIMEOUT,
      data: data
    })
      .done(function (response) {
        console.log('updatePlan:', response);
        if (response.code == 0) {
          context.dispatch(ActionEvent.AE_PLAN_UPDATE, response.data);
          message.success('修改计划成功！');
        } else {
          message.error('修改计划失败！' + response.msg);
        }
      })
      .fail(function (xhr, textStatus, thrownError) {
        message.error('与服务器建立连接失败');
        console.log('modRole fail');
      })
  },
  getSignList: function (data) {
    var context = this;
    data.command = 'getsignlist';
    $.ajax({
      url: '/visitor', type: 'POST', timeout: AJAXTIMEOUT,
      data: data
    })
      .done(function (response) {
        console.log('getSignList:', response);
        if (response.code == 0) {
          context.dispatch(ActionEvent.AE_SIGNLIST, response.data);
        } else {
          message.error('获取报到列表失败！' + response.msg);
        }
      })
      .fail(function (xhr, textStatus, thrownError) {
        message.error('与服务器建立连接失败');
        console.log('getPlan fail');
        if (_debug) {
        }
      })
  },
  getVisitorPlan: function (data) {
    var context = this;
    data.command = 'getvisitorplan';
    $.ajax({
      url: '/visitor', type: 'POST', timeout: AJAXTIMEOUT,
      data: data
    })
      .done(function (response) {
        console.log('getVisitorPlan:', response);
        if (response.code == 0) {
          context.dispatch(ActionEvent.AE_VISITOR_PLANLIST, response.data);
        } else {
          message.error('获取拜访列表失败！' + response.msg);
        }
      })
      .fail(function (xhr, textStatus, thrownError) {
        message.error('与服务器建立连接失败');
        console.log('getVisitorPlan fail');
      })
  },
  getVisitorChat: function (data) {
    var context = this;
    data.command = 'getvisitorchat';
    $.ajax({
      url: '/visitor', type: 'POST', timeout: AJAXTIMEOUT,
      data: data
    })
      .done(function (response) {
        console.log('getVisitorChat:', response);
        if (response.code == 0) {
          context.dispatch(ActionEvent.AE_VISITOR_CHATLIST, response.data);
        } else {
          message.error('获取洽谈列表失败！' + response.msg);
        }
      })
      .fail(function (xhr, textStatus, thrownError) {
        message.error('与服务器建立连接失败');
        console.log('getVisitorChat fail');
      })
  },
  getVisitorImage: function (data) {
    var context = this;
    data.command = 'getvisitorimage';
    $.ajax({
      url: '/visitor', type: 'POST', timeout: AJAXTIMEOUT,
      data: data
    })
      .done(function (response) {
        console.log('getVisitorImage:', response);
        if (response.code == 0) {
          context.dispatch(ActionEvent.AE_VISITOR_IMAGE, response.data);
        } else {
          message.error('获取照片列表失败！' + response.msg);
        }
      })
      .fail(function (xhr, textStatus, thrownError) {
        message.error('与服务器建立连接失败');
        console.log('getVisitorImage fail');
      })
  },

  getSubsidy: function () {
    var context = this;
    var data = {
      command: 'getsubsidy'
    }
    $.ajax({
      url: '/users', type: 'POST', timeout: AJAXTIMEOUT,
      data: data
    })
      .done(function (response) {
        console.log('getSubsidy:', response);
        if (response.code == 0) {
          context.dispatch(ActionEvent.AE_SUBSIDY, response.data);
        } else {
          message.error('获取补贴失败！' + response.msg);
        }
      })
      .fail(function (xhr, textStatus, thrownError) {
        message.error('与服务器建立连接失败');
        console.log('getSubsidy fail');
        if (_debug) {
          var response = '{"data":[{"id":1,"name":"系统管理员"},{"id":2,"name":"大区主管"}]}';
          var rsp = JSON.parse(response);
          context.dispatch(ActionEvent.AE_SUBSIDY, rsp.data);
        }
      })
  },
  updateSubsidy: function (data) {
    var context = this;
    data.command = 'updatesubsidy';
    $.ajax({
      url: '/users', type: 'POST', timeout: AJAXTIMEOUT,
      data: data
    })
      .done(function (response) {
        console.log('updateSubsidy:', response);
        if (response.code == 0) {
          context.dispatch(ActionEvent.AE_SUBSIDY_UPDATE, response.data);
          message.success('更新补贴报销标准成功！');
        } else {
          message.error('更新补贴报销标准失败！' + response.msg);
        }
      })
      .fail(function (xhr, textStatus, thrownError) {
        message.error('与服务器建立连接失败');
        console.log('updateSubsidy fail');
      })
  },
  getRouteBasic: function (data) {
    var context = this;
    data.command = 'getroutebasic';
    $.ajax({
      url: '/visitor', type: 'POST', timeout: AJAXTIMEOUT,
      data: data
    })
      .done(function (response) {
        console.log('getRouteBasic:', response);
        if (response.code == 0) {
          context.dispatch(ActionEvent.AE_ROUTEBASIC, response.data);
        } else {
          message.error('获取路线基础失败！' + response.msg);
        }
      })
      .fail(function (xhr, textStatus, thrownError) {
        message.error('与服务器建立连接失败');
        console.log('getRouteBasic fail');
        if (_debug) {
          var response = '{"data":[{"id":1,"name":"系统管理员"},{"id":2,"name":"大区主管"}]}';
          var rsp = JSON.parse(response);
          context.dispatch(ActionEvent.AE_ROUTEBASIC, rsp.data);
        }
      })
  },
  getRouteCost: function (data) {
    var context = this;
    data.command = 'getroutecost';
    $.ajax({
      url: '/visitor', type: 'POST', timeout: AJAXTIMEOUT,
      data: data
    })
      .done(function (response) {
        console.log('getRouteCost:', response);
        if (response.code == 0) {
          context.dispatch(ActionEvent.AE_ROUTECOST, response.data);
        } else {
          message.error('获取路线费用失败！' + response.msg);
        }
      })
      .fail(function (xhr, textStatus, thrownError) {
        message.error('与服务器建立连接失败');
        console.log('getRouteBasic fail');
        if (_debug) {
          var response = '{"data":[{"id":1,"name":"系统管理员"},{"id":2,"name":"大区主管"}]}';
          var rsp = JSON.parse(response);
          context.dispatch(ActionEvent.AE_ROUTECOST, rsp.data);
        }
      })
  },
  updateRouteCost: function (data) {
    var context = this;
    data.command = 'updateroutecost';
    $.ajax({
      url: '/visitor', type: 'POST', timeout: AJAXTIMEOUT,
      data: data
    })
      .done(function (response) {
        console.log('updateRouteCost:', response);
        if (response.code == 0) {
          context.dispatch(ActionEvent.AE_ROUTECOST_UPDATE, response.data);
          message.success('更新路线费用标准成功！');
        } else {
          message.error('更新路线费用标准失败！' + response.msg);
        }
      })
      .fail(function (xhr, textStatus, thrownError) {
        message.error('与服务器建立连接失败');
        console.log('updateRouteCost fail');
      })
  },
  delPlan: function (data) {
    var context = this;
    data.command = 'delplan';
    $.ajax({
      url: '/visitor', type: 'POST', timeout: AJAXTIMEOUT,
      data: data
    })
      .done(function (response) {
        console.log('delPlan:', response);
        if (response.code == 0) {
          context.dispatch(ActionEvent.AE_PLAN_DEL, data);
          message.success('删除计划成功');
        } else {
          message.error('删除计划失败！' + response.msg);
        }
      })
      .fail(function (xhr, textStatus, thrownError) {
        message.error('与服务器建立连接失败');
        console.log('delPlan fail');
      })
  },
  reSign: function (data) {
    var context = this;
    data.command = 'resign';
    $.ajax({
      url: '/visitor', type: 'POST', timeout: AJAXTIMEOUT,
      data: data
    })
      .done(function (response) {
        console.log('reSign:', response);
        if (response.code == 0) {
          context.dispatch(ActionEvent.AE_RESIGN, data);
          message.success('设置重签成功');
        } else {
          message.error('设置重签失败！' + response.msg);
        }
      })
      .fail(function (xhr, textStatus, thrownError) {
        message.error('与服务器建立连接失败');
        console.log('reSign fail');
      })
  },
  getPromotionSum: function (data) {
    var context = this;
    data.command = 'getpromotionsum';
    $.ajax({
      url: '/visitor', type: 'POST', timeout: AJAXTIMEOUT,
      data: data
    })
      .done(function (response) {
        console.log('getPromotionSum:', response);
        if (response.code == 0) {
          context.dispatch(ActionEvent.AE_PROMOTIONSUM, response.data);
        } else {
          message.error('获取促销统计失败！' + response.msg);
        }
      })
      .fail(function (xhr, textStatus, thrownError) {
        message.error('与服务器建立连接失败');
        console.log('getPromotionSum fail');
      })
  },
  getPromotionImage: function (data) {
    var context = this;
    data.command = 'getpromotionimage';
    $.ajax({
      url: '/visitor', type: 'POST', timeout: AJAXTIMEOUT,
      data: data
    })
      .done(function (response) {
        console.log('getPromotionImage:', response);
        if (response.code == 0) {
          context.dispatch(ActionEvent.AE_PROMOTIONIMAGE, response.data);
        } else {
          message.error('获取促销图片失败！' + response.msg);
        }
      })
      .fail(function (xhr, textStatus, thrownError) {
        message.error('与服务器建立连接失败');
        console.log('getPromotionImage fail');
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
