'use strict';
import $ from 'jquery'

const AJAXTIMEOUT = 10 * 1000;
var React = require('react');
var AppDispatcher = require('./AppDispatcher');
var ActionEvent = require('./event-const').ActionEvent;
var Action = {
  login: function (data) {
    var context = this;
    $.ajax({
      url: '../login.do', type: 'POST', dataType: 'html', timeout: AJAXTIMEOUT,
      data: data
    })
      .done(function (response) {
        console.log('login:' + response);
        var rsp = JSON.parse(response);
        if (rsp.result != 'ok') {
          console.log('登录失败!' + rsp.result);
          msg.error('登录失败!' + rsp.result);
          return;
        }
        //msg.success('登录成功');
        context.dispatch(ActionEvent.AE_LOGIN, rsp.data);
      })
      .fail(function (xhr, textStatus, thrownError) {
        var response = '{"data":{},"result":"ok"}';
        var rsp = JSON.parse(response);

        console.log('login fail');
        context.dispatch(ActionEvent.AE_LOGIN, rsp.data);
      })
  },
  logout: function (data) {
    var context = this;
    $.ajax({
      url: '../logout.do', type: 'POST', dataType: 'html', timeout: AJAXTIMEOUT,
      data: data
    })
      .done(function (response) {
        console.log('logout:' + response);
        var rsp = JSON.parse(response);
        if (rsp.result != 'ok') {
          console.log('注销失败!' + rsp.result);
          msg.error('注销失败!' + rsp.result);
          return;
        }
        context.dispatch(ActionEvent.AE_LOGOUT);
      })
      .fail(function (xhr, textStatus, thrownError) {
        console.log('logout fail');
        context.dispatch(ActionEvent.AE_LOGOUT);
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
