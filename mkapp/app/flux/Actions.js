'use strict';
import $ from 'jquery'
import { message } from 'antd';

var _domain_name = config.domain_name;  //域名

var _debug = _domain_name == '';

message.config({
  top: 40,
  duration: 2,
});

const AJAXTIMEOUT = 20 * 1000;
var React = require('react');
var AppDispatcher = require('./AppDispatcher');
var ActionEvent = require('./event-const').ActionEvent;
var Action = {
  login: function (data) {
    var context = this;
    data.command = 'login';
    $.ajax({
      url: _domain_name + '/users', type: 'POST', timeout: AJAXTIMEOUT,
      data: data
    })
      .done(function (response) {
        console.log('login:', response);
        if (response.code == 0) {
          context.dispatch(ActionEvent.AE_LOGIN, response.data[0]);
          message.success('登录成功');
        } else {
          context.dispatch(ActionEvent.AE_LOGOUT);
          message.error('登录失败！' + response.msg);
        }
      })
      .fail(function (xhr, textStatus, thrownError) {
        message.error('与服务器建立连接失败');
        context.dispatch(ActionEvent.AE_LOGOUT);
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
      url: _domain_name + '/users', type: 'POST', timeout: AJAXTIMEOUT,
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
  getUser: function () {
    var context = this;
    var data = {
      command: 'getuser'
    }
    $.ajax({
      url: _domain_name + '/users', type: 'POST', timeout: AJAXTIMEOUT,
      data: data
    })
      .done(function (response) {
        console.log('getUser:', response);
        if (response.code == 0) {
          context.dispatch(ActionEvent.AE_USER, response.data);
        } else {
          message.error('获取用户失败！' + response.msg);
          context.dispatch(ActionEvent.AE_USER, []);
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
  getStoreBasic: function (data) {
    var context = this;

    data.command = 'getstorebasic';

    $.ajax({
      url: _domain_name + '/info', type: 'POST', timeout: AJAXTIMEOUT,
      data: data
    })
      .done(function (response) {
        console.log('getStoreBasic:', response);
        if (response.code == 0) {
          context.dispatch(ActionEvent.AE_STOREBASIC, response.data);
        } else {
          message.error('获取门店失败！' + response.msg);
          context.dispatch(ActionEvent.AE_STOREBASIC, []);
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
  getPath: function (data) {
    var context = this;
    data.command = 'getpath_app';
    $.ajax({
      url: _domain_name + '/visitor', type: 'POST', timeout: AJAXTIMEOUT,
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
  getPlan: function (data) {
    var context = this;
    data.command = 'getplan';
    $.ajax({
      url: _domain_name + '/visitor', type: 'POST', timeout: AJAXTIMEOUT,
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
  addPlan: function (data) {
    var context = this;
    data.command = 'addplan';
    console.log('send addplan', data);
    $.ajax({
      url: _domain_name + '/visitor', type: 'POST', timeout: AJAXTIMEOUT,
      data: data
    })
      .done(function (response) {
        console.log('addPlan:', response);
        if (response.code == 0) {
          context.dispatch(ActionEvent.AE_PLAN_ADD, response.data);
          message.success('增加计划成功');
        } else {
          message.error('增加计划失败！' + response.msg);
        }
      })
      .fail(function (xhr, textStatus, thrownError) {
        message.error('与服务器建立连接失败');
        console.log('addPlan fail');
        if (_debug) {
          var response = '{"data":{},"result":"ok"}';
          var rsp = JSON.parse(response);
          context.dispatch(ActionEvent.AE_PLAN_ADD, rsp.data);
        }
      })
  },
  delPlan: function (data) {
    var context = this;
    data.command = 'delplan';
    $.ajax({
      url: _domain_name + '/visitor', type: 'POST', timeout: AJAXTIMEOUT,
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
        if (_debug) {
          var response = '{"data":{},"result":"ok"}';
          var rsp = JSON.parse(response);
          context.dispatch(ActionEvent.AE_PLAN_DEL, rsp.data);
        }
      })
  },
  sign: function (data) {
    var context = this;
    var dispatchEvent = '';
    var sign_name = '';
    data.command = 'sign';
    if (data.sign_type == 'signin') {
      dispatchEvent = ActionEvent.AE_SIGN_IN;
      sign_name = '签到';
    } else {
      dispatchEvent = ActionEvent.AE_SIGN_OUT;
      sign_name = '签出';
    }
    console.log('send sign', data);
    $.ajax({
      url: _domain_name + '/visitor', type: 'POST', timeout: AJAXTIMEOUT,
      data: data
    })
      .done(function (response) {
        console.log('sign:', response);
        if (response.code == 0) {
          context.dispatch(dispatchEvent, response.data);
          message.success(sign_name + '成功');
        } else {
          message.error(sign_name + '失败！' + response.msg);
        }
      })
      .fail(function (xhr, textStatus, thrownError) {
        message.error('与服务器建立连接失败');
        console.log('signIn fail');
        if (_debug) {
          var response = '{"data":{},"result":"ok"}';
          var rsp = JSON.parse(response);
          context.dispatch(dispatchEvent, rsp.data);
        }
      })
  },
  checkSign: function (data) {
    var context = this;
    data.command = 'checksign';
    console.log('send sign', data);
    $.ajax({
      url: _domain_name + '/visitor', type: 'POST', timeout: AJAXTIMEOUT,
      data: data
    })
      .done(function (response) {
        console.log('checkSign:', response);
        if (response.code == 0) {
          message.success('报到成功');
        } else {
          message.error('报到失败！' + response.msg);
        }
      })
      .fail(function (xhr, textStatus, thrownError) {
        message.error('与服务器建立连接失败');
        console.log('checkSign fail');
        if (_debug) {
        }
      })
  },
  getBrand: function () {
    var context = this;
    var data = { command: 'getproductbrand' };
    $.ajax({
      url: _domain_name + '/info', type: 'POST', timeout: AJAXTIMEOUT,
      data: data
    })
      .done(function (response) {
        console.log('getBrand:', response);
        if (response.code == 0) {
          context.dispatch(ActionEvent.AE_BRAND, response.data);
        } else {
          message.error('获取品牌失败！' + response.msg);
        }
      })
      .fail(function (xhr, textStatus, thrownError) {
        message.error('与服务器建立连接失败');
        console.log('getPlan fail');
        if (_debug) {
          var response = '{"data":[{"Path_id":"Q00001","Path_name":"山东1"},{"Path_id":"Q00002","Path_name":"山东2"}]}';
          var rsp = JSON.parse(response);
          context.dispatch(ActionEvent.AE_BRAND, rsp.data);
        }
      })
  },
  getProductbyStore: function (data) {
    var context = this;
    data.command = 'getproductbystore';
    $.ajax({
      url: _domain_name + '/info', type: 'POST', timeout: AJAXTIMEOUT,
      data: data
    })
      .done(function (response) {
        console.log('getProductbyStore:', response);
        if (response.code == 0) {
          context.dispatch(ActionEvent.AE_PRODUCT, response.data);
        } else {
          message.error('获取产品失败！' + response.msg);
        }
      })
      .fail(function (xhr, textStatus, thrownError) {
        message.error('与服务器建立连接失败');
        console.log('getPlan fail');
        if (_debug) {
          var response = '{"data":[{"Path_id":"Q00001","Path_name":"山东1"},{"Path_id":"Q00002","Path_name":"山东2"}]}';
          var rsp = JSON.parse(response);
          context.dispatch(ActionEvent.AE_PRODUCT, rsp.data);
        }
      })
  },
  submitShelfmain: function (data) {
    var context = this;
    data.command = 'submitshelfmain';
    console.log('send submitshelfmain', data);
    $.ajax({
      url: _domain_name + '/visitor', type: 'POST', timeout: AJAXTIMEOUT,
      data: data
    })
      .done(function (response) {
        console.log('submitShelfmain:', response);
        if (response.code == 0) {
          context.dispatch(ActionEvent.AE_SHELFMAIN_SUBMIT, response.data);
          message.success('提交主货架信息成功');
        } else {
          message.error('提交主货架信息失败！' + response.msg);
        }
      })
      .fail(function (xhr, textStatus, thrownError) {
        message.error('与服务器建立连接失败');
        console.log('submitShelfmain fail');
        if (_debug) {
          var response = '{"data":{},"result":"ok"}';
          var rsp = JSON.parse(response);
          context.dispatch(ActionEvent.AE_SHELFMAIN_SUBMIT, rsp.data);
        }
      })
  },
  submitStock: function (data) {
    var context = this;
    data.command = 'submitstock';
    console.log('send submitStock', data);
    $.ajax({
      url: _domain_name + '/visitor', type: 'POST', timeout: AJAXTIMEOUT,
      data: data
    })
      .done(function (response) {
        console.log('submitStock:', response);
        if (response.code == 0) {
          context.dispatch(ActionEvent.AE_STOCK_SUBMIT, response.data);
          message.success('提交库存信息成功');
        } else {
          message.error('提交库存信息失败！' + response.msg);
        }
      })
      .fail(function (xhr, textStatus, thrownError) {
        message.error('与服务器建立连接失败');
        console.log('submitStock fail');
        if (_debug) {
          var response = '{"data":{},"result":"ok"}';
          var rsp = JSON.parse(response);
          context.dispatch(ActionEvent.AE_STOCK_SUBMIT, rsp.data);
        }
      })
  },
  submitShelfaway: function (data) {
    var context = this;
    data.command = 'submitshelfaway';
    console.log('send submitshelfaway', data);
    $.ajax({
      url: _domain_name + '/visitor', type: 'POST', timeout: AJAXTIMEOUT,
      data: data
    })
      .done(function (response) {
        console.log('submitShelfaway:', response);
        if (response.code == 0) {
          context.dispatch(ActionEvent.AE_SHELFAWAY_SUBMIT, response.data);
          message.success('提交离架信息成功');
        } else {
          message.error('提交离架信息失败！' + response.msg);
        }
      })
      .fail(function (xhr, textStatus, thrownError) {
        message.error('与服务器建立连接失败');
        console.log('submitShelfaway fail');
        if (_debug) {
          var response = '{"data":{},"result":"ok"}';
          var rsp = JSON.parse(response);
          context.dispatch(ActionEvent.AE_SHELFAWAY_SUBMIT, rsp.data);
        }
      })
  },
  submitChat: function (data) {
    var context = this;
    data.command = 'submitchat';
    console.log('send submitchat', data);
    $.ajax({
      url: _domain_name + '/visitor', type: 'POST', timeout: AJAXTIMEOUT,
      data: data
    })
      .done(function (response) {
        console.log('submitChat:', response);
        if (response.code == 0) {
          context.dispatch(ActionEvent.AE_CHAT_SUBMIT, response.data);
          message.success('提交洽谈信息成功');
        } else {
          message.error('提交洽谈信息失败！' + response.msg);
        }
      })
      .fail(function (xhr, textStatus, thrownError) {
        message.error('与服务器建立连接失败');
        console.log('submitChat fail');
        if (_debug) {
          var response = '{"data":{},"result":"ok"}';
          var rsp = JSON.parse(response);
          context.dispatch(ActionEvent.AE_CHAT_SUBMIT, rsp.data);
        }
      })
  },
  getPromotionbyStore: function (data) {
    var context = this;
    data.command = 'getpromotionbystore';
    console.log("getPromotionbyStore presend", data);
    $.ajax({
      url: _domain_name + '/info', type: 'POST', timeout: AJAXTIMEOUT,
      data: data
    })
      .done(function (response) {
        console.log('getPromotionbyStore:', response);
        if (response.code == 0) {
          context.dispatch(ActionEvent.AE_PROMOTION, response.data);
        } else {
          message.error('获取促销失败！' + response.msg);
        }
      })
      .fail(function (xhr, textStatus, thrownError) {
        message.error('与服务器建立连接失败');
        console.log('getPromotionbyStore fail');
        if (_debug) {
        }
      })
  },
  submitPromotion: function (data) {
    var context = this;
    data.command = 'submitpromotion';
    console.log('send submitPromotion', data);
    $.ajax({
      url: _domain_name + '/visitor', type: 'POST', timeout: AJAXTIMEOUT,
      data: data
    })
      .done(function (response) {
        console.log('submitShelfmain:', response);
        if (response.code == 0) {
          context.dispatch(ActionEvent.AE_PROMOTION_SUBMIT, response.data);
          message.success('提交促销信息成功');
        } else {
          message.error('提交促销信息失败！' + response.msg);
        }
      })
      .fail(function (xhr, textStatus, thrownError) {
        message.error('与服务器建立连接失败');
        console.log('submitShelfmain fail');
        if (_debug) {
          var response = '{"data":{},"result":"ok"}';
          var rsp = JSON.parse(response);
          context.dispatch(ActionEvent.AE_PROMOTION_SUBMIT, rsp.data);
        }
      })
  },
  getVisitorImage: function (data) {
    var context = this;
    data.command = 'getvisitorimage';
    $.ajax({
      url: _domain_name + '/visitor', type: 'POST', timeout: AJAXTIMEOUT,
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
        message.error('与服务器建立连接失败' + xhr.status);
        console.log('getVisitorImage fail');
      })
  },
  getShelfMain: function (data) {
    var context = this;
    data.command = 'getshelfmain';
    console.log('send getshelfmain', data);
    $.ajax({
      url: _domain_name + '/visitor', type: 'POST', timeout: AJAXTIMEOUT,
      data: data
    })
      .done(function (response) {
        console.log('getShelfmain:', response);
        if (response.code == 0) {
          context.dispatch(ActionEvent.AE_SHELFMAIN, response.data);
          //message.success('提交主货架信息成功');
        } else {
          message.error('获取主货架信息失败！' + response.msg);
        }
      })
      .fail(function (xhr, textStatus, thrownError) {
        message.error('与服务器建立连接失败');
        console.log('getShelfmain fail');
        if (_debug) {
          var response = '{"data":{},"result":"ok"}';
          var rsp = JSON.parse(response);
          context.dispatch(ActionEvent.AE_SHELFMAIN, rsp.data);
        }
      })
  },
  getShelfAway: function (data) {
    var context = this;
    data.command = 'getshelfaway';
    console.log('send getshelfaway', data);
    $.ajax({
      url: _domain_name + '/visitor', type: 'POST', timeout: AJAXTIMEOUT,
      data: data
    })
      .done(function (response) {
        console.log('getShelfAway:', response);
        if (response.code == 0) {
          context.dispatch(ActionEvent.AE_SHELFAWAY, response.data);
          //message.success('提交主货架信息成功');
        } else {
          message.error('获取离架信息失败！' + response.msg);
        }
      })
      .fail(function (xhr, textStatus, thrownError) {
        message.error('与服务器建立连接失败');
        console.log('getShelfAway fail');
        if (_debug) {
          var response = '{"data":{},"result":"ok"}';
          var rsp = JSON.parse(response);
          context.dispatch(ActionEvent.AE_SHELFAWAY, rsp.data);
        }
      })
  },
  getStock: function (data) {
    var context = this;
    data.command = 'getstock';
    console.log('send getstock', data);
    $.ajax({
      url: _domain_name + '/visitor', type: 'POST', timeout: AJAXTIMEOUT,
      data: data
    })
      .done(function (response) {
        console.log('getStock:', response);
        if (response.code == 0) {
          context.dispatch(ActionEvent.AE_STOCK, response.data);
          //message.success('提交主货架信息成功');
        } else {
          message.error('获取库存信息失败！' + response.msg);
        }
      })
      .fail(function (xhr, textStatus, thrownError) {
        message.error('与服务器建立连接失败');
        console.log('getStock fail');
        if (_debug) {
          var response = '{"data":{},"result":"ok"}';
          var rsp = JSON.parse(response);
          context.dispatch(ActionEvent.AE_STOCK, rsp.data);
        }
      })
  },
  getPromotion: function (data) {
    var context = this;
    data.command = 'getstorepromotion';
    console.log('send getPromotion', data);
    $.ajax({
      url: _domain_name + '/visitor', type: 'POST', timeout: AJAXTIMEOUT,
      data: data
    })
      .done(function (response) {
        console.log('getPromotion:', response);
        if (response.code == 0) {
          context.dispatch(ActionEvent.AE_STORE_PROMOTION, response.data);
          //message.success('提交主货架信息成功');
        } else {
          message.error('获取促销信息失败！' + response.msg);
        }
      })
      .fail(function (xhr, textStatus, thrownError) {
        message.error('与服务器建立连接失败');
        console.log('getPromotion fail');
        if (_debug) {
          var response = '{"data":{},"result":"ok"}';
          var rsp = JSON.parse(response);
          context.dispatch(ActionEvent.AE_STORE_PROMOTION, rsp.data);
        }
      })
  },
  getChat: function (data) {
    var context = this;
    data.command = 'getchat';
    console.log('send getchat', data);
    $.ajax({
      url: _domain_name + '/visitor', type: 'POST', timeout: AJAXTIMEOUT,
      data: data
    })
      .done(function (response) {
        console.log('getChat:', response);
        if (response.code == 0) {
          context.dispatch(ActionEvent.AE_CHAT, response.data);
          //message.success('提交主货架信息成功');
        } else {
          message.error('获取洽谈信息失败！' + response.msg);
        }
      })
      .fail(function (xhr, textStatus, thrownError) {
        message.error('与服务器建立连接失败');
        console.log('getChat fail');
        if (_debug) {
          var response = '{"data":{},"result":"ok"}';
          var rsp = JSON.parse(response);
          context.dispatch(ActionEvent.AE_CHAT, rsp.data);
        }
      })
  },
  getSafeStock: function (data) {
    var context = this;
    data.command = 'getsafestock';
    console.log('send getSafeStock', data);
    $.ajax({
      url: _domain_name + '/visitor', type: 'POST', timeout: AJAXTIMEOUT,
      data: data
    })
      .done(function (response) {
        console.log('getSafeStock:', response);
        if (response.code == 0) {
          context.dispatch(ActionEvent.AE_SAFESTOCK, response.data);
        } else {
          message.error('获取安全库存失败！' + response.msg);
        }
      })
      .fail(function (xhr, textStatus, thrownError) {
        message.error('与服务器建立连接失败');
        console.log('getSafeStock fail');
      })
  },
  getSaleActual: function (data) {
    var context = this;
    data.command = 'getsaleactual';
    console.log('send getSaleActual', data);
    $.ajax({
      url: _domain_name + '/visitor', type: 'POST', timeout: AJAXTIMEOUT,
      data: data
    })
      .done(function (response) {
        console.log('getSaleActual:', response);
        if (response.code == 0) {
          context.dispatch(ActionEvent.AE_SALEACTUAL, response.data);
        } else {
          message.error('获取SKU数据失败！' + response.msg);
        }
      })
      .fail(function (xhr, textStatus, thrownError) {
        message.error('与服务器建立连接失败');
        console.log('getSaleActual fail');
      })
  },
  dispatch: function (funname, value) {
    AppDispatcher.dispatch({
      eventName: funname,
      value: value
    });
  },
};

window.Action = Action;
module.exports = Action;
