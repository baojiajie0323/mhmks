'use strict';
import $ from 'jquery'
import { message } from 'antd';

//var _domain_name = 'http://1658k3l069.iask.in';  //域名
var _domain_name = '';  //域名

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
          message.error( sign_name + '失败！' + response.msg);
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
  dispatch: function (funname, value) {
    AppDispatcher.dispatch({
      eventName: funname,
      value: value
    });
  }
};

window.Action = Action;
module.exports = Action;
