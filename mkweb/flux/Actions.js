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
  getProductPrice: function () {
    var context = this;
    var data = {
      command: 'getproductprice'
    }
    $.ajax({
      url: '/info', type: 'POST', timeout: AJAXTIMEOUT,
      data: data
    })
      .done(function (response) {
        console.log('getProductPrice:', response);
        if (response.code == 0) {
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
  getProductStock: function () {
    var context = this;
    var data = {
      command: 'getproductstock'
    }
    $.ajax({
      url: '/info', type: 'POST', timeout: AJAXTIMEOUT,
      data: data
    })
      .done(function (response) {
        console.log('getProductStock:', response);
        if (response.code == 0) {
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
  getPromotion: function () {
    var context = this;
    var data = {
      command: 'getpromotion'
    }
    $.ajax({
      url: '/info', type: 'POST', timeout: AJAXTIMEOUT,
      data: data
    })
      .done(function (response) {
        console.log('getPromotion:', response);
        if (response.code == 0) {
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
  dispatch: function (funname, value) {
    AppDispatcher.dispatch({
      eventName: funname,
      value: value
    });
  }
};

window.Action = Action;
module.exports = Action;
