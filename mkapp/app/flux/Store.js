'use strict';
var AppDispatcher = require('./AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');
var EventConst = require('./event-const');
var ActionEvent = EventConst.ActionEvent;
var StoreEvent = EventConst.StoreEvent;

var _loginSuccess = false;
var _userInfo = {};
var _curPlanlist = [];

var _user = [];

var Store = assign({}, EventEmitter.prototype, {
  back: function () {
    this.emitChange(StoreEvent.SE_BACK);
  },

  setLoginSuccess: function (loginsuccess, userInfo) {
    _loginSuccess = loginsuccess;
    if (loginsuccess) {
      _userInfo = userInfo;
    } else {
      _userInfo = {};
    }
    this.emit(StoreEvent.SE_LOGIN, loginsuccess);
  },
  getUserInfo: () => {
    return _userInfo;
  },

  setCurView: function (view) {
    _curview = view;
    this.emit(StoreEvent.SE_VIEW);
  },
  getCurView: function () {
    return _curview;
  },

  setUser: function (sa) {
    _user = sa;
    this.emitChange(StoreEvent.SE_USER);
  },
  getUser: function () {
    return _user;
  },

  getPlanlist: function () {
    return _curPlanlist;
  },
  setPlanlist: function (pl) {
    _curPlanlist = pl;
    this.emit(StoreEvent.SE_CURPLANLIST);
  },
  addPlan: function (plan) {
    _curPlanlist.push(plan);
    this.emit(StoreEvent.SE_CURPLANLIST);
  },

  emitChange: function (eventtype) {
    this.emit(eventtype);
  },
  /**
   * @param {function} callback
   */
  addChangeListener: function (eventtype, callback) {
    this.on(eventtype, callback);
  },
  /**
   * @param {function} callback
   */
  removeChangeListener: function (eventtype, callback) {
    this.removeListener(eventtype, callback);
  }
});

// Register callback to handle all updates
AppDispatcher.register((action) => {
  switch (action.eventName) {
    case ActionEvent.AE_LOGIN: {
      Store.setLoginSuccess(true, action.value);
    }
      break;
    case ActionEvent.AE_LOGOUT: {
      Store.setLoginSuccess(false);
    }
      break;
    case ActionEvent.AE_USER: {
      Store.setUser(action.value);
    }
      break;
    case ActionEvent.AE_PLAN_ADD: {
      Store.addPlan({ id: 2 });
    }
      break;
    default:
      break;
  }
});

window.Store = Store;
module.exports = Store;
